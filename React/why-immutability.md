왜 불변객체를 사용해야하는가
=================================

일반적으로 데이터를 변경하는 방법은 두 가지이다.

첫 번째는 데이터 객체의 속성값을 직접 변경하는 것이고

두 번째는 새로운 복사본의 데이터를 변경하는 것이다. 

### Data Change with Mutation
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}
```

### Data Change without Mutation
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax proposal, you can write:
// var newPlayer = {...player, score: 2};
```

결과 값은 두 방식 모두 같다. 하지만 Mutation 없이 데이터를 변경하면 아래와 같은 장점이 있다.

## 복잡한 기능 단순화
불변셩은 복잡한 기능을 보다 쉽게 구현할 수 있게 도와준다. 
이후 튜토리얼에서 우리는 time travel을 구현할 것이다. 'jump back' 기능은은 tic-tac-toe 게임을 턴을 무르는 기능이다. 
undo와 redo와 같은 기능은 애플리케이션에서 일반적으로 제공하는 기능이다. 데이터를 직접적으로 변경하지 않았기 때문에 우리는 이전 버전의 게임 히스토리를 가지고 있었다. 그리고 이것을 나중에 사용할 수 있게되었다. 

## 변화 감지
mutable한 객체에서는 객체 자체가 변경되기 때문에 변화를 감지하는 것은 어렵다. 

변화를 감지하는 기능은 이전 상태와 비교를 위해서나 전체 변화를 탐색하기 위해서 필요하다.

불변성 객체가 이전 객체 상태에 대한 참조를 가지고 있으면 변화 감지는 보다 쉽게 구현할 수 있다. 

## React에서 Re-render 시점 결정

불변성의 가장 중요한 강점은 React에서 Pure component만 사용할 수 있다는 것이다. 불변 데이터는 데이터가 변경되었는지 감지하여 보다 쉽게 view를 다시 그릴 것인지 파악할 수 있다.

이 부분에 대해서는 shoudComponentUpdate() 메소드를 공부하면서 더 확인할 수 있다.