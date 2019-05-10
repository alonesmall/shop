

;(function(){

    function Register(){

        this.oul = document.querySelector(".shuru ul");

        //选中注册按钮
        this.registerBtn = document.querySelector(".lastbtn");
        //选中一堆输入框，做验证
        this.username = document.querySelector(".username");
        this.tel = document.querySelector(".tel");
        this.yanzheng = document.querySelector(".yanzheng");
        this.pass = document.querySelector(".pass");
        this.queren = document.querySelector(".queren");

        //绑定验证事件
        this.init();

        this.insetUrl = "http://localhost/yhd/database/user.php";

        // 绑定事件
        this.addEvent();
    }

    Register.prototype.addEvent = function(){
        var that = this;
        //事件委托
        this.oul.addEventListener("click",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.tagName == "INPUT"){
                that.target = target;
                
                that.moveMsg();
            }
        })  
    }

    //移动用户名等
    Register.prototype.moveMsg = function(){
        var wid = parseFloat($(this.target).parent().children(".input-msg").css("width")) + 20;
        
        $(this.target).parent().children(".input-msg").stop().animate({
            left:"-" + wid/100 + "rem"
        },600);
    }

    Register.prototype.init = function(){
        var that = this;
        this.onoff = false;
        this.registerBtn.onclick = function(){
            if(that.username.value != "" && that.tel.value != "" &&
            that.yanzheng.value != "" && that.pass.value != ""&& that.queren.value != ""){
                that.onoff = true;
            }
            if(that.onoff){

                //发送数据到数据库
                that.insert();
            }else{
                alert("注册失败，请重新确认信息")
            }
        }
    }

    Register.prototype.insert = function(){
        ajaxGet(this.insetUrl,{
            name:this.username.value,
            pass:this.pass.value,
            tel:this.tel.value
        }).then(function(res){
            location.href = "http://localhost/yhd/html/login.html";
        })
    }




    new Register();

})();