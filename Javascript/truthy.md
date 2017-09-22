# Truthy

자바스크립트에서 truthy 속성은 논리적 연산에서 true로 평가(형변환)될 수 있는 속성을 뜻합니다.

falsy로 형변환되지 않는 모든 값들은 사실 truthy합니다.

다음은 if 블락에서 true로 형변환되는 예제들입니다.

```Javascript

if (true)
if ({})
if ([])
if (42)
if ("foo")
if (new Date())
if (-42)
if (3.14)
if (-3.14)
if (Infinity)
if (-Infinity)

```
