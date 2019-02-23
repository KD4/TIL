MAVEN
====================================

메이븐은 Java 기반 프로젝트를 관리하기 위한 도구이며 빌드툴이다.

메이븐 자체는 플러그인 실행 프레임워크이다.

플러그인은 goal이라 불리는 작업들의 집합이다. 

메이븐은 기본적으로 실행할 여러 개의 goal을 묶어 life cycle phase를 만들고 실행한다.

각 life cycle은 논리적인 개념이다. 실제로는 바인딩된 플러그인의 goal이 실행된다.


Phase	| plugin:goal
---------|-----------------------------
process-resources	| resources:resources
compile	| compiler:compile
process-test-resources |	resources:testResources
test-compile	| compiler:testCompile
test	|surefire:test
package	|jar:jar
install	|install:install
deploy	|deploy:deploy


