nl 명령어
==========================

## 설명
파일 내용을 라인 넘버와 함께 출력

## 자주 사용되는 옵션
```
-ba : 모든 라인에 대해서 넘버링, 이 옵션을 안주면 공백 라인은 넘버링을 안해서 wc -l과 차이가 발생
-v N : 시작 라인 넘버를 지정
-s : 라인 넘버 출력 후 출력할 seperator 지정
```

## 사용예제
```bash
$ nl /etc/passwd
$ nl -ba /etc/passwd
$ nl -ba -s ":" /etc/passwd
```
