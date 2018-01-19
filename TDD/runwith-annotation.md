JUnit @RunWith
===============================

Spring에서 JUnit 기반으로 테스트 코드를 작성할 때, 클래스 상단에 @RunWith(...) 어노테이션을 사용하는 경우가 있다.

이 @RunWith 어노테이션은 무슨 역할을 할까?

## @RunWith
```
When a class is annotated with @RunWith or extends a class annotated with @RunWith, JUnit will invoke the class it references to run the tests in that class instead of the runner built into JUnit
```

기본 JUnit Runner 대신 저 어노테이션 파라미터로 넘겨지는 class로 테스트를 진행시킨다.

토비 선생님의 책에서는 더욱 자세히 설명되어있다.

```
 @RunWith는 JUnit 프레임워크의 테스트 실행 방법을 확장할 때 사용하는 어노테이션이다.
 SPringJUnit4ClassRunner라는 JUnit용 테스트 컨텍스트 프레임워크 확장 클래스를 지정해주면 JUnit이 테스트를 진행하는 중에 테스트가 사용할 애플리케이션 컨텍스트를 만들고 관리하는 작업을 진행해준다. 
 @ContextConfigration은 자동으로 만들어 줄 애플리케이션 컨텍스트의 설정 파일 위치를 지정한 것이다.

 스프링의 JUnit 확장 기능은 테스트가 실행되기 전에 딱 한 번만 애플리케이션 컨텍스트를 만들어두고, 테스트 오브젝트가 만들어질 때마다 특별한 방법을 이용해 애플리케이션 컨텍스트 자신을 테스트 오브젝트의 특정 필드에 주입해준다.
```

## 자주 사용되는 Runner들

1. SpringJUnit4ClassRunner
  스프링 컨텍스트 로딩에 많은 시간이 걸리기 때문에 테스트 메소드마다 컨텍스트를 로딩하면 느리다. 이 러너는 초기에 한번만 컨텍스트를 로딩하고 각 테스트들이 이 컨텍스트를 공유한다.

2. MockitoJUnitRunner
Mock 초기화와 같은 반복적인 mock 생성 작업을 자동화해준다.

