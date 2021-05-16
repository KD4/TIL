# Spring Batch with mybatis

Spring Batch로 배치잡을 설계할 떄 일반적으로 사용하는 JPA와 같은 하이버네티스 프레임워크는 ID 채번 문제로 대용량 Insert(bulk)를 수행하지 못한다.

이번 프로젝트에서는 MyBatis를 사용하고 있어서 bulk insert를 위한 다양한 내용들을 고려할 수 있었다. 

우선 Mybatis에서 Bulk Insert 성능 향상을 꾀하며 검색하다보면 가장 먼저 발견할 수 있는 옵션이 있다.

```kotlin
return SqlSessionTemplate(sessionFactory, ExecutorType.BATCH)
```

SqlSessionTemplate을 생성할 때 두 번째 인자로 ExecutorType을 지정할 수 있는데, 이 옵션을 Batch로 주면 어느정도 성능 향상을 기대할 수 있다. 

ExcutorType을 Batch로 주면 어떤 이점이 있을까?

SqlSessionTemplate의 ExcutorType 기본값은 Simple이다. Simple mode에서는 Insert 쿼리가 여러 개 실행될 때 매번 preparedStatement 라는 Connection 인스턴스를 새로 가져와 처리한다. 

### ExecutorType.SIMPLE

이 옵션은 실행마다 새로운 PreparedStatement 를 생성한다.

### ExecutorType.REUSE

얻어진 PreparedStatement 를 재사용한다.

### ExecutorType.BATCH

이 옵션은 모든 update 구문을 처리하고 SELECT 구문이 실행될 경우 경계를 표시한다.

즉, 이 옵션을 Batch로 주게되면 하나의 preparedStatement를 가져와서 여러 개의 Insert 쿼리를 실행한다.

이를 통해 preparedStatement를 가져올 때 발생하는 비용을 줄이고 수행시간을 줄일 수 있다.

하지만 이 방법만으로는 충분하지 않다. 10k가 넘어가는 쿼리를 같은 session에서 처리한다고 해도 실제로는 하나 하나 수행되기 때문에 수행시간은 너무 길어질 수 있다. 

두번째 방법은 xml query를 튜닝하는 것이다.

```java
    @Test
    public void testBatchService() {
        List<Product> productList = new ArrayList<Product>();
        for (int i = 0; i < 10000; i++) {
            productList.add(new Product("2227testBatchService" + i));
        }
        try {
            iLostProductService.insertProductList(productList);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

```

```xml
 <insert id="insertProductList">
    insert into product (<include refid="baseSql"></include>) values 
    <foreach collection="productList" item="product" separator=",">
        (#{product.name})
    </foreach>
</insert>
```

위 방법으로 수행하면 sql 쿼리 자체를 bulk 쿼리로 만들어서 수행할 수 있다. 

두번째 방법은 첫번째 방법에 비해서 확실한 성능 향상을 기대할 수 있다. 하지만 쿼리 하나가 너무 길게 작성된다면 메모리 부족으로 Application이 죽을 위험이 있다.

마지막 방법은 MySQL Connector의 옵션을 사용하는 방법이다.

MySQL CONNECTOR에서는 rewriteBatchedStatement라는 옵션을 제공한다.


```
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/lof?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true&useSSL=false&serverTimezone=GMT&rewriteBatchedStatements=true
```

url에다가 rewriteBatchedStatements 옵션을 추가하면 아래와 같이 단건(single statement)을 입력하고 수행해도 mysql connector 레벨에서 두번째 방법처럼 bulk query 문으로 바꿔서 수행해준다.

```JAVA
   @Test
    public void testBatchExcutorService() {
        SqlSession sqlSession = null;
        try {
            sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH);
            ProductDao batchProductDao = sqlSession.getMapper(ProductDao.class);
            for (int i = 0; i < 10000; i++) {
                batchProductDao.insertProduct(new Product("2047testBatchExcutorService" + i));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.commit();
            sqlSession.close();
        }
    }
```

```xml
 <insert id="insertProduct" parameterType="com.team.lof.model.Product">
    insert into product (<include refid="baseSql"></include>) values (#{name})
</insert>
```

일반적으로 마지막 방법이 가장 좋은 성능을 나타낸다고 알려진다. 

두번째 방법과 큰 차이는 없어보이지만, 어플리케이션 비즈니스 로직에서 만들어지는 foreach 구문의 성능이 그렇게 좋지 못하고, 이로 인한 압축률 문제가 존재한다.

두번째, 세번째 방법 모두 배치 사이즈가 너무 커지면 메모리 이슈에서 비롯된 퍼포먼스 감소 문제가 발생할 수 있다.

너무 크게 배치 사이즈를 설정하지 말고, 500~1000 단위의 배치사이즈로 조절한다면 세번째 방법을 쓰는게 가장 좋다.

