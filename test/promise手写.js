function createPromise(delay, data, type = true) {
    return function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (type) resolve(data);
                else reject(data)
            }, delay)
        })
    }
};

let p1 = createPromise(1000, 'A')
let p2 = createPromise(500, 'B')
let p3 = createPromise(300, 'C', false)




function all(arr) {
    return new Promise((resolve, reject) => {
        if (arr.length === 0) return resolve([]);

        let res = [];
        let count = 0;

        arr.forEach((task, i) => {
            task().then(value => {
                res[i] = value;
                count++;
                if (count === arr.length) resolve(res);
            }).catch(reject)
        })
    });
}

// all([p1, p2, p3]).then((res) => {
//     console.log('all 成功', res)
// }
// ).catch((res) => {
//     console.log('all 失败', res)
// })

function race(tasks) {
    return new Promise((resolve, reject) => {
        tasks.forEach(task => {
            task().then(resolve).catch(reject)
        })
    })
}

// race([p1, p2, p3]).then((res) => {
//     console.log('race 成功', res)
// }).catch((res) => {
//     console.log('race 失败', res)
// })


function allSettled(tasks) {
    return new Promise((resolve, reject) => {
        if (tasks.length === 0) return resolve([]);
        let res = [];
        let count = 0;
        tasks.forEach((task, i) => {
            task().then((v) => {
                res[i] = { status: 'fulfilled', reason: v };
            }).catch((e) => {
                res[i] = { status: 'rejected', reason: e };
            }).finally(() => {
                count++;
                if (count === tasks.length) resolve(res);
            });
        })
    })
}

// allSettled([p1, p2, p3]).then((res) => {
//     console.log('allSettled', res)
// })


function any(tasks) {
    return new Promise((resolve, reject) => {
        if (tasks.length === 0) {
            return reject(new AggregateError([]));
        }
        let res = [];
        let count = 0;
        tasks.forEach((task, i) => {
            task()
                .then(resolve)
                .catch((e) => { res[i] = e; })
                .finally(() => {
                    count++;
                    if (count === tasks.length) {
                        return reject(new AggregateError(res));
                    }
                })
        })
    })
}

p1 = createPromise(1000, 'A', false)
p2 = createPromise(500, 'B', false)
p3 = createPromise(300, 'C', false)

any([p1, p2, p3]).then((res) => {
    console.log('any success', res)
}).catch((res) => {
    console.log('any faild', res)
})