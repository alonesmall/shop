;(function(){

function Car(){
    this.car = document.querySelector("#main")
    this.url = "http://localhost/yhd/database/index.php";

    this.init();

    //绑定删除事件
    this.addEvent();
}

Car.prototype.init = function(){
    var that = this;
    ajaxGet(this.url).then(function(res){
        that.res = JSON.parse(res);
        //比对cookie
        that.getCookie();
    });
}

Car.prototype.getCookie = function(){
    this.goods = getCookie("goods") != "" ? JSON.parse(getCookie("goods")) : [];
    this.display();
}
Car.prototype.display = function(){
    var str = "";
    for(var i = 0; i < this.res.length; i++){
        for(var j = 0; j <this.goods.length; j++){
            if(this.goods[j].id == this.res[i].id){
                str += `<div class="zongji" class="zhong" index="${this.res[i].id}">
                            <div class="zongji-t">
                                <div class="maijia">
                                    <i class="maijia-xuan"></i>
                                    <i class="maijia-xuan-hid"></i>
                                    我不管都是我卖的
                                </div>
                            </div>
                            <div class="zongji-c">
                                    <span class="allxuan">
                                        <i class="xuan"></i>
                                        <i class="xuan-hid"></i>
                                    </span>
                                    <span class="te"><img src="${this.res[i].src}" /></span>
                                    <span>
                                        <p>
                                        ${this.res[i].name}
                                        </p>
                                    </span>
                                    <span>${this.res[i].price}</span>
                                    <span>
                                        <div class="num">
                                            <a href="#" class="reduce">-</a>
                                            <em>${this.goods[j].num}</em>
                                            <a href="#" class="add">+</a>
                                        </div>
                                    </span>
                                    <span>${this.res[i].price}</span>
                                    <span>
                                        <div class="delete">删除</div>
                                    </span>
                            </div>
                    
                            <div class="zongji-b">
                                <div class="total-price">
                                    <span class="s1">商品总价：</span>
                                    <i>￥</i>
                                    <span class="s2">${this.res[i].price}</span>
                                </div>
                            </div>
                        </div>`;
            }
        }
    }
    this.car.innerHTML = str;
}

Car.prototype.addEvent = function(){
    var that = this;
    this.car.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "delete"){
            //存储要删除的货号
            that.id = target.parentNode.parentNode.parentNode.getAttribute("index");
            target.parentNode.parentNode.parentNode.remove();
            //修改cookie
            that.changeCookie(function(i){
                that.goods.splice(i,1);
            });
        }
    })
}

Car.prototype.changeCookie = function(callback){
    //遍历cookie，找到要修改的货号
    for(var i = 0; i < this.goods.length; i++){
        if(this.goods[i].id == this.id){
            callback(i);
        }
    }

    // 以上只是在操作数组，最后要把数据再设置回去
    setCookie("goods",JSON.stringify(this.goods),{
        path:"/yhd"
    });
}

new Car();

})();