ifKakao - 카카오 광고 플랫폼 MSA 적용 사례 및 API Gateway, 인증 구현에 대한 소개
=========================================

발표자 : 황민호(robin.hwang) - 카카오

설명: 최근 Spring Cloud와 Netflix OSS로 MSA를 구성하는 시스템 기반의 서비스들이 많아지는 추세입니다.
카카오에서도 작년에 오픈한 광고 플랫폼 모먼트에 Spring Cloud 기반의 MSA환경을 구성하여, API Gateway도 적용하였는데 1년 반 정도 운영한 경험을 공유할 예정입니다. 더불어 MSA 환경에서는 API Gateway를 통해 인증을 어떻게 처리하는지 알아보고 OAuth2 기반의 JWT Token을 이용한 인증에 대한 이야기도 함께 나눌 예정입니다.

발표 속기
---------------------------------

처음 3분... 광고 플랫폼 소개~

광고 API SERVER 는 Moment, Agency, Admin, Review API 서버들이 있다.

MSA의 기본적인 구성 : API Gateway, Authentication, Authorization

## API Gateway
역할 : API 라우팅, 인증/인가 처리, 과도한 요청 (어뷰징 방지), Aggregation, Logging, Statistic, Mediation

구현체 : Zuul, AWS API, Umbrella, Manager, N+ Tyk, Kong등

Zuul을 사용한 이유: 스프링과 잘 융합됨. 설정이 편하다.

#### MSA 구성을 위한 솔루션들
- Eureka: micro service 등록할 수 있다. 유레카에 서버 id를 통해서 서버 등록

- Ribbon: 로드 밸런싱 담당

- Zuul: 라우팅 담당

- Hystrix: 서킷브레이커
다른 서비스에 문제가 생겼을 때 히스트릭스를 통해서 격리시킬 수 있다.

히스트릭스 스레드 방식과 세마포 방식이 있다고하는데, 무슨 차이인지 알려주지 않았다.

// TODO 스레드 방식과 세마포 방식에 대해서 알아보기.

리본 타임아웃과 히스트릭스 타임아웃 설정이 다르다.
리본은 읽기시간 + 커넥션시간 * 재시도 횟수 * 재시도 서버수
리본 디폴트가 로드밸런서임에도 불구하고 헬스체크를 안한다?
리본에서 헬스체크를 한다고했는데, 어떻게 하나?

- Zuul: 블로킹 API servelt2.5, WEbsockt not support

- Zuul2: Netty Server, Http2 Websocket support, Orgin Concurrency 가능
... 스프링 클라우드

Zuul2는 리퀘스트와 필터 사이에 네티서버가 있다.

스프링 클라우드 게이트는 Predicate: 요청과 관련된 필터체인을 통해 요청을 전송
필터는 프록시 역할.

스프링 클라우드 게이트 웨이의 프리디케이트 팩토리
after, before, between, cookie, header, host, remote


MSA에서 사용자 인증 정보를 가지고 있는 방법 2가지 : 세션관리, 토큰 관리

- 세션은 서버에 저장한다.
- 토큰은 사용자 브라우저에 가지고 있다고 보면된다.
- 고정세션관리 Sticky Serssion 각 서버에서 인증정보를 가진다. 특정 사용자가 인증된 서버가 있으면 그 서버로 들어간다. 이러면 그 서버가 죽으면 날라감
- 세션 복제는 Session Replication: 인스턴스 수 증가에 따라 대역폭이 증가함
- 중앙 집중식 세션은 공유 세션 저장소에 사용자 인증 정보를 저장하고 이를 참조하는 형태 세션 저장소에 대해서 보안 매커니즘이 필요하다.

- 클라이언트 토큰 방식은 사용자 브라우저에 쿠키형태로 저장한다. 위변조가 불가능해야하므로 암호화 불가능, 시스템마다

### SSO
single sign on 사용자는 한번 로그인하면 다른 여러 시스템에 추가 인증 프로세스 없이 접근 가능 SSO 서버와 상호작용필요

API 게이트웨이를 통한 클라이언트 토큰 방법 게이트웨이에서 이 토큰을 검증해주는 방식

사용자 로그인 > 카카오 인증에서 쿠키를 받아서 -> 인증서버에서 JWT 토큰 발급 >

### JWT
base64 로 암호화됨
- JWT 헤더 : 암호화 방식
- JWT 바디: 사용자 정보
- JWT Signature: 이 토큰에 대한 유효성
- 장점: 수평으로 쉽게 확장 가능, 유지 보수 및 디버그 용이, 보안성, RESTful 서비스에 적합, 토큰 자체 만료시간 기술

* 리프레시 토큰 검증을 IP, 브라우저 핑거프린터를 통해서 검증한다,
(같은 회사, 아이폰 단말기는 핑거프린트가 통일, 같은 API를 사용한다면 검증 신뢰성이 낮아질 것 같은데)

### 엑세스 토큰 무효화, JWT 관리 및 opaque token
- 발급 받은 opaque token을 API gateway 토큰을 변환시켜서 opaque token을 내려준다.
- 인증 정보 자체를 opaque token으로 하고 로그아웃하면 이걸 무효화 시킨다.
