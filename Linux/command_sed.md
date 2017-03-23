# SED 명령어

### 스트림 편집기 (SED)
- ed명령어와 grep 명령어 기능의 일부를 합친 것이 sed(stream editor) 명령어이다.

 이 명령어는 파일을 수정할 수 있게 하는 반면 ed처럼 대화식 처리는 불가능하다. sed 명령어는 1개 라인씩 입력 라인을 읽어들여 표준출력으로 출력한다.

 sed는 각 라인을 읽을 떄마다 ed에서 사용하던 형식의 대치작업을 실시한다.


### 사용법

- 치환

```Shell
sed 's/addrass/address/' list.txt

// list.txt 파일 안에 addrass 문자열을 address로 바꾸어 표준 출력으로 출력한다. 원본 파일이 변경되지는 않는다.

sed 's/\t/\n/' list.txt

// list.txt 파일 안에 탭을 줄바꿈으로 바꾸고 표준 출력으로 출력한다. 원본 파일이 변경되지는 않는다.
```

- 삭제

```Shell
sed '/TD/d' 1.html

// TD 문자가 포함된 줄을 삭제하여 출력한다.

sed '/Src/!d' 1.html

// Src 문자가 있는 줄만 지우지 않는다.

sed '1,2d' 1.html  

// 처음 1줄, 2줄을 지운다.

sed '/^$/d' 1.html

//공백라인을 삭제하는 명령이다.

```


- 옵션
  - '-i' : 표준출력이 아니라 파일로 출력한다. 즉 원본파일이 변경된다.

### 사용 예제

Q : shell script를 통해서 파일 내용을 변경하는 방법

```shell
group address=127.8.8.8
port=7845
Jboss username=xyz_ITR3
```
위와 같은 파일 형식을 쉘 스크립트를 통해서 아래와 같이 변경하고 싶습니다.

```shell
group address=127.0.0.1
port=8080
Jboss username=xyz_IR4
```

어떻게 해야하나요 ?

A :

```shell
#!/bin/bash

addr=$1

port=$2

user=$3

sed -i -e "s/\(address=\).*/\1$1/" \
-e "s/\(port=\).*/\1$2/" \
-e "s/\(username=\).*/\1$3/" xyz.cfg
```
