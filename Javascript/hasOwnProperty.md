hasOwnProperty
======================================================================
어떤 값이 어떤 객체가 온전히 가지고 있는 프로퍼티인지 확인하려면 hasOwnProperty 메소드를 사용해야한다.

이 메소드는 Object.prototype가 가지고 있으므로 모든 객체가 가지고 있다.

주의: hasOwnProperty는 어떤 프로퍼티(key)값을 가지고 있는지 확인하는 용도이므로 undefined인 값도 체크한다.

hasOwnProperty메소드는 프로토타입 체인을 탐색하지 않고, 프로퍼티를 다룰 수 있는 유일한 방법이다.

```javascript
// Object.prototype을 오염시킨다.
Object.prototype.bar = 1; 
var foo = {goo: undefined};

foo.bar; // 1
'bar' in foo; // true

foo.hasOwnProperty('bar'); // false
foo.hasOwnProperty('goo'); // true
```

hasOwnProperty 메소드는 어떤 프로퍼티가 자기 자신의 프로퍼티인지 아닌지 정확하게 알려주기 때문에 객체의 프로퍼티를 순회할때 꼭 필요하다. 그리고 프로토타입 체인 어딘가에 정의된 프로퍼티만을 제외하는 방법은 없다.

### hasOwnProperty 메소드도 프로퍼티다
JavaScript는 hasOwnProperty라는 이름으로 프로퍼티를 덮어 쓸수도 있다. 그래서 객체 안에 같은 이름으로 정의된 hasOwnProperty가 있을 경우, 본래 hasOwnProperty의 값을 정확하게 얻고 싶다면 다른 객체의 hasOwnProperty 메소드를 빌려써야 한다.

```javascript
var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 항상 false를 반환한다.

// 다른 객체의 hasOwnProperty를 사용하여 foo 객체의 프로퍼티 유무를 확인한다.
({}).hasOwnProperty.call(foo, 'bar'); // true

// Object에 있는 hasOwnProperty를 사용해도 된다.
Object.prototype.hasOwnProperty.call(obj, 'bar'); // true
```

### 결론
어떤 객체에 원하는 프로퍼티가 있는지 확인하는 가장 확실한 방법은 hasOwnProperty를 사용하는 것이다. for in loop에서 네이티브 객체에서 확장된 프로퍼티를 제외하고 순회하려면 hasOwnProperty와 함께 사용하길 권한다.

### for in Loop
객체의 프로퍼티를 탐색할때 in 연산자와 마찬가지로 for in 문도 프로토타입 체인까지 탐색한다.

Note: for in문은 배열의 length프로퍼티처럼 enumerable 속성이 false인 프로퍼티는 탐색하지 않는다.

```javascript
// Object.prototype을 오염시킨다.
Object.prototype.bar = 1;

var foo = {moo: 2};
for(var i in foo) {
    console.log(i); // bar와 moo 둘 다 출력한다.
}
```

for in문에 정의된 기본 동작을 바꿀순 없기 때문에 루프 안에서 불필요한 프로퍼티를 필터링 해야한다. 그래서 Object.prototype의 hasOwnProperty메소드를 이용해 본래 객체의 프로퍼티만 골라낸다.

Note: for in은 프로토타입 체인을 모두 탐색하기 때문에 상속할 때마다 더 느려진다.

#### hasOwnProperty로 필터링 하기
```javascript
// 위의 예제에 이어서 
for(var i in foo) {
    if (foo.hasOwnProperty(i)) {
        console.log(i);
    }
}
```

위와 같이 사용해야 올바른 사용법이다. hasOwnProperty 때문에 오직 moo만 출력된다. hasOwnProperty가 없으면 이 코드는 Object.prototype으로 네이티브 객체가 확장될 때 에러가 발생할 수 있다.

따라서 Proptotype 라이브러리처럼 네이티브 객체를 프로토타입으로 확장한 프레임워크를 사용할 경우 for in 문에 hasOwnProperty를 사용하지 않을 경우 문제가 발생할 수 있다.

### 결론
hasOwnProperty를 항상 사용하길 권한다. 실제 코드가 동작하는 환경에서는 절대로 네이티브 객체가 프로토타입으로 확장됐다 혹은 확장되지 않았다를 가정하면 안된다.