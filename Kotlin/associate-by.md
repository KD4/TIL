# Kotlin 표준 라이브러리 - Sequences.associateBy

associate: 관련되다.

```java
inline fun <T, K> Sequence<T>.associateBy(
    KeySelector: (T) -> K
): Map<K, T>(source)
```

시퀀스한 객체에서 keySelector로 키를 만들고 각 요소들을 값으로 가지는 맵을 반환한다.

만약 KeySelector가 같은 K 값을 반환한다면, 마지막 요소가 덮어쓴다.

반환된 맵 객체는 기존 시퀀스한 객체의 요소 순서를 지킨다.

associateBy 함수 두번째 파라미터로 valueTransform을 줄 수 있다.

```java
inline fun <T, K> Sequence<T>.associateBy(
    keySelector: (T) -> K,
    valueTransform: (T) -> V
): Map<K, T>(source)
```
