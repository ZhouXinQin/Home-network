/*
* Author:  Dongshen
* Created: 2017/10/30
* Description
*/
/******页面加载完成后执行*******/
$(function () {
    header();
    footer();
});

function header() {
    //获取元素
    var oHeader = document.getElementsByTagName("header")[0];
    //动态添加元素
    oHeader.innerHTML = `
     <div class="header-main">
        <a href="index.html" class="contUs_mark"></a>
        <div class="header-logo">
            <a href="index.html"></a>
        </div>
        <div class="loginOrShop">
            <a href="login&register.html" class="login"></a>
            <span></span>
              <a href="javascript:;" class="shoppingCar ">
                <span class="pro-count">2</span>
              </a>     
            <section class="treas_brief">
    <div >
        <div class="treas_brief-content">
            <p>
                <span class="treas_name">9成新转角沙发超级转角沙发</span>
                <span class="treas_price">9999</span>
                <span class="treas_count">x2</span>
            </p>
            <p>
                <span class="treas_name">三成新超级大茶几</span>
                <span class="treas_price">9999</span>
                <span class="treas_count">x2</span>
            </p>
            <p>
                <span class="treas_name">七成新超级电视贵</span>
                <span class="treas_price">9999</span>
                <span class="treas_count">x2</span>
            </p>
        </div>
        <div class="treas_brief-goto">
            <a href="shopping.html">查看购物车</a>
        </div>
    </div>
</section>
        </div>
        <div class="region_list">
            <i class="first-region">成都地区</i>
            <ul class="other-region">
                <li>成都地区</li>
                <li>上海地区</li>
                <li>北京地区</li>
                <li>深圳地区</li>
                <li>其他地区</li>
            </ul>
        </div>
    </div>
    <div class="header-nav">
        <ul>
            <li>
                <a href="detail-page-sofas.html">沙发&nbsp&nbsp&nbspSOFAS</a>
                <ul class="second-menu">
                    <li>
                        <a href="">单人位</a>
                    </li>
                    <li>
                        <a href="">双人位</a>
                    </li>
                    <li>
                        <a href="">三人位</a>
                    </li>
                    <li>
                        <a href="">休闲沙发</a>
                    </li>
                    <li>
                        <a href="">转角沙发</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="detail-page-tables.html">桌椅&nbsp&nbsp&nbspTABLES/CHAIRS</a>
                <ul class="second-menu">
                    <li>
                        <a href="">餐桌</a>
                        <a href="">餐椅</a>
                    </li>
                    <li>
                        <a href="">书桌</a>
                        <a href="">凳子</a>
                    </li>
                    <li>
                        <a href="">电脑桌</a>
                        <a href="">休闲椅</a>
                    </li>
                    <li>
                        <a href="">梳妆台</a>
                        <a href="">户外椅</a>
                    </li>
                    <li>
                        <a href="">其它</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="detail-page-bed.html">床&nbsp&nbsp&nbspBEDS</a>
                <ul class="second-menu">
                    <li>
                        <a href="">1.5米</a>
                    </li>
                    <li>
                        <a href="">1.8米</a>
                    </li>
                    <li>
                        <a href="">其它</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="detail-page-storage.html">柜&nbsp&nbsp&nbspSTORAGE</a>
                <ul class="second-menu">
                    <li>
                        <a href="">衣柜</a>
                        <a href="">储物柜</a>
                    </li>
                    <li>
                        <a href="">书柜</a>
                        <a href="">电视柜</a>
                    </li>
                    <li>
                        <a href="">鞋柜</a>
                        <a href="">床头柜</a>
                    </li>
                    <li>
                        <a href="">其它</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="detail-page-other.html">更多&nbsp&nbsp&nbspMORE</a>
                <ul class="second-menu">
                    <li>
                        <a href="">组合产品</a>
                    </li>
                    <li>
                        <a href="">日用家居</a>
                    </li>
                    <li>
                        <a href="">家居饰品</a>
                    </li>
                    <li>
                        <a href="">其它</a>
                    </li>
                </ul>
            </li>
            <div class="search-box">
                <form action="" name="search">
                    <input type="text" placeholder="搜索">
                </form>
                <i></i>
            </div>
        </ul>
    </div>
    `;

    /********为登录按钮设置悬浮事件*********/
    $("div.loginOrShop > a.login").hover(function () {
        $(this).css({
            "background": "url(\"../imgs/sprites_0.png\") 230px -183px"
        })
    },function () {
        $(this).css({
            "background": "url(\"../imgs/sprites_0.png\") 230px -146px"
        })
    });
    /********为地区选择的下拉菜单添加事件*********/
    var $regionCkd = $("i.first-region"),
        $otherRegion = $("ul.other-region"),
        $otherRegItem =  $("ul.other-region > li"),
        $regionList = $("div.region_list");
    //1.鼠标悬浮事件
    $regionCkd.hover(function () {
        $(this).css({
            "background": "url(\"../imgs/slt_0.png\") no-repeat 95px -34px"
        })
    },function () {
        $(this).css({
            "background": "url(\"../imgs/slt_0.png\") no-repeat 95px 0"
        })
    });
    $(".shoppingCar").off("click").on("click",function () {
        $(this).toggleClass("style_border");
        $(".treas_brief").toggle(160);
    })
    //2.下拉列表中的鼠标点击事件
    $regionCkd.on("click",function () {
        $("ul.other-region").slideDown(200);
    });
    //3.鼠标移出事件
    $regionList.on("mouseleave",function () {
        $otherRegion.slideUp(200);
    });
    /***********选项列表事件************/
    //1.鼠标悬浮事件
    $otherRegItem.hover(function () {
        $(this).css({
            "color":"white",
            "background-color":"green"
        });
    },function () {
        $otherRegItem.css({
            "color":"gray",
            "background-color":"white"
        });
    });
    //2.鼠标点击事件
    $otherRegItem.on("click",function () {
        var thisTXT = $(this).text();
        $regionCkd.text(thisTXT);
        $otherRegion.slideUp(200);
    });

    /*********为单品选项添加事件**********/
    //1.获取元素
    var $firMenuLi = $(".header-nav > ul > li"),
        $secMenuLi = $(".header-nav > ul > li > ul > li");
    //2.鼠标悬浮事件
    $firMenuLi.hover(function () {
        $(this).css({
            "border-left": " 1px solid gray",
            "border-right": "1px solid gray"
        });
        $(this).children("a").css("color","red",);
        $(this).children("ul").children().first().css({"border-top":"1px solid red"});
        $(this).children("ul").css({
            "display":"block",
            "border-left": " 1px solid gray",
            "border-right": "1px solid gray",
            "border-bottom": "1px solid gray",
        });
    },function () {
        $(this).children("a").css("color","gray");
        $(this).children("ul").children("li:first").animate({"borderTopWidth":"0"},500);
        $(this).css({
            "border": "none",
        });
        $(this).children("ul").css({
            "display":"none",
            "border": "none"
        });
    });
    //3.二级菜单选项的鼠标悬浮事件
    $secMenuLi.children("a").hover(function(){
        $(this).css({
            "color":"red",
            "text-decoration":"underline"
        })
    },function(){
        $(this).css({
            "color":"gray",
            "text-decoration":"none"
        })
    });
        /**********搜索框获取焦点事件************/
        //1.获取元素
    var $searchBox = $("div.search-box > form > input");
    $searchBox.on("focus",function () {
        $searchBox.css("box-shadow","0 0 2px 1px green")
    });
    $searchBox.on("blur",function () {
        $searchBox.css("box-shadow","none")
    });
    /*****************搜索框图标鼠标悬浮事件与点击事件*******************/
    $("div.search-box > i").hover(function () {
        $(this).css({
            "background": "url(\"../imgs/sprites_0.png\") -298px -77px"
        })
    },function () {
        $(this).css({
            "background": "url(\"../imgs/sprites_0.png\") -298px -43px"
        })
    });
    $("div.search-box > i").on("mousedown",function () {
        $(this).css({
            "background": "url(\"../imgs/sprites_0.png\") -298px -43px"
        })
    });
    $("div.search-box > i").on("mouseup",function () {
        $(this).css({
            "background": "url(\"../imgs/sprites_0.png\") -298px -77px"
        })
    })
}


function footer() {
    //获取footer元素
    var oFooter = document.getElementsByTagName("footer")[0];
    oFooter.innerHTML = `
              <div class="footer-slogan">生活要过得朴素而有味道，但不用过得奢华。</div>
    <div class="footer-purpose">
        <div>
            <i>环保</i>
            <span>无甲醛 大自然</span>
        </div>
        <div>
            <i>低价</i>
            <span>低于购买价6折</span>
        </div>
        <div>
            <i>安全</i>
            <span>专业清洁消毒处理</span>
        </div>
        <div>
            <i>省心</i>
            <span>专业物流配送安装</span>
        </div>
        <div>
            <i>快捷</i>
            <span>24小时内送货</span>
        </div>
    </div>
    <div class="footer-info">
        <div>
            <h2>关于我们</h2>
            <p>
                <a href="javascript:;">关于户里</a>
                <a href="javascript:;">注册协议</a>
            </p>
            <p>
                <a href="javascript:;">业务合作</a>
                <a href="javascript:;">免责声明</a>
            </p>
            <p>
                <a href="javascript:;">加入户里</a>
                <a href="javascript:;">隐私保护</a>
            </p>
        </div>
        <div>
            <h2>流程指南</h2>
            <p>
                <a href="javascript:;">购买家具</a>
                <a href="javascript:;">出售家具</a>
            </p>
            <p>
                <a href="javascript:;">支付方式</a>
                <a href="javascript:;">配送安装</a>
            </p>
            <p>
                <a href="">售后保障</a>
            </p>
        </div>
        <div>
            <h2>会员中心</h2>
            <p>
                <a href="">会员计划</a>
            </p>
            <p>
                <a href="">积分规则</a>
            </p>
            <p>
                <a href="">投诉建议</a>
            </p>
        </div>
        <div>
            <h2>练习客服</h2>
            <p>电话：</p>
            <p>028-67635062</p>
            <p>邮箱：</p>
            <p>hello@hulihome.com</p>
        </div>
        <div class="attention_box">
            <p class="attention"><i></i><span>新浪微博户里网</span></p>
            <div></div>
        </div>
        <div class="attention_box">
            <p class="attention"><i></i><span>关注微信"户里网"</span></p>
            <div></div>
        </div>
    </div>
    <div class="copy-right">
        蜀ICP备15028224号  成都户里科技有限公司
    </div>

    `;

    /******为列表选项设计鼠标悬浮事件*******/
    $("div.footer-info > div > p > a").hover(
        function () {
            $(this).css({
                "color":"black",
                "text-decoration":"underline"
            });
        }
    ,function () {
            $(this).css({
                "color":"gray",
                "text-decoration":"none"
            });
        });
}

$(function () {
    oUserInfo();
});
/*设置登陆成功之后的用户显示*/
function oUserInfo() {
    var nameuser = localStorage.getItem("nameInfo");
    if(nameuser){
        //组织hover事件
        $("header .login").unbind('mouseenter').unbind('mouseleave');
        $("header .login").text(nameuser);
        $("header .login").css({
            "background":"none",
            "overflow":"hidden"
        });
        $("header").on("click",".login",function () {
            $(this).attr("href","personalCenter.html")
        })

    }
}








