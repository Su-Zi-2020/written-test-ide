class Scheduler {
    constructor(limit) {
        this.limit = limit;
        this.queue = [];
        this.count = 0;
        // TODO
    }

    add(task) {
        if (this.count < this.limit) {
            this.count++;
            this.run(task);
        }
        else {
            this.queue.push(task);
        }
    }
    run(task) {

        const res = Promise.resolve().then(task).finally(() => {
            this.count--;
            if (this.queue.length > 0) {
                const test = this.queue.shift();
                this.count++;
                this.run(test);
            }
        });
        return res;
    }
}
const scheduler = new Scheduler(2);

const delay = (ms, val) => () =>
    new Promise(resolve => {
        setTimeout(() => {
            console.log(`完成: ${val}`);
            resolve(val);
        }, ms);
    });

// 添加 4 个任务
scheduler.add(delay(1000, 'A'))
scheduler.add(delay(500, 'B'))
scheduler.add(delay(300, 'C'))
scheduler.add(delay(200, 'D'))

// 输出顺序（按完成时间）：B → C → D → A
// 但任何时候同时运行的任务数不超过 2