# Post 요청 시 Body 사이즈 제한

톰캣은 Post 요청 시 Body 사이즈를 제한하는 옵션을 두고 있다. default 값은 2MB이다.

이 옵션 값을 아래와 같이 0 혹은 음수를 지정하면 제한을 풀 수 있다.

```xml
<Connector  connectionTimeout="20000"
       port="8080"
       protocol="HTTP/1.1"
       redirectPort="8443"
       maxHttpHeaderSize="8192"
       maxThreads="150"
       minSpareThreads="25"
       enableLookups="false"
       acceptCount="100"
       disableUploadTimeout="true"
       maxPostSize="0"
       URIEncoding="UTF-8"/>
```

만약 Apache + tomcat 환경을 사용한다면 AJP 연결 설정 부분에서도 maxPostSize 옵션을 설정해야한다.

```xml
<Connector port="8009"
	protocol="AJP/1.3"
	redirectPort="8443"
	maxPostSize="0" />
```
