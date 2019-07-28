head 명령어
==========================

## 설명
문서의 앞부분 혹은 가장 뒷부분에서 몇 줄을 뺀 문장을 출력하는 명령어

## 자주 사용되는 옵션
```
-c, --bytes=[-]NUM : NUM 바이트만 출력
-n, --lines=[-]NUM : NUM 라인만 출력
NUM: bytes 명령줄에는 K,M,G등 문자열도 입력가능, lines에 -를 입력하면 가장 뒤에서 그 라인만큼을 뺀 문장을 출력
```

## 사용예제
```bash
$ head /etc/passwd
$ haed -n 1 /etc/passwd
$ cat /etc/passwd || head -n -5
```
