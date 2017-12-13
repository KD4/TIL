Redis Database
============================

한 Redis 서버에서 다른 종류의 데이터를 보관하고 싶을 때 Redis DB를 사용할 수 있다.

분리 관리가 필요한 데이터를 보관하기 위한 Redis Database 정수형 Index로 이미 정의되어 있다. 데이터베이스 이름은 사용할 수 없다. 기본적으로 client는 database 0으로 접속한다. 만약 DB를 변경하고 싶다면 index를 `SELECT` 명령어와 함께 입력하면 된다.

```bash
redis> select 1
OK
```

위 명령어를 입력하면 이제 1번 DB에서 데이터를 조작하게된다.

각 레디스 DB들은 각자의 공간에 데이터를 보관하게 되므로, stage와 production 환경 간에 다른 DB를 사용한다면 서로 데이터가 충돌할 걱정은 안해도된다. 아래 커맨드도 물론 각자 동작한다.

```bash
redis> flushdb
OK
```

모든 DB에 데이터를 날리고 싶다면 `FLUSHALL` 을 사용하자~

기본적으로 16개의 db set이 있고 설정을 바꾸고싶으면 redis.conf를 사용하자~
