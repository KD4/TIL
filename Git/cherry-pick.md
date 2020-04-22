git cherry pick
=================================

git cherry pick은 다른 브랜치의 커밋을 현재 브랜치에 반영하기 위한 커맨드이다. 

```bash
$ git cherry-pick <hash_1> <hash_2>
```

예를 들어 아래와 같은 브랜치 구조가 있다고 가정해보자.

```
   /--0----2----4 // Branch Y
--------1-----3----5 // Branch X
```

현재 작업 브랜치는 Branch X이다. HEAD가 Branch X인 상황에서 Branch Y의 0, 2 커밋 변경사항을 Branch X에 반영하고 싶은 니즈가 생겼을 때 0, 2 변경 사항을 일일히 현재 브랜치에 복사 붙여넣기 하는 대신 cherry pick 을 사용해볼 수 있다. 

0, 2 브랜치를 체리 픽 해보자.

```bash
$ git cherry-pick 0 2
```

```
   /--0----2----4 // Branch Y
------0-1--2--3----5 // Branch X
```

그럼 위와 같이 Branch X에 0, 2 커밋이 반영된다.


## 충돌 발생

 cherry-pick을 실행하면 기존 코드와 충돌이 발생하는 경우가 있다. 이런 경우 사용할 수 있는 옵션은 두 가지가 있다.

### --continue

Conflict를 해결하고 cherry-pick을 진행한다.

Conflict를 해결하기 위해 코드를 수정하고 아래와 같은 흐름으로 진행한다.

```
$ git add <path>
$ git cherry-pick --continue
```

### --abort

git cherry-pick --abort로 충돌 발생 시 cherry-pick 이전 상태로 복원한다. 