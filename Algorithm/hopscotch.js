function solution(land) {

    let accum = [...land[0]];

    for (let index = 1; index <= land.length-1; index++) {
        const prevAccum = [...accum];
        land[index].forEach((e, i) => {
            let tmp = [...prevAccum];
            tmp.splice(i, 1);
            let maxScore = Math.max(...tmp);
            accum[i] = e + maxScore;
        });
        console.log(accum);
    }

    return Math.max(...accum);
}

console.log(solution([[1, 4, 3, 5], [55, 60, 67, 11], [4, 3, 2, 5], [4, 3, 2, 5], [8,2,1,5]]));