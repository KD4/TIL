sort 명령어
==================

## 설명
정렬하여 출력

## 자주 사용되는 옵션
```
위치, 구분자 지정
-k, -key=KEYDEF: key 값에 의한 정렬 수행
-t, --field-seperator: 구분자 지정

정렬 기준
-f, --ignore-case
-g, --general-numeric-sort
-n, --numeric-sort
-r, --reverse
-u, --unique
```

## 사용예제
```bash
$ ls -al | sort -k 5,5 -n -r
```
