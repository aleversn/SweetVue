![logo](logo.png "SweetVue logo")
# SweetVue.js
##### 基于Vue和jQuery的响应式组件框架

## 前言
    我们知道对于很多Web开发者来说，前端的UI设计是一件难过的事情。对于热衷于实现功能和挑战代码完美度的人却需要花费时间在设计界面上;或者对于一个全栈能手，但却烦恼于你设计的控件无法复用于其他场合，即便是MVVM设计思想流行的今天，你可以利用许多框架进行组件的封装，但是每当面对一项新的使用场景，你的组件将不得不在功能上做出一定的调整，到头来仍需重新拷贝一份前端代码，制作一个新组件，尽管这项任务是必须的，但谁都想将其维护的成本降到最低，更何况当团队共同开发时，你不能确保每个成员都有对应的框架开发基础，因此你所设计的组件在共享给他人时，还需要花费时间来部署它。我们开发出这一个框架的目的，就是为了简化其中一些不必要的步骤，并利用Vue.js所提供的双向绑定来提供一系列基础控件和模板组件让大家能够轻易地上手使用，你甚至不需要深入掌握任何的Vue.js语法，或是jQuery的语法，只需要掌握一些使用规则，即可快速上手。

## 特性
    首先感谢Vue.js的开发者们，没有你们的框架基础，一切实现起来将花耗更多的时间和精力，并且稳定性需要更细致的考量。
> * SweetVue是基于Vue.js和jQuery开发的响应式组件框架，其设计理念同时结合了Xaml设计思想，使用户可通过定义客制化标签来使用预置组件，或是利用xBinding来实现模板化列表。
> * 与Vue.js双向绑定思想相同，Sweet也支持通过监视变量来改变UI的渲染，但不同的是，Vue提倡组件数据的封闭管理，组件与组件之间相对独立，彼此间数据的耦合性低，用户仍可通过Vuex等方式进行全局变量的管理。而Sweet强调了外部引用，多个组件之间通过xData来引用外部全局变量。通过二次监听的方式，由一个变量控制多个组件的数据绑定，从而简化了与外部交流的难度。当然这里不否认组件封闭式管理是正确的，只是有时仍需要与外界变量进行沟通。
> * Sweet支持通过修改css样式或通过xTheme等属性修改基础控件的样式，使用户能够个性化控件在项目中的表现力。当然，有些组件的样式修改范围是有限的，以保证基础样式的正确性，我们仍将不断地改进架构，力求使用户能够能可能方便的修改出满足自己需要的样式。
> * Sweet支持通过用户自定义模板，并利用<x-binding>标签来快速绑定自定义模板实现相应列表功能，同时可通过{{x.binding.属性名}}来实现响应式数据绑定。

## 安装
    直接下载后引入
```html
└─ root
   ├─ js
   │  ├─ SweetVue-1.0.0.js
   │  └─ vue.js
   |  └─ jquery-3.2.1.min.js
   └─ css
      ├─ sweet.css
      └─ fonts
         ├─ segmdl2.ttf
         └─ seguiemj.ttf
         └─ seguisym.ttf


<link rel="stylesheet" href="css/sweet.css"/>
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/vue.js"></script>
<script type="text/javascript" src="js/SweetVue-1.0.0.js"></script>
<!-- 注意这里必须先将jQuery和Vue引入后再引入SweetVue,否则将报错 -->
```

## Sweet 实例
    组件的引用外层需包裹一个<div xSweet="UI">标签
```html
<div xSweet="UI">
    <progress-ring></progress-ring>
</div>
```
    当然你也可以在<body>中引入全局的<div xSweet="UI">标签,这样就不需要再一一包裹外层标签了。
    但是要注意绝对不允许在<div xSweet="UI">标签内写<script>脚本。