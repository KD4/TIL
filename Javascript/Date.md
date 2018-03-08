Date
==========================

## Date.now vs new Date().getTime() vs +new Date

자바스크립트에서 현재 시각의  Epoch time을 생성하는 방법은 여러 가지가 있는데 대체로 +new Date 를 사용하는 방법이 가장 빠르다.
new Date().getTime()과 같이 Date Object 생성자를 호출하게 되면 그만큼 느리기때문에 현재 시간의 Epoch time만 알고싶다면 +new Date를 하는게 좋다...!
