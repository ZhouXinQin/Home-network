/**
 * 功能：获取非行间样式
 * @param el        【元素节点】
 * @param attr      【要获取的样式属性】
 * @return {*}      【样式属性值】
 */
function getStyle(el,attr) {
    //兼容ie
    if(el.currentStyle){
        return el.currentStyle[attr];
    }else {
        return getComputedStyle(el,null)[attr];
    }
}


/**
 * 淡入淡出效果-封装
 * @param element   执行元素
 * @param target    目标值
 * @param duration  持续时间
 * @param completed 回调函数
 */
function fade(element, target, duration, completed) {
    // Exception handling
    if(!element || target == undefined) {
        throw 'Error：Parameter is not complete in function \'changeOpacity\'.';
    }
    // Set the default value
    duration  = duration  ? duration  : 1000;
    // Gets the current opacity
    var curOpa = getCurrentOpacity();
    // Calculating offset
    var offset   = target - curOpa;
    // Set the interval
    var interval = 30;
    // Calculating speed
    var speed    = offset > 0 ? Math.ceil(offset / (duration / interval)) : Math.floor(offset / (duration / interval));
    // Execute transition animations
    var t = setInterval(function () {
        // Update the current opacity
        curOpa = getCurrentOpacity();
        // Determine whether to reach the target
        if((offset > 0 && curOpa < target) || (offset < 0 && curOpa > target)) {
            // Frame by frame change
            element.style.opacity = (curOpa + speed) / 100
        }else { // Has completed the transition animation
            element.style.opacity = target / 100;
            clearInterval(t);
            // Invoke the callback function
            if(completed) {
                completed();
            }
        }
    }, interval);

    function getCurrentOpacity() {
        var curOpa = 0;
        // Compatible with IE browser
        if(element.currentStyle) {
            curOpa = element.currentStyle['opacity'] * 100;
        }else {
            curOpa = getComputedStyle(element, false)['opacity'] * 100;
        }
        return curOpa;
    }
}

function  updateIdots(aIdots) {
    //清除上一个小圆点样式
    for(var i = 0;i < aIdots.length;i++){
        if (aIdots[i].classList.contains('active')){
            aIdots[i].classList.remove('active');
            break;
        }
    }
    aIdots[curImgIdx - 1].classList.add('active');
}

//自动播放
function autoPlay(_timer) {
    _timer = setInterval(function () {
        oNextBtn.onclick();
    },3000)
}
//停止播放
function stop() {
    clearInterval(_timer);
}


/**
 * 功能：将locationSearch转换为对象
 * @param
 * @returns {*}
 */
function locSearchValToObj(searchStr) {
    // 异常处理
    if (!searchStr) {
        return null;
    }else {
        var str = searchStr.slice(1);
        var strArr = str.split('&');
        var obj = {};
        strArr.forEach(function(item, idx, arr){
            var arr = item.split('=');
            var key = decodeURI(arr[0]);
            var val = decodeURI(arr[1]);
            obj[key] = val;
        });
        return obj;
    }
}

/**
 *功能：异常处理（断言）
 * @param expression  判断条件
 * @param message     提示信息
 * @return            描述错误对象
 */
function assert(expression, message) {
    if (!expression){
        throw {name: 'Assertion Exception', message: message};
    }
}

/**
 * 添加事件
 * @param element  事件对象
 * @param type     事件类型
 * @param callBack 回调函数
 */
function addEvent(element, type, callBack) {
    // 兼容IE10.0以下
    if(element.attachEvent) {
        element.attachEvent('on' + type, callBack);
    }else {
        element.addEventListener(type, callBack, false);
    }
}


/**
 * 功能：获取任意两个数值之间的随机数
 * @param min   number  最小值
 * @param max   number  最大值
 * @return {*}  随机数
 */
function randomDecimals(min, max) {
    if (!min || !max || isNaN(min) || isNaN(max)) {
        return -1;
    }else {
        return Math.random() * (max - min) + min;
    }
};

/**
 * 获取任意数之间的随机整数
 * @param  {[number]} min [最小值]
 * @param  {[number]} max [最大值]
 * @return {[number]}     [随机数]
 */
function randomInteger(min, max) {
    if (!min || !max || isNaN(min) || isNaN(max)) {
        return -1;
    }else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

/**
 *
 * @param length        【字符长度】
 * @return {string}     【随机结果】
 */
function random_char(length) {
    var bStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    bStr += 'abcdefghijklmnopqrstuvwxyz';
    bStr += '0123456789';
    var rStr = '';
    for (var i = 0; i < length; ++i) {
        var idx = Math.floor(Math.random() * bStr.length);
        rStr += bStr.substring(idx, idx + 1);
    }
    return rStr;
}


/**
 *
 * @param Selector  【选择器（id/class/tagName）】
 * @return {*}       【元素节点】
 */
function $(Selector) {
    // 异常处理
    if (typeof Selector != 'string' || Selector == '' || /\s/.test(Selector) == true) {
        return null;
    }
    if (/^#/.test(Selector) == true) {
        return document.getElementById(Selector.slice(1));
    }
    if (/^\./.test(Selector) == true) {
        return document.getElementsByClassName(Selector.slice(1));
    }
    return document.getElementsByTagName(Selector);
}

/**
 * 功能：实时验证输入框的字符只能是字母数字下划线
 * @param value  输入框的值
 */
function judgeIptValue(value) {
    var char = value[value.length-1];
    if(char && !/\w/.test(char)) {
        alert('只能包含字母数字下划线');
    }
}

/**
 * 功能               将对象序列化
 * @param obj        需要进行序列化的对象（obj）
 * @return {*}       返回参数序列化后的字符串
 */
function objToParam(obj) {
    var val = Object.prototype.toString.call(obj);
    val = val.slice(
        val.indexOf(" ") + 1,val.lastIndexOf("]")
    ).toLowerCase();
    if(val !== "object"){
        console.error("该函数只能支持原生对象，当前数据类型为" + val);
    }
    var paramArr = [];
    var paramStr = "";
    for(var x in obj){
        paramStr = x + "=" + encodeURIComponent(obj[x]);
        paramArr.push(paramStr);
    }
    var result = paramArr.join("&");
    return result;
}
/**
 * 本地存储：添加用户
 * @param key      存储用户信息的key
 * @param user     用户信息
 * @param callBack 存储成功回调函数
 */
function addUser(key, user, callBack) {
    // 定义存储用户信息的集合
    var users = null;
    // 判断本地是否已经存在该用户数据集合
    if(localStorage[key]) {
        // 存在，根据本地用户数据集合来初始化users
        users = JSON.parse(localStorage[key]);
    }else {
        // 不存在，创建一个空数组
        users = [];
    }

    // 添加用户
    //判断用户是否输入了注册账号与密码
    console.log();
    if(user[Object.keys(user)[0]] && user[Object.keys(user)[1]]){
        users.push(user);
        // 更新本地数据
        localStorage[key] = JSON.stringify(users);
        // 数据存储成功之后调用回调函数
        if(callBack) {
            callBack();
        }
    } else {
        alert("账号或密码不能为空");
        return;
    }

}

/**
 * 判断用户是否存在
 * @param key      存储用户信息在本地的key
 * @param gist     判断用户是否存在的依据
 * @param value    用户输入的值
 * @param response 响应结果（0用户存在 1用户不存在）
 */
function determineUserIsExists(key, gist, value, response) {
    if(!localStorage[key]) {
        response(1);
        return;
    }
    // 获取本地用户数据集合
    var users = JSON.parse(localStorage[key]);
    // 遍历本地用户数据集合，判断用户是否存在
    var tag = false;
    for(var i = 0; i < users.length; i++) {
        if(users[i][gist] == value) {
            // 用户存在
            tag = true;
        }
    }
    tag ? response(0) : response(1);
}

/**
 * 判断是否登录成功
 * @param key      存储用户信息在本地的key
 * @param gists    判断依据
 * @param response 响应结果
 * 0   用户不存在
 * 1   账号或密码错误
 * 2   账号或密码密码为空
 * 200 登录成功
 */

function login(key, gists, response) {
    // 判断本地数据用户集合是否存在
    // 如果不存在，则直接提示用户不存在
    if(!localStorage[key]) {
        response(0);
        return;
    }

    // 判断用户输入的账号或密码为空
    var username = Object.keys(gists)[0];
    var password = Object.keys(gists)[1];
    if(!gists[username] || !gists[password]) {
        response(2);
        return;
    }

    // 判断是否登录成功
    var users = JSON.parse(localStorage[key]);
    var idx = undefined;
    for(var i = 0; i < users.length; i++) {
        // 判断用户是否存在
        if(users[i][username] == gists[username]) {
            idx = i;
            break;
        }
    }
    if(idx == undefined) {
        // 用户不存在
        response(0);
    }else {
        // 用户存在
        if((users[idx][username] == gists[username]) &&  (users[idx][password] == gists[password])) {
            response(200);
        }else {
            response(1);
        }
    }
}

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
        iMglist.eq(index).fadeIn(1500).addClass("scale").siblings().fadeOut(1500).removeClass("scale");
    });
    //自动轮播
    var i=0;
    //向右切换
    var play = function(){
        i++;
        i = i > 3 ? 0 : i ;
        aIdots.eq(i).addClass('ckd').siblings().removeClass("ckd");
        iMglist.eq(i).fadeIn(1500).addClass("scale").siblings().fadeOut(1500).removeClass("scale");
        iMglist.eq(i).animate({
            "transform" : "scaleX(1.1)"
        },2000)
    };
    //自动轮播
    var timer = setInterval(play,4000);
    //鼠标移入移出效果
    $(".img_cols-sd").hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(play,4000);
    })
}