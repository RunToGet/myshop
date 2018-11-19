# myshop

- A Vue.js project

## 搭建脚手架
1. npm install -g vue-cli
2. vue init webpack myshop
3. npm install
4. npm run dev

##CSS样式细节
- input标签设置为type=search 输入框有内容后右侧会出现一个小八叉图标
- input标签去除获取焦点时的高亮显示：outline:none

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

### 开启项目

1. 打开mongoDB数据库：在data/db目录下`mongod`
2. 打开服务端:在server目录下`npm start`，成功连接数据库
3. 打开项目: `npm run dev`

star组件：
计算属性必须在使用到这个属性的时候计算才会执行，所以计算属性调试的时候不能把使用的地方注释
使用ES6的字符串模板拼接字符串   :class = "`star-${size}`"    这样的拼接

### 首页
1. 由HeaderTop、MsiteNav、ShopList、Star四个组件组成
2. 子组件使用的数据如果是后台请求，那么都是放在vuex中管理，子组件引入vuex中的数据即可，但是页面加载时向后台发送请求的一般放在路由组件中，在mounted生命周期中发送请求
#### HeaderTop
1. 使用了slot插槽的方式布局；在模板中先用插槽`<slot name=""></slot>`标签定位，需要给定一个name属性，在组件中如果需要这个位置，就在标签中使用属性slot，属性值即name的值`<a slot="name"></a>`
2. 使用了props父子间传递数据；在父组件中使用  `:title="数据"` ；在子组件中使用props接收数据
````
props:[
    title:{
        type:Number,
        ...
    }
]
````
#### MsiteNav
1. swiper的最基本使用，需要三级标签 .swiper_container , .swiper_wrapper , .swiper_slide；
2. 引入swiper的Swiper以及样式 
3. 基本设置：
```
new Swiper(".swiper_container",{
    ...一些设置
})
```
4. 重点：swiper的初始化必须在页面加载完之后，就需要监视categorys数组是否有数据，有数据之后，需要等到起下一次渲染完成之后初始化，使用到得是
```
watch:{
    categorys(value){
        thos.$nextTick(()=>{
            ...初始化swiper
        })
    }
}
```
5. 使用swiper的时候，需要将categorys进行处理成一个二维数组，可以看下这里的算法，不多解释

#### ShopList
1. 普通的v-for遍历数据。使用到Star组件，使用props进行父子间的数据传递
2. 使用 v-for进行循环的时候，可以直接使用`v-for="item in 6" :key="item"` 即可遍历6次
3. 学会使用伪类和伪元素，伪元素必须包含content
#### Star
1. ES6的字符串模板在行内属性中的使用
2. 注意html结构与css样式的书写，可以继续改进

### 登陆功能

+ 登陆分为两部分
  + 一部分是跳转到登陆页面，涉及到得是profile页面，用到了三元表达式，判断当未登陆时显示未登录，点击跳转到登陆页面，登陆之后，点击跳转到用户信息页面。
  + 第二部分是登陆功能的实现，这里包含两种方式实现登陆
    + 手机号、短信的方式
    + 用户名、密码、验证码的方式
  + 除了登陆功能外，还包含了数据的双向绑定，vue动画、输入密码的显示和隐藏、倒计时等功能的实现。
+ 手机号、短信的方式
  + 设置获取短信的button的disabled属性，可以切换button是否可点击，disabled属性可以用true或者false来作为属性值，`disabled=true` 不可点击；`disabled=false` 可以点击
  + button是在一个表单中，绑定事件的时候注意`@click.prevent`阻止其默认事件
  + 手机获取验证码后，button位置的内容变成倒计时，在倒计时中再次点击button无效
  + 验证码发送失败需要提醒，然后倒计时结束，验证码发送成功，根据用户填写，如果错误，倒计时继续，如果正确，倒计时结束，跳转页面
+ 用户名、密码、验证码的方式
  + 验证码是一张图片的src就是请求url，绑定一个点击事件，当点击后再次给图片的src赋值，但是如果两次src是完全相同的，就不会触发请求，就需要在请求url后加上一个时间戳，这样每一次点击就会得到新的验证码

```javascript
this.$refs.capcha.src='http://localhost:4000/capcha?'+Date.now()
```

+ 发现通过用户名登陆成功，那么退出重新回到登陆页面后，验证码没有改变，仍然是最后一次登陆的验证码，我们可以使用在mounted钩子函数中调用一次this.refreshCapcha函数，即可在每一次加载登陆页面时都能够获得新的验证码
+ 使用transform 实现切换显示隐藏密码的动画效果，学会使用transform编写动画效果

+ mint-ui
  + 在全局下注册mint-ui,在main.js中注册

```javascript
import Button from 'mint-ui'
Vue.component(Button.name,Button)
```

+ mint-ui在使用的时候存在引入全部组件和按需引入两种方式，具体可以看mint-ui的学习笔记。