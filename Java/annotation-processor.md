[인프런 더 자바] 6. 애노테이션 프로세서
=================================

## Lombok은 어떻게 동작하는 건가?

#### Lombok
- @Getter, @Setter, @Builder 등의 애노테이션과 애노테이션 프로세서를 제공하여 표준적으로 작성해야 할 코드를 개발자 대신 생성해주는 라이브러리.

자바가 제공하는 애노테이션 프로레서 기반으로 만들어져있다.

애노테이션 프로세서는 컴파일할 떄 끼어든다.
특정 애노테이션이 붙어있는 클래스를 참조해서 또 다른 클래스를 만들어준다. 

AST를 애노테이션 프로세서 API를 통해서 참조만 가능하고, 수정은 불가능하다.

롬복은 해킹이다? 애노테이션 프로세서를 정상적으로 사용하는 것이 아니기때문에 사용하면 안된다.
-> 롬복이 사용하는 내부 API는 언제든지 수정 가능하기 때문에 유지보수성을 해친다.

라는 주장이 있지만 롬복은 너무 편하다.

#### 참고

- https://docs.oracle.com/javase/8/docs/api/javax/annotation/processing/Processor.html
- https://projectlombok.org/contributing/lombok-execution-path
- https://stackoverflow.com/questions/36563807/can-i-add-a-method-to-a-class-from-a-compile-time-annotation
- http://jnb.ociweb.com/jnb/jnbJan2010.html#controversy
- https://www.oracle.com/technetwork/articles/grid/java-5-features-083037.html


## 애노테이션 프로세서

애노테이션 프로세서는 자바 버전 6부터 지원한다.

[Processor 인터페이스](https://docs.oracle.com/en/java/javase/11/docs/api/java.compiler/javax/annotation/processing/Processor.html)

- 여러 라운드(rounds)에 거쳐 소스 및 컴파일 된 코드를 처리 할 수 있다.

애노테이션 프로세스는 라운드 개념으로 동작을 한다. (roundEnv)
여러 라운드에 걸쳐서 처리한다는 뜻이다.

각 라운드마다 특정 애노테이션들이 처리가 된 결과를 받는다.(체이닝과 비슷하다.)

@Target에 해당하는건 Interface, Class, Enum
그래서 @Target 애노테이션으로 체크하는 것은 한계가 있다.

AutoService는 애노테이션 프로세서에 관한 Meta 정보를 미리 생성해주는 구글이 만든 라이브러리다.

https://github.com/google/auto/tree/master/service


```java
@AutoService(Processor.class)
public class MagicMojaProcessor extends AbstractProcessor {
...
}
```

https://itnext.io/java-service-provider-interface-understanding-it-via-code-30e1dd45a091

#### 참고
- http://hannesdorfmann.com/annotation-processing/annotationprocessing101
- http://notatube.blogspot.com/2010/12/project-lombok-creating-custom.html
- https://medium.com/@jintin/annotation-processing-in-java-3621cb05343a
- https://medium.com/@iammert/annotation-processing-dont-repeat-yourself-generate-your-code-8425e60c6657
- https://docs.oracle.com/javase/7/docs/technotes/tools/windows/javac.html#processing



### Filer 인터페이스
- 소스코드, 클래스 코드 및 리소스를 생성할 수 있는 인터페이스

```java
@Override
public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
    Set<? extends Element> elements = roundEnv.getElementsAnnotatedWith(Magic.class);
    for (Element element : elements) {
        Name elementName = element.getSimpleName();
        if (element.getKind() != ElementKind.INTERFACE) {
            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "Magic annotation can not be used on " + elementName);
        } else {
            processingEnv.getMessager().printMessage(Diagnostic.Kind.NOTE, "Processing " + elementName);
        }

        TypeElement typeElement = (TypeElement)element;
        ClassName className = ClassName.get(typeElement);

        MethodSpec pullOut = MethodSpec.methodBuilder("pullOut")
                .addModifiers(Modifier.PUBLIC)
                .returns(String.class)
                .addStatement("return $S", "Rabbit!")
                .build();

        TypeSpec magicMoja = TypeSpec.classBuilder("MagicMoja")
                .addModifiers(Modifier.PUBLIC)
                .addSuperinterface(className)
                .addMethod(pullOut)
                .build();

        Filer filer = processingEnv.getFiler();
        try {
            JavaFile.builder(className.packageName(), magicMoja)
                    .build()
                    .writeTo(filer);
        } catch (IOException e) {
            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "FATAL ERROR: " + e);
        }
    }
    return true;
}
```

#### 사용해야하는 유틸리티
- Javapoet: 소스 코드 생성 유틸리티

## 정리

### 애노테이션 프로세서 사용 예
- 롬복
- AutoService: java.util.ServiceLoader용 파일 생성 유틸리티
- @Override
    - https://stackoverflow.com/questions/18189980/how-do-annotations-like-override-work-internally-in-java/18202623
- Dagger 2: 컴파일 타임 DI 제공
- 안드로이드 라이브러리
    - ButterKinfe: @BindView (뷰 아이디와 애노테이션 붙인 필드 바인딩)
    - DeepLinkDispatch: 특정 URI 링크를 Activity로 연결할 때 사용

### 애노테이션 프로세서 장점
런타임 비용이 제로

### 애노테이션 프로세서 단점
기존 클래스 코드를 변경할 때는 약간의 hack이 필요하다.



