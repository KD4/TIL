function solution(n) {
    var answer = 1;
    let flag = false;

    // for (let last = n; last > 0; last--) {
    //     for (let start = last-1; start > 0; start--) {
    //         if (cal((last - start)+1, start, last) == n) {
    //             answer++;
    //             break;
    //         }
    //     }
    // }

    for (let start = 1; start < n; start++) {
        for (let last = start+1; last < n; last++) {
            let theNumberOf = last - start + 1;
            let result = cal(theNumberOf, start, last);

            if (result > n) {
                break;
            }

            if (result === n) {
                answer++;
                if (theNumberOf === 2) {
                    flag = true;
                }
                break;
            }
        }
        if (flag) {
            break;
        }
    }

    return answer;
}

function cal(n, a, l) {
    return n/2 * (a+l);
}


console.log(solution(15));