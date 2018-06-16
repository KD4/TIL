Simple HTTP server
======================================

현재 네트워크에 있는 사용자들에게 현재 디렉터리에 있는 모든 파일(과 하위 디렉터리)를 위한 단순한 웹서버를 원한다면 다음을 사용하세요

```bash
$ python -m SimpleHTTPServer 7777 // 7777포트, Python 2
$ python -m http.server 7777 // 7777포트, Python 3
```
