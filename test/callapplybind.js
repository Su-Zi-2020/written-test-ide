Function.prototype.mycall = function (obj, ...args) {
    obj.fn = this;
    const res = obj.fn(...args);
    delete obj.fn;
    return res;
};

Function.prototype.myapply = function (obj, args) {
    obj.fn = this;
    const res = obj.fn(...args);
    delete obj.fn;
    return res;
}

Function.prototype.mybind = function (obj, ...args) {
    const fn = this;
    function newFn(...args2) {
        const isNew = this instanceof newFn;
        return fn.call(isNew ? this : obj, ...args, ...args2);
    }
    newFn.prototype = fn.prototype;
    return newFn;
}





function greet(greeting, punctuation) {
    return greeting + ', ' + this.name + punctuation
}
const p2 = { name: 'p2' }
// console.log(greet.mycall(p2, '你好', '!'));
// console.log(greet.myapply(p2, ['你好', '!']));

const p3 = greet.mybind(p2);
console.log(p3('你好', '!'));

const p4 = greet.mybind(p2, '你好');
console.log(p4('!'));

