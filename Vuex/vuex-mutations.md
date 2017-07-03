# Mutations
변이 : Store의 상태를 업데이트하는 방법

각 Mutation의 식별자인 Type과 이 Mutation이 사용하는 파라미터들, Payload가 있습니다.

```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 상태 변이
      state.count++
    }
  }
})
```

변이 핸들러를 직접 호출 할 수는 없습니다. 이 옵션은 이벤트 등록과 비슷합니다. "타입이 increment인 변이가 발생하면이 핸들러를 호출합니다." 변이 핸들러를 호출하려면 해당 타입과 함께 store.commit 을 호출해야합니다.
```javascript
store.commit('increment')
```

## Mutation에 Payload를 얹는 방법

```javascript
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})
```

## 변이를 커밋하는 다른 방법

변이를 커밋하는 또 다른 방법은 type 속성을 가진 객체를 직접 사용하는 것입니다.

```javascript
store.commit({
  type: 'increment',
  amount: 10
})
```
객체 스타일 커밋을 사용할 때 전체 객체는 변이 핸들러에 페이로드로 전달되므로 핸들러는 동일하게 유지됩니다.
```javascript
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

## 변이 타입에 상수 사용

다양한 Flux 구현에서 변이 유형에 상수를 사용하는 것은 일반인 패턴입니다. 이를 통해 코드는 linter와 같은 툴링을 활용할 수 있으며 모든 상수를 단일 파일에 저장하면 공동 작업자가 전체 애플리케이션에서 어떤 변이가 가능한지 한눈에 파악할 수 있습니다.

```JavScript
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // ES2015에서 계산 된 프로퍼티 이름 기능을 사용하여
    // 상수를 함수 이름으로 사용할 수 있습니다
    [SOME_MUTATION] (state) {
      // 변이 상태
    }
  }
})
```
상수를 사용할지 여부는 대부분 환경 설정입니다. 개발자가 많은 대규모 프로젝트에서 유용할 수 있지만, 이는 완전히 선택 사항입니다.

변이는 무조건 동기적이어야 합니다.

기억 해야할 한 가지 중요한 규칙은 변이 핸들러 함수는 동기적 이어야 한다는 것입니다. 왜 그럴까요? 다음 예제를 확인해보십시오.
```JavScript
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```
이제 우리가 앱을 디버깅하고 devtool의 돌연변이 로그를 보고 있다고 상상해보십시오. 기록 된 모든 변이에 대해 devtool은 상태의 "이전" 및 "이후" 스냅 샷을 캡처 해야 합니다. 그러나 위의 예제 변이 내의 비동기 콜백은 불가능합니다. 변이가 커밋 되었을 때 콜백은 아직 호출되지 않으며, 콜백이 실제로 호출 될 시기를 devtool이 알 수 있는 방법이 없습니다. 콜백에서 수행 된 모든 상태 변이는 본질적으로 추적 할 수 없습니다!

컴포넌트 안에서 변이 커밋하기

this.$store.commit('xxx')를 사용하여 컴포넌트에서 변이를 수행하거나 컴포넌트 메소드를 store.commit 호출에 매핑하는 mapMutations 헬퍼를 사용할 수 있습니다 (루트 store 주입 필요)

```JavScript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment' // this.increment()를 this.$store.commit('increment')에 매핑합니다.
    ]),
    ...mapMutations({
      add: 'increment' // this.add()를 this.$store.commit('increment')에 매핑합니다.
    })
  }
}
```
액션에서 사용

비동기성이 상태의 변이와 결합하면 프로그램을 파악하기가 매우 어려워 질 수 있습니다. 예를 들어 상태를 변경하는 두 가지 비동기 콜백 메소드를 호출할 때 호출되는 시점과 먼저 호출 된 콜백을 어떻게 알 수 있습니까? 이것이 우리가 두 개념을 분리하려는 이유입니다. Vuex에서 변이는 동기적으로 트랜잭션합니다.
```JavScript
store.commit('increment')
// "increment" 변이가 일으킬 수 있는 모든 상태 변화는 이 순간에 이루어져야합니다.
```
