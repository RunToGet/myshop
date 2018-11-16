# myshop

> A Vue.js project

## 搭建脚手架
> npm install -g vue-cli
> vue init webpack myshop
> npm install
> npm run dev

##CSS样式细节
> input标签设置为type=search 输入框有内容后右侧会出现一个小八叉图标
> input标签去除获取焦点时的高亮显示：outline:none

vue中的定时器的关闭，不仅仅是clearInterval就可以的  还需要手动的将定时器设置为null

配置完项目的配置文件需要重新启动项目

需要总结vue中字符串拼接   循环遍历中的路径拼接、属性值等

无法获得后台请求的数据：
1、检查拼接的url是否正确，在network中看请求路径是否完整并且正确（不包含数据的一部分）
2、检查请求的数据格式是否符合要求，在network中看请求路径中数据的那一块是否完整正确

mock数据无法获取?
从action的调用开始，依次检查action、mutation中的函数是否执行，找到问题
mock请求失败，显示404:
为什么在network中看不到mockjs发出的请求？因为请求在发出去之前就被mockjs拦截

使用better-scroll不出现滚动效果：
1、检查实例scroll是否执行
2、检查是否满足div>ul>li的结构
3、检查页面中的ul中是否自动添加了better-scroll的样式
4、检查div的高度是否小于ul的高度



star组件：
计算属性必须在使用到这个属性的时候计算才会执行，所以计算属性调试的时候不能把使用的地方注释
使用ES6的字符串模板拼接字符串   :class = "`star-${size}`"    这样的拼接