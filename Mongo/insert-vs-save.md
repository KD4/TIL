insert와 save 차이
=====================

insert와 save 함수 둘 다 매개변수로 받은 document를 collection에 저장한다는 기능은 똑같다.

하지만 저장하려는 document에 `_id` 가 주어졌다면 다르게 동작한다.

mongodb의 insert()는 `_id`의 duplicate 체크를 진행하지만, save()는 동일 id값이 들어오면 update를 한다.

그리고 save() 함수 변경시 변경/추가 여부를 결과값으로 알려준다.
