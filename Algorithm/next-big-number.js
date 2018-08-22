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

    let binN = [... n.toString(2)];

    let flag = false;
    let endIndex = -1;
    let startIndex = -1;

    for (var i = binN.length-1; i >= 0; i = i-1) {
        if (binN[i] == 1) {
            flag = true;
        }

        if (binN[i] == 0 && flag) {
            endIndex = i+1;
            break;
        }
    }

    if (endIndex == -1) {
        endIndex = 0;
    }

    let tailArray = binN.slice(endIndex+1, binN.length).reverse();

    let headArray = [];
    if (endIndex == 0) {
        binN[endIndex] = 0;
        binN.unshift(1);        
        headArray = binN.slice(0, 2);
    } else {
        binN[endIndex] = 0;
        binN[endIndex-1] = 1;        
        headArray = binN.slice(0, endIndex + 1);
    }

    let finalArray = [...headArray, ...tailArray];

    return parseInt(finalArray.join(''), 2);
}


console.log(solution(3));