## Babel
- 여러 언어로 재잘거리다 라는 격식체이다.
신의 권위에 도전하는 사람들이 바벨탑을 쌓다가 노여움을 사 사용하는 언어가 나눠졌다는 신화를 바탕으로 한다.

Babel이란 단어의 의미처럼 바벨은 한 버전의 문법으로 작성된 코드를 여러 언어로 재절거릴 수 있게 바꿔주는 JS 컴파일러다.

자바스크립트 버전은 가장 많이 사용하는 ES6 문법 부터 ES7까지 나와있다. 하지만 불행하게도 이 버전의 JS 코드들은 브라우저가 이해하기 힘든 구조이다.

때문에 Babel을 써서 하위 버전의 자바스크립트 언어로 트랜스파일링을 해줘야한다.

* 유용한 ES6 문법? : arrow function, classes, enhanced object literals, template string, destructering, let, const

## Babel-polyfil (polyfil : 충전솜)
- Babel 만으로는 부족하다.

Babel로 ES6 문법을 ES5로 컴파일 했어도 브라우저마다 지원하는 함수가 다르다. 다른 방법이 필요하다.
Polyfil은 현재 브라우저에서 지원하지 않는 함수를 검사해서 각 objet의 prototype에 붙여준다.

즉, babel은 컴파일 타임에 실행되고 babel-polyfil은 런타임에 실행된다.

## .babelrc
프로젝트 루트에 넣는 설정파일이다.

plugins와 preset이라는 개념이 존재한다.

각 변환대상 문법 하나 (arrow function 등)이 plugin 개념.

이 plugin이 여러 개 모인것이 preset이다.

ex) ES2015 preset, react preset


내 코드가 어떻게 babel로 트랜스파일링 될까 ? 궁금하면 아래 주소로 가자!

http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&code=
