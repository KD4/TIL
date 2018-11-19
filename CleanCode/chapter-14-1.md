14장-점진적인 개선-1차 초안
================================================

## 명령행 인수 구문분석기 사례 연구

```java
public static void main(String[] args) {
    try {
        Args arg = new Args("l,p#,d*", args);
        boolean logging = arg.getBoolean('l');
        int port = arg.getInt('p');
        String directory = arg.getString('d');
        executeApplication(loggin, port, directory);
    } catch (ArgsException e) {
        System.out.printf("Argument error: %s \n", e.errorMessage());
    }
}
```

위 프로그램은 Args 클래스 기반으로 명령행 인수를 분석하는 프로그램이다. 

지금부터 Args 코드를 통해서 점진적인 개선을 해보겠다.

## 엉망진창 1차 초안

```java
import java.text.ParseException;
import java.util.*;

public class Args {
    private String schema;
    private String[] args;
    private boolean valid = true;
    ...    
}
```