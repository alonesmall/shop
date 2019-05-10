

//  调用方式（使用说明）



$(".banner").banner({
    items:$(".banner").children(".imgbox").children("a"),      //必选
    // 可选，左右按钮，不传，默认没有功能
    left:$(".banner").find("#left"),
    right:$(".banner").find("#right"),
    // // 可选，下标按钮，默认为true，false为不生成
    list:true,
    // // 可选，自动播放，默认为true，false为不自动播放
    autoPlay:true,
    // // 可选，每张的延迟时间，默认为2000
    delayTime:3000,
    // // 可选，每张图片的移动耗时，默认为200
    moveTime:1000
})




function ThirdList(){
    this.nav_l = document.querySelector(".nav-l");
    this.othirdlist = document.getElementById("thirdlist");
    this.init();

    
}

ThirdList.prototype.init = function(){
    var that = this;
    
    this.nav_l.onmouseenter = function(){
        
        that.othirdlist.style.display = "block";
    }

    this.nav_l.onmouseleave = function(){
        that.othirdlist.style.display = "none";
    }

    this.othirdlist.onmouseenter = function(){
        
        that.othirdlist.style.display = "block";
    }
    this.othirdlist.onmouseleave = function(){
        that.othirdlist.style.display = "none";
    }  
}

new ThirdList();


//商品列表

function Goods(){
    //单个商品存放在哪里
    this.cont = document.querySelector("#productlist ul");
    
    //请求数据接口
    this.url = "http://localhost/yhd/database/index.php";

    // 初始化事件
    this.init();

    //绑定购物车事件
    this.addEvent();
}

Goods.prototype.init = function(){
    var that = this;
    ajaxGet(this.url).then(function(res){
        // console.log(res);
        that.res = JSON.parse(res);

        //渲染页面
        that.display();
    })
}

Goods.prototype.display = function(){
    var str = "";
    for(var i = 0; i < this.res.length; i++){
        str += `<li>
                    <a href="#" index = "${this.res[i].id}">
                        <img src="${this.res[i].src}"/>
                        <p>${this.res[i].name}</p>
                        <div class="yaoming">
                            <i class="fuhao">￥</i><span class="price">${this.res[i].price}</span>
                            <em class="carbtn">加入购物车</em>
                        </div>
                    </a>
                </li>`;
    }
    this.cont.innerHTML = str;
}

Goods.prototype.addEvent = function(){
    var that = this;
    //事件委托
    this.cont.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "carbtn"){
            that.id = target.parentNode.parentNode.getAttribute("index");
            
            //设置cookie
            that.setCookie();
        }
    })
}

Goods.prototype.setCookie = function(){
    
    
    this.goods = getCookie("goods");
    
    if(this.goods == ""){
        this.goods = [{
            id:this.id,
            num:1
        }];

    }else{
        var onoff = true;
        
        this.goods = JSON.parse(this.goods);
        for(var i = 0; i < this.goods.length; i++){
            if(this.goods[i].id == this.id){
                this.goods[i].num++;
                onoff = false;
                break;
            }
        }

        if(onoff){
            this.goods.push({
                id:this.id,
                num:1
            })
        }
    }

    setCookie("goods",JSON.stringify(this.goods));
    
}

new Goods();

function Login(){
    //获取登录信息
    this.hao = document.querySelector(".hao");
    this.ologin = document.querySelector(".login");
    //选中退出按钮
    this.oexit = document.querySelector(".exit");
    this.login();
}
Login.prototype.login = function(){
    //选获取登录的用户信息
    this.userName = JSON.parse(localStorage.getItem("username"));
    //渲染对应欢迎内容
    if(this.userName[0].onoff){

        this.hao.innerHTML = "晚上好，";
        this.ologin.innerHTML = this.userName[0].name;
        this.oexit.style.display = "block";
        this.exit();
    }
}
Login.prototype.exit = function(){

    var that = this;
    //绑定退出事件
    this.oexit.onclick = function(){
        that.oexit.style.display = "none";
        that.hao.innerHTML = "晚上好，请";
        that.ologin.innerHTML = "登录";

        //设置退出状态onoff = 0
        that.userName[0].onoff = 0;

        console.log(that.userName);
        // 设置localStorage
        localStorage.setItem("username",JSON.stringify(that.userName));
    }
}
new Login();



