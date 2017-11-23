# DDD 기본

DDD sample : https://github.com/citerus/dddsample-core

DDD 구현 기초 : https://www.slideshare.net/madvirus/ddd-final

- DDD는 서비스로 모델을 표현한다.
- DDD는 Entity로 모델을 표현한다.
- DDD는 Value Ojbects로서 모델을 표현한다.
- DDD는 설계된 아키텍쳐로 도메인을 독립화한다.

- Entitiy는 Repository를 통해서 엑세스한다.
- Entitiy는 Aggregates로 통합관리된다.
- Entitiy는 aggregate의 최종 결과가 된다.
- Entitiy는 Factory로 캡슐화한다.

- Value Object는 Aggregates로 캡슐화한다.
- Value Ojbecs는 Factories로 캡슐화한다.

- Aggregates는 Repositry로 액세스한다.

Layered Architectrue : 계층화된 아키텍쳐

user interface는 사용자에게 정보 출력하고 사용자의 요청을 해석해서 하위 레이어에 전달

Application은 상태를 관리 비지니스 로직이나 객체 상태를 포함하지 않고 실제 비지니스 처리는 도메인에 요청

Domain : 도메인에 대한 정보를 포함하고 비지니스 객체의 상태를 포함 비지니스 로직을 제공

Infrastructure : 다른 레이어에를 위한 지원 라이브러리리 영속성 구현

Domain 레이어가 있구나 !

Domain 레이어에 포함된 것은 무엇일까? 일단 도메인 레이어에서는 비즈니스 객체의 상태를 포함하고 로직을 제공한다. (이게 서비스인가 ?)

## 도메인 모델의 기본 구성요소
Entity, Value, Aggregate, Repository, Service가 있다. ( 하위로 서비스가 있네...)

### Entity.
주요 특징으로 모델을 표현한다, 고유의 식별 값을 가진다. 모델과 관련된 비즈니스 로직을 수행한다... 자신만의 라이프 사이클을 가진다가 있다.

평가 시스템의 Entity는 Employee, Organization?

### Value

Value는 고유의 키 값을 갖지 않는다. 데이터를 표현하기 위한 용도로 주로 사용되고 개념적으로 완전한 데이터의 집합. 주로 이뮤터블이다. 변할 수 없다.

Entitry의 속성으로서 사용되며 엔티티에 종속된 라이프사이클을 가진다. 오호... 모든 엔티티에서 사용될 수 있는 공통 요소 그런거?

예를 들면 Address 객체. 이 안에는 zipcode, address1 이렇게 속성값을 가질 수 있지만 그냥 데이터 집합일 뿐!

### Aggregate

Aggregate는 관련된 객체들의 묶음이다!

특징으로는 데이터 변경 시 한 단위로 처리된다!

Aggregate는 경계를 가진다.

왜 필요할까 ? 많은 도메인 모델을 가능한 간단하고 이해 가능한 수준으로 만들 필요가 있어서 연관의 개수를 줄이고 복잡도를 감소시킨다.

각 Entity 간 연결이 존재하면 Aggregate?

모든 Aggregate는 루트를 가지고, 이 루트는 내부 객체들을 관리하고 외부에서 접근할 수 있는 유일한 객체이다.

Entity, Value, Aggregate 도출 한다..

### Repository
Repository는 Entity를 보관하는 장소 ?

Aggregate 당 한 개의 Repository 인터페이스.

Aggregate 의 CRUD 기본 단위는 루트 !

Repository의 기본 인터페이스
- Save(루트): 한 Aggreagate의 저장
- List<루트> findByName(): 특정 조건으로 검색
- delete(루트): 한 Aggregate의 삭제

### 도메인 레이어의 서비스
한 Entity나 Aggregate 에 속하지 않은 도메인 기능을 도메인 서비스로 분리

도메인 모델 중심 접근이 필요하다.
객체 연관 중심 접근이 필요하다.
