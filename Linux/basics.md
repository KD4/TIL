Basics
==============================================================

## 기본 Bash 배우기.
```
$ man bash
```
zsh, fish보다는 기본 bash를 익히자.

## `<`, `>`, `|`, 파이프, 표준출력
```
>와 <, |를 이용한 파이프를 사용해서 입력과 출력의 리다이렉션을 배우세요. >는 출력 파일을 덮어 씌우고, >>는 덧붙이는 걸 알아두세요. stdout(역주: 표준 출력)과 stderr(역주: 표준 에러 출력)에 대해서 배우세요.
```
#### standard stream
standard stream은 프로세스와 터미널 사이에 미리 연결되어진 I/O 통신 채널을 의미한다.

standard input(stdin), standard output(stdout), standard error(stderr)가 존재한다.

stdin의 경우 input device(keyboard)로부터 들어오는 텍스트들이 프로그램으로 들어오는 채널을 의미하며
stdout의 경우 프로그램으로부터 나가는 텍스트들이 output device(display)로 들어오는 채널을 의미한다.

또한 각각의 standard stream마다 이에 대응되는 file descriptor들이 존재하는데, stdin에 대응되는 file descriptor는
integer value 0이며 stdout은 1, stderr는 2에 해당된다. 프로세스가 시작될 때에는 자신의 부모 프로세스의 standard
stream들을 상속받으며, standard stream들과 대응되는 각각의 file descriptor들은 기본적으로 터미널을 가리키고
있는 상태이다. (keyboard, display, ..)

커널은 각각의 프로세스들마다 file descriptor table을 가지고 있으며, file descriptor는 file descriptor table의 index로 사용된다.
프로세스가 시작될 때에는 기본적으로 file descriptor 0,1,2을 가지고 있는 상태로 시작된다.

file descriptor table은 프로세스가 사용중인 파일을 관리하기 위해 사용되는 테이블이며, 여기에는 file table에 대한 포인터가 저장된다.

#### redirection

bash는 기본적으로 stdin, stdout, stderr에 해당하는 file descriptor 3개를 가지고 있으며 이들은 각각 0,1,2에 대응하며 모두 터미널을 가리키고 있는 상태.
이 때 bash가 command를 실행할 경우 command에 해당하는 자식 프로세스를 fork하게 되는데, 이 때 자식 프로세스는 부모 프로세스(bash)가 가진 모든 file descriptor들을 상속받아 사
용하게 된다.

1. output redirection

command > file

`>` : output redirection operator

command 1> file과 같으며, 이 명령은 command로부터 발생하는 표준 출력을 file로 전송하게 된다. 구체적으로 살펴보면, 원래 command가 사용하는 0,1,2번 file descriptor들은 모두 터미널을 가리키고 있었으나 위 명령을 실행하게되면 command가 사용하는 1번 file descriptor가 터미널 대신 file을 가리키게 되어서 command의 표준 출력으로 나가는 모든 output들은 터미널이 아닌 file로 향하게 된다. 일반적으로 command n> file 을 통해 command의 n번 file descriptor가 file을 가리키도록 할 수 있다.

```
ex) ls > abc
```

위 예제는 ls의 표준 출력을 abc 파일로 보낸다. 구체적으로는 ls 프로그램의 1번 file descriptor가 가리키는 대상을 터미널에서 abc로 변경한다.

2. input redirection

command < file

command 0< file과 같으며, 이 명령은 command의 file descriptor 0이 터미널이 아닌 file을 가리키게 한다. 따라서 command가 표준 입력을 통해 read를 수행하는 경우 command는 터미널이 아닌 file로부터 read를 수행 하게 된다.


3. file descriptor의 복사

command 2>&1

먼저 &n은 file descriptor n이 가리키는 대상에 대한 참조를 할 때 사용한다. 즉 위의 명령어를 해석해보면 command를 실행하되 command의 file descriptor 2가 가리키는 대상을 file descriptor 1이 가리키는 대상과 동일하게 한다는 의미이다(duplicating). duplicating은 aliasing과는 다른 의미인데, 위 명령어를 수행한 후 command 1> file을
수행하게 되면 command의 file descriptor 1은 file을 가리키게 되지만 file descriptor 2는 여전히 command 2>&1을 수행할 당시 file descriptor 1이 가리키던 대상을 가리키고 있게 된다.

ex) command >file 2>&1


bash가 여러개의 redirection들을 처리할 때에는 왼쪽에서 오른쪽으로 처리를 하기 때문에 여러 개의 redirection operator들을 사용하는 경우에 redirection operator의 순서는 중요하다. 위의 명령어의 경우에는 >file 부분이 먼저 처리되어 command의 file descriptor 1은 터미널이 아닌 file을 가리키게 된다. 그 다음 2>&1 부분이 처리되어
command의 file descriptor 2는 file descriptor 1이 가리키는 대상인 file을 가리키게 된다. 즉 위의 명령어를 사용하면 command가 사용하는 표준 출력 및 표준 에러가 file로 전송된다. 여러 개의 redirection들을 쓸 경우 순서(왼쪽->오른쪽)가 중요하기 때문에 위의 명령어를 command 2>&1 >file 로 바꿔쓸 경우 의도한 결과가 나오지 않는다.

순서를 바꿔서 명령어를 실행할 경우에는 먼저 2>&1 부분이 처리되어 command의 file descriptor 2가 file descriptor1과 동일한 대상을 가리키게 되고, 이 상태에서 >file 부분이 처리되어 command의 file descriptor 1이 file을 가리키게된다. 즉, file descriptor 1만이 file을 가리키게 된다.참고로 위의 명령어는 command &>file 로 줄여쓸 수 있다.


4. file descriptor closing

file descriptor가 가리키는 file을 닫기 위해서는 &- operator를 사용한다.예를 들어 stdin file descriptor를 닫을 때는 0<&-을 사용하고 stdout이나 stderr file descriptor를 닫을 때에는 각각 1>&- 와 2>&- 이렇게 사용 한다.

5. pipe

command1 | command2

위 명령은 command1의 표준 출력을 command2의 표준 입력과 연결 한다. 구체적으로는, 먼저 pipe라고 불리는 특수한 파일 하나를 생성한다. 그리고 command1의 file descriptor 1은 이 pipe를 write 모드로 가리키게 하고, comman2의 file descriptor 0은 이 pipe를 read 모드로 가리키게 한다. 이렇게 하면 command1이 발생시키는 표준
출력이 터미널 대신 pipe로 가며, command2는 터미널 대신 이 pipe로부터 read를 수행한다.


## file glob
```
*(그리고 아마도 ?과 [...])을 이용하는 파일 글롭(glob) 확장을 배우세요. 그리고 쌍따옴표"와 홑따옴표'의 차이를 배우세요. (변수 확장에 대해서 더 보려면 아래를 참조하세요)
```

glob은 와일드카드 문자를 사용해서 파일이름에 대한 셋을 명시할 수 있는 패턴이다.

예를들어, 아래와 같은 유닉스 커맨드는 파일명이 .txt로 끝나는 모든 파일을 textfiles 라는 디렉토리로 옮기라는 명령어이다.

```bash
$ mv *.txt textfiles/
```
가장 많이 사용하는 와일드카드는 `*`, `?`, `[..]`이다.

- `*` : 모든 문자들을 포함한다.
- `?` : 한 문자를 포함한다.
- `[abc]` : 버켓 안에 들어간 문자 중 하나의 문자라도 포함한다.	[CB]at	Cat or Bat	cat or bat
- `[a-z]` : 버켓 안 문자 범위에 포함된 문자가 포함되는지 검사한다.

## Bash 작업 관리에 익숙

- & : & 명령어는 command를 백그라운드로 실행하게합니다.

```
Ctrl+z, ctrl+c 그리고 fg, bg, jobs, kill과 같은 프로세스 관리 명령어를 알자!
```
`ctrl+z`는 `SIGSTOP` 신호를 프로세스로 보내서 중지시킨다. 이 신호는 프로그램에 의해서 인터셉트되지 못한다. 반면에 `ctrl+c`는 `SIGINT` 신호를 통해서 프로세스를 kill 시킨다.
이 신호는 프로그램 인터샙트가 가능하다. 그래서 깨끗하게 종료할 수 있다.

프로세스를 종료하면, 이 프로세스가 종료되었다고 아래와 같은 메시지를 띄워준다.
```
[1]+  Stopped                 yes
```

그러나 프로세스를 kill한다면 어떤 정보를 받을 수 없다.

- `fg` : fg 명령어는 이전에 중단했던 프로그램을 실행한다.
- `bg` : bg 명령어는 이전에 중단했던 프로그램을 백그라운드에서 실행하도록한다.
- `kill %1` : 이전에 실행한 프로그램을 중단시키는 명령어
- `jobs` : 중단했던 프로세스들 목록을 나타낸다.

## 기본 파일 관리: ls와 ls -l(특별히, ls -l에서 각각의 열이 무슨 의미인지 배우세요)
```
less, head, tail 그리고 tail -f(또는 더 좋은 less +F), ln과 ln -s(하드 링크와 소프트 링크의 차이와 각각의 장단점을 배우세요), chown, chmod, du( 디스크 사용량의 빠른 요약을 보려면 du -hs. 파일 시스템 관리를 위해서는 df, mount, fdisk, mkfs, lsblk. inode가 무엇인지 배우세요.(ls -i 또는 df -i)
```

ls의 `-l` 옵션은 파일 나열에 있어, 파일 형태, 사용권한, 하드링크 번호, owner 이름, group 이름, 파일 크기, 시간(따로 지정하지 않으면 파일이 만들어진 날자다)을 자세하게 나열한다. 시간은 여섯달 이전 것이면, 시간이 생략되고, 파일의 연도가 포함된다.
