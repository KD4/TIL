Props And State
===========================

## props
- 컴포넌트 내부의 Immutable Data

- JSX 내부에 { this.props.propsName }

- 컴포넌트를 사용 할 때, < > 괄호 안에 propsName="value"

- this.props.children 은 기본적으로 갖고있는 props로서, <Cpnt>여기에 있는 값이 들어간다.</Cpnt>

```javascript
class Cmt extends React.Component {
  render() {
    return (
      <div>
        <h1> Hello {this.props.name}</h1>
        <div>{this.props.children}</div>
       </div>
    );
  }
}

class App extends React.Component {
  render() {
   return (
     <Cmt name={this.props.name}>
      {this.props.children}
     </Cmt>
   );
  }
}

ReactDOM.render(
  <App name="kd">Hello!!!!</App>,
  document.getElementById('root')
);
```

이 컴포넌트의 props 기본값을 설정할 수 있다.

```javascript
class App extends React.Component {
    render() {
        return (
            <div>{this.props.value}</div>
        );
    }
};

App.defaultProps = {
    value: 0
};
```


## states
- 컴포넌트 내부의 유동적인 데이터

- 사용할 떄는 JSX 내부에 { this.state.stateName }로 쓸 수 있다.

- 초기값 설정이 필수, 생성자(constructor) 에서 this.state = { } 으로 설정

- 값을 수정 할 때에는 this.setState({ val: 'new_val' }), 렌더링 된 다음엔 this.state = 절대 사용하지 말것
    - 렌더링 이후 this.state로 상태를 변경해도 뷰가 렌더링되지않는다. 상태가 변경될 때마다 뷰를 다시 렌더링하는 리액트 특성을 살리지못한다.


```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 }
// handleClick 내부에서 사용될 this를 바인딩해줘야한다. 함수 내부에 this가 있으면 어떤 컨텍스트가 바인딩될지 꼭 확인해보자 !
    this.handleClick= this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({value: this.state.value+1})
  }

  render() {
    return(
      <div>
        <h4>Value: {this.state.value}</h4>
        <button onClick={this.handleClick}>TICK</button>
      </div>
      );
  }  
}

class App extends React.Component {
  render() {
    return (
      <Counter/>
    );
  }
};

ReactDOM.render(
  <App></App>,
  document.getElementById("root")
);
```
