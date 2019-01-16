// 백트래킹
// 조건에 맞는 모든 경우를 찾고싶을 때, 
// 각 스텝마다 모든 경우를 찾으면서 전진하고 더이상 찾을 경우가 없을때 후퇴

// Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string.  Return a list of all possible strings we could create.

// Examples:
// Input: S = "a1b2"
// Output: ["a1b2", "a1B2", "A1b2", "A1B2"]

// Input: S = "3z4"
// Output: ["3z4", "3Z4"]

// Input: S = "12345"
// Output: ["12345"]


class latterCasePermututation {
    public List<String> letterCasePermutation(String s) {
        char[] arr = s.toCharArray();
        List<String> ret = new ArrayList();
        backtrack(arr, ret, 0);
        return ret;
    }

    public void backtrack(char[] arr, List<String> ret, int idx) {
        if (arr.length == idx) {
            ret.add(new String(arr));
        } else {
            char c = arr[idx];
            if (isAlpha(c)) {
                arr[idx] = Character.toLowerCase(c);
                backtrack(arr, ret, idx+1);
                arr[idx] = Character.toUpperCase(c);
                backtrack(arr, ret, idx+1);
            } else {
                backtrack(arr, ret, idx+1);
            }
        }
    }
    public boolean isAlpha(char c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    }
}