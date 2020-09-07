<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="Server-Ip" content="${myIp}">
    <title>${webTitle}</title>
    <%@ include file="inc/extjs.jsp" %>
    <!--[if lte IE 6]>
    <script type="text/javascript" src="res/js/unitpngfix.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="res/db/font-awesome-default/css/font-awesome.min.css">
    <link type="text/css" href="${loginCss}" rel="stylesheet"/>
    <link rel="icon" href="res/img/favicon.png">
    <style type="text/css">
        .login-form {
            width: 420px;
            height: 330px;
            position: absolute;
            top: 52%;
            margin-top: -190px;
            right: 10%;
            background-color: #fff;
        }

        .login-form .login-tab-l, .login-form .login-tab-r {
            width: 211px;
        }

        .login-form .login-tab {
            height: 54px;
            font-size: 18px;
            font-family: "microsoft yahei";
            text-align: center;
            border-bottom: 1px solid #f4f4f4;
            position: absolute;
            background: #fff;
            display: block;
        }

        .login-form .login-tab a {
            width: 99%;
            height: 18px;
            position: absolute;
            left: 0;
            top: 18px;
            border-right: 1px solid #f4f4f4;
            text-decoration: none;
            color: #666;
        }

        .login-form .login-tab-r {
            right: 0;
        }

        .login-form .login-box {
            width: 380px;
            padding: 20px;
        }

        .checked {
            color: #f56600 !important;
        }

        .login-form .login-box .tab-h {
            height: 35px;
            display: block;
            width: 306px;
            overflow: visible;
        }

        .login-form .msg-wrap {
            min-height: 23px;
            margin-top: 5px;
            margin-bottom: 5px;
            height: auto !important;
        }

        .login-form .msg-error {
            position: relative;
            background: #ffebeb;
            color: #e4393c;
            border: 1px solid #faccc6;
            padding: 3px 10px 3px 40px;
            line-height: 15px;
            height: auto;
        }

        .login-form .msg-error b {
            position: absolute;
            display: inline-block;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: red;
            left: 18px;
            top: 0;
            color: #fff;
            font-size: 22px;
            line-height: 15px;
            text-align: center;
        }

        .hide {
            display: none;
        }

        .login-form .login-box .mc {
            overflow: visible;
        }

        .form .item-fore1, .form .item-fore2 {
            border: 1px solid #bdbdbd;
            height: 38px;
            width: 250px;
        }

        .form .item {
            position: relative;
            margin-bottom: 20px;
            z-index: 1;
        }

        .form > form {
            position: relative;
        }

        .form .item .login-label {
            position: absolute;
            z-index: 3;
            top: 0;
            left: 0;
            width: 38px;
            height: 38px;
            border-right: 1px solid #bdbdbd;
            background-color: #3e484a;
            color: #f7f7f7;
            text-align: center;
            line-height: 38px;
            font-size: 20px;
        }

        .form .item.item-checking {
            position: absolute;
            right: 0;
            top: 60px;
        }
        
        .form .item.item-checked{
        	position: absolute;
            right: 0;
            top: 60px;
        }

        .form .item.item-checking > a {
            padding: 0 10px;
            height: 39px;
            background-color: #3e484a;
            color: #fff;
            display: inline-block;
            width: 100px;
            text-decoration: none;
            line-height: 38px;
            font-size: 14px;
        }
        
        .form .item.item-checked > a {
            padding: 0 10px;
            height: 39px;
            background-color: #a2a2a2;
            color: #fff;
            display: inline-block;
            width: 90px;
            text-decoration: none;
            line-height: 38px;
            font-size: 14px;
        }

        .form label {
            float: none;
        }

        .form .itxt {
            line-height: 18px;
            height: 18px;
            border: 0;
            padding: 10px 0 10px 50px;
            width: 160px;
            float: none;
            overflow: hidden;
            font-size: 14px;
            font-family: '\5b8b\4f53';
        }

        .form .item-fore1 {
            width: 376px;
        }

        .form .item-fore1 .itxt {
            width: 300px;
        }

        .form .item-fore1 .clear-btn, .form .item-fore2 .clear-btn {
            position: absolute;
            z-index: 20;
            right: 6px;
            top: 9px;
            width: 14px;
            height: 14px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 100;
            color: grey;
        }

        .form .item .pwd-label {
            background-position: -48px 0;
        }

        .form .item-fore1 .capslock, .form .item-fore2 .capslock {
            position: absolute;
            z-index: 4;
            display: none;
            width: 106px;
            top: 28px;
            left: 50px;
            padding-left: 8px;
            height: 26px;
            line-height: 28px;
            overflow: hidden;
            background: url(//misc.360buyimg.com/user/passport/1.0.0/css/i/capslock.png) no-repeat;
        }

        .forget-pw-safe {
            float: right;
        }

        .forget-pw-safe > a {
            color: #999;
        }

        .form .item-fore5 {
            margin-bottom: 10px;
        }

        .login-form .login-box .login-btn {
            border: 1px solid #cb2a2d;
            margin: 0 auto;
            height: 32px;
            width: 99%;
            position: relative;
        }

        .login-form .login-box .login-btn .btn-img {
            border: 1px solid #3e484a;
            display: block;
            width: 378px;
            background: #3e484a;
            height: 33px;
            line-height: 31px;
            color: #fff;
            font-size: 20px;
            font-family: 'Microsoft YaHei';
            text-align: center;
            text-decoration: none;
        }
        .log_button      {cursor:pointer;}
    </style>
    <script type="text/javascript">
        var passwordHash = '${passwordHash}';
    </script>
</head>
<body class="loginbody">
<div class="bg_img"></div>
<div class="log_wrap">
    <div class="log_logo"></div>
    <div class="log_img"></div>
    <%--<div class="log_area">--%>
    <%--<form:form action="login.html" method="post" modelAttribute="authorizationData" onsubmit="return remem(passwordHash);">--%>
    <%--<form:input type="text" name="userId" id="userId" autocomplete="off" path="userId" class="log_user"  />--%>
    <%--<form:errors path="userId" cssStyle="display:none;" id="userIdError" />--%>
    <%--<form:input type="password" name="password" id="password" path="password" 	class="log_pswd" />--%>
    <%--<form:errors path="password" cssStyle="display:none;" id="passwordError"/>--%>
    <%--<a class="log_check_user" onclick="checkit(this);" href="javascript:void(0)" title="选择此选项，便可以在本地保留您的登录用户名信息，下次方便登录。" id="rememId"></a>--%>
    <%--<a class="log_check_pswd" onclick="checkit(this);" href="javascript:void(0)" title="选择此选择，可以保留您登录时的密码，下次方便登录，但请慎重选择，以免造成您的信息泄露。" id="rememPwd"></a>--%>
    <%--<a class="log_check_forget" id="findPassword" href="javascript:void(0)">忘记密码</a>--%>
    <%--<form:input type="hidden" name="loginTimes" path="loginTimes" value="1" />--%>
    <%--<input class="log_button" type="submit" value="" />--%>
    <%--</form:form>--%>
    <%--</div>--%>
    <div class="login-form">
        <div class="login-tab login-tab-l">
            <a href="javascript:void(0)" class="checked" style="outline: rgb(109, 109, 109) none 0px;"> 账户登录</a>
        </div>
        <!--<div class="login-tab login-tab-r">
            <a href="javascript:void(0)" style="outline: rgb(109, 109, 109) none 0px;"></a>
        </div>
        -->
        <div class="login-box content ">
            <div class="tab-h"></div>
            <div class="msg-wrap">
                <div class="msg-error hide"><b>-</b><span>请输入密码</span></div>
            </div>
            <div class="mc">
                <div class="form">
                    <form:form action="emailLogin.html" method="post" modelAttribute="authorizationData" >
                        <div class="item item-checking" id="item-checking">
                            <a href="javascript:;" id="sendVerifyAction" >点击发送验证码</a>
                        </div>
                        <div class="item item-fore1">
                            <label for="loginname" class="login-label name-label fa fa-user-o"></label>
                            <form:input path="userId" id="userId" type="text" class="itxt" name="loginname" tabindex="1"
                                   autocomplete="off" placeholder="用户名/邮箱"/>
                            <form:errors path="userId" cssStyle="display:none;" id="userIdError" />
                            <span class="clear-btn fa fa-times hide"></span>
                        </div>
                        <div id="entry" class="item item-fore2" style="visibility: visible;">
                            <label class="login-label pwd-label fa fa-unlock" for="nloginpwd"></label>
                            <form:input path="password" type="text" id="nloginpwd" onblur="hideCapsLock()"
                                   onkeypress="testCapsLock(event)" name="nloginpwd" class="itxt itxt-error"
                                   tabindex="2" autocomplete="off" placeholder="验证码"/>
                            <form:errors path="password" cssStyle="display:none;" id="passwordError"/>
                            <span class="clear-btn fa hide fa-times"></span>
                            <span class="capslock">大小写锁定已打开</span>
                        </div>
                        
                        <div class="item item-fore5">
                            <div class="login-btn">
                                <input class="btn-img btn-entry log_button" id="loginsubmit" type="submit" value="登&nbsp;&nbsp;&nbsp;&nbsp;录" />
                            </div>
                        </div>
                    </form:form>
                </div>
            </div>
        </div>
        <div class="other-login content hide">
            <img src="res/img/loading.gif" style="width: 346px;height: 330px;" alt="">
        </div>
    </div>
    <div class="log_text">
        <table>
            <tr>
                <td valign="bottom"><span id="attention">注意：不要在公共场合保存登录信息；避免多人使用同一账号；为保证数据安全，退出系统时请注销登录。</span><a
                        id="myUrl" href="javascript:void()" style="color:blue;" onclick="getMyUrl()"
                        title="建议您存在桌面，方便下次访问。">添加应用</a>&nbsp;<span id="loadDownChrome" style="display: none;"
                                                                    title="建议您下载谷歌浏览器，获得更好的使用体验。"><a style="color:blue;"
                                                                                                     href="res/chrome/ChromeStandaloneSetup.1409816011.exe">下载谷歌浏览器</a></span>
                </td>
            </tr>
        </table>
    </div>
</div>
</body>
<%--<script src="${app}/res/js/login.js"></script>--%>
<script src="${app}/res/js/sm3.js"></script>
<script>

    document.getElementsByClassName('loginbody').height = window.screen.height;

    function hideCapsLock() {
        document.getElementsByClassName('capslock')[0].style.display = 'none'
    }

    function testCapsLock(e) {
        var capsLockKey = e.keyCode ? e.keyCode : e.which,
            shifKey = e.shiftKey ? e.shiftKey : ((capsLockKey == 16) ? true : false),
            flag;
        if (((capsLockKey >= 65 && capsLockKey <= 90) && !shifKey) || ((capsLockKey >= 97 && capsLockKey <= 122) && shifKey)) {
            flag = true;
        } else {
            flag = false;
        }
        document.getElementsByClassName('capslock')[0].style.display = flag ? 'block' : 'none';
    }

    /**Array.prototype.forEach.call(document.getElementsByClassName('login-tab'), function (item, index) {
        item.onclick = function () {
            for (var i = 0; i < document.getElementsByClassName('login-tab').length; i++) {
                document.getElementsByClassName('content')[i].style.display = 'none';
                document.getElementsByClassName('login-tab')[i].children[0].className = ''
            }
            document.getElementsByClassName('content')[index].style.display = 'block';
            document.getElementsByClassName('login-tab')[index].children[0].className = 'checked'
        }
    });
    Array.prototype.forEach.call(document.getElementsByClassName('itxt'), function (item, index) {
        item.onkeyup = function () {
            this.nextElementSibling.style.display = this.value ? 'block' : 'none';
        }
    });
    Array.prototype.forEach.call(document.getElementsByClassName('clear-btn'), function (item, index) {
        item.onclick = function () {
            this.previousElementSibling.value = '';
            this.style.display = 'none'
        }
    })**/
	
    
    Ext.require('Ext.ux.window.Notification');
    Ext.onReady(function(){
    	Ext.get("userId").dom.focus();
    	if(Ext.get("userIdError")){
        	 Ext.create('Ext.tip.ToolTip', {target: 'userId', html: Ext.get("userIdError").dom.innerHTML,bodyCls:'error'});
        	 Ext.create('widget.uxNotification', {
    				html : Ext.get("userIdError").dom.innerHTML,
    				iconCls: 'ux-notification-icon-error',
    				autoCloseDelay: 5000,
    				position: 'br'
    			 	,ui:'default'
    			}).show();
         }
         if(Ext.get("passwordError")){
        	 Ext.create('Ext.tip.ToolTip', {target: 'password', html: Ext.get("passwordError").dom.innerHTML,bodyCls:'error'});
        	 Ext.create('widget.uxNotification', {
    				html : Ext.get("passwordError").dom.innerHTML,
    				iconCls: 'ux-notification-icon-error',
    				autoCloseDelay: 3000,
    				position: 'br'
                	,ui:'default'
    			}).show();
         }
         Ext.QuickTips.init();
	    /**
	    	发送验证码
	    */
	    function sendVerifyCode(){
	    	var v = Ext.get("userId").dom.value
	    	if(Ext.isEmpty(Ext.get("userId").dom.value)){
	    		jesAlert('请输入邮箱或用户名');
	    		return;
	    	}
	    	 Ext.Ajax.request({
	 		    url: 'sendEmail.html?f=BSYS.LOGIN',
	 		    params: {email:Ext.get("userId").dom.value},
	 		    success: function(response){
	 		    	var result = Ext.decode(response.responseText);
	 		    	if(result.success){
			    		startTiming();
	 		    	}
	 		    	jesAlert(result.message);
	 		    },failure : function(){
	 		    	jesAlert('请求失败，请重试');
	 		    }
	    	 }); 
	    }
    	function startTiming(){
    		var timer = 60;
    		var task = {
			     run: function (runCount) {
			    	 timer --;
			    	 Ext.get("item-checking").dom.className='item item-checked';
			    	 Ext.get("sendVerifyAction").update('重新发送 ('+timer+')');
			    	 Ext.get("sendVerifyAction").removeListener('click');
			    	 if(timer <= 0){
			    		 Ext.get("sendVerifyAction").addListener('click',sendVerifyCode);
			    		 Ext.get("sendVerifyAction").dom.innerText = '重新发送密码';
			    		 Ext.get("item-checking").dom.className='item item-checking';
			    		 Ext.TaskManager.stop(task); 
			    	 }
			     	 
				 },
			     interval: 1000
			}
		    Ext.util.TaskManager.start(task);
    		
    	}
    	Ext.get("sendVerifyAction").addListener('click',sendVerifyCode);
    });
</script>
</html>