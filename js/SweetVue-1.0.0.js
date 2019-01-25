/*Copyright by Creator SN™*/
(function(){
    //UIControls Init//
    function SelfChecking()
    {
        try{
            $(function(){});
        }
        catch(e){
            console.error(`Sweet Warning: jquery.js is required, please use <script src="{path}"></script> to import it before sweetvue.js is imported!`,'color: red');
            return false;
        }
        try{
            new Vue();
        }
        catch(e){
            console.error(`Sweet Warning: vue.js is required, please use <script src="{path}"></script> to import it before sweetvue.js is imported!`,'color: red');
            return false;
        }
        return true;
    }
    if(!SelfChecking()){return false;}
    $(function(){
        Vue.component('glass-button',{
            template:`<button class="gbutton" :class="{light:theme}"><slot></slot></button>`,
            data: function(){
                return {
                    theme: true
                }
            },
            mounted: function(){
                let el = this.$el;
                if($(el).attr("xTheme")=="dark")
                    this.theme = false;
            }
        });
        //CheckBox//xFunc,pFunc//
        Vue.component('checkbox',{
            template:`<div class="checkBox" @click="Checked">
                        <p class="checkBox" style="font-family: Segoe MDL2; cursor: pointer;" ref="fontstatus">&#xE003;</p>
                        <p style="margin-left: 5px;">{{xContent}}</p>
                    </div>`,
            data: function(){
                return {isCheck:false, xContent:""};
            },
            mounted:function(){
                var el = this.$el;
                this.xContent = $(el).attr("xContent");
            },
            methods:{
                Checked: function(){
                    if(this.isCheck)
                        this.$refs.fontstatus.innerHTML = "&#xE003;";
                    else
                        this.$refs.fontstatus.innerHTML = "&#xE005;";
                    this.isCheck = !this.isCheck;
                    this.Func();
                },
                Func: function(){
                    let el = this;
                    if($(el.$el).attr("xFunc")!=undefined)
                        eval(`${$(el.$el).attr("xFunc")}(${this.isCheck})`);
                    if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                        eval(`this.$parent.${$(el.$el).attr("pFunc")}('${$(el.$el).attr("value")}',${this.isCheck})`);
                }
            }
        });
        //SearchBox//xIcon,xIconColor,xChange,xIconClick//
        Vue.component('searchbox',{
            template:`<div class="sinput search" style="height:25px;" :value="content">
                        <input style="width:100%; background:transparent; border:none; outline:none; box-shadow:none;" v-model="content" ref="input"/>
                        <p class="search-icon" :style="xIconColor" @mousedown="Clicked" @mouseup="ClickedUp" ref="icon">{{xIcon}}</p>
                    </div>`,
            data: function(){
                return {
                    xIcon:"&#xE721;",
                    xIconColor:
                    {
                        color:"rgba(36,36,36,1)"
                    },
                    content:""
                };
            },
            mounted:function(){
                let el = this.$el;
                let target = this;
                switch($(el).attr("xIcon"))
                {
                    case "Search":
                        this.xIcon = "\uE721";
                        break;
                    case "Filter":
                        this.xIcon = "\uE16E";
                        break;
                    case "Check":
                        this.xIcon = "\uE15E";
                        break;
                    case "Edit":
                        this.xIcon = "\uE70F";
                        break;
                    case "Submit":
                        this.xIcon = "\uE930";
                        break;
                    case "Voice":
                        this.xIcon = "\uE1D6";
                        break;
                    case "Calendar":
                        this.xIcon = "\uE787";
                        break;
                    case "Upload":
                        this.xIcon = "\uE74A";
                        break;
                    default:
                        this.xIcon = "\uE721";
                        break;
                }
                if($(el).attr("xIconColor")!=null)
                    this.xIconColor.color = $(el).attr("xIconColor");
                if($(el).attr("placeholder")!=null)
                    $(this.$refs.input).attr("placeholder",$(el).attr("placeholder"));
                if($(el).attr("readonly")=="readonly")
                    $(this.$refs.input).attr("readonly","readonly");
                if($(el).attr("xChange")!=null)
                    $(this.$refs.input).keyup(function(){eval(`${$(el).attr("xChange")}("${$(target.$refs.input).val()}")`)});
                if($(el).attr("pChange")!=null)
                    $(this.$refs.input).keyup(function(){eval(`target.$parent.${$(el).attr("pChange")}("${$(target.$refs.input).val()}")`)});
                if($(el).attr("xIconClick")!=null){
                    $(this.$refs.input).keyup((e)=>{
                        if(e.keyCode==13)
                            eval(`target.$parent.${$(el).attr("pIconClick")}("${$(target.$refs.input).val()}")`);
                    });
                    $(this.$refs.icon).click(function(){eval(`${$(el).attr("xIconClick")}("${$(target.$refs.input).val()}")`)});
                }
                if($(el).attr("pIconClick")!=null){
                    $(this.$refs.input).keyup((e)=>{
                        if(e.keyCode==13)
                            eval(`target.$parent.${$(el).attr("pIconClick")}("${$(target.$refs.input).val()}")`);
                    });
                    $(this.$refs.icon).click(function(){eval(`target.$parent.${$(el).attr("pIconClick")}("${$(target.$refs.input).val()}")`)});
                }
                if($(el).attr("xModel")!=null)
                    this.xModel($(el).attr("xModel"));
            },
            methods:{
                Clicked: function(){
                    this.xIconColor.color = "rgba(242,242,242,1)";
                },
                ClickedUp: function(){
                    if($(this.$el).attr("xIconColor")!=null)
                        this.xIconColor.color = $(this.$el).attr("xIconColor");
                    else
                        this.xIconColor.color = "rgba(36,36,36,1)";
                },
                xModel (ParamName) {
                    let el = this;
					// let val = "";	//用val存储content的值//属性与存取描述符//因为Object.defineProperty中的this不一定指当前this，所以在不用el的情况下可以用val做中介///
                    Object.defineProperty(el,'content',{  //设立content监听//
                        get: function(){
							eval(`content = el.$parent.${ParamName};`);
                            return content;
                        },
                        set: function(value){
							content = value;
                            eval(`el.$parent.${ParamName} = content;`);
                        }
                    });
                }
            }
        });
        //ComboBox//xJson,xData,xFunc,pFunc//
        Vue.component('combobox',{
            template:`<div class="combobox" ref="co_head" style="width: 80px;" :style="{'z-index':status?500:''}" @click="isSelected">
                        <div v-show="false" ref="itemContainer"><slot></slot></div>
                        <div v-show="status" class="combobox-item-container" ref="co_items">
                            <option v-for="(item,index) in items" :class="{choose:index==currentIndex}" :index="index" @click="Choose">{{item.name==null?item:item.name}}</option>
                        </div>
                        <p style="width: 100%; padding: 5px;">{{now}}</p>
                        <p style="padding: 5px; font-family: Segoe MDL2; font-size: 12px; color: rgba(36,36,36,0.5);">&#xE70D;</p>
                    </div>`,
            data: function(){
                return {
                        status:false,
                        items:["ComboBox"],
                        now:"Now",
                        value:-1,
                        currentIndex:-1
                    };
            },
            mounted:function(){
                let el = this.$el;
                let target = this;
                if($(this.$refs.itemContainer).children("*").length>0)  //以插槽形式赋值//
                {
                    let titems = [];
                    $.each($(this.$refs.itemContainer).children("*"),function(i,item){
                        titems.push({
                                name:$(item).text(),
                                value:$(item).attr("value")==undefined?i:$(item).attr("value")
                            });
                    });
                    this.items = titems;
                    this.now = titems[0].name;
                }
                else if($(el).attr("xJson")!=undefined) //以Json形式赋值//
                {
                    this.items = eval(`${$(el).attr("xJson")}`);
                    this.updateItems();
                }
                else if($(el).attr("xData")!=undefined)
                {
                    let uri = $(el).attr("xData");
                    if(uri.indexOf('/')>=0)
                    {
                        Sweet.AjaxGetAsync(uri,function(data){
                            if(data!=null&&data.length>0)
                                target.items = data;
                        },true);
                    }
                    else
                    {
                        this.items = eval(`${uri}.xData`);
                        Object.defineProperty(eval(`${uri}`),'xData',{  //设立xData监听//
                            get: function(){
                                return xData;
                            },
                            set: function(value){
                                xData = value;
                                target.items = eval(`${uri}.xData`);
                                target.updateItems();
                                target.now = target.items[0].name;
                                target.value = target.items[0].value;
                            }
                        });
                        this.updateItems();
                    }
                }
                if($(el).attr("xNow")!=undefined)
                {
                    this.now = $(el).attr("xNow");
                }
            },
            methods:{
                isSelected: function(e){
                    this.status=!this.status;
                },
                Choose: function(e){
                    e.stopPropagation();    //阻止冒泡事件//
                    this.now=e.target.innerHTML;    //更新状态//
                    var index = $(e.target).index();
                    this.value = this.items[index].value;
                    this.currentIndex = index;
                    // $(this.$refs.co_items).animate({top:-30*index+"px"},200);
                    let el = this;
                    $(this.$refs.co_items).animate({
                        scrollTop:$(this.$refs.co_items).children("option").get(index).offsetTop+"px"
                    },200,function(){
                        el.status=!el.status;
                    });
                    //xFunc//
                    if($(el.$el).attr("xFunc")!=undefined)
                        eval(`${$(el.$el).attr("xFunc")}('${this.value}',${this.currentIndex})`);
                    if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                        eval(`this.$parent.${$(el.$el).attr("pFunc")}('${this.value}',${this.currentIndex})`);
                },
                updateItems: function(){
                    for(let i = 0; i < this.items.length; i++)
                    {
                        if(this.items[i].default==true)
                        {
                            this.now = this.items[i].name;
                            this.value = this.items[i].value;
                            this.currentIndex = i;
                            break;
                        }
                    }
                    this.now = this.value==-1?this.items[0].name:this.now;
                    this.value = this.value==-1?this.items[0].value:this.value;
                    this.currentIndex = this.currentIndex==-1?0:this.currentIndex;
                }
            }
        });
        //ProgressRing//xSize,xColor//
        Vue.component('progress-ring',{
            template:`<div :class="['s-progressring',size]">
                        <p v-for="i in num" :style="{background:color}"></p>
                    </div>`,
            data:function(){
                return {
                    num: 5,
                    size: "xs",
                    color: ""
                }
            },
            mounted: function(){
                var el = this.$el;
                var legal = "l,m,s,xs";
                if(legal.indexOf($(el).attr("xSize"))>=0)
                    this.size = $(el).attr("xSize");
                if($(el).attr("xColor")!=undefined)
                    this.color = $(el).attr("xColor");
            }
        });
        //ProgressBar//xLoading,xColor,xPercent,xFunc(percent)//
        Vue.component('progress-bar',{
            template:`<div class="s-progressbar" :class="{normal:!loading}" :value="percent<=100?percent:100">
                        <p v-for="i in num" :style="{background:color}"></p>
                        <i v-if="!loading" :style="{'width':(percent<=100?percent:100)+'%',background:color}"></i>
                    </div>`,
            data:function(){
                return {
                    num: 0,
                    percent: 0,
                    loading: false,
                    color: "",
                    isFinished: false
                }
            },
            mounted: function(){
                var el = this.$el;
                if($(el).attr("xColor")!=undefined)
                    this.color = $(el).attr("xColor");
                if($(el).attr("xLoading")=="true")
                {
                    this.loading = true;
                    this.num = 5;
                }
                else if($(el).attr("xPercent")!=undefined)
                {
                    let target = this;
                    let pName = $(el).attr("xPercent");
                    this.percent = eval(`${pName}.ratio`)==undefined?0:eval(`${pName}.ratio`);
                    Object.defineProperty(eval(`${pName}`),'ratio',{
                        get: function(){
                            return ratio;
                        },
                        set: function(value){
                            ratio = value;
                            target.percent = eval(`${pName}.ratio`);
                        }
                    });
                    eval(`${pName}.ratio=0`);   //单属性值一定要初始化//
                }
            },
            watch: {
                percent: function(){
                    let el = this.$el;
                    let funcs = $(el).attr("xFunc");
                    let func = null;
                    if(funcs!=undefined)
                    {
                        func = funcs.toString().split(' ')[0];
                        eval(`${func}(${this.percent})`);
                        if(this.percent<100){   //当比例小于100将重置isFinished//
                            this.isFinished = false;
                        }
                        if(funcs.split(' ').length>1)   //如果存在finished函数则执行//
                        {
                            func = funcs.toString().split(' ')[1];
                            if(this.percent>=100&&!this.isFinished){
                                eval(`${func}(${this.percent})`);
                                this.isFinished = true;
                            }
                        }
                    }
                }
            }
        });
        //FlipView//xSpeed,xPeriod,xTheme//
        Vue.component('flipview',{
            template:`<div class="flipview">
                        <div class="fake-package" ref="package"><slot></slot></div>
                        <div class="flip-container" ref="container">

                        </div>
                        <p class="slidebtn" style="left: 0px;" @click="slide_last">&#xE0E2;</p>
                        <p class="slidebtn" style="right: 0px;" @click="slide_next">&#xE0E3;</p>
                        <span class="bot-controller" ref="bot_controller">
                            <p v-for="item in fakeArray" @click="slide_index">{{item.value}}</p>
                            <button @click="slider_pause">&#xE103;</button>
                        </span>
                    </div>`,
            data:function(){
                return {
                    speed:1000,
                    lock:true,
                    timer:null,
                    count:0,
                    length:0,
                    fakeArray:new Array(),
                    pause:false,
                    period:5000
                }
            },
            mounted: function(){
                var el = this.$el;
                if($(el).attr("xSpeed")>0)
                    this.speed = $(el).attr("xSpeed");
                if($(el).attr("xPeriod")>0)
                    this.period = $(el).attr("xPeriod");
                if($(el).attr("xTheme")=="dark")
                {
                    $(el).find(".slidebtn").attr("class","slidebtn dark");
                    $(el).find(".bot-controller").attr("class","bot-controller dark");
                }
                this.slider_init();
                this.slider();
            },
            methods:{
                slider_init: function(){
                    this.length = $(this.$refs.package).children("div").length;
                    $(this.$refs.container).append($(this.$refs.package).children("div").get(0));
                    for(var i=0;i<this.length;i++){i==0?this.fakeArray.push({value:"\uF127"}):this.fakeArray.push({value:"\uF126"});}  //纯数组对象无法动态双向绑定//
                },
                slide_next: function(f=1.0){
                    if(this.lock){  //控制slider的异步等待//
                        var el = this;  //用el来引用this以便在setTimeout方法中调用this.lock//不允许直接引用this.lock成员变量原因尚不明确(因为成员变量非静态?)//
                        el.lock = false;
                        this.counton(); //计数器加一//
                        var container = this.$refs.container;   //渲染容器//
                        var package_ = this.$refs.package;   //假仓库容器//
                        var speed = f>0?Math.round(this.speed/f):this.speed;
                        $(package_).children("div").css("margin","0px"); //清除假仓库中的Margin//
                        $(container).append($(package_).children("div").get(0));
                        $($(container).children("div").get(0)).animate({
                            margin:"0px 0px 0px -100%"
                        },{ duration: speed, easing: "swing" });
                        setTimeout(function(){
                            $(package_).append($(container).children("div").get(0));
                            el.lock = true;
                            el.slider();   //恢复时钟秩序//
                        },speed);
                    }
                },
                slide_last: function(f=1.0){
                    if(this.lock){
                        var el = this;
                        el.lock = false;
                        this.countdis();    //计数器减一//
                        var container = this.$refs.container;
                        var package_ = this.$refs.package;
                        var speed = f>0?Math.round(this.speed/f):this.speed;
                        $(package_).children("div").css("margin","0px"); //清除假仓库中的Margin//
                        $($(container).children("div").get(0)).before($(package_).children("div:last-child"));
                        $($(container).children("div").get(0)).css("margin","0px 0px 0px -100%");
                        $($(container).children("div").get(0)).animate({
                            margin:"0px 0px 0px 0px"
                        },{ duration: speed, easing: "swing" });
                        setTimeout(function(){
                            $($(package_).children("div").get(0)).before($(container).children("div:last-child"));
                            el.lock = true;
                            el.slider();   //恢复时钟秩序//
                        },speed);
                    }
                },
                slide_index: function(e){   //理论上无畏惧异步冲突//由于不同次触发函数均为右移或左移//remain加和一定等于最终值//如果真出现问题可在data设全局timer来控制异步等待//
                    var remain = $(e.target).index() - this.count;
                    var remain_static = Math.abs($(e.target).index() - this.count);
                    var el = this;
                    var timer = setInterval(function(){
                        if(el.lock){
                            if(remain<0)
                            {
                                el.slide_last(remain_static);
                                remain++;
                            }
                            else if(remain>0)
                            {
                                el.slide_next(remain_static);
                                remain--;
                            }
                            else
                                clearInterval(timer);
                        }
                    },10);
                },
                slider: function(){
                    clearInterval(this.timer);
                    var el = this;
                    this.timer = setInterval(function(){
                        el.slide_next();
                    },el.period);
                },
                slider_pause: function(e){
                    if(this.pause)
                    {
                        this.slider();
                        this.pause = false;
                        e.target.innerHTML = "\uE103";
                    }
                    else
                    {
                        clearInterval(this.timer);
                        this.pause = true;
                        e.target.innerHTML = "\uE102";
                    }
                },
                counton: function(){
                    if(this.count>=this.length-1)
                    {
                        this.fakeArray[this.count].value = "\uF126";
                        this.count = 0;
                        this.fakeArray[this.count].value = "\uF127";
                    }
                    else
                    {
                        this.fakeArray[this.count].value = "\uF126";
                        this.count++;
                        this.fakeArray[this.count].value = "\uF127";
                    }
                },
                countdis: function(){
                    if(this.count<=0)
                    {
                        this.fakeArray[this.count].value = "\uF126";
                        this.count = this.length-1;
                        this.fakeArray[this.count].value = "\uF127";
                    }
                    else
                    {
                        this.fakeArray[this.count].value = "\uF126";
                        this.count--;
                        this.fakeArray[this.count].value = "\uF127";
                    }
                }
            }
        });
        //ScrollSticky//xOffset(0),xOuterWidth//
        Vue.component('scroll-sticky',{
            template:`<div>
                        <div ref="ori"><slot></slot></div>
                        <div v-show="sticky" style="visibility: hidden;" ref="clone"></div>
                    </div>`,
            data: function(){
                return {
                    sticky: false,
                    left: 0,
                    top: 0,
                    outerWidth: 0,
                    offset: 0,
                    css: ''
                }
            },
            mounted: function(){
                let el = this.$el;
                let target = this;
                let item = $(this.$refs.ori).children("*").get(0);
                
                this.top = item.offsetTop;
                this.left = $(item).offset().left;
                this.outerWidth = $(item).width();
                if($(el).attr("xOuterWidth")=="true")
                    this.outerWidth = $(item).outerWidth();
                this.css = $(item).attr("style")==undefined?"":$(item).attr("style");
                
                if($(el).attr("xOffset")!=undefined)
                    this.offset = $(el).attr("xOffset");
                else
                    this.offset = 0;
                $(this.$refs.clone).attr("style",$(item).attr("style"));
                $(this.$refs.clone).attr("class",$(item).attr("class"));
                $(document).scroll(function(){
                    if(window.scrollY>target.top-target.offset)
                    {
                        target.sticky = true;
                        $(item).css("position","fixed");
                        $(item).css("left",target.left+"px");
                        $(item).css("top",target.offset + "px");
                        $(item).width(target.outerWidth);
                    }
                    else
                    {
                        target.sticky = false;
                        $(item).attr("style",target.css);
                    }
                });
            }
        });
        //ToggleSwitch//xOnContent,xOffContent,xOnContentColor,xOffContentColor,xTheme,xIsOn,xOutline,xRingBackground,xOnBackground,xFunc,pFunc//
        Vue.component('toggle-switch',{
            template:`<div class="toggle-switch" @click="toggle">
                        <div :class="{'toggle-on':active, dark:darktheme}" :style="themeOutlineStyle()">
                            <p :style="themeRingStyle()"></p>
                        </div>
                        <p class="content" :class="{dark:darktheme}" :style="themeContentStyle()">{{statusContent}}</p>
                    </div>`,
            data: function(){
                return {
                    active:false,
                    darktheme:false,
                    statusContentArray:[
                        "On",
                        "Off"
                    ],
                    statusContent:"Off",
                    theme: {
                        highlightBackground: '',
                        outline: '',
                        ring: '',
                        onContentColor: '',
                        offContentColor: ''
                    },
                    themeOutlineStyle: function(){
                        if(!this.active)
                            return {
                                'border-color':this.theme.outline
                            }
                        else
                            return{
                                'background': this.theme.highlightBackground
                            }
                    },
                    themeRingStyle: function(){
                        if(!this.active)
                            return {
                                'background':this.theme.ring
                            }
                    },
                    themeContentStyle: function(){
                        if(!this.active)
                            return {
                                'color':this.theme.offContentColor
                            }
                        else
                            return{
                                'color': this.theme.onContentColor
                            }
                    }
                }
            },
            mounted: function(){
                let el = this.$el;
                if($(el).attr("xOnContent")!=undefined)
                    this.statusContentArray[0]=$(el).attr("xOnContent");
                if($(el).attr("xOffContent")!=undefined)
                    this.statusContentArray[1]=$(el).attr("xOffContent");
                if($(el).attr("xOnContentColor")!=undefined)
                    this.theme.onContentColor=$(el).attr("xOnContentColor");
                if($(el).attr("xOffContentColor")!=undefined)
                    this.theme.offContentColor=$(el).attr("xOffContentColor");
                if($(el).attr("xTheme")=="dark")
                    this.darktheme = true;
                if($(el).attr("xIsOn")=="true")
                    this.toggle();
                if($(el).attr("xOutline")!=undefined)
                    this.theme.outline=$(el).attr("xOutline");
                if($(el).attr("xRingBackground")!=undefined)
                    this.theme.ring=$(el).attr("xRing");
                if($(el).attr("xOnBackground")!=undefined)
                    this.theme.highlightBackground=$(el).attr("xOnBackground");
                this.updateStatus();
            },
            methods:{
                toggle: function(){
                    this.active=!this.active;
                },
                updateStatus: function(){
                    $(this.$el).attr("value",this.active);
                    if(this.active)
                        this.statusContent=this.statusContentArray[0];
                    else
                        this.statusContent=this.statusContentArray[1];
                }
            },
            watch: {
                active: function(){
                    let el = this.$el;
                    if($(el).attr("xFunc")!=undefined)
                        eval(`${$(el).attr("xFunc")}(${this.active})`);
                    if($(el).attr("pFunc")!=undefined)  //pFunc//
                        eval(`this.$parent.${$(el).attr("pFunc")}(${this.active})`);
                    this.updateStatus();
                }
            }
        });
        //TreeView//xJson//
        Vue.component('treeview',{
            template:`<div>
                        <div v-for="(item,index) in objs" :class="[customerClass]">
                            <div class="item" :class="{'drop-down':isDropDown[index],highlight:item.Choose}" :style="{padding:'3px '+ padding*25+'px'}" @click="DropDown(index)">
                                <p class="icon" style="font-family: Segoe MDL2;" :style="{visibility: item.children!=null ? 'visible' : 'hidden'}">&#xE0E3;</p>
                                <p class="content">{{item.name}}</p>
                            </div>
                            <transition name="treeview">
                            <treeview v-if="item.children!=null" v-show="isDropDown[index]" :xChildIndex="index"></treeview>
                            </transition>
                        </div>
                    </div>`,
            data: function(){
                return {
                    objs:[],
                    rootObjs:[],
                    padding:1,//层叠偏移大小//
                    isDropDown:new Array(),
                    customerClass:'treeview'
                }
            },
            mounted: function(){
                let el = this.$el;
                if($(el).attr("xJson")!=undefined)  //xJson不存在将以默认空数组返回//
                {
                    this.objs = eval(`${$(el).attr("xJson")}`);
                    this.rootObjs = this.objs;
                }
                else if($(el).attr("xChildIndex")!=undefined)
                {
                    let index = $(el).attr("xChildIndex");
                    this.objs = this.$parent.objs[index].children;
                    this.rootObjs = this.$parent.rootObjs;
                    this.padding = this.$parent.padding + 1;
                    if($(this.$parent.$el).attr("xFunc")!=undefined)
                        $(el).attr("xFunc",$(this.$parent.$el).attr("xFunc"));
                }
                this.objInit();
            },
            methods: {
                objInit: function(){
                    for(let i = 0; i < this.objs.length; i++){
                        this.isDropDown.push(false);
                    }
                },
                DropDown: function(index){
                    let nowStatus = this.isDropDown[index];
                    Vue.set(this.isDropDown,index,!nowStatus);  //我们可以动态控制数据的增减，但是我们却无法做到对某一条数据的修改//用Vue.set解决此问题//
                    
                    //xFunc//
                    if($(this.$el).attr("xFunc")!=undefined)
                        eval(`${$(this.$el).attr("xFunc")}('${this.objs[index].value}')`);
                    
                    this.ClearChoose(this.rootObjs);
                    let t = this.objs[index];
                    t.Choose = true;
                    Vue.set(this.objs,index,t);
                },
                ClearChoose: function(objs){
                    for(let i = 0; i < objs.length; i++){
                        let t = objs[i];
                        t.Choose = false;
                        Vue.set(objs,i,t);
                        if(objs[i].children!=null)
                            this.ClearChoose(objs[i].children);
                    }
                }
            }
        });
        //CalendarView//xTheme,xThemeColor,xFunc,pFunc//
        Vue.component('calendar-view',{
            template:`<div class="calendar-view" :class="{dark:theme}" :style="{background:themeColor}">
                        <div class="control-bar">
                            <transition-group name="switcher">
                            <p v-show="status==0" class="switcher" :class="{dark:theme}" :key="0">{{barCurrent.yearRing}} - {{barCurrent.yearRing+10}}</p>
                            <p v-show="status==1" class="switcher" :class="{dark:theme}" :key="1" @click="backYear">{{barCurrent.year}}年</p>
                            <p v-show="status==2" class="switcher" :class="{dark:theme}" :key="2" @click="backMonth">{{barCurrent.year}}年{{barCurrent.month}}月</p>
                            </transition-group>
                            <div class="slider-bar" :class="{dark:theme}">
                                <p @click="slideUp">&#xE098;</p>
                                <p @click="slideDown">&#xE099;</p>
                            </div>
                        </div>
                        <div style="width: 100%; height: 280px;">
                            <transition-group name="pickerContainer">
                            <div v-show="status==0" class="pickerContainer years" key="p0" ref="p0">
                                <button v-for="(year,index) in years" :class="{preview:index>10,dark:theme,choose:year==current.year}" @click="pickYear(year)">{{year}}</button>
                            </div>
                            <div v-show="status==1" class="pickerContainer months" key="p1" ref="p1">
                                <button v-for="(month,index) in months" :class="{preview:index>11,dark:theme,choose:month==current.month&&barCurrent.year==current.year}" @click="pickMonth(index)">{{month}}月</button>
                            </div>
                            <div v-show="status==2" class="pickerContainer days" key="p2" ref="p2">
                                <button class="weekday" :class="{dark:theme}" v-for="(weekday,index) in weekdays">{{weekday}}</button>
                                <button class="day" v-for="(day,index) in days" 
                                :class="{preview:!day.current,dark:theme,choose:day.num==current.date&&barCurrent.year==current.year&&barCurrent.month==current.month}"
                                :title="day.cyear+'年'+day.cmonth+'月'+day.num+'日'" @click="pickDay(day)">
                                {{day.num}}
                                </button>
                            </div>
                            </transition-group>
                        </div>
                    </div>`,
            data: function(){
                return {
                    status: 2,
                    years: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //years grid array//
                    months: [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4],   //months grid array//
                    days: [],   //days grid array//
                    dayList: [31,28,31,30,31,30,31,31,30,31,30,31], //days of one month//
                    weekdays: ['日','一','二','三','四','五','六'], //weekdays//
                    current: {  //contains current date//
                        year: new Date().getFullYear(),
                        month: new Date().getMonth() + 1,
                        date: new Date().getDate(),
                        weekday: new Date().getDay()
                    },
                    barCurrent:{    //contains picking date//
                        yearRing: parseInt(new Date().getFullYear()/10)*10, //init with current year's decade beginner//
                        year: new Date().getFullYear(),
                        month: new Date().getMonth() + 1
                    },
                    theme:false,
                    themeColor:''
                }
            },
            mounted: function(){
                let el = this.$el;
                if($(el).attr("xTheme")=="dark"){
                    this.theme = true;
                }
                if($(el).attr("xThemeColor")!=undefined){
                    this.themeColor = $(el).attr("xThemeColor");
                }
                this.updateRing();
                this.updateDays();
            },
            methods: {
                updateRing: function(){ //update decades//
                    for(let i = 0; i < this.years.length; i++){
                        Vue.set(this.years,i,this.barCurrent.yearRing+i);
                    }
                },
                pickYear: function(year){
                    this.barCurrent.year = year;
                    this.status = 1;
                },
                pickMonth: function(index){
                    if(index<11)
                        this.barCurrent.month = index + 1;
                    else
                    {
                        this.barCurrent.year++;
                        this.barCurrent.month = index % 11;
                    }
                    this.status = 2;
                    this.updateDays();
                },
                pickDay: function(day){
                    let tday = {year: day.cyear,
                        month: day.cmonth,//for the picker shouldn't min 1//
                        date: day.num};
                    this.Func(tday);
                    return {
                        year: day.cyear,
                        month: day.cmonth - 1,
                        date: day.num
                    }
                },
                backMonth: function(){
                    this.status = 1;
                },
                backYear: function(){
                    this.status = 0;
                },
                slideUp: function(){
                    switch(this.status){
                        case 0:
                        this.barCurrent.yearRing-=10;
                        this.updateRing();
                        $(this.$refs.p0).animate({margin:"100% 0px"},250);
                        $(this.$refs.p0).animate({margin:"-100% 0px"},0);
                        $(this.$refs.p0).animate({margin:"0% 0px"},250);
                        break;
                        case 1:
                        this.barCurrent.year--;
                        $(this.$refs.p1).animate({margin:"100% 0px"},250);
                        $(this.$refs.p1).animate({margin:"-100% 0px"},0);
                        $(this.$refs.p1).animate({margin:"0% 0px"},250);
                        break;
                        case 2:
                        if(this.barCurrent.month<=1)
                        {
                            this.barCurrent.month=12;
                            this.barCurrent.year--;
                        }
                        else
                            this.barCurrent.month--;
                        this.updateDays();
                        $(this.$refs.p2).animate({margin:"100% 0px"},250);
                        $(this.$refs.p2).animate({margin:"-100% 0px"},0);
                        $(this.$refs.p2).animate({margin:"0% 0px"},250);
                        break;
                    }  
                },
                slideDown: function(){
                    switch(this.status){
                        case 0:
                        this.barCurrent.yearRing+=10;
                        this.updateRing();
                        $(this.$refs.p0).animate({margin:"-100% 0px"},250);
                        $(this.$refs.p0).animate({margin:"100% 0px"},0);
                        $(this.$refs.p0).animate({margin:"0% 0px"},250);
                        break;
                        case 1:
                        this.barCurrent.year++;
                        $(this.$refs.p1).animate({margin:"-100% 0px"},250);
                        $(this.$refs.p1).animate({margin:"100% 0px"},0);
                        $(this.$refs.p1).animate({margin:"0% 0px"},250);
                        break;
                        case 2:
                        if(this.barCurrent.month>=12)
                        {
                            this.barCurrent.month=1;
                            this.barCurrent.year++;
                        }
                        else
                            this.barCurrent.month++;
                        this.updateDays();
                        $(this.$refs.p2).animate({margin:"-100% 0px"},250);
                        $(this.$refs.p2).animate({margin:"100% 0px"},0);
                        $(this.$refs.p2).animate({margin:"0% 0px"},250);
                        break;
                    }  
                },
                updateDays: function(){
                    let pickMonth = this.stringToDate(`${this.barCurrent.year}/${this.barCurrent.month}/01 00:00:00`);
                    let weekdayIndex = pickMonth.getDay();
                    let days = [];
                    let dayList = this.dayList;
                    if(this.leapYear(pickMonth.getFullYear()))
                        dayList[1] = 29;
                    for(let i = weekdayIndex - 1; i >= 0; i--){ //date that ahead of picking month//
                        days.push({
                            num:31-i,current:false,
                            cmonth:this.barCurrent.month==1?12:this.barCurrent.month-1,
                            cyear:this.barCurrent.month==1?this.barCurrent.year-1:this.barCurrent.year});
                    }
                    for(let i = 0; i < dayList[pickMonth.getMonth()]; i++){ //date that belong to picking month//
                        days.push({
                            num:i+1,current:true,
                            cmonth:this.barCurrent.month,
                            cyear:this.barCurrent.year});
                    }
                    let remain = 42 - days.length;
                    for(let i = 0; i < remain; i++){ //date that after picking month//
                        days.push({
                            num:i+1,current:false,
                            cmonth:this.barCurrent.month==12?1:this.barCurrent.month+1,
                            cyear:this.barCurrent.month==12?this.barCurrent.year+1:this.barCurrent.year});
                    }
                    this.days = days;
                },
                stringToDate: function(str){ //from sDate import stringToDate//usual.js//
                    let reg = /\d+/g;
                    let timeArray = new Array();
                    let d = new Date();
                    while((x = reg.exec(str))!= null)
                    {
                        timeArray.push(x[0]);
                    }
                    if(timeArray.length<=0)
                        return new Date();
                    d.setFullYear(timeArray[0]);
                    d.setMonth(timeArray[1]-1);
                    d.setDate(timeArray[2]);
                    d.setHours(timeArray[3]);
                    d.setMinutes(timeArray[4]);
                    d.setSeconds(timeArray[5]);
                    return d;
                },
                leapYear: function(num){
                    if(num%4==0&&num%100!=0)
                        return true;
                    else if(num%400==0)
                        return true;
                    else
                        return false;
                },
                Func: function(day){
                    let el = this;
                    if($(el.$el).attr("xFunc")!=undefined)
                        eval(`${$(el.$el).attr("xFunc")}(day)`);
                    if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                        eval(`this.$parent.${$(el.$el).attr("pFunc")}(day)`);
                }
            }
        });
        //CalendardatePicker//xTheme,xFunc,pFunc//
        Vue.component('calendar-date-picker',{
            template:`<div style="position: relative; width: 295px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
                        <div @click="picker">
                            <searchbox placeholder="yyyy/mm/dd" xIcon="Calendar" readonly="readonly" style="width: 295px; height: 35px; border: rgba(0,0,0,0.2) solid 2px; border-radius: 0px;" :style="{border:theme?'rgba(255,255,255,0.2) solid 2px':''}"/>
                        </div>
                        <transition 
                        v-on:before-enter="beforeEnter"
                        v-on:enter="enter">
                        <calendar-view v-show="show" style="margin-top:5px;" pFunc="pickDay"></calendar-view>
                        </transition>
                    </div>`,
            data: function(){
                return {
                    show:false,
                    day:{
                        year:1970,
                        month:1,
                        date:1
                    },
                    theme:false
                }
            },
            mounted: function(){
                let el = this;
                let target = this.$el;
                if($(target).attr("xTheme")=="dark"){
                    this.theme = true;
                    this.$children[1].theme = true;
                    this.$children[0].xIconColor.color = 'rgba(255,255,255,0.6)';
                }
            },
            methods: {
                picker: function(){
                    this.show = !this.show;
                },
                pickDay: function(day){
                    this.day = day;
                    $($(this.$el).find("input").get(0)).attr('placeholder',`${this.format(day.year)}/${this.format(day.month)}/${this.format(day.date)}`);
                    this.show = false;
                    this.Func(day);
                },
                format: function(num){
                    if(num<10)
                        return '0'+num;
                    else
                        return num;
                },
                beforeEnter: function(target){
                    $(target).css("margin-top","-25px");
                    $(target).css("opacity","0");
                },
                enter: function(target,done){
                    $(target).animate({
                        'margin-top': '5px',
                        'opacity': '1'
                    },{duration:120},done);
                },
                Func: function(day){
                    let el = this;
                    if($(el.$el).attr("xFunc")!=undefined)
                        eval(`${$(el.$el).attr("xFunc")}(day)`);
                    if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                        eval(`this.$parent.${$(el.$el).attr("pFunc")}(day)`);
                }
            }
        });
        //DatePicker//xTheme,xFunc,pFunc//
        Vue.component('date-picker',{
            template:`<div class="date-picker">
                        <div class="date-picker-input" :class="{dark:theme}" @click="show=!show">
                            <p style="width: 50%; border-right: rgba(0,0,0,0.2) solid 1px;">{{day.month}}月</p>
                            <p style="border-right: rgba(0,0,0,0.2) solid 1px;">{{day.date}}</p>
                            <p>{{day.year}}</p>
                        </div>
                        <transition 
                        v-on:before-enter="beforeEnter"
                        v-on:enter="enter">
                        <div v-show="show" class="date-picker-container" :class="{dark:theme}" :style="{'z-index':show?500:''}">
                            <div style="width: 100%; height: 100%; display: flex;">
                                <div class="date-picker-wheel" :class="{dark:theme}" style="position: relative; width: 50%; border-right: rgba(0,0,0,0.1) solid 1px;" @mousewheel="scrollerMonth">
                                    <p v-for="(item,index) in monthWheel" @click="clickMonth(index)">{{item}}</p>
                                    <i style="position: absolute; top: 150px; width: 100%; height: 50px; background: rgba(67,176,229,0.3);"></i>
                                </div>
                                <div class="date-picker-wheel" :class="{dark:theme}" style="position: relative; width: 25%; border-right: rgba(0,0,0,0.1) solid 1px;" @mousewheel="scrollerDate">
                                    <p v-for="(item,index) in dateWheel" @click="clickDate(index)">{{item}}</p>
                                    <i style="position: absolute; top: 150px; width: 100%; height: 50px; background: rgba(67,176,229,0.3);"></i>
                                </div>
                                <div class="date-picker-wheel" :class="{dark:theme}" style="position: relative; width: 25%;" @mousewheel="scrollerYear">
                                    <p v-for="(item,index) in yearWheel" @click="clickYear(index)">{{item}}</p>
                                    <i style="position: absolute; top: 150px; width: 100%; height: 50px; background: rgba(67,176,229,0.3);"></i>
                                </div>
                            </div>
                            <div style="height: 40px; display: flex; align-items: center;">
                                <button class="sbutton" :class="{black:theme}" style="width: 100%; height: 40px; font-family: Segoe MDL2;" @click="confirm">&#xE0E7;</button>
                                <button class="sbutton" :class="{black:theme}" style="width: 100%; height: 40px; font-family: Segoe MDL2;" @click="cancel">&#xE106;</button>
                            </div>
                        </div>
                        </transition>
                    </div>`,
            data: function(){
                return {
                    show:false,
                    theme:false,
                    monthContent:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                    dayList: [31,28,31,30,31,30,31,31,30,31,30,31],
                    yearWheel:[1970,1971,1972,1973,1974,1975,1976],
                    monthWheel:["一月","二月","三月","四月","五月","六月","七月"],
                    dateWheel:[1,2,3,4,5,6,7],
                    yearRange:1970,
                    monthRange:{s:0,e:6},
                    dateRange:{s:0,e:6},
                    currentDateSum:30,
                    day:{
                        year:new Date().getFullYear(),
                        month:new Date().getMonth()+1,
                        date:new Date().getDate()
                    },
                    temple:null
                }
            },
            mounted: function(){
                // window.addEventListener('scroll',this.scroller);
                let el = this;
                let target = this.$el;
                $(document).on("click",function(e){
                    if(el.show&&$(e.target).parents(".date-picker").length<=0){
                        el.cancel();
                    }
                });
                if($(target).attr("xTheme")=="dark"){
                    this.theme = true;
                }
                this.init();
            },
            watch: {
                show: function(val){
                    if(val)
                        this.temple = {year:this.day.year,month:this.day.month,date:this.day.date};
                }
            },
            methods: {
                init: function(){
                    this.dateFormat();
                    this.yearRange=this.day.year-3;
                    this.monthRange={s:this.Mode((this.day.month-3-1),12),e:this.Mode((this.day.month+3-1),12)};
                    this.dateRange={s:this.Mode((this.day.date-3-1),this.currentDateSum),e:this.Mode((this.day.date+3-1),this.currentDateSum)};
                    for(let i = 0; i < 7; i++){
                        Vue.set(this.yearWheel,i,this.yearRange+i);
                        Vue.set(this.monthWheel,i,this.monthContent[this.Mode((this.monthRange.s+i),12)]);
                        Vue.set(this.dateWheel,i,this.Mode((this.dateRange.s+i),this.currentDateSum)+1);
                    }
                    // console.log(this.day.year,this.day.month,this.day.date,`monthRange.s = ${this.monthRange.s} monthRange.e = ${this.monthRange.e} dateRange.s = ${this.dateRange.s} dateRange.e = ${this.dateRange.e} yearRange = ${this.yearRange}`);
                },
                scrollerYear: function(event){
                    let toward = event.wheelDelta > 0 ? 'up' : 'down';
                    event.preventDefault();
                    switch(toward){
                        case 'up':
                        this.yearWheel.splice(6,1);
                        this.yearWheel.unshift(this.yearRange-1);
                        this.yearRange--;
                        break;
                        case 'down':
                        this.yearWheel.splice(0,1);
                        this.yearWheel.push(this.yearRange+7);
                        this.yearRange++;
                        break;
                    }
                    this.day.year = this.yearWheel[3];
                    this.dateFormat();
                },
                scrollerMonth: function(event){
                    let toward = event.wheelDelta > 0 ? 'up' : 'down';
                    event.preventDefault();
                    switch(toward){
                        case 'up':
                        this.monthWheel.splice(6,1);
                        if(this.monthRange.s==0)
                            this.monthRange.s=11;
                        else
                            this.monthRange.s--;
                        if(this.monthRange.e==0)
                            this.monthRange.e=11;
                        else
                            this.monthRange.e--;
                        this.monthWheel.unshift(this.monthContent[this.monthRange.s]);
                        break;
                        case 'down':
                        this.monthWheel.splice(0,1);
                        if(this.monthRange.s==11)
                            this.monthRange.s=0;
                        else
                            this.monthRange.s++;
                        if(this.monthRange.e==11)
                            this.monthRange.e=0;
                        else
                            this.monthRange.e++;
                        this.monthWheel.push(this.monthContent[this.monthRange.e]);
                        break;
                    }
                    this.day.month = (this.monthRange.s + 3) % 12 + 1;
                    this.dateFormat();
                },
                scrollerDate: function(event){
                    let toward = event.wheelDelta > 0 ? 'up' : 'down';
                    event.preventDefault();
                    switch(toward){
                        case 'up':
                        this.dateWheel.splice(6,1);
                        if(this.dateRange.s==0)
                            this.dateRange.s=this.currentDateSum-1;//31/30//
                        else
                            this.dateRange.s--;
                        if(this.dateRange.e==0)
                            this.dateRange.e=this.currentDateSum-1;
                        else
                            this.dateRange.e--;
                        this.dateWheel.unshift(this.dateRange.s+1);
                        break;
                        case 'down':
                        this.dateWheel.splice(0,1);
                        if(this.dateRange.s==this.currentDateSum-1)
                            this.dateRange.s=0;
                        else
                            this.dateRange.s++;
                        if(this.dateRange.e==this.currentDateSum-1)
                            this.dateRange.e=0;
                        else
                            this.dateRange.e++;
                        this.dateWheel.push(this.dateRange.e+1);
                        break;
                    }
                    this.day.date = this.dateWheel[3];
                },
                clickYear: function(index){
                    this.day.year = this.yearRange + index;
                    this.init();
                },
                clickMonth: function(index){
                    this.day.month = this.Mode(this.monthRange.s + index,12) + 1;
                    this.init();
                },
                clickDate: function(index){
                    this.day.date = this.Mode(this.dateRange.s + index,this.currentDateSum) + 1;
                    this.init();
                },
                leapYear: function(num){
                    if(num%4==0&&num%100!=0)
                        return true;
                    else if(num%400==0)
                        return true;
                    else
                        return false;
                },
                dateFormat: function(){ //cal a month contains how many days//
                    if(this.day.month==2&&this.leapYear(this.day.year))
                        this.currentDateSum = 29;
                    else
                        this.currentDateSum = this.dayList[this.day.month-1];
                    
                    let j = 1;
                    for(let i = 0; i < this.dateWheel.length; i++){
                        if(this.dateWheel[i]>this.currentDateSum||j>1){
                            Vue.set(this.dateWheel,i,j);
                            j++;
                        }
                    }
                    j = this.currentDateSum;
                    for(let i = this.dateWheel.length - 1; i >= 0; i--){
                        if(this.dateWheel[i]==1||j<this.currentDateSum){
                            if(i>0){
                                Vue.set(this.dateWheel,i-1,j);
                                j--;
                            }
                        }
                    }
                    this.dateRange.s = this.dateWheel[0] - 1;
                    this.dateRange.e = this.dateWheel[6] - 1;
                },
                Mode: function(num,mod){    //标准模运算
                    if(num>0)
                        return num % mod;
                    else
                        return mod + num % mod;
                },
                confirm: function(){
                    this.show = false;
                    this.Func(this.day);
                },
                cancel: function(){
                    this.show = false;
                    this.day = this.temple;
                    this.init();
                },
                beforeEnter: function(target){
                    $(target).css("padding","150px");
                    $(target).css("opacity","0");
                },
                enter: function(target,done){
                    $(target).animate({
                        'padding': '0px',
                        'opacity': '1'
                    },{duration:300},done);
                },
                Func: function(day){
                    let el = this;
                    if($(el.$el).attr("xFunc")!=undefined)
                        eval(`${$(el.$el).attr("xFunc")}(day)`);
                    if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                        eval(`this.$parent.${$(el.$el).attr("pFunc")}(day)`);
                }
            }
        });
        //TimePicker//xTheme,xFunc,pFunc//
        Vue.component('time-picker',{
            template:`<div class="date-picker">
                        <div class="date-picker-input" :class="{dark:theme}" @click="show=!show">
                            <p style="width: 50%; border-right: rgba(0,0,0,0.2) solid 1px;">{{time.hour}}</p>
                            <p style="width: 50%; border-right: rgba(0,0,0,0.2) solid 1px;">{{time.minute}}</p>
                        </div>
                        <transition 
                        v-on:before-enter="beforeEnter"
                        v-on:enter="enter">
                        <div v-show="show" class="date-picker-container" :class="{dark:theme}" :style="{'z-index':show?500:''}">
                            <div style="width: 100%; height: 100%; display: flex;">
                                <div class="date-picker-wheel" :class="{dark:theme}" style="position: relative; width: 50%; border-right: rgba(0,0,0,0.1) solid 1px;" @mousewheel="scrollerHour">
                                    <p v-for="(item,index) in hourWheel" @click="clickHour(index)">{{item}}</p>
                                    <i style="position: absolute; top: 150px; width: 100%; height: 50px; background: rgba(67,176,229,0.3);"></i>
                                </div>
                                <div class="date-picker-wheel" :class="{dark:theme}" style="position: relative; width: 50%; border-right: rgba(0,0,0,0.1) solid 1px;" @mousewheel="scrollerMinute">
                                    <p v-for="(item,index) in minuteWheel" @click="clickMinute(index)">{{item}}</p>
                                    <i style="position: absolute; top: 150px; width: 100%; height: 50px; background: rgba(67,176,229,0.3);"></i>
                                </div>
                            </div>
                            <div style="height: 40px; display: flex; align-items: center;">
                                <button class="sbutton" :class="{black:theme}" style="width: 100%; height: 40px; font-family: Segoe MDL2;" @click="confirm">&#xE0E7;</button>
                                <button class="sbutton" :class="{black:theme}" style="width: 100%; height: 40px; font-family: Segoe MDL2;" @click="cancel">&#xE106;</button>
                            </div>
                        </div>
                        </transition>
                    </div>`,
            data: function(){
                return {
                    show:false,
                    theme:false,
                    hourWheel:[0,1,2,3,4,5,6],
                    minuteWheel:[0,1,2,3,4,5,6],
                    hourRange:{s:0,e:6},
                    minuteRange:{s:0,e:6},
                    time:{
                        hour:new Date().getHours(),
                        minute:new Date().getMinutes()
                    },
                    temple:null
                }
            },
            mounted: function(){
                // window.addEventListener('scroll',this.scroller);
                let el = this;
                let target = this.$el;
                $(document).on("click",function(e){
                    if(el.show&&$(e.target).parents(".date-picker").length<=0){
                        el.cancel();
                    }
                });
                if($(target).attr("xTheme")=="dark"){
                    this.theme = true;
                }
                this.init();
            },
            watch: {
                show: function(val){
                    if(val)
                        this.temple = {hour:this.time.hour,minute:this.time.minute};
                }
            },
            methods: {
                init: function(){
                    this.hourRange={s:this.Mode((this.time.hour-3),24),e:this.Mode((this.time.hour+3),24)};
                    this.minuteRange={s:this.Mode((this.time.minute-3),60),e:this.Mode((this.time.minute+3),60)};
                    for(let i = 0; i < 7; i++){
                        Vue.set(this.hourWheel,i,this.Mode((this.hourRange.s+i),24));
                        Vue.set(this.minuteWheel,i,this.Mode((this.minuteRange.s+i),60));
                    }
                },
                scrollerHour: function(event){
                    let toward = event.wheelDelta > 0 ? 'up' : 'down';
                    event.preventDefault();
                    switch(toward){
                        case 'up':
                        this.hourWheel.splice(6,1);
                        if(this.hourRange.s==0)
                            this.hourRange.s=23;
                        else
                            this.hourRange.s--;
                        if(this.hourRange.e==0)
                            this.hourRange.e=23;
                        else
                            this.hourRange.e--;
                        this.hourWheel.unshift(this.hourRange.s);
                        break;
                        case 'down':
                        this.hourWheel.splice(0,1);
                        if(this.hourRange.s==23)
                            this.hourRange.s=0;
                        else
                            this.hourRange.s++;
                        if(this.hourRange.e==23)
                            this.hourRange.e=0;
                        else
                            this.hourRange.e++;
                        this.hourWheel.push(this.hourRange.e);
                        break;
                    }
                    this.time.hour = (this.hourRange.s + 3) % 24;
                },
                scrollerMinute: function(event){
                    let toward = event.wheelDelta > 0 ? 'up' : 'down';
                    event.preventDefault();
                    switch(toward){
                        case 'up':
                        this.minuteWheel.splice(6,1);
                        if(this.minuteRange.s==0)
                            this.minuteRange.s=59;//31/30//
                        else
                            this.minuteRange.s--;
                        if(this.minuteRange.e==0)
                            this.minuteRange.e=59;
                        else
                            this.minuteRange.e--;
                        this.minuteWheel.unshift(this.minuteRange.s);
                        break;
                        case 'down':
                        this.minuteWheel.splice(0,1);
                        if(this.minuteRange.s==59)
                            this.minuteRange.s=0;
                        else
                            this.minuteRange.s++;
                        if(this.minuteRange.e==59)
                            this.minuteRange.e=0;
                        else
                            this.minuteRange.e++;
                        this.minuteWheel.push(this.minuteRange.e);
                        break;
                    }
                    this.time.minute = (this.minuteRange.s + 3) % 60;
                },
                clickHour: function(index){
                    this.time.hour = this.Mode(this.hourRange.s + index,24);
                    this.init();
                },
                clickMinute: function(index){
                    this.time.minute = this.Mode(this.minuteRange.s + index,60);
                    this.init();
                },
                Mode: function(num,mod){    //标准模运算
                    if(num>0)
                        return num % mod;
                    else
                        return mod + num % mod;
                },
                confirm: function(){
                    this.show = false;
                    this.Func(this.time);
                },
                cancel: function(){
                    this.show = false;
                    this.time = this.temple;
                    this.init();
                },
                beforeEnter: function(target){
                    $(target).css("padding","150px");
                    $(target).css("opacity","0");
                },
                enter: function(target,done){
                    $(target).animate({
                        'padding': '0px',
                        'opacity': '1'
                    },{duration:300},done);
                },
                Func: function(day){
                    let el = this;
                    if($(el.$el).attr("xFunc")!=undefined)
                        eval(`${$(el.$el).attr("xFunc")}(day)`);
                    if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                        eval(`this.$parent.${$(el.$el).attr("pFunc")}(day)`);
                }
            }
        });
        //ParallaxView//xSource,xAcrylic,xTheme//
        Vue.component('parallax-view',{
            template:`<div class="parallax-view" ref="main">
                        <div class="container" :class="{light:!theme}" ref="container">
                            <slot></slot>
                        </div>
                        <img :src="source" class="bg" ref="bg" :style="{'margin-top':-ratio+'px',filter:acrylic?'blur(15px)':'none'}"/>
                    </div>`,
            data: function(){
                return {
                    source: '',
                    dis_bg: 0,
                    dis_container: 0,
                    ratio: 0,
                    acrylic: false,
                    theme: true
                }
            },
            mounted: function(){
                let el = this.$el;
                if($(el).attr("xSource")!=undefined)
                {
                    this.source = $(el).attr("xSource");
                    this.$refs.bg.onload = () => {
                        this.dis_bg = this.$refs.bg.offsetHeight - this.$refs.main.clientHeight;
                        this.dis_container = this.$refs.container.scrollHeight - this.$refs.main.clientHeight;
                        let target = this;
                        this.$refs.container.addEventListener("scroll",function(){
                            target.ratio = target.$refs.container.scrollTop / target.dis_container * target.dis_bg;
                        });
                    }
                }
                if($(el).attr("xAcrylic")=="true")
                {
                    this.acrylic = true;
                }
                if($(el).attr("xTheme")=="light")
                {
                    this.theme = false;
                }
            }
        });
        //ScrollReveal//xOffset,xMode//
        Vue.component('scroll-reveal',{
            template:`<div style="position: relative;">
                        <transition :name="animateCss">
                        <div v-show="show"><slot></slot></div>
                        </transition>
                    </div>`,
            data: function(){
                return {
                    bodyTop:0,
                    elTop:0,
                    webVisualHeight:0,
                    animateCss:"",
                    offset:0,
                    mode:"default",
                    show:false
                }
            },
            mounted: function(){
                let el = this;
                let target = this.$el;
                window.addEventListener('scroll',function(){
                    el.bodyTop = document.body.scrollTop;
                    el.elTop = target.offsetTop;
                    el.webVisualHeight = $(window).height();
                    switch(el.mode){
                        case "upNdown":
                        el.upNdownAnimate();
                        break;
                        case "once":
                        el.onceAnimate();
                        break;
                        default:
                        el.defaultAnimate();
                        break;
                    }
                });
                if($(target).attr("xAnimate")!=undefined){
                    this.animateCss = $(target).attr("xAnimate");
                }
                if($(target).attr("xOffset")!=undefined){
                    this.offset = $(target).attr("xOffset") * 1;
                }
                if($(target).attr("xMode")!=undefined){
                    this.mode = $(target).attr("xMode");
                }
            },
            methods: {
                defaultAnimate: function(){
                    let el = this;
                    if(el.bodyTop+el.webVisualHeight+el.offset>=el.elTop){
                        el.show = true;
                    }
                    else
                        el.show = false;
                },
                upNdownAnimate: function(){
                    let el = this;
                    if(el.bodyTop+el.webVisualHeight+el.offset>=el.elTop&&el.bodyTop+el.offset<el.elTop){
                        el.show = true;
                    }
                    else
                        el.show = false;
                },
                onceAnimate: function(){
                    let el = this;
                    if(el.bodyTop+el.webVisualHeight+el.offset>=el.elTop){
                        el.show = true;
                    }
                }
            }
        })
        //Flyout//xToward,xTheme,xFlyoutStyle//
        Vue.component('flyout',{
            template:`<div class="fly-out">
                        <transition
                        v-on:before-enter="beforeEnter"
                        v-on:enter="enter"
                        v-on:leave="leave">
                        <div v-show="show" class="flyobj" :style="{'top':offset}" :class="[customerClass]" ref="flyobj" @mouseenter="mouseenter" @mouseleave="mouseleave">
                            <slot name="flyout"></slot>
                        </div>
                        </transition>
                        <div @mouseenter="mouseenter" @mouseleave="mouseleave"><slot name="target"></slot></div>
                    </div>`,
            data: function(){
                return {
                    show:false,
                    theme:false,
                    customerClass:'',
                    toward:"up"
                }
            },
            mounted: function(){
                let el = this;
                let target = this.$el;
                if($(target).attr("xToward")!=undefined){
                    this.toward=$(target).attr("xToward");
                }
                if(target.offsetTop-document.body.scrollTop<$(el.$refs.flyobj).height()){
                    el.toward='down';
                }
                if($(target).attr("xFlyoutStyle")!=undefined){
                    this.customerClass=$(target).attr("xFlyoutStyle");
                }
                if($(el).attr("xTheme")=="dark")
                {
                    this.theme = true;
                }
                this.correct();
            },
            computed:{
                offset: function(){
                    return this.toward=='down'?'100%':'-100%';
                }
            },
            methods: {
                mouseenter: function(){
                    this.show = true;
                },
                mouseleave: function(){
                    this.show = false;
                },
                beforeEnter: function(target){
                    switch(this.toward){
                        case "down":
                        $(target).css("margin-top","-25px");
                        target.style.opacity = 0;
                        break;
                        default:
                        $(target).css("margin-top","25px");
                        target.style.opacity = 0;
                        break;
                    }
                },
                enter: function(target,done){
                    $(target).animate({
                        'margin-top': '0px',
                        'opacity': '1'
                    },{duration:120},done);
                },
                leave: function(target,done){
                    switch(this.toward){
                        case "down":
                        $(target).animate({
                            'margin-top': '-25px',
                            'opacity': '0'
                        },{duration:50},done);
                        break;
                        default:
                        $(target).animate({
                            'margin-top': '25px',
                            'opacity': '0'
                        },{duration:50},done);
                        break;
                    }
                },
                correct: function(){    //校正朝向使得用户总能看到Flyout//
                    let el = this;
                    let target = this.$el;
                    $(window).scroll(function(){
                        if(target.offsetTop-document.body.scrollTop<$(el.$refs.flyobj).height()){
                            el.toward='down';
                        }
                        else
                            el.toward=$(target).attr("xToward");
                    });
                }
            }
        });
        //Pivot//xTheme,xPivotStyle,xLightbarStyle,xOptionStyle,xOptionChooseStyle,xFunc,pFunc//
        Vue.component('pivot',{
            template:`<div class="pivot" :class="[theme?'dark':'',customerClass]">
                        <div v-show="false" ref="package"><slot></slot></div>
                        <p class="pivot-option" v-for="(item,index) in objs" :class="[customerOptionClass,currentIndex==index?customerOptionChooseClass:'']" :index="index" :value="item.value" @click="switchOn">{{item.name}}</p>
                        <i class="pivot-lightbar" :class="[customerLightClass]" ref="lighting"></i>
                    </div>`,
            data: function(){
                return {
                    objs:[{name:"Empty",value:0}],
                    currentIndex:0,
                    lastOption:{},
                    theme:false,
                    customerClass:"",
                    customerLightClass:"",
                    customerOptionClass:"",
                    customerOptionChooseClass:"choose"
                }
            },
            mounted: function(){
                let el = this;
                let target = this.$el;
                this.init();
                

                if($(target).attr("xTheme")=="dark"){
                    this.theme = true;
                }
                if($(target).attr("xPivotStyle")!=undefined){
                    this.customerClass=$(target).attr("xPivotStyle");
                }
                if($(target).attr("xLightbarStyle")!=undefined){
                    this.customerLightClass=$(target).attr("xLightbarStyle");
                }
                if($(target).attr("xOptionStyle")!=undefined){
                    this.customerOptionClass=$(target).attr("xOptionStyle");
                }
                if($(target).attr("xOptionChooseStyle")!=undefined){
                    this.customerOptionChooseClass=$(target).attr("xOptionChooseStyle");
                }
            },
            computed:{
                
            },
            methods: {
                init: function(){
                    let el = this;
                    let target = this.$el;
                    let tObjs = [];
                    $.each($(this.$refs.package).children("*"),function(i,item){
                        tObjs.push({name:$(item).text(),value:$(item).attr("value")});
                        if(tObjs[i].value==undefined){
                            tObjs[i].value=i;
                        }
                    });
                    this.objs = tObjs;
                    this.lastOption.target = $(target).children(".pivot-option").get(0);
					$(this.lastOption.target).ready(function(){
						$(el.$refs.lighting).css("left",el.lastOption.target.offsetLeft +'px');
						$(el.$refs.lighting).css("width",$(el.lastOption.target).width()+'px');
					});
                },
                switchOn: function(e){
                    let el = this;
                    this.currentIndex = $(e.target).attr("index");
                    let disWidth = Math.abs($(e.target).offset().left - $(this.lastOption.target).offset().left)+$(e.target).width();
                    if($(e.target).attr("index")>$(this.lastOption.target).attr("index")){
                        $(this.$refs.lighting).animate({
                            width:disWidth+'px',
                        },{duration:180});
                        $(this.$refs.lighting).animate({
                            left:e.target.offsetLeft,
                            width:$(e.target).width()+'px'
                        },{duration:50});
                    }
                    else
                    {
                        $(this.$refs.lighting).animate({
                            width:disWidth+'px',
                            left:e.target.offsetLeft,
                        },{duration:180});
                        $(this.$refs.lighting).animate({
                            width:$(e.target).width()+'px'
                        },{duration:50});
                    }
                    this.lastOption.target = e.target;
                    this.Func($(e.target).attr("value"),$(e.target).attr("index"));
                },
                Func: function(val,index){
                    let el = this;
                    if($(el.$el).attr("xFunc")!=undefined)
                        eval(`${$(el.$el).attr("xFunc")}('${val}',${index})`);
                    if($(el.$el).attr("pFunc")!=undefined)  //pFunc//
                        eval(`this.$parent.${$(el.$el).attr("pFunc")}('${val}',${index})`);
                }
            }
        });
        //xBinding//xData//
        Vue.component('x-binding',{
            template:`<div>
                        <div v-if="success" v-for="(item,index) in objs">
                            <slot :binding="item" :index="index" :data="objs" :get="get" :set="set"></slot>
                        </div>
                        <p v-if="!success">Failed.</p>
                    </div>`,
            data: function(){
                return {
                    objs: [],
                    success: true,
                    pool: []
                }
            },
            mounted: function(){
                let el = this.$el;
                let target = this;
                if($(el).attr("xData")!=undefined){
                    let uri = $(el).attr("xData");
                    if(uri.indexOf('/')>=0)
                        Sweet.AjaxGetAsync(uri,function(data){
                            if(data!=null)
                                target.objs = data;
                            else
                                target.success = false;
                        },true);
                    else
                    {
                        this.objs = eval(`${uri}.xData`);
                        Object.defineProperty(eval(`${uri}`),'xData',{  //设立xData监听//
                            get: function(){
                                return xData;
                            },
                            set: function(value){
                                xData = value;
                                target.objs = eval(`${uri}.xData`);
                                target.success = !(target.objs.length<=0);  
                            }
                        });
                        if(this.objs.length<=0)
                            this.success = false;
                    }
                }
                else
                    this.success = false;
            },
            methods: {
                set: function(name,val){
                    Vue.set(this.pool,name,val);
                },
                get: function(name){
                    return this.pool[name]==undefined?false:this.pool[name];
                }
            }
        });
    });
    //Middle Process//
    //Sweet//
    class Sweet{
        constructor(){
        }
        static get Controls(){
            return ['glass-button',
                    'combobox',
                    'progress-ring',
                    'searchbox',
                    'toggle-switch',
                    'treeview',
                    'parallax-view'];
        }
        static UIStarter(){
            $.each($("[xSweet=UI]"),function(i,item){
                new Vue({el:item});
            });
        }
        static AjaxGet(url)
        {
            var r = null;
            $.ajax({
                type:"get",
                url:url,
                async:false,
                timeout:30000,
                success:function(data){
                    r = data;
                },
                error:function(){
                    r = null;
                }
            });
            return r;
        }
        static AjaxGetAsync(url,func=null,useArg=false)
        {
            var r = null;
            $.ajax({
                type:"get",
                url:url,
                timeout:30000,
                success:function(data){
                    r = data;
                    if(func!=null)
                    {
                        if(useArg==true)
                            func(data);
                        else
                            func();
                    }
                },
                error:function(){
                    r = null;
                    if(func!=null)
                    {
                        if(useArg==true)
                            func(null);
                        else
                            func();
                    }
                }
            });
            return r;
        }
        static AjaxPost(url,Post_Data)
        {
            var r = null;
            $.ajax({
                type:"post",
                url:url,
                data:Post_Data,
                async:false,
                timeout:30000,
                success:function(data){
                    r = data;
                },
                error:function(){
                    r = null;
                }
            });
            return r;
        }
        static AjaxPostAsync(url,Post_Data,func=null,useArg=false)
        {
            var r = null;
            $.ajax({
                type:"post",
                url:url,
                data:Post_Data,
                timeout:30000,
                success:function(data){
                    r = data;
                    if(func!=null)
                    {
                        if(useArg==true)
                            func(data);
                        else
                            func();
                    }
                },
                error:function(){
                    r = null;
                    if(func!=null)
                    {
                        if(useArg==true)
                            func(null);
                        else
                            func();
                    }
                }
            });
            return r;
        }
        static SwiftWarning(e,c)
        {
            var x=$(e).prop('class');
            var xc=$(e).html();
            var xcolor=$(e).css('color');
            $(e).attr('class',x+' warning-text');
            $(e).css('color','rgba(200,50,59,1)');
            $(e).html(c);
            setTimeout(function(){
                $(e).attr('class',x);
                $(e).css('color',xcolor);
                $(e).html(xc);
            },3000);
        }
        static barWarning(s=-1,c="警告信息")
        {
            var timer = null;
            var icon = "&#xEB90;";
            var background_o = "rgba(173,38,45,0.8)";
            if(s==1)
                {
                    background_o = "rgba(234,159,1,0.8)";
                    icon = "&#xE783;";
                }
            else if(s==0)
                {
                    background_o = "rgba(25,180,110,0.8)";
                    icon = "&#xEC61;";
                }
            var x = document.createElement("div");
            $(x).append(`
            <div style='position: fixed; left: 0; top: 0; width: 100%; height: 30px; background: ${background_o}; text-align: center; display: none; justify-content:center; align-items:center; z-index:2002;'>
                <span style='font-family: 微软雅黑; font-size:12px; color: rgba(242,242,242,0.8); display: flex; justify-content:center; align-items:center; z-index:999;'>
                    <span style='margin-right:5px; font-family:Segoe MDL2;'>${icon}</span>${c}
                </span>
            </div>`);
            $("body").append(x);
            $(x).find("div").slideDown();
            $(x).find("div").css("display","flex");
            timer = setInterval(function(){
                var stimer = null;
                $(x).find("div").fadeOut();
                stimer = setInterval(function(){
                    $(x).empty();
                    clearInterval(stimer);
                },1000);
                clearInterval(timer);
            },3000);
        }
        //s//-1-err//0-success//1-warn//2-default//
        //title//信息框标题//
        //content//信息框内容//
        //theme//信息框主题//light-亮色调//dark-暗色调//
        static InfoBox(s=2,content="",title="提示",theme="light")
        {
            var themeColor = theme=="dark"?" dark":"";
            if($("#s_info_box").length<=0)
            {
                $(document.body).append(`
                <div id="s_info_box" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; background: rgba(255,255,255,0.5); -webkit-backdrop-filter:blur(15px); display: flex; justify-content: center; align-items: center; z-index:2001;">
                    <div class="sinfo-box" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; z-index:2001;">
                        <div class="title-bar">
                            <i id="s_info_icon" style="font-family: Segoe MDL2; color: rgba(255,255,255,1); font-style: normal; text-align: center;">&#xE783;</i>
                            <span style="margin-left: 5px; font-family: 微软雅黑; font-size: 13px; color: rgba(255,255,255,1); text-align: center;">${title}</span>
                        </div>
                        <span id="s_info_content" style="width: 100%; margin-top: 15px; font-family: 微软雅黑; font-size: 15px; text-indent: 5px; text-align: left;">${content}</span>
                        <button class="sbutton black glass" style="width: 150px; margin: 15px;" onClick="$('#s_info_box').fadeOut();">关闭</button>
                    </div>
                </div>`);
            }
            else
                $("#s_info_content").html(content);
            $("#s_info_box").css('display','flex');
            if(themeColor==" dark")
                $("#s_info_box").css("background","rgba(0,0,0,0.6)");
            if(s==1)
            {
                $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box brown"+themeColor);
                $('#s_info_icon').html('&#xE7BA;');
                $("#s_info_box").find("button").attr("class","sbutton brown glass");
            }
            else if(s==0)
            {
                $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box green"+themeColor);
                $('#s_info_icon').html('&#xEC61;');
                $("#s_info_box").find("button").attr("class","sbutton green glass");
            }
            else if(s==-1)
            {
                $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box red"+themeColor);
                $('#s_info_icon').html('&#xEB90;');
                $("#s_info_box").find("button").attr("class","sbutton red glass");
            }
            else if(s==2)
            {
                $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box"+themeColor);
                $('#s_info_icon').html('&#xE946;');
                if(themeColor==" dark")
                    $("#s_info_box").find("button").attr("class","sbutton dark");
            }
        }
        //content-信息框内容//
        //f-执行确定操作函数//
        //t1-确定按钮标题//
        //t2-取消按钮标题//
        //title-信息框标题//
        //theme-主题//red//green//brown//red dark//green dark//brown dark//dark//
        static JudgeBox(info = {
                content,
                t1:'确认',
                t2:'取消',
                title:"信息"
            },
            func_confirm,
            func_cancel=null,
            theme="")
        {
            if($("#s_judge_box").length<=0)
            {
                $(document.body).append(`
                <div id="s_judge_box" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; background: rgba(255,255,255,0.5); -webkit-backdrop-filter:blur(15px); display: flex; justify-content: center; align-items: center; z-index:2001;">
                        <div  class="sinfo-box" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; z-index:2001;">
                            <div class="title-bar">
                                <i id="s_judge_icon" style="font-family: Segoe MDL2; color: rgba(255,255,255,1); font-style: normal; text-align: center;">&#xE783;</i>
                                <span id="s_judge_title" style="margin-left: 5px; font-family: 微软雅黑; font-size: 13px; color: rgba(255,255,255,1); text-align: center;">提示</span>
                            </div>
                            <span id="s_judge_content" style="width: 100%; margin-top: 15px; font-family: 微软雅黑; font-size: 15px; text-indent: 5px; text-align: left;">Content</span>
                            <div style="width: 100%; margin-top: 15px; padding: 5px; box-sizing: border-box; display: flex; justify-content: space-between;">
                            <button id="s_judge_confirm" class="sbutton blue" style="width: 100%; margin-right: 2.5px;">确认</button>
                            <button id="s_judge_cancel" class="sbutton black" style="width: 100%; margin-left: 2.5px;">取消</button>
                        </div>
                    </div>
                </div>`);
            }
            if(theme.indexOf("dark")>=0)
                $("#s_judge_box").css("background","rgba(0,0,0,0.6)");
            $("#s_judge_box").css('display','flex');
            $($("#s_judge_box").children("div").get(0)).attr("class","sinfo-box "+theme);
            $($("#s_judge_box").find("button").get(0)).attr("class","sbutton "+theme.split(' ')[0]);
            $("#s_judge_confirm").html(info.t1);
            $("#s_judge_cancel").html(info.t2);
            $("#s_judge_title").html(info.title);
            $("#s_judge_content").html(info.content);
                
            $("#s_judge_confirm").unbind();
            $("#s_judge_confirm").click(function(){
                func_confirm();
                $('#s_judge_box').fadeOut();
            });
            $("#s_judge_cancel").unbind();
            $("#s_judge_cancel").click(function(){
                if(func_cancel!=null)
                    func_cancel();
                $('#s_judge_box').fadeOut();
            });
        }
        static Guid(){
            function S4() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
             }
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
        static GuidWithoutDash(){
            function S4() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
             }
            return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
        }
        static set MousePosition(e)
        {
            Sweet.sMousePosition = {x: e.pageX, y: e.pageY};
        }
        static set MousePositionVisual(e)
        {
            Sweet.sMousePositionWithOutScroller = {x: e.originalEvent.x, y: e.originalEvent.y};
        }
        static get MousePosition()
        {
            return Sweet.sMousePosition;
        }
        static get MousePositionVisual()
        {
            return Sweet.sMousePositionWithOutScroller;
        }
    }
    //Final Process//
    $(function(){
        Sweet.UIStarter();
        $(document).mousemove(function(e){
            Sweet.MousePosition = e;
            Sweet.MousePositionVisual = e;});
    });
    window.Sweet = Sweet;
})(window)