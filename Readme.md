<img width="350px" src="logo.png" alt="logo.png" style="width: 200px; height: auto;" title="SweetVue logo"/>

# SweetVue.js
##### 基于Vue和jQuery的响应式组件框架

## 前言
我们知道对于很多Web开发者来说，前端的UI设计是一件难过的事情。对于热衷于实现功能和挑战代码完美度的人却需要花费时间在设计界面上;或者对于一个全栈能手，但却烦恼于你设计的控件无法复用于其他场合，即便是MVVM设计思想流行的今天，你可以利用许多框架进行组件的封装，但是每当面对一项新的使用场景，你的组件将不得不在功能上做出一定的调整，到头来仍需重新拷贝一份前端代码，制作一个新组件，尽管这项任务是必须的，但谁都想将其维护的成本降到最低，更何况当团队共同开发时，你不能确保每个成员都有对应的框架开发基础，因此你所设计的组件在共享给他人时，还需要花费时间来部署它。我们开发出这一个框架的目的，就是为了简化其中一些不必要的步骤，并利用Vue.js所提供的双向绑定来提供一系列基础控件和模板组件让大家能够轻易地上手使用，你甚至不需要深入掌握任何的Vue.js语法，或是jQuery的语法，只需要掌握一些使用规则，即可快速上手。

## 特性
首先感谢Vue.js的开发者们，没有你们的框架基础，一切实现起来将花耗更多的时间和精力，并且稳定性需要更细致的考量。
> * SweetVue是基于Vue.js和jQuery开发的响应式组件框架，其设计理念同时结合了Xaml设计思想，使用户可通过定义客制化标签来使用预置组件，或是利用xBinding来实现模板化列表。
> * 与Vue.js双向绑定思想相同，Sweet也支持通过监视变量来改变UI的渲染，但不同的是，Vue提倡组件数据的封闭管理，组件与组件之间相对独立，彼此间数据的耦合性低，用户仍可通过Vuex等方式进行全局变量的管理。而Sweet强调了外部引用，多个组件之间通过xData来引用外部全局变量。通过二次监听的方式，由一个变量控制多个组件的数据绑定，从而简化了与外部交流的难度。当然这里不否认组件封闭式管理是正确的，只是有时仍需要与外界变量进行沟通。
> * Sweet支持通过修改css样式或通过xTheme等属性修改基础控件的样式，使用户能够个性化控件在项目中的表现力。当然，有些组件的样式修改范围是有限的，以保证基础样式的正确性，我们仍将不断地改进架构，力求使用户能够尽可能方便的修改出满足自己需要的样式。
> * Sweet支持通过用户自定义模板，并利用&lt;x-binding&gt;标签来快速绑定自定义模板实现相应列表功能，同时可通过{{x.binding.属性名}}来实现响应式数据绑定。

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
组件的引用外层需包裹一个&lt;div xSweet="UI"&gt;标签
```html
<div xSweet="UI">
    <progress-ring></progress-ring>
</div>
```
    当然你也可以在<body>中引入全局的<div xSweet="UI">标签,这样就不需要再一一包裹外层标签了。
    但是要注意绝对不允许在<div xSweet="UI">标签内写<script>脚本。


## Sweet 组件
目前Sweet一共包含13个基本组件
```html
<glass-button>  <!-- FDS样式按钮 -->
<checkbox>  <!-- 复选框 -->
<combobox>  <!-- 下拉框 -->
<searchbox> <!-- 搜索框 -->
<progress-ring> <!-- 进度环 -->
<progress-bar>  <!-- 进度条 -->
<flipview>  <!-- 滚动播放视图 -->
<scroll-sticky> <!-- 自动吸顶标签 -->
<toggle-switch> <!-- 触发器按钮 -->
<treeview>  <!-- 树形菜单视图 -->
<calendar-view> <!-- 日历表视图 -->
<parallax-view> <!-- 渐进背景视图 -->
<x-binding> <!-- 模板绑定组件 -->
```

### GlassButton
- [x] 暗黑主题
- [x] 重定义样式
- [x] 可嵌套数据
- [ ] 固定数据绑定(xJson)
- [ ] 响应式数据绑定(xData)
- [ ] 回调事件(xFunc)

|    属性(attr)    |     可选值(prop)   | 必填(required)|说明(statement)|
|:----------------:|:-----------------:|:-------------:|:------------:|
|   xTheme   |     light,dark   |  No    | 样式主题,缺省为亮色  |

```html
<glass-button>OK</glass-button>
<glass-button xTheme="dark">OK</glass-button>   <!-- 暗色主题按钮 -->
<glass-button class="xxx" style="color: rgba(0,153,204,1);">OK</glass-button>   <!-- 重定义Css -->
```

### CheckBox
- [ ] 暗黑主题
- [x] 重定义样式(局部)
- [ ] 可嵌套数据
- [ ] 固定数据绑定(xJson)
- [ ] 响应式数据绑定(xData)
- [ ] 回调事件(xFunc)

|    属性(attr)    |     可选值(prop)   | 必填(required)|说明(statement)|
|:----------------:|:-----------------:|:-------------:|:------------:|
|   xContent   |    {文本内容}   |  No    | 复选框内容  |

```html
<checkbox></checkbox>
<checkbox xContent="OK"></checkbox>   <!-- 复选框内容 -->
<checkbox style="color: rgba(0,153,204,1);">OK</checkbox>   <!-- 重定义Css(目前只支持color) -->
```

### ComboBox
- [ ] 暗黑主题
- [ ] 重定义样式
- [x] 可嵌套数据
- [x] 固定数据绑定(xJson)
- [x] 响应式数据绑定(xData)
- [x] 回调事件(xFunc)

|    属性(attr)    |     可选值(prop)   | 必填(required)|说明(statement)|
|:----------------:|:-----------------:|:-------------:|:------------:|
|   xJson   |     {变量名}   |  No    | Json数据  |
|   xData   |     {变量名},{Url}   |  No    | xData数据  |
|   xFunc   |     {函数名}   |  No    | 回调函数(val,index)  |


#### 对于ComboBox,您可以通过三种方式绑定数据
方式一
```html
<combobox xFunc="Call">
    <p>a</p>
    <p value="b">b</p>
    <p>c</p>
</combobox>
```
直接在combobox标签内部添加元素,元素标签没有限制,但最好使用&lt;option&gt;或&lt;p&gt;标签等包含选项内容,若标签含有value,则该选项返回值为value,否则该项回调返回值为索引index。
```javascript
//回调函数//参数一:当前选项value//参数二:当前选项index//
function Call(val,index){
    alert(val,index);
}
```

方式二
```javascript
let json = [
    {name:"张三",value:"1",children:[
        {name:"李维",value:"11",children:[
            {name:"刘法",value:"111",children:null}
        ]},
        {name:"灵灵",value:"2",children:null},
        {name:"周兰",value:"3",children:null}
    ]},
    {name:"李四",value:"4",children:null},
    {name:"王二麻子",value:"5",children:null}
];
```
```html
<combobox xJson="json"></combobox>
```
通过xJson形式添加，此方法不具备双向绑定，因此初始化后外部变量(json)的变化不影响combobox的选项。

方式三
```javascript
let data = {xData:[
    {name:"张三",value:"1",children:[
        {name:"李维",value:"11",children:[
            {name:"刘法",value:"111",children:null}
        ]},
        {name:"灵灵",value:"2",children:null},
        {name:"周兰",value:"3",children:null}
    ]},
    {name:"李四",value:"4",children:null},
    {name:"王二麻子",value:"5",children:null}
]};
```
```html
<combobox xData="data"></combobox>
```
通过xData形式添加，此方法可全局双向绑定，注意当前data初始化时，数据应当添加在data.xData中，当外部变量data.xData变化时，combobox内部选项会随之一起改变。

```html
<combobox xData="/myaction/getdata"></combobox>
```
你也可以在xData直接输入Url,它将在页面初始化时自动从Url获取数据，但是此后同样无法再改变内部数据。

### SearchBox
- [ ] 暗黑主题
- [x] 重定义样式(局部)
- [ ] 可嵌套数据
- [ ] 固定数据绑定(xJson)
- [ ] 响应式数据绑定(xData)
- [x] 回调事件(xFunc)

|    属性(attr)    |     可选值(prop)   | 必填(required)|说明(statement)|
|:----------------:|:-----------------:|:-------------:|:------------:|
|   xIcon   |    Search, Filter, Check, Edit, Submit, Voice 等   |  No    | 搜索图标,缺省为Search  |
|   xIconColor   |    {颜色值},{rgba}   |  No    | 搜索图标颜色  |
|   xChange   |    {函数名}   |  No    | 文本内容改变回调函数(val)  |
|   xIconClick   |    {函数名}   |  No    | 搜索图标点击事件(val)  |


创建一个搜索框
```html
<searchbox></searchbox>
```

回调事件
```javascript
function Call(val){
    console.log(val);
}
function Click(val){
    console.log(val);
}
```
```html
<searchbox xChange="Call" xIconClick="Click"></searchbox>
```
同时你也可以通过value属性获取当前搜索框的值
```javascript
function CurrentText(id){
    let input = document.getElementById(id);
    console.log(input.getAttribute("value"));
}
```

### ProgressRing
- [ ] 暗黑主题
- [x] 重定义样式
- [ ] 可嵌套数据
- [ ] 固定数据绑定(xJson)
- [ ] 响应式数据绑定(xData)
- [ ] 回调事件(xFunc)

|    属性(attr)    |     可选值(prop)   | 必填(required)|说明(statement)|
|:----------------:|:-----------------:|:-------------:|:------------:|
|   xSize   |    l,m,s,xs   |  No    | 进度环大小,缺省为xs  |
|   xColor   |    {颜色值},{rgba}   |  No    | 进度环颜色  |


```html
<progress-ring></progress-ring>
```

### ProgressBar
- [ ] 暗黑主题
- [x] 重定义样式
- [ ] 可嵌套数据
- [ ] 固定数据绑定(xJson)
- [x] 响应式数据绑定(xPercent)
- [x] 回调事件(xFunc)

|    属性(attr)    |     可选值(prop)   | 必填(required)|说明(statement)|
|:----------------:|:-----------------:|:-------------:|:------------:|
|   xLoading   |    true,false   |  No    | 无进度等待,缺省为false  |
|   xColor   |    {颜色值},{rgba}   |  No    | 进度条颜色  |
|   xPercent   |    {变量名}   |  No    | ratio百分比数据  |
|   xFunc   |    {<函数名1> <函数名2>[可选]}}   |  No    | 回调函数(percent)  |


```javascript
let p = {};
function process(percent){
    console.log(`percent: ${percent}`);
}
function finished(percent){
    console.log('finished');
}
```
```html
<button onClick="p.ratio++;"></button>    <!-- 通过改变p来改变进度 -->
<progress-bar xPercent="p" xFunc="process"></progress-bar>  <!-- 添加监听函数 -->
<progress-bar xPercent="p" xFunc="process finished"></progress-bar> <!-- 添加完成监听函数,用空格隔开 -->
```
监听函数可在进度条改变比率时执行函数,参数percent为比率(0-∞).

```html
<progress-bar xLoading="true"></progress-bar>  <!-- 无进度等待 -->
```

### FlipView
- [x] 暗黑主题
- [ ] 重定义样式
- [x] 可嵌套数据
- [ ] 固定数据绑定(xJson)
- [ ] 响应式数据绑定(xPercent)
- [ ] 回调事件(xFunc)

|    属性(attr)    |     可选值(prop)   | 必填(required)|说明(statement)|
|:----------------:|:-----------------:|:-------------:|:------------:|
|   xTheme   |    dark,light   |  No    | 主题颜色,缺省为light  |
|   xSpeed   |    {数值}   |  No    | 速度(ms),缺省为1000  |
|   xPeriod   |    {数值}   |  No    | 周期(ms),缺省为5000  |


FlipView中可嵌套任何内容,但是要注意每页内容外层需嵌套一个&lt;div&gt;.

```html
<flipview style="height: 500px;">
    <div><img alt="" src="res/10.jpg"/></div>
    <div><img alt="" src="res/158.jpg"/></div>
    <div><img alt="" src="res/159.jpg"/></div>
</flipview>
```

### ScrollSticky
- [ ] 暗黑主题
- [ ] 重定义样式
- [x] 可嵌套数据
- [ ] 固定数据绑定(xJson)
- [ ] 响应式数据绑定(xPercent)
- [ ] 回调事件(xFunc)

|    属性(attr)    |     可选值(prop)   | 必填(required)|说明(statement)|
|:----------------:|:-----------------:|:-------------:|:------------:|
|   xOffset   |    {数值}   |  No    | 偏移率,缺省为0  |
|   xOuterWidth   |    true,false   |  No    | 是否启用绝对宽度  |


ScrollSticky可使相对布局元素滚动吸顶,使布局从any->fixed,并保留原位置占位.

```html
<scroll-sticky>
    <glass-button>OK</glass-button>
</scroll-sticky>
```

一般情况下用户可根据情况自行考虑是否启用xOuterWidth,例如Flex布局中一般不启用.
```html
<scroll-sticky xOuterWidth="true">
    <glass-button>OK</glass-button>
</scroll-sticky>
```

### ToggleSwitch
- [x] 暗黑主题
- [x] 重定义样式
- [ ] 可嵌套数据
- [ ] 固定数据绑定(xJson)
- [ ] 响应式数据绑定(xPercent)
- [x] 回调事件(xFunc)

|    属性(attr)    |     可选值(prop)   | 必填(required)|说明(statement)|
|:----------------:|:-----------------:|:-------------:|:------------:|
|   xOnContent   |    {文本值}   |  No    | 激活文本,缺省为On  |
|   xOffContent   |    {文本值}   |  No    | 关闭文本,缺省为Off  |
|   xOnContentColor   |    {颜色值},{rgba}   |  No    | 激活文本色,缺省为主题色  |
|   xOffContentColor   |    {颜色值},{rgba}   |  No    | 关闭文本色,缺省为主题色  |
|   xTheme   |    dark,light   |  No    | 主题颜色,缺省为light  |
|   xIsOn   |    true,false   |  No    | 是否默认激活  |
|   xOutline   |    {颜色值},{rgba}   |  No    | 轮廓颜色,缺省为主题色  |
|   xRingBackground   |    {颜色值},{rgba}   |  No    | 圆钮颜色,缺省为主题色  |
|   xOnBackground   |    {颜色值},{rgba}   |  No    | 激活背景色,缺省为主题色  |
|   xFunc   |    {函数名}   |  No    | 回调函数(status)  |


```javascript
function toggle(status){
    console.log(status);
}
```
```html
<toggle-switch xOnContent="Open" xOffContent="Close" xIsOn="true" xFunc="toggle"></toggle-switch>
```