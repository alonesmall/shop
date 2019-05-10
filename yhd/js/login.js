

;(function(){

    function Login(){

        //选中登录按钮
        this.obtn = document.querySelector(".login-btn");
        //选中输入框
        this.user = document.querySelector("#user");
        this.pass = document.querySelector("#pass");
        //选中提示信息
        this.tips = document.querySelector(".error_tips");

        //请求数据库接口
        this.userUrl = "http://localhost/yhd/database/select.php";

        this.init();
    }

    Login.prototype.init = function(){

        //请求数据
        var that = this;
        ajaxGet(this.userUrl).then(function(res){
            that.res = JSON.parse(res);
            
            //绑定事件，比对数据库中的数据然后判断是否登录
            that.addEvent();
        })
    }
    Login.prototype.addEvent = function(){
        var that = this;
        this.obtn.onclick = function(){
            if(that.user.value == ""){
                that.tips.style.display = "block";
                that.tips.innerHTML = "请输入账号"
                
            }
            if(that.pass.value == ""){
                that.tips.style.display = "block";
                that.tips.innerHTML = "请输入密码";
                
            }
            if(that.user.value == "" && that.pass.value == ""){
                that.tips.style.display = "block";
                that.tips.innerHTML = "请输入账号和密码";
                
            }

            for(let i = 0; i < that.res.length;i++){
                if(that.res[i].name === that.user.value && that.res[i].pass_word === that.pass.value){
                    that.userMsg = [{
                        name:that.user.value,
                        onoff:1
                    }]
                    //用localStorage存储登录用户信息
                    localStorage.setItem("username",JSON.stringify(that.userMsg));
                    location.href = "http://localhost/yhd/index.html";
                    return;
                }
            }
            
            
        }
    }
    new Login();
})();