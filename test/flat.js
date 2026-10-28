function myflat(arr, depth = 1) {
    let res = [];
    function flat(arr, depth) {
        depth--;
        for (const item of arr) {
            if (Array.isArray(item) && depth >= 0) {
                flat(item, depth)
            }
            else res.push(item);
        };
    }
    flat(arr, depth);
    return res;
}

const arr = [1, 2, [3, 4, [4, 6]], [6, 7], 5];
const res = myflat(arr);
console.log(res)