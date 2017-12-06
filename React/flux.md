# Flux

## 소개
Flux는 React를 사용해서 애플리케이션을 만들 때, 여러 React 컴포넌트들이 서로 유기적으로 상태를 변경시키는 상황에서 생길 수 있는 예상치 못한 영향을 컨트롤하기 위한, 즉 데이터를 취급하기 위한 패턴이다.

## 기존 문제점
Facebook이 찾은 근본적인 문제점은 데이터가 애플리케이션을 흐르는 방법에 있었다.

이전에는 데이터를 가지고 있는 모델(model)이 렌더링(rendering)을 하기 위해 뷰 레이어로 데이터를 보냈다.
그리고 뷰 레이어에서 사용자가 이벤트를 발생시키면 모델의 데이터를 변경시켰다. 이런식으로 데이터는 뷰와 모델에 있으면서 서로 변경되었고, 같은 데이터를 여러 모델과 여러 뷰가 참조하고 있으면 이 데이터를 업데이트하는 로직이 무척 복잡해졌다.

## 해결책
그래서 Facebook은 다른 종류의 아키텍처를 시도하기로 결정했다. 이 구조에서 데이터는 단방향으로만 흐르고, 새로운 데이터를 넣으면 처음부터 흐름이 다시 시작된다.

아래는 Flux의 데이터 흐름이다.

[ACTION] => [DISPATCHER] => [STORE] => [VIEW]
[ACTION]<============================= [VIEW]

ACTION, DISPATCHER, STORE, VIEW라는 생소한 개념들이 있다.

ACTION은 VIEW에서 이벤트가 일어났을 때 수행되어야할 행위를 명세한 객체이다. 이 객체를 DISPATCHER가 받는다. DISPATCHER는 ACTION 객체를 받아서 type을 확인하고 이 type을 처리할 수 있는 STORE를 호출하면서 ACTION 을 넘긴다. ACTION 객체를 넘겨받은 STORE는 ACTION 객체에 이벤트 정보를 이용해서 상태를 바꾼다. STORE의 상태가 바뀌기만을 쳐다보고있던 VIEW는 바뀌는 순간 STORE의 데이터 값을 이용해서 VIEW를 다시 그린다.

이런 단방향 흐름으로 리액트앱은 여러 상태를 일관성있게 관리할 수 있다.