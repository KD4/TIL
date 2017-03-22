# github webhook

## webhook이란?

 웹 서비스를 제공해주는 서버 단에서 어떤 이벤트를 외부에 전달하는 방법 중 하나.

 예를 들어 어떤 게시판을 제공하는 서비스가 있다고 할 때, 게시판에 새로운 글이 등록될 때마다 특정 알림을 다른 서비스나 메신저에 알리려고 할 때 유용하게 사용될 수 있습니다.

## Github webhook

 Github의 후크는 일반적인 API와는 반대 방향으로 작동합니다. 보통 API는 호출되면 어떤 정보를 돌려주지만, 후크는 등록이 되어있으면 어떤 이벤트가 발생할 때 거꾸로 깃허브에서 내가 등록한 Webhook URL로 정보를 돌려줍니다.

 아래는 후킹을 발생할 수 있는 깃헙 이벤트 리스트입니다.

- push : 저장소에 푸쉬가 들어왔을 때 발생. 기본 이벤트
- issues: 이슈가 열리거나 닫혔을 때 발생.
- issue_comment: 이슈에 코멘트가 달렸을 때 발생.
- commit_comment: 커밋에 코멘트가 달렸을 때 발생.
- create: 저장소나 브랜치, 태그가 추가되었을 때 발생.
- delete: 브랜치나, 태그가 삭제되었을 때 발생.
- pull_request: 풀리퀘스트가 열리거나 닫혔을 때, 동기화 되었을 때 발생.
- pull_requestreview_comment: 풀리퀘스트 리뷰 안의 커밋에 커멘트가 달렸을 때.
- gollum: 위키가 업데이트되었을 때 발생.
- watch: 사용자가 저장소를 와치했을 때 발생.
- release: 릴리즈가 추가되었을 때 발생.
- fork: 저장소가 포크되었을 때 발생.
- member: Organization의 저장소가 아닐 때 멤버가 추가되면 발생.
- public: 저장소가 비공개에서 공개로 전환되었을 때 발생.
- team_add: 저장소에 팀이 추가되었거나 변경되었을 때 발생.
- status: API를 통해 커밋의 상태가 변경되었을 때 발생.
- deployment: API를 통해 저장소의 새로운 배포가 생성되었을 때 발생.
- deployment_status: API를 통해서 저장소의 특정 배포의 상태가 변경되었을 때 발생.

각 이벤트가 발생했을때, webhook_URL로 보내주는 내용은 [Event_Type](https://developer.github.com/v3/activity/events/types/#deploymentevent) 에서 확인할 수 있습니다.

## 저장소에 웹훅 등록하기

- 깃헙 저장소에 웹 훅을 등록하기 위해서는 저장소 관리 권한이 있어야합니다.
- 저장소 관리 권한이 있는 repository에 들어가서 Setting에 Hooks & services 메뉴를 클릭합니다.
- Webhook URL을 등록해서 특정 이벤트가 발생했을 때 데이터를 받을 URL을 등록할 수 있습니다.
- Services 탭에서 웹훅과 연동되는 서비스들을 설정할 수 있습니다.
