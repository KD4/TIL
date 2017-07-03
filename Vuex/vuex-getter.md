# Getter
저장소의 상태를 가져올 때 특정 로직을 적용 시켜야 할 경우

 일반적으로 컴포넌트의 computed 속성을 이용하면 아래와 같은 형태를 띕니다.

```javascript
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

하지만 다른 컴포넌트에서 같은 로직을 적용해야할 경우에는 중복 코드 문제가 발생합니다.

Vuex를 사용하면 저장소에서 "getters"를 정의 할 수 있습니다(저장소의 계산된 속성으로 생각됩니다). Getters는 첫 번째 전달인자로 상태를 받습니다.

```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

getters는 store.getters 객체에 노출 됩니다.
```javascript
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```
Getters는 두 번째 전달인자로 다른 getter도 받게됩니다.
```javascript
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1
```

이제 모든 컴포넌트에서 쉽게 사용할 수 있습니다.
```javascript
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```
