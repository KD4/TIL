// 124 나라가 있습니다. 124 나라에서는 10진법이 아닌 다음과 같은 자신들만의 규칙으로 수를 표현합니다.

// 124 나라에는 자연수만 존재합니다.
// 124 나라에는 모든 수를 표현할 때 1, 2, 4만 사용합니다.
// 예를 들어서 124 나라에서 사용하는 숫자는 다음과 같이 변환됩니다.

// 10진법	124 나라	10진법	124 나라
// 1	    1	        6	    14
// 2	    2	        7	    21
// 3	    4	        8	    22
// 4	    11	        9	    24
// 5	    12	        10	    41
// 자연수 n이 매개변수로 주어질 때, n을 124 나라에서 사용하는 숫자로 바꾼 값을 return 하도록 solution 함수를 완성해 주세요.

const mappingList = ["4", "1", "2"];

function solution(n) {
    let awnser = '';
    return convertDecTo124(n, awnser);
}

function convertDecTo124(n, awnser) {

    if (n == 0) {
        return awnser;
    }
    
    let rem = n % 3;

    awnser = mappingList[rem] + awnser;

    let result = (rem === 0) ? parseInt(n / 3) - 1 : parseInt(n / 3);

    return convertDecTo124(result, awnser);
}

console.log(solution(11));


// 3진법 기반으로 접근하면 쉽겠구나라고 생각했는데, 0의 익숙함에 속았네요.
// 124 나라에는 0이 없어요. 나머지가 0이라는 걸 표현할 수 없습니다... 
// 그래서 나머지가 0인 경우, 즉 몫이 3의 배수인 경우에는 끝까지 나누지 못하고 3을 남길 수 밖에 없습니다. 
// 나머지 0일 경우는 3이 남았다는 것, 몫을 하나 빼야함