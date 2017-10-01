## Arrow function
기본 문법은 아래와 같으며, 항상 익명함수로 실행되고 실행될 때 this 값이 Arrow function 안으로 바인딩된다.

```javascript
// 기본 문법:
(파라미터1, 파라미터2, 파라미터N) => { 구문 }
(파라미터1, 파라미터2, 파라미터N) => 표현식
```

## Modules
export와 import 문법으로 이루어진 ES6 모듈화 방법으로 한 파일에 선언된 모듈들을 export하려면 default 키워드를 이용해야한다.

```javascript
export function sum (x, y) {
     return x + y;
}

export function avr (x, y) {
     return (x + y) / 2;
}

export function floor (n) {
     return Math.floor(n);
}

export function abs (n) {
     return Math.abs(n);
}

export var pi = 3.141592

//기본값은 export default 로 표현하고, 하나의 모듈 당 하나만 지정할 수 있다.
export default {
     sum,
     avr,
     floor,
     abs,
     pi
}
```

## Promise
JS에서 동기적 흐름 작업을 처리해야할 때 쓰는 패턴으로 잘 설계된 예외처리를 담고 있고 콜백-헬 형태를 벗어나도록 도와준다.

## Class
클래스 기반 상속을 가능하게 해주는 Class 키워드, 클래스 내에서는 호이스팅이 일어나지않는다.

## Generator
제네레이터는 yield 키워드를 이용해서 callee로 컨텍스트를 잠시 위임할 수 있는 함수이다.

## Proxy
프록시는 특정 객체의 메소드들이 실행될 때 먼저 실행되도록 하는 메소드를 정의할 수 있다.
```javascript
var target = {};
var handler = {
    get: function (obj, prop) {
        return 'get : ' + obj[prop];
    },
    set: function (obj, prop, value, receiver) {
        //멤버명이 aaa인 경우에만 허용
        if (prop === 'aaa') {
            obj[prop] = value;
            return value;
        }
        else {
            throw new Error('이 객체에 값을 정의 할 수 없습니다.');
        }
    }
};

var proxy = new Proxy(target, handler);
proxy.aaa = 'aaa';
console.log(proxy.aaa);
proxy.bbb = 'bbb';
console.log(proxy.bbb);
```


## ES6 파라미터 전달 방식
Default 값을 아래와 같이 정의해줄 수 있다.
```javascript
function test (x=10, y=12) {
     console.log(x + y);
}

test(); //22
```

rest operator를 사용하면 세개의 점(...)을 사용해서 여러개의 파라미터를 하나의 배열로 받을 수 있다.
```javascript
function test (x, ...y) {
     // y 는 배열이다
     return x * y.length;
}
test(3, "hello", true, false) === 9 //true
```


Spread Operator

Rest와 유사하지만 Rest가 여러개의 파라메터를 하나의 배열에 담는다면, Spread 는 배열에 담긴 값들을 파라메터로 분산해준다.

```javascript
function f (x, y, z) {
     return x + y + z;
}
```

// 배열에 담긴 값들을 각각 파라메터로 전달한다.

f(...[1,2,3]) === 6 //true

전개 연산자를 활용하면 이전에 apply 메서드를 사용했던 부분을 보다 간결하게 표현해줄 수 있다.
```javascript
//ES5에서는 배열 내 숫자들의 최대 값을 찾기 위해서 Math.max에 apply 메소드를 사용했다
Math.max.apply(null, [-1, 100, 9001, -32]); // 9001

//ES2015에서는 전개 연산자를 통해 함수에 파라미터로 배열을 넘길 수 있다
Math.max(...[-1, 100, 9001, -32]); // 9001
```


## let, const, Object.freeze
let; 지역 변수로 선언 const 상수 선언 Object.freeze 오브젝트 변수들을 변경 불가능하게 변경.
use strict 구문이 켜져있을 때만 사용가능.
