JS Deep Copy vs Shallow Copy
=================================

아래 코드를 살펴보자.


```javascript
1|     const globalLand = [[1,2,3,4], [5,6,7,8]];   

2|     const increasedLand = simulateInc(globalLand);

3|     

4|     function simulateInc(land) {

5|         let tempLand = Object.assgin([], land);

6|         tempLand.forEach(row => {

7|             row.forEach(col => col++);

8|         });

9|         return tempLand;

10|   }

11|

12|    console.log(globalLand[0][1] < increasedLand[0][1]);
```



콘솔에 찍히는 값이 true일 것을 기대했지만 false가 나왔다.

5번 라인에서 land를 복사해서 배열을 조작했지만, 얕은 복사를 했기 때문에 우리가 원하는 결과를 얻을 수 없었다.



그렇다면 위 코드처럼 Javascript Object 값 복사가 필요한 경우에는 어떻게 할까?

그리고 얕은 복사와 깊은 복사는 무엇일까?



## Copy가 필요할 때, = 연산을 할 경우 일어나는 문제점


이 내용을 고민하기 전에, = 연산자를 이용해서 변수 내용은 복사할 수 있지 않을까?라는 생각을 할 수 있다.

이 질문에 대한 답은 복사하고자 하는 값의 type에 따라서 다르게 결정된다.



기본 자료형은 다른 변수에 값을 할당하거나, 함수의 매개변수로 넘길 때 'pass by value'이다. 즉, 값 자체를 넘기므로 '복사' 한다고 볼 수 있다.



하지만 객체 자료형은 'copy of a reference'이다.

A 변수에 할당된 객체를 B라는 변수에 '='연산자를 통해서 할당할 때, 객체의 레퍼런스를 복사해서 넘겨준다는 것을 의미한다. 그리고 B 변수를 조작하면 레퍼런스를 통해 A 객체 안의 값들도 같이 변경되게 된다. 하지만 이는 변수를 통해서 객체 안 변수를 조작할 때 발생하는 일이고 만약 B 변수에 새로운 객체의 레퍼런스를 다시 할당하게 될 경우 A 변수 레퍼런스에는 영향이 없다.


```javascript
1|      function replace(ref) {

2|          ref = {};           // ref 아규먼트는 영향이 없다.

3|      }

4|     

5|      function update(ref) {

6|          ref.key = 'newvalue';  // ref 아규먼트 객체의 영향을 준다.

7|      }

8|    

9|      let a = { key: 'value' };

10|    replace(a);  // a 변수는 그대로 있다.

11|    update(a);   // a 변수값이 변했다.

```

여기까지, 단순히 객체 값을 다른 변수에 할당해서 조작할 경우 원본 데이터에 영향이 갈 수 있다는 사실을 확인했다. 원본 데이터 영향 없이 객체 값을 조작하려면 객체 데이터들을 '복사'해야 한다.



deep copy 인 척하는 shallow copy 방법들


JS 객체를 복사하는 메커니즘은 shallow copy(얕은 복사)와 deep copy(깊은 복사)로 나뉜다.



### Shallow Copy
단순히 변수에 다른 변수를 할당하는 행위를 얕은 복사라고 한다.

객체 입장에서는 위에서 보았듯이 복사는 아닌 것 같지만, 기본 타입인 경우는 아래처럼 복사라고 할 수 있다.


```javascript
1|    const original = '원본';

2|    let copy = original;

3|    console.log('copy의 값은?', copy); // 원본    

4|    copy = '복제품';

5|    console.log('original의 값은?', original); // 원본

6|    console.log('copy의 값은?', copy); // 복제품
```


객체는 조금 다르다. 위 방식대로 복사를 했을 때 JS의 객체는 얕은 복사(shallow copy)가 수행된다.


```javascript
1|     // 원본

2|     let original = ['원본'];

3|     console.log('original의 0번 인덱스의 값은?', original[0]); // 원본

4|     // 복사

5|     let copy = original;

6|     console.log('copy의 0번 인덱스의 값은?', copy[0]); // 원본

7|     // 복사의 값 변경 시 원본도 영향을 받음

8|     copy[0] = '복제품';

9|     console.log('original의 0번 인덱스의 값은?', original[0]); // 복제품

10|   console.log('copy의 0번 인덱스의 값은?', copy[0]); // 복제품
```


copy 변수는 레퍼런스를 통해서 original의 값을 조작해버렸다. 값을 복사한 것이 아니라 레퍼런스를 복제하기 때문에 이는 얕은 복사라고 한다. 사실 이것은 참조다.



그렇다면 객체 값 자체를 복사해서 할당하는 깊은 복사가 필요할 때는 어떻게 해야 할까?



### ES6의 Object.assign(), Spread 문법


ES6 문법에서 깊은 복사 방법을 찾아보자. 첫 번째로 Object.assgin() 함수이다.

MDN에서는 다음과 같이 이 함수를 소개한다. 마치 깊은 복사가 가능한 것 같다.


```
The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
```


간단한 테스트 결과에서도 복사가 된 것을 확인할 수 있다.


```javascript
1|     const origin = {

2|      a: 1,

3|      b: 2,

4|    };

5|    

6|    const copy = Object.assign({}, origin);

7|    copy.a = 100;

7|    console.log(copy.a);   //100

8|    console.log(origin.a); // 1
```


spread 문법을 사용해도 복사가 된 것을 확인할 수 있다.


```javascript
1|     const origin = {

2|      a: 1,

3|      b: 2,

4|    };

5|    

6|    const copy = {...origin};

7|    copy.a = 100;

7|    console.log(copy.a);   //100

8|    console.log(origin.a); // 1
```


하지만 이는 사실 완벽한 깊은 복사가 아니다.

아래와 같이 객체 안 프로퍼티 key값이 객체의 레퍼런스인 경우, 즉 value 중 객체가 있는 경우 이 value는 조작될 수 있다.


```javascript
1|    const original = { a : {b : 2}};

2|    let copy = Object.assign({}, original);

3|    copy.a.b = 100;

4|    console.log(original.a.b);  // 2를 예상했지만 100이 콘솔에 찍힌다.



1|    const original = { a : {b : 2}};

2|    let copy = {...origin};

3|    copy.a.b = 100;

4|    console.log(original.a.b);  // 이 경우에도 2를 예상했지만 100이 콘솔에 찍힌다.
```




## Deep Copy를 하는 방법.


그렇다면 Deep Copy가 필요할 때는 어떻게 해야 할까?

안타깝게도 Native Javascript에서 제공하는 함수로는 불가능하다.

copy 하는 custom method를 만들거나, Jquery나 loadsh와 같은 third-party 라이브러리에서 제공하는 유틸 함수를 사용해야 한다.



아래는 객체 2 레벨 이상까지 복사할 수 있는 Custom 함수와 깊은 복사를 위한 JQuery 함수, loadsh 함수이다.


```javascript
1|     function copy(o) {

2|        let out, v, key;

3|        out = Array.isArray(o) ? [] : {};

4|        for (key in o) {

5|             v = o[key];

6|            out[key] = (typeof v === "object" && v !== null) ? copy(v) : v;

7|        }

8|        return out;

9|     }

10|

11|     $.extend(true, [], arr1); // Jquery Extend

12|     _.cloneDeep(arr1); // Lo-dash
```



## 정리


객체를 복사하기 위해서 자바스크립트에서 변수를 할당하는 방법을 알아보고 변수에 따라서 달라지는 객체 복사 방법에 대해서 조사했다. 객체를 복사하는 방법은 아래와 같이 변수가 어떤 타입인가에 따라서 달라진다.



1. Reassignment "=" (string arrays, number arrays - only)

2. Slice (string arrays, number arrays - only)

3. Concatenation (string arrays, number arrays - only)

4. Custom function: for-loop or recursive copy

5. jQuery's $.extend

6. JSON.parse (string arrays, number arrays, object arrays - only)

7. Underscore.js's `_.clone` (string arrays, number arrays - only)

8. Lo-Dash's `_.cloneDeep`
