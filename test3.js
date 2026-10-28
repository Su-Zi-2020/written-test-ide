const obj1 = {
    name: 'o1',
    getName() { return this.name; }
};
const obj2 = { name: 'o2' };

const g1 = obj1.getName.bind(obj2);
const g2 = g1.bind(obj1);

console.log(1, g1());
// 1 o2
console.log(2, g2());
//2  o1

function F() {
    this.tag = 'F';
}
const BF = F.bind({ tag: 'base' });
const inst = new BF();

console.log(3, inst.tag);
// 3 F
console.log(4, inst instanceof F);
//4  true