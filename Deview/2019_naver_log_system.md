로그를 지탱하는 기술
===============================

DEVIEW 2일차 첫 번째 세션인 `네이버 로그를 지탱하는 기술`에서는 네이버 로그 시스템을 수집, 저장, 가공, 분석으로 나누어 공유했습니다.

## 로그 저장 이야기

### 로그 파이프라인 구축 전 문제점

로그 저장관련해서 문제가 있었다. 

네이버 검색 서비스에서 발생하는 문제를 해결하기 위해서는 내가 사용하는 로그가 어딨는지 알아야한다.

생산자는 로그를 사용하는 사용자에게 알아서 서버를 열어줘서 소비자가 어떻게 줘야할까 고민했다.

생산자 소비자 강한 결합?

사용자가 직접 받아가야한다면 서버가 많아질수록 로그 서버 부하가 많다.

### 로그 생산자와 소비자의 분리.
네이버의 로그 파이프라인 설명

log producer가 hbase에 1차적으로 저장됨.

hbase에 저장한 원본 로그를 바탕으로 비지니스 목적에 맞게 가공한 후 ORC 포맷으로 HDFS에 저장

그리고 데이터 카탈로그를 통해 저장되어있는 로그에 대한 정보 제공 기능

로그 저장소에 주요기능

유실없는 로그 저장

내가 원하는 기간에 생성된 로그를 필요한 필드만

동일한 인터페이스를 통해 받아갈 수 있는 플랫폼이다.

그외에도 보안 정보에 대한 처리 사용자 관리 등이 필요하다

### 장애 상황 관리
유실 없는 로그 저장을 위해서?

At-least-once 기법? 최소 한번은 전달하도록 보장하는 방법
데이터 전달이후 일정시간안에 ack를 받지 않으면 다시 . 이 방법은 데이터 중복이 발생할 수 있음
그래서 receiver가 이 처리를 해야함. 외부 저장소의 고유 식별자를 사용한 id 쓰기
sender가 전송하는 데이터는 불변데이터이기때문에 id가 동일한지만 체크하면 된다
로그데이터는 유니크 키가 없어서 고유 식별자를 설계하는 것이 키포인트
처음에는 로그를 해쉬값으로 구현 이건 같은 데이터는 해쉬가 된다. 시퀀스를 도입. 하지만 시퀀스
UUID 범용 고유 식별자 - 버전1 네트워크 카드의 mac 주소와 시간을 기반으로 유니크한 ID 생성

Q? Mac 주소를 어떻게 알지? > 아 센더서버의 IP를 사용했다; 로그 생성시간을 ns로 넣는다.
variant 값은 로그 파일 라인 위치까지 적는다.

RowKey 디자인
로우키에 카테고리 개념을 두었다.
RGM 로그 생성시간 IP variant 형태로 로그가 저장됨
RGM은 카테고리 개념의 키, 지역, 그룹, 메시지타입의 약자
hbase는 메시지의 형식에 따라 핫스팟 현상이 생길 수 있다.
이를 방지하기위해 salf를 만들어서 각기 다른 region에 저장하게한다.

## hbase의 컬럼패밀리

hbase안에서도 저장 공간을 용도별로 나눔. 즉 값의 특정 필드를 도메인에따라 column family를 나눠 저장함

Data catalog
사용자 역할 관리, 데이터 필드 정보 및 포맷 관리

티켓?
리소스 관리 및 접근제어
실제 데이터를 생성? 각 티켓 등록
또한 각 티켓은 용도별로 구분해서 사용할 수 있도록?

로그 저장은 결국엔 적당히 포맷팅해서 Hbase에 저장하겠다.

로그를 활용하는 방법에 대해서

기술적으로는 Hive가 핵심
네이버 검색에서 로그를 가져가 활용하는 전반에 대한 이야기
네이버 검색 로그란? 새로운 서비스의 시작. 로그를 통해서 많은 서비스를 만들어 낼 수 있다.
사용자 반응의 바로미터.

하루 모바일 수십억건. TB 단위

로그를 찾는 사람들, 서비스 개발자, 검색 모델링, 데이터 분석, 기획/전략, 보안 모든 직군이 이 로그를 필요로 한다
한해 로그 분석 의뢰는 수백건

로그 활용의 문제점은 비효율적인 프로세스로 진행됐었다.
직접하지 못하니 로그 엔지니어가 요구사항을 분석해서 지표를 추출해야했다.

이를 효율적으로 활용하기 위해서 데이터 스토어를 도입했다.
이 데이터 스토어에 권한을 부여받아 로그가 필요한 사용자가 직접 접근할 수 있게 됐다.

데이터 스토어는 HDFS가 해야한다. 프로그래밍에 익숙하고 터미널 환경, MR를 해야한다.
데이터 스토어를 직접 접근해서 활용하기 어려웠다.

그래서 SQL Interface가 나왔다.
Hbase > Hive를 통해 로그 활용 가능.
관련 툴은 beeline, hue, zepplin, python spark 환경도 제공한다.

로그 활용의 문제
가공되지 않은 로그에서 비지니스적으로 의미있는 지표를 추출하는 것은 또 다른 문제.

그간 이뤄진 로그 분석 의뢰권을 전수 조사해서 템플릿으로 만들었다.
요구사항을 큰 카테고리로 나눌 수 있었다. 자주 분석된 패턴을 SQL 형태로 템플릿화하고 HUE에 등록했다;
새로 나온 요구사항은 깃헙 이슈로 등록한다.

테이블을 재가공해서 사전 계산 테이블을 만든다.
2차 테이블은 하루에 한번 배치형태로 생성한다

ORC 포맷으로 저장되는데 컬럼별로 저장되는 포맷이다.

테이블 성능을 개선하기 위해서 파티셔닝을 기간별로 했다.

칼럼을 해시 기준으로 버켓으로 사용함.
조인키로 사용하는 키를 bucket으로 사용하면 좋다.

특정 검색어로 버켓을 만들면 검색어 집중 시 핫스팟이 발생할 수 있음.
메모리를 늘리고 IO를 감수하더라고 메모리 의존도를 낮춰야 OOM 발생을 회피할 수 있음