[자바스크립트] 브라우저 종류 및 버전 체크
======================================================


접속자의 브라우저 종류 및 (익스플로러의 경우) 버전을 체크하는 자바스크립트 함수 입니다.


```javascript
//@ myeonguni.com @
		// 접속 브라우저를 확인합니다(html5 지원하지 않을 경우 경고문을 출력하기 위해 사용)
		function isBrowserCheck(){
			var agt = navigator.userAgent.toLowerCase();
			if (agt.indexOf("chrome") != -1) return 'Chrome';
			if (agt.indexOf("opera") != -1) return 'Opera';
			if (agt.indexOf("staroffice") != -1) return 'Star Office';
			if (agt.indexOf("webtv") != -1) return 'WebTV';
			if (agt.indexOf("beonex") != -1) return 'Beonex';
			if (agt.indexOf("chimera") != -1) return 'Chimera';
			if (agt.indexOf("netpositive") != -1) return 'NetPositive';
			if (agt.indexOf("phoenix") != -1) return 'Phoenix';
			if (agt.indexOf("firefox") != -1) return 'Firefox';
			if (agt.indexOf("safari") != -1) return 'Safari';
			if (agt.indexOf("skipstone") != -1) return 'SkipStone';
			if (agt.indexOf("netscape") != -1) return 'Netscape';
			if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
			if (agt.indexOf("msie") != -1) { // 익스플로러 일 경우
				var rv = -1;   	
				if (navigator.appName == 'Microsoft Internet Explorer') {        
					var ua = navigator.userAgent;   
					var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");  
					if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);    
				}
				return 'Internet Explorer '+rv;
			}
		}


<script>
	if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
		var rv = 0;
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
		if (rv != 0 && rv <= 8) {
			alert("Internet Explorer 10 부터 지원합니다.\n Internet Explorer를 업그레이드 해주세요.");
		}
	}
</script>
```

출처: http://myeonguni.tistory.com/1395 [명우니닷컴]
