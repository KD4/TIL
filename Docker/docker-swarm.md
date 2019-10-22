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
- 사용자가 Docker Swarm에게 단위 업무를 할당하는 논리적 단위로 Swarm에 의해 여러 Task로 분할되어 처리됨

Dockerized Host 또는 Host
- Docker Engine이 탑재된 VM

Manager Node 또는 Manager
- Swarm node 중에서 클러스터 관리 역할을 하는 Node

Worker Node 또는 Wokrer
- Swarm node 중에서 Container를 실행하여 실제 일을 처리하는 Node. 
```

## Docker Swarm의 기본 흐름
Swarm이 Docker Engine에 결합되어 있듯이, Swarm에게 명령을 내릴 때에도 역시 Docker Client를 사용하게 된다. 사용자가 Docker Client를 이용하여 Service를 만들게 되면,

1. Manager Node는 Service를 Task로 분할하고 각 복사본의 배치 계획을 세움
2. Manager Node는 세워진 계획에 따라 Task를 Worker Node에 배치함
3. Worker Node는 Task를 받아 각각에 대한 Container를 생성하여 실행시킴
4. 일단 Task가 Worker에게 할당되면 이 Task는 다른 Node로 이전할 수 없고 해당 Node에서 생성, 삭제, 장애의 생명주기를 마치게 된다.
