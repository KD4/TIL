ORM and JPA
==========================

## Object Relational Mapping
객체와 관계형 데이터베이스의 데이터를 자동으로 매핑(연결)해주는 것

관계형 데이터베이스를 SQL로 직접 다룰 때 발생하는 문제점(코드 반복, SQL 의존적 개발)을 보완하기 위해 나온 개념

### ORM의 장점
1. 객체 지향적이기 때문에 개발자가 비지니스 로직 및 코드 자체에 집중할 수 있다.
2. 관념적 코드가 없거나 적어진다.
3. 코드의 재사용, 유지보수성이 증대
4. DBMS의 종속성이 줄어든다.

### ORM의 단점
1. N+1 문제등 해결해야할 과제가 있다.
2. 생성되는 쿼리 속도등의 문제가 있다.
3. 설계가 잘못되면 일관성이 무너지거나 성능 저하의 문제가 있다.


## Java Persistence API

Application과 JDBC 사이에서 동작한다.

[Java APP(JPA->JDBC)]<->DB

### JPA의 구현체
1. Hibernate
2. Spring Data JPA
 - JPA를 한단계 추상화시킨 Repository

 
