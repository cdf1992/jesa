var yzmdlsbh;

function mmloginsubmit(){
        var cert = $('#dlsh').val();
        var dlmm = $('#dlmm').val();
        var yzm = $('#yzm').val();
        var yzmKey = $('#yzmkey').val();

        var p1 = /[0-9]/;
        var p2 = /[a-zA-Z]/;

        if(cert==undefined||cert==null||cert.length==0){
            jAlert_mail("<div id='popup_message'>请先输入企业税号！</div>","提示");
        }else if(dlmm==undefined||dlmm==null||dlmm.length==0){
            jAlert_mail("<div id='popup_message'>请先输入登录密码！</div>","提示");
        }else if(dlmm.length<8){
            jAlert_mail("<div id='popup_message'>登录密码不少于8位，请输入正确的密码！</div>","提示");
        }else if(p1.test(dlmm)!=true||p2.test(dlmm)!=true||dlmm.length<8){
            jAlert_mail("<div id='popup_message'>登录密码不合法，请核实后重新输入！</div>","提示");
        }else if(yzm==undefined||yzm==null||yzm.length==0){
            jAlert_mail("<div id='popup_message'>请先输入验证码！</div>","提示");
        }else if(yzmKey==undefined||yzmKey==null||yzmKey.length==0){
            jAlert_mail("<div id='popup_message'>验证码已过期，请点击图片重新获取！</div>","提示");
        }else{
			dlmm=update(dlmm,yzmKey);
            var currdate = new Date().getTime();
            spinner.spin(target);
            $.ajax({
                type:"post",
                url:IP+"/securitylogin.do",
                data:{"cert":cert,"dlmm":dlmm,"yzm":yzm,"yzmKey":yzmKey,"currdate":currdate ,ymbb:ymbb},
                timeout:TIMEOUT,
                dataType: "jsonp",
                jsonp:"callback",
                success: function(backData) {
                    spinner.stop();
                    var rezt = backData.key1;
                    if(rezt=="00"){
                        jAlert("<div id='popup_message'>登录失败！"+backData.key2+" 正在重试......</div>","提示");
                        cb("00",backData.key2);
                    }else if(rezt=="02"){
                        var nsrsbh=backData.key2;
                        jAlert("<div id='popup_message'>纳税人档案（税号："+nsrsbh+"）信息不存在！<br/>请确认本企业是否属于取消认证政策的纳税人。<br/>如是，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                    }else if(rezt=="11"){
                        var nsrsbh=backData.key3;
                        var xnsrsbh=backData.key4;
                        jAlert_mail("<div id='popup_message'>系统检测到您当前使用的税号（"+nsrsbh+"）为您的旧税号，请核实并使用新税号（"+xnsrsbh+"）登录平台！<br/></div>","提示");
                    }else if(rezt=="12"){//添加档案更新日志
                        clearCookie("token");
                        setCookie("token",backData.key2,seconds);
                        var nsrsbh=backData.key3;
                        var xyjb=backData.key5;
                        if(xyjb==""||xyjb=="null"){
                            xyjb ="未设置"
                        }
                        jAlert("<div id='popup_message'>纳税人档案信息为（税号："+nsrsbh+"；信用等级："+xyjb+"）！<br/>请确认本企业是否属于取消认证政策的纳税人。<br/>如是，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                    }else if(rezt=="13"){
                        var nsrsbh=backData.key2;
                        jAlert("<div id='popup_message'>纳税人档案信息为（税号："+nsrsbh+"）为特定企业！<br/>特定企业不允许进行网上发票认证！<br/>如有疑问，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                    }else if(rezt=="03"||rezt=="08"){
                        var token=backData.key2;
                        var nsrmc=decodeURI(backData.key3,"UTF-8");
                        var dqrq=backData.key4;
                        var wdqbz=backData.key5;
                        setCookie("dqrq",dqrq,seconds);
                        setCookie("nsrmc",nsrmc,seconds);
                        setCookie("token",token,seconds);
                        setCookie("wdqbz",wdqbz,seconds);

                        window.location.href = "main.4a102dbd.html?_=" + ymbb;

                    }else if(rezt=="04"){
                        var token=backData.key2;
                        setCookie("token",token,seconds);
                        jAlert("<div id='popup_message'>平台密码不正确！</div>","提示");
                    }else if(rezt=="05"){
                        var token=backData.key2;
                        setCookie("token",token,seconds);
                        jAlert("<div id='popup_message'>平台密码错误次数超过十次，请联系税务机关解锁或明天再试！</div>","提示");
                    }else if(rezt=="06"){
                        var nsrsbh=backData.key2;
                        jAlert("<div id='popup_message'>纳税人档案（税号："+nsrsbh+"）当前状态为已注销，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                    }else if(rezt=="21"){//添加档案更新日志
                        clearCookie("token");
                        setCookie("token",backData.key2,seconds)
                        var xyjb=backData.key4;
                        if(xyjb==""||xyjb=="null"){
                            xyjb ="未设置"
                        }
                        jAlert("<div id='popup_message'>纳税人档案信息为(税号："+backData.key3+")档案信息存在，当前信用级别为："+xyjb+",本平台启用状态为：未启用,无权登录此系统，请联系主管税务机关开通权限！</div>","提示");
                    }else if(rezt=="22"){
                        jAlert_error("<div id='popup_message'>初始化期初数据出现数据库异常，请重新登录！</div>","提示");
                    }else if(rezt=="23"){
                        jAlert_error("<div id='popup_message'>初始化期初数据出现内存数据库异常，请重新登录！</div>","提示");
                    }else if(rezt=="400001"){
                        jAlert_error("<div id='popup_message'>您为转登记纳税人，未获取到您的转登记认定时间起，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                    }else if(rezt=="400002"){
                        jAlert_error("<div id='popup_message'>您为转登记纳税人，未获取到您的转登记认定时间止，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                    }else if(rezt=="400003"){
                        jAlert_error("<div id='popup_message'>未获取到您的原始纳税人性质，无法登录！</div>","提示");
                    }else if(rezt=="400000"){
                        jAlert_error("<div id='popup_message'>系统异常，错误代码为:"+rezt+"，请重新登录！</div>","提示");
                    }else if(rezt=="400004"){
                        jAlert_error("<div id='popup_message'>系统获取到您的纳税人资格代码为空，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                    }else if(rezt=="bn40000"){
                        jAlert_error("<div id='popup_message'>请确认您客户端时间是否准确，并根据实际时间进行调整(bn40000)！</div>","提示");
                    }else if(rezt=="bd40000"){
                        jAlert_error("<div id='popup_message'>请确认您客户端时间是否准确，并根据实际时间进行调整(bd40000)！</div>","提示");
                    }else if(rezt=="nd40000"){
                        jAlert_error("<div id='popup_message'>请确认您客户端时间是否准确，并根据实际时间进行调整(nd40000)！</div>","提示");
                    }else if(rezt=="98"){
                        jAlert_error("<div id='popup_message'>网络调用异常，请重新登录！</div>","提示");
                    }else if(rezt=="99"){
                        jAlert_error("<div id='popup_message'>网络调用超时，请重新登录！</div>","提示");
                    }else if(rezt=="101"){
                        jAlert_error("<div id='popup_message'>外网缓存连接失败,请重新登录！</div>","提示");
                    }else if(rezt=="nm40001"){
                        jAlert_error("<div id='popup_message'>登录手机号未设置，请联系主管税务机关进行设置！</div>","提示");
                    }else if(rezt=="nm40002"){
                        jAlert_error("<div id='popup_message'>输入登录手机与您设置的不一致，请输入正确的登录手机号！</div>","提示");
                    }else if(rezt=="nm40003"){
                        jAlert_error("<div id='popup_message'>登录密码未设置，请联系主管税务机关进行设置！</div>","提示");
                    }else if(rezt=="nm40004"){
                        var ismaxcwcs = backData.ismaxcwcs;
                        var maxCwcs = ismaxcwcs.split(";")[0];
                        var curCwcs = ismaxcwcs.split(";")[1];
                        if(maxCwcs==curCwcs){ //maxCwcs;curcwcs
                            jAlert_error("<div id='popup_message'>您连续输错"+maxCwcs+"次密码，账号被锁定，请60分钟后重新登录！</div>","提示");
                        }else if(maxCwcs>curCwcs){//密码错误，请重新输入！（您还有7次机会）
                            var remaincwcs = backData.remaincwcs;
                            jAlert_error("<div id='popup_message'>密码错误，请重新输入！（您还有"+remaincwcs+"次机会）</div>","提示");
                        }else{
                            var remaintime = backData.remaintime;
                            jAlert_error("<div id='popup_message'>您的账号已被锁定，请"+remaintime+"后重新登录！</div>","提示");
                        }
                    }else if(rezt=="nm40005"){
                        var remaintime = backData.remaintime;
                        jAlert_error("<div id='popup_message'>您的账号已被锁定，请"+remaintime+"后重新登录！</div>","提示");
                    }else{
                        handleResult(backData);
                    }
                },error:function(data){
                    spinner.stop();
                    handleAjaxException(data);
                }
            });
        }
    }
	
	function changeThemmeFun(themeName) {
	var $easyuiTheme = $('#easyuiTheme');
	var url = $easyuiTheme.attr('href');
	var href = url.substring(0, url.indexOf('themes')) + 'themes/' + themeName + '/easyui.css';
	$easyuiTheme.attr('href', href);

	var $iframe = $('iframe');
	if ($iframe.length > 0) {
		for ( var i = 0; i < $iframe.length; i++) {
			var ifr = $iframe[i];
			$(ifr).contents().find('#easyuiTheme').attr('href', href);
		}
	}

	$.cookie('easyuiThemeName', themeName, {
		expires : 7
	});
};

function mmtzIndex(flag){
	var zindexNumber = getCookie("ZINDEXNUMBER");
	if(zindexNumber == null){
		setCookie("ZINDEXNUMBER",1980);
		zindexNumber = 1980;
	}else{
		var n = flag?zindexNumber:parseInt(zindexNumber) + parseInt(10);
		setCookie("ZINDEXNUMBER",n);
	}
	return zindexNumber;
}

function loginsubmit(title, url,name, width, height) {
	gridname=name;
	if (typeof (width) == 'undefined'&&typeof (height) != 'undefined')
	{
		if(typeof(windowapi) == 'undefined'){
			$.dialog({
				content: 'url:'+url,
				zIndex: getzIndex(),
				title : title,
				cache:false,
				lock : true,
				width: 'auto',
			    height: height
			});
		}else{
			$.dialog({
				content: 'url:'+url,
				zIndex: getzIndex(),
				title : title,
				cache:false,
				parent:windowapi,
				lock : true,
				width: 'auto',
			    height: height
			});
		}
	}
	if (typeof (height) == 'undefined'&&typeof (width) != 'undefined')
	{
		if(typeof(windowapi) == 'undefined'){
			$.dialog({
				content: 'url:'+url,
				title : title,
				zIndex: getzIndex(),
				lock : true,
				width: width,
				cache:false,
			    height: 'auto'
			});
		}else{
			$.dialog({
				content: 'url:'+url,
				zIndex: getzIndex(),
				title : title,
				lock : true,
				parent:windowapi,
				width: width,
				cache:false,
			    height: 'auto'
			});
		}
	}
	var rezt = gridname;
	if(rezt=="00"){
                        jAlert("<div id='popup_message'>登录失败！"+backData.key2+" 正在重试......</div>","提示");
                        cb("00",backData.key2);
                    }else if(rezt=="02"){
                        var nsrsbh=backData.key2;
                        jAlert("<div id='popup_message'>纳税人档案（税号："+nsrsbh+"）信息不存在！<br/>请确认本企业是否属于取消认证政策的纳税人。<br/>如是，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                    }else if(rezt=="11"){
                        var nsrsbh=backData.key3;
                        var xnsrsbh=backData.key4;
                        jAlert_mail("<div id='popup_message'>系统检测到您当前使用的税号（"+nsrsbh+"）为您的旧税号，请核实并使用新税号（"+xnsrsbh+"）登录平台！<br/></div>","提示");
                    }else if(rezt=="12"){//添加档案更新日志
                        clearCookie("token");
                        setCookie("token",backData.key2,seconds);
                        var nsrsbh=backData.key3;
                        var xyjb=backData.key5;
                        if(xyjb==""||xyjb=="null"){
                            xyjb ="未设置"
                        }
                        jAlert("<div id='popup_message'>纳税人档案信息为（税号："+nsrsbh+"；信用等级："+xyjb+"）！<br/>请确认本企业是否属于取消认证政策的纳税人。<br/>如是，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                    }
	if (typeof (width) == 'undefined'&&typeof (height) == 'undefined')
	{
		if(typeof(windowapi) == 'undefined'){
			$.dialog({
				content: 'url:'+url,
				zIndex: getzIndex(),
				title : title,
				lock : true,
				width: 'auto',
				cache:false,
			    height: 'auto'
			});
		}else{
			$.dialog({
				content: 'url:'+url,
				zIndex: getzIndex(),
				title : title,
				lock : true,
				parent:windowapi,
				width: 'auto',
				cache:false,
			    height: 'auto'
			});
		}
	}
	
	if (typeof (width) != 'undefined'&&typeof (height) != 'undefined')
	{
		if(typeof(windowapi) == 'undefined'){
			$.dialog({
				width: width,
			    height:height,
				content: 'url:'+url,
				zIndex: getzIndex(),
				title : title,
				cache:false,
				lock : true
			});
		}else{
			$.dialog({
				width: width,
			    height:height,
				content: 'url:'+url,
				zIndex: getzIndex(),
				parent:windowapi,
				title : title,
				cache:false,
				lock : true
			});
		}
	}
}

function pwdCheck(str){  
    var rC = {  
        lW:'[a-z]',  
        uW:'[A-Z]',  
        nW:'[0-9]',  
        sW:'[\\u0020-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E]'  
    };  
    function Reg(str, rStr){  
        var reg = new RegExp(rStr);  
        if(reg.test(str)) return true;  
        else return false;  
    }  
    if(str.length < 8){
        return false;  
    }else{  
        var tR = {  
            l:Reg(str, rC.lW),
            u:Reg(str, rC.uW),
            n:Reg(str, rC.nW),
            s:Reg(str, rC.sW)
        };  
        if((tR.l && tR.u && tR.n) || (tR.l && tR.u && tR.s) || (tR.s && tR.u && tR.n) || (tR.s && tR.l && tR.n)){  
            return true;
        }else{
            return false;
        }  
    }  
}

function yzmloginsubmit(){
    var nsrsbh = $("#nsrsbh").val();
    var dlsjh = $("#dlsjh").val();
    var sjyzm = $("#sjyzm").val();
    yzmdlsbh = nsrsbh;

    if(nsrsbh==undefined||nsrsbh==null||nsrsbh.replace(/ /g,"").length==0){
        jAlert_mail("<div id='popup_message'>请先输入企业税号！</div>","提示");
    }else if(dlsjh==undefined||dlsjh==null||dlsjh.replace(/ /g,"").length==0){
        jAlert_mail("<div id='popup_message'>请先输入登录手机号！</div>","提示");
    }else if(sjyzm==undefined||sjyzm==null||sjyzm.replace(/ /g,"").length==0){
        jAlert_mail("<div id='popup_message'>请先输入手机验证码！</div>","提示");
    }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(dlsjh))){
        jAlert_mail("<div id='popup_message'>请输入正确的手机号码！</div>","提示");
    }else{
        var currdate = new Date().getTime();
        spinner.spin(target);
        $.ajax({
            type:"post",
            url:IP+"/yzmlogin.do",
            data:{"nsrsbh":nsrsbh,"dlsjh":dlsjh,"sjyzm":sjyzm,"currdate":currdate,ymbb:ymbb},
            timeout:TIMEOUT,
            dataType: "jsonp",
            jsonp:"callback",
            success: function(backData) {
                spinner.stop();
                var rezt = backData.key1;
                if(rezt=="00"){
                    jAlert("<div id='popup_message'>登录失败！"+backData.key2+" 正在重试......</div>","提示");
                    cb("00",backData.key2);
                }else if(rezt=="02"){
                    var nsrsbh=backData.key2;
                    jAlert("<div id='popup_message'>纳税人档案（税号："+nsrsbh+"）信息不存在！<br/>请确认本企业是否属于取消认证政策的纳税人。<br/>如是，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                }else if(rezt=="11"){
                    var nsrsbh=backData.key3;
                    var xnsrsbh=backData.key4;
                    jAlert_mail("<div id='popup_message'>系统检测到您当前使用的税号（"+nsrsbh+"）为您的旧税号，请核实并使用新税号（"+xnsrsbh+"）登录平台！<br/></div>","提示");
                }else if(rezt=="12"){//添加档案更新日志
                    clearCookie("token");
                    setCookie("token",backData.key2,seconds);
                    var nsrsbh=backData.key3;
                    var xyjb=backData.key5;
                    if(xyjb==""||xyjb=="null"){
                        xyjb ="未设置"
                    }
                    jAlert("<div id='popup_message'>纳税人档案信息为（税号："+nsrsbh+"；信用等级："+xyjb+"）！<br/>请确认本企业是否属于取消认证政策的纳税人。<br/>如是，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                }else if(rezt=="13"){
                    var nsrsbh=backData.key2;
                    jAlert("<div id='popup_message'>纳税人档案信息为（税号："+nsrsbh+"）为特定企业！<br/>特定企业不允许进行网上发票认证！<br/>如有疑问，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                }else if(rezt=="03"){
                    var token=backData.key2;
                    var nsrmc=decodeURI(backData.key3,"UTF-8");
                    var dqrq=backData.key4;
                    var wdqbz=backData.key5;
                    setCookie("dqrq",dqrq,seconds);
                    setCookie("nsrmc",nsrmc,seconds);
                    setCookie("token",token,seconds);
                    setCookie("wdqbz",wdqbz,seconds);

                    $('.theme-popover-mask5').fadeIn(100);
                    $('.theme-popover5').slideDown(200);

                }else if(rezt=="04"){
                    var token=backData.key2;
                    setCookie("token",token,seconds);
                    jAlert("<div id='popup_message'>平台密码不正确！</div>","提示");
                }else if(rezt=="05"){
                    var token=backData.key2;
                    setCookie("token",token,seconds);
                    jAlert("<div id='popup_message'>平台密码错误次数超过十次，请联系税务机关解锁或明天再试！</div>","提示");
                }else if(rezt=="06"){
                    var nsrsbh=backData.key2;
                    jAlert("<div id='popup_message'>纳税人档案（税号："+nsrsbh+"）当前状态为已注销，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                }else if(rezt=="21"){//添加档案更新日志
                    clearCookie("token");
                    setCookie("token",backData.key2,seconds)
                    var xyjb=backData.key4;
                    if(xyjb==""||xyjb=="null"){
                        xyjb ="未设置"
                    }
                    jAlert("<div id='popup_message'>纳税人档案信息为(税号："+backData.key3+")档案信息存在，当前信用级别为："+xyjb+",本平台启用状态为：未启用,无权登录此系统，请联系主管税务机关开通权限！</div>","提示");
                }else if(rezt=="22"){
                    jAlert_error("<div id='popup_message'>初始化期初数据出现数据库异常，请重新登录！</div>","提示");
                }else if(rezt=="23"){
                    jAlert_error("<div id='popup_message'>初始化期初数据出现内存数据库异常，请重新登录！</div>","提示");
                }else if(rezt=="400001"){
                    jAlert_error("<div id='popup_message'>您为转登记纳税人，未获取到您的转登记认定时间起，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                }else if(rezt=="400002"){
                    jAlert_error("<div id='popup_message'>您为转登记纳税人，未获取到您的转登记认定时间止，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                }else if(rezt=="400003"){
                    jAlert_error("<div id='popup_message'>未获取到您的原始纳税人性质，无法登录！</div>","提示");
                }else if(rezt=="400000"){
                    jAlert_error("<div id='popup_message'>系统异常，错误代码为:"+rezt+"，请重新登录！</div>","提示");
                }else if(rezt=="400004"){
                    jAlert_error("<div id='popup_message'>系统获取到您的纳税人资格代码为空，请联系主管税务机关在征管系统进行核实或维护相关档案信息！</div>","提示");
                }else if(rezt=="bn40000"){
                    jAlert_error("<div id='popup_message'>请确认您客户端时间是否准确，并根据实际时间进行调整(bn40000)！</div>","提示");
                }else if(rezt=="bd40000"){
                    jAlert_error("<div id='popup_message'>请确认您客户端时间是否准确，并根据实际时间进行调整(bd40000)！</div>","提示");
                }else if(rezt=="nd40000"){
                    jAlert_error("<div id='popup_message'>请确认您客户端时间是否准确，并根据实际时间进行调整(nd40000)！</div>","提示");
                }else if(rezt=="98"){
                    jAlert_error("<div id='popup_message'>网络调用异常，请重新登录！</div>","提示");
                }else if(rezt=="99"){
                    jAlert_error("<div id='popup_message'>网络调用超时，请重新登录！</div>","提示");
                }else if(rezt=="101"){
                    jAlert_error("<div id='popup_message'>外网缓存连接失败,请重新登录！</div>","提示");
                }else if(rezt=="nm40001"){
                    jAlert("<div id='popup_message'>登录手机号未设置，请联系主管税务机关进行设置！</div>","提示");
                }else if(rezt=="nm40002"){
                    jAlert("<div id='popup_message'>输入登录手机与您设置的不一致，请输入正确的登录手机号！</div>","提示");
                }else if(rezt=="nm40003"){
                    jAlert("<div id='popup_message'>登录密码未设置，请联系主管税务机关进行设置！</div>","提示");
                }else if(rezt=="nm40005"){
                    var remaintime = backData.remaintime;
                    jAlert_error("<div id='popup_message'>您的账号已被锁定，请"+remaintime+"后重新登录！</div>","提示");
                }else if(rezt=="nm40006"){
                    jAlert_error("<div id='popup_message'>验证码错误，请输入正确的验证码！</div>","提示");
                }else if(rezt=="nm40007"){
                    jAlert("<div id='popup_message'>您已设置了登录密码，请使用登录密码登录！</div>","提示");
                }else{
                    handleResult(backData);
                }
            },error:function(data){
                spinner.stop();
                handleAjaxException(data);
            }
        });
    }
}

function saveMM(){
    var mm1 = $("#mm1").val();
    var mm2 = $("#mm2").val();

    var p1 = /[0-9]/;
    var p2 = /[a-zA-Z]/;
    var b1 = p1.test(mm1);
    var b2 = p2.test(mm1);

    if(mm1==null||mm1==undefined||mm1.replace(/ /g,"")==""||mm2==null||mm2==undefined||mm2.replace(/ /g,"")==""){
        jAlert("<div id='popup_message'>请输入密码！</div>","提示");
        return;
    }else if(mm1 != mm2){
        jAlert("<div id='popup_message'>两次输入的密码不一致，请重新输入！</div>","提示");
        return;
    }else if(mm1.length<8){
        jAlert("<div id='popup_message'>密码需为至少8位包含数字和字母的组合！</div>","提示");
        return;
    }else if(b1!=true||b2!=true){
        jAlert("<div id='popup_message'>密码需为至少8位包含数字和字母的组合！</div>","提示");
        return;
    }

    var validate = mm1 + mm2;
    var sign = hex_md5(encodeURIComponent(validate));
    mm1 = Base64.encode(mm1);
    mm2 = Base64.encode(mm2);

    spinner.spin(target);
    $.ajax({
        type: "post",
        url: IP+"/xgdlmm.do",
        data:{"id":"savedlmm","cert":yzmdlsbh,"mm1":mm1,"mm2":mm2,"sign":sign,"token":getCookie("token"),"ymbb":ymbb},
        timeout:TIMEOUT,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(jsonData) {
            spinner.stop();
            var key1 = jsonData.key1;
            if (key1=="200") {
                var token=jsonData.key2;
                setCookie("token",token,seconds);

                jAlert("<div id='popup_message'>登录密码设置成功！</div>","提示",function(r) {
                    if(r){
                        $('.theme-popover-mask5').fadeOut(100);
                        $('.theme-popover5').slideUp(200);
                        window.location.href = "main.4a102dbd.html?_=" + ymbb;
                    }
                });
            }
            else if(key1=="202"){
                jAlert("<div id='popup_message'>两次输入的密码不一致，请重新输入！</div>","提示");
            }else if(key1=="203"){
                jAlert("<div id='popup_message'>密码需为至少8位包含数字和字母的组合！</div>","提示");
            }else if(key1=="204"){
                jAlert("<div id='popup_message'>密码需为至少8位包含数字和字母的组合！</div>","提示");
            }else{
                handleResult(jsonData);
            }
        },
        error:function(data){
            spinner.stop();
            handleAjaxException(data);
        }
    });
}

function closeym(){
    $('.theme-popover-mask5').fadeOut(100);
    $('.theme-popover5').slideUp(200);
    window.location.href = "main.4a102dbd.html?_=" + ymbb;
}