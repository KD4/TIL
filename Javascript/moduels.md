JS 모듈
=========================================

## 모듈이란 무엇인가?
모듈은 구현 세부 사항을 캡슐화하고 공개 API를 노출해 다른 코드에서 쉽게 로드하고 사용할 수 있도록 재사용 가능한 코드 조각이다.

JS에서 모듈이란 다음 조건을 만족한다.
- 코드 추상화: 특수한 라이브러리에 기능을 위임하여 실제 구현의 복잡도를 이해할 필요가 없다.
- 코드 캡슐화: 코드를 변경하지 않으려면 모듈 내부에 코드를 숨긴다.
- 코드 재사용: 같은 코드를 반복해서 작성하는 것을 피한다.
- 의존성 관리: 코드를 다시 작성하지 않고도 쉽게 의존성을 변경한다.

## 자바스크립트 모듈의 진화 과정

### ES5의 모듈
ECMAScript5 및 이전 버전은 모듈을 염두해두고 디자인되지 않았다. 시간이 지나면서 개발자들은 자바스크립트의 모듈화 디자인을 구현하기 위해서 다양한 패턴을 고안해냈다.

이러한 패턴의 필요성이 대두되기 전에 있었던 두 가지 패턴을 보면서 자바스크립트 모듈의 필요성에 대해서 알아보자.

#### 즉시 실행 함수 표현식(IIFE, Immediately Invoked Function Expression)

```Javascript
(function() {
  //...
})()
```

즉시 실행 함수 표현식은 선언됐을 떄 바로 실행되는 익명 함수이다.

이 표현식은 다음 조건을 만족하므로 모듈 일부를 만족한다고 볼 수 있다.
- 내부의 코드 복잡도를 캡슐화하여 IIFE 코드가 무엇을 하는지 이해하지 않아도 된다.
- 변수를 정의하여 전역 스코프를 오염시키지 않는다.

하지만 의존성 관리를 위한 매커니즘을 제공하지 않는다.

#### 노출식 모듈 패턴
노출식 모듈 패턴은 IIFE와 유사하지만, 변수에 반환 값을 할당한다.
```javascript
// Expose module as global variable
var singleton = function(){    // Inner logic
  function sayHello(){     console.log('Hello');   }    // Expose API
  return {     sayHello: sayHello   } }()
```

function 키워드가 시작되는 줄에 함수를 둘러싼 괄호가 없음에 주목하라.

우리는 이제 모듈 API에 변수를 통해서 접근할 수 있다.
```javascript
// Access module functionality
singleton.sayHello();   // => Hello
모듈은 싱글톤 대신 함수 생성자를 내보낼 수도 있다.
// Expose module as global variable
var Module = function(){    // Inner logic
  function sayHello(){     console.log('Hello');   }    // Expose API
  return {     sayHello: sayHello   } }
```

선언 시 함수를 어떻게 실행하지 않는지 주목하라.

함수를 바로 실행하지 않는 대신, Module 생성자 함수를 사용해서 모듈을 인스턴스화 한다.
```javascript
var module = new Module();
```
공개 API로 접근하려면 다음과 같다.
```javascript
module.sayHello();   // => Hello
```

노출식 모듈 패턴은 IIFE와 유사한 장점이 있지만, 이것 또한 의존성 관리에 대한 메커니즘은 제공하지 않는다.
자바스크립트가 진화하면서 모듈을 정의하기 위해 다양한 문법이 개발되었으며, 이 문법들은 각각 고유의 장단점을 가진다.
우리는 이것을 모듈 포맷이라고 부른다.

### 모듈 포맷
모듈 포맷은 모듈을 정의하기 위해 사용할 수 있는 문법이다.

EcmaScript6 또는 ES2015 이전에 자바스크립트는 모듈을 정의하기 위한 공식적인 문법을 가지고 있지 않았다. 그 결과 영리한 개발자들은 자바스크립트에서 모듈을 정의하기 위해 다양한 포맷을 고안해 냈다.

다음은 많이 채택되고 잘 알려진 포맷들이다.
```
비동기 모듈 정의(AMD, Asynchronous Module Definition)
CommonJS
만능 모듈 정의(UMD, Universal Module Definition)
System.register
ES6 모듈 포맷
```

각 문법을 간략하게 살펴보도록 하자.

#### 비동기 모듈 정의(AMD)
AMD 포맷은 브라우저에서 사용되고 define 함수를 사용해서 모듈을 정의한다.
```javascript
//Calling define with a dependency array and a factory function
define(['dep1', 'dep2'], function (dep1, dep2) {    //Define the module value by returning a value.
  return function () {}; });
```

#### CommontJS 포맷
CommonJS 포맷은 Node.js에서 사용되고 require와 module.exports를 사용해서 의존성과 모듈을 정의한다.

```javascript
var dep1 = require('./dep1');   
var dep2 = require("./dep2");  
module.exports = function(){     
  // ...
}
```

#### 만능 모듈 정의(UMD)

UMD 포맷은 브라우저와 Node.js에서 둘 다 사용될 수 있다.

```javascript
(function (root, factory) {   if (typeof define === 'function' && define.amd) {     // AMD. Register as an anonymous module.
    define(['b'], factory);   } else if (typeof module === 'object' && module.exports) {     // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('b'));   } else {     // Browser globals (root is window)
    root.returnExports = factory(root.b);   } }(this, function (b) {   //use b in some fashion.

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {}; }));
```

#### System.register
System.register 포맷은 ES5에서 ES6 모듈 문법을 지원하기 위해 디자인되었다.
```javascript
import { p as q } from './dep';  
var s = 'local';  
export function func() {     
  return q;
}  
export class C {   }
```

#### ES6 모듈 포맷
ES6에서 자바스크립트는 내장된 모듈 포맷도 지원한다.
모듈의 공개 API로 내보내기 위해 export 토큰을 사용한다.
```javascript
// lib.js

// Export the function
export function sayHello(){     
  console.log('Hello');
}  // Do not export the function
function somePrivateFunction(){     
  // ...
}

```

그리고 import 토큰은 모듈이 내보내는 부분을 가져온다.
```javascript
import { sayHello } from './lib';  sayHello();   // => Hello
```

우리는 as를 사용하여 가져오는 모듈에 별명을 줄 수도 있다.
```javascript
import { sayHello as say } from './lib';  say();   // => Hello
```
또는 전체 모듈을 한 번에 로드할 수도 있다.
```javascript
import * as lib from './lib';  lib.sayHello();   // => Hello
```
이 형식은 default export도 지원한다. (역자주: default export를 사용하면 모듈을 가져올 때 괄호({})를 사용하지 않아도 되며, 단일 값을 내보낼 때 사용한다)
```javascript
// lib.js

// Export default function
export default function sayHello(){     console.log('Hello'); }  // Export non-default function
export function sayGoodbye(){     console.log('Goodbye'); }
```

모듈은 다음과 같이 가져온다.

```javascript
import sayHello, { sayGoodbye } from './lib';  sayHello();   // => Hello

sayGoodbye();   // => Goodbye
```

함수뿐만 아니라 어떤 것이든 내보낼 수 있다.
```javascript
// lib.js

// Export default function
export default function sayHello(){     console.log('Hello'); }  // Export non-default function
export function sayGoodbye(){     console.log('Goodbye'); }  // Export simple value
export const apiUrl = '...';  // Export object
export const settings = {     debug: true }
```

불행하게도 내장된 모듈 포맷은 아직 모든 브라우저에서 지원되지 않는다.

그래서 우리는 이미 ES6 모듈 포맷을 사용할 수 있지만, 브라우저에서 코드를 실행하기 전에 Babel과 같은 변환기를 사용해 ES5 모듈 포맷(AMD 또는 CommonJS)으로 코드 변환이 필요하다.

### 모듈 로더
모듈 로더는 주요 모듈 포맷으로 작성된 모듈을 해석하고 로드한다.

모듈 로더는 런타임에 실행된다.

브라우저에서 모듈 로더를 로드한다.

모듈 로더에게 어떤 메인 애플리케이션 파일을 로드할 것인지 알려준다.

모듈 로더는 메인 애플리케이션 파일을 다운로드하고 해석한다.

필요한 경우 모듈 로더가 파일을 다운로드한다.

브라우저 개발자 콘솔에서 네트워크 탭을 열면, 모듈 로더에 의해 많은 파일들이 로드된 것을 볼 수 있다.

인기 있는 모듈 로더에는 다음과 같은 것들이 있다.
```
RequireJS : AMD 포맷 모듈을 위한 로더
SystemJS : AMD, CommonJS, UMD 또는 System.register 포맷 모듈을 위한 로더
```

### 모듈 번들러
모듈 번들러는 모듈 로더를 대체한다.
모듈 로더와 반대로 모듈 번들러는 빌드 타임에 실행된다.
빌드 타임에 번들 파일을 생성하기 위해 모듈 번들러를 실행한다. (예: bundle.js)
브라우저에서 번들 파일을 로드한다.
브라우저 개발자 콘솔에서 네트워크 탭을 열면, 모듈 로더에 의해 1개 파일만 로드된 것을 볼 수 있다. 브라우저에서 모듈 로더를 필요로 하지 않는다. 모든 코드는 번들 안에 포함되어 있다.
인기 있는 모듈 번들에는 다음과 같은 것들이 있다.
```
Browserify : CommonJS 모듈을 위한 번들러
Webpack : AMD, CommonJS, ES6 모듈을 위한 번들러
```

## 요약
모던 자바스크립트 개발 환경에서 툴링을 잘 이해하기 위해서는 모듈, 모듈 포맷, 모듈 로더와 모듈 번들러 사이의 차이를 이해하는 것이 중요하다.

모듈은 구현 세부 사항을 캡슐화하고 공개 API를 노출해 다른 코드에서 쉽게 로드하고 사용할 수 있도록 재사용 가능한 코드 조각이다.

모듈 포맷은 모듈을 정의하기 위해 사용하는 문법이다. AMD, CommonJS, UMD, System.register 와 같은 여러 모듈 포맷이 과거에 등장했으며, ES6부터 내장된
모듈 포맷을 사용할 수 있다.

모듈 로더는 주요 모듈 포멧으로 작성된 모듈을 런타임 때 로드하고 해석한다. RequireJS와 SystemJS가 있다.

모듈 번들러는 모듈 로더를 대체하고 빌드 타임에 모든 코드의 번들을 생성한다. Browserify와 Webpack이 있다.
