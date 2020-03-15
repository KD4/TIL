전략 패턴
========================================

동일한 동작을 하지만 구현 방법이 다른 알고리즘을 사용하는 컨텍스트에서 사용하는 알고리즘의 구체적인 구현체를 직접 사용하게 아니라 추상화된 알고리즘 인터페이스를 사용하여 확장에 용이하도록 하는 패턴

"메일 보내기"라는 기능을 하는 객체를 하는 Client에서 다음 메일, 구글 메일 등을 보내야 한다면 DaumMailSender, GoogleMailSender 라는 객체를 사용하는 메서드를 따로 만들어 구현할 수도 있지만 새로운 메일이 추가되거나 삭제될 경우 Client 코드도 변경해야하는 OCP 위반이 일어난다. 

"메일 보내기"라는 알고리즘을 전략이라 칭하고 설명하자면, 이 전략을 선언한 인터페이스를 만들고 Client에서는 MailSender 인터페이스만 사용하고 MailSender 인터페이스를 구현한 DaumMailSender, GoogleMailSender는 Client를 사용하는 곳에서 주입해주면 Client 코드는 MailSender 구현체가 삭제되거나 확장되어도 코드 변경을 하지 않아도 된다.


```java

public interface MailSender {
    void sendMail();
}

public class DaumMailSender implements MainSender {
    @Override
    void sendMail() {
        // do use Daum Service
    }
}

public class MailClient {

    private MailSender strategy;

    public MailClient(MailSender strategy) {
        this.strategy = strategy;
    }

    public void sendMail() {
        strategy.sendMail();
    }
}

public static void main(String[] args) {
    MailClient client = new MailClient(new DaumMailSender());
    client.sendMail();
}
```

