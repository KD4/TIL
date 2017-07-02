# 리스트 렌더링

## v-for

### 기본 사용법
```HTML
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```
```JAVASCRIPT
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```
```
결과:
Foo
Bar
```

### 인덱스 사용법
v-for 블록 안에는 부모 범위 속성에 대한 모든 권한이 있습니다. v-for는 또한 현재 항목의 인덱스에 대한 두 번째 전달인자 옵션을 제공합니다.
```HTML
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```
```JAVASCRIPT
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

### 템플릿 사용법
템플릿 v-if와 마찬가지로, v-for와 함께 <template> 태그를 사용하여 여러 엘리먼트의 블럭을 렌더링 할 수 있습니다. 예를 들어,
```HTML
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
```

### 객체 렌더링
v-for를 사용하여 객체의 속성을 반복할 수도 있습니다.
```HTML
<ul id="repeat-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```
```JAVASCRIPT
new Vue({
  el: '#repeat-object',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})
```

### 정수 Range
v-for는 정수를 사용할 수 있습니다. 이 경우 템플릿을 여러번 반복 합니다.
```HTML
<div>
  <span v-for="n in 10">{{ n }}</span>
</div>
```

## 컴포넌트에 사용하는 v-for
일반 엘리먼트 처럼 사용자 정의 컴포넌트에서 v-for를 직접 사용할 수 있습니다.
```HTML
<my-component v-for="item in items" :key="item.id"></my-component>
```
2.2.0버전 이후로, v-for를 사용할 때 key가 반드시 있어야 합니다.

그러나 컴포넌트에서는 그 범위가 분리되어 있기 때문에 컴포넌트에 데이터를 자동으로 전달하지 않습니다. 반복된 데이터를 컴포넌트를 전달하려면 props를 사용해야 합니다.
```HTML
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id">
</my-component>
```

컴포넌트에 item을 자동으로 주입하지 않는 이유는 컴포넌트가 v-for 작동 방식과 밀접하게 결합되기 때문입니다. 데이터의 출처를 명시적으로 표현하면 다른 상황에서는 컴포넌트를 재사용할 수 있습니다.

간단한 할일 목록 예제를 보겠습니다.
```HTML
<div id="todo-list-example">
  <input
    v-model="newTodoText"
    v-on:keyup.enter="addNewTodo"
    placeholder="Add a todo"
  >
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo"
      v-bind:title="todo"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>
```
```JAVASCRIPT
Vue.component('todo-item', {
  template: `
    <li>
      {{ title }}
      <button v-on:click="$emit('remove')">X</button>
    </li>
  `,
  props: ['title']
})
new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      'Do the dishes',
      'Take out the trash',
      'Mow the lawn'
    ]
  },
  methods: {
    addNewTodo: function () {
      this.todos.push(this.newTodoText)
      this.newTodoText = ''
    }
  }
})
```

## 배열 변경 감지
- 배열에 특정 이벤트에 트리거를 바인딩할 수 있습니다.

Vue는 감시중인 배열의 변이 메소드를 래핑하여 뷰 갱신을 트리거합니다. 래핑된 메소드는 다음과 같습니다.

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

콘솔을 열고 이전 예제의 items 배열로 변이 메소드를 호출하여 재생할 수 있습니다. 예: example1.items.push({ message: 'Baz' })

## 배열 대체

이름에서 알 수 있듯 변이 메소드는 호출된 원본 배열을 변형합니다. 이와 비교하여 변형을 하지 않는 방법도 있습니다. 바로 filter(), concat() 와 slice() 입니다. 이 방법을 사용하면 원본 배열을 변형하지 않고 항상 새 배열을 반환합니다. 변형이 없는 방법으로 작업할 때 이전 배열을 새 배열로 바꿀 수 있습니다.
```javascript
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```
이렇게 하면 Vue가 기존 DOM을 버리고 전체 목록을 다시 렌더링 한다고 생각할 수 있습니다. 다행히도, 그렇지는 않습니다. Vue는 DOM 요소 재사용을 극대화하기 위해 몇가지 똑똑한 구현을 하므로 배열을 겹치는 객체가 포함된 다른 배열로 대체하여 효율적입니다.

## 주의 사항
JavaScript의 제한으로 인해 Vue는 배열에 대해 다음과 같은 변경 사항을 감지할 수 없습니다.

인덱스로 배열에 있는 항목을 직접 설정하는 경우, 예: vm.items[indexOfItem] = newValue

배열 길이를 수정하는 경우, 예: vm.items.length = newLength

주의 사항 중 1번을 극복하기 위해 다음 두 경우 모두 vm.items[indexOfItem] = newValue 와 동일하게 수행하며, 반응형 시스템에서도 상태 변경을 트리거 합니다.

```javascript
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)
// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
주의 사항 중 2번을 극복하기 위해 splice를 사용해야 합니다.
example1.items.splice(newLength)
```


## 필터링 / 정렬 된 결과 표시하기

때로 원본 데이터를 실제로 변경하거나 재설정하지 않고 배열의 필터링 된 버전이나 정렬된 버전을 표시해야 할 필요가 있습니다. 이 경우 필터링 된 배열이나 정렬된 배열을 반환하는 계산된 속성을 만들 수 있습니다.
예:
```javascript
<li v-for="n in evenNumbers">{{ n }}</li>
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```
계산된 속성을 실행할 수 없는 상황(예: 중첩 된 v-for 루프 내부)에서는 다음 방법을 사용할 수 있습니다.
```javascript
<li v-for="n in even(numbers)">{{ n }}</li>
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```
