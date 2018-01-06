Array.prototype.fill()
=====================

IE, Opera 안됨, Chorme 36+ Firefox 31+ Safari 7.1+

- 폴리필이 있어야한다...

fill() 메소드는 배열의 시작 인덱스부터 끝 인덱스까지 정적 값으로 배열 요소들을 채운다.

```Javascript
let arr = new Array(10).fill(0);

console.log(arr);
// [0,0,0,0,0,0,..0];
```

### 문법
```Javascript
arr.fill( value [, start = 0[, end = this.length]]);
```

- value : 배열을 채우는 값
- start(optional) : 시작 인덱스. default = 0
- end(optional) : 끝 인덱스. default = 길이
