/*Copyright by Creator SN™*/
(function(){
    //UIControls Init//
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
        //CheckBox//
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
                }
            }
        });
        //SearchBox//xIcon,xIconColor
        Vue.component('searchbox',{
            template:`<div class="sinput search" style="height:25px;">
                        <input style="width:100%; background:transparent; border:none; outline:none; box-shadow:none;"/>
                        <p class="search-icon" :style="xIconColor" @mousedown="Clicked" @mouseup="ClickedUp">{{xIcon}}</p>
                    </div>`,
            data: function(){
                return {xIcon:"&#xE721;",xIconColor:{
                    color:"rgba(36,36,36,1)"
                }};
            },
            mounted:function(){
                var el = this.$el;
                switch($(el).attr("xIcon"))
                {
                    case "Search":
                        this.xIcon = "\uE721";
                    case "Filter":
                        this.xIcon = "\uE16E";
                    default:
                        this.xIcon = "\uE721";
                }
                if($(el).attr("xIconColor")!=null)
                    this.xIconColor.color = $(el).attr("xIconColor");
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
                }
            }
        });
        //ComboBox//
        Vue.component('combobox',{
            template:`<div class="combobox" ref="co_head" style="width: 80px;" @click="isSelected">
                        <div v-show="false" ref="itemContainer"><slot></slot></div>
                        <div v-show="status" class="combobox-item-container" ref="co_items">
                            <option v-for="(item,index) in items" :class="{choose:index==currentIndex}" @click="Choose">{{item.name==null?item:item.name}}</option>
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
                    for(let i = 0; i < this.items.length; i++)
                    {
                        if(this.items[i].default==true)
                        {
                            this.now = this.items[i].name;
                            this.value = this.items[i].value;
                            break;
                        }
                    }
                    this.now = this.value==-1?this.items[0].name:this.now;
                    this.value = this.value==-1?this.items[0].value:this.value;
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
                }
            }
        });
        //ProgressRing//xSize
        Vue.component('progress-ring',{
            template:`<div :class="['s-progressring',size]">
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>`,
            data:function(){
                return {size:"xs"}
            },
            mounted: function(){
                var el = this.$el;
                var legal = "l,m,s,xs";
                if(legal.indexOf($(el).attr("xSize"))>=0)
                    this.size = $(el).attr("xSize");
            }
        });
        //ProgressRing//xLoading//xFunc(target.percent)//
        Vue.component('progress-bar',{
            template:`<div class="s-progressbar" :class="{normal:!loading}" :value="percent<=100?percent:100">
                        <p v-for="i in num"></p>
                        <i v-if="!loading" :style="{'width':(percent<=100?percent:100)+'%'}"></i>
                    </div>`,
            data:function(){
                return {
                    num: 0,
                    percent: 0,
                    loading: false
                }
            },
            mounted: function(){
                var el = this.$el;
                if($(el).attr("xLoading")=="true")
                {
                    this.loading = true;
                    this.num = 5;
                }
                else if($(el).attr("xFunc")!=undefined)
                {
                    let target = this;
                    eval(`${$(el).attr("xFunc")}(target)`);
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
                        var package = this.$refs.package;   //假仓库容器//
                        var speed = f>0?Math.round(this.speed/f):this.speed;
                        $(container).append($(package).children("div").get(0));
                        $($(container).children("div").get(0)).animate({
                            margin:"0px 0px 0px -100%"
                        },{ duration: speed, easing: "swing" });
                        setTimeout(function(){
                            $(package).append($(container).children("div").get(0));
                            $(package).children("div").css("margin","0px");
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
                        var package = this.$refs.package;
                        var speed = f>0?Math.round(this.speed/f):this.speed;
                        $($(container).children("div").get(0)).before($(package).children("div:last-child"));
                        $($(container).children("div").get(0)).css("margin","0px 0px 0px -100%");
                        $($(container).children("div").get(0)).animate({
                            margin:"0px 0px 0px 0px"
                        },{ duration: speed, easing: "swing" });
                        setTimeout(function(){
                            $($(package).children("div").get(0)).before($(container).children("div:last-child"));
                            $(package).children("div:last-child").css("margin","0px");
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
                    offset: 0
                }
            },
            mounted: function(){
                let el = this.$el;
                let target = this;
                let item = $(this.$refs.ori).children("*").get(0);
                this.top = item.offsetTop;
                this.left = $(item).offset().left;
                console.log(item,this.top,this.left);
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
                    }
                    else
                    {
                        target.sticky = false;
                        $(item).css("position","");
                    }
                    console.log(window.scrollY-target.top+target.offset)
                });
            }
        });
        //ToggleSwitch//xOnContent,xOffContent,xOnContentColor,xOffContentColor,xTheme,xIsOn,xOutline,xRingBackground,xOnBackground//
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
                    this.updateStatus();
                },
                updateStatus: function(){
                    $(this.$el).attr("value",this.active);
                    if(this.active)
                        this.statusContent=this.statusContentArray[0];
                    else
                        this.statusContent=this.statusContentArray[1];
                }
            }
        });
        //TreeView//xJson//
        Vue.component('treeview',{
            template:`<div>
                        <div v-for="(item,index) in objs" class="treeview">
                            <div class="item" :class="{'drop-down':isDropDown[index]}" @click="DropDown(index)"><p style="font-family: Segoe MDL2;" :style="{visibility: item.children!=null ? 'visible' : 'hidden'}">&#xE0E3;</p><p>{{item.name}}</p></div>
                            <transition name="treeview">
                            <treeview v-if="item.children!=null" v-show="isDropDown[index]" :xChildIndex="index"></treeview>
                            </transition>
                        </div>
                    </div>`,
            data: function(){
                return {
                    objs:[],
                    isDropDown:new Array()}
            },
            mounted: function(){
                let el = this.$el;
                if($(el).attr("xJson")!=undefined)  //xJson不存在将以默认空数组返回//
                {
                    this.objs = eval(`${$(el).attr("xJson")}`);
                }
                else if($(el).attr("xChildIndex")!=undefined)
                {
                    let index = $(el).attr("xChildIndex");
                    this.objs = this.$parent.objs[index].children;
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
                }
            }
        });
        //CalendarView//xTheme,xThemeColor//
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
                        this.objs = eval(`${uri}`);
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
                        <span style="width: 100%; margin-top: 15px; font-family: 微软雅黑; font-size: 15px; text-indent: 5px; text-align: left;">${content}</span>
                        <button class="sbutton black glass" style="width: 150px; margin: 15px;" onClick="$('#s_info_box').fadeOut();">关闭</button>
                    </div>
                </div>`);
            }
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