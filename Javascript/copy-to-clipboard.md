# 자바스크립트로 시스템 클립보드 접근하기

IE의 경우 window개체를 통해 window.clipboardData로 접근이 가능하며

다른 브라우저의 경우 copy, cut, paste 이벤트 리스너에 전달되는 event 개체의 clipboardData 속성으로 접근이 가능하다.

사파리나 파폭 같은 경우는 다른 우회 경로를 이용해야한다.

아래는 IE, Chrome 등 여러 브라우저에 대응할 수 있는 예제 코드이다.

```Javascript
function copyToClipboard(targetText) {
  var result;
  var textareaForCopy = document.createElement('textarea');
  textareaForCopy.value = targetText;
  textareaForCopy.style.position = HIDE_ELEMENT_STYLE.position;
  textareaForCopy.style.left = HIDE_ELEMENT_STYLE.left;
  document.body.appendChild(textareaForCopy);
  textareaForCopy.select();


  try {
      if (window.clipboardData) {
          result = window.clipboardData.setData('Text', targetText);
      } else {
          result = document.execCommand('copy');
      }
  } catch (e) {
      result = false;
  }

  document.body.removeChild(textareaForCopy);

  if (result) {
      alert('해당 댓글 주소를 복사했습니다. Ctl + V를 눌러서 확인해주세요.');
  } else {
      prompt('클립보드 복사를 지원하지 않는 브라우져입니다. 주소를 직접 복사해주세요.', targetText);
  }
}
```
