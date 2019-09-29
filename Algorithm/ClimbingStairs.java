// @See https://leetcode.com/problems/climbing-stairs/
// 다이나믹 프로그래밍은 결국 메모이제이션 기법을 쓴다는 얘기다.
// 중간 중간 결과값을 써놨다가 나중에 써먹겠다. 결국엔 시간복잡도를 줄이겠다.
// 다이나믹 프로그래밍을 풀 때는 점화식을 찾아야한다.
// 점화식 - f(n) = f(n-1)+f(n-2)
class Solution {
    public int climbStairs(int n) {
        if (n<=0) return 0;
        if (n<=1) return 1;
        int[] d = new int[n+1];
        d[1] = 1;
        d[2] = 2;
        for (int i = 3; i <=n; i++) {
            d[i]=d[i-1]+d[i-2];
        }
        return d[n];    
    }
}