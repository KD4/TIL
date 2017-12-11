# Docker GC

Docker 기반으로 서비스를 하게되면 빌드 서버에 docker 이미지가 차곡차곡 쌓이게된다.

사용하지 않는 Docker 이미지를 삭제해줘야한다.

나는 그냥 cron 잡을 하나 만들었다.

- ansible-playbook에 원격서버에 cron job을 등록할 수 있는 playbook을 추가
- 0 4 * * * : docker rm $(docker ps -a -q); docker rmi $(docker images -a -q)
