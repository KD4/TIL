10장-클래스
=============================================

## 클래스 체계
클래스를 정의하는 표준 자바 관례에 따르면, 가장 먼저 변수목록이 나온다. 정적 공개 상수가 있다면 맨 처음에 나온다. 다음으로 정적 비공개 변수가 나오며, 이어서 비공개 인스턴스 변수가 나온다.

변수 목록 다음에는 공개 함수가 나온다. 비공개 함수는 자신을 호출하는 함수 직후에 넣는다. 즉, 추상화 단계가 순차적으로 내려간다.

### 캡슐화
변수와 유틸리티 함수는 가능한 공개하지 않는 편이 낫지만 반드시 숨겨야 한다는 법칙도 없다. 변수나 유틸리티 함수를 protected로 선언해 테스트코드로 접근을 허용하기도 한다.

그러나 **캡슐화를 풀어주는 결정은 언제나 최후의 수단이다.**

## 클래스는 작아야한다!

클래스를 설계할 때, 함수와 마찬가지로 '작게'가 기본 규칙이다. 얼마나 작아야 하는가?

함수는 물리적인 행 수로 크기를 측정했지만 클래스는 클래스가 맡은 책임을 센다.

클래스 이름은 해당 클래스 책임을 기술해야 한다. 실제로 작명은 클래스 크기를 줄이는 첫 번째 관문이다. 간결한 이름이 떠오르지 않는다면 필경 클래스 크기가 너무 커서 그렇다. 클래스 이름이 모호하더면 필경 클래스 책임이 너무 많아서다.

### 단일 책임 원칙
단일 책임 원칙(Single Responsibility Principle, SRP)은 클래스나 모듈을 변경할 이유가 하나 뿐이여야 한다는 의미다. 고로 큰 클래스 몇 개가 아니라 작은 클래스 여럿으로 이뤄진 시스템이 더 바람직하다.
작은 클래스는 각자 맡은 책임이 하나며, 변경할 이유가 하나며, 다른 작은 클래스와 협력해 시스템에 필요한 동작을 수행한다.

### 응집도(Cohesion)
클래스는 인스턴스 변수 수가 작아야 한다. 각 클래스 메서드는 클래스 인스턴스 변수를 하나 이상 사용해야 한다. 일반적으로 메서드가 변수를 더 많이 사용할수록 메서도와 클래스는 응집도가 높다. 모든 인스턴스 변수를 메서드마다 사용하는 클래스는 응집도가 가장 높다.

## 변경하기 쉬운 클래스
대다수 시스템은 지속적인 변경이 가해진다. 그리고 뭔가 변경할 때마다 시스템이 의도대로 동작하지 않을 위험이 따른다.

아래 SQL 문자열을 만드는 Sql 클래스를 봐보자.

```java

public class Sql {
  public Sql(String table, Column[] columns)
  public String create()
  public String insert()
  public String selectAll()
  public String findByKey()
  public String columnList()
  public String preparedInsert()
}

```

새로운 SQL 문을 지원하려면 반드시 Sql 클래스를 손대야한다. 또한 기존 SQL문을 수정할 때도 반드시 손대야 한다.

아래 코드로 바꿔보면 어떨까?

```java

abstract public class Sql {
  public Sql(String table, Column[] columns)
  abstract public String generate()
}

public class CreateSql extends Sql {
  public CreateSql(String table, Column[] columns)
  @Override
  public String generate()
}

```



위 코드처럼 바꾸면 update 문을 추가할 때 기존 클래스를 변경할 필요가 전혀 없다는 사실이 중요하다. update 문을 만드는 논리는 Sql 클래스에서 새 클래스 UpdateSql을 상속받아 거기에 넣으면 된다.

새 기능을 수정하거나 기존 기능을 변경할 때 건드릴 코드가 최소인 시스템 구조가 바라밎ㄱ하다. 이상적이ㅣㄴ 시스템이라면 새 기능을 추가할 때 시스템을 확장할 뿐 기존 코드를 변경하지는 않는다.

## 변경으로부터 격리

구체적인 클래스는 상세한 구현을 포함하며 추상 클래스는 개념만 포함한다고 배웠다. 상세한 구현에 의존하는 클라이언트 클래스는 구현이 바뀌면 위험에 빠진다. 그래서 우리는 인터페이스와 추상 클래스를 사용해 구현이 미치는 영향을 격리한다.

상세한 구현에 의존하는 코드는 테스트가 어렵다. 예를 들어 portfolio 클래스를 만든다고 가정하자. 그런데 Portfolio 클래스는 외부 TokyoStockExchange API를 사용해 포트폴리오 값을 계산한다. 우리 테스트 코드는 시세 변화에 영향을 받는다. 이런 구조는 올바르지 못하다.

Portfolio 클래스에서 TokyoStockExchange API를 직접 호출하는 대신 StockExchange 라는 인터페이스를 생성한 후 메서드 하나를 선언한다.

```java
public interface StockExchange {
  Money currentPrice(String symbol);
}
```

다음으로 StockExchange 인터페이스를 구현하는 TokyoStockExchange 클래스를 구현한다. 또한 Portfolio 생성자를 수정해 StockExchange 참조자를 인수로 받는다.

```java
public Portfolio {
  private StockExchange exchange;
  public Portfolio(StockExchange exchange) {
    this.exchange = exchange;
  }
}
```

이제 TokyoStockExchange 클래스를 흉내내는 클래스를 만들어 테스트가 용이해졌다.

이 정도로 테스트가 가능할 정도로 결합도를 낮추면 유연성과 재사용성도 더욱 높아진다. 결합도가 낮다는 소리는 각 시스템 요소가 다른 요소로부터 그리고 변경으로부터 잘 격리되어 있다는 의미다. 시스템 요소가 서로 잘 격리되어 있으면 각 요소를 이해하기도 더 쉬워진다.
이제 결합도를 최소로 줄이면 자연스럽게 또 다른 클래스 설계 원칙인 DIP(Dependency Inversion Principle)를 따르는 클래스가 나온다. 본질적으로 DIP는 클래스가 상세한 구현이 아니라 추상화에 의존한다는 원칙이다.
