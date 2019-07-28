tail 명령어
==========================

## 설명
문서의 뒷부분 혹은 앞부분에서 몇 줄을 제거하고 출력

## 자주 사용되는 옵션
```
-c, --bytes=[+]NUM : NUM 바이트만 출력
-n, --lines=[+]NUM : NUM 라인만 출력
-f, --follow=[{name|descr}]: 추가되는 내용 대기, 추가되는 내용을 append
-F, : 파일이 옮겨지는 경우에도 따라가서 확인가능

NUM: bytes 명령줄에는 K,M,G등 문자열도 입력가능, lines에 +를 입력하면 가장 앞에서 그 라인만큼을 뺀 문장을 출력

```

## 사용예제
```bash
$ tail /etc/passwd
$ tail -n 1 /etc/passwd
$ cat /etc/passwd || tail -n +5
```
