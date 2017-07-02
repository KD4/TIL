# v-bind:class와 v-bind:style의 향상된 기능
- v-bind 디렉티브를 이용해서 클래스 요소나 인라인 스타일 요소를 정의할 수 있다.
- 데이터를 바인딩할 때 들어가는 로직들에 대한 몇몇 편리한 예약 로직이 있다.

### 속성을 참조해서 class값 설정
클래스를 동적으로 토글하기 위해 v-bind:class에 객체를 전달할 수 있습니다.
```html
<div v-bind:class="{ active: isActive }"></div>
```
위 구문은 active 클래스의 존재 여부가 데이터 속성 isActive 의 참 속성에 의해 결정되는 것을 의미합니다.

객체에 필드가 더 있으면 여러 클래스를 토글 할 수 있습니다. 또한v-bind:class 디렉티브는 일반 class 속성과 공존할 수 있습니다. 그래서 다음과 같은 템플릿이 가능합니다:
```html
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```html
그리고 데이터는:
```javascript
data: {
  isActive: true,
  hasError: false
}
```
아래와 같이 렌더링 됩니다:
```html
<div class="static active"></div>
```

isActive 또는 hasError 가 변경되면 클래스 목록도 그에 따라 업데이트됩니다. 예를 들어, hasError 가 true 가 되면 클래스 목록은 "static active text-danger" 가됩니다.

바인딩 된 객체는 인라인 일 필요는 없습니다.
```html
<div v-bind:class="classObject"></div>
```
```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

같은 결과로 렌더링 됩니다. 또한 객체를 반환하는 계산된 속성에도 바인딩 할 수 있습니다. 이것은 일반적이며 강력한 패턴입니다.

```html
<div v-bind:class="classObject"></div>
```
```javascript
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal',
    }
  }
}
```

## 배열을 넘겨서 클래스 목록을 지정

## 컴포넌트와 함께 사용

## v-bind:style을 통해서 인라인 스타일 바인딩
```html
<div v-bind:class="[activeClass, errorClass]">
```
```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
아래와 같이 렌더링 됩니다:
```html
<div class="active text-danger"></div>
```

목록에 있는 클래스를 조건부 토글하려면 삼항 연산자를 이용할 수 있습니다.
```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]">
```
이것은 항상 errorClass를 적용하지만 isActive가 true일 때 activeClass만 적용됩니다.
그러나 여러 조건부 클래스가 있는 경우 장황해질 수 있습니다. 그래서 배열 구문 내에서 객체 구문을 사용할 수 있습니다.
```html
<div v-bind:class="[{ active: isActive }, errorClass]">
```

## 컴포넌트와 함께 사용

사용자 정의 컴포넌트로 class 속성을 사용하면, 클래스가 컴포넌트의 루트 엘리먼트에 추가 됩니다. 이 엘리먼트는 기존 클래스는 덮어쓰지 않습니다.

예를 들어, 이 컴포넌트를 선언하는 경우에:
```javascript
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```
사용할 클래스 일부를 추가하십시오:
```javascript
<my-component class="baz boo"></my-component>
```
렌더링 된 HTML 입니다:
```html
<p class="foo bar baz boo">Hi</p>
```

## v-bind:style 을 통해서 인라인 스타일 바인딩

v-bind:style 객체 구문은 매우 직설적입니다. 거의 CSS 처럼 보이지만 JavaScript 객체입니다. 속성 이름에 camelCase와 kebab-case (따옴표를 함께 사용해야 합니다)를 사용할 수 있습니다.
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```
```javascript
data: {
  activeColor: 'red',
  fontSize: 30
}
```
