class MyPromise {
    constructor(fn) {
        this.type = 0;
        this.value = undefined;  //返回值
        this.arr = [];

        const resolve = (data) => {
            if (this.type !== 0) return;
            this.type = 1;
            this.value = data;
            if (data && typeof data.then === 'function') {
                data.then(resolve, reject);
                return;
            }

            this.arr.forEach((t) => { t() })

        }
        const reject = (data) => {
            if (this.type !== 0) return;
            this.type = 2;
            this.value = data;
            this.arr.forEach((t) => { t() })
        }
        try {
            fn(resolve, reject);
        }
        catch (e) {
            reject(e);
        }

    }
    then(fn1, fn2) {
        return new MyPromise((resolve, reject) => {
            const run = () => {
                try {
                    if (this.type === 1) {
                        typeof fn1 === 'function' ? resolve(fn1(this.value)) : resolve(this.value);
                    }
                    else if (this.type === 2) {
                        typeof fn2 === 'function' ? resolve(fn2(this.value)) : reject(this.value);
                    }
                }
                catch (e) {
                    reject(e);
                }
            };
            this.type === 0 ? this.arr.push(run) : run();
        })

    }
    catch(fn) {
        return this.then(null, fn);
    }
    finally(fn) {
        return this.then((v) => {
            fn(); return v;
        }, (e) => {
            fn(); throw e;
        });
    }
}


let t = false;
const p = new MyPromise((resolve, reject) => {
    if (t) resolve('p');
    reject('error p');
})

p.then((res) => {
    console.log('then', res)
}).catch((res) => {
    console.log('catch', res)
}).finally((res) => {
    console.log('fin')
})

