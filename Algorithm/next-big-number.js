// 자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의 합니다.

// 조건 1. n의 다음 큰 숫자는 n보다 큰 자연수 입니다.
// 조건 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때 1의 갯수가 같습니다.
// 조건 3. n의 다음 큰 숫자는 조건 1, 2를 만족하는 수 중 가장 작은 수 입니다.
// 예를 들어서 78(1001110)의 다음 큰 숫자는 83(1010011)입니다.

// 자연수 n이 매개변수로 주어질 때, n의 다음 큰 숫자를 return 하는 solution 함수를 완성해주세요.

// 제한 사항
// n은 1,000,000 이하의 자연수 입니다.

function solution(n) {
    if (n == 0) return 0;

    let binaryStr = [... n.toString(2)];

    let flag = false;
    let endIndex = -1;

    // 2진 배열 뒤에서 부터 순회, 낮은 자리 숫자부터 1 군락이 나오는 인덱스를 찾는다.
    for (var i = binaryStr.length-1; i >= 0; i = i-1) {
        if (binaryStr[i] == 1) {
            flag = true;
        }

        if (binaryStr[i] == 0 && flag) {
            endIndex = i+1;
            break;
        }
    }

    // endIndex가 -1이면 가장 큰 자리수가 1임. 
    if (endIndex == -1) {
        endIndex = 0;
    }

    // 올림 대상 인덱스 뒷부분은 reverse 시킨다.
    let tailArray = binaryStr.slice(endIndex+1, binaryStr.length).reverse();

    let headArray = [];

    // 0일 때는 새로운 자릿수가 생기므로 분기를 태운다.
    if (endIndex == 0) {
        binaryStr[endIndex] = 0;
        binaryStr.unshift(1);        
        headArray = binaryStr.slice(0, 2);
    } else {
        binaryStr[endIndex] = 0;
        binaryStr[endIndex-1] = 1;        
        headArray = binaryStr.slice(0, endIndex + 1);
    }

    // 두 배열을 합친다.
    let finalBinary = [...headArray, ...tailArray];

    return parseInt(finalBinary.join(''), 2);
}


console.log(solution(3));