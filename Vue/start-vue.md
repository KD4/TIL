# 시작하기

## Vue.js 란 무엇인가?
Vue.js는 구글의 엔지니어가 만든 뷰 라이브러리이다.

angular와 비슷한 템플릿 문법을 차용하고 있고 에측 가능한 수준의 문법과 적은 키워드 양으로 러닝 커브가 낮다.

## Vue 시작하기
아래 CDN에서 Vue 스크립트 파일을 받으면 전역 객체에 Vue 객체가 생성된다.

```html
<script src='https://unpkg.com/vue'></script>
```

## 선언적 렌더링

Vue.js의 핵심은 간단한 템플릿 구문을 사용해 선언적으로 DOM에 데이터를 렌더링하는 것이다.

```html
<div id='app'>
    {{ message }}
</div>
```

```javascript
var app = new Vue({
    el: '#app',
    data: {
        message: '안녕하세요 Vue!'
    }
})
```

```html
안녕하세요 Vue!
```

위와 같은 코드를 작성하면 DOM의 선언적 문법이 들어간 곳과 app의 Data는 양방향 바인딩됩니다.

여기서 console을 열고 app.message 값을 변경하면 그에 따라 렌더링이 바뀝니다.

또한 app.message를 확인하면 여기 저장된 값을 리턴 받을 수 있습니다.

텍스트 값 이외에도 다음과 같이 엘리먼트 속성도 Vue 객체의 data 프로퍼티에 바인딩 시킬 수 있습니다.

```html
<div id="app-2">
  <span v-bind:title="message">
    내 위에 잠시 마우스를 올리면 동적으로 바인딩 된 title을 볼 수 있습니다!
  </span>
</div>
```

```javascript
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '이 페이지는 ' + new Date() + ' 에 로드 되었습니다'
  }
})
```

## 디렉티브

위 예제에서 보았던 v-bind 속성은 디렉티브라고 합니다. (*directive : 지시적인, 지휘하는, 지배하는*)

디렉티브는 Vue에서 제공하는 특수 속성임을 나타내는 "v-" 접두어가 붙어있으며 사용자가 짐작할 수 있듯 렌더링된 DOM에 특수한 반응형 동작을 합니다.

앞으로 여러가지 v- 접두어가 붙은 디렉티브 속성에 대해서 배우게 될 것입니다.

## 조건문과 반복문

엘리먼트의 존재 여부를 디렉티브를 통해서 알 수 있습니다.

```html
<div id="app-3">
  <p v-if="seen">이제 나를 볼 수 있어요</p>
</div>
```

```javascript
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

```
이제 나를 볼 수 있어요
```

여기서 콘솔을 열고 app3.seen = false를 입력하면 위 메시지가 사라지는 것을 볼 수 있습니다.

이 예제를 통해서 우리는 DOM의 구조에도 데이터를 바인딩 할 수 있음을 보여줍니다.

또한 Vue 엘리먼트가 Vue에 삽입/갱신/제거될 때 자동으로 전환 효과를 적용할 수 있는 강력한 시스템을 제공합니다.

v-for 디렉티브는 배열의 데이터를 사용해 항목 목록을 표시하는데 사용할 수 있습니다.

```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```javascript
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'JavaScript 배우기' },
      { text: 'Vue 배우기' },
      { text: '무언가 멋진 것을 만들기' }
    ]
  }
})
```

```
JavaScript 배우기
Vue 배우기
무언가 멋진 것을 만들기
```

콘솔에서, app4.todos.push({ text: 'New item' })을 입력하십시오. 목록에 새 항목이 추가되어야 합니다.


## 사용자 입력 핸들링
v-on 디렉티브는 메소드를 DOM 이벤트 핸들러에 바인딩할 수 있습니다.

마치 Jquery의 $(#id).on('click', function)과 같은 기능을 v-on 디렉티브를 통해서 구현할 수 있습니다.

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">메시지 뒤집기</button>
</div>
```
```javascript
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: '안녕하세요! Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

## v-model

v-model을 사용하면 양방향 바인딩을 쉽게 구현할 수 있습니다.

```html
<div id="app">
  <div>
    Hello, {{name}}!
  </div>
  <input type="text" v-model="name" placeholder="이름.." />
</div>
```
```javascript
const app = new Vue({
  el: '#app',
  data: {
    name: ''
  }
});
```

v-model은 기본적으로 input 이벤트 후 모델과 동기화가 진행되는데, .lazy 수식어로 change 이벤트 후에 동기화할 수 있습니다.

<input v-model.lazy='msg'>

.number를 사용하면 자동으로 숫자로 형변환이 일어나고, 입력된 값이 자동으로 trim되기 원하면 .trim을 사용하면 됩니다.

<input v-model.number="age" type="number">

<input v-model.trim="msg">

## 컴포넌트

Vue에서 컴포넌트는 본질적으로 미리 정의된 옵션을 가진 Vue 인스턴스입니다. Vue에서 컴포넌트를 등록하는 방법은 간단합니다.

```javascript
// todo-item 이름을 가진 컴포넌트를 정의합니다
Vue.component('todo-item', {
  template: '<li>할일 항목 하나입니다.</li>'
})
```

이제 다른 컴포넌트의 템플릿에서 이 컴포넌트를 사용할 수 있습니다.
```html
<ol>
  <!-- todo-item 컴포넌트의 인스턴스 만들기 -->
  <todo-item></todo-item>
</ol>
```

우리는 prop 프로퍼티를 이용해서 해당 컴포넌트를 사용할 때, 동적으로 데이터가 바인딩 되도록 할 수 있습니다.

```javascript
Vue.component('todo-item', {
  // 이제 todo-item 컴포넌트는 "prop" 이라고 하는
  // 사용자 정의 속성 같은 것을 입력받을 수 있습니다.
  // 이 prop은 todo라는 이름으로 정의했습니다.
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```

```html
<div id="app-7">
  <ol>
    <!-- 이제 각 todo-item 에 todo 객체를 제공합니다. -->
    <!-- 화면에 나오므로, 각 항목의 컨텐츠는 동적으로 바뀔 수 있습니다. -->
    <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
  </ol>
</div>
```

```javascript
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { text: '채소' },
      { text: '치즈' },
      { text: '사람이 먹을 수 있는 다른 무언가' }
    ]
  }
})
```
