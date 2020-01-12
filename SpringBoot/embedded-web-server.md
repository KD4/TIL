내장 웹 서버 이해
=======================================

Spring Boot Web Starter 를 실행하면 톰캣 웹 서버가 실행된다. 이 때문에 스프링 부트를 웹 서버로 착각하는 경우가 있는데 스프링 부트는 웹 서버가 아니다. 

Spring Boot Web Starter는 웹서버를 등록해주는 자동 설정이 있어서 의존성에 등록된 웹서버를 자동으로 띄워준다. default로 tomcat이 등록되어 있다. 

원시 내장 톰캣을 띄우는 방법은 간단하게 아래와 같은 코드가 필요하다.

```java

public class Application {
    public static void main(String[] args) throws LifecycleException {
        // 톰캣 객체 생성
        Tomcat tomcat = new Tomcat();

        //포트 설정
        tomcat.setPort(8080);

        //톰캣에 컨텍스트 추가
        Context context = tomcat.addContext('/', '/'); // contextPath, docBase

        // 서블릿 만들기
        HttpServlet servlet = new HttpServlet() {
            @Override
            protected void doGet(HttpServletRequest req, HttpServletResponse res) {
                Printwriter writer = res.getWriter();
                writer.println("<html></html>");
            }
        }

        // 톰캣에 서블릿 추가
        String servletName = "hello";
        tomcat.addServlet("/", servletName, servlet);

        //컨텍스트에 서블릿 맵핑
        context.addServletMappingDecoded("/hello", servletName);

        // 톰캣 실행 및 대기
        tomcat.start();
        tomcat.getServer().await();
    }
}

```

이 일련의 과정을 보다 상세하고 유연하게 설정해주는게 바로 스프링 부트의 자동 설정이다.

위와 관련된 내용은 auto configuration의 spring.factories 에서 볼 수 있는 ServletWebServerFactoryAutoConfiguration에 있다. 