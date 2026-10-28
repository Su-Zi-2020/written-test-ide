function deepClone(obj, map = new WeakMap) {
    if (obj === null || typeof obj !== 'object') return obj;

    if (map.has(obj)) return map.get(obj);

    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);

    if (obj instanceof Array) {
        let arr = [];
        map.set(obj, arr);
        obj.forEach((item) => {
            arr.push(deepClone(item, map));
        })
        return arr;
    }
    else {
        let res = {};
        map.set(obj, res);
        for (const item of Object.keys(obj)) {
            res[item] = deepClone(obj[item], map);
        }
        return res;
    }


};


let p1 = 'p1';
let p2 = 123;
let p3 = [1, 3, 5];
let p4 = {
    a: 'A',
    b: 'B',
    obj: {
        name: 'OBJ'
    }
};
let p5 = null;
let p6 = undefined;
p4.obj.self = p4;

let test = p4;
const res1 = test;
const res2 = deepClone(test);
console.log('res1', res1 === test, 'res2', res2 === test)


