# LESS와 SASS

CSS 중복 코드를 피하고 프로그래밍적 요소를 적용시키기 위한 프로젝트들이다.

두 프로젝트 모두 각자의 문법으로 작성된 코드들을 CSS 코드로 변환해주는 변환기가 있는데

LESS는 Node 기반이고 SASS는 Ruby 기반으로 작성되었다. (17년 현재 SASS도 Node 변환기가 있다.)

간단한 변환 명령어.

```bash
$ lessc style.less & style.css
$ sass style.scss: style.css
```

### 변수 선언
LESS는 @ SASS는 $를 통해서 선언한다.

```LESS
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

#header { color: @light-blue; }
```

SASS에는 !default 키워드가 있는데, 변수가 할당되지 않았을때 적용할 기본값을 선언할 수 있다.

```SASS
  @content : "First";
  @content : "Second" !default;

  #main { content : @content; }
```

- 스코프
LESS는 스코프가 있다. 아래와 같이 선언된 color는 #header 태그 안에서만 변하고 전역 값은 변하지 않는다.

```LESS
@color : red;
#header {
    @color : blue;
    border: 1px solid @color;
}
#footer {
    border: 1px solid @color;
}
```
```css
/* LESS */
#header { border: 1px solid blue; }
#footer { border: 1px solid red; }

/* SASS */
#header { border: 1px solid blue; }
#footer { border: 1px solid blue; }
```


### 계산과 함수

앞의 예제에서 보듯 변수의 뺄셈을 포함한 사칙 연산이 가능하다. 뿐만 아니라 많지는 않으나 CSS에서 사용하기에는 충분한 정도의 유용한 함수도 제공한다. 예를 들어 10% 밝은 파란색을 원한다면 다음과 같이 작성할 수 있다.
```SASS
#header { color : lighten(blue, 10%) }
```
LESS나 SASS가 제공하는 함수의 종류나 사용법은 거의 유사하지만 SASS가 조금 더 많다.

### 선택자 상속

SASS에서만 제공하는 기능으로서, 앞서 정의한 CSS 규칙에 선택자를 추가해주는 기능을 한다.
```CSS
.error {
    border : 1px solid red;
    background-color : #fdd;
}
.seriousError {
    @extend .error;
    border-width : 3px;
}
위 코드를 컴파일하면 다음과 같다.

.error, .seriousError {
    border : 1px solid red;
    background-color : #fdd;
}
. seriousError {
    border-width : 3px;
}
```

### 중첩 규칙

선택자를 중첩하여 상위 선택자를 반복 입력하지 않아도 되는 기능이다(개인적으로 다른 어떤 기능보다 CSS에 도입이 필요하다고 생각한다). 두 방식 모두 다음과 같은 문법을 지원한다.
```CSS
#header {
  h1 {
    font-size: 26px;
    font-weight: bold;
  }
  p { font-size: 12px;
    a { text-decoration: none;
      &:hover { border-width: 1px }
    }
  }
}
```

이 코드를 CSS로 컴파일하면 다음과 같다.
```CSS
#header h1 {
  font-size: 26px;
  font-weight: bold;
}
#header p {
  font-size: 12px;
}
#header p a {
  text-decoration: none;
}
#header p a:hover {
  border-width: 1px;
}
```
특이한 부분은 수도 클래스(:hover)처럼 부모 선택자를 참조해야하는 경우에는 부모 선택자를 &로 참조한다는 점이다 (&:hover 부분).

LESS와 달리 SASS에서는 CSS 속성 이름도 중첩이 가능하다.
```CSS
.fakeshadow {
  border: {
    style: solid;
    left: {
      width: 4px;
      color: #888;
    }
    right: {
      width: 2px;
      color: #ccc;
    }
}
```
위 코드를 CSS로 변환하면 다음과 같다.
```CSS
.fakeshadow {
  border-style: solid;
  border-left-width: 4px;
  border-left-color: #888;
  border-right-width: 2px;
  border-right-color: #ccc;
}
```

### 주석

주석으로는 원래 CSS에서 제공하는 "/* ... " 블럭 주석 외에 // 한 줄 주석을 추가로 제공한다. 단, 블럭 주석은 컴파일된 CSS에서 그대로 표현되는 반면, 한 줄 주석은 사라진다. LESS에서는 한 줄 주석을 가리켜 침묵(slient) 모드라고 한다. 다음은 간단한 LESS 코드이다.
```CSS
/* Header */
h1 { font-size:1.5em }

// paragraph (침묵 모드)
h2 { font-size:1.3em }
위 코드를 컴파일하면 다음과 같다.

/* Header */
h1 { font-size:1.5em }

h2 { font-size:1.3em }
```

### 믹스인(Mixin)

미리 정의한 코드를 CSS 정의 안에 포함시키는 기능이다. LESS는 CSS를 클래스를 선언하는 문법과 거의 유사하게 믹스인을 정의하는 반면, SASS에서는 @mixin이라는 특수한  키워드를 사용하여 믹스인을 정의한다. 믹스인을 포함시킬 때도 LESS는 믹스인의 이름을 그대로 사용하는 반면, SASS는 @include라는 키워드를 사용한다. 예를 들어, 다음은 모서리를 둥글게 만드는 SASS 코드이다.
```CSS
@mixin rounded ($radius: 10px) {
  border-radius : $radius;
  -moz-border-radius : $radius;
  -webkit-border-radius : $radius;
}

#navbar li { @include rounded; }
#footer { @include rounded; }
이 코드를  CSS로 변환하면 다음과 같다.

#navbar li {
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
}

#footer {
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
}
```

위의 코드를 LESS로 작성하면 다음과 같다.
```CSS
.rounded (@radius : 10px) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}

#navbar li { .rounded; }
#footer { .rounded; }
```
그리고 두 방식 모두 믹스인에 인수를 전달하여 사용할 수 있다.
```CSS
#navbar li { @include rounded(5px); } /* SASS */
#footer { .rounded(5px); } /* LESS */
```
여기에 기능 상의 차이가 약간 있는데 SASS의 경우는 속성 이름에도 변수를 사용할 수 있다는 장점이 있다.

```LESS
@mixin rounded-top {
    $radius : 10px;
    $side : top;

    border-#{$side}-radius : $radius;
    -moz-border-#{$side}-radius : $radius;
    -webkit-border-#{$side}-radius : $radius;
}
```

반면, LESS에는 @argument라는 특수한 변수가 있어 인수가 많을 때 일일이 입력하지 않아도 된다는 장점이 있다.

```LESS
.box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
 box-shadow: @arguments;
 -moz-box-shadow: @arguments;
 -webkit-box-shadow: @arguments;
}
.box-shadow(2px, 5px);
```

### 임포트(import)

CSS로 컴파일 할 때 외부의 LESS 또는 SASS 파일을 읽어들인다.

```LESS
@import "lib"; /* LESS and SASS */
@import "lib.less"; /* LESS */
@import "lib.css"; /* LESS */
```

SASS는 확장자가 없는 형태만을 허용하는 반면, LESS는 .less 파일은 물론 .css 파일도 지원한다.

### 문자열

두 방식 모두 문자열 타입이 존재하며 다음과 같이 변수에 문자열을 저장할 수 있다.
```LESS
@base-url: "https://taegon.kim"; /* LESS */
$base-url: "https://taegon.kim"; /* SASS */
```

그리고 위에서 정의한 값을 문자열에 다음과 같이 삽입할 수 있다.
```LESS
h1 { background:url("@{base-url}/images/bg.png"); } /* LESS */
h1 { background:url("#{$base-url}/images/bg.png"); } /* SASS */
```

### 제어문

SASS에서만 제공하는 기능으로 @if / @else 조건문, @for / @each / @while 반복문을 제공한다. 다음은 조건문의 예제이다.

```SASS
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

@if 키워드 다음에는 괄호가 없으며, { … } 블럭은 반드시 사용해야 한다. 위 코드를 컴파일하면 다음과 같다.

```CSS
p { color: green; }
```

보다 자세한 내용은 SASS 온라인 문서를 참고하면 된다.

### 이스케이프

LESS에서만 제공하는 기능으로 .less 파일에 LESS 문법에서는 유효하지 않은 코드가 포함되어 있을 경우 해당 코드를 해석하지 않도록 만드는 방법이다. 해석하지 않을 코드를 문자열로 묶고 문자열 앞에 ~ 기호를 붙이면 된다.

```LESS
.class {
    filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
}
```
이 코드는 다음과 같이 CSS로 변환된다.
```CSS
.class {
    filter: ms:alwaysHasItsOwnSyntax.For.Stuff();
}
```

### 자바스크립트 실행

LESS에서는 자바스크립트 코드를 실행하고 그 값을 변수 등에 사용할 수 있다. 사용법은 간단하다. 실행할(정확한 용어로는 ‘평가할’=evaluate) 자바스크립트 코드를 문자열을 감싸듯 백틱 기호(backtick, `)로 감싸면 된다. 예를 들어, 다음과 같은 코드가 있다고 가정하자.

```LESS
@hi : `"hello".toUpperCase() + "!"`;
```
이 코드는 사실 다음 코드와 같다고 볼 수 있다.

```LESS
@hi : "HELLO!";
```

만약 .less 파일을 변환하지 않고 웹 브라우저에서 바로 사용한다면 다음과 같은 방법으로도 사용할 수 있다.
