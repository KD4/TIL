# ip command

```
 ip 명령어는 ifconfig와 비슷하다. ifconfig를 대체하기위해서 설계되었으며 보다 강력한 기능들을 제공한다.

 ip와 관련된 관리 작업들을 하나의 커맨드로 가능케해준다.

 ifconfig 명령어는 net-tools과 함께 deprecated될 것이다.
```


---------------------
## 자주 사용되는 커맨드들

- 컴퓨터에 IP 설정하기

```bash
$ sudo ip addr add 192.168.0.193/24 dev wlan0
```

- wlan0 인터페이스의 ip 보기

```bash
$ ip addr show wlan0
```

- wlan0 인터페이스의 특정 ip 삭제하기

```bash
$ sudo ip addr del 192.168.0.193/24 dev wlan0
```

- 라우팅 테이블 보기

```bash
$ ip route show
```

- 특정 ip의 라우팅 경로 보기

```bash
$ ip route get 10.42.0.47
```

- 기본 라우터 변경하기

```bash
$ sudo ip route add default via 192.168.0.196
```

- 네트워크 상태 보기

```bash
$ ip -s link
```

- 네트워크 모니터링

```bash
$ ip monitor all
```
