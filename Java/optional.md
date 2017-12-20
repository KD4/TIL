Optional
==================

널이 아닌 값을 관리하기 위한 객체이다. 만약 non-null 객체가 담겨있다면, isPresent() 메소드는 `ture`를 반환하고 get() 메소드는 해당 값을 반환할 것이다.

다른 메소드들도 Optional 객체가 담고있는 객체가 null인지 non-null 값인지에 따라 반환하는 내용이 달라진다.

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
