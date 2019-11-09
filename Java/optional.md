Optional
==================

## Optional 왜 필요해?

Java 8 이전에 optional 없이 Null 체크를 해야한다면 if 문을 통해 일일히 null 여부를 확인하고 처리를 해야했다. 

이렇게 처리하는 Null 체크는 코드 가독성을 엉망으로 만들었고 이 밖에도 Null 여부를 명확하게 알 수 없어서 NPE 위험이 곳곳에 도사리고 있었다.

그래서 Optional이 나왔다.

Optional은 일종의 Stream 처럼 이해하면 쉽다. 값이 아예 없거나 하나 밖에 존재하지않는 wrapper 객체이다. 

Optional을 사용하면 다루는 객체가 Nullable 인가를 알 수 있다. 또한 함수형 처리로 코드 가독성도 높아진다. 

함수형 처리에 필요한 메서드는 아래와 같이 정의되어있다.

## 메소드 상세

#### `empty()`
`Null` 값이 담긴 `Optional` 객체를 반환한다.

#### `of(T value)`
아규먼트로 주어진 Non-null 값으로 `Optional` 객체를 만들어서 반환한다.

#### `ofNullable(T value)`
아규먼트로 non-null 값이 주어진 경우 해당 값으로 만들어진 `Optional` 객체를 반환하고, `null`인 경우 empty Optional를 반환한다.

#### `get()`
`Optional`에 값이 있는 경우, 반환한다. `null`이라면 `NoSuchElementException`을 던진다.

#### `ifPresent()`
값이 존재하면 `true`를 반환한다.

#### `ifPresent(Consumer<? super T> consumer)`
값이 존재한다면 consumer 메소드를 해당 값을 이용해서 실행한다.

#### `filter(Predicate<? super T> predicate)`
값이 존재한다면 아규먼트로 주어진 predicate에 넣어서 조건식을 검사하고 optional을 반환한다.

#### `map(Function<? super T, ? extends U> mapper)`
값이 존재한다면 주어진 함수를 넣어서 실행한다.

#### `flatMap(Function<? super T,Optional<U>> mapper)`
map 결과 나온 optional을 U 제네릭스로 매핑한다.

#### `orElse(T other)`
값이 존재하면 반환하고 없다면 `other`를 반환한다.

#### `orElseGet(Supplier<? extends T> other)`
값이 존재하면 반환하고 그렇지않다면 other를 실행하고 결과값을 반환한다.

#### `orElseThrow(Supplier<? extends X> exceptionSupplier) throws X extends Throwable`
값이 존재하면 반환하고 그렇지않으면 아규먼트로 주어진 supplier가 만든 예외를 던진다.
