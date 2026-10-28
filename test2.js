function A() {
    this.x = 1;
    return { y: 2 };
}
function B() {
    this.x = 1;
    return 42;
}
function C() {
    this.x = 1;
    return null;
}

const a = new A();
const b = new B();
const c = new C();

console.log(1, a.x, a.y);
//1  undefiend 2
console.log(2, b.x, b instanceof B);
//  2  1  true
console.log(3, c.x, c instanceof C);
//3   1 true
console.log(4, typeof new C());
//4  'object'