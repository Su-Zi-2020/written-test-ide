// =============================================
// 题目：实现 LazyMan
// =============================================
// 调用方式：
//   LazyMan('Hank')
//   LazyMan('Hank').sleep(10).eat('dinner')
//   LazyMan('Hank').eat('dinner').eat('supper')
//   LazyMan('Hank').sleepFirst(5).eat('supper')
//
// 要求：
//   1. 支持链式调用
//   2. 任务按顺序执行
//   3. sleep 是异步等待，不阻塞主线程
//   4. sleepFirst 插队到队列最前面
// =============================================

class LazyManClass {
  constructor(name) {
    this.name = name;
    this.queue = [];
    this.queue.push(() => {
        console.log('Hi! This is ' + name + '!');
        this.next();
    });
    setTimeout(()=> {
        this.next();
    }, 0)
    return this;
    // TODO: 初始化任务队列
    // TODO: 添加第一个任务（打印问候语）
    // TODO: 启动任务执行
  }

  // 启动/继续执行下一个任务
    next() {
    // TODO: 从队列取出第一个任务并执行
        if (this.queue.length > 0) {
            this.queue.shift()();
        }
        return this;
    }

    eat(food) {
        this.queue.push(() => {
            console.log('eat' + food);
            this.next();
        });

        return this; 
    }

    sleep(seconds) {
        this.queue.push(() => {
            console.log('sleepstart' + seconds);
            setTimeout(() =>{
                console.log('sleep' + seconds);
                this.next();
            }, seconds * 1000);
        });
        return this; 
    }
    
    sleepFirst(seconds) {
        this.queue.unshift(() => {
            console.log('sleepFirststart' + seconds);
            setTimeout(() =>{
                console.log('sleepFirst' + seconds);
                this.next();
            }, seconds * 1000);
        });
        return this; 
    }
}

// 工厂函数
function LazyMan(name) {
  return new LazyManClass(name);
}


// LazyMan('Hank');
//    LazyMan('Hank').eat('dinner');
//    LazyMan('Hank').sleep(3).eat('dinner').eat('dinner')
// LazyMan('Hank').sleep(3)

//   LazyMan('Hank').eat('dinner').eat('supper')
  LazyMan('Hank').sleepFirst(5).eat('supper')