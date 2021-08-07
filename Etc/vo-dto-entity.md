VO, DTO, Entity 정리
========================

## Entity
 Entity 클래스는 DB의 테이블내에 존재하는 칼럼만을 속성 필드로 가지는 클래스를 말한다. 엔티티 클래스는 로직을 가질 수 있지만 매핑 대상 테이블의 칼럼에 없는 프로퍼티를 가져서는 안된다.

 Review 라는 테이블의 칼럼이 TITLE, CONTENT, WRITER, SCORE 라면 여기에 매핑된 Entity는 아래와 같은 구조를 가진다.

 ```Java
 @Entity
 class Review {
     private String title;
     private String content;
     private String writer;
     private Long score;
 }
 ```

 JPA를 사용하게 될 경우 엔티티클래스에는 @Entity 어노테이션을 명시한다.

 ## VO(Value Object)
 VO는 값 객체라는 뜻으로 두 객체간 동등성 검증을 목적으로 사용하는 클래스이다. 로직을 포함할 수 있으며, 객체의 불변성을 보장한다. 때문에 equals()와 hashCode() 메서드의 오버라이딩을 요구한다.

 ```java
 @Getter
 @Setter
 @Alias("review")
 class ReviewVO {
    private Long id;
    private String title;
    private String content;
    private String writer;
    private Long score;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReviewVO article = (ReviewVO) o;
        return Objects.equals(id, reviewVO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
 }
 ```

 ## DTO(Data Transfer Object)
 DTO는 데이터 전송을 위한 객체이다. Getter, Setter만 포함되어 있으면 된다.


 ```java
 @Getter
 @Setter
 class ReviewDTO {
    private Long id;
    private String title;
    private String content;
    private String writer;
    private Long score;
}
 ```