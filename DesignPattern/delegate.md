Delegate Pattern
==============================

- 어떤 객체의 조작 일부를 다른 객체에게 넘김, 위탁자(delegator) -> 수탁자(delegate)
- 어떤 일의 책임을 다른 클래스 또는 메소드에게 넘김
- 한 객체가 기능 일부를 다른 객체로 넘겨주어 첫번째 객체 대신 수행하도록 하는 패턴

## 위임 패턴

Delegate pattern은 Compisition 방법 중 하나이다. 일반적으로 특정 기능을 가진 객체를 사용하면서 기능을 확장하고 싶을 때는 상속(Inheritance)을 통해서 구현한다.

하지만 상속은 유연성을 떨어트린다. Composition은 상속이 아닌, 클래스 안에 객체를 소유하고 있는 관계를 말한다. (흔히 has-a라는 관계, 상속은 is-a)

## 예제

```java
public class Main {
    public static void main(String[] args) { 
        Printer printer = new Printer();
        printer.print(); // 프린터야, 프린트해줘.
    }
}

// "delegator" 위탁자 (떠넘기는 사람, 갑)
class Printer { 
    RealPrinter p = new RealPrinter(); // 대신해줄 객체 생성
    void print() { p.print(); } // 위임!
}

// "delegate" 수탁자 (위임 받은 사람, 실무수행자, 을)
class RealPrinter { 
    void print() { System.out.println("something"); }
}
```