BOM
======================

Bill Of Meterials의 약자

일종의 특별한 POM 파일로 프로젝트에서 사용하는 Dependency들을 한 곳에서 관리하고 싶을 때 사용한다.

POM은 프로젝트의 정보 및 설정을 담고 있는 XML 파일이다. 프로젝트를 빌드하기 위한 dependecy를 관리하는데 사용한다. 

이 MAVEN POM 의존성의 버전을 관리하다보면 라이브러리 버전이 꼬이는 경우가 종종있다. 특히 규모가 큰 프로젝트의 경우 여러 모듈이 함께 같은 라이브러리, 프레임워크를 사용하게되는데 이 경우 프로젝트에서 사용하는 라이브러리, 프레임워크의 버전 정보를 BOM이라는 명세를 통해서 고정할 수 있다.

### BOM  예시

```xml
<dependencyManagement>
    <dependencies> 
        <dependency> 
            <groupId>org.springframework</groupId>
            <artifactId>spring-framework-bom</artifactId> 
            <version>4.3.8.RELEASE</version> 
            <type>pom</type> 
            <scope>import</scope> 
        </dependency> 
    </dependencies> 
</dependencyManagement>
```

### BOM 사용
gradle에서 >

```
buildscript {
    dependencies {
        classpath 'io.spring.gradle:dependency-mamnagement-plugin:$Version'
    }
}

configure(allprojects) {
    apply plugin: 'io.spring.dependency-management' // maven의 <dependencyManagement> 섹션과 동일한 역할
    {
        imports {mavenBom 'io.spring.platform:platform-bom:$Version'}
    }
}
```
