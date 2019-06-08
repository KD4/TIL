상속과 프로토타입 체이닝
======================

자바스크립트에서 각각의 객체는 [[Prototype]]이라는 은닉(private) 속성을 가지는데 자신의 프로토타입이 되는 다른 객체를 가리킨다. 그 객체의 프로토타입 또한 프로토타입을 가지고 있고 이것이 반복되다, 결국 null을 프로토타입으로 가지는 오브젝트에서 끝난다. null은 더 이상의 프로토타입이 없다고 정의되며, 프로토타입 체인의 종점 역할을 한다.

프로토타입적 상속 모델은 사실 고전적인 방법보다 좀 더 강력한 방법이다. 그 말은, 예를 들자면, 프로토타입적 모델에서 고전적인 방식을 구현하는 건 꽤나 사소한 일이지만, 그 반대는 훨씬 더 어려운 일이기 때문이다.

```
* 프로토타입 상속 모델?
결국엔 자식이 property로 부모의 레퍼런스를 가지고 있는 모델 아닌가?
```

## 속성 상속

자바스크립트 객체는 자신의 속성과 프로토타입 링크를 가진다.

객체의 어떤 속성에 접근하려할 때 그 객체 자체 속성 뿐만 아니라 객체의 프로토타입, 그 프로토타입의 프로토타입 등 프로토타입 체인의 종단에 이를 때까지 그 속성을 탐색한다.

```javascript
// o라는 객체가 있고, 속성 'a' 와 'b'를 갖고 있다고 하자.
let f = function () {
    this.a = 1;
    this.b = 2;
}
let o = new f(); // {a: 1, b: 2}

// f 함수의 prototype 속성 값들을 추가 하자.
f.prototype.b = 3;
f.prototype.c = 4;

// f.prototype = {b: 3, c: 4}; 라고 하지 마라, 해당 코드는 prototype chain 을 망가뜨린다.
// o.[[Prototype]]은 속성 'b'와 'c'를 가지고 있다. 
// o.[[Prototype]].[[Prototype]] 은 Object.prototype 이다.
// 마지막으로 o.[[Prototype]].[[Prototype]].[[Prototype]]은 null이다. 
// null은 프로토타입의 종단을 말하며 정의에 의해서 추가 [[Prototype]]은 없다. 
// {a: 1, b: 2} ---> {b: 3, c: 4} ---> Object.prototype ---> null

console.log(o.a); // 1
// o는 'a'라는 속성을 가지는가? 그렇다. 속성의 값은 1이다.

console.log(o.b); // 2
// o는 'b'라는 속성을 가지는가? 그렇다. 속성의 값은 2이다.
// 프로토타입 역시 'b'라는 속성을 가지지만 이 값은 쓰이지 않는다. 이것을 "속성의 가려짐(property shadowing)" 이라고 부른다.

console.log(o.c); // 4
// o는 'c'라는 속성을 가지는가? 아니다. 프로토타입을 확인해보자.
// o.[[Prototype]]은 'c'라는 속성을 가지는가? 가지고 값은 4이다.

console.log(o.d); // undefined
// o는 'd'라는 속성을 가지는가? 아니다. 프로토타입을 확인해보자.
// o.[[Prototype]]은 'd'라는 속성을 가지는가? 아니다. 다시 프로토타입을 확인해보자.
// o.[[Prototype]].[[Prototype]]은 null이다. 찾는 것을 그만두자.
// 속성이 발견되지 않았기 때문에 undefined를 반환한다.
```

## 메소드 상속
자바스크립트에 "메소드"라는건 없다. 하지만 자바스크립트는 객체의 속성으로 함수를 지정할 수 있고 속성 값을 사용하듯 쓸 수 있다. 속성 값으로 지정한 함수의 상속 역시 위에서 본 속성의 상속과 동일하다. (단 위에서 언급한 "속성의 가려짐" 대신 "메소드 오버라이딩, method overriding" 라는 용어를 사용한다)

상속된 함수가 실행 될 때,  this 라는 변수는 상속된 오브젝트를 가르킨다. 그 함수가 프로토타입의 속성으로 지정되었다고 해도 말이다.

```javascript
var o = {
  a: 2,
  m: function(b){
    return this.a + 1;
  }
};

console.log(o.m()); // 3
// o.m을 호출하면 'this' 는 o를 가리킨다.

var p = Object.create(o);
// p 는 프로토타입을 o로 가지는 오브젝트이다.

p.a = 12; // p 에 'a'라는 새로운 속성을 만들었다.
console.log(p.m()); // 13
// p.m이 호출 될 때 'this' 는 'p'를 가리킨다.
// 따라서 o의 함수 m을 상속 받으며,
// 'this.a'는 p.a를 나타내며 p의 개인 속성 'a'가 된다.
```


```
- Javascript 프로토타입 상속 시 자식 클래스는 부모 클래스의 속성을 오버라이딩 할 수 있다.
- 부모 객체에서 정의된 함수 안에 this가 있다. 이 함수를 자식 클래스에서 실행할 때 this에 바인딩되는 컨텍스트는 자식 클래스이다.
```

## 문법 생성자로 객체 생성
```javascript
var o = {a: 1};

// o 객체는 프로토타입으로 Object.prototype 을 가진다.
// 이로 인해 o.hasOwnProperty('a') 같은 코드를 사용할 수 있다.
// hasOwnProperty 라는 속성은 Object.prototype 의 속성이다.
// Object.prototype 의 프로토타입은 null 이다.
// o ---> Object.prototype ---> null

var a = ["yo", "whadup", "?"];

// Array.prototype을 상속받은 배열도 마찬가지다.
// (이번에는 indexOf, forEach 등의 메소드를 가진다)
// 프로토타입 체인은 다음과 같다.
// a ---> Array.prototype ---> Object.prototype ---> null

function f(){
  return 2;
}

// 함수는 Function.prototype 을 상속받는다.
// (이 프로토타입은 call, bind 같은 메소드를 가진다)
// f ---> Function.prototype ---> Object.prototype ---> null
```

## 생성자를 이용한 객체 생성
```javascript
function Graph() {
  this.vertexes = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex: function(v){
    this.vertexes.push(v);
  }
};

var g = new Graph();
// g 'vertexes' 와 'edges'를 속성으로 가지는 객체이다.
// 생성시 g.[[Prototype]]은 Graph.prototype의 값과 같은 값을 가진다
```

## Object.craete 이용한 객체 생성

ECMAScript 5는 새로운 방법을 도입했다. Object.create라는 메소드를 호출하여 새로운 객체를 만들 수 있다. 생성된 객체의 프로토타입은 이 메소드의 첫 번째 인수로 지정된다.

```javascript
var a = {a: 1}; 
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (상속됨)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined이다. 왜냐하면 d는 Object.prototype을 상속받지 않기 때문이다.
```


## 위임형 상속(Delegation inheritance)
위임형 상속에서 프로토타입 객체는 다른 객체의 기반이 된다. 위임 프로토타입을 상속받을 경우 새 객체는 해당 프로토타입에 대한 참조를 가지고 있다.

새 객체의 속성에 접근할 때, 해당 객체가 직접적으로 속성을 소유하고 있는지 먼저 체크한다. 없다면 다음 순서로 [[Prototype]]을 체크한다. 이 과정은 프로토타입 체인을 따라서 모든 객체의 프로토타입 체인의 최상위에 있는 객체인 Object.prototype에 도달할 때 까지 반복된다.

메소드를 위임 상속할 경우 모든 객체가 각 메소드에에 대해 하나의 코드를 공유하므로 메모리를 절약할 수 있다.

Javascript에서 이를 구현하는 방법은 여러가지가 있는데 ES6에서는 아래와 같은 방식이 흔하다:
```javascript
class Greeter {
  constructor (name) {
    this.name = name || 'John Doe';
  }
  hello () {
    return `Hello, my name is ${ this.name }`;
  }
}

const george = new Greeter('George');
const msg = george.hello();
console.log(msg); // Hello, my name is George
Object.create(null). 을 통해 프로토타입을 null로 지정하여 속성 위임 없이 객체를 생성할 수 있다..
```

이 방법의 큰 단점 중 하나는 상태를 저장하는데 그리 좋은 방법이 아니라는 것이다. 객체나 배열의 상태를 변경하게 되면 같은 프로토타입을 공유하는 모든 객체의 상태가 변경된다.

상태 변경이 전파되는 것을 막으려면 각 객체마다 상태 값의 복사본을 만들어야 한다.

## 연결형 상속(Concatenative inheritance)
연결형 상속은 한 객체의 속성을 다른 객체에 모두 복사함으로써 상속을 구현하는 방법이다.

이 상속법은 Javascript 객체의 동적 확장성을 이용한 방법이다. 객체 복사는 속성의 초기값을 저장하기 위한 좋은 방법이다: 이 방식은 Object.assign()을 통해 구현하는 것이 보통이며 ES6 이전에 Lodash, Underscore, jQuery등의 라이브러리들이 .extend() 와 비슷한 메소드로 제공한 방법이다.

```javascript
const proto = {
  hello: function hello() {
    return `Hello, my name is ${ this.name }`;
  }
};

const george = Object.assign({}, proto, {name: 'George'});
const msg = george.hello();
console.log(msg); // Hello, my name is George
```

연결형 상속은 매우 좋은 방법이며 클로져와 같이 사용한다면 훨씬 효과적인 상속 방식입니다.

