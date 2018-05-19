파이썬 2와 3의 차이
=============================================

1. 파이썬 3에서는 모든 변수가 객체(object)로 처리됨

2. int 나누기 결과가 float
#### Python 2
```python
print( 1/2 )
print( type(1/2) )
# 0
# <type 'int'>
```
#### Python 3
```python
print( 1/2 )
print( type(1/2) )
# 0.5
# <class 'float'>
```

3. print문 괄호 필수
#### Python 2
```python
print( 'hello' )
# hello
print 'hello'
# hello
```
#### Python 3
```python
print( 'hello' )
# hello
print 'hello'
# Error! invalid syntax
```

4. str과 unicode 통일
#### Python 2
```python
print( type('hello') )
print( type(u'hello') )
# <type 'str'>
# <type 'unicode'>
```
#### Python 3
```python
print( type('hello') )
print( type(u'hello') )
# <class 'str'>
# <class 'str'>
```
모든 문자열은 유니코드인 str

5. long → int로 통일
#### Python 2
```python
print( 2**30 )
print( type(2**30) )
print( 2**100 )
print( type(2**100) )
# 1073741824
# <type 'int'>
# 1267650600228229401496703205376
# <type 'long'>
```
#### Python 3
```python
print( 2**30 )
print( type(2**30) )
print( 2**100 )
print( type(2**100) )
# 1073741824
# <class 'int'>
# 1267650600228229401496703205376
# <class 'int'>
```
