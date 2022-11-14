# 两小时入门 fetch

## fetch 基本认知

**思考：** 以前开发中如何向服务器请求数据的？

- 方法一：通过 `Ajax` 向服务器请求数据，而 `Ajax` 本质就是使用 `XMLHttpRequest` 对象实现的

  > 可以实现，但是代码写起来很麻烦

  ```js
  // 1、创建一个xhr对象
  let xhr = new XMLHttpRequest()
  // 2、设置请求方式和请求地址
  xhr.open('get', 'http://ajax-base-api-t.itheima.net/api/getbooks?name=zs&age=18')
  // 3、发送请求
  xhr.send()
  // 4.监听load事件获取响应结果
  xhr.addEventListener('load', function () {
      console.log(JSON.parse(xhr.response))
  })
  ```

- 方法二：通过 `axios` 实现的代码精简不少，但是`axios`底层仍然是基于 `XMLHttpRequest` 对象实现的，本质不变，只是进行了 `promise` 封装

**那么目前除了使用 `XMLHttpRequest` 发送请求之外，还有没有其他方式呢？**

- 有，就是fetch



**什么是fetch？**

- `Fetch` 被称之为下一代 `Ajax` 技术，内部采用 `Promise` 方式来处理数据

  > 可以直接.then即可

- API语法简洁明了，比 `XMLHttpRequest ` 更加简单易用
- 采用了模块化设计，API分散于多个对象中（如：Response对象、Request对象、Header对象）
- 通过数据流（Stream对象）处理数据，可以分块读取，有利于提高网站性能，对于大文件或者网速慢的场景极为有用



**兼容性：浏览器支持程度如何？**

- 最新统计（[下图所示](https://caniuse.com/?search=fetch)）：fetch 可以支持到 `96.83%` 的用户端，除了IE，主流浏览器 都已兼容
- 注意点：不兼容IE

![image-20220706110840005](images/image-20220706110840005.png)



## fetch 如何使用

【博客文档推荐】

- https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
- https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html

### 使用fetch发送基本get请求

**介绍：**

- 如果fetch() 只接收了一个 url字符串 参数，表示默认向该网址发送 get 请求，会返回一个Promise对象
- 如果需要设置get的参数，直接拼接到 url 地址上即可

**语法：**

```js
fetch(url)
  .then(...)
  .catch(...)
```

##### 01-fetch发送基本的get请求

```js
// 接口地址：http://ajax-base-api-t.itheima.net/api/getbooks
// 请求方式：get
// 查询参数(可选)：
//   1、id:需要查询的图书id

fetch('http://ajax-base-api-t.itheima.net/api/getbooks').then(res => {
    // 得到的res，是一个Response对象，需要通过特定方法获取其中内容
    // console.log(res)

    // res.json() 是一个异步操作，表示取出所有的内容，将其转换成JSON对象
    console.log(res.json())
    return res.json()
}).then(json => {
    // 获取经过res.json() 处理过之后的数据——》正常通过ajax获取的数据
    console.log(json)
}).catch(err => {
    console.log(err)
})
```

#####  02-fetch发送get请求-使用async-await改写

```js
// 接口地址：http://ajax-base-api-t.itheima.net/api/getbooks
// 请求方式：get
// 查询参数(可选)：
//   1、id:需要查询的图书id

// 1、把代码封装成async异步函数
async function getData() {
    // 通过try...catch语法处理async-await成功和失败的情况
    try {
        // 先获取Response对象
        let res = await fetch('http://ajax-base-api-t.itheima.net/api/getbooks')
        console.log(res)
        // 通过res.json() 取出response对象中的数据
        let json = await res.json()
        console.log(json)
    } catch (err) {
        // 捕获错误信息
        console.log(err)
    }
}
getData()
```

#####  03-fetch发送get请求-使用async-await改写-添加查询参数

```js
// 2、如果需要通过get请求设置查询参数如何实现？
//    可以通过地址栏拼接查询参数完成
async function getData1() {
    // 通过try...catch语法处理async-await成功和失败的情况
    try {
        // 先获取Response对象
        let res = await fetch('http://ajax-base-api-t.itheima.net/api/getbooks?id=1')
        console.log(res)
        // 通过res.json() 取出response对象中的数据
        let json = await res.json()
        console.log(json)
    } catch (err) {
        // 捕获错误信息
        console.log(err)
    }
}
getData1()
```



### Response对象（了解）

fetch 请求成功以后，得到的是一个 [Response 对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)。它是对应服务器的 HTTP 响应。

```js
const res = await fetch(url)
console.log(res)
```

#### 常见属性

|      属性      |                             含义                             |
| :------------: | :----------------------------------------------------------: |
|     res.ok     |              返回一个布尔类型，表示请求是否成功              |
|   res.status   | 返回一个数字，表示HTTP回应的状态码（例如：200，表示以请求成功） |
| res.statusText |    返回状态的文本信息（例如：请求成功之后，服务器返回ok）    |
|    res.url     |                      返回请求的url地址                       |

![image-20220706124501802](images/image-20220706124501802.png)

#### 常见方法

Response 对象根据服务器返回的不同类型的数据，提供了不同的读取方法。

其中最常用的就是 `res.json()` 

|       方法        |            含义             |
| :---------------: | :-------------------------: |
|  **res.json()**   |     **得到 JSON 对象**      |
|    res.text()     |       得到文本字符串        |
|    res.blob()     |    得到二进制 Blob 对象     |
|  res.formData()   |   得到 FormData 表单对象    |
| res.arrayBuffer() | 得到二进制 ArrayBuffer 对象 |



### fetch 配置参数

fetch的第一个参数是 `url` ，此外还可以接收第二个参数，作为配置对象，可以自定义发出的HTTP请求

比如：`fetch(url,options)`

其中：post、put、patch 用法类似，咱们这边以post为例演示



**配置参数介绍：**

```js
fetch(url,{
    method:'请求方式，比如：post、delete、put',
    headers:{
        'Content-Type'：'数据格式'
    },
    body:'post请求体数据'
})
```



#### fetch发送post请求

> 咱们这边以开发中用的较多的JSON格式的情况为例

**基本语法1：**json格式（常用）

```js
// 测试接口（新增操作）：
// 接口地址：http://ajax-base-api-t.itheima.net/api/addbook
// 请求方式：post
// 请求体参数：
//  1、书名：bookname
//  2、作者：author
//  3、出版社：publisher

// post发送：json格式
async function add() {
    let obj = {
        bookname: '魔法书之如何快速学好前端',
        author: '茵蒂克丝',
        publisher: '格兰芬多'
    }

    let res = await fetch('http://ajax-base-api-t.itheima.net/api/addbook', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    let json = await res.json()
    console.log(json)
}
add()
```

**基本语法2：** x-www-form-urlencoded格式（了解）

```jsx
async function add1() {
    let res = await fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: 'foo=bar&lorem=ipsum',
    });

    let json = await res.json();
    console.log(json)
}
add1()
```

**基本语法3：**formData格式（了解）

```js
let form = document.querySelector('form');

async function add2() {
    let res = await fetch(url, {
        method: 'POST',
        body: new FormData(form)
    })
    
    let json = await res.json()
    console.log(json)
}
add2()
```



## fetch 函数封装

原生fetch虽然已经支持 promise 了，相比 XMLHttpRequest 已然好用了很多，但是参数还是需要自己处理，比较麻烦

**比如：**

- get  delete 的请求参数，要在地址栏拼接
- put  patch  post 的请求参数，要转 json 设置请求头

所以实际工作，我们还是会对 fetch 二次封装

**目标效果：**

```js
// 发送get请求、delete请求
http({
    method:'xxx'
    url:'xxx',
    params:{......}
     })

// 发送post请求、put请求、patch请求
http({
    method:'xxx'
    url:'xxx',
    data:{......}
     })
```

**封装之后代码如下：**

```js
async function http(obj) {
    // 解构赋值
    let { method, url, params, data } = obj

    // 判断是否有params参数
    // 1、如果有params参数，则把params对象转换成 key=value&key=value的形式，并且拼接到url之后
    // 2、如果没有params参数，则不管
    if (params) {
        // 把对象转换成 key=value&key=value 的方法
        // 固定写法：new URLSearchParams(obj).toString()
        let str = new URLSearchParams(params).toString()
        // console.log(str)
        // 拼接到url上
        url += '?' + str
    }

    // 最终的结果
    let res
    // 判断是否有data参数，如果有，则需要设置给body，否则不需要设置
    console.log(data)
    if (data) {
        // 如果有data参数，此时直接设置
        res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    } else {
        res = await fetch(url)
    }

    return res.json()
}


// 测试代码1：
// 请求方式：get
// 接口地址：http://ajax-base-api-t.itheima.net/api/getbooks
// 查询参数(可选)：
//   1、id:需要查询的图书id

async function fn1() {
    let result1 = await http({
        method: 'get',
        url: 'http://ajax-base-api-t.itheima.net/api/getbooks',
        params: {
            id: 1
        }
    })
    console.log(result1)
}
fn1()

// 测试代码2：
// 请求方式：post
// 接口地址：http://ajax-base-api-t.itheima.net/api/addbook
// 请求体参数：
//  1、书名：bookname
//  2、作者：author
//  3、出版社：publisher
async function fn2() {
    let result2 = await http({
        method: 'post',
        url: 'http://ajax-base-api-t.itheima.net/api/addbook',
        data: {
            bookname: '魔法书111',
            author: '嘻嘻',
            publisher: '哈哈哈'
        }
    })
    console.log(result2)
}
fn2()
```





## fetch 实战 - 图书管理案例

![image-20220706143918308](images/image-20220706143918308.png)

```js
获取所有图书：
    1、接口地址：http://ajax-base-api-t.itheima.net/api/getbooks
    2、请求方式：get

添加图书:
    1、接口地址：http://ajax-base-api-t.itheima.net/api/addbook
    2、请求方式：post
    3、请求体参数：
        1、bookname：图书的名称
        2、author：作者
        3、publisher：出版社

删除图书：
    1、接口地址：http://ajax-base-api-t.itheima.net/api/delbook
    2、请求方式：delete
    3、查询参数：
        1、id：需要删除图片的id
```



### 渲染功能

**步骤：**

1. 把渲染的代码封装成函数
2. 通过封装好的http函数，获取所有图书数据
3. 遍历返回的图书数组，每遍历一项，就创建一个tr出来，拼接成完整字符串再一起添加到tbody中去

```js
// 把渲染的代码封装成函数
    async function render() {
      // 获取数据
      let res = await http({
        method: 'get',
        url: 'http://ajax-base-api-t.itheima.net/api/getbooks',
      })
      console.log(res.data)

      let htmlStr = ''
      // 遍历数组，每遍历一项，就创建一个tr出来，拼接成完整字符串再一起添加到tbody中去
      res.data.forEach(item => {
        // console.log(item)
        htmlStr += `
          <tr>
            <th scope="row">${item.id}</th>
            <td>${item.bookname}</td>
            <td>${item.author}</td>
            <td>${item.publisher}</td>
            <td>
              <button type="button" class="btn btn-link btn-sm">
                删除
              </button>
            </td>
          </tr>
        `
      })
      // console.log(htmlStr)
      // 把拼接好的数据，设置到tbody中去
      tbody.innerHTML = htmlStr
    }
```



### 添加功能

**步骤：**

1. 给form注册submit事件
2. 阻止浏览器默认行为（提交的默认跳转功能）
3. 通过serialize插件获取表单数据
4. 通过封装好的http函数发送数据给服务器
5. 判断res的status是否成功
   1. 如果成功，此时重新渲染，并且重置表单
   2. 如果不成功，弹框提示错误信息即可

```js
// 表单提交功能
form.addEventListener('submit', async function (e) {
    //  阻止浏览器默认行为
    e.preventDefault()

    // 获取表单数据——》通过serialize插件获取
    let result = serialize(form, { hash: true })
    console.log(result)

    // 把获取的表单数据，发送给服务器
    let res = await http({
        method: 'post',
        url: 'http://ajax-base-api-t.itheima.net/api/addbook',
        data: result
    })
    console.log(res)

    // 通过res的status判断是否添加成功
    if (res.status === 201) {
        // 重新渲染
        render()
        // 重置表单
        form.reset()
    } else {
        // 如果不成功，弹框提示错误信息即可
        alert(res.msg)
    }

})
```



### 删除数据

**步骤：**

1. 利用事件委托，给tbody注册点击事件
2. 判断e.target.tagName是不是按钮
3. 如果是按钮，则通过封装好的http函数发送请求删除数据
4. 此时需要知道删除的这一项的id，则再渲染button时就可以把id添加到dom结构上
5. 判断是否删除成功，如果删除成功，则需要重新加载

```js
// 删除功能——》利用事件委托
tbody.addEventListener('click', async function (e) {
    //  console.log(e.target.tagName)

    // 判断如果点击的是按钮，才进行删除
    if (e.target.tagName === 'BUTTON') {
        let res = await http({
            method: 'delete',
            url: 'http://ajax-base-api-t.itheima.net/api/delbook',
            params: {
                id: e.target.dataset.id
            }
        })
        // console.log(res)
        // 判断如果删除成功，此时需要重新加载
        if (res.status === 200) {
            render()
        }
    }
})
```

