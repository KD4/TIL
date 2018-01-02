Focusable
=========================

focusable이란 HTML요소에서 tab으로 선택할 수 있는 요소를 말한다.
즉 시각장애인들 리더기에는 읽히는 요소를 말한다.

```html
<a id='non-focusable-tag'></a>

<a href="#" id="focusable-tag"></a>
```

`non-focusable-tag`는 Clickable한 요소이지만 Focusable 한 요소는 아니다. 반면 `focusable-tag`는 focusable한 요소이다.

`a tag`에서 focusable한 속성을 가지기 위해서는 href 속성을 가져야한다.

그러기 위해서 위와 같이 `#`을 줄 수 있지만 이렇게 되면 클릭할 때마다 페이지 맨 위로 이동하거나 해당 id 요소로 스크롤이 이동하게된다.

href 속성을 부여하면서 아무일도 안 일어나도록 설정하는 방법이 있다.

```html
<a href="javascript:void(0);"></a>
```

위와 같은 코드에서 a tag를 클릭하게 되면 href 안에 JS 코드가 실행된다.

JS code는 undefined를 반환하는 코드이므로 아무런 동작을 하지 않게된다.

그러므로 focusable한 요소이면서 href는 아무런 동작을 원하지 않을 때 위와같은 코드를 작성할 수 있다.

++
javscript:void(0)는 javscript:;로 사용될 수 있다. 둘다 undefined를 반환하니까...!
