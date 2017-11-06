/*
* Author:  Dongshen
* Created: 2017/11/1
* Description
*/


/**** 页面加载完成后执行 ****/
$(function () {
   /***********页面切换功能*************/
   $("div.register-item > a").on("click",function () {
       $("login-page").css("display","none");
       $("register-page").css("display","block");
   });

   $("div.login-item > a").on("click",function () {
       $("register-page").css("display","none");
       $("login-page").css("display","block");
    });
    /***********注册功能实现*************/
        // 实例化表单验证函数对象
    var formValid = new Valid("registerForm");
    // 用户名验证
    formValid.blurValid("[name='regAccount']", "注册账号不能为空","请输入正确的邮箱格式",function (mail) {
       return CheckMail(mail);
    });
    // 昵称验证
    formValid.blurValid("[name='regPassword']", "注册密码不能为空","请输入正确的6-16位的密码格式",function (password) {
        return CheckPassword(password);
    });
    // 确认密码验证
    formValid.blurValid("[name='affPassword']", "确认密码内容不能为空","两次密码必须一致",function (affPassword) {
        return affirmPsd(affPassword);
    });
    // 注册按钮验证
    signUpValid("#register-btn");
    //登录按钮验证
    loginValid("#loginBtn");
});


/**** 函数功能定义部分 ****/

/**
 * 功能：数据验证
 * 参数：
 * 1、表单的name属性值（String）
 **/
function Valid(formName) {
    var $form = $("form[name=" + formName + "]");
    /**
     * 功能：失去焦点后的数据验证
     * 参数：
     * 1、表单元素标识符（String）
     * 2、错误提示文本（String）
     **/
    this.blurValid = function(ident, erroMesg_1,erroMesg_2,callback) {
        // 在当前表单元素内查找所有的表单元素，并绑定一个失焦事件
        $form.find(ident).on("blur", function() {
            var thisVal = $(this).val();
            // 内容为空的情况
            if(thisVal === "") {
                if($(this).next().is(".erroMesg_1") || $(this).next().is(".erroMesg_2")) {
                    $(this).next(".erroMesg_2").remove();
                    return;
                }
                else {
                    $(this).closest("div")
                        .append("<p class='erroMesg_1'>" + erroMesg_1 + "</p>");
                    $(this).next("i.checked").remove();
                }
            }
            // 已经输入内容的情况
            else {
                $(this).next(".erroMesg_1").remove();
                //验证输入的值是否符合要求
                if(callback(thisVal) ){
                    if($(this).next().is("i.checked")) {
                        return;
                    } else {
                        $(this).next(".erroMesg_2").remove();
                        $(this).after("<i class='checked'></i>");
                    }
                } else {
                    $(this).next("i.checked").remove();
                    if($(this).next().is(".erroMesg_2")){
                        return;
                    }
                    else {
                        $(this).closest("div")
                            .append("<p class='erroMesg_2'>" + erroMesg_2 + "</p>");
                    }
                }
            }
            var rightLength = $("i.checked").length;
            if(rightLength === 3) {
                $("#register-btn").prop("disabled",false);
                $("#register-btn").css("background","black");
            } else {
                $("#register-btn").prop("disabled",true);
                $("#register-btn").css("background","rgba(0, 0, 0, 0.44)");
                return;
            }
        });
    }
}

/**
 * 功能：注册按钮验证事件
 * 参数：
 * 1、表单的name属性值（String）
 * 2、注册按钮标识符（String）
 **/
function signUpValid(ident) {
    $(ident).on("click", function() {
        // 获取错误信息的个数
        var rightLength = $("i.checked").length;
        if(rightLength === 3) {
            // 表单验证
            var user = {
                "username": $("[name='regAccount']").val(),
                "password": $("[name='regPassword']").val()
            };

            console.log(Object.keys(user));
            determineUserIsExists("users", "username", $("[name='regAccount']").val(), function (status) {
                if(status == 0) {
                    alert("用户已经存在！");
                    $("[name='regAccount']").val("");
                    $("[name='regPassword']").val("");
                }else if(status == 1) {
                    // 存储用户
                    addUser("users", user, function () {
                        //页面传值
                        var name =  $("[name='regAccount']").val();
                        localStorage.setItem("nameInfo",name);

                        location.href = "index.html"
                        // 跳转到主页....
                    });
                }
            });
        }
        // 如果存在错误
        else {
            return;
        }
    });
}


/**
 * 功能：登录按钮验证事件
 * 参数：
 * 1、表单的name属性值（String）
 * 2、注册按钮标识符（String）
 **/
function loginValid(ident) {
    $(ident).on("click", function() {
        var thisActVal = $("#loginAct").val(),
            thisPsdVal = $("#loginPsd").val();
        login("users", {
            "username":thisActVal,
            "password":thisPsdVal
        }, function (status) {
            switch(status) {
                case 0:
                    if($("#loginBtn").next().is(".erroMesg_login")) {
                        $("#loginBtn").next().remove(".erroMesg_login");
                    } else {
                        $("#loginBtn").closest("div")
                            .append("<p class='erroMesg_login'>用户不存在！</p>");
                    }
                    break;
                case 1:
                    if($("#loginBtn").next().is(".erroMesg_login")) {
                        $("#loginBtn").next().remove(".erroMesg_login");
                    } else {
                        $("#loginBtn").closest("div")
                            .append("<p class='erroMesg_login'>账号或密码错误！</p>");
                    }
                    break;
                case 2:
                    if($("#loginBtn").next().is(".erroMesg_login")) {
                        $("#loginBtn").next().remove(".erroMesg_login");
                    } else {
                        $("#loginBtn").closest("div")
                            .append("<p class='erroMesg_login'>账号或密码为空！</p>");
                    }
                    break;
                case 200:
                    setTimeout(function () {
                        location.href = "index.html";
                        //页面传值
                        var name = $("#loginAct").val();
                       localStorage.setItem("nameInfo",name);
                    },1500);
                    break;
            }
        });
    });
}



/**
 * 功能          ：验证输入值是否是邮箱格式
 * @param mail          输入的邮箱
 * @return {boolean}    如果格式正确返回true，否则返回false
 * @constructor
 */
function CheckMail(mail) {
    var filter  = /([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5})+/;
    if (filter.test(mail)) return true;
    else {return false;}
};

/**
 * 功能   ：验证输入的密码是否是6-16位的字符（除换行、空格、Tab键）
 * @param password      输入的密码
 * @return {boolean}    如果格式正确返回true，否则返回false
 * @constructor
 */
function CheckPassword(password) {
    var filter  = /.{6,16}/;
    if (filter.test(password)) return true;
    else {return false;}
};

/**
 * 功能：      判断两次输入是否一致
 * @param affPassword   ：二次输入内容
 * @return {boolean}    如果一致返回true，否则返回false
 */
function affirmPsd(affPassword) {
    var $currentPsd = $("[name='regPassword']").val();
    if(affPassword === $currentPsd){
        return true;
    } else {
        return false;
    }
}




