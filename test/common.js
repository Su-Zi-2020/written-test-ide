//数组遍历
const doubled = arr.map(item => item * 2);


arr.forEach((item, index) => {
    console.log(item, index);
});

for (const item of arr) {
    if (item === 3) break;   // 可以 break
    console.log(item);
}


//对象遍历

for (let key in obj) {
    console.log(key, obj[key]);
}

for (const [key, value] of Object.entries(obj)) {
    console.log(key, value);
}

Object.keys(obj).forEach(key => {
    console.log(key, obj[key]);
});

Object.values(obj).forEach(value => {
    console.log(value);
});

Object.entries(obj).forEach(([key, value]) => {
    console.log(key, value);
});