function mycurry(fn, ...args) {
    if (args.length >= fn.length) {
        return fn(...args);
    }

    return function (...args2) {
        return mycurry(fn, ...args, ...args2);
    }
};


function greet(A, B, C) {
    console.log('A:', A, 'B:', B, 'C:', C)
}

const p1 = mycurry(greet, 'a',);
console.log('p1', p1);
const p2 = p1('b');
console.log('p2', p2);
const p3 = p2('C');
console.log('p3', p3);