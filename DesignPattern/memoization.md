memoization
=================================================

## 메모이제이션이란?
메모이제이션(memoization)은 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다. 동적 계획법의 핵심이 되는 기술이다. 메모아이제이션이라고도 한다.

- 핵심은 입력 값이 같으면 출력 값도 같은 `순수함수`의 결과 값을 캐싱해서 프로그램의 연산 횟수를 줄이는 것이다.

### 간단한 순수함수의 캐싱 예제

```javascript
getNumber = (function () {
  var memory = [];
  return function f(no) {
    if (memory.indexOf(no) !== -1) {
      console.log('Cached');
    }
    else {
      memory.push(no);
      console.log('New');
    }
  };
});
```

- 클로저를 사용해서 memory라는 리스트를 공유하도록 만들었다.

위 함수는 매개변수로 받은 숫자가 캐시된 숫자인지, 새로운 숫자인지 반환하는 단순한 구조이다.

아래처럼 실행해보자.

```javascript
getNumber(1);
getNumber(2);
getNumber(2);
getNumber(3);
```

출력은 다음과 같다.

```
New
New
Cached
New
```

조금 더 심화된 문제인 피보나치 수열을 봐보자.

피보나치 수열은 다음과 같은 의사코드로 표현할 수 있다.
```
fib(n) {
   if n is 1 or 2, return 1;
   return fib(n-1) + fib(n-2);
}
```

이 연산은 매번 같은 작업을 반복할 수 있다.

다음과 같이 메모이제이션을 적용해보자.

```
// allocate array for memo, setting all entries to zero;
// initialize memo[1] and memo[2] to 1;

fib(n) {
   if memo[n] is zero:
       memo[n] = fib(n-1) + fib(n-2);
   return memo[n];
}
```

메모이제이션 이전 코드의 전체 실행시간은 Ω(1.6n)이다. 그러나 fib(n)의 값을 계산하자마자 저장하면(memoize), 실행시간을 Θ(n)으로 줄일 수 있다.
