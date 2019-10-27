Docker Swarm
=================================

**Docker Swarm은 여러 대의 Dcoker 컨테이너들을 엮어서 마치 하나인 것처럼 다룰 수 있게 해주는 클러스터링 도구, 또는 오케스트레이션 도구이다.**

## Docker Swarm 개요
Docker Swarm은 2014년에 시작한 프로젝트로 Docker에서는 1.12 부터 결합되어 Swarmkit를 제공한다. 이전에 존재했던 프로젝트는 Docker Swarm Standalone이란 프로젝트로 여전히 건재하다.

Dcoker Engine을 Swarm Cluster에 참여시키면 이 Docker Engine은 Cluster의 일부로서 통합되게 되는데, 이러한 상태를 Docker Swarm mode라고 부른다. 

## Docker Swarm 기능
Docker Swarm은 여러 Host 들을 엮어서 하나의 Host처럼 다룰 수 있도록 해주는 `사용자 인터페이스`

Cluster에 속한 Host 중 일부에서 장애가 발생하더라도 서비스의 연속성을 최대한 확보할 수 있도록 해주는 `Cluster 가용성 관리`

Service 단위를 관리하여 생명주기 및 노드 관리를 도와주는 `Orchestrator로서의 역할`


## Docker Swarm 용어와 동작

```

Container
- 사용자가 실행하고자 하는 프로그램의 독립적 실행을 보장하기 위한 격리된 실행 공간

Task
- Docker Container 또는 그 격리 공간 안에서 실행되는 단위 작업, Swarm이 작업 계획을 관리하는 최소 단위

Service
- 서비스는 매니저 노드나 워커 노드에서 실행되는 task 들의 정의이다. 서비스 개념은 swarm 시스템의 중심으로 swarm 시스템과 사용자 간 인터페이스이다.
- 서비스를 만들 때, 사용할 컨테이너 이미지와 실행 중인 컨테이너에게 명령할 내용을 명시한다.
- replicated services model에서 swam manger는 명시된 숫자만큼의 복제 테스크는 각 노드들에게 실행한다. 
- global services에서는 swarm은 한 개의 task를 클러스터에 사용가능한 모든 노드에게 명령한다.

Dockerized Host 또는 Host
- Docker Engine이 탑재된 VM

Node
- Node는 swarm에 참가하는 도커 엔진 인스턴스이다. 도커 노드라고도 지칭한다. 노드는 하나 또는 여러 개가 있을 수 있다. (하나의 물리 컴퓨터 혹은 클라우드 서버)
하지만 운영 환경의 swarm developments는 여러 pm이나 클라우드 머신에서 관리되는 분산 노드 환경을 기본적으로 고려한다.


Manager Node 또는 Manager
- 어플리케이션을 swarm을 통해서 배포하기 위해선, 매니저 노드가 있어야한다. 매니저 노드는 워커 노드들에게 task를 통해 명령을 내린다.
- 매니저 노드는 swarm 기능을 이용해서 클러스터링 기능이나 오케스트레이션 기능을 수행한다. 매니저 노드는 오케스트레이션 task를 수행학기 위해 선출된 하나의 노드다.

Worker Node 또는 Wokrer
- Swarm node 중에서 Container를 실행하여 실제 일을 처리하는 Node. 
- worker 노드는 매니저 노드로 부터 task를 받아 처리하는 노드다.
```

## Docker Swarm의 기본 흐름
Swarm이 Docker Engine에 결합되어 있듯이, Swarm에게 명령을 내릴 때에도 역시 Docker Client를 사용하게 된다. 사용자가 Docker Client를 이용하여 Service를 만들게 되면,

1. Manager Node는 Service를 Task로 분할하고 각 복사본의 배치 계획을 세움
2. Manager Node는 세워진 계획에 따라 Task를 Worker Node에 배치함
3. Worker Node는 Task를 받아 각각에 대한 Container를 생성하여 실행시킴
4. 일단 Task가 Worker에게 할당되면 이 Task는 다른 Node로 이전할 수 없고 해당 Node에서 생성, 삭제, 장애의 생명주기를 마치게 된다.


