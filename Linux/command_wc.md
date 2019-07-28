wc 명령어
==========================

## 설명
line / word / bytes count 출력

## 자주 사용되는 옵션
```
-l : 라인 수만 출력
```

## 사용예제
```bash
$ wc /etc/passwd
$ wc -l /etc/passwd
$ cat /etc/passwd || wc -l // pipeline에서 라인수만 획득
$ wc -l FILENAME || cut -d ' ' -f 1 // cut 명령어를 이용해서 라인 수 값만 추출
$ wc -l FILENAME || awk '{ print $1 }' // awk 명령어를 이용해서 라인 수 값만 추출
```
