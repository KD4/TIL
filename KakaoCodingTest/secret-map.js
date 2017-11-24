function secretMap(arr1, arr2) {
    var results = [];

    arr1.forEach((e, i) => {
        // 두 배열 중에 1이 하나라도 있으면 벽 이므로 비트 연산자 OR를 이용
        results.push(e | arr2[i]);
    })

    return results;
}

// 숫자로 된 지도를 이진수를 "#"과 공백으로 표현한 지도로 변환
function convertCodeToMap(arr) {
    return arr.map(e => {
        //JS에는 replaceAll이 없으므로 정규식을 이용해서 구현
        return e.toString(2).replace(/1/gi, "#").replace(/0/gi, " ");
    });
}

// 예제 값
var arr1 = [46, 33, 33 ,22, 31, 50];
var arr2 = [27 ,56, 19, 14, 14, 10];

// 정답 출력
console.log(convertCodeToMap(secretMap(arr1, arr2)));
