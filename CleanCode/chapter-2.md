2장 의미 있는 이름
==================================

## 의도를 분명히 밝혀라

```Java
public List<int[]> getThem() {
  List<int[]> list1 = new ArrayList<int[]>();
  for (int[] x : theList) {
    if (x[0] == 4) list1.add(x);
  }
  return list1;
}
```

의도가 분명한 이름을 지어야 한다. 위 코드는 함축성이 있다. 문맥을 숨기는 코드, 변수명은 문맥을 모르는 사람에게는 고역이다.

```Java
public List<Cell> getFlaggedCells() {
  List<Cell> flaggedCells = new ArrayList<Cell>();
  for (Cell cell : gameBoard)
    if (cell.isFlagged())
      flaggedCells.add(cell);
  return flaggedCells;
}
```

## 그릇된 정보를 피하라

#### 그릇된 단서를 이름에 남겨서는 안된다.
여러 계정을 그룹으로 묶을 떄, 실제 List 자료구조는 아니지만 accountList라고 명명하면 안된다.

#### 서로 흡사한 이름을 사용하지 않도록 주의한다.
한 모듈에서 XYZControllerForEfficientHandlingOfString이라는 이름을 사용하고 조금 떨어진 모듈에서 XYZControllerForEfficientStorageOfString라는 이름을 사용한다면?

## 의미 있게 구분하라.
#### 불용어를 추가한 이름은 아무런 정보를 제공하지 못한다.
Product라는 클래스가 있다고 가정하자. 다른 클래스를 ProductInfo 혹은 ProductData라 부른다면 개념을 구분하지 않은 채 이름만 달리한 경우다.
Info나 Data는 의미를 나타낼 수 없는 불용어이다.

#### 불용어는 중복이다.
변수 이름에 variable이라는 단어는 단연코 금물이다. 표 이름에 table도 마찬가지이다. NameString은 Name보다 뭐가 나은가?

## 검색하기 쉬운 이름을 사용하라.
변수나 상수를 코드 여러 곳에서 사용한다면 검색하기 쉬운 이름이 바람직하다.

## 인코딩을 피하라.
예전에 쓰이는 헝가리식 표기법은, 이제 필요없다.

#### 멤버 변수 접두어
이제는 멤버 변수에 m_이라는 접두어를 붙일 필요가 없다!


## 클래스 이름
클래스 이름과 객체 이름은 명사나 명사구가 적합하다.

Customer, WikiPage, Account 등이 좋은 예다. Manager, Data, Info 같은 불용어는 피하고 동사는 사용하지 않는다.

## 메서드 이름
메서드 이름은 동사나 동사구가 적합하다. postPayment, deletePage, save 등이 좋은 예다.

## 기발한 이름은 피하라.

## 한 개념에 한 단어를 사용하라.
추상적인 개념 하나에 단어 하나를 선택해 이를 고수한다.

똑같은 메서드를 클래스마다 fetch, retrieve, get으로 제각각 부른다면 혼란스럽다.

## 해법 영역에서 가져온 이름을 사용하라.
VISITOR 패턴에 친숙한 프로그래머는 AccountVisitor라는 이름을 금방 이해한다. JobQueue를 모르는 프로그래머가 있을까?
프로그래머에게 익숙한 개념을 적극 사용해라.

## 문제 영역에서 가져온 이름을 사용하라.
적절한 프로그래머 용어가 없다면 문제 영역에서 이름을 가져온다. 그러면 코드 보수하는 프로그래머가 분야 전문가에게 의미를 물어 파악할 수 있다.

## 의미 있는 맥락을 추가하라.
예를 들어, firstName, lastName, street, houseNumber, city, state, zipcode 라는 변수가 있다.

변수를 훑어보면 주소라는 사실을 금방 알아챈다. 하지만 어느 메서드가 state라는 변수 하나만 사용한다면? 변수 state가 주소 일부라는 사실을 금방 알아볼까?

addr라는 접두어를 추가해 addrFirstName, addrLastName, addrState라고 맥락을 추가하면 분명해진다.
