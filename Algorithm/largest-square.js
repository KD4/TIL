// 1와 0로 채워진 표(board)가 있습니다. 표 1칸은 1 x 1 의 정사각형으로 이루어져 있습니다. 표에서 1로 이루어진 가장 큰 정사각형을 찾아 넓이를 return 하는 solution 함수를 완성해 주세요. (단, 정사각형이란 축에 평행한 정사각형을 말합니다.)
function solution(board) {
    let longestSideLength = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] != 0) {
                let x = ((i-1) > -1) ? board[i-1][j] : 0;
                let xy = ((i-1) > -1 && (j-1) > -1) ? board[i-1][j-1] : 0;
                let y = ((j-1) > -1) ? board[i][j-1] : 0;
                board[i][j] = Math.min(x, xy, y) + 1;
                longestSideLength = Math.max(board[i][j], longestSideLength);
            }
        }
    }
    return Math.pow(longestSideLength, 2);
}

// test case
console.log(solution([[0, 0, 1, 1], [1, 1, 1, 1]]));