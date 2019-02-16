Flex
==============================

HTML 컨텐츠의 구조를 정의를 레이아웃이라고 한다.

레이아웃은 그동안 TABLE, POSITION, FLOAT 등이 있었는데 이 방법들은

1. 레이아웃 속성만 가지고는 문법적으로 해석하기 어렵다.
2. 복잡하고 유지보수가 어렵다.

라는 단점이 있었다.

Flex Layout은 이러한 단점을 개선하기 위해서 제안된 레이아웃 방식이다.

## Flex의 기본
Flex는 2단계 HTML 구조에서 사용될 수 있다.

```html
<container>
    <item></item>
    <item></item>
</container>
```

container라는 부모 요소에 display: flex 속성을 부여하면 하위 요소 컨텐츠 구조를 조정할 수 있다.
기본적인 속성으로는 direction이 있는데, 이 direction은 default 값이 row이다.

flex layout game: http://flexboxfroggy.com/#ko

flex 생활코딩 : https://opentutorials.org/course/2418/13526