# Docker ARG vs ENV

Dockerfile 내부에서 변수를 설정하는 키워드는 ENV와 ARG 두 가지가 있다.

변수를 설정하는 키워드로 비슷해보이는데 두 방식의 차이는 무엇일까?

중요 차이점은 이 키워드들로 설정된 변수들의 스코프에 있다.

ARG로 설정된 build arguments는 Dockerfile 내부에서 유효하다. 즉 빌드 시점에 유효하다. 때문에 Dockerfile을 빌드하는 build 시점에 --build-arg 옵션을 통해서 오버라이딩이 가능하다.

```bash
// dockerfile ARG 변수 오버라이딩
$ docker build --build-arg var_name=value
```

위에 언급된 것과 같이 빌드 시점에만 유효하기 때문에 실행중인 컨테이너 내부에서는 해당 변수를 접근할 수 없다.

반면에 ENV 변수들은 이미지 빌드 단계뿐만 아니라 이미지가 컨테이너로 실행중인 단계에서도 사용될 수 있다. 

ARG 변수는 도커 빌드시점, 컨테이너 실행 도중 사용되는 ENV 변수의 기본값을 설정하기 위해서 활용될 수 있다.
