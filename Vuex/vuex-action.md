# Action
상태를 변경하는 작업에 비동기적 로직을 포함하기 위한 Store 속성, Mutation을 호출하는 commit이 있다.

Mutation과 비슷하지만 다른 점이 있다.
- 상태를 변이시키는 대신 액션으로 변이에 대한 커밋을 합니다.
- 작업에는 임의의 비동기 작업이 포함될 수 있습니다.

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

## 디스패치 액션
액션은 store.dispatch 메소드로 시작됩니다.

```javascript
store.dispatch('increment')
```

처음 볼 때는 이상해 보일 수 있습니다. 카운트를 증가 시키려면 store.commit('increment')를 직접 호출하면 어떻습니까? 음, 돌연변이는 동기적 이어야 한다는 것을 기억하십니까? 액션은 그렇지 않습니다. 액션 내에서 비동기 작업을 수행 할 수 있습니다.
```javascript
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

액션은 동일한 페이로드 타입과 객체 스타일의 디스패치를 지원합니다.
```javascript
// 페이로드와 함께 디스패치
store.dispatch('incrementAsync', {
  amount: 10
})

// 객체와 함께 디스패치
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```


## map 헬퍼 이용해서 액션 주입하기

this.$store.dispatch('xxx')를 사용하여 컴포넌트에서 액션을 디스패치하거나 컴포넌트 메소드를 store.dispatch 호출에 매핑하는 mapActions 헬퍼를 사용할 수 있습니다 (루트 store 주입 필요) :

```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment' // this.increment()을 this.$store.dispatch('increment')에 매핑
    ]),
    ...mapActions({
      add: 'increment' // this.add()을 this.$store.dispatch('increment')에 매핑
    })
  }
}
```


### 액션 구성하기

액션은 종종 비동기적 입니다. 그러면 액션이 언제 완료되는지 어떻게 알 수 있습니까? 더 중요한 것은, 복잡한 비동기 흐름을 처리하기 위해 어떻게 여러 작업을 함께 구성 할 수 있습니까?

가장 먼저 알아야 할 점은 store.dispatch가 트리거 된 액션 핸들러에 의해 반환된 Promise를 처리 할 수 있으며 Promise를 반환한다는 것입니다.

```javascript
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

이렇게 할 수 있습니다.

```javascript
store.dispatch('actionA').then(() => {
  // ...
})
```
그리고 안에 또 다른 액션을 사용할 수 있습니다.
```javascript
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

마지막으로, JavaScript 기능인 async/await를 사용하면 다음과 같은 작업을 구성 할 수 있습니다.

```javascript
// getData() 및 getOtherData()가 Promise를 반환한다고 가정합니다.
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // actionA가 끝나기를 기다립니다.
    commit('gotOtherData', await getOtherData())
  }
}

```
