# 순수함수

컴퓨터 프로그래밍에서 함수가 아래 조건을 갖추면 순수함수라고 할 수 있다.

1. 동일한 인자를 넣었다면 언제나 동일한 결과를 반환하는 함수
2. 외부 함수나 외부 상태를 변경하지 말아야(side effect)하고 참조에 투명해야한다.

부작용 예제 1.
- 외부의 객체를 읽음 / 참조에 불투명
```javascript
int s1(int x) {
    // 외부 참조 사용
    // globalValue에 따라 x값이 변경됨
    return globalValue * x;
}
```

부작용 예제 2.
- 외부 객체를 읽을 때 / 참조값이 불투명
```javascript
int s2(int x) {
    // 외부 참조 사용
    // globalValue에 따라 x값이 변경됨
    return globalValue * x;
}
```
