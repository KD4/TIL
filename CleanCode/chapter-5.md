5장-형식 맞추기
===================================================

프로그래머라면 형식을 깔끔하게 맞춰 코드를 짜야 한다. 코드 형식을 맞추기 위한 간단한 규칙을 정하고 그 규칙을 착실히 따라야 한다. 팀으로 일한다면 팀이 합의해 규칙을 정하고 모두가 그 규칙을 따라야 한다. 필요하다면 규칙을 자동으로 적용해주는 도구를 활용한다.

### 적절한 행 길이를 유지하라
세로 길이는 어느 정도가 적당할까? 대부분의 오픈 소스 프로젝트는 500줄을 넘지 않고 대부분 200줄 정도인 파일로 구축되어 있다. 짧을수록 좋다!

### 신문 기사처럼 작성하라
소스 파일 첫 부분은 고차원 개념과 알고리즘을 설명한다. 아래로 내려갈수록 의도를 세세하게 묘사한다. 마지막에는 가장 저차원 함수와 세부 내역이 나온다.

### 개념은 빈 행으로 분리하라
거의 모든 코드는 왼쪽에서 오른쪽으로 그리고 위에서 아래로 읽힌다. 각 행은 수식이나 절을 나타내고, 일련의 행 묶음은 완결된 생각 하나를 표현한다. 생각 사이는 빈 행을 넣어 분리해야 마땅하다.

```Java
package fitnesse.wikitext.widgets;
import java.util.reges.*;
public class BlodWidget extends Parent {
  ...
}
```

위 코드보다는 아래처럼~ 행을 이용해서 개념을 나누자.

```Java
package fitnesse.wikitext.widgets;

import java.util.reges.*;

public class BlodWidget extends Parent {
  ...
}
```


### 세로 밀집도
줄바꿈이 개념을 분리한다면 세로 밀집도는 연관성을 의미한다.

```Java
public class ReporterConfig {
  /**
  * 리포터 리스너의 클래스 이름
  */
  private String m_className;

  /**
  * 리포트 리스너의 속성
  */
  private List<Property> m_properties = New ArrayList<Property>();
  public void addProperty(Property p) {
    m_properties.add(p);
  }
}
```

위와 같이 쓸데없는 주석으로 세로 밀집도를 방해하지 말자. 아래 코드가 훨씬 좋다.

```Java
public class ReporterConfig {
  private String m_className;
  private List<Property> m_properties = New ArrayList<Property>();
  public void addProperty(Property p) {
    m_properties.add(p);
  }
}
```

### 수직거리
함수 연관 관계와 동작 방식을 이해하려고 이 함수에서 저 함수로 오가며 소스파일을 위아래로 뒤지는 등 뺑뺑이를 돌면 정말 돌아버린다~
상속 관계를 찾으려고 프로그래머가 줄줄이 찾아다니는 것은 옳지 못하다.

**서로 밀접한 개념은 세로로 가까이 둬야한다.**

#### 변수 선언
변수는 사용하는 위치에 최대한 가까이 선언한다. 우리가 만든 함수는 매우 짧으므로 지역 변수는 각 함수 맨 처음에 선언한다.

#### 인스턴스 변수
인스턴스 변수는 클래스 맨 처음에 선언한다. 변수 간에 새로로 거리를 두지 않는다. 잘 설계한 클래스는 많은 클래스 메서드가 인스턴스 변수를 사용하기 때문이다.

#### 개념적 유사성
어떤 코드는 서로 끌어 당긴다. 개념적인 친화도가 높기 때문이다. 친화도가 높은 코드일수록 가까이 배치한다.

### 세로 순서
일반적으로 함수 호출 종속성은 아래 방향으로 유지한다. 다시 말해, 호출되는 함수를 호출하는 함수보다 나중에 배치한다. 그러면 소스 코드 모듈이 고차원에서 저차원으로 자연스럽게 내려간다.

### 가로 형식 맞추기
한 행은 가로로 얼마나 길어야 적당할까?
이 질문에 답하려면 먼저 일반적인 프로그램에서 행 길이를 살펴보자.
대부분 120자 정도로 행 길이를 제한한다.

### 가로 공백과 밀집도
가로로는 공백을 사용해 밀접한 개념과 느슨한 개념을 표현한다. 다음 함수를 살펴보자.

```Java
private void measureLine(String line) {
  lineCount++;
  int lineSize = line.length();
  totalChars += lineSize;
  lineWidthHistogram.addLine(lineSize, lineCount);
  recordWidestLine(lineSize);
}
```

할당 연산자를 강조하려고 앞뒤에 공백을 줬다. 할당문은 왼쪽 요소와 오른쪽 요소가 분명히 나뉜다. 공백을 넣으면 두 가지 주요 요소가 확실히 나뉜다는 사실이 더욱 분명해진다.

## 팀 규칙
팀은 한 가지 규칙에 합의해야 한다. 그리고 모든 팀원은 그 규칙을 따라야 한다. 그래야 소프트웨어가 일관적인 스타일을 보인다. 개개인이 따로국밥처럼 맘대로 짜대는 코드는 피해야한다.
