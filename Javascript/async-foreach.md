동기 forEach
=====================================

ES6 async/await의 등장으로 JS 동기성 코드 작성은 훨씬 수월해졌다.
이런 미친 매커니즘이 나타났지만 JS 세계에는 여전히 동기성 작업과 관련된 문제가 남아있다.

대표적으로 forEach() 구문이다.

문제를 제대로 파악하기 위해서 아래 코드를 살펴보자.

```Javascript
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

[1, 2, 3].forEach(async (num) => {
  await waitFor(50);
  console.log(num);
});

console.log('Done');
```

위 코드를 node(>= 7.6.0)로 돌려보자.

```bash
$ node forEach.js
$ Done
```

우리가 코드만 보고 기대했던 결과는 이게 아니다. forEach 구문의 console.log를 표시할 수 없었다.
무슨 이유 때문일까? forEach() 메소드 구현을 보고 이해해보자.

```Javascript
Array.prototype.forEach = function (callback) {
  // this represents our array
  for (let index = 0; index < this.length; index++) {
    // We call the callback for each entry
    callback(this[index], index, this)
  }
}
```

위 코드와 우리가 작성한 코드를 같이 봐보자.

callback이 동기적으로 실행되면 좋겠지만 forEach는 각 배열의 요소를 돌면서 그냥 callback을 실행하고 다음 entry로 진입한다.

Array 프로토타입 메소드인 forEach만으로는 동기성 코드를 작성하기 어렵다.

asyncForEach() 메소드를 직접 작성해서 이 문제를 해결할 수 있다.

```Javascript
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
```

이 함수를 이용해서 우리 예제가 제대로 작동하도록 수정해보자.

```Javascript
asyncForEach([1, 2, 3], async (num) => {
  await waitFor(50)
  console.log(num)
})
console.log('Done')
```

```
$ node forEach.js
$ Done
$ 1
$ 2
$ 3
```

이 또한 우리가 원한 결과가 아니다. 제대로된 결과를 얻기 위해서는 한번더 async를 매핑해야한다.

```Javascript
const start = async () => {
  await asyncForEach([1, 2, 3], async (num) => {
    await waitFor(50)
    console.log(num)
  })
  console.log('Done')
}
start()
```

```
$ node forEach.js
$ 1
$ 2
$ 3
$ Done
```

매핑한 async start() 메소드는 우리가 원하는 흐름대로 동작한다.

이 방법 이외에도 아래와 같이 `map` 메소드를 사용해서 동기 작업을 수행할 수도 있다.

```Javascript
const start = async () => {
  await Promise.all([1, 2, 3].map(async num => {
    await waitFor(50)
    console.log(num)
  })))
  console.log('Done')
}
start()
```
