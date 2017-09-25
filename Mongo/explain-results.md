# Explain Results

Mongo DB는 db.collection.explain 메소드를 제공한다.
이 메소드는 쿼리 실행 계획에 대한 정보를 반환한다.

이 쿼리 실행 계획은 트리 형태로 되어있다.
각 트리 가지는 documents들과 인덱스 키와 같은 정보들로 구성되어 있다.

leaf node들은 특정 collection이나 indices에 연결된다.
내부 node들은 각 자식 노드들에서 다루어진 인덱스나 도큐먼트를 나타낸다.
마지막으로 root 노드들은 MongoDB 드라이버나 최종 결과에 대한 내용을 갖고있따.

각 단계는 아래 행위를 묘사한다.

- COLLSCAN : 컬렉션 스캔
- IXSCAN : 인덱스 키를 스캔
- FETCH : 도큐먼트들을 검색
- SHAD_MERGE : 각 파편들을 모아서 결과로 합병

다음 섹션은 explain 명령어를 통해서 반환되는 키 필드들을 목록으로 보여준다.
여기 묘사된 리스트 필드 설명이 완벽하지는 않다. 릴리즈마다 포맷은 바뀔 수 있다.

## QueryPlanner
queryPlanner 정보는 query optimizer에 의해서 등록된 쿼리 검색 계획이다.

#### explain.queryPlanner.namespace
쿼리가 돌아간 특정 네임스페이스 문자열

#### IndexFilterSet
쿼리 모양을 위해서 인덱스 필터를 따르는지 확인할 수 있는 지표

#### winningPlan
Query Optimizer에 의해서 선택된 도큐먼트, MongoDB는 쿼리 플랜을 트리 단계 형태로 표현한다. 각 단계는 inputStatge를 가질 수 있거나 여러개의 child stages를 가질 수 있다.

#### WinningPlan.stage
단계의 이름을 말해주는 문자열
각 단계는 해당 단계와 관련된 정보로 구성.

#### winningPlan.inputStage
child stage를 묘사하는 도큐먼트이다. 그 부모 단계의 도큐먼트나, 인덱스 키를 제공한다.
inputStage가 이것 하나뿐이면 이게 현재 field이다.

#### winningPlan.inputStages
자식 스테이지를 설명하는 문서 배열입니다. 하위 단계는 문서 또는 색인 키를 상위 단계에 제공합니다. 부모 단계에 자식 노드가 여러 개있는 경우 필드가 있습니다. 예를 들어, $ 또는 표현식 또는 색인 교차에 대한 단계는 여러 소스의 입력을 사용합니다.

#### winningPlan.inputStage
고려되었지만 query optimizer에 의해서 거부된 plan 리스트.
