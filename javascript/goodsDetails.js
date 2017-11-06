/**
 * Created by admin on 2017/10/31.
 */
$(function () {
    //缩略图的点击事件
    clickevent();
    //购买操作
    jumpshop();
    //动态加载数据
    $.getJSON("../json/data.json",function (content) {
        console.log(content);
        var  liLength = $(".imgbox-show > ul > li").length;
        for (var i = 0; i < liLength; i++){
            $(".imgbox-show li").eq(i).append("<img src ="+ content.max[i] +" >");
            $(".thumbnail li").eq(i).append("<img src ="+ content.min[i] +" >")
        }
        var getProList = localStorage.getItem("proIndex");
        //判断是否有降价，添加元素样式
        var conTents = content.conmodity[getProList];
        $(".goodsName>h1").text(conTents.title);
        $(".origPrice .rmbNum").text((conTents.price).slice(1));
        if(conTents.reduce === ""){
                $(".origPrice span.deleOldPrice").css("display","none");
                $(".newPrice").css("display","none");
        } else {
            $(".newPrice .rmbNum").text((conTents.reduce).slice(1));
        }
    })
});
//缩略图的点击事件
function clickevent() {
    $(".thumbnail li").on("click",function () {
        thisIdx = $(this).index();
        $(this).addClass("selected").siblings().removeClass("selected");
        $(".imgbox-show li").eq(thisIdx).fadeIn(300).siblings().fadeOut(300);
    })
}
//购买操作
function jumpshop() {
    var localDate = [];
    //购买事件
    $(".immedBuy").on("click",function () {
    location.href ="shopping.html"
    });
    //加入购物车事件
    $("#joinshop").on("click",function () {
        //点击时储存数据
        seveData(localDate);
        var inpVal =$(".countSet>input").val();
        if(inpVal > 0){
            if($(this).next().is("p")){
                return;
            } else {
                $(this).after("<p class='addsuccess'>添加成功，在购物车等亲</p>")
            }
        }
        setTimeout(function () {
            $(".addsuccess").remove();
        },500)
    });
    // 数量操作
    //加
    var plusval = $(".plus");
    var minusval = $(".minus");
    // 点击加按钮事件
    plusval.on("click",function () {
        //解除减号禁用
        minusval.prop("disabled",false);
        minusval.removeClass("disabled").addClass("bgcolor");
        var inpLabel = $(".countSet>input");
        //点击加号累计数量
        inpLabel.val(function (idx,item) {
        var a = parseInt(item);
        return  a + 1;
    });
        //判断数量，不能超过库存
        var inpVal =inpLabel.val();
        if(inpVal >= 5){
            plusval.addClass("disabled");
            plusval.prop("disabled",true);
           return
        }
    });
    //减
    minusval.on("click",function () {
        //解除加号禁用
        plusval.removeClass("disabled").addClass("bgcolor");
        plusval.prop("disabled",false);
        var inpLabel = $(".countSet>input");
        //点击减号减少数量
        inpLabel.val(function (idx,item) {
            var a = parseInt(item);
            return  a - 1;
        });
        //判断数量，不能少于0
        var inpVal = inpLabel.val();
        if(inpVal <= 0){
            minusval.addClass("disabled");
            minusval.prop("disabled",true);
            return
        }
    });
}
//本地储存
function seveData(localDate) {
    var inpLabel = $(".countSet>input").val();
    //判断如果数量<=0则不本地储存，数量>0则本地储存
    if(inpLabel <= 0){
        return;
    }else {
        //数据调用
        setshopData();
        localDate.push(saveDataObj);
        // localDate = JSON.stringify(localDate);
        saveDataObj = JSON.stringify(localDate);
        localStorage.setItem("memoireData", saveDataObj);

    }
}
// 设置存储数据
function setshopData() {
    // 获取商品信息
    let inpTxt = $(".countSet>input").val();
    let shopName = $(".goodsName>h1").text();
    let shopsype = $(".dimension").text();
    let shopscience = $(".science").text();
    let shopdyeing = $(".dyeing").text();
    let imgages = $(".showing img").attr("src");
    let price = $(".newPrice .rmbNum").text();
    // 设置需要存储的对象
    saveDataObj = {
        "number": inpTxt,
        "name": shopName,
        "shoptype": shopsype,
        "shopScience": shopscience,
        "shopDyeing": shopdyeing,
        "img":imgages,
        "price":price
    }
}