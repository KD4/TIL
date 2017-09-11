# HTTP Request의 credentials 프로퍼티
credentials은 Request 객체의 읽기 전용 프로퍼티다. 이 프로퍼티는 user agent가 크로스 도메인 서버에 cookie들을 비롯한 인증 값들을 보낼지 결정한다.

아래 세 가지 옵션이 있다.

- omit : 쿠키를 보내지 않는다.
- same-origin : 같은 CORS 정책 내에서만 credentials 값들을 보낸다.
- include : 다른 도메인으로 요청을 보내더라도 credentials을 함께 보낸다.

### 브라우저 호환
IE, Safari 지원하지 않음..

Firefox 34+ 지원

Chrome 41+ 지원

Edge 지원
