Array
==========
Javascript `Array` 객체는 리스트와 비슷한 고수준 객체인 배열을 생성하는 데 사용되는 전역 객체이다.

### Array 생성 방법
1. 리터럴

```Javascript
let fruits = [];

// or

let animals = ['dog', 'cat'];
```

2. Array 생성자

```Javascript
let arr = new Array(10);

// or

let arr2 = new Array('one', 'two');
```

### 매개 변수
- arrayObj
: 필수 사항 Array 개체가 할당되는 변수 이름입니다.

- size
: 선택적 요소. 배열의 크기입니다. 배열이 0부터 시작하기 때문에 생성된 요소의 인덱스는 0부터 size -1까지입니다.

- element0,...,elementN
 : 선택적 요소. 배열에 배치할 요소입니다. 그러면 n + 1개 요소를 포함하고 length가 n + 1인 배열이 생성됩니다. 이 구문을 사용하여 요소를 두 개 이상 제공해야 합니다.

### 함수

- Array.from : 배열 형식의 개체나 반복 가능한 개체에서 배열을 반환합니다.
- Array.isArray : 개체가 배열인지 여부를 나타내는 부울 값을 반환합니다.
- Array.of : 전달된 인수에서 배열을 반환합니다.


### prototype Methods
- [Array.prototype.fill()](./array-fill.md)
