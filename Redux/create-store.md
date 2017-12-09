# craeteStore

어플리케이션의 상태 트리를 가지고 있는 Redux Store를 만드는 메소드이다.
한 어플리케이션에는 1개의 Store만 가지는 것이 좋다.

## createStore(reducer, [preloadedState], [enhancer])
#### 아규먼트들
1. `reducer` *(Function)* : 현재 상태 트리와 상태들을 조작하기 위한 액션들을 반환하는 reducing function 이다.

2. `preloadedState` *(Any)* : 초기 상태. 상태값을 옵셔널로 관리해서 런타임 시점에 초기화하고 싶을 때 사용한다. 만약 `reducer`가 `combineReducers`라면, 초기화될 reducer와 같은 형태의 순수 객체여야한다. `reducer`가 아니면 어떤것이는 넣을 수 있다. 

3. `enhancer` *(Function)* : Store enhancer로써 미들웨어와 같은 Third-party 라이브러리를 store를 조작하고 향상시키기 위해서 명시하고 싶을 때 사용한다. 

#### 반환값
(`store`): 앱 상태값을 트리로 저장하고 있는 오브젝트를 반환한다. 이 상태를 변경할 수 있는 단 한 가지 방법은 Action을 Dispatching 시키는 것이다. 그래서 어플리케이션은 보유한 상태값 업데이트 이벤트를 구독하고 있어야한다.


#### 예제
```js
import { createStore } from 'redux'

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

let store = createStore(todos, ['Use Redux'])

store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})

console.log(store.getState())
// [ 'Use Redux', 'Read the docs' ]
```

#### Tips
- 한 어플리케이션 안에서 두 개 이상의 스토어를 만들지 말고 `combineReducers`를 이용해서 한 싱글 리듀서를 많이 넣어라
- 