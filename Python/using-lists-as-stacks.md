Using List as Stacks
=============================

파이썬의 리스트 API를 이용해서 리스트를 스택으로 이용할 수 있다. 

LIFO 자료구조로 데이터를 넣을 때 append(), pop()으로 사용한다.

```python
>>> stack = [3, 4, 5]
>>> stack.append(6)
>>> stack.append(7)
>>> stack
[3, 4, 5, 6, 7]
>>> stack.pop()
7
>>> stack.pop()
6
>>> stack
[3, 4, 5]
```