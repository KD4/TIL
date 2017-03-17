# 맥에서 톰캣 설치


1. Tomcat 다운로드 (http://tomcat.apache.org/download-70.cgi)
  - Binary Distributions 에서 Core 의 tar.gz 버전을 다운 받으면 됨
  - wget http://apache.tt.co.kr/tomcat/tomcat-8/v8.5.12/bin/apache-tomcat-8.5.12.tar.gz

2. 자신의 맥의 Downloads 폴더에 다운이 됐으면 압축 해제를 함.
  - command - tar xvzf apache-tomcat-8.5.12.tar.gz
  - 혹은 압축해제기를 이용하여 압축 헤제

3. 압축해제 된 폴더를 /usr/local 폴더로 옮긴다.
  - sudo ln -s /usr/local/apache-tomcat-8.5.12 /Library/Tomcat
  - 만약 /usr/local 폴더만 없으면, 만들어준다.
  - sudo mkdir -p /usr/local

4. 앞으로 관리를 위해 Library 밑으로 심볼릭 링크를 만들어준다. 만약 Library 밑에 Tomcat 폴더가 있으면 지워준다.
  - sudo rm -f /Library/Tomcat
  - sudo ln -s /usr/local/apache-tomcat-7.0.37 /Library/Tomcat

5. Tomcat 폴더의 밑의 소유주를 해당 유저로 바꿔준다.
  - sudo chown -R <your username> /Library/Tomcat

6. Tomcat 폴더 밑의 bin 폴더의 쉘들을 실행가능 하게 권한을 준다.
  - sudo chmod +x /Library/Tomcat/bin/*.sh

7. Tomcat 실행
  - sudo sh /Library/Tomcat/bin/catalina.sh start

8. 톰캣 확인
  - open http://localhost:8080
