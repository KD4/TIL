Promise
==================================

Javascript에서 함수 실행은 비동기로 이루어진다. 이런 비동기 세계에서 동기성을 보장하기 위해서는 Callback 패턴을 이용해야했는데

순차적으로 실행될 함수 목록이 길어지면 콜백 함수가 계속 쌓이는 이른바 콜백 지옥 형태가 나타나게 되었다.

Promise는 이런 콜백 지옥을 벗어나기 위해서 제안된 하나의 '패턴'이다. 

Promise 객체는 비동기 작업을 실행한 후에 순차적으로 실행될 콜백을 매개변수나 then 메서드를 통해서 받을 수 있다. 

```javascript
const promise1 = new Promise(function(resolve) {
    setTimeout(function() {
        resolve();
    }, 1000);
});
```

생성된 promise1 객체는 then() 체이닝을 통해서 선언된 비동기 작업을 수행한 뒤에 실행될 콜백을 넣어줄 수 있다. 

콜백을 이어준다는 장점말고도 promise 객체는 catch나 매개변수를 통해서 에러 처리도 가능하다는 장점이 있다.

Promise는 이렇듯 Javascript 세계의 동기 작업 처리를 위해서 널리 사용된다.

하지만 비동기 세계에서 동기 작업을 처리하는 패턴인만큼 여러가지 주의할 점이 존재한다.

우선 생성하는 과정에서 주의가 필요하다.

## Promise 객체 생성 방법

모질라 Javascript 스팩 문서를 통해서 Promise 객체를 생성하는 방법들을 살펴본다.

```
new Promise( /* executor */ function(resolve, reject) { ... } );
```

매개변수 : executor

resolve 및 reject 인수와 함께 전달되는 함수입니다. executor 함수는 Promise 구현에 의해 즉시 실행되고 resolve 및 reject 함수를 전달합니다 (Executor는 Promise 생성자가 생성 된 객체를 반환하기 전에 호출됩니다). resolve 및 reject 기능은 호출 될 때 마다 promise를 해결(resolve)하거나 거부(reject)합니다. Executor는 보통 몇몇 비동기(asynchronous) 작업을 시작한 다음 이것이 완료되었을 때 resolve 함수를 호출하여 promise를 해결하거나 오류가 발생하면 거부(reject)합니다.
executor 함수에서 오류가 발생하면 promise는 거부(rejected)됩니다. executor의 반환값은 무시됩니다.

-------------
스팩 문서에서 설명하는 내용 중에서 executor 함수가 Promise 구현에 의해 즉시 실행된다는 구문을 주목하자.

```
function test() {
    const _promise = new Promise(function(resolve, reject) {
	    console.log('task 2');
    });

    console.log('task 1');

    _promise.then(console.log('task 3'));
}
```

동기 관점에서 test 함수 실행 순서를 생각하면 Promise 객체의 excutor는 _promise 객체를 다시 한번 호출 하는 시점이라고 생각된다.

하지만 결과는 아래와 같다.
```
task 2
task 1
task 3
```

Promise는 선언하는 즉시 excutor 함수가 실행되고 resolve, reject 실행은 promise 객체가 이미 호출된 excutor 컨텐스트를 그대로 가진채로 실행된다. 그렇기 때문에 실행할 때 excutor가 실행되게 하려면 아래와 함수로 감싸야한다.


```
function test() {
    const _promise = function() {
        return new Promise(function(resolve, reject) {
	        console.log('task 2');
        });
    }

    console.log('task 1');

    _promise().then(console.log('task 3'));
}
```

Promise를 사용하는 코드에서는 excutor 매개변수 실행 시점을 정확히 알아야한다.
