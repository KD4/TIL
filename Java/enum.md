# Enum Type 열거형


### 상수란 무엇인가 ?

상수는 변하지 않는 값이다. 아래에서 좌항이 변수이고 우항이 상수이다.

```Java
int x = 1;
```

아래와 같은 구문은 있을 수 없다. 1은 2가 될 수 없다. 다시 말해 상수는 변할 수 없다.

```Java
1 = 2;
```

이런 변하지 않는 상수에 어떠한 의미를 부여하면 아래와 같은 로직을 작성할 수 있다.

```Java

public class ConstantDemo {
    public static void main(String[] args) {
        /*
         * 1. 사과
         * 2. 복숭아
         * 3. 바나나
         */
        int type = 1;
        switch(type){
            case 1:
                System.out.println(57);
                break;
            case 2:
                System.out.println(34);
                break;
            case 3:
                System.out.println(93);
                break;
        }
    }

}

```

위와 같은 로직에서 숫자 1에 해당하는 과일은 언제나 사과여야한다. 그런데 주석으로 상수의 의미를 전달하고 있지만 주석이 없어진다면

이 숫자가 무엇을 의미하는지 알기 어렵다.

이럴때 상수 자체에 이름이 있으면 좋을 것 같다. Java에서는 변수를 상수화 시킬 수 있다.

변수를 지정하고 그 변수를 final로 처리하면 한번 설정된 변수의 값이 바뀌지 않는다.

또한 바뀌지 않는 값이라면 인스턴스 변수가 아니라 클래스 변수(static)로 지정하는 것이 더 좋을 것이다.

```Java
public class ConstantDemo {
    private final static int APPLE = 1;
    private final static int PEACH = 2;
    private final static int BANANA = 3;
    public static void main(String[] args) {
        int type = APPLE;
        switch(type){
            case APPLE:
                System.out.println(57+" kcal");
                break;
            case PEACH:
                System.out.println(34+" kcal");
                break;
            case BANANA:
                System.out.println(93+" kcal");
                break;
        }
    }
}
```





### enum은 왜 필요한가 ?

그런데 프로그램이 커지면서 누군가 기업에 대한 상수가 필요해졌다. 해서 아래와 같이 코드를 변경했다.

```Java
public class ConstantDemo {
    // fruit
    private final static int APPLE = 1;
    private final static int PEACH = 2;
    private final static int BANANA = 3;

    // company
    private final static int GOOGLE = 1;
    //private final static int APPLE = 2;
    private final static int ORACLE = 3;

    public static void main(String[] args) {
        int type = APPLE;
        switch(type){
            case APPLE:
                System.out.println(57+" kcal");
                break;
            case PEACH:
                System.out.println(34+" kcal");
                break;
            case BANANA:
                System.out.println(93+" kcal");
                break;
        }
    }
```

과일 APPLE과 기업 APPLE이 서로 같은 이름을 가진다. 이렇게 되면 APPLE의 값이 2에서 1로 바뀐다. 프로그램은 오동작 할 것이다.
다행인 것은 final로 선언했기 때문에 컴파일이 되지 않고 이름이 중복되는 문제를 방지 할 수 있다. 그런데 이미 기업에 대한 상수를 작성했고 이것이 이미 다양한 영역에서 사용되고 있는 상태에서 APPLE을 추가하려면 낭패가 될 것이다. 이러한 문제를 회피하기 위해서 접두사를 붙여보자.

```Java

public class ConstantDemo {
    // fruit
    private final static int FRUIT_APPLE = 1;
    private final static int FRUIT_PEACH = 2;
    private final static int FRUIT_BANANA = 3;

    // company
    private final static int COMPANY_GOOGLE = 1;
    private final static int COMPANY_APPLE = 2;
    private final static int COMPANY_ORACLE = 3;

    public static void main(String[] args) {
        int type = FRUIT_APPLE;
        switch(type){
            case FRUIT_APPLE:
                System.out.println(57+" kcal");
                break;
            case FRUIT_PEACH:
                System.out.println(34+" kcal");
                break;
            case FRUIT_BANANA:
                System.out.println(93+" kcal");
                break;
        }
    }
}

```

이름이 중복될 확률을 낮출 수 있다. 이러한 기법을 **네임스페이스** 라고 한다.
그런데 상수가 너무 지저분하다. 좀 깔끔하게 바꿀 수 없을까? 이럴 때 인터페이스를 사용할 수 있다.

```Java

public class ConstantDemo {

    public static void main(String[] args) {
        int type = FRUIT.APPLE;
        switch(type){
            case FRUIT.APPLE:
                System.out.println(57+" kcal");
                break;
            case FRUIT.PEACH:
                System.out.println(34+" kcal");
                break;
            case FRUIT.BANANA:
                System.out.println(93+" kcal");
                break;
        }
    }
}

```

훨씬 깔끔하다. 접미사(FRUIT_, COMPANY_)로 이름을 구분했던 부분이 인터페이스로 구분되기 때문에 언어의 특성을 보다 잘 살린 구조가 되었다.

인터페이스를 이렇게 사용할 수 있는 것은 **인터페이스에서 선언된 변수는 무조건 public static final의 속성** 을 갖기 때문이다.

그런데 type의 값으로 누군가 COMPANY_GOOGLE을 사용했다면 어떻게 될까?

```Java
int type = COMPANY.GOOGLE;
```

결과는 57 Kcal이다! 구글이 57 Kcal인 것이다!

우리 코드는 과일과 기업이라는 두 개의 상수 그룹이 존재한다. 위의 코드는 서로 다른 상수그룹의 비교를 시도했고 양쪽 모두 값이 정수 1이기 때문에 오류를 사전에 찾아주지 못하고 있다. 컴파일러가 이런 실수를 사전에 찾아줄 수 있게 하려면 어떻게 해야 할까?

```Java

class Fruit{
   public static final Fruit APPLE  = new Fruit();
   public static final Fruit PEACH  = new Fruit();
   public static final Fruit BANANA = new Fruit();
}
class Company{
   public static final Company GOOGLE = new Company();
   public static final Company APPLE = new Company();
   public static final Company ORACLE = new COMPANY(Company);
}

public class ConstantDemo {

   public static void main(String[] args) {
       if(Fruit.APPLE == Company.APPLE) {
           System.out.println("과일 애플과 회사 애플이 같다.");
       }
   }
}

```

Fruit와 Company 클래스를 만들고 클래스 변수로 해당 클래스의 인스턴스를 사용하고 있다. 각각의 변수가 final이기 때문에 불변이고, Static이므로 인스턴스로 만들지 않아도 된다.

결과는 "if(Fruit.APPLE == Company.APPLE)"에서 에러가 발생한다. 이것이 우리가 바라던 것이다. 서로 다른 카테고리의 상수에 대해서는 비교조차 금지하게 된 것이다. 언제나 오류는 컴파일 시에 나타나도록 하는 것이 바람직하다. 실행 중에 발생하는 오류는 찾아내기가 더욱 어렵다.

그런데 위의 코드는 두 가지 문제점이 있는데 하나는 switch 문에서 사용할 수 없고 또 하나는 선언이 너무 복잡하다는 것이다.

주인공이 등장할 시간이 되었다.

enum은 열거형(enumerated type)이라고 부른다. 열거형은 서로 연관된 상수들의 집합이라고 할 수 있다. 위의 예제에서는 Fruit와 Company가 말하자면 열거인 셈이다. 이러한 패턴을 자바 1.5부터 문법적으로 지원하기 시작했는데 그것이 열거형이다. 이전 코드를 enum으로 바꿔보자.

```Java

enum Fruit{
    APPLE, PEACH, BANANA;
}
enum Company{
    GOOGLE, APPLE, ORACLE;
}

public class ConstantDemo {

    public static void main(String[] args) {
        /*
        if(Fruit.APPLE == Company.APPLE){
            System.out.println("과일 애플과 회사 애플이 같다.");
        }
        */
        Fruit type = Fruit.APPLE;
        switch(type){
            case APPLE:
                System.out.println(57+" kcal");
                break;
            case PEACH:
                System.out.println(34+" kcal");
                break;
            case BANANA:
                System.out.println(93+" kcal");
                break;
        }
    }
}
```

### enum은 내부적으로 어떻게 구현되고 있는가 ?

```java

enum Fruit{
    APPLE, PEACH, BANANA;
}

```

위의 코드를 하나씩 살펴보자.

enum은 class, interface와 동급의 형식을 가지는 단위다. 하지만 enum은 사실상 class이다. 편의를 위해서 enum만을 위한 문법적 형식을 가지고 있기 때문에 구분하기 위해서 enum이라는 키워드를 사용하는 것이다. 위의 코드는 아래 코드와 사실상 같다.

```Java
class Fruit{
    public static final Fruit APPLE  = new Fruit();
    public static final Fruit PEACH  = new Fruit();
    public static final Fruit BANANA = new Fruit();
    private Fruit(){}
}
```

생성자의 접근 제어자가 private이다. 그것이 클래스 Fruit를 인스턴스로 만들 수 없다는 것을 의미한다. 다른 용도로 사용하는 것을 금지하고 있는 것이다. 이에 대해서는 뒤에서 다시 설명하겠다. enum은 많은 곳에서 사용하던 디자인 패턴을 언어가 채택해서 문법적인 요소로 단순화시킨 것이라고 할 수 있다.

아래 코드는 컴파일 에러가 발생한다.

```Java
if(Fruit.APPLE == Company.APPLE){
    System.out.println("과일 애플과 회사 애플이 같다.");
}
```

enum이 서로 다른 상수 그룹에 대한 비교를 컴파일 시점에서 차단할 수 있다는 것을 의미한다. 상수 그룹 별로 클래스를 만든 것의 효과를 enum도 갖는다는 것을 알 수 있다.

enum을 사용하는 이유를 정리하면 아래와 같다.

- 코드가 단순해진다.
- 인스턴스 생성과 상속을 방지한다.
- 키워드 enum을 사용하기 때문에 구현의 의도가 열거임을 분명하게 나타낼 수 있다.

### enum 응용은 어떻게 하는가 ?

enum은 사실 클래스다. 그렇기 때문에 생성자를 가질 수 있다. 아래와 같이 코드를 수정해보자.

```Java
enum Fruit{
    APPLE, PEACH, BANANA;
    Fruit(){
        System.out.println("Call Constructor "+this);
    }
}

enum Company{
    GOOGLE, APPLE, ORACLE;
}

public class ConstantDemo {

    public static void main(String[] args) {

        /*
        if(Fruit.APPLE == Company.APPLE){
            System.out.println("과일 애플과 회사 애플이 같다.");
        }
        */
        Fruit type = Fruit.APPLE;
        switch(type){
            case APPLE:
                System.out.println(57+" kcal");
                break;
            case PEACH:
                System.out.println(34+" kcal");
                break;
            case BANANA:
                System.out.println(93+" kcal");
                break;
        }
    }
}
```

```
Call Constructor APPLE
Call Constructor PEACH
Call Constructor BANANA
57 kcal
```

Call Constructor가 출력된 것은 생성자 Fruit가 호출되었음을 의미한다. 이것이 3번 호출되었다는 것은 필드의 숫자만큼 호출되었다는 뜻이다. 즉 enum은 생성자를 가질 수 있다.

하지만 코드를 아래와 같이 바꾸면 컴파일 에러가 발생한다.

```Java
enum Fruit{
    APPLE, PEACH, BANANA;
    public Fruit(){
        System.out.println("Call Constructor "+this);
    }
}
```


이것은 enum의 생성자가 접근 제어자 private만을 허용하기 때문이다. 덕분에 Fruit를 직접 생성할 수 없다. 그렇다면 이 생성자의 매개변수를 통해서 필드(APPLE..)의 인스턴스 변수 값을 부여 할 수 있다는 말일까? 있다. 그런데 방식이 좀 생경하다.

```Java
enum Fruit{
    APPLE("red"), PEACH("pink"), BANANA("yellow");
    public String color;
    Fruit(String color){
        System.out.println("Call Constructor "+this);
        this.color = color;
    }
}

enum Company{
    GOOGLE, APPLE, ORACLE;
}

public class ConstantDemo {

    public static void main(String[] args) {
        /*
        if(Fruit.APPLE == Company.APPLE){
            System.out.println("과일 애플과 회사 애플이 같다.");
        }
        */
        Fruit type = Fruit.APPLE;
        switch(type){
            case APPLE:
                System.out.println(57+" kcal, "+Fruit.APPLE.color);
                break;
            case PEACH:
                System.out.println(34+" kcal"+Fruit.PEACH.color);
                break;
            case BANANA:
                System.out.println(93+" kcal"+Fruit.BANANA.color);
                break;
        }
    }
}

```

```
Call Constructor APPLE
Call Constructor PEACH
Call Constructor BANANA
57 kcal, red
```

아래 코드는 Fruit의 상수를 선언하면서 동시에 생성자를 호출하고 있다.

```Java
APPLE("red"), PEACH("pink"), BANANA("yellow");
```

아래 코드는 생성자다. 생성자의 매개변수로 전달된 값은 this.color를 통해서 5행의 인스턴스 변수의 값으로 할당된다.

```Java
Fruit(String color){
    System.out.println("Call Constructor "+this);
    this.color = color;
}
```

아래처럼 호출하면 APPLE에 할당된 Fruit 인스턴스의 color 필드를 반환하게 된다.

```Java
System.out.println(57+" kcal, "+Fruit.APPLE.color);
```

열거형은 메소드를 가질수도 있다. 아래 코드는 이전 예제와 동일한 결과를 출력한다.

```Java

enum Fruit{
    APPLE("red"), PEACH("pink"), BANANA("yellow");
    private String color;
    Fruit(String color){
        System.out.println("Call Constructor "+this);
        this.color = color;
    }
    String getColor(){
        return this.color;
    }
}

enum Company{
    GOOGLE, APPLE, ORACLE;
}

public class ConstantDemo {

    public static void main(String[] args) {
        Fruit type = Fruit.APPLE;
        switch(type){
            case APPLE:
                System.out.println(57+" kcal, "+Fruit.APPLE.getColor());
                break;
            case PEACH:
                System.out.println(34+" kcal"+Fruit.PEACH.getColor());
                break;
            case BANANA:
                System.out.println(93+" kcal"+Fruit.BANANA.getColor());
                break;
        }
    }
}

```

enum은 맴버 전체를 열거 할 수 있는 기능도 제공한다.

```Java

enum Fruit{
   APPLE("red"), PEACH("pink"), BANANA("yellow");
   private String color;
   Fruit(String color){
       System.out.println("Call Constructor "+this);
       this.color = color;
   }
   String getColor(){
       return this.color;
   }
}

enum Company{
   GOOGLE, APPLE, ORACLE;
}

public class ConstantDemo {

   public static void main(String[] args) {
       for(Fruit f : Fruit.values()){
           System.out.println(f+", "+f.getColor());
       }
   }
}

```


### enum의 메소드
Static Methods
- valueOf(String arg) : String 값을 enum에서 가져온다. 값이 없으면 Exception 발생
- valueOf(Class<T> class, String arg) : 넘겨받은 class에서 String을 찾아, enum에서 가져온다. valueOf(String arg)는 내부적으로 자기 자신의 class를 가져오는 것이다.
- values() : enum의 요소들을 순서대로 enum 타입의 배열로 리턴한다. ENUM$VALUES의 카피이므로, 너무 자주 호출하는 것은 좋지 않음.

Instant Methods
- name() : 호출된 값의 이름을 String으로 리턴한다.
- ordinal() : 해당 값이 enum에 정의된 순서를 리턴한다
- compareTo(E o) : 이 enum과 지정된 객체의 순서를 비교한다. 지정된 객체보다 작은 경우 음의 정수, 동일하면 0, 크면 양의 정수를 반환한다.
- equals(Object other) : 지정된 객체가 이 enum 정수와 같은 경우, true를 반환한다.



출처:
https://opentutorials.org/module/516/6091 [생활코딩 Enum]
http://hyeonstorage.tistory.com/174 [개발이 하고 싶어요]
