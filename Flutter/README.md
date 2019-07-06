Flutter
===================================

Flutter is unique beccause,
one codebase compies to native arm code, meaning the marchine code for each platform.

Flutter는 하나의 코드로 만들어져서 iOS, Android, 웹 플랫폼에서 동장하는 프로그램을 만들어준다. 

Flutter는 React-native보다 빠르다고한다.
리액트 네이티브는 네티이브 콜을 위해서 중간 변환 과정 혹은 프록시 같은? 친구를 거치는데 이건 그럴 필요가 없다..!

어떻게 가능할까? Dart라는 언어로 작성하면 iOS, Android의 언어 즉 Swift나 Java 파일로 트랜스파일링해주는걸까?

아니다. 플러터는 직접 네티이브 코드가 되어 플랫폼과 통신한다. 자체 위젯을 가지고 바로 캔버스를 통해 UI를 그리고 이벤트를 받는다. 뿐만아니라 직접 플랫폼 시스템 콜이 가능하다. 

다른 플랫폼이 브릿지를 사용하는 것보다 훨씬 빠르다!

플러터를 왜 사용해야하는가?
- Javascript 브릿지 없는 리액티브 뷰
- 빠르고, 부드럽고, 예측가능한 AOT에서 Native 코드로 컴파일되는 언어
- 위젯과 레이아웃에 모든 접근이 가능
- 커스텀 가능한 위젯들
- 핫 리로드! 가능

* AOT
(Ahead-of-time compile)
원시코드를 목적코드를 거치지 않고 바로 기계어로 컴파일하는 방식


