
// 올바른 괄호란 두 개의 괄호 '(' 와 ')' 만으로 구성되어 있고, 괄호가 올바르게 짝지어진 문자열입니다. 괄호가 올바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 합니다.
// 예를들어

// ()() 또는 (())() 는 올바른 괄호입니다.
// )()( 또는 (()( 는 올바르지 않은 괄호입니다.
// '(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고, 올바르지 않은 괄호이면 false를 return하는 solution 함수를 완성해 주세요.

function solution(s){
    var opendStack = [];

    s.split("").forEach(element => {
        if (element === "(") {
            opendStack.push(element);
        }

        if (element === ")") {
            if (opendStack.length > 0) {
                opendStack.pop();
            } else {
                return false;
            }
        }
    });

    if (opendStack.length > 0) {
        return false;
    }
    
    return true;
}

console.log(solution("(())()"));

