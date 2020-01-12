독립적으로 실행 가능한 JAR
===================================


https://docs.spring.io/spring-boot/docs/current/reference/html/executable-jar.html


# “그러고 보니 JAR 파일 하나로 실행할 수 있네?”

우리는 프로젝트를 만들면서 여러 의존성, 즉 라이브러리를 사용하게 된다. 

이 다양한 의존성들을 프로젝트 jar 파일로 패키징할 때 어떻게 하나의 jar로 엮이는 것일까?


spring boot 프로젝트는 `mvn package`를 하면 실행 가능한 JAR 파일 “하나가" 생성 되는데 이 일은 spring-maven-plugin이 해준다.

```xml
...
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
...
```

과거에는 'uber' jar라는 방식을 통해서 사용하는 모든 클래스를 풀어서 하나의 jar로 압축했는데, 이 경우 어디서 뭐가 나온건지 알 수 없고 전역이 오염되어 같은 이름의 메소드는 충돌이 난다.

## 스프링 부트의 전략

#### 요약: 
- 내장 JAR : 기본적으로 자바에는 내장 JAR를 로딩하는 표준적인 방법이 없음.
- 애플리케이션 클래스와 라이브러리 위치 구분
- org.springframework.boot.loader.jar.JarFile을 사용해서 내장 JAR를 읽는다.
- org.springframework.boot.loader.Launcher를 사용해서 실행한다.


Spring booot loader가 만드는 jar 파일을 upzip -p를 통해서 봐보면 아래와 같은 구조를 가진다.

```
example.jar
 |
 +-META-INF
 |  +-MANIFEST.MF
 +-org
 |  +-springframework
 |     +-boot
 |        +-loader
 |           +-<spring boot loader classes>
 +-BOOT-INF
    +-classes
    |  +-mycompany
    |     +-project
    |        +-YourClasses.class
    +-lib
       +-dependency1.jar
       +-dependency2.jar
```

JAR 파일의 기본 스펙 중 하나는 META-INF/MANIFEST.MF에 정의된 Main-class가 entry-point라는 점이다. 
이 jar 파일에 저 내용을 확인해보면 아래와 같다. 

```yaml
Main-Class: org.springframework.boot.loader.JarLauncher
Start-Class: com.mycompany.project.MyApplication
```

main-class가 MyApplication이 아니라 spring의 jarLauncher이다. JarLauncher는 위에 나온 jar 구조와 start-class 경로를 참고해서 앱을 실행시키는 역할을 한다.

