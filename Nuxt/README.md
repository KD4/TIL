Nuxt
==============================================

## Nuxt란 무엇인가?
Nuxt.js는 일반적인 Vue.js 어플리케이션을 만드는 프레임워크이다.

React 서버사이드 렌더링 프레임워크인 Next.js 프레임워크에서 착안한 Vue식 Next이다.

Nuxt의 목표는 Node.js 프로젝트의 보일러 플레이트를 제공하는 프레임워크를 만드는 것이다.

## Nuxt는 무엇으로 구성되었는가?

Nuxt.js는 Vue의 아래 기능을 기반으로 구동된다.

- Vue2
- Vue Router
- Vuex
- Vue Server Renderer
- vue-meta

이 밖에 vue-loader와 babel-loader를 사용하고 Webpack으로 번들링합니다.

## Nuxt 특징
- Vue 파일 쓰기
- 코드 분할 자동화
- 서버 사이드 렌더링
- 비동기 데이터 기반의 강력한 라우팅 시스템
- 정적 파일 전송
- ES6/7 지원
- JS & CSS 코드 번들링, 압축
- <head> 요소 관리
- CSS 전 처리기 지원

## Nuxt 디렉토리 구조

### Assets
assets 디렉토리는 LESS, SASS, Javascript 같은 컴파일 되지 않은 에셋들을 포함하는 디렉토리입니다.

### Components
components 디렉토리는 Vue.js 컴포넌트를 포함하는 디렉토리 입니다. Nuxt.js는 이러한 컴포넌트에 데이터 메소드를 크게 신경쓰지 않습니다.

### Layouts
layouts 디렉토리는 애플리케이션의 레이아웃을 포함하는 디렉토리입니다. 이 폴더 이름은 변경할 수 없습니다.

### Middleware
middleware 디렉토리는 애플리케이션의 미들웨어를 포함하는 디렉토리 입니다. 미들웨어는 페이지나 레이아웃이 렌더링되기 전에 실행할 사용자 정의 함수를 정의할 수 있습니다.

### Pages
pages 디렉토리는 애플리케이션의 뷰와 라우트를 포함하는 디렉토리 입니다. Nuxt.js는 모든 .vue 파일을 읽고 애플리케이션 라우터를 생성합니다.

### Plugins
plugins 디렉토리는 루트 vue.js 애플레키이션이 생성되기 전 실행하고 싶은 자바스크립트 플러그인을 포함하는 디렉토리 입니다.

### Static
static 디렉토리를 정적 파일들을 포함하는 디렉토리 입니다. 이 디렉토리의 파일들은 /에 연결됩니다.

### Store
store 디렉토리는 Vuex store 파일을 포함하는 디렉토리이다. Vuex Store 옵션은 Nuxt.js 프레임워크에 의해 실행되며 index.js 파일을 생성하면 프레임워크가 자동으로 옵션을 활성화합니다.
