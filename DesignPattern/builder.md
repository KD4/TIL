# Builder Pattern
Static 팩토리 메소드와 생성자는 선택 가능한 매개변수가 많아질 경우 신축성 있게 처리하지 못한다는 제약이 있습니다.

매개변수가 많은 생성자의 대안으로 텔리스코핑 생성자(telescoping constructor) 패턴과 자바빈즈(JavaBeans)패턴이 있습니다. 텔리스코핑 생성자 패턴은 매개변수의 수가 증가하면 클라이언트 코드 작성이 힘들고 코드의 가독성이 떨어지는 단점이 있고, 자바빈즈 패턴은객체가 일관된 상태를 유지하지 못할 수 있고, 스레드에서 안전성을 유지 하려면 프로그래머의 추가적인 노력이 필요하다는 단점이 있습니다.

그래서 텔리스코핑 생성자 패턴의 안전성과 자바빈즈 패턴의 가독성을 결합한 방법이 나왔는데, 그걸 빌더 패턴이라고 부릅니다.

빌더 패턴은 원하는 객체를 바로 생성하는 대신 클라이언트는 모든 필수 매개변수를 갖는 생성자(또는 static 팩토리 메소드)를 호출하여 빌더 객체를 얻고 그 다음에 빌더 객체의 세터 메소드를 호출하여 필요한 선택 매개변수들의 값을 설정해주는 방식입니다.

```java
    public class NutritionFacts {
        private final int servingSize;
        private final int servings;
        private final int calories;
        private final int fat;
        private final int sodium;
        private final int carbohydrate;
        public static class Builder {
            // 필수 매개변수들
            private final int servingSize;
            private final int servings;
            // 선택 매개변수들 - 디폴트 값으로 초기화 한다.
            private int calories = 0;
            private int fat = 0;
            private int carbohydrate = 0;
            private int sodium = 0;
            public Builder(int servingSize, int servings) {
                this.servingSize = servingSize;
                this.servings = servings;
            }
            public Builder calories(int val) {
                calories = val;
                return this;
            }
            public Builder fat(int val) {
                fat = val;
                return this;
            }

            public Builder carbohydrate(int val) {
                carbohydrate = val;
                return this;
            }

            public Builder sodium(int val) {
                sodium = val;
                return this;
            }

            public NutritionFacts build() {
                return new NutritionFacts(this);
            }
        }

        private NutritionFacts(Builder builder) {
            servingSize = builder.servingSize;
            servings = builder.servings;
            calories = builder.calories;
            fat = builder.fat;
            sodium = builder.sodium;
            carbohydrate = builder.carbohydrate;
        }
    }
```

NutritionFacts는 불변 클래스이며, 모든 매개변수의 디폴트 값을 한군데에 모아 두는데요.

그리고 빌더의 세터 메소드들은 연속적으로 여러 번 호출될 수 있도록 빌더 자신의 객체를 반환합니다.

```java
NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8).calories(100).
                    sodium(35).carbohydrate(27).build();
```

### 장점
- 클라이언트 코드는 작성이 쉽고, 가독성이 좋다.
- 생성자처럼 빌더는 자신의 매개변수에 불변 규칙(invariants)을 적용할 수 있고 build 메소드는 그런 불변 규칙을 검사할 수 있다.
- 여러 개의 가변인자(varargs) 매개변수를 가질 수 있다.
- 유연성이 좋다. 하나의 빌더는 여러 개의 객체를 생성하는데 사용될 수 있으며, 이러한 과정 중에 빌더의 매개변수는 다양하게 조정될 수 있다.
- 매개변수들의 값이 설정된 빌더는 훌륭한 추상 팩토리를 만든다. 즉, 클라이언트 코드에서는 그런 빌더를 메소드로 전달하여 그 메소드에서 하나 이상의 객체를 생성하게 할 수 있다.
```java
public interface Builder<T> {
        public T build();  
    }
```

### 단점
- 어떤 객체를 생성하려면 우선 그것의 빌더를 생성해야 한다. 성능이 매우 중요한 상황에서는 문제가 될 수 있다.
- 빌더 패턴은 텔리스코핑 패턴보다 코드가 길어지므로, 매개변수가 많을 때(4개 이상)만 사용하는 것이 좋다. 그러나 향후에 매개 변수가 추가될 수 있다는 것을 염두에 두자
