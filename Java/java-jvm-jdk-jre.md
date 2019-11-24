[인프런 더 자바] 1-1 JVM 이해하기
=============================================

자바, JVM, JDK, JRE
- 목표: 이것들이 뭔지, 뭐가 다른지 이해한다.

## JVM (Java Virtual Machine)
자바 가상 머신으로 자바 바이트 코드(.class 파일)를 OS에 특화된 코드로 변환(인터프리터와 JIT 컴파일러)하여 실행한다.

바이트 코드를 실행하는 표준(JVM 자체는 표준)이자 구현체(특정 밴더가 구현한 JVM)다.

JVM 스팩: https://docs.oracle.com/javase/specs/jvms/se11/html/

JVM 밴더: 오라클, 아마존, Azul, ...

특정 플랫폼에 종속적.

## JRE (Java Runtime Environment): JVM + 라이브러리
자바 애플리케이션을 실행할 수 있도록 구성된 배포판.

JVM과 핵심 라이브러리 및 자바 런타임 환경에서 사용하는 프로퍼티 세팅이나 리소스 파일을 가지고 있다.

개발 관련 도구는 포함하지 않는다. (그건 JDK에서 제공)

## JDK (Java Development Kit): JRE + 개발 툴
JRE + 개발에 필요할 툴

소스 코드를 작성할 때 사용하는 자바 언어는 플랫폼에 독립적.

오라클은 자바 11부터는 JDK만 제공하며 JRE를 따로 제공하지 않는다.

Write Once Run Anywhere

* 예전에는 JDK와 JRE를 따로 줬는데 자바 11부터는 같이 제공한다.
* 자바 9부터 모듈 시스템이 들어와서 이 모듈 시스템을 사용해서 JRE 비슷한 걸 만들 수 있다(jlink라고 한다.)
* 어차피 개발자는 JRE만 받아서는 컴파일 할 수 없기 때문에 대부분 다 JDK를 다운받아서 사용한다.
* 흔히 초급 개발자는 JRE만 받아서 javac를 실행하려는 실수를 한다. 

## 자바
프로그래밍 언어, 자바라는 프로그래밍 언어는 HelloJava 등을 사용할 때 봤던 프로그래밍 언어!

JDK에 들어있는 자바 컴파일러(javac)를 사용하여 바이트코드(.class 파일)로 컴파일 할 수 있다.

자바 유료화? 오라클에서 만든 Oracle JDK 11 버전부터 상용으로 사용할 때 유료.

즉, 자바 언어 자체는 무료다. (아마존 JDK는 무료! Open 오라클 JDK는 무료!)
- https://medium.com/@javachampions/java-is-still-free-c02aef8c9e04



## JVM 언어
최초의 JVM은 자바 언어만을 위해서 만들어졌지만 사실 자바와 의존성이 타이틀하지 않다. 

언어를 컴파일 했을 때 class(자바 바이트코드를 만들어준다면)를 만들어준다면 JVM을 사용할 수 있다.

JVM 기반으로 동작하는 프로그래밍 언어
- 클로저, 그루비, JRuby, Jython, Kotlin, Scala, ...

## 참고
- JIT 컴파일러: https://aboullaite.me/understanding-jit-compiler-just-in-time-compiler/
- JDK, JRE 그리고 JVM: https://howtodoinjava.com/java/basics/jdk-jre-jvm/
https://en.wikipedia.org/wiki/List_of_JVM_languages


