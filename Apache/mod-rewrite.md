Apache rewrite module
================================================

아파치 mod-rewrite는 URL을 재가공하기 위한 모듈이다. 

## Rewrite 모듈 지시자

#### RewriteEngine
문법 : RewriteEngine On | Off

Rewriting 엔진을 사용할지 여부를 설정합니다.

#### RewriteLog
문법 : RewriteLog FILE-PATH

RewriteLog 지시자는 Rewrite 엔진의 로그를 기록할 파일을 지정합니다.

#### RewriteLogLevel
문법 : RewriteLogLevel LEVEL

RewriteLogLevel 지시자는 RewriteLog 지시자로 설정한 로그파일에 기록할 고르들에 대해 어떤 레벨에서 수행할 것인지 정합니다.

#### RewriteCond
문법 : RewirteCond TESTSTRING PATTERN

RewriteCond 지시자는 RewriteRule과 함께 사용되는 규칙으로 RewriteCond 다음에 오는 RewriteRule은 RewriteCOnd에서 설정한 패턴과 일치해야한다.

#### RewriteRule
문법 : RewriteRule Pattern Substitution

Rewrite 모듈의 실질적인 Rewrite 규칙들을 적용하는 지시자이다.

Pattern을 subtitution으로 변경하기 위한 모든 규칙들은 이 지시자를 사용해서 설정해야 한다.

Pattern(INPUT URL)에는 Perl 정규식을 사용할 수 있기 때문에 유연하게 적용할 수 있다.

#### Rewrite flag

- forbidden|F : 요청하는 페이지를 403 에러로 redirect
- gone|G : 요청하는 페이지를 410 에러로 redirect
- last|L : 이 플래그가 적용되면 뒤에 어떤 룰이 있더라도 이 룰 아래의 규칙들은 적용되지 않고 RewriteRule을 빠져나간다.
- chain|C : 이 플래그의 결과를 다음 RewirteRule의 Input 값으로 사용한다. 
- redirect|R : 302응답을 보내서 브라우저가 redirect 하도록 한다.
- proxy|P : 내부 프록시로 URL을 연결한다.



