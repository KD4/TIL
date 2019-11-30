[인프런 더 자바] 2 바이트 코드 조작
==================================

바이트 코드 조작을 활용하는 예로는 코드 커버리지 측정이 있다.

코드 커버리지 : 테스트 코드가 내 코드를 얼마나 커버하는지 보는 툴
- ex) Javacoco
- 메이븐 플러그인으로 사용할 수 있고 output으로 나옴

코드 커버리지 툴에서는 바이트코드 조작을 통해서 테스트가 필요한 부분을 우선 마킹하고 테스트 코드가 해당 부분을 지나가는 지 확인하고 마킹한다.

=> 전부 바이트 코드와 관련 있다!

https://www.eclemma.org/jacoco/trunk/doc/index.html
http://www.semdesigns.com/Company/Publications/TestCoverage.pdf

#### Javacoco 사용

```xml
<!-- pom.xml에 플러그인 추가 -->
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.4</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>prepare-package</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```


```
//메이븐 빌드
mvn clean verify
```
```xml
<!-- 커버리지 만족 못할시 빌드 실패하도록 설정 -->
<execution>
    <id>jacoco-check</id>
    <goals>
        <goal>check</goal>
    </goals>
    <configuration>
        <rules>
            <rule>
                <element>PACKAGE</element>
                <limits>
                    <limit>
                        <counter>LINE</counter>
                        <value>COVEREDRATIO</value>
                        <minimum>0.50</minimum>
                    </limit>
                </limits>
            </rule>
        </rules>
    </configuration>
</execution>
```


## 모자에서 토끼를 꺼내는 마술

아무것도 없는 Moja에서 “Rabbit”을 꺼내는 마술

Moja.java
```java
public class Moja {

    public String pullOut() {
        return "";
    }
}
```

Masulsa.java
```java
public class Masulsa {

    public static void main(String[] args) {
        System.out.println(new Moja().pullOut());
    }
}
```

위 코드를 실행했을 때 "rabbit!"이 나오게 하려면 바이트코드를 조작해야한다.

### 바이트코드 조작 라이브러리
- ASM: https://asm.ow2.io/
- Javassist: https://www.javassist.org/ 
- ByteBuddy: https://bytebuddy.net/#/ 

ASM, Javassist는 고전이고 문서화도 잘 안되어있다. ByteBuddy가 그나마 사용하기 쉬움.

코드를 작성하는 시점에 사용할 수 있지만 이 경우 application loader가 조작 코드를 실행한다. 
클래스 로더마다 클래스를 생성할 수 있고 같은 패키지, full path가 같은 class가 여러개 생길 수 있다는 뜻이라 코드 작성 순서에 따라 적용이 안될 수 있다.

### javaagent 실습

jvm에 javaagent 옵션을 통하면 바이트코드를 활용하여 원하는 메서드를 조작할 수 있다.

#### Javaagent JAR 파일 만들기
https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html

붙이는 방식은 시작시 붙이는 방식 premain과 런타임 중에 동적으로 붙이는 방식 agentmain이 있다.

Instrumentation을 사용한다.

#### Javaagent 붙여서 사용하기
클래스로더가 클래스를 읽어올 때 javaagent를 거쳐서 변경된 바이트코드를 읽어들여 사용한다.

MasulsaJavaAgent.java
```java
public class MasulsaAgent {

    public static void premain(String agentArgs, Instrumentation inst) {
        new AgentBuilder.Default()
                .type(ElementMatchers.any())
                .transform((builder, typeDescription, classLoader, javaModule) -> builder.method(named("pullOut")).intercept(FixedValue.value("Rabbit!"))).installOn(inst);
    }

}
```

pom.xml
```xml
  <dependencies>
    <dependency>
      <groupId>net.bytebuddy</groupId>
      <artifactId>byte-buddy</artifactId>
      <version>1.10.1</version>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-jar-plugin</artifactId>
        <version>3.1.2</version>
        <configuration>
          <archive>
            <index>true</index>
            <manifest>
              <addClasspath>true</addClasspath>
            </manifest>
            <manifestEntries>
              <mode>development</mode>
              <url>${project.url}</url>
              <key>value</key>
              <Premain-Class>me.whiteship.MasulsaAgent</Premain-Class>
              <Can-Redefine-Classes>true</Can-Redefine-Classes>
              <Can-Retransform-Classes>true</Can-Retransform-Classes>
            </manifestEntries>
          </archive>
        </configuration>
      </plugin>
    </plugins>
  </build>
```

이렇게 마술사 모자 코드를 조작하는 javaagent jar가 만들어진다. 이를 직접 활용해보자.

#### Javaagent 적용 (경로는 각자 환경에 맞춰 변경하세요.)

jvm option: -javaagent:/Users/keesun/workspace/MasulsaJavaAgent/target/MasulsaAgent-1.0-SNAPSHOT.jar

## 바이트코드 조작 정리

### 프로그램 분석
- 코드에서 버그 찾는 툴
- 코드 복잡도 계산
### 클래스 파일 생성
- 프록시
- 특정 API 호출 접근 제한
- 스칼라 같은 언어의 컴파일러
### 그밖에도 자바 소스 코드 건리지 않고 코드 변경이 필요한 여러 경우에 사용할 수 있다.
- 프로파일러 (newrelic)
- 최적화
- 로깅
...

### 스프링이 컴포넌트 스캔을 하는 방법 (asm)
- 컴포넌트 스캔으로 빈으로 등록할 후보 클래스 정보를 찾는데 사용
- ClassPathScanningCandidateComponentProvider -> SimpleMetadataReader
- ClassReader와 Visitor 사용해서 클래스에 있는 메타 정보를 읽어온다.



## 참고
https://www.youtube.com/watch?v=39kdr1mNZ_s

ASM(스프링), Javassist(하이버네이트, 이제는 bytebuddy 사용), ByteBuddy, CGlib(Mokito)




