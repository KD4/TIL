# HTTP Options method

HTTP OPTIONS는 해당 리소스에 접근 가능한 HTTP Method 목록을 확인하기 위해서 사용한다.

다음과 같은 특징을 갖는다.
- Body가 필요없다.
- 성공 응답값에는 Body가 있다.
- safe하며 멱등성을 가진다.
- 캐시는 타지않는다.
- HTML forms을 허용하지 않는다.

## 문법
```HTML
OPTIONS /index.html HTTP/1.1
OPTIONS * HTTP/1.1
```

## 예제
```bash
$ curl -X OPTIONS http://example.org -i
```

응답값은 허용하는 메소드 목록을 Allow 헤더에 포함한다.
```
HTTP/1.1 200 OK
Allow: OPTIONS, GET, HEAD, POST
Cache-Control: max-age=604800
Date: Thu, 13 Oct 2016 11:45:00 GMT
Expires: Thu, 20 Oct 2016 11:45:00 GMT
Server: EOS (lax004/2813)
x-ec-custom-error: 1
Content-Length: 0
```

### CORS에서 preflighted 요청
CORS 환경에서 본 요청을 날리기 전에 해당 서버가 본 요청을 받을 수 있는지 확인하는 용도로 OPTIONS를 미리 날린다.
Access-Control-Request-Method 헤더를 통해서 CROS가 열려있는지 확인한다.
