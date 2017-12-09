# JSX
- Javascript 코드에서 HTML 형식을 그대로 작성할 수 있는 문법. babel을 이용해서 컴파일할 수 있음.

## JSX 규칙
- JSX는 HTML처럼 생겼지만 문법은 다르다. 몇몇 규칙을 잘 알아두어야한다.

### Container Element
- 모든 JSX 코드는 Container Element 안에 포함되어야 한다. (블록 요소)

아래는 React Component의 render 메서드이다.

```Javascript
// 에러, h1는 인라인 요소이므로 에러가 난다.
class errorApp extends React.Component {
    render() {
        return (
        '<h1>나는 제목이다.</h1>'
    )}
}

// 에러, h1는 인라인 요소이므로 에러가 난다.
class myApp extends React.Component {
    render() {
        return (
        '<div>나는 제목이다.</div>'
    )}
}
```

### Javascript 코드
- JSX 안에서 자바스크립트 코드를 넣을 때는 Bracket으로 rapping한다.

```Javascript
class Codepen extends React.Component {

  render() {
    let hi = 'hi, my name is kd. nice to meet you.';

    return (<div> {hi} </div>);
  }
}
```

### Style 코드
- JSX 안에서 스타일을 설정할 때는 String 형식으로하는게 아니라 key가 camelCase인 객체를 사용한다.

```javascript
class Codepen extends React.Component {

  render() {
    let style = {
        // background-color 가 아니다!!
        backgroundColor : "aqua",
    };

    return (<div style={style}> 아쿠아맨~ </div>);
  }
}
```

### Class 이름 설정
- 클래스 이름을 설정할 때는 className을 사용한다.
```javascript
class Codepen extends React.Component {

  render() {

    return (<div className={'box'}> 아쿠아맨~ </div>);
  }
}
```

### 주석
- JSX 안에서 주석을 작성할 때는 "{/\* 나는 주석이다. \*/}" 형태를 사용한다.
