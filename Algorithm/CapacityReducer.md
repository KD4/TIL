공장 효율화
========================

```java
public static int redCapa(List<Integer> model) {

    int ceilingValue = (int) Math.ceil(model.size() / 2);
    Map<Object, Long> numOfGenerators = model.stream().collect(Collectors.groupingBy(o -> o, Collectors.counting()));

    int generatorsToBeDown = 0;
    int models = 0;
    for (Long i : numOfGenerators.values().stream().sorted((o1, o2) -> -1 * o1.compareTo(o2)).collect(Collectors.toList())) {
        generatorsToBeDown += i;
        models++;
        if (generatorsToBeDown > ceilingValue) {
            break;
        }
    };

    return models;
}
```