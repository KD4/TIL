Dockerfile Best Practices 소개
================================

메이븐 기반 자바 프로젝트에서 사용할 수 있는 Dockerfile 튜닝 가이드이다.

## 빌드 시간 줄이기

개발 단계에서 도커 이미지가 빌드될 때, 즉 코드가 변경되면 재빌드된다. 이 점은 캐시 매커니즘에 큰 영향을 미친다. 캐싱은 필요하지 않는 작업을 빌드시점에 실행하지 않기 위해서 존재한다.

### Tip 1. 순서 중요성

각 빌드 스탭을 정의한 dockerfile 명령어의 순서는 중요하다. 이 순서에 따라서 캐시 적용 여부가 결정되기 때문이다. 변경될 부분이 가장 적은 라인들을 겹쳐서 캐시가 잘 먹게 만들어라. 라인들은 함께 캐싱된다.

### Tip 2. COPY 명령어는 명시적으로 필요한 파일만

필요한 것만 복사해라. 가능한 경우 COPY . 과 같이 특정 디렉토리 전체 복사하는 경우를 피하라. 다음과 같이 이 디렉토리에서 필요한 파일은 jar 파일이지만 다른 파일의 변경이 일어나도 이 캐싱이 영향을 받는다.

```dockerfile
FROM debian
RUN apt-get update
RUN apt-get -y install openjdk-8-jdk ssh vim
# ~COPY . /app~ 문제 있는 코드
COPY target/app.jar /app
# CMD ["java", "-jar", "/app/target/app.jar"] // 문제 있는 코드
CMD ["java", "-jar", "/app/app.jar"]
```

### Tip 3. apt-get update & install 과 같은 캐시 가능 유닛 확인

```dockerfile
FROM debian
# RUN apt-get update
# RUN apt-get -y install openjdk-8-jdk ssh vim
RUN apt-get update \
  && apt-get -y install \
    openjdk-8-jdk ssh vim
COPY target/app.jar /app
CMD ["java", "-jar", "/app/app.jar"]
```

RUN 명령어 한 줄은 캐시가 먹는 유닛이므로 한 라인에 너무 많은 명령을 넣는다기보다는 여러 줄로 나눠서 넣는게 좋습니다.


## 이미지 크기 줄이기

이미지 크기가 작을수록 배포 속도가 빨라지고 공격 받을 수 있는 영역이 줄어든다.

### Tip 4. 불필요한 의존성 제거

```dockerfile
FROM debian
RUN apt-get update \
  && apt-get -y install --no-install recommends \
  openjdk-8-kdk \
#   ssh vim
COPY target/app.jar /app
CMD ["java", "-jar", "/app/app.jar"]
```

불필요한 의존성을 제거하고 디버깅용 툴을 설치하지말자. 디버깅 툴은 필요할 때 설치해서 사용할 수 있다. apt와 같은 패키징 매니저들은 불필요한 의존성을 설치하지 않는 옵션을 제공한다. 

### Tip 5. 패키지 매니저 캐시 제거

```dockerfile
FROM debian
RUN apt-get update \
  && apt-get -y install --no-install-recommends \
  openjdk-8-jdk \
  && rm -rf /var/lib/apt/lists/*
COPY target/app.jar /app
CMD ["java", "-jar", "/app/app.jar"]
```

대부분의 패키징 매니저은 자체 사용 캐시를 관리한다. 이 캐시는 이미지 안에 들어가게 될테니 필요가 없다면 삭제하자.

## 유지보수성 올리기

### Tip 6. 공식 이미지를 사용하라
```dockerfile
# FROM debian
# RUN apt-get update \
#   && apt-get -y install --no-install-recommends \
#   openjdk-8-jdk \
#   && rm -rf /var/lib/apt/lists/*
FROM openjdk
COPY target/app.jar /app
CMD ["java", "-jar", "/app/app.jar"]
```

공식 이미지는 이미 검증된 이미지일 확률이 높다. 검증된 이미지란 위에 나열된 best practices가 적용되었다는 뜻이다. 가능하다면 공식 이미지를 활용하자.

### Tip 7. 태그를 명시해라

```dockerfile
# FROM openjdk:latest
FROM openjdk:8
COPY target/app.jar /app
CMD ["java", "-jar", "/app/app.jar"]
```

latest tag를 사용하지 말아라. 최신 버전의 도커 파일을 가져오기에는 편하지만 이때문에 어떻게 캐시가 관리될지 컨트롤할 수 없게된다. 

### Tip 8. 태그가 의미하는 환경을 확인하자

여러 공식 이미지들은 설치된 의존성이 각각 다른 태그들을 제공한다. slim은 debian 운영체제 기반이고 alpine은 Alpine Linux 기반이다. 

## 재현성
지금까지 위 dockerfile은 모두 이미 빌드된 jar 파일을 docker가 품은 상황을 가정했다. 이는 컨테이너가 제공하는 일관된 환경에서 동작한다는 것을 보장하지 못한다. Java 응용 프로그램이 특정 라이브러리에 종속되어 있는 경우 응용 프로그램이 빌드되는 환경에 영향을 받는다.

### Tip 9. 소스 빌드까지 담당

```dockerfile
FROM maven:3.6-jdk-8-alpine
WORKDIR /app
COPY pom.xml
COPY src ./src
RUN mvn -e -B package
CMD ["java", "-jar", "/app/app.jar"]
```

위와 같이 빌드에 필요한 의존성을 설치해서 직접 빌드하는 단계를 거칠 수 있습니다.

하지만 위 방식은 코드가 변경될 때마다 pom.xml에 설명된 모든 종속성을 가져와야만합니다.

### Tip 10. 종속성 가져오는 방식 튜닝

```dockerfile
FROM maven:3.6-jdk-8-alpine
WORKDIR /app
COPY pom.xml
RUN mvn -e -B dependency:resolve
COPY src ./src
RUN mvn -e -B package
CMD ["java", "-jar", "/app/app.jar"]
```

의존성을 캐싱하는 부분과 패키징을 하는 부분을 나눠버리면 pom.xml 변경사항마다 캐시 전체를 날리는 부분을 제거할 수 있습니다. 

하지만 이런식으로 진행됨에따라 우리 이미지는 런타임에 필요하지 않은 모든 빌드 타임 의존성을 포함하기 때문에 이전보다 커지게됩니다.

### Tip 11. 다단계 빌드를 사용하여 빌드 종속성 제거
```dockerfile
FROM maven:3.6-jdk-8-alpine AS builder
WORKDIR /app
COPY pom.xml
RUN mvn -e -B dependency:resolve
COPY src ./src
RUN mvn -e -B package
# CMD ["java", "-jar", "/app/app.jar"]

FROM openjdk:8-jre-alpine
COPY --from=builder /app/target/app.jar \
CMD ["java", "-jar", "/app.jar"]
```

다단계 빌드는 여러 FROM 문에서 인식할 수 있다. 각 FROM은 새로운 단계를 의마한다. AS 키워드로 이름을 짓고 나중에 참조할 수 있다. 

builder 캐싱되지만 마지막 결과물에는 jar만 남는다!

사이즈를 줄이고 캐싱도 효과적으로 사용할 수 있다.

