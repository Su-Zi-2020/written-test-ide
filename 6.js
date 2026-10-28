function Parent(name) {
    this.name = name;
    this.school = 'school'
}

Parent.prototype.sayName = function () {
    console.log('name', this.name);
};

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

// ========== 继承核心逻辑 ==========
// TODO: 让 Child.prototype 继承 Parent.prototype
// TODO: 修正 Child.prototype.constructor

Child.prototype.sayAge = function () {
    // TODO: 添加子类自己的原型方法
};


// ========== 测试 ==========
const child = new Child('Alice', 18);
child.sayName();  // 输出：My name is Alice
child.sayAge();   // 输出：I am 18
console.log(child instanceof Parent);  // true
console.log(child instanceof Child);   // true
console.log(child.constructor === Child); // true