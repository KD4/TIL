# 폼 입력 바인딩
v-model 디렉티브를 사용하여 폼 input과 textarea 엘리먼트에 양방향 데이터 바인딩을 생성할 수 있습니다. 입력 유형에 따라 엘리먼트를 업데이트 하는 올바른 방법을 자동으로 선택합니다.

## v-model
form 요소의 value 값이 model-{속성}에 바인딩 됩니다.

- input, textarea, checkbox, radiobox 등

## 수식어

- .lazy
기본적으로, v-model은 각 입력 이벤트 후 입력과 데이터를 동기화 합니다. (단 앞에서 설명한 IME 구성은 제외됩니다.) .lazy 수식어를 추가하여 change 이벤트 이후에 동기화 할 수 있습니다.
```html
<!-- "input" 대신 "change" 이후에 동기화 됩니다. -->
<input v-model.lazy="msg" >
```

- .number
사용자 입력이 자동으로 숫자로 형변환 되기를 원하면, v-model이 관리하는 input에 number 수식어를 추가하면 됩니다.
```html
<input v-model.number="age" type="number">
```
type="number"를 사용하는 경우에도 HTML 입력 엘리먼트의 값은 항상 문자열을 반환하기 때문에 이것은 종종 유용하게 사용할 수 있습니다.


- .trim
v-model이 관리하는 input을 자동으로 trim 하기 원하면, trim 수정자를 추가하면 됩니다.
```html
<input v-model.trim="msg">
```
