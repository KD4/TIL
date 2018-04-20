doT JS
========================================================

doT.js는 V8과 node 타겟으로 설계된 경량화된 템플릿 엔진이다.

빠르고 작으며 의존성이 없다. 다음과 같은 기능들이 가능하다.

- 사용자 정의 변수
- 런타임 코드 검사
- 런타임 삽입
- 컴파일 타임 검사
- partials 지원
- 조건문 지원
- 배열 iterator 지원
- 인코딩
- 공백 관리
- 스트리밍 친화적
- 로직을 넣거나 뺼 수 있는 유연성

```
문서
http://olado.github.com/doT
```

## 기본적인 사용법


```javascript
// 1 템플릿 문자열을 매개변수로 컴파일 함수 가져오기
var tempFn = doT.template("<h1>Here is a sample template {{=it.foo}}</h1>");

// 2. 이 함수에 데이터를 아규먼트로 주면 바인딩 후 문자열 반환
var resultText = tempFn({foo: 'with doT'});
```

## API

### doT.templateSettings - 기본 컴파일 설정
컴파일 설정을 변경하여 doT를 사용자 정의 할 수 있습니다. 다음은 기본 설정입니다.

```javascript
doT.templateSettings = {
  evaluate:    /\{\{([\s\S]+?)\}\}/g,
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  encode:      /\{\{!([\s\S]+?)\}\}/g,
  use:         /\{\{#([\s\S]+?)\}\}/g,
  define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  varname: 'it',
  strip: true,
  append: true,
  selfcontained: false
};
```

위 설정에서 나타난 기본 구분 기호는 아래와 같습니다.

- {{ }}	: for evaluation
- {{= }}	: for interpolation
- {{! }}	: for interpolation with encoding
- {{# }}	: for compile-time evaluation/includes and partials
- {{## #}}	: for compile-time defines
- {{? }}	: for conditionals
- {{~ }}	: for array iteration

## doT.template - 템플릿 컴파일 기능
템플릿을 함수로 컴파일 하기 위한 메소드 spec

```javascript
function(tmpl, c, def);
```
- tmpl : 템플릿 텍스트
- c : 커스텀 컴파일 설정, 템플릿 셋팅 객체
- def : 컴파일 타임 평가를 위한 데이터.
