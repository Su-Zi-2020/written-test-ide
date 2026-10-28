class mylimit {
    constructor(limit) {
        this.limit = limit;
        this.count = 0;
        this.tasks = [];
        this.res = [];

    }

    run(arr) {
        return new Promise((resolve, reject) => {
            if (arr.length === 0) return resolve([]);

            const exec = (fn, index) => {
                this.count++;
                fn().then((v) => {
                    this.res[index] = v;
                    this.count--;
                    if (this.tasks.length > 0) {
                        const task = this.tasks.shift();
                        exec(task.fn, task.index);
                    }
                    else if (this.tasks.length === 0 && this.count === 0) {
                        resolve(this.res);
                    }
                }).catch((e) => {
                    reject(e);
                });

            };

            arr.forEach((item, index) => {
                if (this.count < this.limit) {
                    exec(item, index);
                }
                else {
                    this.tasks.push({ fn: item, index });
                }
            });
        });

    }
}

const createPrimose = function (str, delay) {
    return function () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(str);
            }, delay);

        })
    }

}
const p1 = createPrimose('p1', 300);
const p2 = createPrimose('p2', 800);
const p3 = createPrimose('p3', 500);
const p4 = createPrimose('p4', 200);
const p5 = createPrimose('p5', 400);

const t = new mylimit(3);
t.run([p1, p2, p3, p4, p5]).then((v) => {
    console.log('success', v)
}).catch((e) => {
    console.log('err', e)
})
