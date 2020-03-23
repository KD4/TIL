반시계 방향 달팽이 배열 탐색
===================================

## Problem
n * n 배열이 주어졌을 때 해당 배열을 반시계 방향으로 달팽이 탐색하는 코드를 작성하라.

## Example
```
1  2  3  4
5  6  7  8
9 10 11 12
13 14 15 16
```
=> 1 5 9 13 14 15 16 12 8 4 3 2 6 10 11 7

## Solution

배열 탐색 index의 규칙성을 찾아야한다.

x = 0, y = 0

1단계 : (x, y)에서 (x + x.length, y) 에서 row index를 +1씩하며 4개 탐색 // x = 3, y = 0

2단계 : (x, y + 1)부터 y를 +1씩 하며 3개 탐색 // x = 3, y = 3

3단계 : (x - 1, y)부터 x를 -1씩 하며 3개 탐색 // x = 0, y = 3

4단계 : (x, y - 1)부터 y를 -1씩 하며 2개 탐색 // x = 0, y = 1

5단계 : (x + 1, y)부터 x를 +1씩 하며 2개 탐색 // x = 2, y = 1

6단계 : (x, y + 1)부터 y를 +1씩 하며 1개 탐색 // x = 2, y = 2

7단계 : (x - 1, y)부터 x를 -1씩 하며 1개 탐색 // x = 1, y = 2

1단계를 제외하고 (배열 모서리 길이 - 1)번 부터 시작하여 각 행, 열을 한번씩 탐색하되 배열 인덱스 증감은 행, 열 중간에 한번씩 부호가 바뀐다.

```java
public class AntiClockwise {


    public static void travelAntiClockwise(int[][] target) {

        int threshold = target.length;

        for (int i = 0; i < threshold; i++) {
            System.out.print(target[i][0] + " ");
        }

        int row = threshold-1, col = 0;
        int reverseFlag = 1;
        threshold--;

        while(threshold > 0) {
            for (int i = 1; i <= threshold; i++) {
                col = col + reverseFlag;
                System.out.print(target[row][col] + " ");
            }
            reverseFlag = reverseFlag * -1;
            for (int j = 1; j <= threshold; j++) {
                row = row + reverseFlag;
                System.out.print(target[row][col] + " ");
            }
            threshold--;
        }
    }

    public static void main(String[] args) {
        int[][] tmp = new int[5][5];

        for (int i = 0; i < tmp.length; i++) {
            for (int j = 0; j < tmp[i].length; j++) {
                tmp[i][j] =  (j+1) + (i*tmp.length);
            }
        }

        travelAntiClockwise(tmp);
    }
}

```