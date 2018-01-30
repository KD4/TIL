

function insertionSort(arr) {
    for (let index = 1; index < arr.length; index++) {
        let target = arr[index];
        let targetIndex = index - 1;
        while (targetIndex >= 0 && arr[targetIndex] > target) {
            arr[targetIndex + 1] = arr[targetIndex];
            targetIndex--;
        }
        arr[targetIndex + 1] = target;    
    };

    return arr;
}

let unsortedArr = [3, 7, 1, 8, 9, 11, 3, 4 ,5];

console.log(insertionSort(unsortedArr));