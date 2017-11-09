# calculator

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## G7计算器
为了快捷开发，我把整个设计图都做成页面背景了。整个页面上的小元素都采用
绝对定位的技术。
* 布局视口=物理时候，rem适应多屏。
* gulp上传到腾讯云
* vuejs 框架

###  坑一：微信h5页面可视区域
微信h5页面可视区域并不是 375 * 667，而是高度要减去顶部或底部（如果有）的高度
才是真正的可视区域。所以，如果是非浮动的按钮或其它重要元素，不宜设计太靠下
，否则一屏显示不下，影响用户体验

用了公司设计部的图才知道，设计稿要把微信头部显示出来的。即包含微信头部总
高度是1334

### 坑二：Number类型相加
因为Javascript变量无法声明类型，所以任何涉及数字相加的变量都要乘以1(即*1)
，以转化成Number类型，执行相加。不然就会得到意外的字符串。