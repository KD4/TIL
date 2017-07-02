# 컴포넌트
기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화하는 데 도움이 됩니다.

상위 수준에서 컴포넌트는 Vue의 컴파일러에 의해 동작이 추가된 사용자 지정 엘리먼트입니다.

## 컴포넌트 등록
- 전역 : 전역 컴포넌트를 등록하려면, Vue.component(tagName, options)를 사용합니다.
```Javascript
Vue.component('my-component', {
  // 옵션
})
```
- 지역 등록 :모든 컴포넌트를 전역으로 등록 할 필요는 없습니다. 컴포넌트를 components 인스턴스 옵션으로 등록함으로써 다른 인스턴스/컴포넌트의 범위에서만 사용할 수있는 컴포넌트를 만들 수 있습니다
```Javascript
var Child = {
  template: '<div>사용자 정의 컴포넌트 입니다!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 는 상위 템플릿에서만 사용할 수 있습니다.
    'my-component': Child
  }
})
```

## 컴포넌트 제약 : data는 반드시 함수여야한다.
Vue 생성자에 사용할 수 있는 대부분의 옵션은 컴포넌트에서 사용할 수 있습니다. 한가지 특별한 경우가 있습니다. data 는 함수여야 합니다.

실제로 이를 사용하는 경우에:
```Javascript
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: {
    message: 'hello'
  }
})
```

그런 다음 Vue는 중단하고 콘솔에서 경고를 합니다. data는 컴포넌트 인스턴스의 함수여야합니다. 규칙이 존재하는 이유를 이해하는 것이 좋습니다. 따라서 다음과 같이 사용하십시오.
```html
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```
```javascript
var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 데이터는 기술적으로 함수이므로 Vue는 따지지 않지만
  // 각 컴포넌트 인스턴스에 대해 같은 객체 참조를 반환합니다.
  data: function () {
    return data
  }
})
new Vue({
  el: '#example-2'
})
```

## 부모, 자식 컴포넌트 데이터 보내고, 받기
- Props : 부모 -> 자식
- custom event : 자식 -> 부모


## Props로 데이터 전달하기

모든 컴포넌트 인스턴스에는 자체 격리 된 범위 가 있습니다. 즉, 하위 컴포넌트의 템플릿에서 상위 데이터를 직접 참조 할 수 없으며 그렇게 해서는 안됩니다. 데이터는 props 옵션 을 사용하여 하위 컴포넌트로 전달 될 수 있습니다.

prop는 상위 컴포넌트의 정보를 전달하기위한 사용자 지정 특성입니다. 하위 컴포넌트는props 옵션을 사용하여 수신 할 것으로 기대되는 props를 명시적으로 선언해야합니다
```Javascript
Vue.component('child', {
  // props 정의
  props: ['message'],
  // 데이터와 마찬가지로 prop은 템플릿 내부에서 사용할 수 있으며
  // vm의 this.message로 사용할 수 있습니다.
  template: '<span>{{ message }}</span>'
})
```
그런 다음 일반 문자열을 다음과 같이 전달할 수 있습니다.
```html
<child message="안녕하세요!"></child>
```


## 동적 Props

정규 속성을 표현식에 바인딩하는 것과 비슷하게, v-bind를 사용하여 부모의 데이터에 props를 동적으로 바인딩 할 수 있습니다. 데이터가 상위에서 업데이트 될 때마다 하위 데이터로도 전달됩니다.
```html
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>
```

v-bind에 대한 단축 구문을 사용하는 것이 더 간단합니다.

```html
<child :my-message="parentMsg"></child>
```


## 리터럴 vs. 동적

초보자가 흔히 범하는 실수는 리터럴 구문을 사용하여 숫자를 전달하려고 시도하는 것입니다.
```html
<!-- 이것은 일반 문자열 "1"을 전달합니다. -->
<comp some-prop="1"></comp>
```
그러나 이것은 리터럴 prop이기 때문에 그 값은 실제 숫자가 아닌 일반 문자열 "1" 로 전달됩니다. 실제 JavScript 숫자를 전달하려면 값이 JavaScript 표현식으로 평가되도록 v-bind를 사용해야합니다.
```html
<!-- 이것은 실제 숫자로 전달합니다. -->
<comp v-bind:some-prop="1"></comp>
```


## 단방향 데이터 흐름

모든 props는 하위 속성과 상위 속성 사이의 단방향 바인딩을 형성합니다. 상위 속성이 업데이트되면 하위로 흐르게 되지만 그 반대는 안됩니다. 이렇게하면 하위 컴포넌트가 실수로 상위 상태로 변경되는 것을 방지할 수 있습니다. 이로 인해 앱의 데이터 흐름을 추론하기가 더 어려워 질 수 있습니다.

또한 상위 컴포넌트가 업데이트 될 때마다 하위 컴포넌트의 모든 props가 최신 값으로 갱신됩니다. 즉, 하위 컴포넌트 내부에서 prop을 변형하려고 시도하면 안됩니다. 시도할 Vue가 콘솔에서 경고합니다.

일반적으로 prop을 변경시키고 싶은 유혹을 불러 일으킬 수있는 두 가지 경우가 있습니다.

이 prop는 초기 값을 전달 하는데만 사용되며 하위 컴포넌트는 이후에 이를 로컬 데이터 속성으로 사용하기만 합니다.

prop는 변경되어야 할 원시 값으로 전달됩니다.

이러한 사용 사례에 대한 적절한 대답은 다음과 같습니다.

prop의 초기 값을 초기 값으로 사용하는 로컬 데이터 속성을 정의 하십시오.
```javascript
props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}
```
prop 값으로 부터 계산된 속성을 정의 합니다.
```javascript
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```


## props 검증

컴포넌트가 받는 중인 prop에 대한 요구사항을 지정할 수 있습니다. 요구사항이 충족 되지 않으면 Vue에서 경고를 내보냅니다. 이 기능은 다른 사용자가 사용할 컴포넌트를 제작할 때 특히 유용합니다.

props를 문자열 배열로 정의하는 대신 유효성 검사 요구사항이 있는 객체를 사용할 수 있습니다.
```javascript
Vue.component('example', {
  props: {
    // 기본 타입 확인 (`null` 은 어떤 타입이든 가능하다는 뜻입니다)
    propA: Number,
    // 여러개의 가능한 타입
    propB: [String, Number],
    // 문자열이며 꼭 필요합니다
    propC: {
      type: String,
      required: true
    },
    // 숫자이며 기본 값을 가집니다
    propD: {
      type: Number,
      default: 100
    },
    // 객체/배열의 기본값은 팩토리 함수에서 반환 되어야 합니다.
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 사용자 정의 유효성 검사 가능
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```
type은 다음 네이티브 생성자 중 하나를 사용할 수 있습니다.
```
String
Number
Boolean
Function
Object
Array
```

또한, type 은 커스텀 생성자 함수가 될 수 있고, assertion은 instanceof 체크로 만들어 질 것입니다.
prop 유효성 검사가 실패하면 Vue는 콘솔 경고를 생성합니다(개발 빌드를 사용하는 경우).


## 사용자 정의 이벤트, 부모에게 이벤트 보내기
우리는 부모가 prop을 사용하여 자식에게 데이터를 전달할 수 있다는 것을 알았지만, 문제가 발생했을 때 어떻게 부모에게 다시 알릴까요? 바로 Vue의 사용자 정의 이벤트 시스템이 들어오는 곳입니다.

v-on을 이용한 사용자 지정 이벤트

모든 Vue 인스턴스는 다음과 같은 이벤트 인터페이스를 구현합니다.

- $on(eventName)을 사용하여 이벤트를 감지 하십시오.

- $emit(eventName)을 사용하여 이벤트를 트리거 하십시오.

Vue의 이벤트 시스템은 브라우저의 EventTarget API와 별개입니다. 비슷하게 작동하지만 $on 과 $emit 는 addEventListener 와 dispatchEvent의 별칭이 아닙니다.

또한, 부모 컴포넌트는 자식 컴포넌트가 사용되는 템플릿에서 직접 v-on 을 사용하여 자식 컴포넌트에서 보내진 이벤트를 들을 수 있습니다.

$on은 자식에서 호출한 이벤트는 감지하지 않습니다. v-on을 템플릿에 반드시 지정해야 합니다. 아래의 예제를 보십시오.

```html
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
```
```javascript
Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
```
이 예제에서는 하위 컴포넌트가 외부에서 발생 하는 것과 완전히 분리 된다는 점에 유의해야 합니다. 부모 컴포넌트가 신경 쓸 수 있는 경우를 대비하여 자체 활동에 대한 정보를 보고 하는 것뿐입니다.

## 컴포넌트에 네이티브 이벤트 바인딩

컴포넌트의 루트 엘리먼트에서 네이티브 이벤트를 수신하려는 경우가 있을 수 있습니다. 이러한 경우 v-on 에 .native 수식자를 사용할 수 있습니다. 예 :

<my-component v-on:click.native="doTheThing"></my-component>


## .sync 수식어

일부 경우에 속성에 “양방향 바인딩”이 필요할 수 있습니다. Vue 1버전에 있던 .sync 수식어와 동일합니다. 자식 컴포넌트가 .sync를 가지는 속성을 변경하면 값의 변경이 부모에 반영됩니다. 편리하지만 단방향 데이터 흐름이 아니기 때문에 장기적으로 유지보수에 문제가 생깁니다. 자식 속성을 변경하는 코드는 부모의 상태에 영향을 미칩니다.

이 때문에 .sync는 2.0버전에서 삭제되었습니다. 그러나 재사용 가능한 컴포넌트를 만들 때 유용할 수 있다는 점을 알게 되었습니다. 부모 상태에 영향을 미치는 코드를 더욱 일관적이고 명백하게 만들어야합니다.

2.3 버전에서 속성을 위한 .sync 수식어를 다시 만들었지만 자동으로 v-on로 확장되는 신택스 슈가입니다.

따라서 아래 코드는

```html
<comp :foo.sync="bar"></comp>
```

아래와 같습니다.
```html
<comp :foo="bar" @update:foo="val => bar = val"></comp>
```

하위 컴포넌트가 foo를 갱신하려면 속성을 변경하는 대신 명시적으로 이벤트를 보내야합니다.
```javascript
this.$emit('update:foo', newValue)
```
