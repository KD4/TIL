Spring Boot Inmemory DB
=============================

스프링부트가 지원하는 인-메모리 데이터베이스
- H2
- HSQL
- Derby

Spring JDBC가 클래스패스에 있으면 필요한 빈들이 자동으로 설정된다. 

우선 Web, JDBC, H2 의존성을 추가하여 실습 스프링 프로젝트를 만들어보자.

(자동 설정에 대한 의존성은 각 패키지에 spring.factories에 정의 되어있다.)

그럼 눈에 띄는 의존성이 하나 있다. Hikari CP

### Hikari Connection Pool

hikari connection pool 라이브러리는 SpringBoot 2.x에서 채택한 JDBC Connection Pool이다. 다른 CP에 비해 성능이 압도적이라고 한다. 

무슨 일을 해주는 친구일까?

JDBC API를 사용해서 하나의 쿼리가 실행되는 과정은 다음과 같다.

```java
// 대충 커넥션 열어서 쿼리 실행하고 사용된 리소스를 반납하는 내용
  Connection connection = null;
  PreparedStatement preparedStatement = null

  try {
    connection = hikariDataSource.getConnection();
    preparedStatement = connection.preparedStatement(sql);
    preparedStatement.executeQuery();
  } catch(Throwable e) {
    throw new RuntimeException(e);
  } finally {
    if (preparedStatement != null) {
      preparedStatement.close();
    }
    if (connection != null) {
      connection.close(); // 여기서 connection pool에 반납됩니다.
    }
  }
```

여기서 `hikariDataSource.getConnection()` 인 부분을 주목하자.

hikariPool에서는 Connection 객체를 한번 래핑한 PoolEntry라는 래퍼 클래스를 통해 Connection을 관리한다. 하지만 결국 Connection 객체이다.

getConnection 메소드를 호출했을 때 현재 스레드와 Hikari CP와의 로직은 다음과 같이 이뤄진다. 

```
[Thread-1님] 안녕하세요 Hikari님! Connection 하나만 주세요~
[Hikari님] 안녕하세요 Thread-1님! 저희 pool에서는 Connection을 주는 규칙이 있답니다. 확인해볼게요~
[Hikari님] 이전에 Thread-1님이 저희 pool에 방문한 내역 먼저 살펴볼게요!
[Hikari님] 오! 이전에 방문한 내역이 있으시네요~ 근데 그때 사용한 Connection은 다른 Thread 님이 사용 중(active) 이시네요~
                 다른 Thread님이 안 쓰셨으면 빠르게 이 Connection 먼저 드렸을 텐데 아쉽네요ㅠㅠ
[Thread-1님] 괜찮아요! Hikari님 다른 Connection 주세요~
[Hikari님] Pool 전체에서 사용 가능한(idle) Connection이 있는지 찾아볼께요~
[Hikari님] (Loop 돌면서 찾는중…)
[Hikari님] Thread-1님 지금 전체 Connection이 다 사용중이에요! ㅠㅠ
                 저기 handoffQueue 앞에 가서 좀 기다리셔야 할 것 같아요 ㅜㅜ
[Thread-1님] 네 괜찮아요! (안 괜찮음) 저기서 30초만 기다려보고 없으면 Exception내면 되죠^^
                     (깨알 Tip. HikariCP default Connection timeout은 30초 입니다.)
[Hikari님] 네 죄송합니다 Thread-1님. 다음에 또 다시 방문해주세요~
[Thread-1님] (handoffQueue에서 다른 Thread가 쓰고 반납한 Connection을 얻었다!)
```

Hikari CP는 멀티 스레드 환경에서 DB와 커넥션을 미리 맺어놓고 필요할 때마다 스레드들에게 커넥션을 제공한다. 

이 hikari CP는 Spring JDBC의 기본 CP로 채택되었으므로 DataSource를 다른 것으로 명시하지 않으면 자동으로 hikariDatasource가 주입된다. 

ApplicationRunner를 통해 dataSource를 사용하는 예제를 봐보자.

### H2 사용

위에서 언급한대로 JDBC와 H2 의존성을 만들면 h2 인메모리 DB가 실행되고 이 DB에 접속하는 datasource 빈이 자동으로 생성된다.

```java
@Component
public class H2Runner implements ApplicationRunner {

    @Autowired
    DataSource dataSource;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            System.out.println(connection.getMetaData().getURL());
            System.out.println(connection.getMetaData().getUserName());

            Statement statement = connection.createStatement();
            String sql "CREATE TABLE USER(...)";

            statement.excuteUpdate(sql);
        }
    }
}
```

스프링 애플리케이션을 실행하면 빈이 모두 생성된 뒤 위 runner가 실행된다. 

위 코드대로 table이 생성됐는지 확인하는 web GUI를 H2에서 제공한다.

### h2 console

만들어진 테이블을 확인하는 방법은 IDE에서 Database Client를 사용하는 방법도 있지만 
h2 console을 이용하는 방법도 있다. 


spring.h2.console.enabled=true 를 넣은 후 브라우저에서 localhost:8080/h2-console 로 접속하면 현재 로컬에 실행된 h2 DB에 접속하는 WEB GUI를 확인할 수 있다. 

`spring-boot-devtools라는 의존성을 추가해도 가능, 그러면 위 옵션을 활성화해줌`


### JDBC template
위 예제 코드에서는 DataSource를 직접 사용하여 코드가 길어졌는데 JdbcTemplate를 사용하면 간결하고 안정성 있게 코드를 작성할 수 있다. 
```java
@Component
public class H2Runner implements ApplicationRunner {

    @Autowired
    JdbcTemplate JdbcTemplate;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        JdbcTemplate.execute("CREATE TABLE ~~");
    }
}
```

datasource를 그대로 사용하는 것보다 jdbcTemplate을 사용하면 좀 더 간결하고 리소스에 대한 안정성을 높이면서 사용할 수 있다. 예외를 던질 때 가독성이 높은 에러 메시지를 확인할 수 있다. 기본 jdbc API를 사용하는 것보다 JdbcTemplate을 사용하자. 