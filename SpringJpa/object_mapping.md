객체 매핑
=======================

객체 매핑을 위해서 스프링 어노테이션을 사용한다.

### @Entity
객체를 테이블에 매핑하기 위해서 Entity 어노테이션을 사용한다. 이 어노테이션이 붙어있는 클래스를 테이블과 매핑한다고 JPA에게 알려준다. 

name 속성을 이용하여 JPA에서 사용할 엔티티 이름을 지정한다.
설정하지 않으면 기본값으로 클래스 이름이 된다. 다른 패키지에 이름이 같은 엔티티 클래스가 있을 경우 이름을 지정하여 충돌을 피한다.

##### 주의사항
- 기본 생성자는 필수
- final 클래스, enum, interface, inner 클래스에는 사용할 수 없다.
- 저장할 필드에 final을 사용하면 안된다.


#### @Table
엔티티 클래스에 매핑할 테이블 정보를 알려준다.
name 속성을 이용하여 테이블명을 지정한다.

#### @Id
엔티티 클래스의 필드를 테이블의 기본키에 매핑한다. id가 사용된 필드를 식별자 필드라고 한다.

#### @Column 
필드를 칼럼에 매핑한다.

```java

@Data
@Entity
@Table(name = "Member")
public class Member {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "member_id")
    private String memeberId;

    @Column(name = "name")
    private String name;
}
```

### 엔티티 매니저
- 특정 작업을 위해서 데이터베이스에 엑세스 하는 역할
- 엔티티 매니저 팩토리를 이용해서 생성한다.
- 여러 스레드가 동시에 접근하면 동시성 문제가 발생하기 때문에 공유해서는 안된다.

### 엔티티 매니저 팩토리
- 엔티티 매니저 팩토리는 생성 비용이 크기 때문에 DB 하나당 하나만 생성해서 사용한다.
- 스레드 세이프하기 때문에 동시 접근이 가능하다.

#### 엔티티 매니저와 팩토리를 직접 사용하는 Repository 코드

```java
@Transactional
public void save(Member member) {
    EntityManager em = emf.createEntityManager();
    EntityTransaction tx = em.getTransaction();
    try {
        tx.begin();

        if(member.getId() != null) {
            em.merge(member);
        } else {
            em.persist(member);
        }

        tx.commit()
    } catch (Exception e) {
        tx.rollback();
    } finally {
        em.close();
    }
}
```

- em.merge() : Update 쿼리 실행
- em.persist() : Insert 쿼리 실행


