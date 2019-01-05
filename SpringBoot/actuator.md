Spring Actuator
==================================

스프링 부트 액추에이터의 핵심 기능은 실행 중인 애플리케이션 내부를 볼 수 있게 하는 여러 엔드포인트를 애플리케이션에 제공하는 것이다. 

액추에이터를 이용하면 스프링 애플리케이션 컨텐스트의 빈들이 어떻게 연결됐고 애플리케이션에서 어떤 환경 프로퍼티를 사용하는지 확인할 수 있으며 매트릭 스냅샷도 볼 수 있다.

HTTP 메서드 | 경로 | 설명
----------|-----|------
GET | /autoconfig | 어떤 자동 구성 조건이 통과하고 실패하는지 나타낸다
GET | /cofigprops | 기본값을 비롯하여 구성 프로퍼티에 빈이 어떻게 주입되었는지 보여 준다.
GET | /beans | 애플리케이션 컨텐스트에 있는 모든 빈과 빈 사이의 관계를 보여준다.
GET | /dump | 스레드 활동의 스냅샷 덤프를 조회한다.
GET | /env | 모든 환경 프로퍼티를 조회한다.
GET | /env/{name} | 환경 변수 이름으로 특정 환경 값을 조회한다.
GET | /health | 헬스인디케이터 구현체가 제공하는 애플리케이션 헬스 매트릭을 보여준다.
GET | /info | info로 시작하는 프로퍼티로 사용자 정의된 애플리케이션 정보를 조회한다.
GET | /mappings | 모든 URI 경로와 해당 경로를 포함한 컨트롤러에 어떻게 매핑되었는지 나타낸다.
GET | /metrics | 메모리 사용량과 HTTP 요청 카운터 등 매트릭을 보고한다.
GET | /metrics/{name} | 매트릭 이름으로 보고한다.
POST | /shutdown | 애플리케이션을 종료한다. 
GET | /trace | HTTP 요청의 기본 트레이스 정보를 제공한다.

## 액추에이터 추가하는 방법

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```


