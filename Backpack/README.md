Backpack
===================================

```
Node 기반 프로젝트에서 사용된 빌드 시스템인 backpack에 대해서 알아보자.
```

Backpack 처음 들었다. 백팩은 무엇인가? 한국어 자료가 일단 많지 않다. github 페이지에 소개된 내용은 백팩은 Node JS를 위한 최소화된 빌드 시스템이란 것이다.
CRA(create-react-app)와 Next.js에 영감을 받았다고 적혀있어서 그런지 전체적으로 CRA와 뭐가다르지? 하는 느낌이 든다.

일단 백팩을 사용하면 모던 node APP을 만들고 서비스할 수 있도록 보일러 플레이트를 제공한다. 이 보일러 플레이트는 file-watching, live-reloading, traspiling, bundling 기능을 제공하며 백팩을 사용하면 이것들을 위한 설정을 할 필요가 없다. 물론 세세한 내용은 커스터마이징이 가능하다. 

백팩 빌드 시스템은 기본적으로 아래와 같은 기술들을 사용할 수 있게 도와준다.

- 최신 ES6 문법
- 읽기 쉬운 에러 메시지(공홈에서는 SUPER friendly 라고 표현함, 이게 핵심 기능이라고 생각하는듯...?)
- 실시간 리로드
- zero-config, 하나의 의존성만 가지고 설정할 필요가 없다.
- webpack 2 설정 파일을 기반으로 확장할 수 있다.

하지만 리액트 앱을 사용한다면 CRA 사용하는걸 권장한다... 

## 사용법

```bash
$ npm i backpack-core --save
```

위 명령어를 실행하고 package.json npm 스크립트에 아래와 같은 구문을 추가한다.

```javascript
{
  "scripts": {
    "dev": "backpack"
  }
}
```

그리고 아래와 같이 엔트리 파일이 설정되어 있어야한다.
```
src/index.js: the entry of your app.
```

이게 끝이란다~ (거짓말)

일단 믿고 시작해보자. development를 시작하려면 
```
npm run dev
```
하면서 npm 스크립트를 시작한다.


## Custom configuration
역시 거짓말이다. 순정만 사용할리가... 설정을 건드려보자.

- backpack.config.js 파일

```javascript
module.exports = {
  /* config options here */
};
```

### Customizing webpack config
웹팩 확장해보자.

```javascript
// backpack.config.js
module.exports = {
  webpack: (config, options, webpack) => {
    // Perform customizations to config
    // Important: return the modified config
    return config;
  },
};
```
