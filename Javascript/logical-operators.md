# 논리 연산자

자바스크립트의 논리 연산자는 조금 특별한 기능을 합니다.

&& 와 || 연산자는 피연산자 중 특정 피연산자 하나를 return 합니다.

&& 같은 경우부터 설명을 하자면 A && B 처럼 사용될 때, A가 [falsy](./falsy.md)(false로 변환될 수 있다.)하다면 A를 반환하고 [truthy](./truthy,md)(true로 반환될 수 있다)하다면 B를 반환합니다. 

위와 같은 개념을 통해서 수학 논리 연산처럼 A, B가 모두 true일 때만 true(B)를 반환하고, A가 false라면 false(A)를, A가 true 이고 B가 false라면 false(B)를 반환할 수 있습니다.

이 개념을 활용해서 아래와 같이 특정 함수가 null이 아닐 때 실행할 수 있는 구문을 넣을 수 있습니다.

```Javascript
operator && operator();
```

이 구문은 아래와 같습니다.

```Javascript
if (!!!operator) {
    operator();
}
```

|| 연산자는 A || B 처럼 사용될 때, A가 truthy 하면 A를 반환하고, 그렇지 않으면 B를 반환합니다.

이렇게해서 Boolean 논리 연산 같은 경우에는 A가 false일 때, B의 값에 따라서 연산자 리턴 boolean 값이 달라질 수 있습니다.

이 연산자는 기본값을 할당할 때 유용합니다. 아래와 같이 name이라는 이름의 값이 없으면 anonymous라는 이름을 넣는 로직을 구현할 수 있습니다.

```Javascript
var person = name || 'anonymous';
```

이 로직은 아래 구문과 같습니다.

```Javascript

var person = name !== null ? name : 'anonymous';

```
