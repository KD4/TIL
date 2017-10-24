# Heap Dump

OOM은 보통 사용된 자원이 반환되지 못하고 계속 남아있어서 JVM에 할당된 heap 메모리가 모두 사용될 때 발생한다.
이럴 경우 사용된 자원이 반환되지 못하는 구간, 즉 메모리 릭(leak)이 일어난 구간을 찾아봐야하는데 이미 자신이 짠 코드에서 문제점을 찾기란 쉽지 않다.

이 상황에서 최선은, OOM이 일어나는 상황에서 메모리 상태를 확인하는 것이다. 이 일련의 과정을 '힙 덤프를 뜬다'라고 표현한다.

JVM Heap memory를 분석하기 위해서는 다음과 같은 과정을 거쳐야한다.

1. heap dump 대상 JVM 프로세스 ID를 찾는다.
2. 해당 프로세스의 Heap memory를 추출한다.
3. 분석 도구를 이용해서 분석한다.

한 단계, 한 단계 살펴보자!

### 1. Heap dump 대상 JVM 프로세스 ID 찾기
리눅스 환경에서는 "$ ps -ef | grep java" 식으로 PID를 확인하거나 jps 명령어를 이용해서 pid를 체크할 수 있다.

``` bash
[root@b0dafc436427 /]# jps
23 app.jar
24 app.jar
21903 Jps
```

### 2. 해당 프로세스의 Heap Memory 추출

힙 덤프 뜰 땐 kill -3 <pid> 를 사용하거나 jdk의 jamp을 사용할 수 있다.

```bash
$ jmap dump:format=b,file=<output filename> <pid>
```

힙덤프 분석 툴을 이용해서 분석을 하기 위해서 바이너리 파일 포맷으로 생성한다.

우리 시스템에 경우 docker 환경에서 서버 어플리케이션들이 구동되는데 이 경우는 권한 문제로 Host 머신에서 아래 명령어를 통해서 메모리를 덤프떠야한다.

```bash
$ docker exec <container-name> jcmd 1 GC.heap_dump /tmp/docker.hprof
```

### 3. 힙덤프 분석
힙덤프 분석 툴은 이클립스에서 제공하는 mat을 사용한다. mat을 아래 주소에서 다운받고, 덤프 바이너리 파일을 넣으면 리포트 기능을 이용해서 leak 원인도 파악할 수 있다.

http://www.eclipse.org/mat/

설치 후에 Fill -> Open -> Heap dump 를 하면 힙 메모리를 분석한다.
