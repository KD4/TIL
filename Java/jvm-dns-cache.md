# JVM의 DNS 캐시

JVM은 일단 실행되면 그 이후부터의 도메인 네임을 통한 네트워크 접속시 DNS 정보를 캐싱한다. 이 정보는 설정된 TTL(Time-To-Live) 시간 동안 유효하다.

-1 : cache forever (default)

0  : cache disable (매번 DNS server에서 Lookup)

0< : TTL 시간 (60은 60초)

default 값이 영원히 캐시이다. 그러므로 한번 캐싱된 DNS 정보는 그 도메인에 대한 IP 정보가 변경되었을 때 문제가 될 수 있다.

한 예로 대부분의 어플리케이션에서 HMA DB 접속 시 이용해서 도메인 이름을 이용해서 접속하고 있는데 master DB가 문제가 있을 때 slave DB가 서비스 모드로 변경되었을 때도

캐싱된 데이터 떄문에 제대로된 failover를 보장할 수 없다.

이 JVM DNS CACHE 옵션 변경은 3가지 방법으로 이루어진다.

1. JVM 구동시 java 옵션 전달
```java
java -Dsun.net.inetaddr.ttl=30
# tomcat 구동시 JVAVA_OPTS 환경 변수에 위 옵션 추가
```

2.  jre/lib/security/java.security 파일에 프라퍼티를 추가
```
networkaddress.cache.ttl=30
```

3. APP 코드 안에 아래 코드 추가
```java
java.security.Security.setProperty("networkaddress.cache.ttl" , "30");
```
