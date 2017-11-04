# gulp

- Gulp는 프론트 엔드 개발에서 빌드 흐름을 제어해줄 수 있는 Javascript 기반의 OpenSource 이다.
- Gulp task runner는 Node.js와 npm을 이용해서 빌드되며 minification, unit testing, polyfill, lint 적용과 같은 반복적인 작업을 자동화할 목적으로 사용된다.

### gulp 설치하기
gulp는 npm을 이용해서 설치한다.

npm 모듈이 설치되어 있다면 gulp를 설치할 수 있다.


### npm project 만들기
gulp 관련 플러그인과 gulp 대상 node project 는 npm 을 이용해서 관리될 것이다. 아래와 같이 npm 프로젝트를 시작하자.

```
$ npm init
```


```
$ npm install gulp --save-dev
```

위 명령어로 프로젝트를 만들고 gulp를 설치하면 이제 생성된 프로젝트 구조를 살펴 볼 차례이다.
처음 생성된 프로젝트 폴더 구조를 아래와 같이 변경해보자.

```
node_modules/
public/
	src/
		index.html
		img/
		js/
		scss/
	dist/
		index.html
		img/
		js/
		css/
gulpfile.js
package.json
```

public의 src 디렉토리 아래가 실제 작업할 내용들이고 gulp에 의해서 빌드가 완료된 작업물들은 dist에 담기게된다.

gulp 관련 task는 gulpfile.js에서 관리되어진다.

### gulpfile 정의하기

gulpfile.js 예제이다.

```javascript
var gulp = require('gulp')

gulp.task('hello', () => {
    console.log('hello');
});
```

프로젝트 루트에서 gulp hello 를 커맨드라인으로 입력하면 hello가 출력될 것이다.

gulp.task로 정의된 작업들을 실행해주는게 gulp가 하는 역할이다. gulp의 네 가지 주요 API만 간단히 살펴보자.

#### gulp.task
gulp.task(name, deps, fn)는 gulp가 처리할 task를 정의하는 API이다.

name은 작업의 이름. deps는 이 작업이 수행되기 전에 실행될 작업 리스트, fu 은 실제로 수행될 작업들을 정의합니다.

#### gulp.src

gulp.src(globs[, options]) 는 어떤 파일을 읽을지 정합니다.

인수 glob 은 string 형태나 array 형태입니다. 와일드 카드를 이용해서 '\*\*\/\*.js' 식으로 지정할 수 있습니다.

이 함수가 리턴한 객체에서는 .pipe 를 통하여 다른 플러그인을 사용해 변환 할 수 있습니다.

#### gulp.dest
gulp.dest(path[, options]) 는 어디에 저장할지 정합니다.
path 는 디렉토리를 입력합니다.

#### gulp.watch
gulp.watch(glob[, opts], tasks/cb) 는 전달된 glob에 해당하는 파일들을 주시하고있다가, 변동이 있을 시 tasks를 실행합니다.

#### gulp.pipe
gulp.pipe(fun)는 pipe의 결과물을 fun에 넘겨줄 수 있다. 이 fun의 결과물도 pipe이므로 이 기능을 이용해서 연속적인 스트림 처리가 가능하다.


위 API를 토대로 만든 실제 gulpfile.js이다.

```Javascript
gulp.src('public/src/js/*.js')
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.desc('public/disc/js'))
```

위 작업은 'public/src/js' 아래 모든 js 파일들은 가져와서 uglify 작업을 수행하고, concat 플러그인을 이용해서 all.js로 합쳐준다.

그리고 gulp.desc API를 이용해서 특정 디렉토리로 옮겨주는 간단한 작업이다.

### 결론
npm + gulp 을 이용하면 프로젝트에서 사용하는 여러가지 플러그인을 관리하고 이 플러그인을 사용하는 작업들을 자동화할 수 있다.
