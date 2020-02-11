xargs
=====================================

Linux와 Unix에서 사용하는 명령어로 표준 출력을 입력으로 받아 다음 Command에 인자로 넘겨주는 역할을 한다. 

예를 들어 아래 명령어는 `git branch | grep 'IXP'` 나온 `IXP`로 시작하는 브랜치 목록을 모두 받아서 `git branch -d` 의 인자로 제공한다.

```bash
$ git branch | grep 'IXP' | git branch -d
```

다른 예제도 살펴보자.

## Example 1

rm 명령어를 사용해서 많은 파일을 제거하려고 인자로 긴 리스트를 제공하면 `Argument list too long` 에러를 뱉는다. 이때 xargs를 사용하여 문제를 해결할 수 있다. 

```bash
$ find --name '*.log' -pring0 | xargs -0 rm -f
```

## Example 2

/etc 폴더에서 *.conf 파일 목록을 얻은 후 이 리스트를 다른 명령어에 인자로 사용하는 예제

```bash
$ find /etc --name '*.conf' | xargs ls -l
```

