// 정사각형 2차원 배열 형태의 MAP이 주어졌을 때 왼쪽 맨위 꼭지점에서 오른쪽 맨 아래 꼭지점까지 경로가 있는지 구하시오.

const MAP = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 1, 1],
    [0, 1, 0, 1, 1],
    [0, 0, 0, 0, 0],
];


const PATHWAY = 0;
const WALL = 1;
const PATH = 2;
const BLOCKED = 3;

function findPath(map, x, y) {
    // 좌표 x, y map의 범위를 벗어났으면 출구가 아니다.
    if ( x < 0 || y < 0 || x >= map.length || y >= map.length ) {
        return false;
    // 좌표 xy가 pathway가 아니면 출구가 아니다. 
    } else if ( map[x][y] > 0 ) {
        return false;
    // 현재 위치가 출구이거나
    } else if ( x === map.length-1 && y === map.length-1) {
        map[x][y] = PATH;
        return true;
    // 현재 위치의 인접 위치들에서 출구까지 가는 경로가 있으면 된다.
    } else {
        map[x][y] = PATH;
        if (findPath(map, x, y-1) || findPath(map, x, y+1) || findPath(map, x-1, y) || findPath(map, x+1, y)) {
            return true;
        }
        map[x][y] = BLOCKED;
        return false;
    }
}

let tempMap = Object.assign([], MAP);

findPath(tempMap,0,0) ? console.log(tempMap) : console.log('there is no exit');