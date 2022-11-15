# Sass

## 概览

Sass（Syntactically Awesome Stylesheet）是一个CSS预处理器，有助于减少CSS的重复，节省时间。它是更稳定和强大的CSS扩展语言，描述文档的样式干净和结构。

## 变量（Variables）

```scss
$color:#F00;
p {
    color: $color;
}
```

```css
p {
    color: #F00;
}
```

## 作用域（Scope）

1. 全局变量：声明在最外层的变量，可在任何地方使用；
2. 局部变量：嵌套规则内定义的变量只能在嵌套规则内使用。

```scss
$color: red;
.container {
    $height: 500px;
    $font-size: 16px !global;
    font-size: $font-size;
    color: $color;
    height: $height;
}
.footer {
    /**$font-size使用!global 申明成全局变量了*/
    font-size: $font-size; 
    /**
    * Error: Undefined variable. 
    * $height是.container下的局部变量，无法在.footer下面编译
    */
    height:$height;
}
```

```css
.container {
    font-size: 16px;
    color: red;
    height: 500px;
}
 
.footer {
     /**$font-size使用!global 申明成全局变量了*/
    font-size: 16px;
}
```

## 混合（Mixin）

混合指令（`Mixin`）用于定义可重复使用的样式。混合指令可以包含所有的`css` 规则，绝大部分 `scss` 规则，甚至可以通过参数功能引入变量，输出多样化的样式。

```scss
// 定义一个区块基本的样式
@mixin block {
    width: 96%;
    margin-left: 2%;
    border-radius: 8px;
    border: 1px #f6f6f6 solid;
}
// 使用混入 
.container {
    .block {
        @include block;
    }
}
```

```css
.container .block {
    width: 96%;
    margin-left: 2%;
    border-radius: 8px;
    border: 1px #f6f6f6 solid;
}
```

## 嵌套（Nesting）

### 选择器嵌套

```scss
.container {
    width: 1200px;
    margin: 0 auto;
    .header {
        .img {
            width: 100px;
            height: 60px;
        }
    }
}
```

```css
.container {
    width: 1200px;
    margin: 0 auto;
}
.container .header .img {
    width: 100px;
    height: 60px;
}
```

### 属性嵌套

```scss
.container {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

```css
.container {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

命名空间也可以包含自己的属性值。

```scss
.container {
  color: red {
    adjust: fantasy;
  }
}
```

```css
.container {
  color: red;
  color-adjust: fantasy;
}
```

### 父选择器

在嵌套 `css`规则时，有时会需要使用嵌套外层的父选择器，例如，当给某个元素设定 `hover` 样式时，可以用`&` 代表嵌套规则外层的父选择器，`scss`在编译时会把`&`替换成父选择器名。

```scss
.container {
    a {
        color: #333;
        &:hover {
             text-decoration: underline;
             color: #f00;
        }
    }
}
```

```css
.container a {
    color:#333;
}
.container a:hover {
    text-decoration:underline;
    color:#F00;
}
```

也可以使用`&`进行选择器名称拼接。

```scss
.main {
    color: black;
    &-sidebar { border: 1px solid; }
}
```

```css
.main {
    color: black;
}
.main-sidebar {
    border: 1px solid;
}
```

### @规则嵌套

`scss`中，`@media` 指令与 `css`中用法一样，只是增加了一点额外的功能，允许在`css`规则中嵌套。如果`@media` 嵌套在 `css`规则内，编译时，`@media` 将被编译到文件的最外层，包含嵌套的父选择器。这个让 `@media` 方便不少，不需要重复写选择器，也不会打乱 `css`的书写流程。

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
    .item {
      height: auto;
    }
  }
}
```

```css
.sidebar {
    width: 300px;
}
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
  .sidebar .item {
    height: auto;
  }
}
```

## 注释（Comments）

```scss
/* 一个块注释
* style comment!
*/
@var: red;

// 这一行被注释掉了！
@var: white;
```

多行注释会编译到`.css`文件中,`compressed`（压缩）模式下除外， 将 `!`作为多行注释的第一个字符表示在压缩输出模式下也**保留**这条注释，通常用于添加版权信息。

```scss
/*!
* 我是
* 多行
* 注释
*/
body { color: black; }
```

## 插值语法

通过 `#{}` 插值语句可以在选择器、属性名、注释中使用变量，使用`#{}`插值语句将变量包裹起来即可，和`js`中的模板字符串很像。

```scss
$font-size: 12px;
$line-height: 30px;
$class-name: danger;
$attr: color;
$author: "福大命大";
 
p {
    font: #{$font-size}/#{$line-height} Arial Helvetica, sans-serif;
}
 
/* 
* 这是文件的说明部分
* @author: #{$author}
*/
 
a.#{$class-name} {
    border-#{$attr}: #f00;
}
```

```css
p {
    font: 12px/30px Arial Helvetica, sans-serif;
}
 
/* 
* 这是文件的说明部分
* @author: 福大命大
*/
a.danger {
    border-color: #f00;
}
```

## 流程控制

### @if

```scss
$theme:3;
.container {
    @if $theme >= 5 {
        background-color: red;
    }
    @else {
        background-color: blue;
    }
}
```

```css
.container {
    background-color: blue;
}
```

### @for

`for`在条件范围内重复操作，这个指令包含两种格式：

1. `@for $var from <start> through <end>`；
2. `@for $var from <start> to <end>`。

两者区别在于 `through` 与 `to`的含义：

1. 使用 `through`时，条件范围包含 `<start>` 与 `<end>`的值；
2. 使用 `to`时条件范围只包含`<start>`的值不包含`<end>`的值；
3. `$var` 可以是任何变量，比如`$i`，`<start>` 和 `<end>` 必须是整数值。

```scss
@for $i from 1 to 3 {
  #loading span:nth-child(#{$i}) {
      width: 20 * ($i - 1) + px;
  }
}
```

```css
#loading span:nth-child(1) {
    width: 0px;
}
 
#loading span:nth-child(2) {
    width: 20px;
}
```

将 `to` 换成 `through`

```css
#loading span:nth-child(1) {
    width: 0px;
}
 
#loading span:nth-child(2) {
    width: 20px;
}
 
#loading span:nth-child(3) {
    width: 40px;
}
```

### @each

`@each`指令的格式是`@each $var in $list` , `$var`可以是任何变量名，比如`$length` 或者`$name`，而`$list`是一连串的值，也就是值列表。

```scss
$color-list:red green blue turquoise darkmagenta;
@each $color in $color-list {
    $index: index($color-list, $color);
    .p#{$index - 1} {
        background-color: $color;
    }
}
```

```css
.p0 {
    background-color: red;
}
 
.p1 {
    background-color: green;
}
 
.p2 {
    background-color: blue;
}
 
.p3 {
    background-color: turquoise;
}
 
.p4 {
    background-color: darkmagenta;
}
```

### @while

`@while` 指令循环输出直到表达式返回结果为 `false`。这样可以实现比`@for` 更复杂的循环。

```scss
$column:12;
@while $column>0 {
   .col-sm-#{$column} {
      width: $column / 12 * 100%;
   }
    $column:$column - 1;
}
```

```css
.col-sm-12 {
    width: 100%;
}
 
.col-sm-11 {
    width: 91.6666666667%;
}
 
.col-sm-10 {
    width: 83.3333333333%;
}
 
.col-sm-9 {
    width: 75%;
}
 
.col-sm-8 {
    width: 66.6666666667%;
}
 
.col-sm-7 {
    width: 58.3333333333%;
}
 
.col-sm-6 {
    width: 50%;
}
 
.col-sm-5 {
    width: 41.6666666667%;
}
 
.col-sm-4 {
    width: 33.3333333333%;
}
 
.col-sm-3 {
    width: 25%;
}
 
.col-sm-2 {
    width: 16.6666666667%;
}
 
.col-sm-1 {
    width: 8.3333333333%;
}
```

## 导入（Importing）

`@import`算是一个比较简易的模块系统。`scss`拓展了`@import` 的功能，允许其导入 `scss`或 `sass`文件。被导入的文件将合并编译到同一个 `css`文件中，被导入的文件中所包含的变量或者混合指令 (`mixin`) 都可以在导入的文件中使用。

```scss
@import "rounded-corners", "text-shadow";
```

## 导入（use）

存在兼容性问题，仅在`Dart Sass 1.23.0`以上有效，官方文档有兼容性介绍。

`scss`真正意义上的模块化，可以从其它 `scss`样式表中加载`mixin`、`function`和`变量`，并将来自多个样式表的 `css`组合在一起。`scss`还提供了很多内置模块，我们可以通过`@use`使用。

*src/_corners.scss*

```scss
$radius: 3px;
@mixin rounded {
    border-radius: $radius;
}
```

*index.scss*

```scss
@use "src/corners";
.button {
    @include corners.rounded;
    padding: 5px + corners.$radius;
}
```

## 函数（Functions）

`@function`用于封装复杂的操作，可以很容易地以一种可读的方式抽象出通用公式和行为，函数提供返回值，常用来做计算方面的工作。

```scss
@function square($base) {
    @return $base * $base * 1px;
}
 
.sidebar {
    float: left;
    margin-left: square(4);
}
```

```css
.sidebar {
    float: left;
    margin-left: 16px;
}
```

## 继承（extend）

```scss
.alert {
    border: 1px solid transparent;
}
 
.important {
    font-size: 14px;
}

.alert-danger {
    @extend .alert;
    @extend .important;
    color: #a94442;
}
```

```css
.alert, .alert-danger {
    border: 1px solid transparent;
}

.important, .alert-danger {
    font-size: 14px;
}

.alert-danger {
    color: #a94442;
}
```

