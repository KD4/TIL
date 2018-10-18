lodash
======================================

Javascript 유틸리티 라이브러리로 underscore와 양대산맥이다.

## times
```Javascript
_.times(n, [iteratee=_.identity])
```

iteratee는 메소드에 index를 매개변수로 넘겨주며 n번 실행한다. 각 인덱스를 받아서 실행한 결과를 목록으로 반환한다.

#### 도입
0.1.0

#### 아규먼트
n (number): iteratee를 실행할 횟수
[iteratee=\_.identity] (Function): 단계마다 실행될 함수

#### 반환값
(Array): 결과값 목록을 반환

#### 예제
```Javascript
_.times(3, String);
// => ['0', '1', '2']

_.times(4, _.constant(0));
// =>  [0, 0, 0, 0]
```
