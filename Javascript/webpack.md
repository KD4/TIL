# Webpack

자바스크립트로 만든 프로젝트 크기가 커질수록 코드가 많아진다.

코드가 많이질 때 재사용성을 높이기 위해서 모듈 시스템이 필요하다.

- JS는 정식 스팩이 아니라 CommonJS, AMD 방식으로 커뮤니티에서 제안한 방식으로 모듈화를 구현하고있다.

Webpack은 JS 모듈 번들러이다. CommonJS, AMD 방식 둘 다 지원한다.

```javascript
// hello.js
module.exports = 'Hello';
```

위와 같이 모듈을 정의하고 아래와 같이 사용할 수 있다.

```javascript
// entry.js
var hello = require('./hello');
var world = require('./world');
document.write(hello + ', ' + world + '!');
```

하지만 위와 같이 모듈로 만든 프로그램은 브라우저에서 바로 실행할 수 없다. 컴파일을 해야한다.

Webpack은 node JS 기반 프로그램이다.

아래와 같이 CLI에서 실행할 수 있다.

```bash
$ webpack {entry.js} {bundle.js}
```

엔트리 파일은 index 형태로된 의존 관계 시작점이다. 여러 개의 엔트리 파일이 있으면 번들 파일도 여러 개로 정의해아한다.

webpack 컴파일 명령어에 --watch를 입력하면 모듈파일이 변경될 때 마다 complie한다

각 모듈이 함수로 감싸지므로 각 모듈의 변수는 지역변수이다.

여러 엔트리, 번들파일이 존재할 때는 설정파일을 쓴다.

아래와 같은 형태이다.

```javascript
module.exports = {
  entry: './app',
  output: {
    filename: 'bundle.js',
    path: 'dist'
  }
}
```
설정파일이 있는 위치에서는 '$webpack'만 해도됩니다!

webpack은 로더라는 기능도 포함한다.

로더는 다양한 리소스(Typescript, handlebar, json)등을 사용할 수 있는 JS 파일로 변환해주는 기능이다.

웹팩으로 기존에 만든 코드가 합쳐진다면 디버깅하기 힘들겠다 생각했는데, 소스맵 설정을 넣으면 개발자도구에서 webpack:// 도메인 아래로 컴파일 전 파일이 로딩된다.
