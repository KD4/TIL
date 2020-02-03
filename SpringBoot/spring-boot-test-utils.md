스프링부트 테스트 유틸 - OutputCapture
========================

테스트 끝난줄 알았는데, 하나만 더 소개한다.
간단한 유틸리티인데.
네가지 정도 있다. 이 중 OutputCapture에 대해서 한번 살펴보자.

OutputCapture, TestPropertyValues, TestRestTemplate, ConfigFileApplicationContextIi...


OutputCapture란?

로그를 비롯해서 콘솔에 찍히는 모든걸 캡쳐한다.

```java
@RestController
public class SampleController {
    Logger logger = LoggerFactory.getLogger(SampleController.class);

    @Autowired
    private SampleService sampleService;

    @GetMapping
    public String hello() {
        logger.info("hi");
        System.out.println("skip");
        return "hello " + smapleService.getName();
    }
}
```

```java
@Runwith(SpringRunner.class)
@MockMvcTests(SampleController.class)
public class SampleControllerTest {
    @Rule
    public OutputCapture outputCapture = new OutputCapture();

    @MockBean
    SampleService sampleService;

    @Autowired
    MockMvc mockMvc;

    @Test
    public void hello() throws Exception {
        when(mockSampleService.getName()).thenReturn("gwanwoo");

        mockMvc.perform(get("/"))
                .andExpect(content()).string("hello gwanwoo"));

        assertThat(outputCapture.toString())
            .contains("gwanwoo")
            .contains("skip");
    }
}
```