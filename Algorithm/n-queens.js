
// default N value is 4
const N = process.argv[2] ? Number(process.argv[2]) : 4;

let cols = new Array();

function promising(level) {
    for (let i = 1 ; i < level ; i++) {
        if (cols[i] === cols[level] || 
            cols[i] + (level - i) === cols[level] || 
            cols[i] - (level - i) === cols[level]) {
            return false;
        }
    }
    return true;
}

function queens(level) {
    if(!promising(level)) {
        return false;
    } else if(level === N) {
        return true;
    } else {
        for(let i = 1; i <= N ; i++) {
            cols[level+1] = i;
            if (queens(level+1)) {
                return true;
            }
        }
        return false;
    }
}

queens(0) ? console.log(cols) : console.log("there is no answer.");