# compose(...functions)

compose 함수는 오른쪽에서 왼쪽으로 조합합니다.

이 함수는 유틸리티성 함수로써 Redux에 편의를 위해 포함되어 있습니다.

여러 store enhancer를 사용하고 싶다면 이 함수를 사용할 수 있습니다.

### 인수
1. arguments: 조합할 함수들입니다. 각각의 함수들이 실행되면서 왼쪽 함수의 반환값을 인자로 받습니다. 마지막 함수를 제외한 모든 인자 함수는 하나의 인자만 받아야합니다.

### 반환
function: 오른쪽에서 왼쪽으로 조합된 최종 함수를 반환합니다.

### 예시
```javascript
// 이 예시는 compose를 사용해 스토어를 applyMiddleware와 redux-devtools 패키지의 몇몇 개발툴로 강화하는 방법을 보여줍니다.

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import DevTools from './containers/DevTools'
import reducer from '../reducers/index'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    DevTools.instrument()
  )
)
```
