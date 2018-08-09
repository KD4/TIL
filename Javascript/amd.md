AMD(Asynchronous Module Definition)
=====================================

- CommonJS 그릅과 같이 발전하다가 독립한 모듈 방식
- 비동기 처리에 대한 합의점을 찾지 못했? 다고한다.

AMD 진영에서는 모듈을 네트워크를 이용해 내려받아야 하는 브라우저 환경에서도 모듈을 사용할 수 있도록 표준을 만들고싶었다.

이런 목표를 표현하듯 AMD는 Asynchronous Module Definition의 약자이다.

## define() 함수
브라우저 환경의 Javascript는 스코프가 따로 존재하지 않기 때문에 define() 함수를 통해서 스코프를 구현한다.

일종의 네임스페이스 역할을 하여 모듈에서 사용하는 변수와 전역변수를 분리한다.

아래와 같이 정의된다.

```
define(id?, dependencies?, factory)
```

첫 번째 인수 id는 모듈을 식별하는데 사용하는 인수로 옵셔널한 값이다. 이 값이 없으면 요청하는 script 태그의 src 값을 id로 취한다.

두 번째 인수는 정의하려는 모듈의 의존성을 나타내는 배열로 반드시 먼저 로드돼야 하는 모듈을 나타낸다. 이렇게 먼저 로드된 모듈은 세 번째 인수인 팩토리 함수의 인수로 넘어간다.

세 번째 인수는 팩토리 함수로 모듈이나 객체를 인스턴스화하는 실제 구현을 담당한다. 만약 팩토리 인수가 함수라면 싱글톤으로 한 번만 실행되고 반환되는 값이 있다면 그 값을 exports 객체의 속성값으로 할당한다. 팩토리 인수가 객체라면? exports 객체의 그대로 할당된다.

## 전역변수와 define.amd 프로퍼티

AMD 명세에서 정의하는 전역변수는 define, require 객체, export 객체가 있다. (뒤에 두개는 CommonJS)
그리고 전역 모듈을 명시적으로 가리킬 때 사용하는 define.amd 프로퍼티도 사용할 수 있다.

## AMD로 정의한 모듈 예시
다음 예제는 3가지 인수를 모두 사용하는 기본 AMD 모듈이다.

alpha라는 모듈을 정의하는데 beta라는 모듈이 필요하다는 것을 나타낸다.

```Javascript
define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
  exports.verb = function() {
    // 넘겨 받은 beta 인수를 사용해도 되고,
    return beta.verb();

    // require() 키워드로 모듈을 사용해도 된다.
    return require("beta").verb();
  }
})

```

두 번째 예제는 첫번 째 인수를 생략해서 id가 없다. 그래서 require를 이용해서 이 모듈을 가져오려면 상대 경로를 입력해야한다.
```Javascript
define(["alpha"], function (alpha) {
  return {
    verb: function() {
      return alpha.verb() + 2;
    }
  }
});

require(["/js/modelBeta.js"], function (moduleBeta)() {

})
```

## AMD의 장점

AMD 모듈 명세의 장점은 단연 비동기 환경에서도 매우 잘 동작할 뿐만 아니라, 서버사이드에서도 동일한 코드로 동작한다는 것이다.
간단하고 명료하며 define() 함수로 모듈을 구현하므로 전역 오염도 없다. 또 해당 모듈을 필요한 시점에 로딩하는 Lazy-Load 기법을 응용할 수도 있다.
