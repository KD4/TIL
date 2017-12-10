Flux Standard Action
====================

## Introduction
사람이 읽기 쉬운 Flux 액션 객체 표준이다.

### Motivation
Flux Action 기반으로 작업하면 객체 형태로 그 객체가 하는 일을 추정할 수 있다. 예를 들어 모든 Flux Action 객체는 그 객체를 유일하게 식별할 수 있는 필드를 가져야한다. ('type', 'actionType', 'actionId') 또한, 많은 Flux 구현체들은 액션의 성공과 실패 여부를 알려주는 필드를 가지고 있다. 특히 데이터 가져오는 작업에 대해서는 이 필드는 아주 유용하다. 이러한 패턴에 대해 최소한의 공통 표준을 정의하면 유용한 도구와 추상화를 만들 수 있을 것이다.

### Errors as a first class concept
Flux 애션들은 비동기식 값 시퀀스로 생각할 수 있다. 에러를 다루는 작업은 비동기 흐름에서 매우 중요하다. 하지만 현재로써는 많은 Flux 구현체들이 에러 다루기가 미흡하다. 대신에 에러를 'LOAD_SUCCESS', 'LOAD_FAILURE' 형태처럼 서로 다른 액션으로 만들어서 관리한다. 이런식으로 구현하면 전체 액션 흐름에서 분기를 야기하며 에러 컨셉을 나타내는 방법이 두 가지로 생각되어질 수 있으므로 이상적이지 않다.

### Design goals

- **Human-friendly.** FSA 들은 사람이 읽기 쉽고 작성하기 쉬울 것 이다.
- **Useful**. FSA 들은 추상화를 통해서 여러가지 유틸 도구를 이용해서 생성할 수 있을 것이다.
- **Simple.** FSA 은 간단할 것이다. 직관적이고 유연성을 가질 수 있다.

### Example

기본적인 FSA 액션 예제:

```js
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  }
}
```

Promise 객체 스타일로 표현된 에러객체:

```js
{
  type: 'ADD_TODO',
  payload: new Error(),
  error: true
}
```

## Actions

하나의 액션은 반드시 아래를 포함해야한다.

- 순수 자바스크립트 객체여야한다.
- type 프로퍼티를 가져야한다.

아래는 선택사항이다.

- `error` 프로퍼티를 가진다.
- `payload` 프로퍼티를 가진다.
- `meta` 프로퍼티를 가진다.

그리고 FSA는 `type`, `payload`, `error` `meta` 이외에 다른 프로퍼티를 포함하지 않는다.

### `type`
액션의 `type`은 액션을 식별하는 식별자이다. `type`이 같은 action 객체는 동등성이 보장되어야 한다. ('==')

### `payload`
선택적인 `payload` 프로퍼티는 값의 타입이 될 것이다. 이 필드는 해당 액션의 추가적인 정보를 표현한다. type 혹은 status 정보가 아닌 정보는 이 `payload` 필드에 저장한다.

관습에 따라서, `error` 프로퍼티가 `true`라면, `payload` 프로퍼티는 error 객체가 될 것이다.

### `error`
에러 액션을 만들고 싶을 때 `error` 프로퍼티를 `true`로 설정하는게 좋다.
`error`가 true인 액션 객체는 실패한 promise 객체와 유사하다.

`error` 객체는 `true`뿐만아니라 `undefined` 혹은 `null`이 될 수 있다. 이때 에러로 취급되어서는 안된다.

### `meta`
 `meta` 프로퍼티는 `payload`로 취급되기에는 부족한 부가 정보를 담을 수 있다.

## Utility functions


npm을 통해서 설치할 수 있는 `flux-standard-action` 모듈은 몇 가지 유용한 유틸 함수를 제공한다.

### `isFSA(action)`

```js
import { isFSA } from 'flux-standard-action';
```

FSA 인지 확인한다.


### `isError(action)`

```js
import { isError } from 'flux-standard-action';
```
이 액션이 에러를 표현하는지 확인한다.

## Libraries

- [redux-actions](https://github.com/acdlite/redux-actions) - a set of helpers for creating and handling FSA actions in Redux.
- [redux-promise](https://github.com/acdlite/redux-promise) - Redux promise middleware that supports FSA actions.
- [redux-rx](https://github.com/acdlite/redux-rx) - RxJS utilities for Redux, including a middleware that supports FSA actions.
