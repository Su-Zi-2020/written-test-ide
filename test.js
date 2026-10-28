function Foo(a, b) {
    this.a = a;
    this.b = b;
    this.sum = () => this.a + this.b;
}
Foo.prototype.get = function () { return this.a; };

const base = { a: 100, b: 200 };
const BoundFoo = Foo.bind(base, 1);

const o = new BoundFoo(2);

console.log(1, o.a, o.b);
//1 1 2
console.log(2, o instanceof Foo, o instanceof BoundFoo);
//2 false  true
console.log(3, base.a, base.b);
//3 100 200 
console.log(4, o.sum(), o.get());
//4  3  1 todo
console.log(5, o.hasOwnProperty('a'), o.hasOwnProperty('get'));

//5  true false