$(function () {
    //个人订单数据设置
    dataInformation();
    //出售数据设置
    saleOrder();
    //点击切换页面函数
    clickToSwitch();
    //个人信息性别切换
    genderSwitching();
    //点击删除订单信息
    deleteOrder(".order","删除订单","您是否要删除该订单信息？删除后不再显示该订单。");
    //点击删除出售信息
    deleteOrder(".sell","删除出售订单","您是否要删除该出售订单信息？删除后不再显示该订单。");
    //系统消息删除选中
    systemMessage();
    //个人信息下拉框显示函数
    dropDownBox();
    //系统消息展开函数
    messageUnfolding();
    //购物车默认跳转到我的订单
    flageLo();

});


/*个人订单数据设置*/
function dataInformation() {
    var str = "";
    if(!localStorage.getItem("orderInformation")){
        return;
    } else {
        //获取提交订单的数据
        var dataObj = JSON.parse(localStorage.getItem("orderInformation"));
    }
    for (var j = 0 ; j < dataObj.length ; j++){
        str +=   '<tr>'+
            '<td class="img_info">'+
            '<div class="img_thumbnail">'+
            '<img src="../imgs/example_0.jpg">'+
            '<p>' +dataObj[j].orderNumber +
            '</p>'+
            '</div>'+
            '</td>'+
            '<td>' +dataObj[j].price +
            '</td>'+
            '<td>' +dataObj[j].time +
            '</td>'+
            '<td>' +dataObj[j].time +
            '</td>'+
            '<td>送货中</td>'+
            '<td class="data_ctrlGroup">'+
            '<div class="top">'+
            '<a class="link-gray">查看</a>'+
            '<span class="gapLine_v"></span>'+
            '<a class="link-gray cancleOrder">取消</a>'+
            '</div>'+
            '<div class="bottom">'+
            '<a class="link-gray">售后</a>'+
            '<span class="gapLine_v"></span>'+
            '<a class="link-gray dele">删除</a>'+
            '</div>'+
            '</td>'+
            '</tr>'
    }
    $(".order tbody").append(str);
}

/*出售数据设置*/
function saleOrder() {
    $.getJSON("../json/sell.json",function (data) {
        console.log(data);
        var str = "";
        data.tabItem.forEach(function (item,idx) {
            str += '<tr>'+
                '<td class="img_info">'+
                '<div class="img_thumbnail">'+
                '<img src="../imgs/example_0.jpg">'+
                '<p>' + item.order +
                '</p>'+
                '</div>'+
                '</td>'+
                '<td>￥' + item.price +
                '</td>'+
                '<td>' + item.time +
                '</td>'+
                '<td>' +  item.delivery +
                '</td>'+
                '<td>' +  item.commodity +
                '</td>'+
                '<td>' + item.state +
                '</td>'+
                '<td>' + item.Payment +
                '</td>'+
                '<td class="data_ctrlGroup">'+
                '<div class="top">'+
                '<a class="link-gray">' + item.apply +
                '</a>'+
                '</div>'+
                '<div class="bottom">'+
                '<a class="link-gray dele">' +  item.del +
                '</a>'+
                '<span class="gapLine_v"></span>'+
                '<a class="link-gray">' +  item.cancel +
                '</a>'+
                '</div>'+
                '</td>'+
                '</tr>'
        });
        $(".sell tbody").append(str)
    })
}


/*点击切换页面函数*/
function clickToSwitch(){
   //获取导航
    var $navigation = $(".pesnInfo-choose ul li");
    //点击
    $navigation.on("click",function () {
        //给当前点击的元素添加class选中效果
        $(this).children("a").addClass("checked");
        //移除当前元素兄弟节点的选中效果
        $(this).siblings().children("a").removeClass("checked");
        //获取当前点击的下标
        var thisIdx = $(this).index();
        //获取点击显示的页面
        var $messgPage = $(".content .pesnInfo-set");
        //页面
        $messgPage.eq(thisIdx).css("display","block").siblings().css("display","none");
    });
    //默认显示第一个页面
    $navigation.eq(0).trigger("click")
}

/*个人信息性别切换*/
function genderSwitching() {
    $(".person .sexSelect i").on("click",function () {
        //给当前元素添加选中效果
        $(this).addClass("rdo-checked_custom").removeClass("rdo_custom");
        $(this).siblings("input").prop("checked",true);
        //给当前元素同级元素取消选中效果
        $(this).parent().siblings().children("i").removeClass("rdo-checked_custom");
        $(this).parent().siblings().children("i").addClass("rdo_custom");
        $(this).parent().siblings().children("input").prop("checked",false);
    })
}

/*个人信息下拉框显示函数*/
function dropDownBox() {
    $(".person ul>li>ul>li").on("click",function () {
        $(this).parent().siblings("span").text($(this).text())
    })
}


/*点击删除订单和信息*/
function deleteOrder(partent,me_1,me_2) {
    $(partent).on("click",".dele",function () {
        //给当前点击的元素的父级的父级添加class“deleChecked”
        $(this).parents("tr").addClass("deleChecked");
        $(".maskLayer").fadeIn();
        //调用弹出框函数
        popup(me_1,me_2);
            //点击确定
        $(".sureDeleThisOrder").off("click").on("click",function () {
            //删除带有“deleChecked”的元素
            $(".deleChecked").remove();
            $(".maskLayer").fadeOut(500,function () {
                //清空弹出框
                $(".maskLayer").children().remove();
            });
        });
        //点击取消
        $(".cancleDeleOrder").off("click").on("click",function () {
            $("tr.deleChecked").removeClass("deleChecked");
            $(".maskLayer").fadeOut(500,function () {
                //清空弹出框
                $(".maskLayer").children().remove();
            });
        })
    });
    /*点击按钮返回主页*/
    $(".order .pesnInfo_btn").on("click",function () {
        location.href = "index.html";
    });
}


/*系统消息删除选中*/
function systemMessage() {
    //获取所有的i标签
    var $selector = $(".message .selector");
    //系统消息个数设置
    $(".math").text($selector.length);
    $selector.on("click",function () {
        //添加选中效果
        $(this).toggleClass("checked");
        //给当前点击的i标签的父级li添加class
        $(this).parents("li").toggleClass("delemesg");
        //点击删除按钮
        $(".message .pesnInfo_btn").off("click").on("click",function () {
            $(".maskLayer").fadeIn();
            //调用弹出框函数
            popup("删除消息","您是否要删除选中的消息？删除后不再显示该消息。");
            //点击确定
            $(".sureDeleThisOrder").off("click").on("click",function () {
                //删除带有“deleChecked”的元素
                $(".delemesg").remove();
                $(".maskLayer").fadeOut(500,function () {
                    //清空弹出框
                    $(".maskLayer").children().remove();
                });
                //系统消息个数设置
                var a = $(".message .selector").length;
                $(".math").text(a);
            });
            //点击取消
            $(".cancleDeleOrder").off("click").on("click",function () {
                $("tr.deleChecked").removeClass("delemesg");
                $(".maskLayer").fadeOut(500,function () {
                    //清空弹出框
                    $(".maskLayer").children().remove();
                });
            })
        })
    })
}

/*系统消息展开函数*/
function messageUnfolding() {
    $(".message li .mesgContent").on("click",function () {
        $(this).children("p:first").toggleClass("mesgTxt");
        $(this).children("p:first").toggleClass("mesg_2");
        $(this).toggleClass("mesg_1");
        $("div.mesgContent > p:first-child").animate({
            "height" : "auto"
        },300)
    })
}

/*购物车默认跳转到我的订单*/
function flageLo() {
    var sta = localStorage.getItem("flage");
    if(sta){
        $(".pesnInfo-choose li ").eq(1).trigger("click")
    }else {
        $(".pesnInfo-choose li").eq(0).trigger("click")
    }
}


/*弹出框函数*/
function popup(mesg_1,mesg_2) {
    var str  = "";
    str  = '<div>'+
        '<h2>'+ mesg_1 +
        '</h2>'+
        '<p>' + mesg_2 +
        '</p>'+
        '<p>'+
        '<button type="button" class="sureDeleThisOrder">确定</button>'+
        '<button type="button" class="cancleDeleOrder">取消</button>'+
        '</p>'+
        '</div>';
    $(".maskLayer").html(str);
}















