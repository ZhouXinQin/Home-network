/**
 * Created by admin on 2017/10/30.
 */
$(function () {
    // 切换幻灯片
    slide();
    //每次刷新页面回到页面顶部
    $("window,document,body,html").scrollTop(0);
});
/**
 * 功能：      淡入淡出轮播图
 */
function slide() {
    var aIdots = $(".slideList-point>span");
    var iMglist = $(".slideList img");
    iMglist.eq(0).show();
    aIdots.on("click",function () {
        $(this).addClass('ckd').siblings().removeClass("ckd");
        var index = $(this).index();
        i = index;
        iMglist.eq(index).fadeIn(1000).addClass("scale").siblings().fadeOut(1000).removeClass("scale");
    });
    //自动轮播
    var i=0;
    //向右切换
    var play = function(){
        i++;
        i = i > 3 ? 0 : i ;
        aIdots.eq(i).addClass('ckd').siblings().removeClass("ckd");
        iMglist.eq(i).fadeIn(1000).addClass("scale").siblings().fadeOut(1000).removeClass("scale");
        iMglist.eq(i).animate({
            "transform" : "scaleX(1.1)"
        },2000)
    };
    //自动轮播
    var timer = setInterval(play,3000);
    //鼠标移入移出效果
    $(".img_cols-sd").hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(play,3000);
    })
}