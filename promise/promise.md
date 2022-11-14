# 一、Promise的理解与使用

### 概念

 Promise是`异步编程的一种解决方案`，比传统的解决方案——回调函数和事件——更合理和更强大。所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

Promise 是异步编程的一种解决方案，`主要用来解决回调地狱的问题，可以有效的减少回调嵌套`。真正解决需要配合`async/await`。

### 特点

1. 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。

### 缺点

1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消。和一般的对象不一样，无需调用。
2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
3. 当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## Promise是什么

### 理解

- 抽象表达
  1.  Promise 是一门新的技术（ES6 规范）。
  2. Promise 是 JS 中`进行异步编程`的新解决方案 备注：旧方案是单纯使用回调函数。
- 具体表达
  1. 从语法上来说: Promise 是一个`构造函数`
  2. 从功能上来说: promise 对象用来封装一个异步操作并可以获取其成功/ 失败的结果值。

### 状态

- promise的状态

  实例对象中的一个属性 『PromiseState』

  1. pending 未决定的
  2. resolved / fullfilled 成功
  3. rejected 失败

- promise的状态改变

  1. pending 变为 resolved
  2. pending 变为 rejected

  **说明：** `只有这 2 种`, 且一个 promise 对象`只能改变一次` 无论变为成功还是失败，都会有一个结果数据 成功的结果数据一般称为 value， 失败的结果数据一般称为 reason。

### 基本使用

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        let n = rand(1, 100);
        if (n < 30) {
            resolve(n)
        } else {
            reject(n)
        }
    },100)
})
// 调用 then 方法
p.then((value) => {
    alert('恭喜中奖' + value);
}, (reason) => {
    alert('再接再厉' + reason)
})
```

## 为什么要使用Promise

### 指定回调函数的方式更加灵活

1. 旧的： 必须在启动异步任务前指定。
2. promise：启动异步任务 => 返回promie对象 => 给promise对象绑定回调函数（甚至可以在异步任务结束后指定/多个）。

### 支持链式调用，可以解决回调地狱

1. 回调地狱

   回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件。

2. 回调地狱特点

   不便于阅读 不便于异常处理。

3. 解决方案

   promise `链式调用`,

   用来解决回调地狱问题，但是`只是简单的改变格式`，并没有彻底解决上面的问题真正要解决上述问题，一定要利用promise再加上await和async关键字实现异步传同步

## Promise中常用的API概述

1. **Promise构造函数：Promise(excutor) {}**

   - executor 函数: 执行器 (resolve, reject) => {}
   - resolve 函数: 内部定义成功时我们调用的函数 value => {}
   - reject 函数: 内部定义失败时我们调用的函数 reason => {}

2. **Promise.prototype.then 方法: (onResolved, onRejected) => {}**

   - onResolved 函数: 成功的回调函数 (value) => {}
   - onRejected 函数: 失败的回调函数 (reason) => {}

   **说明：**指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调返回一个新的 promise 对象。

3. **Promise.prototype.catch 方法: (onRejected) => {}**

   - onRejected 函数: 失败的回调函数 (reason) => {}

   **说明：** then()的语法糖，相当于: then(undefined, onRejected)

   - 异常穿透使用：当运行到最后，没被处理的所有异常错误都会进入这个方法的回调函数中。

4. **Promise.resolve 方法: (value) => {}**

   - value： 成功的数据或 promise 对象。

   **说明：**返回一个成功/失败的 promise 对象，直接改变promise状态

   ```js
   // Promise.resolve()
   // 如果传入的参数为 非 Promise 类型的对象，则返回的结果为成功的 Promise 对象
   // 如果传入的参数为 Promise 类型的对象，则参数的结果决定了 resolve 的结果
   
   let p1 = Promise.resolve(521);
   
   let p2 = Promise.resolve(new Promise((resolve, reject) => {
       // resolve('ok');
       reject('Error')
   }))
   console.log(p1)
   p2.catch(reason => {
       // console.log(reason)
   })
   ```

5. **Promise.reject 方法: (reason) => {} **

   - reason：失败的原因

   ```js
   // Promise.reject()
   // 无论传入的参数为什么，都返回失败的回调
   
   let p3 = Promise.reject(321)
   let p4 = Promise.reject(new Promise((resolve, reject) => {
       resolve('ok')
   }))
   // console.log(p3);
   // console.log(p4)
   ```

6. **Promise.all 方法: (promises) => {}**

   - promises:：包含 n 个 promise 的数组

   **说明：**返回一个新的 promise， 只有所有的 promise `都成功才成功`， 只要有一 个失败了就直接失败。

   ```js
   // Promise.all()
   // 当所有 promise 成功时，返回一个成功的数组
   // 当有某个 promise 失败时， 返回那个失败的结果
   let p5 = new Promise((resolve, reject) => {
       // resolve('ok')
       reject('err')
   })
   
   let p6 = Promise.resolve('success')
   let p7 = Promise.resolve('yeah')
   
   const result = Promise.all([p5, p6, p7]);
   // console.log(result)
   ```

7. **Promise.race 方法: (promises) => {}**

   - promises： 包含 n 个 promise 的数组

   **说明：**返回一个新的 promise， `第一个完成`的 promise 的结果状态就是最终的结果状态。

   ```js
   // Promise.race()
   // 第一个完成的结果状态就是最终状态
   let p8 = new Promise((resolve, reject) => {
       // resolve('ok')
       reject('err')
   })
   
   let p9 = Promise.resolve('success')
   let p10 = Promise.resolve('yeah')
   
   const results = Promise.race([p8, p9, p10]);
   // console.log(results)
   ```

8. **Promise.finally方法: () => {}**

   - 返回一个回调函数

   **说明：**不管`promise`最后的状态，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。

## Promise的几个关键问题

### 如何改变promise的状态

1. resolve(value)：如果当前是 pending 就会变为 resolved
2. reject(reason)： 如果当前是 pending 就会变为 rejected
3. 抛出异常：如果当前是 pending 就会变为 rejected

### 一个 promise 指定多个成功/失败回调函数, 都会调用吗?

当 promise `改变为对应状态时`都会调用，改变状态后，多个回调函数都会调用,并不会自动停止。

```js
let p = new Promise((resolve, reject) => {
    resolve('ok')
})

p.then(value => {
    console.log(value)
})

p.then(value => {
    alert(value)
})
```

### 改变 promise 状态和指定回调函数谁先谁后?

都有可能， 正常情况下是先指定回调再改变状，,但也可以先改状态再指定回调。

- 先指定回调再改变状态（`异步`）：先指定回调=>再改变状态=>改变状态后才进入异步队列执行回调函数。
- 先改状态再指定回调（`同步`）：改变状态 =>指定回调 `并马上执行`回调

```js
// 当执行器内为同步操作时，先改变状态在调用 .then
let p = new Promise((resolve, reject) => {
    resolve('ok')
})

p.then(value => {
    console.log(value)
}, reason => {
})


// 当执行器内为异步函数时，先调用 .then 在改变状态
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    },200)
})

p1.then(value => {
    alert(value)
}, reason => {
})
```

### promise.then()返回的新 promise 的结果状态由什么决定?

1. 简单表达：由 then()指定的回调函数执行的结果决定。
2. 详细表达：
   - 如果抛出异常, 新 promise 变为 rejected，reason 为抛出的异常。
   - 如果返回的是非 promise 的任意值，新 promise 变为 resolved，value 为返回的值。
   - 如果返回的是另一个新 promise，此 promise 的结果就会成为新 promise 的结果。

### promise 如何串连多个操作任务?

1. promise 的` then()`返回一个新的 promise， 可以开成 then()的链式调用。
2. 通过 then 的链式调用串连多个同步/异步任务,这样就能用`then()`将多个同步或异步操作串联成一个同步队列。

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    },200)
})

p.then(value => {
    return new Promise((resolve, reject) => {
        resolve('success')
    })
}).then(value => {
    console.log(value)
}).then(value => {
    console.log(value)
})
```

### promise 异常传透?

1. 当使用 promise 的 then 链式调用时，可以在最后指定失败的回调。
2. 前面任何操作出了异常，都会传到最后失败的回调中处理。

```js
let p = new Promise((resolve, reject) => {
    resolve('ok')
    // reject('err')
})

p.then(value => {
    console.log(value)
}).then(value => {
    console.log(11)
}).then(value => {
    console.log(22)
}).then(value => {
    console.log(33)
}).catch(reason => {
    console.log(reason)
})
```

### 中断 promise 链?

1. 当使用 promise 的 then 链式调用时，在中间中断，不再调用后面的回调函数。
2. (2) 办法：在回调函数中返回一个 `pendding` 状态的`promise 对象`。

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000);
})

p.then(value => {
    console.log(111);
    // 中断 promise
    return new Promise(() => {});
}).then(value => {
    console.log(111);
}).catch(reason => {
    console.log(reason);
})
```

# 二、Promise + async + await

**Promise==>异步**

**await==>异步转同步**

1. await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用。
2. await 后面可以跟任何的JS 表达式。虽然说 await 可以等很多类型的东西，但是它最主要的意图是用来等待 Promise 对象的状态被 resolved。如果await的是 promise对象会造成异步函数停止执行并且等待 promise 的解决，如果等的是正常的表达式则立即执行

**async==>同步转异步**

1. 方法体内部的某个表达式使用await修饰，那么这个方法体所属方法必须要用async修饰所以使用awit方法会自动升级为异步方法

## async函数

1. 函数的返回值为 promise 对象。
2. promise 对象的结果由 async 函数执行的返回值决定。

## await表达式

1. await 右侧的表达式一般为 promise 对象，但也可以是其它的值。
2. 如果表达式是 promise 对象，await 返回的是 promise 成功的值。
3. 如果表达式是其它值，直接将此值作为 await 的返回值。

### 注意：

1. await 必须写在 async 函数中，但 async 函数中可以没有 await。
2. 如果 await 的 promise 失败了。就会抛出异常。需要通过 try...catch 捕获处理。

```js
// async 和.then 规则一样
async function main() {
    // 1. 如果返回值是一个非 Promise 类型数据
    // return 521;
    // 2. 如果返回的是一个 Promise 对象
    // return new Promise((resolve, reject) => {
    //     // resolve('ok')
    //     // reject('error')
    // })
    // 3. 抛出异常
    throw 'no'
}

// console.log(main());


// await 必须写到async函数内

async function main() {
    let p = new Promise((resolve, reject) => {
        resolve('ok');
        // reject('error');
    })
    let res = await p;
    // console.log(res);

    let res2 = await 28;
    // console.log(res2);

    let p2 = new Promise((resolve, reject) => {
        // resolve('ok');
        reject('error');
    })

    try {
        let res3 = await p2;
        console.log(res3);
    } catch (error) {
        console.log(error);
    }
}

main()
```

