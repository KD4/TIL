스프링 시큐리티
====================================

스프링 시큐리티란 무엇인가?

스프링 시큐리티는 인증(Authentication)과 접근 제어(Access-control), 즉 허가(Authorization)에 대한 일련의 과정을 높은 수준의 인터페이스와 구현체로 구성한 프레임워크다. 

스프링 시큐리티를 이해하기 위한 핵심 기능들을 정리한다.

## 용어

- Principal: 접근 주체, 보호된 대상에 접근하는 사용자
- Authenticate: 인증, 현재 사용자를 검증
- Authorize: 인가, 현재 사용자가 접근할 수 있는 서비스, 권한이 어떤 것인지 검사

## 아키텍쳐, 플로우
스프링 시큐리티가 적용된 프로젝트에 Http Request가 들어오면 AuthenticationFilter를 거쳐 Principal을 생성해 SecurityContext에 저장한다.

각각의 단계에서 AuthenticationFilter는 Authentication이라는 인증정보를 담은 클래스를 가지고 AuthenticationManager, AuthenticationProvider를 이용해 인증 처리를 진행한다.

기본적인 필터는 다음과 같다.

## security의 filters

1. SecurityContextPersistenceFilter: SecurityContextRepository에서 Securitycontext를 가져오거나 저장하는 역할
2. LogoutFilter: 설정된 로그아웃 URL로 들어오는 요청을 감시하며, 로그아웃 처리 담당
3. AuthenticationFilter: 핵심 필터라고 볼 수 있다. 설정된 로그인 URL로 들어오는 요청을 캐치해서 유저 인증 처리를 한다.
  - Authenticationmanager를 통한 인증 실행
  - 인증 성공 시, Authentication 객체를 SecurityContext에 저장 후 AuthenticationSuccessHandler 실행
  - 인증 실패 시, AuthenticationFailureHandler 실행
4. BasicAuthenticationFilter: HTTP 기본 인증 헤더를 감시하여 처리한다.
5. RequestCacheAwareFilter: 로그인 성공 후, 원래 정보를 재구성하기 위해서 사용됨.
6. AnonymousAuthenticationFilter: 이 필터가 호출되는 시점까지 사용자 정보가 인증되지 않았다면 인증 토큰에 사용자가 익명 사용자로 기록됨.
7. SessionManagementFilter: 이 필터는 인증된 사용자와 관련된 모든 세션을 추적
8. ExceptionTranslationFilter: 이 필터는 보호된 요청을 처리하는 중에 발생할 수 있는 예외를 위임하거나 전달하는 역할을 한다.
9. FilterSecurityInterceptor: 이 필터는 AccessDecisionManger로 권한부여 처리를 위임함으로써 접근 제어 결정을 쉽게 해준다.


## Authentication
모든 접근 주체는 Authentication을 관리하고 사용한다. Authentication 인터페이스는 다음과 같이 정의되어있다.

```java
public interface Authentication extends Principal, Serializable {
    Collection<? extends GrantedAuthority> getAuthorities(); // Authentication 저장소에 의해 인증된 사용자의 권한 목록 
    Object getCredentials(); // 주로 비밀번호 
    Object getDetails(); // 사용자 상세정보 
    Object getPrincipal(); // 주로 ID 
    boolean isAuthenticated(); //인증 여부 
    void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException;
}
```

## AuthenticationManager

유저의 요청과 정보가 담긴 Authentication을 Filter에서 받아 인증을 처리하는 객체다. 대부분의 경우에서 AuthenticationManager를 구현한 ProviderManager가 처리한다.
정확히는 ProviderManager는 private List<AuthenticationProvider> providers를 통해서 여러 프로바이더를 가지며 이 친구들이 처리된 값이 Authentication이다.

