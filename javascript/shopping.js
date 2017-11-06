$(function () {
    //生成购物车数据
    shoppingCartData();
    //数量递增递减函数
    progressivelyDecreasing();
    //单选全选
    selectTheRadio();
    //删除商品
    daleShop();
    //点击结算
    gotoPay();
});


/*生成购物车数据*/
function shoppingCartData() {
    //获取本地粗存在购物车的数据
    var locData = JSON.parse(localStorage.getItem("memoireData"));
    //获取数据长度
    // var locData_leng = locData.length;
    //循环添加tr
    var str = "";
    for (var i = 0 ; i < locData.length ; i++ ){
        str +=  '<tr>'+
        '<td class="trea_ckd">'+
           '<input name="treasure" type="checkbox" checked>'+
        '<i class="i_trea ckb_custom"></i>'+
            '</td>'+
            '<td class="tren_info">'+
            '<div>'+
            '<img src="' +locData[i].img +
            '">'+
            '<p>'+
            '<a href="#">' + locData[i].name +
            '</a>'+
            '</p>'+
            '</div>'+
            '<div class="disc_info">'+
            '<p>' + locData[i].shoptype +
        '</p>'+
            '<p>' +locData[i].shopScience +
            '</p>'+
            '<p>' +locData[i].shopDyeing +
            '</p>'+
            '</div>'+
            '</td>'+
            '<td class="price">￥'+locData[i].price +
        '</td>'+
        '<td class="trea_count">'+
            '<button type="button" class="active increasing">-</button>'+
            '<input type="text" value="' +locData[i].number +
            '" class="number">'+
            '<button type="button" class="active accumulation">+</button>'+
            '</td>'+
            '<td class="sinToPrice">￥'+(locData[i].price)*(locData[i].number) +
            '</td>'+
        '<td class="trea_del">'+
            '<a class="dele">删除</a>'+
            '</td>'+
            '</tr>';
        //设置默认总价
        $(".monney").text(function (idx,item) {
            return (parseFloat((locData[i].price)*(locData[i].number)) + parseFloat(item)).toFixed(2)
        })
        //已选择商品个数
        choice()
    }
    $("tbody").append(str)

    //设置购物车数量
    var a = $("tbody tr").length;
    $(".pro-count").text(a);
    //已选择商品个数
    choice()

}

var  $needPayEle  = $("input:checked").parent().siblings(".sinToPrice"),
    $needPay_length = $needPayEle.length,
    needPayNum = 0;
for(var i = 0;i < $needPay_length;i++) {
    var  $needPay  = $("input:checked").parent().siblings(".sinToPrice")[i].textContent.slice(1);
    needPayNum += $needPay;
}


/*数量递增递减函数*/
function progressivelyDecreasing() {
    //递减
    $(".increasing").on("click",function () {
        //获取单价
        var $price = $(this).parent().siblings(".price").text();
        var $price_d = $price.slice($price.indexOf("￥")+1);
        //设置个数
        $(this).siblings(".number").val(function (idx,item) {
            var num = parseInt(item);
            return num - 1;
        });
        //购物车数量不能少于0
        if ($(this).siblings(".number").val() === "1"){
            $(this).prop("disabled",true);
            $(this).siblings(".accumulation").prop("disabled",false)
        }
        //获取当前个数
        var $num = parseFloat($(this).siblings(".number").val());
        //设置单个商品的总价
        $(this).parent().siblings(".sinToPrice").text("￥" + ($price_d*$num).toFixed(2));
        //设置总价
        if($("tbody tr").length == 1){
            calculatePay()
        }else {

            calculatePay()
        }
    });

    //递增
    $(".accumulation").on("click",function () {
        //获取单价
        var $price = $(this).parent().siblings(".price").text();
        var $price_d = $price.slice($price.indexOf("￥")+1);
        //设置个数
        $(this).siblings(".number").val(function (idx,item) {
            var num = parseInt(item);
            return num + 1;
        });
        //购物车数量不能多于5
        if ($(this).siblings(".number").val() === "5"){
            $(this).prop("disabled",true);
            $(this).siblings(".increasing").prop("disabled",false)
        }
        //获取当前个数
        var $num = parseFloat($(this).siblings(".number").val());
        //设置单个商品的总价
        $(this).parent().siblings(".sinToPrice").text("￥" + ($price_d*$num).toFixed(2));
        //设置总价
        if($("tbody tr").length == 1){
            calculatePay()
        }else {
            calculatePay()
        }
    })
}


/*单选全选*/
function selectTheRadio() {
    //点击全选
    $(".shopping-cart ").on("click",".allCkd ",function () {
        $(this).toggleClass("ckb_custom");
        if($(this).is(".ckb_custom")){
            //将同级input的状态置为选中
            $(this).siblings("input").prop("checked",true);
            //将同级tbody的状态置为选中
            $(".i_trea").addClass("ckb_custom");
           $("tbody").children("tr").children("td").children("input").prop("checked",true);
           //将th或者结算栏的input置为选中
            $(".a").addClass("ckb_custom");
            $(".a").siblings("input").prop("checked",true);
            $(".b").addClass("ckb_custom");
            $(".b").siblings("input").prop("checked",true);
        }else {
            //将同级input的状态置为不选中
            $(this).siblings().prop("checked",false);
            //将同级tbody的状态置为不选中
            $(".i_trea").removeClass("ckb_custom");
            $(this).parents("thead").siblings("tbody").children("tr").children("td").children("input").prop("checked",false);
            //将th或者结算栏的input置为不选中
            $(".a").removeClass("ckb_custom");
            $(".a").siblings("input").prop("checked",false);
            $(".b").removeClass("ckb_custom");
            $(".b").siblings("input").prop("checked",false);
        }
        //已选择商品个数
        choice()
    });

    //点击单选
    $("tbody").off("click").on("click",".i_trea",function () {
        //给tbody添加选中的class
        $(this).toggleClass("ckb_custom");
        if($(this).is(".ckb_custom")){
            $(this).siblings("input").prop("checked",true);
            var inck_leng = $("input:checked").length;
            var inp_length = $("tbody .i_trea").length;
            console.log(inck_leng,inp_length)
            if (inck_leng === inp_length){
                //将th或者结算栏的input置为选中
                $(".a").addClass("ckb_custom");
                $(".a").removeClass("ckb");
                $(".a").siblings("input").prop("checked",true);
                $(".a").siblings("input").prop("indeterminate",false);
                $(".b").addClass("ckb_custom");
                $(".b").removeClass("ckb");
                $(".b").siblings("input").prop("checked",true);
                $(".b").siblings("input").prop("indeterminate",false);
                calculatePay();
            }else if(inck_leng === 0){
                $(".a").removeClass("ckb");
                $(".a").removeClass("ckb_custom");
                $(".a").siblings("input").prop("indeterminate",false);
                $(".a").siblings("input").prop("checked",false);
                $(".b").removeClass("ckb");
                $(".b").siblings("input").prop("indeterminate",false);
                $(".b").siblings("input").prop("checked",false);
                calculatePay();
            }else {
                //将th或者结算栏的input置为选中
                $(".a").addClass("ckb");
                $(".a").removeClass("ckb_custom");
                $(".a").siblings("input").prop("indeterminate",true);
                $(".b").addClass("ckb");
                $(".b").removeClass("ckb_custom");
                $(".b").siblings("input").prop("indeterminate",true);
                calculatePay();
            }
        }else {
            $(this).siblings("input").prop("checked",false);
            var inck_lengA = $("input:checked").length;
            var inp_lengthB = $("tbody .i_trea").length;
            console.log(inck_lengA,inp_lengthB);
            if (inck_lengA === inp_lengthB){
                //将th或者结算栏的input置为选中
                $(".a").addClass("ckb_custom");
                $(".a").removeClass("ckb");
                $(".a").siblings("input").prop("checked",true);
                $(".b").addClass("ckb_custom");
                $(".b").addClass("ckb");
                $(".b").siblings("input").prop("checked",true);
                calculatePay();
            }else if(inck_lengA === 0){
                $(".a").removeClass("ckb");
                $(".a").removeClass("ckb_custom");
                $(".a").siblings("input").prop("indeterminate",false);
                $(".a").siblings("input").prop("checked",false);
                $(".b").removeClass("ckb");
                $(".b").siblings("input").prop("indeterminate",false);
                $(".b").siblings("input").prop("checked",false);
                calculatePay();
            }else {
                //将th或者结算栏的input置为选中
                $(".a").addClass("ckb");
                $(".a").removeClass("ckb_custom");
                $(".a").siblings("input").prop("indeterminate",true);
                $(".b").addClass("ckb");
                $(".b").addClass("ckb_custom");
                $(".b").siblings("input").prop("indeterminate",true);
                calculatePay();
            }
        }
        //已选择商品个数
        choice()
    })

}


/*删除商品*/
function daleShop() {

    $(".dele").on("click",function () {
        $(this).parents("tr").addClass("checked");
        $(".maskLayer").fadeIn();
        //调用弹出框函数
        popup("删除商品","您是否要删除选中的商品？删除后该商品将不再显示。");
        //点击确定
        $(".sureDeleThisOrder").off("click").on("click",function () {
            //删除带有“deleChecked”的元素
            $(".checked").remove();
            $(".maskLayer").fadeOut(500,function () {
                //清空弹出框
                $(".maskLayer").children().remove();
                calculatePay();
                choice();
            });
            //系统消息个数设置
            var a = $("tbody tr").length;
            $(".pro-count").text(a);
            if(a === 0) {
                $(".allCkd").removeClass("ckb_custom");
                $(".allCkd").siblings("input").prop("checked",false);
            }
        });
        //点击取消
        $(".cancleDeleOrder").off("click").on("click",function () {
            $("tbody tr").removeClass("checked");
            $(".maskLayer").fadeOut(500,function () {
                //清空弹出框
                $(".maskLayer").children().remove();
            });
        });
        //已选择商品个数
        choice()
    });
    //已选择商品个数
    choice()
}

/*$("input:checked").parent().siblings(".sinToPrice")
$("input.number");
var inputNumSub = 0;
for(var i = 0;i < $("input.number").length;i++) {
    var $inputNum = $("input.number")[i];
    var inputNumber = parseInt($inputNum.val());
    inputNumSub += inputNumber;

}*/
/*点击结算*/
function gotoPay() {
    $(".gotoPay").on("click",function () {
        //数据储存函数
        datajson();
        var txt = $(".sc-payBar .monney").text();
        $(".priceData").text(txt);
        setTimeout(function () {
            //支付成功弹出框
            $(".success").fadeIn(500,function () {
                $("#btn").off("click").on("click",function () {
                    localStorage.setItem("flage",1);
                    location.href = "personalCenter.html"
                })
            });
        },500)
    })
}
/*数据储存函数*/
function datajson() {
    var locastoge = [];
    for (var j = 0; j < $("tbody input:checked").length; j++) {
        var sinToPrice_text = $("tbody input:checked").eq(j).parent().siblings(".sinToPrice").text();
        var time = ( new Date()).toLocaleString();
        var imgsrc = $("tbody input:checked").eq(j).parent().siblings("td").children().children("img").attr("src");
        var orderNumber = "Id11002294568";
        jsonObj = {
            "price": sinToPrice_text,
            "time": time,
            "imgsrc": imgsrc,
            "orderNumber": orderNumber
        };
        locastoge.push(jsonObj);
        var orderInformation = JSON.stringify(locastoge);
        localStorage.setItem("orderInformation", orderInformation)
    }
}

function choice() {
    //已选择商品个数
    var chk = $("tbody input:checked").length;
    $(".trea_count_sum").text(chk)
}

/*需支付金额的计算*/
function calculatePay() {
    var  $needPayEle  = $("input:checked").parent().siblings(".sinToPrice"),
        $needPay_length = $needPayEle.length,
        needPayNum = 0;
    for(var i = 0;i < $needPay_length;i++) {
        var  $needPay  = parseFloat($("input:checked").parent().siblings(".sinToPrice")[i].textContent.slice(1));
        needPayNum += $needPay;
    }
    $("span.monney").text("￥" + needPayNum.toFixed(2));
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























