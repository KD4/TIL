# Babel
- 여러 언어로 재잘거리다 라는 격식체이다.
신의 권위에 도전하는 사람들이 바벨탑을 쌓다가 노여움을 사 사용하는 언어가 나눠졌다는 신화를 바탕으로 한다.

Babel이란 단어의 의미처럼 바벨은 한 버전의 문법으로 작성된 코드를 여러 언어로 재절거릴 수 있게 바꿔주는 JS 컴파일러다.

자바스크립트 버전은 가장 많이 사용하는 ES6 문법 부터 ES7까지 나와있다. 하지만 불행하게도 이 버전의 JS 코드들은 브라우저가 이해하기 힘든 구조이다.

때문에 Babel을 써서 하위 버전의 자바스크립트 언어로 트랜스파일링을 해줘야한다.

* 유용한 ES6 문법? : arrow function, classes, enhanced object literals, template string, destructering, let, const



### Babel-polyfil (polyfil : 충전솜)
- Babel 만으로는 부족하다.

Babel로 ES6 문법을 ES5로 컴파일 했어도 브라우저마다 지원하는 함수가 다르다. 다른 방법이 필요하다.
Polyfil은 현재 브라우저에서 지원하지 않는 함수를 검사해서 각 objet의 prototype에 붙여준다.

즉, babel은 컴파일 타임에 실행되고 babel-polyfil은 런타임에 실행된다

아래 코드는 babel-polyfill을 설치하고 코드에 적용하는 예제이다.

```bash
$ npm install babel-polyfill -S
```

`entry.js`:
```javascript
import 'babel-polyfill';
import './index';
```

`index.js`:
```javascript
const NUM = 123;
console.log(Number.isInteger(NUM));
```

위 코드를 자세히 보면 시작 시점에 babel-polyfill을 import 해주고 있다. 이렇게 추가된 polyfill 모듈은 전역에 폴리필을 추가한다. 이때 전역 오염이 발생한다.

이 때문에 babel-polyfill에서 두 개의 인스턴스를 실행하게 되면 반복적인 객체 수정을 막기위해서 오류를 발생시킨다.

```
Uncaught Error : only one instance of babel-polyfill is allowed
```

위 이유 때문에 다른 페이지에 임베디드되는 어플리케이션 같은 경우에는 babel-polyfill 오류가 발생할 수 있다. 이런 앱이 아닌 싱글 페이지 같은 경우에는 다른 폴리필로 인한 오류 발생 염려가 없으므로 babel-polyfill만으로 IE8 과 같은 레거시 브라우저에서 큰 문제없이 코드를 실행할 수 있다.


### Babel-runtime
위 polyfill을 통한 방법은 강력한 방법이긴 하지만 전역 스코프를 오염시킵니다. 따라서 라이브러리 모듈이나 polyfill 조차 필요하지 않은 간단한 어플리케이션을 작성할 때는 적합한 방법이 아닐 수 있습니다.

하지만 기본적인 babeljs의 런타임 코드나 Map, Set, Array.from()과 같은 static 메서드나 빌트인 클래스는 transform-runtime 플러그인과 babel-runtime을 통해 계속 역할을 수행 하도록 만들 수 있습니다.

즉 polyfill은 모든 기능이 작동할 수 있도록 처리하며 runtime은 일부 필수 기능과 babel의 런타임 코드만을 처리합니다.


### Babel-plugin-transform-runtime
babel-polyfill 외에 또 하나의 방법은 babel-plugin-transform-runtime 플러그인을 사용해서 Babel이 트랜스파일링 하는 과정에서 폴리필이 필요한 부분을 내부의 헬퍼 함수를 사용하도록 치환해주는 방법이다.

`Babel-plugin-transform-runtime`은 플러그인으로써 빌드 단계(트랜스파일링)에서 동작한다. 이 플러그인은 내부적으로 babel-runtime을 디펜던시로 갖는데, babel-runtime은 core-js와 regenerator-runtime을 디펜던시로 갖는다.

### babel-plugin-transform-runtime 사용 시 주의할 점
Object.assign 처럼 내장 객체의 static 메서드는 사용가능하다.
하지만 새롭게 추가된 인스턴스 메서드는 사용할 수 없다. [1,2,3].includes(3) 과 같은 메서드는 트랜스파일링 되지 않기 때문에 오류가 발생한다. 따라서 새롭게 추가된 프로포타입 메서드들은 사용하지 않도록 주의해야 한다.

또 한가지 주의할 점은 디펜던시들의 ES2015 기능들 사용 여부다. babel-polyfill은 전역을 수정하기 때문에 상관없지만 babel-plugin-transform-runtime은 이 부분을 고려해서 Promise를 사용하는 디펜던시가 있다면 이 디펜던시도 함께 트랜스파일링할 수 있도록 옵션에 추가해야한다.




### .babelrc
프로젝트 루트에 넣는 설정파일이다.

plugins와 preset이라는 개념이 존재한다.

각 변환대상 문법 하나 (arrow function 등)이 plugin 개념.

이 plugin이 여러 개 모인것이 preset이다.

ex) ES2015 preset, react preset


내 코드가 어떻게 babel로 트랜스파일링 될까 ? 궁금하면 아래 주소로 가자!

http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&code=
