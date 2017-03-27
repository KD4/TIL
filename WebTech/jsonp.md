# JSONP (json with padding)

```
전통적인 웹 브라우져에서는 same-origin policy (SOP) 정책에 따라 다른 도메인간의 request을 제한하고 있다.

그러나 <script/> 태그는 same-origin-policy (SOP) 정책에 속하지 않는다는 사실을 근거로,

서로 다른 도메인간의 javascript 호출을 위하여 jsonp (또는 json with padding) 이 사용되었다.
```

```
jsonp를 사용하기 위해서는 필수적으로 서버단에서 jsonp의 포맷을 따라야한다. 이것은 jsonp를 사용하기 위한 “규칙”이다.
```

## JSONP의 원리
jsonp의 원리를 설명하기 전에 먼저 json의 형태를 살펴보자. 아래는 일반적인 json의 코드이다.

```javascript
{
    data : 'data1',
    data2 : 'data2',
    ary_data : ['1', '2', '3', '4']
}
```

javascript에서 “{ }” 문법은 객체 리터럴 이다. 즉 위의 코드는 객체를 정의하기 위한 코드이다. json은 객체를 정의하기 위한 문법이라고 볼 수 있다. 아래의 json response 를 받는 일반적인 jQuery ajax 을 살펴보자.

```javascript
$.ajax({
    url : 'http://seotory.com/result.json',
    type : 'json'
}).done(funcntion(data){
    // data 는 json 포맷 타입을 받게 된다.
});
```

위의 코드에서 response로 받는 것은 json 포맷 -> 객체를 받는 것이다. 그러면 $.done() 함수 안에서 function(data){} 라는 익명 함수(callback 함수라고 볼 수 있음)가 data객체를 바탕으로 무엇인가 output 을 만들어 내게 된다. 이런 경우는 SOP 정책에 위배되지 않은 매우 일반적인 브라우져간 XMLHttpRequest 통신이라고 볼 수 있다.

하지만 http://seotory.com/test.js 에서 호출 하는 ajax 가 seotory.com/result.json 이 아닌 seotest.com/result.json 의 데이터를 한다면? SOP 정책에 걸려서 데이터를 가져오지 못할 것이다. 어떻게 호출해야 할까?

답은 이미 위에 적혀있다. <script/> 태그를 이용하는 것이다.

```javascript
<script type="text/javascript" src="http://seotest.com/result.json"></script>
```

위의 코드를 html에 선언하면 정상적으로 json URL을 호출 할 것이다. 그러나 result.json 안에 있는 코드는 객체를 정의하는 코드이지 실행 코드가 아니다. 이 말인즉 위의 코드를 실행 코드로 바꿔주기만 하면 도메인이 달라도 SOP 정책을 벗어나 자유로운 javascript 함수 호출이 가능해 진다는 뜻이다. result.json 코드를 이제 아래와 같이 바꿔보자.

```javascript
callback({
    data : 'data1',
    data2 : 'data2',
    ary_data : ['1', '2', '3', '4']
})
```
avascript 에서 “( )” 은 실행 구문이다. 즉 위의 코드는 callback() 이라는 함수를 실행 시키는 구문이다. 잘 보면 argument 로 객체 리터럴(result.json 의 내용)을 사용하고 있음을 볼 수 있다.

```javascript
<script type="text/javascript" src="http://seotest.com/result.json"></script>
<script>
function callback( data ) {
    // data 는 result.json 의 데이터가 들어오게 된다.
}
</script>
```

위의 소스처럼 callback 이라는 함수를 만들면, seotest.com/result.json 는 선언된 callback 함수를 호출하게 될것이다. 다른 도메인이라고 할지라도 문제 없이 json 데이터를 사용하게 되는 것이다. 사실 jsonp는 이것이 다다.
