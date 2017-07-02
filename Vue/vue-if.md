# 조건부 렌더링

## 디렉티브
- v-if
```html
<h1 v-if="ok">Yes</h1>
```

- v-else : v-if 혹은 v-else-if 뒤에 위치
```html
<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>
```

- template : v-if 구문이 여러 얼레먼트에 적용되어야 할 때 사용합니다.
```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

- v-show : 엘리먼트를 조건부로 표시하기 위한 또 다른 옵션은 v-show 디렉티브입니다. 사용법은 거의 동일합니다.

차이점은 v-show가 있는 엘리먼트는 항상 렌더링 되고 DOM에 남아있다는 점입니다. v-show는 단순히 엘리먼트에 display CSS 속성을 토글합니다.

```html
<h1 v-show="ok">안녕하세요!</h1>
```

## key를 이용해서 재사용 가능한 엘리먼트 제어

Vue는 가능한 한 효율적으로 엘리먼트를 렌더링하려고 시도하며 종종 처음부터 렌더링을 하지않고 다시 사용합니다. Vue를 매우 빠르게 만드는데 도움이 되는 것 이외에 몇가지 유용한 이점이 있습니다. 예를 들어 사용자가 여러 로그인 유형을 전환할 수 있도록 허용하는 경우입니다.

```HTML
<template v-if="loginType === 'username'">
  <label>사용자 이름</label>
  <input placeholder="사용자 이름을 입력하세요">
</template>
<template v-else>
  <label>이메일</label>
  <input placeholder="이메일 주소를 입력하세요">
</template>
```

이것은 항상 바람직하지는 않습니다. 때문에 “이 두 엘리먼트는 완전히 별개이므로 다시 사용하지 마십시오.”라고 알리는 방법을 제공합니다. 유일한 값으로 key 속성을 추가하십시오.

```html
<template v-if="loginType === 'username'">
  <label>사용자 이름</label>
  <input placeholder="사용자 이름을 입력하세요" key="username-input">
</template>
<template v-else>
  <label>이메일</label>
  <input placeholder="이메일 주소를 입력하세요" key="email-input">
</template>
```
