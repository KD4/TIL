// Given an array of numbers nums, 
// in which exactly two elements appear only once and all the other elements appear exactly twice. 
// Find the two elements that appear only once.

// Example:
// Input:  [1,2,1,3,2,5]
// Output: [3,5]

class Solution {
    /*
    * XOR 연산을 이어가면 같은 원소가 등장했을 때 상쇄된다.
    * 마지막 남은 원소는 한번만 등장한 원소들을 XOR한 값이다. 
    * 두 숫자는 다른 숫자이기 때문에 무조건 한 원소는 비트가 1이다.
    * 비트가 1인 값의 위치를 가지고 원소들을 두 그룹으로 나눈다.
    * 해당 비트가 1인 그룹, 0인 그룹
    * 두 그룹을 XOR 연산한다.
    * 마지막으로 남은 두 수가 한번씩 등장하는 수이다.
    */
    public int[] singleNumber(int[] nums) {
        int ret = 0;
        int targetIndex = 0;
        for(int num: nums) {
            ret ^= num;
        }
        
        for (int i = 0; i < 32; i++) {
            // 원하는 비트 인덱스만큼 오른쪽으로 쉬프트하면 해당 비트가 첫번째로 이동하게 된다. 
            // 이 비트는 1과 AND 연산을 하면 나머지 비트는 피연산자 비트가 모두 0이므로 0으로 셋팅.
            // 해당 비트는 1과 AND 연산을해서 1이면 1, 0이면 0을 리턴
            if (((ret>>i) & 1) == 1) {
                targetIndex = i;
                break;
            }
        }
        
        int xor1 = 0;
        int xor2 = 0;
        for(int num: nums) {
            if (((num>>targetIndex) & 1) == 1) {
                xor1 ^= num;
            } else {
                xor2 ^= num;
            }
        }
        
        return new int[]{xor1, xor2};
    }
}