Spring Tracsaction
===================================

tracsaction을 관리하는 방법은 프로그램적인 방법과 선언적인 방법이 있는데, 스프링은 선언적 트랜잭셔널을 지원한다.

선언적 트랜잭션: 어노테이션 혹은 AOP 설정을 통해 비즈니스 로직과 트랙잭션 로직을 분리시킬 수 있는 방법.

## Spring transaction 속성
- propagation: 상위 트랜잭션과 하위 트랜잭션 관계에서 트랜잭션을 어떻게 전파할 지에 대한 속성. 기본값 propagation_required로 상위 트랜잭션을 그대로 전파한다. 
- isolation: 트랜잭션 격리 레벨에 관한 속성으로 기본값은 default 레벨, 실제 DB의 isolation 값을 따른다. 
- readOnly: 트랜잭션을 읽기 전용으로 지정하는 속성, 최적화 관점에서 지원하는 프로퍼티.
- timeout: 트랜잭션 타임아웃을 지정하는 속성, 지정하지 않을 경우 사용하는 트랜잭션 시스템의 타임아웃을 따른다. 
- rollbackFor: Checked 예외 발생 시에 롤백을 수행할 예외를 지정하는 속성.
- rollbackForClassName: rollbackFor와 동일, 문자열로 클래스명을 받을 수 있음.
- noRollbackFor: Spring의 트랜랙션은 기본적으로 Runtime 예외만 롤백 처리를 수행하지만 Runtime 예외 중 특정 예외는 롤백을 수행하지 않도록 지정하는 속성
- noRollbackForClassName: 클래스명으로 위 설정을 함.

## propagation 속성
propagation 속성은 트랜잭션을 새로 개시할 지 혹은 기존 트랜잭션을 이용할지등을 설정하는 속성으로 다음과 같은 설정들이 있다.

- MANDATORY: 트랜잭션이 존재할 경우 해당 트랜잭션을 이용하며 존재하지 않을 경우 예외 발생
- NESTED: 트랜잭션이 존재할 경우 중첩된 트랜잭션을 개시하고 존재하지 않을 경우는 REQUIRED와 동일하게 동작.
- NEVER: 트랜잭션이 존재할 경우 예외 발생
- NOT_SUPPORTED: 트랜잭션이 존재할 경우 중단해서 트랜잭션을 이용하지 않음.
- REQUIRED: 트랜잭션이 존재하는 경우 해당 트랜잭션을 그대로 하며 개시된 트랙잭션이 없는 경우 트랜잭션을 개시(기본값)
- REQUIRES_NEW: 항상 신규 트랜잭션을 개시함. 트랜잭션이 존재하는 경우 해당 트랜잭션을 중단하고 새로운 트랜잭션을 개시.
- SUPPORTS: 트랜잭션이 존재할 경우 해당 트랜잭션을 이용하고 존재하지 않을 경우는 트랜잭션을 이용하지 않음

## isolation 속성
- DEFAULT: 기본 격리 수준
- READ_UNCOMMITED: 커밋되지 않은 데이터에 대한 읽기 가능
    - 아직 COMMT 되지 않은 신뢰할 수 없는 데이터를 읽어옴(dirty read)
    - 한 트랜잭션에서 동일한 SELECT 쿼리의 결과가 다름(non-repeatable read)
    - 이전의 SELECT 쿼리의 결과에 없던 row가 생김(phantom read)

- READ_COMMITED: 커밋된 데이터만 읽기 가능
    - 한 트랜잭션에서 동일한 SELECT 쿼리의 결과가 다름(non-repeatable read)
    - 이전의 SELECT 쿼리의 결과에 없던 row가 생김(phantom read)

- REPEATABLE_READ: 하나의 트랜잭션이 읽은 로우를 스냅샷 떠서 보관, 다른 트랙잭션의 커밋이 반영되지 않고 동일한 내용을 보장함. MySQL InnoDB의 기본 isolation Level. 

- SERIALIZABLE: 한 트랙잭션에서 SELECT 쿼리를 실행 트랜잭션에 shared lock이 걸림. 즉 수정, 삭제, 삽입이 불가능함.
