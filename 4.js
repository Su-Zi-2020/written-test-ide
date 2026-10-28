class EventBus {
    constructor() {
        this.event = {};
    }

    /**
     * 订阅事件
     * @param {string} name - 事件名称
     * @param {Function} fn - 回调函数
     */
    on(name, fn) {
        if (!this.event[name]) {
            this.event[name] = []
        }
        this.event[name].push(fn);
    }

    /**
     * 发布事件
     * @param {string} name - 事件名称
     * @param {...any} args - 传递给回调函数的参数
     */
    emit(name, ...args) {
        if (!this.event[name]) return;
        else {
            this.event[name].forEach(fn => fn(...args));
        }
    }

    /**
     * 取消订阅
     * @param {string} name - 事件名称
     * @param {Function} fn - 要移除的回调函数
     */
    off(name, fn) {
        if (!this.event[name]) return;
        this.event[name] = this.event[name].filter(item => item !== fn);
    }

    /**
     * 只订阅一次
     * @param {string} name - 事件名称
     * @param {Function} fn - 回调函数
     */
    once(name, fn) {
        let p = (...args) => {
            fn(...args);
            this.off(name, p);
        };
        this.on(name, p);
    }
}