# Computed

- 템플릿에 복잡한 로직을 넣지 않기 위해서
- 특정 계산의 결과값을 템플릿에 바인딩 한다.

### AS IS
```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

### TO BE
```html
<div id="example">
  <p>원본 메시지: "{{ message }}"</p>
  <p>뒤집히도록 계산된 메시지: "{{ reversedMessage }}"</p>
</div>
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: '안녕하세요'
  },
  computed: {
    // 계산된 getter
    reversedMessage: function () {
      // `this` 는 vm 인스턴스를 가리킵니다.
      return this.message.split('').reverse().join('')
    }
  }
})
```

- 물론 메소드 속성을 다음과 같이 정의해서 같은 기능을 구현할 수 있다.

```html
<p>뒤집힌 메시지: "{{ reverseMessage() }}"</p>
```
```javascript
// 컴포넌트 내부
methods: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

계산된 속성은 종속성에 따라 캐시된다. 계산된 속성은 종속성 중 일부가 변경된 경우에만 다시 계산 된다. 이것은 message가 변경되지 않는 한, 계산된 속성인 reversedMessage에 대한 다중 접근은 함수를 다시 수행할 필요 없이 이전에 계산된 결과를 즉시 반환한다는 것을 의미한다.

Computed는 Watch 기능도 가능하다.

일반적인 속성 감시 방법을 제공합니다. 다른 데이터 기반으로 변경할 필요가 있는 데이터가 있는 경우, 특히 AngularJS를 사용하던 경우 watch를 남용하는 경우가 있습니다. 하지만 watch 콜백보다 계산된 속성을 사용하는 것이 더 좋습니다. 다음 예제를 고려하십시오.

```HTML
<div id="demo">{{ fullName }}</div>
```
```JavaScript
var vm = new Vue({
 el: '#demo',
 data: {
   firstName: 'Foo',
   lastName: 'Bar',
   fullName: 'Foo Bar'
 },
 watch: {
   firstName: function (val) {
     this.fullName = val + ' ' + this.lastName
   },
   lastName: function (val) {
     this.fullName = this.firstName + ' ' + val
   }
 }
})
```

위의 코드는 반복이 필수적입니다. 계산된 속성을 사용하는 방식과 비교하십시오.
```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

### Computed는 기본적으로(내부적으로) 호출 시 getter가 실행되지만 setter도 정의할 수 있습니다.

```javascript
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```
