/*
* Author:  Dongshen
* Created: 2017/10/30
* Description
*/
$.getJSON("../json/data.json",function (json) {
    //请求JSON数据，并加载banner列表文本
    var goodsList = json.goodsnav[2],
        $proListBox = $("div.content-banner > div");
    $("div.content-banner > h1").text(goodsList["className"]);
    for(var i = 0;i < goodsList["objectData"].length;i++) {
        $proListBox.append("<a href=\"javascript:;\">" +goodsList["objectData"][i] + "</a>")
        //产品列表JSON数据加载
        var proList = json.conmodity;
        for(var x = 0;x < proList.length;x++) {
            for(var j in proList[x]) {
                if( j === "img"){
                    var $proImg = $("div.pro-list > section > a")[x];
                    $proImg.style.background = "url(../" + proList[x][j] + ") no-repeat center center";
                    // "background": "url(\"../imgs/sprites_0.png\") -264px -231px"
                } else if(j === "title") {
                    var $proName = $("span.proName")[x];
                    $proName.textContent = proList[x][j];
                } else if(j === "price") {
                    var $originalCost = $("span.originalCost")[x];

                    $originalCost.textContent = proList[x][j];
                } else if(j === "reduce"){
                    var $discountPrice = $("span.discountPrice")[x];
                    $discountPrice.textContent = proList[x][j];
                    //判断是否有降价，添加删除线
                    if(proList[x][j] !== "") {
                        $discountPrice.previousElementSibling.classList.add("delete");
                    }
                }
            }
        }
    }
});
/**************为产品列表选择菜单设置事件**************/
$("div.content-menu > div").hover(function () {
    $(this).children("ul").css({
        "display":"block",
        "backgroundColor":"white",
        "border-left": "1px solid gray",
    "border-right": "1px solid gray",
    "border-bottom": "1px solid gray"
    });
    $(this).children("ul").children().first().css({
        "border-top": "1px solid red"
    });
    $(this).css({
        "border":"1px solid gray"
    });
},function () {
    $(this).children("ul").css({
        "display":"none",
    });
    $(this).css({
        "border":"none"
    });
});
/************产品列表的鼠标悬浮事件**************/
$("div.pro-list > section").hover(function () {
    $(this).children().last().children().last().css("display","block")
},function () {
    $(this).children().last().children().last().css("display","none")
});
/*****************点击跳转到商品详情页********************/
$("div.pro-list > section").on("click",function () {
    //存储点击所选项的索引值
    var proListIndex = $(this).index();
    console.log(proListIndex);
    localStorage.proIndex = proListIndex;
    //跳转到详情页
    location.href = "goodsDetails.html";
});