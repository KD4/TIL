/*
Given an array of integers, return indices of the two numbers such that they add up to a specific target.
(*indices : index의 복수형)
You may assume that each input would have exactly one solution, and you may not use the same element twice.

정수형 배열이 주어질 때, 더해서 target이 나오는 값의 인덱스 배열을 반환하라.
정답 배열은 하나만 있다고 가정하고 같은 인덱스를 두번 사용해서는 안된다. 
*/
class twoSum {
    /*
    대안 1: brute-force 
    모든 배열을 두번 돌면서 해당 인덱스와 짝인 값을 찾아서 반환
    시간 : O(n^2)
    공간 : O(1)

    대안 2: hash-table
    반복문을 돌면서 해시테이블을 만드는데, 현재 인덱스와 짝인 값이 해시테이블에 있는지 확인하고 있으면 반환
    시간 : O(n)
    공간 : O(n)
    */
    public static int[] twoSum(int[] nums, int target) {

        Map<Integer, Integer> map = new HashMap<Integer, Integer>();

        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(target - nums[i])) {
                return new int[]{map.get(target - nums[i]) , i};
            } else {
                map.put(nums[i], i);
            }
        }

        return null;

    }


    public static void main(String[] args) {
        System.out.println(twoSum.twoSum(new int[]{2, 7, 11, 15}, 9));
    }
    
}