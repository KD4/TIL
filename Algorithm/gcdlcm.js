// 두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환해주는 gcdlcm 함수를 완성해 보세요. 
// 배열의 맨 앞에 최대공약수, 그 다음 최소공배수를 넣어 반환하면 됩니다. 
// 예를 들어 gcdlcm(3,12) 가 입력되면, [3, 12]를 반환해주면 됩니다.

function getG(a, b) {
    var left = -1;
    // a와 b 중 작은 수로 큰 수를 나누고 나누고 나머지를 구한다.
    var greatest = a > b ? b : a;

    // 작은 수로 큰 수를 나누고 나머지를 구한다.
    var left = greatest === a ? b % a : a % b;

    while (left !== 0) {
        // 나머지가 1이 나오면 공약수는 없다.
        if (left === 1) return 1;
        // 나머지가 0이 아니면 그 전 나머지를 나머지로 나누고 나머지를 구한다.
        var tmp = left;
        left = greatest % left;
        greatest = tmp;
    }
    // 나머지가 0이 될 때까지 반복하고. 0이면 바로 직전 나머지가 최대 공약수이다.
    return greatest;
}

function getL(G, a, b) {
    return G * (a / G) * (b / G);
}

function gcdlcm(a, b) {
    var answer = [];
    answer[0] = getG(a, b);
    answer[1] = getL(answer[0], a, b);
    return answer;
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log(gcdlcm(3,12));