# Store : Vuex에서 애플리케이션의 상태를 보유하는 컨테이너

전역객체와 다른점.

- Vuex store는 반응형 입니다. Vue 컴포넌트는 상태를 검색할 때 저장소의 상태가 변경되면 효율적으로 대응하고 업데이트합니다.
- 저장소의 상태를 직접 변경할 수 없습니다. 저장소의 상태를 변경하는 유일한 방법은 명시적인 커밋을 이용한 변이 입니다.

## 단일 상태 트리
Vuex는 단일 상태 트리 를 사용합니다. 즉, 이 단일 객체는 모든 애플리케이션 수준의 상태를 포함하며 "원본 소스" 역할을 합니다. 이는 각 애플리케이션마다 하나의 저장소만 갖게 된다는 것을 의미합니다. 단일 상태 트리를 사용하면 특정 상태를 쉽게 찾을 수 있으므로 디버깅을 위해 현재 앱 상태의 스냅 샷을 쉽게 가져올 수 있습니다.

## 상태 컨테이너의 상태 값을 Vue 컴포넌트가 가져오는 방법


### Computed를 이용한 단순한 방법

```javascript
// Counter 컴포넌트를 만듭니다
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```

store.state.count가 변경되면 계산된 속성이 다시 변경되고 관련 DOM 업데이트가 트리거됩니다.

문제점 :

그러나 이 패턴은 컴포넌트가 전역 저장소 단독 항목에 의존하게합니다. 모듈 시스템을 사용할 때는 저장소 상태를 사용하는 모든 컴포넌트에서 저장소를 가져와야하며 컴포넌트를 테스트 할 때는 가짜데이터가 필요합니다.

## Vue 루트에 Store를 주입하기

```javascript
const app = new Vue({
  el: '#app',
  // "store" 옵션을 사용하여 저장소를 제공하십시오.
  // 그러면 모든 하위 컴포넌트에 저장소 인스턴스가 삽입됩니다.
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

루트 인스턴스에 store 옵션을 제공함으로써 저장소는 루트의 모든 하위 컴포넌트에 주입되고 this.$store로 사용할 수 있습니다. Counter 구현을 수정해야 합니다.
```javascript
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```


## 입력을 줄이기 위해서 mapState 헬퍼 사용하기

컴포넌트가 여러 저장소 상태 속성이나 getter를 사용해야하는 경우 계산된 속성을 모두 선언하면 반복적이고 장황해집니다. 이를 처리하기 위해 우리는 계산된 getter 함수를 생성하는 mapState 헬퍼를 사용하여 키 입력을 줄일 수 있습니다.

```javascript
// 독립 실행 형 빌드에서 헬퍼가 Vuex.mapState로 노출됩니다.

import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 화살표 함수는 코드를 매우 간결하게 만들어 줍니다!
    count: state => state.count,

    // 문자열 값 'count'를 전달하는 것은 `state => state.count`와 같습니다.
    countAlias: 'count',

    // `this`를 사용하여 로컬 상태에 액세스하려면 일반적인 함수를 사용해야합니다
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```
또한 매핑 된 계산된 속성의 이름이 상태 하위 트리 이름과 같을 때 문자열 배열을 mapState에 전달할 수 있습니다.

```javascript
computed: mapState([
  // this.count를 store.state.count에 매핑 합니다.
  'count'
])
```
객체 전파 연산자

mapState는 객체를 반환합니다. 다른 로컬 영역의 계산된 속성과 함께 사용하려면 어떻게 해야 하나요? 일반적으로, 최종 객체를 computed에 전달할 수 있도록 여러 객체를 하나로 병합하는 유틸리티를 사용해야합니다. 그러나 (3 단계 ECMAScript 스펙) 객체 확산 연산자을 사용하면 문법을 매우 단순화 할 수 있습니다.
```javascript
computed: {
  localComputed () { /* ... */ },
  // 이것을 객체 전파 연산자를 사용하여 외부 객체에 추가 하십시오.
  ...mapState({
    // ...
  })
}
```
