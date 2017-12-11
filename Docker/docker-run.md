Docker Run
======================

Docker는 독립된 컨테이너 환경에서 프로세스를 실행시킵니다. 각각의 프로세스들은 로컬이나 원격 호스트에서 실행됩니다.
docker run 명령어로 실행하게되면, 컨테이너 프로세스는 호스트 의 파일시스템, 네트워크, 프로세스와 독립적인 환경에서 새로운 프로세스를 실행시킵니다.

이 페이지는 정의된 컨테이너 리소스를 어떻게 실행할 건지 를 알아봅니다.

기본적인 docker run 명령어는 아래와 같습니다.

$ docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]

*DIGEST : 요약하다, 소화하다

docker run 명령어는 이미 정의된 컨테이너 이미지가 필요하다.
이 컨테이너 이미지들은 다음과 같은 사항들을 기본 설정으로 포함하고 있다.
- deteched or foreground mode
- 컨테이너 ID
- 네트워크 설정
- CPU or memory

docker run 명령어는 새로운 옵션을 추가하거나 이미지에 셋팅되어 있는 옵션들을 오버라이딩할 수 있다.
실행하면서 컨테이너에 정의된 옵션을 오버라이딩하거나 새롭게 추가하기 위해서 run 명령어는 option태그가 있다.


### Detached vs foreground
Detached ( -d )
컨테이너를 detached mode로 실행하기 위해서는 -d=true 옵션 혹은 -d 옵션을 사용할 수 있다.

Foreground
Foreground모드에서는 다음 옵션들이 사용될 수 있다.

```bash
-a=[]    : Attach to `STDIN`, `STDOUT` and/or `STDERR`
-t       : pseudo-tty를 할당하다.
--sig-proxy=ture    :non-TTY 모드에서 모든 신호를 프로세스로 프록시 시킨다.
-i        : 프로세스에 접속되지 않은 상태에서도 STDIN 열림 상태로 유지시킨다.
```
