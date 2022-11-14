function Promise(executor) {

    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    const _that = this;
    this.callbacks = [];

    // resolve 函数
    function resolve(data) {
        // 判断状态
        if ( _that.PromiseState !== 'pending') return;
        // 修改对象状态
        _that.PromiseState = 'fulfilled';
        // 设置对象结果值
        _that.PromiseResult = data;
        // 调用成功的回调
        setTimeout(() => {
            _that.callbacks.forEach(item => {
                item.onResolved(data)
            });
        }, 0);
    }

    // reject 函数
    function reject(data) {
        // 判断状态
        if ( _that.PromiseState !== 'pending') return;
        // 修改对象状态
        _that.PromiseState = 'rejected';
        // 设置对象结果值
        _that.PromiseResult = data;
        // 调用失败的回调
        setTimeout(() => {
            _that.callbacks.forEach(item => {
                item.onRejected(data)
            });
        }, 0);
    }

    try {
        // 同步调用执行器函数
    executor(resolve, reject);
    } catch (error) {
        reject(error)
    }
}

// 添加 then 方法 
Promise.prototype.then = function(onResolved, onRejected) {
    const _that = this;
    if (typeof onResolved !== 'function') {
        onRejected = value => value;
    }
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason;
        }
    }
    return new Promise((resolve, reject) => {
        // 封装函数
        function callback(type) {
            try {
                let result = type(_that.PromiseResult)
            // 判断
            if (result instanceof Promise) {
                // 如果是 Promise 类型对象
                result.then(value => {
                    resolve(value)
                }, reason => {
                    reject(reason)
                })
            } else {
                // 调用成功的结果
                resolve(result);
            }
            } catch (error) {
                reject(error)
            }
        }
        // 调用回调函数 Promisestate
        if (this.PromiseState === 'fulfilled') {
            setTimeout(() => {
                callback(onResolved)
            }, 0);
        }
    
        if (this.PromiseState === 'rejected') {
            setTimeout(() => {
                callback(onRejected)
            }, 0);
        }
        // 判断状态
        if (this.PromiseState === 'pending') {
            // 保存回调函数
            this.callbacks.push({
                onResolved: function() {
                    callback(onResolved)
                },
                onRejected: function() {
                    callback(onRejected)
                }
            })
        }
    })
}

// 添加 catch 方法
Promise.prototype.catch = function(onRejected) {
    return this.then(undefined, onRejected);
}

// 添加 resolve 方法
Promise.resolve = function(value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(value => {
                resolve(value);
            }, reason => {
                reject(reason)
            })
        } else {
            resolve(value)
        }
    })
}

// 添加 reject 方法
Promise.resolve = function(reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}

// 添加 all 方法
Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        // 声明变量 
        let count = 0;
        let arr = [];
        // 遍历
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(value => {
                count ++;
                // 将当前promises对象成功的结果 存入数组
                arr[i] = v;
                if (count === promises.length) {
                    resolve(arr);
                }
            }, reason => {
                reject(reason)
            })
        }
    })
}

// 添加 race 方法
Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(value => {
                resolve(value);
            }, reason => {
                reject(reason)
            })
        }
    })
}