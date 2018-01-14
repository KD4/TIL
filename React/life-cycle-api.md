LifeCycle API
========================

컴포넌트가 돔 위에 생성되기 전과 후, 데이터가 변경되어 상태가 변경되기 전과 후, 마지막으로 돔에서 컴포넌트가 사라지기 전에 실행되는 메소드.

### constructor
```javascript
constructor(props) {
    super(props);
    console.log("super 메소드를 먼저 실행해주자.")
}
```

- 컴포넌트가 처음 만들어질 때 실행된다. 기본 state를 설정할 수 있다.

### componentWillMount 
```javascript
componentWillMount() {
    console.log("component will mount");
}
```

- 컴포넌트가 DOM 위에 만들어지기 전에 실행된다.
- 그러므로 여기서는 DOM 처리를 할 수 없다.

### componentDidMount
```javascript
componentDidMount() {
    console.log("componentDidMount");
}
```

- 첫 렌더링을 마치고 실행된다. 이 안에서 다른 동기성이 필요한 작업을 진행하고 DOM 처리를 한다.

### componentWillReceiveProps
```javascript
componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
}
```

- props를 받을 때 실행된다.
- props에 따라서 state를 업데이트할 때 사용하면 유용하다.
- 이 안에서 setState를 사용할 수 있다.

### shouldComponentUpdate
```javascript
shouldComponentUpdate(nextProps, nextState) {
    return true;
}
```

- props/state가 변경되었을 때 리렌더링을 할지말지 정한다.
- 실제로 사용 할 때는 필요한 비교를 하고 값을 반환해야한다.
- 예. return nextProps.id !== this.props.id
- JSON.stringify를 사용하여 여러 field를 편하게 비교하면된다.

### componentWillUpdate
```javascript
componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate:" JSON.stringify(nextProps) + " " + " JSON.stringify(nextState));
}
```

- 컴포넌트가 업데이트되기 전에 실행된다.
- 여기서는 setState를 절대 사용하지 말자. 그러면 무한루프가 된다.

### componentDidUpdate
```javascript
componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate:" JSON.stringify(prevProps) + " " + " JSON.stringify(prevState));
}
```

- 컴포넌트가 리렌더링을 마친 후 실행된다. 여기서도 setState를 사용할 수 없다.

### compoentWillUnmount
```javascript
compoentWillUnmount() {
    console.log("compoentWillUnmount");
}
```

- 컴포넌트가 DOM에서 사라진 후 실행된다.
