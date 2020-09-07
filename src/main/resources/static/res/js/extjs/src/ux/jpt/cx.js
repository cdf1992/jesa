/**
 * http://usejsdoc.org/
 *https://tool.lu/js 使用前请压缩
 */
if (typeof jQuery === 'undefined') {
	throw new Error('JavaScript requires jQuery');
}
(function() {
	/*
	 * var userPasswd; var devicePort; var serverPacket; var serverRandom; var
	 * clientAuthCode;
	 * 
	 * var seconds = 1200; // 纳税人识别号 var cert; // 页面版本 var ymbb = "3.0.11"; //
	 * 当前日期 var dqrq;
	 * 
	 * var IP = "https://fpdk.tax.sh.gov.cn/"; var TIMEOUT = 1e4; var PROVINCE =
	 * "未知地区"; var LONGTIMEOUT = 15e4; var PAGE_SIZE = 50;
	 */

	/*
	 * var document = window.document; var CryptCtrl =
	 * window.document.all.CryptCtrl.object;
	 */
	// var $ = window.jQuery;
	// showMsg("请输入税控盘/金税盘证书密码!","ERROR_001");
	// showMsg("当前浏览器加载安全控件：不成功","ERROR_002");
	// showMsg("openDevice失败 CryptCtrl.ErrMsg:" + CryptCtrl.ErrMsg,"ERROR_003");
	// showMsg("makeClientHello失败 CryptCtrl.ErrMsg:" +
	// CryptCtrl.ErrMsg,"ERROR_004");
	// showMsg("makeClientAuthCode失败 CryptCtrl.ErrMsg:" +
	// CryptCtrl.ErrMsg,"ERROR_005");
	// showMsg("服务器调用身份认证失败！正在重试......","ERROR_006");
	// showMsg("答案错误！","ERROR_007");
	// showMsg("secondLogin 会话已超时，请重新登陆！", "ERROR_008");
	// showMsg("secondLogin 系统异常，错误代码为:" + key1,"ERROR_009");
	// showMsg("secondLogin 数据库异常！","ERROR_010");
	// showMsg("secondLogin 登录失败！ 正在重试......","ERROR_011");
	// showMsg("secondLogin 会话已超时，请重新登陆！", "ERROR_012");
	// showMsg("secondLogin 系统异常，错误代码为" + key1,"ERROR_013");
	// showMsg("平台密码不正确！","ERROR_017");
	var errorCode;
	var dataList=[];
	var pswork="";
	// YMBB 页面版本
	// PROVINCE 地区
	// IP 主地址
	// LOGIN_URL 登录地址
	// QRGYCX_URL 概要查询地址
	// GXCX_URL 勾选查询地址
	// TIMEOUT 访问超时时间
	// SECONDS
	// COOKIES 有效时间
var PROVINCE="";
var cert="";
var count=1;
var clientAuthCode ="";
var ssqn;
var ssqy;
var dqnf;
var nftemp = "";
var tjsjstr="";
var isCanPost = true;
/*var spinner1 = new Spinner();
var spinner = new Spinner();*/
//ID:commitqrxx提交、callback切换所属期、htssq回退所属期(若存在勾选已确认的发票则无法切换归属期) 
	var options = {
		"YMBB" : "3.0.13",
		"PROVINCE" : "",
		"IP" : "",
		"LOGIN_URL" : "/NSbsqWW/login.do",
		"QRGYCX_URL" : "/NSbsqWW/qrgycx.do",
		"GXCX_URL" : "/NSbsqWW/gxcx.do",
		"GX_URL":"/NSbsqWW/dkgx.do",
		"BDKGX_URL":"/NSbsqWW/bdkgx.do",
		"LSCX_URL":"/NSbsqWW/dktj.do",
		"TIMEOUT" : 3e4,
		"LONGTIMEOUT":15e4,
		"SECONDS" : 3600,
		"PAGE_SIZE" : 100,
		"ID":""
	};
var doAction =function(){
};
	// // 发票号码：
	// var fphm = "";
	// // 发票代码：
	// var fpdm = "";
	// // 销方税号：
	// var xfsbh = "";
	// // 开票日期区间或请选择查询的确认/扫描日期区间！
	// var rq_q = gxfwBeginDate;
	// var rq_z = gxfwEndDate;
	// // 认证状态0未认证 1已认证
	// var rzzt = "0";
	// // 勾选状态 -1 全部 0未勾选 1以勾选
	// var gxzt = "-1";
	// // 发票类型 -1全部 01>增值税专用发票 02>货运专用发票 03>机动车发票14>通行费发票<
	// var fplx = "-1";
	// // 发票状态：-1>全部 0>正常2>作废4>异常1>失控3>红冲
	// var fpzt = "-1";
	// // 认证方式 -1>全部 0>勾选认证1>扫描认证
	// var rzfs = "";

	var searchParam = {
		"fpdm" : "",
		"fphm" : "",
		"rq_q" : "",
		"rq_z" : "",
		"xfsbh" : "",
		/*"rzfs" : "",*/
		"rzzt" : "0",
		"glzt" : "-1",
		"fpzt" : "-1",
		"fplx" : "-1"
	};
	var yqfpsqParam = {
		    "id":"",
			"fpdm" : "",
			"fphm" : "",
			"lrrq_q" : "",
			"lrrq_z" : "",
			"xfsbh" : ""
		};
	var swsxtzsParam = {
		    "lrrqq" : "",
			"lrrqz" : "",
			"tzshm" : ""
		};
	// // 发票号码：
	// var fphm = "";
	// // 发票代码：
	// var fpdm = "";
	//开票日期
	//var kprq="";
	//勾选状态
	//var zt=1 //未勾选
	//页面版本
	//var YMBB=options.YMBB


	var subParam = {
		"fpdm" : "",
		"fphm" : "",
		"kprq" : "",
		"zt"   : "1",
		"yxse" :"",
		"se":"",
		"ymbb" : options.YMBB,
		"tjyf":"",
		"znxbh":"",
		"flag":"",
	};
	// 查询回调
	var searchCallBack = function(searchParam, jsonData) {
		console.log("回调");
	};

	/**
	 * 控制台显示消息
	 * 
	 * @param msg
	 * @returns
	 */
	var showMsg = function(msg, error_code) {
		console.log(error_code + "-----" + msg);
	};

	// 首页初始化
	/**
	 * --start
	 * commons-------------------------------------------------------------------
	 */

	function getIP(city) {


		var e = new Array(
				"https://fpdk.beijing.chinatax.gov.cn/",
				"https://fpdk.tianjin.chinatax.gov.cn",
				"https://fpdk.hebei.chinatax.gov.cn",
				"https://fpdk.shanxi.chinatax.gov.cn",
				"https://fpdk.neimenggu.chinatax.gov.cn/", 
				"https://fpdk.liaoning.chinatax.gov.cn",
				"https://fpdk.dlntax.gov.cn/",
				"https://fpdk.jilin.chinatax.gov.cn:4431/",
				"https://fpdk.hl-n-tax.gov.cn/", 
				"https://fpdk.shanghai.chinatax.gov.cn/",
				"https://fpdk.jiangsu.chinatax.gov.cn:81", 
				"https://fpdk.zhejiang.chinatax.gov.cn/",
				"https://fpdk.ningbo.chinatax.gov.cn/",
				"https://fpdk.anhui.chinatax.gov.cn",
				"https://fpdk.fujian.chinatax.gov.cn",
				"https://fpdk.xiamen.chinatax.gov.cn", 
				"https://fpdk.jiangxi.chinatax.gov.cn",
				"https://fpdk.shandong.chinatax.gov.cn/",
				"https://fpdk.qingdao.chinatax.gov.cn",
				"https://fpdk.henan.chinatax.gov.cn/",
				"https://fpdk.hb-n-tax.gov.cn/", 
				"https://fpdk.hunan.chinatax.gov.cn/",
				"https://fpdk.gd-n-tax.gov.cn/", 
				"https://fpdk.shenzhen.chinatax.gov.cn",
				"https://fpdk.guangxi.chinatax.gov.cn", 
				"https://fpdk.hitax.gov.cn/",
				"https://fpdk.chongqing.chinatax.gov.cn", 
				"https://fpdk.sichuan.chinatax.gov.cn",
				"https://fpdk.gz-n-tax.gov.cn/", 
				"https://fpdk.yunnan.chinatax.gov.cn/",
				"https://fpdk.xztax.gov.cn/",
				"https://fpdk.shaanxi.chinatax.gov.cn",
				"https://fpdk.gansu.chinatax.gov.cn",
				"https://fpdk.qinghai.chinatax.gov.cn", 
				"https://fpdk.ningxia.chinatax.gov.cn",
				"https://fpdk.xj-n-tax.gov.cn/", 
				"http://172.30.11.88:90/");
		var t = new Array("北京", "天津", "河北", "山西", "内蒙古", "辽宁", "大连", "吉林",
				"黑龙江", "上海", "江苏", "浙江", "宁波", "安徽", "福建", "厦门", "江西", "山东",
				"青岛", "河南", "湖北", "湖南", "广东", "深圳", "广西", "海南", "重庆", "四川",
				"贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "首都");


		for (var i = 0; i < t.length; i++) {
			if (t[i] === city) {
				return e[i];
			}
		}
		return "";
	}

	/**
	 * common.js
	 * 
	 * @param e
	 * @returns
	 */
	function changeDateYYYYMM(e) {
		if (null === e || void 0 === e) {
			return "";
		}
		var t = e.substring(0, 4), n = parseInt(e.substring(4), 10);
		return t + "年" + n + "月";
	}
	function changeDateYYYYMMDD(e) {
		if (null === e || void 0 === e) {
			return "";
		}
		var t = e.substring(0, 4), n = parseInt(e.substring(4, 6), 10), i = parseInt(
				e.substring(6), 10);
		return t + "年" + n + "月" + i + "日";
	}

	function getTyslInfo(e) {
		var t = /<TITLE>([\s\S]*?)<\/TITLE>/, n = e.match(t), i = n[0].replace(
				"<TITLE>", "").replace("</TITLE>", ""), o = /<H3>([\s\S]*?)<\/H3>/, r = e
				.match(o), a = r[0].replace("<H3>", "").replace("</H3>", "")
				.replace("<i>", "").replace("</i>", ""), s = /<H4>([\s\S]*?)<\/H4>/, p = e
				.match(s), d = p[0].replace("<H4>", "").replace("</H4>", ""), c = /<P>([\s\S]*?)<\/P>/, g = e
				.match(c), u = g[0].replace('<P><FONT FACE="Courier New">', "")
				.replace("</FONT></P>", "");
		return i + "\n" + a + "\n" + d + "\n" + u;
	}

	function getDqrq() {
		var e = new Date(), t = e.getFullYear(), n = e.getMonth() + 1, i = e
				.getDate();
		return n < 10 && (n = "0" + n), i < 10 && (i = "0" + i), t + "-" + n
				+ "-" + i;
	}

	function dateYYYYandMMandDD(e) {
		if (null === e || void 0 === e){
			return "";
		}
			
		var t = e.substring(0, 4), n = e.substring(4, 6), i = e.substring(6);
		return t + "-" + n + "-" + i;
	}

	/**
	 * --end
	 * commons-------------------------------------------------------------------
	 */

	/**
	 * --start
	 * cryp-------------------------------------------------------------------
	 */
	/**
	 * 初始化控件及密码
	 * 
	 * @param r
	 * @returns
	 */
	function setDeviceParam(passwd) {
		if (CryptCtrl.IsDeviceOpened() !== 0) {
			CryptCtrl.CloseDevice();
		}
		CryptCtrl.strContainer = "";
		// userPasswd = passwd;
	}

	function openDevice(userPin) {
		var err = 0;
		setDeviceParam(userPin);
		if (CryptCtrl.IsDeviceOpened() !== 0) {
			CryptCtrl.CloseDevice();
		}
		CryptCtrl.OpenDeviceEx(userPin);
		if (CryptCtrl.ErrCode === 0x57) {
			CryptCtrl.OpenDeviceEx(userPin);
		}
		if (CryptCtrl.ErrCode !== 0 && CryptCtrl.ErrCode !== -1) {
			showMsg("openDevice失败  CryptCtrl.ErrMsg:" + CryptCtrl.ErrMsg,
					"ERROR_003");
			return CryptCtrl.ErrCode;
		}
		// devicePort = CryptCtrl.strContainer;
		return CryptCtrl.ErrCode;
	}

	/*function getThisCert() {
		var rtn = openDevice();
		var ret = CryptCtrl.GetCertInfo("", 71);
		var error = CryptCtrl.errCode;
		var nsrsbh = "";
		if (error === 0) {
			nsrsbh = CryptCtrl.strResult;
		}
		CryptCtrl.CloseDevice();
		return nsrsbh;
	}*/
	
	 function getThisCert(){
	        var nsrsbh = "";
	        if(cryptType == 0){
	            var obj=readCertInfoApi(71,false,alg);
	            if(obj.code == 0){
	                nsrsbh=obj.certInfo;
	            }else{
	               // $('.theme-popbod').append('<span style="color:red;">'+count+'、'+obj.msg+'  (错误代码：'+obj.code+')'+'</span><br/>');
	                showMsg(count+'、'+obj.msg+'(错误代码：'+obj.code+')');
	                count++;
	            }
	        }else{
	            var rtn = openThisDevice();
	            var ret = CryptCtrl.GetCertInfo("",71);
	            var error = CryptCtrl.errCode;

	            if(error == 0){
	                nsrsbh = CryptCtrl.strResult;
	            }
	            CryptCtrl.CloseDevice();
	        }
	        return nsrsbh;
	    }

	function MakeClientHello() {
		var vbNullString = "";
		var dwFlag = 0;
		CryptCtrl.ClientHello(dwFlag);
		if (CryptCtrl.ErrCode !== 0) {
			showMsg("makeClientHello失败  CryptCtrl.ErrMsg:" + CryptCtrl.ErrMsg,
					"ERROR_004");
			return CryptCtrl.ErrCode;
		}
		return CryptCtrl.ErrCode;
	}

	function MakeClientAuthCode(serverPacket) {
		var err = 0;
		err = openDevice();
		if (err !== 0) {
			return err;
		}

		CryptCtrl.ClientAuth(serverPacket);
		if (CryptCtrl.ErrCode !== 0) {
			showMsg(
					"makeClientAuthCode失败 CryptCtrl.ErrMsg:" + CryptCtrl.ErrMsg,
					"ERROR_005");
			return;
		}
	    clientAuthCode = CryptCtrl.strResult;
		CryptCtrl.CloseDevice();
		return clientAuthCode;
	}
	function velidateNsrsbh(cert) {
		var strRegx = /^[0-9a-zA-Z]+$/;
		if (cert === "") {
			showMsg("读取证书信息失败，未获取到合法的纳税人信息,请重新提交请求或检查金税盘/税控盘是否插入！");
			return false;
		} else if (!strRegx.test(cert)) {
			showMsg("读取到的纳税人信息（纳税人识别号：(" + cert + "）不合法！请重试！");
			return false;
		} else {
			showMsg("读取到的纳税人识别号：" + cert);
		}
		return true;
	}

	function loginSuccess() {
		showMsg("登录成功");
		doGxcx();
	}
	function goAction(){};
	function gotoConfig() {

	}
	function login(certPass, ptPassword) {
		var date = new Date();
		console.log("login:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
		if (!validateLogin(certPass)) {
			return;
		}
		var clientHello=""
		    if(cryptType == 0){
		      var obj=clientHelloApi(false,alg);
		      if(obj.code == 0){
		        clientHello=obj.clientHello;
		      }else{
		    	 // showMsg(count+'、'+obj.msg+'(错误代码：'+obj.code+')');
		    	  Ext.Msg.alert('提示',count+'、'+obj.msg+'(错误代码：'+obj.code+')');
		        //$('.theme-popbod').append('<span style="color:red;">'+count+'、'+obj.msg+'  (错误代码：'+obj.code+')'+'</span><br/>');
		        count++;
		        return;
		      }
		    }else{
		      var rtn=openThisDevice(certPass);
		      if ( rtn!=0) {
		        return false;
		      }
		      rtn=MakeClientHello();
		      if (rtn!=0) {
		        return;
		      }
		      clientHello=CryptCtrl.strResult;
		    }

	    var param1={"type":"CLIENT-HELLO","clientHello":clientHello,"alg":alg,"ymbb":options.YMBB};
	    showMsg(count+"开始调用外网服务，正在进入......");
	    count++;
		
		firstLogin(param1, ptPassword,certPass, function(data, info) {
			firstLogin(param1, ptPassword,certPass, function(data, info) {
				firstLogin(param1, ptPassword,certPass,
						function(data, info) {
							if (data === "00") {
								showMsg("--- pp服务器调用身份认证失败！" + info + PROVINCE
										+ "(纳税人识别号：" + cert + ")登录失败"
										+ "服务器调用身份认证失败！");
							} else if (data.responseText === ""
									|| data.responseText === undefined) {
								showMsg("网络异常！" + PROVINCE + "(纳税人识别号：" + cert
										+ ")登录失败");
							} else {
								showMsg("系统异常！统一受理系统报文为:" + data.responseText
										+ PROVINCE + "(纳税人识别号：" + cert
										+ ")登录失败", "统一受理异常，报文为："
										+ getTyslInfo(data.responseText));
							}
							showMsg("firstLogin三次执行完成");
						});
			});
		});

	}
	
	function firstLogin(param1, ptPassword,certPass,cb) {
		var date = new Date();
		console.log("firstLogin23:"+ptPassword+";"+date.toLocaleTimeString());
		$.ajax({
					type : "post",
					url : options.IP + options.LOGIN_URL,
					data : param1,
					timeout : options.TIMEOUT,
					dataType : "jsonp",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					crossDomain:false,
					jsonp : "callback",
					success : function(jsonData) {
						showMsg("首次访问外网服务:正常");
						count++;
						var key1 = jsonData.key1;
						console.log("firstLogin:result:"+key1);
						if (key1 === "00") {
							if(jsonData.key2=='生成ServerHello--密码算法ID错误'){
								showMsg(count+"、检测到您未安装税务安全证书应用客户端，请下载并安装!");
					           // $('.theme-popbod').append('<span style="color:red;">'+count+'、'+'检测到您未安装税务安全证书应用客户端，请下载并安装!'+'</span><br/>');
					            count++;
					            return;
					          }else{
					            //jAlert("<div id='popup_message'>服务器调用身份认证失败！"+jsonData.key2+" 正在重试......</div>","提示");
					            showMsg("提示:服务器调用身份认证失败！"+jsonData.key2+" 正在重试......");
					            cb("00",jsonData.key2);
					          }
							
							showMsg("服务器调用身份认证失败！正在重试......", "ERROR_006");
							cb("00", jsonData.key2);
						} else if (key1 === "01") {
							var serverPacket = jsonData.key2;
							var serverRandom = jsonData.key3;
							 if(cryptType == 0){
						            var obj=clientAuthApi(serverPacket,certPass,false,alg);
						            if(obj.code == 0){
						              clientAuthCode=obj.clientAuth;
						            }else{
						            	showMsg(count+'、'+obj.msg+' (错误代码：'+obj.code+')');
						              //$('.theme-popbod').append('<span style="color:red;">'+count+'、'+obj.msg+'  (错误代码：'+obj.code+')'+'</span><br/>');
						              count++;
						              return;
						            }
						          }else{
						            rtn = MakeClientAuthCode();
						      }
							//var clientAuthCode = makeClientAuthCode(serverPacket);
							showMsg("第二次访问外网服务：请稍候......");
							count++;
							var cert = getThisCert();
							if (!velidateNsrsbh(cert)) {
								return;
							}
         $.ajax({
            url:options.IP+ "/NSbsqWW/querymm.do",
            type: 'post',
            data: {
             	"cert":cert,
            	"funType":"01"
            },
            crossDomain: false,
            dataType:"jsonp",
				    timeout:options.TIMEOUT,
				    contentType:"application/x-www-form-urlencoded;charset=utf-8",
				    jsonp:"callback",
            success: function (data) {
            		var page = data['page'];
              	/*var ts = data['ts'];
              	var publickey='';
              	if(page !=''){
              		publickey = $.checkTaxno(cert, ts,'', page, serverRandom);
              	}*/
            console.log("firstLogin:result2:"+param1.mmtype);
						var param2 = {};
						var currdate = new Date().getTime();
				        if(param1.mmtype=="1"){
				          param2={
				            "type":"CLIENT-AUTH",
				            "clientAuthCode":clientAuthCode,
				            "serverRandom":serverRandom,
				            "alg":alg,
				            "password":ptPassword,
				            "cert":cert,
				            "ymbb":options.YMBB,
				            /*"ts":ts,
				            "publickey":publickey,*/
				            "mmtype":"1",
				             currdate:currdate
				          };
				        }else if(param1.mmtype=="2") {
				          param2 = {
				            "type": "CLIENT-AUTH",
				            "clientAuthCode": clientAuthCode,
				            "serverRandom": serverRandom,
				            "alg":alg,
				            "password": ptPassword,
				            "cert": cert,
				            "ymbb": options.YMBB,
				            /*"ts":ts,
				            "publickey":publickey,*/
				            "mmtype": "2",
				            "answer": param1.answer,
				            currdate:currdate
				          };
				        }else{
				          param2={
				            "type":"CLIENT-AUTH",
				            "clientAuthCode":clientAuthCode,
				            "serverRandom":serverRandom,
				            "alg":alg,
				            "password":ptPassword,
				            /*"ts":ts,
				            "publickey":publickey,*/
				            "cert":cert,
				            "ymbb":options.YMBB,
				            currdate:currdate
				          };
				        }

							secondLogin(
									param2,
									function(data, info) {
										secondLogin(
												param2,
												function(data, info) {
													secondLogin(
															param2,
															function(data, info) {
																if (data === "00") {
																	showMsg("登录失败！"
																			+ PROVINCE
																			+ "(纳税人识别号："
																			+ cert
																			+ ")登录失败");
																} else if (data.responseText === ""
																		|| data.responseText === undefined) {
																	showMsg("网络异常！"
																			+ PROVINCE
																			+ "(纳税人识别号："
																			+ cert
																			+ ")登录失败");
																} else {
																	showMsg("网络异常:"
																			+ data.responseText
																			+ PROVINCE
																			+ "(纳税人识别号："
																			+ cert
																			+ ")登录失败");
																}
																showMsg("secondLogin第三次执行完成");
															});
												});
									});
								}
									}); 
						}else if(key1=="666"){
							showMsg("客户端请求参数不完整，请稍后重试！" + key1);
						}else if(key1=="777"){
							showMsg("客户端请求异常，请稍后重试！" + key1);
						}else if(key1=="888"){
							showMsg("您操作过于频繁，请稍后再试！" + key1);
						} else {
							showMsg("系统异常，错误代码为:" + key1);
						}

					},
					error : function(data) {
						console.log("firstLogin:error:");
						if (data.responseText === ""
								|| data.responseText === undefined) {
							showMsg("网络异常，正在重试......");
						} else {
							showMsg("系统异常，正在重试......，统一受理系统报文为:"
									+ data.responseText);
						}
						cb(data);
					}
				});
	}

	
	function secondLogin(param2, cb) {
		var date = new Date();
		/*console.log("secondLogin:"+cb);*/
				$.ajax({
					type : "post",
					url : options.IP + options.LOGIN_URL,
					data : param2,
					dataType : "jsonp",
					timeout : options.TIMEOUT,
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					crossDomain:false,
					jsonp : "callback",
					success : function(backData) {
						console.log("secondLogin:result:"+param2.mmtype+";"+key1+";"+date.toLocaleTimeString());
						var rezt = backData.key1;
						var key1 = backData.key1;
						console.log("secondLogin:rezt"+rezt);
						console.log("secondLogin:key1"+key1);
						if (param2.mmtype === "2") {
							if (key1 === "00") {
								showMsg("答案错误！", "ERROR_007");
								return;
							} else if (key1 === "01") {
								var token = backData.key2;
								clearCookie("token");
								setCookie("token", token, options.SECONDS);
								showMsg("平台密码已成功取消，如需要，请登录平台后重新设置平台密码！");
							} else if (key1 === '09') {
								showMsg("secondLogin 会话已超时，请重新登陆！", "ERROR_008");
							} else if (key1 === '666') {
								showMsg("secondLogin 客户端请求参数不完整，请稍后重试！", "ERROR_008");
							}else if (key1 === '777') {
								showMsg("secondLogin 客户端请求异常，请稍后重试！", "ERROR_008");
							}else if (key1 === '888') {
								showMsg("secondLogin 您操作过于频繁，请稍后再试！", "ERROR_008");
							}else {
								showMsg("secondLogin 系统异常，错误代码为:" + key1,
										"ERROR_009");
							}
						}
						if (rezt === "00") {
							showMsg("secondLogin 登录失败！ 正在重试......", "ERROR_011");
							cb("00", backData.key2);
						} else if (rezt === "01") {
							if (param2.mmtype === "1") {
								if (key1 === "00") {
									showMsg("secondLogin 数据库异常！", "ERROR_010");
									return;
								} else if (key1 === "01") {
									var token=backData.key3;
									clearCookie("token");
									/*setCookie("token", backData.key3,
											options.SECONDS);*/
									 setCookie("token",token,seconds);
									// $('#question').val(
									// decodeURI(backData.key2, "UTF-8"));

								} else if (key1 === '09') {
									showMsg("secondLogin 会话已超时，请重新登陆！",
											"ERROR_012");
								} else {
									showMsg("secondLogin 系统异常，错误代码为" + key1,
											"ERROR_013");
								}
							} else {//登录成功
								var nsrmc = decodeURI(backData.key3, "UTF-8");
								var dqrq = backData.key4;
								if (dqrq === "") {
									dqrq = getDqrq();
								}
								setCookie("dqrq", dqrq, options.SECONDS);
								setCookie("nsrmc", nsrmc, options.SECONDS);
								clearCookie("token");
								setCookie("token", backData.key2,
										options.SECONDS);
								// window.location.href =
								// "config.bd0e3c5f.html";
								/*gotoConfig();*/
							}
						} else if (rezt === "02") {
							var nsrsbh = backData.key2;
							var ERROR_014 = "纳税人档案（税号：";
							ERROR_014 += nsrsbh;
							ERROR_014 += "）信息不存在！<br/>请确认本企业是否属于取消认证政策的纳税人。如是，则请联系主管税务机关进行核实和补录相关档案信息！";
							showMsg(ERROR_014, "ERROR_014");
						} else if (rezt === "12") {// 添加档案更新日志
							clearCookie("token");
							setCookie("token", backData.key2, options.SECONDS);
							var nsrsbh = backData.key3;
							var xyjb = backData.key5;
							if (xyjb === "" || xyjb === "null") {
								xyjb = "未设置";
							}
							var ERROR_015 = "纳税人档案信息为（税号：";
							ERROR_015 += nsrsbh;
							ERROR_015 += "；信用等级：";
							ERROR_015 += xyjb;
							ERROR_015 += "）！请确认本企业是否属于取消认证政策的纳税人。如是，则请联系主管税务机关进行核实和修改相关档案信息！";
							showMsg(ERROR_015, "ERROR_015");
						} else if (rezt === "13") {
							var nsrsbh = backData.key2;

							var ERROR_016 = "纳税人档案信息为（税号：";
							ERROR_016 += nsrsbh;
							ERROR_016 += "）为特定企业！特定企业不允许进行网上发票认证！如有疑问，请联系主管税务机关进行核实和修改相关档案信息！";
							showMsg(ERROR_016, "ERROR_016");
						} else if (rezt === "03") {
							var token = backData.key2;
							var nsrmc = decodeURI(backData.key3, "UTF-8");
							var dqrq = backData.key4;
							var wdqbz=backData.key5;
							setCookie("dqrq", dqrq, options.SECONDS);
							setCookie("nsrmc", nsrmc, options.SECONDS);
							setCookie("token", token, options.SECONDS);
							setCookie("wdqbz",wdqbz,seconds);
							/*var tokens = token.split(MENUSPLIT);*/
							/*if(tokens!=undefined&&tokens!=null&&tokens.length==11){
					          if(tokens[5]=='1' && tokens[8]=='2'){//小规模企业
					            if(tokens[2]=='1'){//经销企业
					              window.location.href="fpgjsjxz.4b6347d3.html";
					            }else if(tokens[2]=='2'){//生产企业
					              window.location.href="xfsgzt.44004644.html";
					            }else{
					              window.location.href="index.html";
					            }
					          }else{//一般人
					            window.location.href="main.0d36c6f2.html";
					          }
					        }else{
					          window.location.href="main.0d36c6f2.html";
					        }*/
							
							
							// window.location.href = "main.c875b556.html";
							//doGxcx("", "");
							doAction("","");
						} else if (rezt === "04") {
							var token = backData.key2;
							setCookie("token", token, options.SECONDS);
							showMsg("secondLogin 平台密码不正确！", "ERROR_017");
						} else if (rezt === "05") {
							var token = backData.key2;
							setCookie("token", token, options.SECONDS);
							showMsg("secondLogin 平台密码错误次数超过十次，请联系税务机关解锁或明天再试！",
									"ERROR_018");
						}else if(rezt=="06"){
					          var nsrsbh=backData.key2;
					          showMsg("纳税人档案（税号："+nsrsbh+"）当前状态为已注销，请联系主管税务机关核实相关档案信息");
					    } else if (rezt === "08") {
							// $('#ptmm').show();
							// $('#ptmmTs').show();
							showMsg("rezt === \"08\",未执行操作", "ERROR_019");
						} else if (rezt === "21") {// 添加档案更新日志
							clearCookie("token");
							setCookie("token", backData.key2, options.SECONDS);
							var xyjb = backData.key4;
							if (xyjb === "" || xyjb === "null") {
								xyjb = "未设置";
							}

							showMsg("纳税人档案信息为(税号：" + backData.key3
									+ ")档案信息存在，当前信用级别为：" + xyjb
									+ ",本平台启用状态为：未启用,无权登录此系统，请联系主管税务机关开通权限！",
									"ERROR_020");
						}else if(rezt=="22"){
							showMsg("初始化期初数据出现数据库异常，请重新登录！", "ERROR_021");
						        jAlert_error("<div id='popup_message'>初始化期初数据出现数据库异常，请重新登录！</div>","提示");
					    }else if(rezt=="23"){
					    	showMsg("初始化期初数据出现内存数据库异常，请重新登录！", "ERROR_021");
					    }else if(rezt=="400001"){
					    	showMsg("您为转登记纳税人，未获取到您的认定时间起，请联系您的服务单位！", "ERROR_021");
					    }else if(rezt=="400002"){
					    	showMsg("您为转登记纳税人，未获取到您的认定时间止，请联系您的服务单位！", "ERROR_021");
					    }else if(rezt=="400003"){
					    	showMsg("未获取到您的原始纳税人性质，无法登录！", "ERROR_021");
					    }else if(rezt=="400000"){
					    	showMsg("系统异常，错误代码为:"+rezt+"，请重新登录！", "ERROR_021");
						} else if (rezt === "98") {
							showMsg("网络调用异常，请重新登录！", "ERROR_021");
						} else if (rezt === "99") {
							showMsg("网络调用超时，请重新登录！", "ERROR_022");
						} else if (rezt === "101") {
							showMsg("数据库连接失败,请重新登录！", "ERROR_023");
						} else if (rezt === "666") {
							showMsg("客户端请求参数不完整，请稍后重试！", "ERROR_023");
						} else if (rezt === "777") {
							showMsg("客户端请求异常，请稍后重试！", "ERROR_023");
						} else if (rezt === "888") {
							showMsg("您操作过于频繁，请稍后再试！", "ERROR_023");
						} else {
							showMsg("系统异常，错误代码为:" + rezt, "ERROR_024");
						}
					},
					error : function(data) {
						console.log("secondLogin:error"+data.responseText);
						if (data.responseText === ""
								|| data.responseText === undefined) {
							showMsg("网络异常，正在重试......", "ERROR_025");
						} else {
							showMsg(">网络异常，正在重试......,统一受理系统报文为:"
									+ data.responseText, "ERROR_026");
						}
						cb(data);
					}
				});
	}

	

/*	function validateLogin(certPass) {

		// 检测安全控件是否加载成功
		if (document.all.CryptCtrl.object === null) {
			showMsg("当前浏览器加载安全控件：不成功", "ERROR_002");
			return false;
		} else {
			showMsg("当前浏览器加载安全控件：成功");
		}

		// 检测是否能够成功获取纳税人识别号
		var rtn = openDevice(certPass);
		if (rtn !== 0) {
			return false;
		}

		showMsg("客户端证书密码：正确");
		var cert = getThisCert();
		if (!velidateNsrsbh(cert)) {
			return false;
		}

		return true;
	}*/

	 function validateLogin(certPass){
		    /*$('.theme-popover-mask').fadeIn(100);
		    $('.theme-popover').slideDown(200);
		    $('.theme-popbod').empty();*/
		    count=1;
		    showMsg(count+"当前浏览器为："+getWebVersion()+"");
		    //$('.theme-popbod').append('<span>'+count+'、当前浏览器为：<strong style="color:green;">'+getWebVersion()+'</strong></span><br/>');
		    count++;
		    var vs=getVersionApi(true);
		    if(vs == null){
		      //检测安全控件是否加载成功
		      if(document.all.CryptCtrl.object == null){
		    	  /*showMsg(count+"、当前浏览器加载税务安全证书应用客户端：不成功");---*/
		    	  Ext.Msg.alert('提示', count+"、当前浏览器加载税务安全证书应用客户端：不成功");
		        //$('.theme-popbod').append('<span>'+count+'、当前浏览器加载税务安全证书应用客户端：</span><strong style="color:red;">不成功</strong><br/>');
		        count++;
		        return false;
		      }else{
		        cryptType = 1;
		        showMsg(count+"、当前浏览器加载安全控件：成功");
		        //$('.theme-popbod').append('<span>'+count+'、当前浏览器加载安全控件：</span><strong style="color:green;">成功</strong><br/>');
		        count++;
		      }
		      //检测是否能够成功获取纳税人识别号
		      var rtn=openThisDevice(certPass);
		      if ( rtn!=0) {
		        return false;
		      }
		      cert=getThisCert();
		      setCookie("alg",0,seconds);
		    }else{
		      cryptType = 0;
		      if(vs.version != apiversion){
		    	  /*showMsg(count+"、、检测到您安装的税务安全证书应用客户端不是最新版本，请下载安装最新版本!");*/
		    	  Ext.Msg.alert('提示', count+"、、检测到您安装的税务安全证书应用客户端不是最新版本，请下载安装最新版本!");
		        //$('.theme-popbod').append('<span>'+count+'、检测到您安装的税务安全证书应用客户端不是最新版本，请下载安装最新版本!</span><br/>');
		        count++;
		        return false;
		      }
		      var obj=verifyPinApi(certPass,false,1);
		      if(obj.code != 0 && obj.code != 60 ) {
		    	  
		    	  if(obj.msg.indexOf("验证口令失败") == -1){
	                    obj=verifyPinApi(certPass,false,0);
	                    if(obj.code == 0){
	                        alg = 0;
	                    }
	                }
		     /*   //if(obj.code == 167 || obj.code == 34) {
		        obj=verifyPinApi(certPass,false,0);
		        if(obj.code == 0){
		          alg = 0;
		        }*/
		      }else if(obj.code == 0){
		        alg = 1;
		      }
		      if(obj.code == 0){
		    	  showMsg(count+"、客户端证书密码：正确");
		       // $('.theme-popbod').append('<span>'+count+'、客户端证书密码：</span></span><strong style="color:green;">正确</strong><br/>');
		        count++;
		        obj=readCertInfoApi(71,false,alg);
		        if(obj!= null && obj.code == 0){
		          cert=obj.certInfo;
		        }
		      }else{
		    	  /*showMsg(count+'、'+obj.msg+' (错误代码：'+obj.code+')');*/
		    	  Ext.Msg.alert('提示', count+'、'+obj.msg+' (错误代码：'+obj.code+')');
		        //$('.theme-popbod').append('<span style="color:red;">'+count+'、'+obj.msg+'  (错误代码：'+obj.code+')'+'</span><br/>');
		        count++;
		        return false;
		      }
		      setCookie("alg",alg,seconds);
		    }

		    var strRegx=/^[0-9a-zA-Z]+$/;
		    if(cert==""){
		    	//showMsg(count+'、读取证书信息失败，未获取到合法的纳税人信息,请重新提交请求或检查金税盘/税控盘是否插入！');
		    	 Ext.Msg.alert('提示',count+'、读取证书信息失败，未获取到合法的纳税人信息,请重新提交请求或检查金税盘/税控盘是否插入！' );
		      //$('.theme-popbod').append('<span>'+count+'、读取证书信息失败，未获取到合法的纳税人信息,请重新提交请求或检查金税盘/税控盘是否插入！</span><br/>');
		      count++;
		      return false;
		    }else if(!strRegx.test(cert)){
		    	//showMsg(count+'、读取到的纳税人信息（纳税人识别号：'+cert+'）不合法！请重试！');
		    	Ext.Msg.alert('提示', count+'、读取到的纳税人信息（纳税人识别号：'+cert+'）不合法！请重试！');
		     // $('.theme-popbod').append('<span>'+count+'、读取到的纳税人信息（纳税人识别号：'+cert+'）不合法！请重试！</span><br/>');
		      count++;
		      return false;
		    }else{
		    	showMsg(count+'、读取到的纳税人识别号：'+cert);
		    	//Ext.Msg.alert('提示',count+'、读取到的纳税人识别号：'+cert);
		      //$('.theme-popbod').append('<span>'+count+'、读取到的纳税人识别号：<strong style="color:green;">'+cert+'</strong></span><br/>');
		      count++;
		    }
		    return true;
		  }
	
	  function openThisDevice(userPin){
		    var err = 0;
		    setDeviceParam(userPin);
		    if(CryptCtrl.IsDeviceOpened()!= 0)
		    {
		      CryptCtrl.CloseDevice();
		    }
		    CryptCtrl.OpenDeviceEx(userPasswd) ;
		    if(CryptCtrl.ErrCode == 0x57)
		    {
		      CryptCtrl.OpenDeviceEx(userPasswd);
		    }
		    if(CryptCtrl.ErrCode != 0 && CryptCtrl.ErrCode != -1)
		    {
		     // $('.theme-popbod').append('<span style="color:red;">'+count+'、'+CryptCtrl.ErrMsg+'</span><br/>');
		    	showMsg(count+'、'+CryptCtrl.ErrMsg);
		    	count++;
		      return CryptCtrl.ErrCode;
		    }
		    devicePort = CryptCtrl.strContainer;
		    return CryptCtrl.ErrCode;
		  }	
	/**
	 * 校验密码是否为空
	 * 
	 * @param passWord
	 * @returns
	 */
	function validateCertPass(passWord) {
		var password = passWord;
		if (password === "") {
			//showMsg("请输入税控盘/金税盘证书密码!", "ERROR_001");
			Ext.Msg.alert('提示','请输入税控盘/金税盘证书密码!');
			return false;
		}
		return true;
	}


	/*
	 * function doLogin() {
	 * 
	 * var certPass = "11111111"; var ptPassword = ""; }
	 */

	function getAoData() {
		var aoData = [ {
			"name" : "sEcho",
			"value" : 1
		}, {
			"name" : "iColumns",
			"value" : 15
		}, {
			"name" : "sColumns",
			"value" : ",,,,,,,,,,,,,"
		}, {
			"name" : "iDisplayStart",
			"value" : 0
		}, {
			"name" : "iDisplayLength",
			"value" : 50
		}, {
			"name" : "mDataProp_0",
			"value" : 0
		}, {
			"name" : "mDataProp_1",
			"value" : 1
		}, {
			"name" : "mDataProp_2",
			"value" : 2
		}, {
			"name" : "mDataProp_3",
			"value" : 3
		}, {
			"name" : "mDataProp_4",
			"value" : 4
		}, {
			"name" : "mDataProp_5",
			"value" : 5
		}, {
			"name" : "mDataProp_6",
			"value" : 6
		}, {
			"name" : "mDataProp_7",
			"value" : 7
		}, {
			"name" : "mDataProp_8",
			"value" : 8
		}, {
			"name" : "mDataProp_9",
			"value" : 9
		}, {
			"name" : "mDataProp_10",
			"value" : 10
		}, {
			"name" : "mDataProp_11",
			"value" : 11
		}, {
			"name" : "mDataProp_12",
			"value" : 12
		}, {
			"name" : "mDataProp_13",
			"value" : 13
		},{
			"name" : "mDataProp_14",
			"value" : 14
		} ];

		return aoData;
	}

	function doSearchAll(param, reqAoData) {
		param.aoData = json.stringify(reqAoData);
		$.ajax({
			url : options.IP + options.GXCX_URL,
			data : param,
			type : 'post',
			dataType : 'jsonp',
			timeout : options.TIMEOUT,
			success : function(jsonData) {
				var key1 = jsonData.key1;
				var key2 = jsonData.key2;
				var key4 = jsonData.key4;
				var key5 = jsonData.key5;
				if (key1 === "00") {
					showMsg("查询失败，请稍后再试！");
				} else if (key1 === "01") {
					token = jsonData.key3;
					clearCookie("token");
					setCookie("token", token, options.SECONDS);
					if (key4 === 0) {
						if(dataList.length==0){
	                		  dataList[0]="null";
	                	  }
						showMsg("没有符合条件的记录！");
					}else{
						dataList=dataList.concat(key2.aaData);
					}
					var iTotalRecords = key2.iTotalRecords;
					
					//dataList=dataList.concat(key2.aaData);
					 if(key2.iTotalRecords-(reqAoData[4].value+reqAoData[3].value)>0&&reqAoData[3].value-key2.iTotalRecords<reqAoData[4].value){  
                  	//lsParam.aoData.iDisplayStart=key2.iDisplayStart+lsParam.aoData.iDisplayLength;
                  	reqAoData[4].value=reqAoData[3].value+reqAoData[4].value;
                  	doSearchAll(param,reqAoData);
                  }else{
                	  if(dataList.length==0){
                		  dataList[0]="null";
                	  }
                  		searchCallBack(param,dataList);
                  }     
				} else if (key1 === '09') {
					showMsg("会话已超时，请重新登陆！");
				} else if (key1 === "20") {
					showMsg("网络异常，提交失败，请重试！");
				} else if (key1 === "98") {
					showMsg("外网调用内网异常，请重试！");
				} else if (key1 === "99") {
					showMsg("外网调用内网超时，请重试！");
				} else if (key1 === "101") {
					showMsg("外网内存数据库连接失败！");
				} else {
					showMsg("系统异常！！");
				}
			},
			error : function(data) {
				if (data["statusText"] === "timeout") {
					showMsg("加载数据超时，请稍后重试！");
				} else {
					if (data.responseText === "") {
						showMsg("请求参数不合法，请重试！");
					} else if (data.responseText === undefined) {
						showMsg("网络异常，请重试！");
					} else {

						showMsg("系统异常，请重试！统一受理系统报文为:" + data.responseText);
					}
				}
			}
		});

	}

	
	function searchInfo() {
		var token = getCookie("token");
		setCookie("token", token, options.SECONDS);

		var cert = getThisCert();
		$.ajax({
            url:options.IP+ "/NSbsqWW/querymm.do",
            type: 'post',
            data: {
             	"cert":cert,
            	"funType":"01"
            },
            crossDomain:false,
            dataType:"jsonp",
		    timeout:options.TIMEOUT,
		    contentType:"application/x-www-form-urlencoded;charset=utf-8",
		    jsonp:"callback",
            success: function (data) {
            	var page = data['page'];
              	var  ts = data['ts'];
              	var publickey='';
              	if(page !=''){
              		publickey = $.checkTaxno(cert, ts,'', page, token);
              	}
			
			var dqrq = getCookie("dqrq");
			setCookie("dqrq", dqrq, options.SECONDS);
			if (dqrq === "") {
				dqrq = getDqrq();
			}
		
			// // 开票日期区间或请选择查询的确认/扫描日期区间！
			var gxfw = getCookie("gxrqfw");
			var fwarr = gxfw.split('-');
			var gxfwBeginDate = dateYYYYandMMandDD(fwarr[0]);
			var gxfwEndDate = dateYYYYandMMandDD(fwarr[1]);
		
			// // 发票号码：
			// var fphm = "";
			// // 发票代码：
			// var fpdm = "";
			// // 销方税号：
			// var xfsbh = "";
			// // 开票日期区间或请选择查询的确认/扫描日期区间！
			// var rq_q = gxfwBeginDate;
			// var rq_z = gxfwEndDate;
			// // 认证状态0未认证 1已认证
			// var rzzt = "0";
			// // 勾选状态 -1 全部 0未勾选 1以勾选
			// var gxzt = "-1";
			// // 发票类型 -1全部 01>增值税专用发票 02>货运专用发票 03>机动车发票14>通行费发票<
			// var fplx = "-1";
			// // 发票状态：-1>全部 0>正常2>作废4>异常1>失控3>红冲
			// var fpzt = "-1";
			// // 认证方式 -1>全部 0>勾选认证1>扫描认证
			// var rzfs = "";
		
			// "fpdm" : fpdm,
			// "fphm" : fphm,
		
			// "xfsbh" : xfsbh,
			// "rzfs" : rzfs,
			// "rzzt" : rzzt,
			// "gxzt" : gxzt,
			// "fpzt" : fpzt,
			// "fplx" : fplx,
			var authParam = {
				"cert" : cert,
				"token" : token,
				"ymbb" : options.YMBB,
				"ts":ts,
				"publickey":publickey
			};
		
			var searchParamAuth = searchParam;
			jQuery.extend(searchParamAuth, authParam);
			
			if (searchParamAuth.rq_q == undefined || searchParamAuth.rq_q == "") {
				searchParamAuth.rq_q = gxfwBeginDate;
			}
			if (searchParamAuth.rq_z == undefined || searchParamAuth.rq_z == "") {
				searchParamAuth.rq_z = gxfwEndDate;
			}
		
			// 未认证查询
			var resultWRZData = [];
			var startPage = 1;
			
			var aoData = getAoData();
		
		doSearchAll(searchParam, aoData);

		// // 已认证查询
		// // 认证状态0未认证 1已认证
		// rzzt = 1;
		// // 勾选状态 -1 全部 0未勾选 1以勾选
		// gxzt = "";
		// // 认证方式 -1>全部 0>勾选认证1>扫描认证
		// rzfs = -1;
		//
		// param = {
		// "fpdm" : fpdm,
		// "fphm" : fphm,
		// "rq_q" : rq_q,
		// "rq_z" : rq_z,
		// "xfsbh" : xfsbh,
		// "rzfs" : rzfs,
		// "rzzt" : rzzt,
		// "gxzt" : gxzt,
		// "fpzt" : fpzt,
		// "fplx" : fplx,
		// "cert" : cert,
		// "token" : token,
		// "ymbb" : options.YMBB
		// };
		// var resultYRZData = [];
		// doSearchAll(param, startPage, resultYRZData, aoData);
		// showMsg("已认证" + resultYRZData.length + "条");
            }
		});
	}

	/**
	 * 勾选概要查询（主要查询日期条件参数）
	 * 
	 * @param cert
	 * @param token
	 * @param nsrmc
	 * @param rznf
	 * @returns
	 */
	function qrgycx(cert, token, nsrmc, rznf,ptPassword) {
		console.log("qrgycx:"+cert+";"+nsrmc+";"+rznf);
		/*clearRlWindow();//重置
        uihide();
        spinner.spin(target);*/
		/*$.ajax({
            url:options.IP+ "/NSbsqWW/querymm.do",
            type: 'post',
            data: {
             	"cert":cert,
            	"funType":"01"
            },
            crossDomain: false,
            dataType:"jsonp",
				    timeout:options.TIMEOUT,
				    contentType:"application/x-www-form-urlencoded;charset=utf-8",
				    jsonp:"callback",*/
            /*success: function (data) {
            	var page = data['page'];
              	var ts = data['ts'];
              	var publickey='';
              	if(page !=''){
              		publickey = $.checkTaxno(cert, ts,'', page, token);
              	}*/
		     $.ajax({
					type : "post",
					url : options.IP + options.QRGYCX_URL,
					crossDomain: false,
					data : {
						"cert" : cert,
						"token" : token,
						"ymbb" : options.YMBB,
						"rznf" : rznf,
						 id: 'qrgycx'
					},
					dataType : "jsonp",
					timeout : options.TIMEOUT,
					jsonp : "callback",
					success : function(jsonData) {
						/*spinner.stop();*/
						var date = new Date();
						console.log("qrgycx:result"+jsonData.key1+";"+date.toLocaleTimeString());
						if (jsonData === undefined) {
							// setColorByMonth(month);
							showMsg("setColorByMonth");
						} else {
							var key1 = jsonData.key1;
							if (key1 === "200") {
								/*showMsg("获取信息失败，请重试！");*/
							/*} else if (key1 === "01") {*/
								var key2 = jsonData.key2;
								// 此处去掉纳税人识别号和日期
								token = jsonData.key4;
								clearCookie("token");
								setCookie("token", token, options.SECONDS);
								var infoArrSsq = ";;;";
								var key5 = jsonData.key5;
								if (key5 !== "") {
									setCookie("skssq", key5, options.SECONDS);
									var infoArrSsq = key5.split(';');
									// 加强税款所属期
									var temp_yf = infoArrSsq[0].substring(4, 6);
									// $("#color_yf_"+temp_yf).css("background-image","url(images/td_html5_bg.png)");
									showMsg("当前税款所属期"
											+ changeDateYYYYMM(infoArrSsq[0]));
									showMsg("（当期可抵扣勾选、确认截止日期为："
											+ changeDateYYYYMMDD(infoArrSsq[1])
											+ "）");
									var month = parseInt(temp_yf, 10);
									var skssn = infoArrSsq[0].substring(0, 4); // 税款所属期对应的年份
									  ssqn = skssn;
			                          ssqy = month;

								}
								var key3 = jsonData.key3;
								var key6 = jsonData.key6;
								var key7 = jsonData.key7;
		                        var key8 = jsonData.key8;
								 var infoArr;//抵扣统计数据
			                     var tsInfoArr;//退税统计数据
			                     var dbtsInfoArr;//代办退税统计数据
								setCookie("gxrqfw", key6, options.SECONDS);
								if (key3 !== "") {
									var ssq_nf = infoArrSsq[0].substring(0, 4);
									var ssq_yf = infoArrSsq[0].substring(4, 6);
									infoArr = key3.split(';');
									drawInfoToWindow(infoArr, month, ssq_yf, ssq_nf);
								}
								if (key7 != "") {
		                            tsInfoArr = key7.split(";");
		                            drawInfoToWindow2(tsInfoArr, month, ssq_nf);
		                        }

		                        if (key8 != "") {
		                            dbtsInfoArr = key8.split(";");
		                            drawInfoToWindow3(dbtsInfoArr, month, ssq_nf);
		                        }
		                        
		                        
		                        showMsg("所属期获取成功");
								token=jsonData.key4,
								clearCookie("token"),
								setCookie("token",token,options.SECONDS),
								cookssq=jsonData.key5,
								setCookie("skssq",cookssq,options.SECONDS);
								/*setCookie("gxrqfw",e.key4,options.SECONDS);*/
								var s=cookssq.split(";");
								console.log("税款所属期："+s);
								/*searchCallBack(lsParam,s);*/
		                        searchCallBack(searchParam,s);
		                      /*  uishow();*/
								/* else {
									if (rznf !== '' && key5 !== "") {
										var infoArrSsq = key5.split(';');
										// 加强税款所属期
										var temp_nf = infoArrSsq[0].substring(
												0, 4);

									} else {

									}
								}*/
								/*searchInfo();*/
							}else{
								handleResult(jsonData);
							}/* else if (key1 === "03") {
								showMsg("系统异常！");
							} else if (key1 === '09') {
								showMsg("会话已超时，请重新登陆！");
								
								clearCookie("token");
								doGxcx(cert, ptPassword);
							} else if (key1 === "98") {
								showMsg("网络调用异常，请重试！" + PROVINCE + "(纳税人识别号："
										+ cert + ")首页失败", "网络调用异常！");
							} else if (key1 === "99") {
								showMsg("网络调用超时！" + PROVINCE + "(纳税人识别号："
										+ cert + ")首页失败", "网络调用超时！");
							} else if (key1 === "101") {
								showMsg("数据库连接失败！" + PROVINCE + "(纳税人识别号："
										+ cert + ")首页失败", "数据库连接失败！");
							} else if (key1 === "11") {
								showMsg("您还未登录系统，请先登录！");
							} else {
								showMsg("系统异常，错误代码为:" + key1);
							}*/
						}
					},
					error : function(data) {
						 /*spinner.stop();*/
			             handleAjaxException(data);
						/*console.log("doGxcx:error"+data.responseText);*/
					/*	if (data.responseText === ""
								|| data.responseText === undefined) {

							showMsg("网络异常！" + PROVINCE + "(纳税人识别号：" + cert
									+ ")首页失败");
						} else {
							showMsg("网络异常:" + data.responseText + PROVINCE
									+ "(纳税人识别号：" + cert + ")首页失败", "网络异常:"
									+ getTyslInfo(data.responseText));
						}*/
					}
				});
          /*  }*/
		/*});*/
	}
    function drawInfoToWindow(data, month, ssq_yf, ssq_nf) {
        var date_year = ssq_nf;
        if (data.length > 0) {
            date_year = data[0].substring(0, 4);
        }
        var tmpMonth = "";
        if (date_year != ssq_nf) {
            month = 12;
        }
        //从1月份循环到当前税款所属期进行判断，填入内容
        for (var i = 1; i <= month; i++) {
            if (i < 10) {
                tmpMonth = "0" + i;
            } else {
                tmpMonth = i;
            }
            for (var j = 0; j < data.length && j <= month; j++) {
                var temp_yf = data[j].substring(4, 6);
                var temp_nyf = data[j].substring(0, 6);
                if (tmpMonth == temp_yf) {
                    var temp = data[j].split('=');
                    if (temp[4] == 1) {//判断是否已申报
                        //$('#sb_yf_' + temp_yf).show();
                    } else if (temp[4] == 0) {//判断是否未申报
                        //$('#wsb_yf_' + temp_yf).show();
                    } else if (temp[4] == 3) {//判断是否作废申报
                        //$('#zfsb_yf_' + temp_yf).show();
                    } else {
                       // $('#nsb_yf_' + temp_yf).show();
                    }

                    if (temp[0] == (ssq_nf + "" + ssq_yf)) { //如果是当前税款所属期，判断是否已申报、回退税款所属期、 注销/撤销勾选

                        var token = getCookie("token");
                        var objs = token.split(MENUSPLIT);
                        if (temp.length == 7 && temp[5] == 'true') {
                            if (objs[9] == '0') {//isHt为0，允许回退税款所属期 20180510 start
                               // $('#ht_yf_' + temp_yf).show();
                            }
                        }
                        //alert(dqnf);alert(ssqn);
                        //add by ysw 20190418 注销/撤销注销勾选 对应后台isZxgx方法 201904=2=1175433.58=156883.58=0=false=C;2;N
                        if (temp.length == 7 && dqnf == ssqn) {
                            var zxbz = temp[6].split('≡');
                            if (zxbz[0] == 'Y') {
                               // $('#zx_yf_' + temp_yf).show();
                            } else if (zxbz[0] == 'C') {
                                //$('#cxzx_yf_' + temp_yf).show();
                            }
                        } //end
                        if (objs[5] == '1' && objs[8] == '1') {//一般纳税人转小规模、小规模转一般纳税人且不能认证 20180510 start
                            var p = $("<li>抵扣发票<a class='bd_list_a' href='javascript:void(0);'>" + getFpfs(temp[1]) + "</a>份，税额合计：<span>" + getFormatYuan(temp[3]) + "</span>元</li>");
                        } else {
                            var p = $("<li>抵扣发票<a class='bd_list_a' href='javascript:void(0);' onclick='loadUrl(&quot;dkgx_fpdk.ac01f4b0.html&quot;);'>" + getFpfs(temp[1]) + "</a>份，税额合计：<span>" + getFormatYuan(temp[3]) + "</span>元</li>");
                        }
                        $("#tj_yf_" + temp_yf).append(p);

                    } else {

                        var ynq_skssq=getPreMonth_12(ssq_nf + "" + ssq_yf);
                        if(temp_nyf < ynq_skssq){
                            var p = $("<li>抵扣发票<a class='bd_list_a' href='javascript:void(0);' >"+getFpfs(temp[1]) + "</a>份，税额合计：<span>" + getFormatYuan(temp[3]) + "</span>元</li>");
                        }else{
                            var p = $("<li>抵扣发票<a class='bd_list_a' href='javascript:void(0);' onclick='goRztj(" + temp_nyf + ",0);'>"+getFpfs(temp[1]) + "</a>份，税额合计：<span>" + getFormatYuan(temp[3]) + "</span>元</li>");
                        }

                        $("#tj_yf_" + temp_yf).append(p);
                    }
                    data.splice(j, 1);
                    break;
                }
            }
        }

    }
    function drawInfoToWindow2(tsInfoArr, month, ssq_nf) {
       // var rznf = $("#rznf").val();
        var date_year = ssq_nf;
        if (tsInfoArr.length > 0) {
            date_year = tsInfoArr[0].substring(0, 4);
        }
        var tmpMonth = "";

        if (date_year != ssq_nf) {
            month = 12;
        }
        //从1月份循环到当前月份进行判断，填入内容
        for (var i = 1; i <= month; i++) {
            if (i < 10) {
                tmpMonth = "0" + i;
            } else {
                tmpMonth = i;
            }
            if (tsInfoArr.length > 0) {
                for (var j = 0; j < tsInfoArr.length; j++) {
                    var temp_yf = tsInfoArr[j].substring(4, 6);
                    var temp_nyf = tsInfoArr[j].substring(0, 6);
                    if (tmpMonth == temp_yf) {

                        var temp = tsInfoArr[j].split('=');
                        var p = "";

                        var ym = "";
                        if (month < 10) {
                            ym = ssq_nf + "0" + month;
                        } else {
                            ym = ssq_nf + month;
                        }

                        if (temp_nyf == ym) {
                            p = $("<li>退税发票<a class='bd_list_a' href='javascript:void(0);' onclick='loadUrl(&quot;tsgx_fpdk.31b5b7b5.html&quot;);' >" + getFpfs(temp[1]) + "</a>份，税额合计：<span>" + getFormatYuan(temp[3]) + "</span>元</li>");
                        } else {

                            var ynq_skssq=getPreMonth_12(dqrq.substring(0, 4)+dqrq.substring(5, 7));
                            if(temp_nyf < ynq_skssq){
                                p = $("<li>退税发票<a class='bd_list_a' href='javascript:void(0);' >" + getFpfs(temp[1]) + "</a>份，税额合计：<span>" + getFormatYuan(temp[3]) + "</span>元</li>");
                            }else{
                                p = $("<li>退税发票<a class='bd_list_a' href='javascript:void(0);' onclick='goRztj(" + temp_nyf + ",1);' >" + getFpfs(temp[1]) + "</a>份，税额合计：<span>" + getFormatYuan(temp[3]) + "</span>元</li>");
                            }
                        }
                        $("#tj_yf_" + temp_yf).append(p);
                        tsInfoArr.splice(j, 1);
                        break;
                    }
                }
            }
        }
    }

	  function drawInfoToWindow3(tsInfoArr, month, ssq_nf) {
	        //var rznf = $("#rznf").val();
	        var date_year = ssq_nf;
	        if (tsInfoArr.length > 0) {
	            date_year = tsInfoArr[0].substring(0, 4);
	        }
	        var tmpMonth = "";

	        if (date_year != ssq_nf) {
	            month = 12;
	        }
	        //从1月份循环到当前月份进行判断，填入内容
	        for (var i = 1; i <= month; i++) {
	            if (i < 10) {
	                tmpMonth = "0" + i;
	            } else {
	                tmpMonth = i;
	            }
	            if (tsInfoArr.length > 0) {
	                for (var j = 0; j < tsInfoArr.length; j++) {
	                    var temp_yf = tsInfoArr[j].substring(4, 6);
	                    var temp_nyf = tsInfoArr[j].substring(0, 6);

	                    if (tmpMonth == temp_yf) {

	                        var temp = tsInfoArr[j].split('=');
	                        var ym = "";
	                        if (month < 10) {
	                            ym = ssq_nf + "0" + month;
	                        } else {
	                            ym = ssq_nf + month;
	                        }
	                        var p = "";
	                        if (temp_nyf != ym) {
	                            var ynq_skssq=getPreMonth_12(dqrq.substring(0, 4)+dqrq.substring(5, 7));
	                            if(temp_nyf < ynq_skssq){
	                                p = $("<li>代办退税发票<a class='bd_list_a' href='javascript:void(0);' >" + getFpfs(temp[1]) + "</a>份，税额合计：<span>" + getFormatYuan(temp[3]) + "</span>元</li>");
	                            }else{
	                                p = $("<li>代办退税发票<a class='bd_list_a' href='javascript:void(0);' onclick='goRztj(" + temp_nyf + ",2);'>" + getFpfs(temp[1]) + "</a>份，税额合计：<span>" + getFormatYuan(temp[3]) + "</span>元</li>");
	                            }

	                        } else {
	                            p = $("<li>代办退税发票<a class='bd_list_a' href='javascript:void(0);' onclick='loadUrl(&quot;dbtsgx_fpdk.5aec59a4.html&quot;)'>" + getFpfs(temp[1]) + "</a>份，税额合计：<span>" + getFormatYuan(temp[3]) + "</span>元</li>");
	                        }
	                        //$("#tj_yf_" + temp_yf).append(p);
	                        tsInfoArr.splice(j, 1);
	                        break;
	                    }
	                }
	            }
	        }
	        if (ssqy < 10) {
	            tmpMonth = "0" + ssqy;
	        }

	    }
	  function getPreMonth_12(date) {
	        var year = date.substring(0,4); //获取当前日期的年份
	        var month = date.substring(4,6); //获取当前日期的月份
	        for(var i=0;i<12;i++){
	            var month = parseInt(month) - 1;
	            if (month == 0) {
	                year = parseInt(year) - 1;
	                month = 12;
	            }
	            if (month < 10) {
	                month = '0' + month;
	            }
	        }
	        var t2 = year + '' + month;
	        return t2;
	    }
	/***************************************************************************
	 * 
	 * @returns
	 */

	function doGxcx(certPass, ptPassword) {
		var date = new Date();
		console.log("doGxcx:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
		var token = getCookie("token");
		setCookie("token", token, options.SECONDS);
		if (token === "" || token === undefined) {
			showMsg("会话失效，正在重新登录！");
			login(certPass, ptPassword);
		} else {
			var nsrmc = getCookie("nsrmc");
			setCookie("nsrmc", nsrmc, options.SECONDS);
			var dqrq = getCookie("dqrq");
			var year = dqrq.substring(0, 4);
			var month = parseInt(dqrq.substring(5, 7), 10);
			setCookie("dqrq", dqrq, options.SECONDS);
			var cert = getThisCert();
			if (!velidateNsrsbh(cert)) {
				return;
			}
			var rznf = '';
			qrgycx(cert, token, nsrmc, rznf, searchInfo, certPass, ptPassword);
		}
	}
	
	function doGx(certPass, ptPassword) {
		var token = getCookie("token");
		setCookie("token", token, options.SECONDS);
		if (token === "" || token === undefined) {
			showMsg("会话失效，正在重新登录！");
			login(certPass, ptPassword);
		} else {
			var nsrmc = getCookie("nsrmc");
			setCookie("nsrmc", nsrmc, options.SECONDS);
			var dqrq = getCookie("dqrq");
			var year = dqrq.substring(0, 4);
			var month = parseInt(dqrq.substring(5, 7), 10);
			setCookie("dqrq", dqrq, options.SECONDS);
			var cert = getThisCert();
			if (!velidateNsrsbh(cert)) {
				return;
			}
			var rznf = '';
			gxsub(cert, token);
		}
	}
	
	function gxsub(cert,token){
		console.log("这个---");
		 $.ajax({
		        url:options.IP+ "/NSbsqWW/querymm.do",
		        type: 'post',
		        crossDomain:false,
		        data: {
		         	"cert":cert,
		        	"funType":"02"
		        },
		        dataType:"jsonp",
				    timeout:TIMEOUT,
				    contentType:"application/x-www-form-urlencoded;charset=utf-8",
				    jsonp:"callback",
		        success: function (n){
		        	var i=n.page,s=n.ts,r="";
		          	/*var page = data['page'];
		          	var ts = data['ts'];
		            var publickey='';
		            if(page !=''){
		               publickey = $.ck(cert, ts ,'',page,getCookie("token"));
		          	}*/
		    var isCanPost=true;
	    if(""!=i&&(r=$.checkInvConf(a,getCookie("token"),s,"",i)),isCanPost){
	    	isCanPost=!1;
	    	var o=subParam.fpdm+subParam.fphm+subParam.kprq+subParam.zt+subParam.yxse,l=hex_md5(encodeURIComponent(o));
	    	//spinner.spin(target),
		    var t={
		    	 "id":"dkgxcommit",
			   	 "fpdm":subParam.fpdm,
			   	 "fphm":subParam.fphm,
			   	 "kprq":subParam.kprq,
			   	 "zt":subParam.zt,
			   	 "yxse":subParam.yxse,
			   	 "cert":cert,
			   	 "token":token,
			   	 "ymbb":options.YMBB,
			   	 "ts":s,
			   	 "publickey":r,
			   	 "sign":l
			};
		/*var param={"fpdm":subParam.fpdm,"fphm":subParam.fphm,"kprq":subParam.kprq,"zt":subParam.zt,"cert":cert,"ts":ts,"token":token,"ymbb":options.YMBB,"publickey":publickey};*/
		 /*if(param!=""){*/
		    $.ajax({
		    type: "post",
		    url: options.IP + options.GX_URL,
		    data:t,
		    crossDomain:false,
		    dataType: "jsonp",
		    jsonp: "callback",
		    success: function(e) {
		    	/*spinner.stop(),*/
		    	isCanPost=!0;
		    	var t=e.key1;
		    	if(t==200){
		    		token=e.key2;
		    		clearCookie("token");
		    		setCookie("token",token,seconds);
		    		showMsg("数据提交成功");
		    		searchCallBack("success","success");
		    	}else if(t=="n4100004"){
		    		searchCallBack("提示","您已完成当期勾选发票的统计，当期发票勾选已被锁定；若您需在当期继续勾选发票，请前往“抵扣勾选统计”功能进行“撤销统计”");
		    	}else{
		    		searchCallBack("提示","勾选异常,请确定发票是否已经进行过此操作！");
		    	}
		    	/*"200"==t?(token=e.key2,clearCookie("token"),
		    	setCookie("token",token,seconds),
		    	showMsg("数据提交成功",
		    	function(e){e&&searchInfo()})):"n4100004"==t?
		    	showMsg("您已完成当期勾选发票的统计，当期发票勾选已被锁定；若您需在当期继续勾选发票，请前往“抵扣勾选统计”功能进行“撤销统计”","提示"):handleResult(e);*/
		/*      if(key1=="001"){
		        //失败
		        //alert("提交失败");
		      }
		      else if(key1=="000")
		      {
		        token=jsonData.key2;
		        clearCookie("token");
		        setCookie("token",token,options.SECONDS);
		        searchCallBack("success","success");
		        //成功

		      }else if(key1=='09'){
		      	searchCallBack("提示","会话已超时，请重新登陆！");
		        jAlert("<div id='popup_message'>会话已超时，请重新登陆！</div>","提示",function(r) {
		            if(r){
		                window.location.href = getDomainName();
		            }
		        });
		    	  //登录超时
		    	  clearCookie("token");
		    	  doGx(cert, ptPassword);
		      }else if(key1=="98"){
		        jAlert_error("<div id='popup_message'>外网调用内网异常，请重试！","提示");      }else{
		        jAlert_error("<div id='popup_message'>系统异常，错误代码为:"+key1+"</div>","提示");      
		    	  //网络异常
					searchCallBack("提示","网络异常");
		      }*/
		    },
		    error:function(data){
		      if(data.responseText==""||data.responseText==undefined){
		    	  showMsg("勾选异常");
		        //jAlert_error("<div id='popup_message'>网络异常，请重试！</div>","提示");

		      }else{
		        //jAlert_error("<div id='popup_message'>系统异常，请重试！统一受理系统报文为:"+data.responseText+"</div>","提示");

		      }        
		      }
		    });
		     /*}*/
		    }
		   }
		 }
		);
	}
	var lsParam={
		"cert":"",
		"token":"",
		"tjyf":"",//201712
		"oper":"cx",
		"fpdm":"",//发票代码
		"fphm":"",//发票号码
		"kprq":"",//开票日期
		"je":"",//金额
		"se":"",//税额
		"xfsh":"",//销方税号
		"xfsbh":"",//税号
		"qrrzrq_q":"",//确认日期
		"qrrzrq_z":"",//认证日期
		"fply":"",//0全部 1 勾选认证 2扫描认证
		"aoData":"",
		"ymbb":options.YMBB,
		"ts":"",
		"publickey":"",
		"id":"",
		}
	function lscx(certPass, ptPassword) {
		var date = new Date();
		console.log("1lscx:"+certPass+";"+ptPassword+";"+date .toLocaleTimeString());
		var token = getCookie("token");
		setCookie("token", token, options.SECONDS);
		if (token === "" || token === undefined) {
			showMsg("会话失效，正在重新登录！");
			login(certPass, ptPassword);
		} else {
			var nsrmc = getCookie("nsrmc");
			setCookie("nsrmc", nsrmc, options.SECONDS);
			var dqrq = getCookie("dqrq");
			var year = dqrq.substring(0, 4);
			var month = parseInt(dqrq.substring(5, 7), 10);
			setCookie("dqrq", dqrq, options.SECONDS);
			var cert = getThisCert();
			if (!velidateNsrsbh(cert)) {
				return;
			}
			var rznf = '';
			console.log("lscx:param"+nsrmc+";"+dqrq+";"+cert);
			lsdzcx(cert, token,getAoData());
		}
	}
		function signatureCX(certPass, ptPassword) {
			console.log("5");
		var token = getCookie("token");
		setCookie("token", token, options.SECONDS);
		if (token === "" || token === undefined) {
			showMsg("会话失效，正在重新登录！");
			login(certPass, ptPassword);
		} else {
			var nsrmc = getCookie("nsrmc");
			setCookie("nsrmc", nsrmc, options.SECONDS);
			var dqrq = getCookie("dqrq");
			var year = dqrq.substring(0, 4);
			var month = parseInt(dqrq.substring(5, 7), 10);
			setCookie("dqrq", dqrq, options.SECONDS);
			var cert = getThisCert();
			if (!velidateNsrsbh(cert)) {
				return;
			}
			var rznf = '';
			signatureCXQ(cert, token);
		}
	}
	function hqssqcx(certPass, ptPassword) {
		var token = getCookie("token");
		console.log("hqssqcx:"+certPass+";"+ptPassword);
		setCookie("token", token, options.SECONDS);
		if (token === "" || token === undefined) {
			showMsg("会话失效，正在重新登录！");
			login(certPass, ptPassword);
		} else {
			var nsrmc = getCookie("nsrmc");
			setCookie("nsrmc", nsrmc, options.SECONDS);
			var dqrq = getCookie("dqrq");
			var year = dqrq.substring(0, 4);
			var month = parseInt(dqrq.substring(5, 7), 10);
			setCookie("dqrq", dqrq, options.SECONDS);
			var cert = getThisCert();
			if (!velidateNsrsbh(cert)) {
				return;
			}
			var rznf = '';
			hqssqcxq(cert, token);
		}
	}
	function hqssqcxq(cert, token){
		$.ajax({
            url:options.IP+ "/SbsqWW/querymm.do",
            type: 'post',
            data: {
             	"cert":cert,
            	"funType":"06"
            },
            dataType:"jsonp",
				    timeout:options.TIMEOUT,
				    contentType:"application/x-www-form-urlencoded;charset=utf-8",
				    jsonp:"callback",
            success: function (data) {
            	var page = data['page'];
              	var ts = data['ts'];
              	var publickey='';
              	if(page !=''){
              		publickey = $.ck(cert, ts,'', page, token);
              	}
				 $.ajax({
					    type: "post",
					    url: options.IP + "/SbsqWW/hqssq.do",
					    data: {
											'cert': cert,
											'token': token,
											'ymbb': options.YMBB,
											'ts':ts,
											'publickey':publickey
										},
					    dataType: "jsonp",
					    jsonp: "callback",
						success: function(e) {
							showMsg("请求已响应！");
								var t=e.key1;
								e.key2;
								var date = new Date();
				            	console.log("hqssqcxq:result"+t+";"+date.toLocaleTimeString());
								if("01"==t){
									showMsg("所属期获取成功");
									token=e.key2,
									clearCookie("token"),
									setCookie("token",token,options.SECONDS),
									cookssq=e.key3,
									setCookie("skssq",cookssq,options.SECONDS),
									setCookie("gxrqfw",e.key4,options.SECONDS);
									var s=cookssq.split(";");
									console.log("税款所属期："+s);
									searchCallBack(lsParam,s);
								}else if("09"==t){
									showMsg("会话已超时，请重新尝试！1");
								}else if("00"==t){
									showMsg("查询您的当前税款所属期出现异常，请稍后再试！");
								}else{
									showMsg("返回值为："+t+"未知问题");
								}
				    },
						error:function(data){
				      if(data.responseText==""||data.responseText==undefined){
				        //jAlert_error("<div id='popup_message'>网络异常，请重试！</div>","提示");

				      }else{
				        //jAlert_error("<div id='popup_message'>系统异常，请重试！统一受理系统报文为:"+data.responseText+"</div>","提示");

				      }        
				    }
		  	});
	      }
        });
	}
	
	
	
	function signatureCXQ(cert, token){ 
		console.log("signatureCXQ");
		$.ajax({
            url:options.IP+ "/SbsqWW/querymm.do",
            type: 'post',
            data: {
             	"cert":cert,
            	"funType":"06"
            },
            dataType:"jsonp",
				    timeout:options.TIMEOUT,
				    contentType:"application/x-www-form-urlencoded;charset=utf-8",
				    jsonp:"callback",
            success: function (data) {
            	var page = data['page'];
              	var ts = data['ts'];
              	var publickey='';
              	if(page !=''){
              		publickey = $.ck(cert, ts,'', page, token);
              	}
					$.ajax({
					    type: "post",
					    url: options.IP + "/SbsqWW/qrgx.do",
					    data: {
									id: "queryqrhz",
                                    cert: cert,
                                    token: token,
                                    ymbb: options.YMBB,
                                    ts: ts,
                                    publickey: publickey
								},
			    dataType: "jsonp",
			    jsonp: "callback",
				success: function(e) {
						var t = e.key1,
					    s = e.key2,
						o = e.key4,
						  r = e.key5;
						if(t=="01"){
							if ("" != s) if (Number(o) > 0) {
								if(options.ID=="commitqrxx"){
									var i = s.split("*");
								var signature = i[2];
								//alert(signature);
								//signatureCXQ(cert, token,"queryqrhz",nsrsbh);
								$.ajax({
									 type: "post",
							    url: options.IP + "/SbsqWW/qrgx.do",
							    data: {
													id: "commitqrxx",
								                    cert: cert,
								                    token: token,
								                    signature: signature,
								                    ymbb: options.YMBB,
								                    ts: ts,
								                    publickey: publickey
												},
							    dataType: "jsonp",
							    jsonp: "callback",
									success: function(d) {
										var dt = e.key1;
										var	ds = e.key2;
												if(dt=="00"){
													showMsg("提交确认信息出现异常，请稍后再试!");
												}else if(dt == "01"){
													token = d.key3;
													clearCookie("token");
													setCookie("token", token, options.SECONDS);
													showMsg("当前状态已提交！");
												}else{
														showMsg("数据提交异常，请稍后再试！");
												};											
								  },
								  error:function(data){
										showMsg("数据提交异常，请稍后再试！");
									}											
							 })		
								}else{
									$.ajax({
									 type: "post",
							    url: options.IP + "/SbsqWW/qrgx.do",
							    data: {
													id: options.ID,
								                    cert: cert,
								                    token: token,
								                    signature: signature,
								                    ymbb: options.YMBB,
								                    ts: ts,
								                    publickey:publickey
												},
							    dataType: "jsonp",
							    jsonp: "callback",
									success: function(d) {
										var dt = e.key1;
										var	ds = e.key2;
												if(dt=="00"){
													showMsg("提交确认信息出现异常，请稍后再试!");
												}else if(dt == "01"){
													token = d.key3;
													clearCookie("token");
													setCookie("token", token, options.SECONDS);
													showMsg("当前状态已提交！");
												}else{
														showMsg("数据提交异常，请稍后再试！");
												};											
								  },
								  error:function(data){
										showMsg("数据提交异常，请稍后再试！");
									}											
							 })	
								}
																
							}else{
								if(options.ID=="commitqrxx"){
									var i = s.split("*");
								var signature = i[2];
								//alert(signature);
								//signatureCXQ(cert, token,"queryqrhz",nsrsbh);
								$.ajax({
									 type: "post",
							    url: options.IP + "/SbsqWW/qrgx.do",
							    data: {
													id: "commitqrxx",
								                    cert: cert,
								                    token: token,
								                    signature: signature,
								                    ymbb: options.YMBB,
								                    ts: ts,
								                    publickey: publickey
												},
							    dataType: "jsonp",
							    jsonp: "callback",
									success: function(d) {
										var dt = e.key1;
										var	ds = e.key2;
												if(dt=="00"){
													showMsg("提交确认信息出现异常，请稍后再试!");
												}else if(dt == "01"){
													token = d.key3;
													clearCookie("token");
													setCookie("token", token, options.SECONDS);
													showMsg("当前状态已提交！");
												}else{
														showMsg("数据提交异常，请稍后再试！");
												};											
								  },
								  error:function(data){
										showMsg("数据提交异常，请稍后再试！");
									}											
							 })		
								}else  if(options.ID=="htssq"){
									$.ajax({
										 type: "post",
								    url: options.IP + "/SbsqWW/qrgx.do",
								    data: {
														id: options.ID,
									                    cert: cert,
									                    token: token,
									                    signature: signature,
									                    ymbb: options.YMBB,
									                    ts: ts,
									                    publickey: publickey
													},
								    dataType: "jsonp",
								    jsonp: "callback",
										success: function(d) {
											var dt = e.key1;
											var	ds = e.key2;
													if(dt=="00"){
														showMsg("提交确认信息出现异常，请稍后再试!");
													}else if(dt == "01"){
														token = d.key3;
														clearCookie("token");
														setCookie("token", token, options.SECONDS);
														showMsg("当前状态已提交！");
													}else{
															showMsg("数据提交异常，请稍后再试！");
													};											
									  },
									  error:function(data){
											showMsg("数据提交异常，请稍后再试！");
										}											
								 })	
								}else{
									showMsg("没有可确认的数据！");
								}
							}
							
						 }else if (t=="0"){
							 showMsg("连接超时，请重新登录！");
							 signatureCX(cert, "");
						 }
		    },
				error:function(data){
		      if(data.responseText==""||data.responseText==undefined){
		        //jAlert_error("<div id='popup_message'>网络异常，请重试！</div>","提示");
		
		      }else{
		        //jAlert_error("<div id='popup_message'>系统异常，请重试！统一受理系统报文为:"+data.responseText+"</div>","提示");
		
		      }        
		    }
		});
	  }
   });
}
	
	
		
		
	function lsdzcx(cert,token,reqAoData){
		/*$.ajax({*/
          /*  url:options.IP+ "/SbsqWW/querymm.do",
            type: 'post',
            data: {
             	"cert":cert,
            	"funType":"06"
            },
            dataType:"jsonp",
				    timeout:options.TIMEOUT,
				    contentType:"application/x-www-form-urlencoded;charset=utf-8",
				    jsonp:"callback",
            success: function (data) {
            	var page = data['page'];
              	var ts = data['ts'];
              	var publickey='';
              	if(page !=''){
              		publickey = $.ck(cert, ts,'', page,token);
              	}*/
	 
				/*lsParam.cert=cert;
				lsParam.token=token;
				//如果开始调用，首次初始化后，一直自己调用自己，直到查询完所有值
				//lsParam.aoData=JSON.stringify(getAoData());
			    lsParam.aoData=json.stringify(reqAoData);
			    lsParam.ts=ts;
			    lsParam.publickey=publickey;*/
              	var aoData=json.stringify(reqAoData);
              	console.log("id:dkmx;cert"+cert+"token:"+token+"tjyf:"+lsParam.tjyf+",fpdm:"+lsParam.fpdm+",fphm:"+lsParam.fphm+",xfsbh:"+lsParam.xfsbh+
			    	",qrrzrq_q:"+lsParam.qrrzrq_q+",qrrzrq_z:"+lsParam.qrrzrq_z+",fply:"+lsParam.fply+
			    	",aoData:"+aoData+",ymbb:"+options.YMBB+",qt:wq");
				$.ajax({
                url: options.IP + options.LSCX_URL,
                data : {"id":"dkmx","cert":cert,"token":token,"tjyf":lsParam.tjyf,"fpdm":lsParam.fpdm,"fphm":lsParam.fphm,"xfsbh":lsParam.xfsbh,
			    	"qrrzrq_q":lsParam.qrrzrq_q,"qrrzrq_z":lsParam.qrrzrq_z,"fply":lsParam.fply,
			    	"aoData":aoData,"ymbb":options.YMBB,"qt":"wq"},
                type : 'post',
                dataType : 'jsonp',
                crossDomain:false,
                timeout:options.TIMEOUT,
                // async : false,
                success : function(jsonData) {
                	var date = new Date();
		        	 var key1 = jsonData.key1;
                     var key2 = jsonData.key2;
                     var key3 = jsonData.key3;
                     var key4 = jsonData.key4;
					/*if(key1=="00"){
		          		//jAlert_error("<div id='popup_message'>查询失败，请稍后再试！</div>","提示");
						
						relaodMxData();
		        	}else*/ 
                  if(key1=="200"){	
		        		//key2.iTotalRecords//总个数 iTotalDisplayRecords
		        		//iDisplayStart起始位置
			          	  nsrmc=getCookie("nsrmc");
			              setCookie("nsrmc",nsrmc,options.SECONDS);
			              var dqrq=getCookie("dqrq");
			              setCookie("dqrq",dqrq,options.SECONDS);
			              token=key2;
			              clearCookie("token");
			              setCookie("token",token,options.SECONDS);
			              
	            /*  if (key4 == 0) {
	            	  showMsg("没有符合条件的记录!");
                      //$('#dq_search_download').hide();
                      //$('#dq_unsearch_download').show();
                      dq_relaodMxData();
                  } else {
                      fnCallback(key3);
                  }*/
			       dataList=dataList.concat(key3.aaData);
                  if(key3.iTotalRecords-(reqAoData[4].value+reqAoData[3].value)>0&&reqAoData[3].value-key3.iTotalRecords<reqAoData[4].value){  
                  	//lsParam.aoData.iDisplayStart=key2.iDisplayStart+lsParam.aoData.iDisplayLength;
                  	reqAoData[3].value=reqAoData[3].value+reqAoData[4].value;
                  	lsdzcx(cert,token,reqAoData);
                  }else{
                	  if(dataList.length==0){
                		  dataList[0]="null";
                	  }
                  		searchCallBack(lsParam,dataList);
                   }   
	          		if(key4==0){
	          			 if(dataList.length==0){
	                		  dataList[0]="null";
	                	  }
	          			 showMsg("没有符合条件的记录!");
	          			//jAlert("<div id='popup_message'>没有符合条件的记录！</div>","提示");
	          		}
		        	/*}else if(key1=='09'){
		          	  clearCookie("token");
		          	  lscx(cert, ptPassword);
			        }else if(key1=="20"){
			          //jAlert_error("<div id='popup_message'>网络异常，提交失败，请重试！</div>","提示");
               
			        }else if(key1=="98"){
			          //jAlert_error("<div id='popup_message'>外网调用内网异常，请重试！","提示");
               
			        }else if(key1=="99"){
			          //jAlert_error("<div id='popup_message'>外网调用内网超时，请重试！","提示");  
                
			        }else if(key1=="101"){
			          //jAlert_error("<div id='popup_message'>外网内存数据库连接失败！","提示"); 
                */
			        }else{
                           // handleResult(jsonData);
			        	searchCallBack('error',key2);
                            showMsg(key2);
                           /* dq_relaodMxData();*/
			         // jAlert_error("<div id='popup_message'>系统异常！</div>","提示");
                
			        }
                },
                error:function(data) {
                	searchCallBack('error','请求超时，请稍后在试!');
                	 //handleAjaxException(data);
                }
            });	
	     /*}*/
      /* });*/
	}
	
	jQuery.extend({
		gxch : function(certPass, ptPassword, userOptions, userSearchParam,
				userSearchCallBack, msgCallBack) {
			var date = new Date();
			console.log("3gxch:"+certPass+";"+ptPassword+";"+userOptions.PROVINCE+";"+!userOptions.IP+";"+date .toLocaleTimeString());
			dataList=[];
			if (typeof (msgCallBack === "function")) {
				showMsg = msgCallBack;
			}
			if (!userOptions.PROVINCE && !userOptions.IP) {
				showMsg("PROVINCE IP不能同时为空");
				return;
			} else {
				if (userOptions.PROVINCE) {
					options.IP = getIP(userOptions.PROVINCE);
				}
			}
			jQuery.extend(options, userOptions);

			if (!options.IP) {
				showMsg("未获取到IP");
				return;
			}

			jQuery.extend(searchParam, userSearchParam);
			if (typeof (userSearchCallBack === "function")) {
				searchCallBack = userSearchCallBack;
			}
			// login(certPass, ptPassword, doGxcx);
			doAction=doGxcx;
			doGxcx(certPass, ptPassword);
		
		}
	});
	
	jQuery.extend({
		gx:function (certPass, ptPassword, userOptions, userSearchParam,
				userSearchCallBack, msgCallBack){
					dataList=[];
			if (typeof (msgCallBack === "function")) {
				showMsg = msgCallBack;
			}
			if (!userOptions.PROVINCE && !userOptions.IP) {
				showMsg("PROVINCE IP不能同时为空");
				return;
			} else {
				if (userOptions.PROVINCE) {
					options.IP = getIP(userOptions.PROVINCE);
				}
			}
			jQuery.extend(options, userOptions);

			if (!options.IP) {
				showMsg("未获取到IP");
				return;
			}

			jQuery.extend(subParam, userSearchParam);
			if (typeof (userSearchCallBack === "function")) {
				searchCallBack = userSearchCallBack;
			}
			// login(certPass, ptPassword, doGxcx);
			doAction=doGx;
			doGx(certPass, ptPassword);
		}
	});
	jQuery.extend({
		lscx:function (certPass, ptPassword, userOptions, userSearchParam,
				userSearchCallBack, msgCallBack){
					dataList=[];
			if (typeof (msgCallBack === "function")) {
				showMsg = msgCallBack;
			}
			if (!userOptions.PROVINCE && !userOptions.IP) {
				showMsg("PROVINCE IP不能同时为空");
				return;
			} else {
				if (userOptions.PROVINCE) {
					options.IP = getIP(userOptions.PROVINCE);
				}
			}
			jQuery.extend(options, userOptions);

			if (!options.IP) {
				showMsg("未获取到IP");
				return;
			}

			jQuery.extend(lsParam, userSearchParam);
			if (typeof (userSearchCallBack === "function")) {
				searchCallBack = userSearchCallBack;
			}
			// login(certPass, ptPassword, doGxcx);
			doAction=lscx;
			lscx(certPass, ptPassword);
			console.log("1--end")
			var date = new Date();
			console.log(date .toLocaleTimeString());
		}
	});
	   jQuery.extend({
				nsrsbh:function (){
					return getThisCert();
			  }
		 });
	
		jQuery.extend({
		signature:function (certPass, ptPassword, userOptions, userSearchParam,
				userSearchCallBack, msgCallBack,nsrsbh){
					dataList=[];
					console.log("4");
			if (typeof (msgCallBack === "function")) {
				showMsg = msgCallBack;
			}
			if (!userOptions.PROVINCE && !userOptions.IP) {
				showMsg("PROVINCE IP不能同时为空");
				return;
			} else {
				if (userOptions.PROVINCE) {
					options.IP = getIP(userOptions.PROVINCE);
				}
			}
			jQuery.extend(options, userOptions);

			if (!options.IP) {
				showMsg("未获取到IP");
				return;
			}

			jQuery.extend(lsParam, userSearchParam);
			if (typeof (userSearchCallBack === "function")) {
				searchCallBack = userSearchCallBack;
			}
			var a=getThisCert();
			if(!a==nsrsbh){
				showMsg("输入的纳税人识别号与税控盘中的纳税人识别号不一致！");
			}
			// login(certPass, ptPassword, doGxcx);
			doAction=signatureCX;
			signatureCX(certPass, ptPassword,nsrsbh);
		}
	});
	var Ue="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video";
	function d(e){var t=Ue.split("|"),n=e.createDocumentFragment();if(n.createElement)for(;t.length;)n.createElement(t.pop());return n};
		jQuery.extend({
		hqssq:function (certPass, ptPassword, userOptions, userSearchParam,
				userSearchCallBack, msgCallBack,nsrsbh){
			
			var date = new Date();
			console.log("2hqssq:"+certPass+";"+ptPassword+";"+userOptions.PROVINCE+";"+userOptions.IP+";"+date .toLocaleTimeString());
					dataList=[];
			if (typeof (msgCallBack === "function")) {
				showMsg = msgCallBack;
			}
			if (!userOptions.PROVINCE && !userOptions.IP) {
				showMsg("PROVINCE IP不能同时为空");
				return;
			} else {
				if (userOptions.PROVINCE) {
					options.IP = getIP(userOptions.PROVINCE);
				}
			}
			jQuery.extend(options, userOptions);

			if (!options.IP) {
				showMsg("未获取到IP");
				return;
			}

			jQuery.extend(lsParam, userSearchParam);
			if (typeof (userSearchCallBack === "function")) {
				searchCallBack = userSearchCallBack;
			}
			var a=getThisCert();
			if(!a==nsrsbh){
				showMsg("输入的纳税人识别号与税控盘中的纳税人识别号不一致！");
			}
			// login(certPass, ptPassword, doGxcx);
			doAction=hqssqcx;
			hqssqcx(certPass, ptPassword,nsrsbh);
		}
	});
		
	//----------------------------------------------------
		jQuery.extend({
			dztb: function(certPass, ptPassword, userOptions, userSearchParam,
					userSearchCallBack, msgCallBack) {
				var date = new Date();
				console.log("1dztb:"+certPass+";"+ptPassword+";"+userOptions.PROVINCE+";"+!userOptions.IP+";"+date .toLocaleTimeString());
				dataList=[];
				if (typeof (msgCallBack === "function")) {
					showMsg = msgCallBack;
				}
				if (!userOptions.PROVINCE && !userOptions.IP) {
					showMsg("PROVINCE IP不能同时为空");
					return;
				} else {
					if (userOptions.PROVINCE) {
						options.IP = getIP(userOptions.PROVINCE);
					}
				}
				jQuery.extend(options, userOptions);

				if (!options.IP) {
					showMsg("未获取到IP");
					return;
				}

				jQuery.extend(searchParam, userSearchParam);
				if (typeof (userSearchCallBack === "function")) {
					searchCallBack = userSearchCallBack;
				}
				// login(certPass, ptPassword, doGxcx);
				doAction=doDxcx;
				doDxcx(certPass, ptPassword);
			
			}
		});
		function doDxcx(certPass, ptPassword) {
			var date = new Date();
			console.log("doDxcx:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
			var token = getCookie("token");
			setCookie("token", token, options.SECONDS);
			if (token === "" || token === undefined) {
				showMsg("会话失效，正在重新登录！");
				login(certPass, ptPassword);
			} else {
				var nsrmc = getCookie("nsrmc");
				setCookie("nsrmc", nsrmc, options.SECONDS);
				var dqrq = getCookie("dqrq");
				var year = dqrq.substring(0, 4);
				var month = parseInt(dqrq.substring(5, 7), 10);
				setCookie("dqrq", dqrq, options.SECONDS);
				var cert = getThisCert();
				if (!velidateNsrsbh(cert)) {
					return;
				}
				var rznf = '';
				var aoData = getAoData();
			/*	var authParam = {
						"id":"dkgxquery",
						"cert":cert,
						"token":token,
						"aoData":JSON.stringify(aoData),
						"ymbb":options.YMBB
					};
				var searchParamAuth = searchParam;
				jQuery.extend(searchParamAuth, authParam);*/
				dkgxquery(cert, token, searchParam,aoData);
			}
		}
		function dkgxquery(cert,token,param,aoData) {
			//var aoData = getAoData();
			var authParam = {
					"id":"dkgxquery",
					"cert":cert,
					"token":token,
					"aoData":JSON.stringify(aoData),
					"ymbb":options.YMBB
				};
			var searchParamAuth = param;
			jQuery.extend(searchParamAuth, authParam);
			/*var cert = getThisCert();
			var token = getCookie("token");*/
			console.log("dkgxquery:进来了");
			$.ajax({
				type: 'post',
				crossDomain:false,
	            url:options.IP+ "/NSbsqWW/dkgx.do",
	            data: searchParamAuth,
	            dataType:"jsonp",
			    timeout:options.TIMEOUT,
	            success: function (jsonData) {
	            	var p=0;
	            	var key1 = jsonData.key1;
					var key2 = jsonData.key2;
					var key3 = jsonData.key3;
					var key4 = jsonData.key4;
	            	/*var t=e.key1;
	            	var t=e.key1;
	            	var t=e.key1;
	            	var t=e.key1;*/
	            	if("200"==key1){
	            		token=key2,
	            		clearCookie("token"),
	            		setCookie("token",token,seconds);
	            		if (key4 === 0) {
							if(dataList.length==0){
		                		  dataList[0]="null";
		                	  }
							showMsg("没有符合条件的记录！");
						}else{
							dataList=dataList.concat(key3.aaData);
						}
	            		var iTotalRecords = key3.iTotalRecords;//总数
	            		// aoData[4]：每页行数  aoData[3]：
	            		//dataList=dataList.concat(key2.aaData);
						 if(key3.iTotalRecords-(aoData[4].value+aoData[3].value)>0&&aoData[3].value-key3.iTotalRecords<aoData[4].value){  
	                 	//lsParam.aoData.iDisplayStart=key2.iDisplayStart+lsParam.aoData.iDisplayLength;
							 aoData[3].value=aoData[3].value+aoData[4].value;
							 dkgxquery(cert,token,searchParamAuth,aoData);
		                 }else{
		               	  if(dataList.length==0){
		               		  dataList[0]="null";
		               	  }
		                   searchCallBack(param,dataList);
		                 }     
	            	 }else{ 
	            		 showMsg("查询失败，请稍后再试！");
	            		 searchCallBack(param,dataList);
	            		/* reloadInfo(),
	            		 handleResult(e);
	            	     spinner.stop(),
	            	     $("#unsearch").hide(),
	            	     $("#search").show();*/
	            	 }
	               }
			});
		}
		jQuery.extend({
			hqsksuq : function(certPass, ptPassword, userOptions, userSearchParam,
					userSearchCallBack, msgCallBack) {
				var date = new Date();
				console.log("2hqsksuq:"+certPass+";"+ptPassword+";"+userOptions.PROVINCE+";"+!userOptions.IP+";"+date .toLocaleTimeString());
				dataList=[];
				if (typeof (msgCallBack === "function")) {
					showMsg = msgCallBack;
				}
				if (!userOptions.PROVINCE && !userOptions.IP) {
					showMsg("PROVINCE IP不能同时为空");
					return;
				} else {
					if (userOptions.PROVINCE) {
						options.IP = getIP(userOptions.PROVINCE);
					}
		 		}
				jQuery.extend(options, userOptions);

				if (!options.IP) {
					showMsg("未获取到IP");
					return;
				}

				jQuery.extend(searchParam, userSearchParam);
				if (typeof (userSearchCallBack === "function")) {
					searchCallBack = userSearchCallBack;
				}
				// login(certPass, ptPassword, doGxcx);
				doAction=doSkssq;
				doSkssq(certPass, ptPassword);
			}
		});
		
		function doSkssq(certPass, ptPassword) {
			var date = new Date();
			console.log("doDxcx:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
			var token = getCookie("token");
			setCookie("token", token, options.SECONDS);
			if (token === "" || token === undefined) {
				showMsg("会话失效，正在重新登录！");
				login(certPass, ptPassword);
			} else {
				var nsrmc = getCookie("nsrmc");
				setCookie("nsrmc", nsrmc, options.SECONDS);
				var dqrq = getCookie("dqrq");
				var year = dqrq.substring(0, 4);
				var month = parseInt(dqrq.substring(5, 7), 10);
				setCookie("dqrq", dqrq, options.SECONDS);
				var cert = getThisCert();
				if (!velidateNsrsbh(cert)) {
					return;
				}
				var rznf = '';
				qrgycx(cert, token, nsrmc, rznf, searchInfo, certPass, ptPassword);
			}
		}
		/**
		 * 申请统计
		 */
   jQuery.extend({
	   sqtj:function (certPass, ptPassword, userOptions, userSearchParam,
					userSearchCallBack, msgCallBack){
						dataList=[];
				if (typeof (msgCallBack === "function")) {
					showMsg = msgCallBack;
				}
				if (!userOptions.PROVINCE && !userOptions.IP) {
					showMsg("PROVINCE IP不能同时为空");
					return;
				} else {
					if (userOptions.PROVINCE) {
						options.IP = getIP(userOptions.PROVINCE);
					}
				}
				jQuery.extend(options, userOptions);

				if (!options.IP) {
					showMsg("未获取到IP");
					return;
				}

				jQuery.extend(lsParam, userSearchParam);
				if (typeof (userSearchCallBack === "function")) {
					searchCallBack = userSearchCallBack;
				}
				// login(certPass, ptPassword, doGxcx);
				doAction=dosqtj;
				dosqtj(certPass, ptPassword);
			}
		});	
   function dosqtj(certPass, ptPassword) {
		var date = new Date();
		console.log("dosqtj:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
		var token = getCookie("token");
		setCookie("token", token, options.SECONDS);
		if (token === "" || token === undefined) {
			showMsg("会话失效，正在重新登录！");
			login(certPass, ptPassword);
		} else {
			var nsrmc = getCookie("nsrmc");
			setCookie("nsrmc", nsrmc, options.SECONDS);
			var dqrq = getCookie("dqrq");
			var year = dqrq.substring(0, 4);
			var month = parseInt(dqrq.substring(5, 7), 10);
			setCookie("dqrq", dqrq, options.SECONDS);
			var cert = getThisCert();
			if (!velidateNsrsbh(cert)) {
				return;
			}
			    var validate = lsParam.tjyf;
		        var sign = hex_md5(encodeURIComponent(validate));
				var authParam = {
						"id":lsParam.id,
						"cert":cert,
						"token":token,
						"tjyf":validate,
						"ymbb":options.YMBB,
						 "sign":sign
					};
			/*	var searchParamAuth = param;
				jQuery.extend(searchParamAuth, authParam);*/
			cxsqtj(cert, token,authParam);
		}
	}
   function cxsqtj(cert,token,authParam) {
		//var aoData = getAoData();
	  /* var validate = param.tjyf;
       var sign = hex_md5(encodeURIComponent(validate));
		var authParam = {
				"id":"sqscdktjbb",
				"cert":cert,
				"token":token,
				"ymbb":options.YMBB,
				 "sign":sign
			};
		var searchParamAuth = param;
		jQuery.extend(searchParamAuth, authParam);*/
		/*var cert = getThisCert();
		var token = getCookie("token");*/
		console.log("cxsqtj:进来了");
		$.ajax({
			type: 'post',
			crossDomain:false,
           url:options.IP+ "/NSbsqWW/dkrzsb.do",
           data: authParam,
           dataType:"jsonp",
		    timeout:options.TIMEOUT,
		    contentType:"application/x-www-form-urlencoded;charset=utf-8",
		    jsonp:"callback",
           success: function (jsonData) {
            var key1=jsonData.key1;
            var key2=jsonData.key2;
            var key3=jsonData.key3;
           	/*var t=e.key1;
           	var t=e.key1;
           	var t=e.key1;
           	var t=e.key1;*/
           	if("200"==key1){
           		var t=jsonData.key1;
           		token=key2;
                clearCookie("token");
                setCookie("token",token,seconds);

                var nsrmc=getCookie("nsrmc");
                setCookie("nsrmc",nsrmc,seconds);
              /*  $('#sqtj_button').hide();
                $('#sqtjsj').text(key3);*/
                /*step.goStep(1);*/
                searchCallBack("success","已申请报表统计，请稍后查询统计报表");
                /*jAlert("<div id='popup_message'>已申请报表统计，请稍后查询统计报表！</div>","提示");
           		*/
           	}else{ 
           		 showMsg("申报异常，请重新申报！");
           		 searchCallBack("error",key2);
           		/* reloadInfo(),
           		 handleResult(e);
           	     spinner.stop(),
           	     $("#unsearch").hide(),
           	     $("#search").show();*/
           	     }
              }
		});
	}
   
	/**
	 * 申请统计
	 */
jQuery.extend({
  tjwcztcx:function (certPass, ptPassword, userOptions, userSearchParam,
				userSearchCallBack, msgCallBack){
					dataList=[];
			if (typeof (msgCallBack === "function")) {
				showMsg = msgCallBack;
			}
			if (!userOptions.PROVINCE && !userOptions.IP) {
				showMsg("PROVINCE IP不能同时为空");
				return;
			} else {
				if (userOptions.PROVINCE) {
					options.IP = getIP(userOptions.PROVINCE);
				}
			}
			jQuery.extend(options, userOptions);

			if (!options.IP) {
				showMsg("未获取到IP");
				return;
			}

			jQuery.extend(lsParam, userSearchParam);
			if (typeof (userSearchCallBack === "function")) {
				searchCallBack = userSearchCallBack;
			}
			// login(certPass, ptPassword, doGxcx);
			doAction=dotjwcztcx;
			dotjwcztcx(certPass, ptPassword);
		}
	});	

function dotjwcztcx(certPass, ptPassword) {
	var date = new Date();
	console.log("dosqtj:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
	var token = getCookie("token");
	setCookie("token", token, options.SECONDS);
	if (token === "" || token === undefined) {
		showMsg("会话失效，正在重新登录！");
		login(certPass, ptPassword);
	} else {
		var nsrmc = getCookie("nsrmc");
		setCookie("nsrmc", nsrmc, options.SECONDS);
		var dqrq = getCookie("dqrq");
		var year = dqrq.substring(0, 4);
		var month = parseInt(dqrq.substring(5, 7), 10);
		setCookie("dqrq", dqrq, options.SECONDS);
		var cert = getThisCert();
		if (!velidateNsrsbh(cert)) {
			return;
		}
	
			var authParam = {
					"id":"dktj",
					"cert":cert,
					"token":token,
					"ymbb":options.YMBB,
					"qt":"dq"
				};
		/*	var searchParamAuth = param;
			jQuery.extend(searchParamAuth, authParam);*/
		cxtjwczt(cert, token,authParam);
	}
 }
function cxtjwczt(cert,token,authParam) {
	console.log("cxtjwczt:进来了");
	$.ajax({
		   type: 'post',
		   crossDomain:false,
	       url:options.IP+ "/NSbsqWW/dktj.do",
	       data: authParam,
	       dataType:"jsonp",
		   timeout:options.TIMEOUT,
		   contentType:"application/x-www-form-urlencoded;charset=utf-8",
		   jsonp:"callback",
       success: function (jsonData) {
    	   var key1=jsonData.key1;
           var key2=jsonData.key2;
           var key3=jsonData.key3;
           var key4=jsonData.key4;
           var key5=jsonData.key5;
           var key6=jsonData.key6;
           var key7=jsonData.key7;
           var key8=jsonData.key8;
           var key9=jsonData.key9;
           var key10=jsonData.key10;
           var key11=jsonData.key11;
           var key12=jsonData.key12;
           var DQSSQ="";
       	if("200"==key1){
            token=key2;
            clearCookie("token");
            setCookie("token",token,seconds);
            var nsrmc=getCookie("nsrmc");
            setCookie("nsrmc",nsrmc,seconds);
            DQSSQ=key10;
            if(key7 == "01"){
             /*   $('#sqtj_button').show();
                step.goStep(0);*/
            }else{
                if(key3 == "20"){
                	tjsjstr=key9;
                }
            }
            //searchCallBack("success",key5+";"+key11+";"+key12);
            searchCallBack("success",key7+";"+key3+";"+key8+";"+DQSSQ+";"+token);
         }else{ 
       		 showMsg("申报异常，请重新申报！");
       		 searchCallBack("提示",key2);
       	 }
        }
	});
}

/**
 * 确认签名
 */
jQuery.extend({
	tjqr:function (certPass, ptPassword, userOptions, userSearchParam,
			userSearchCallBack, msgCallBack){
			dataList=[];
			pswork=certPass;
			if (typeof (msgCallBack === "function")) {
				showMsg = msgCallBack;
			}
			if (!userOptions.PROVINCE && !userOptions.IP) {
				showMsg("PROVINCE IP不能同时为空");
				return;
			} else {
				if (userOptions.PROVINCE) {
					options.IP = getIP(userOptions.PROVINCE);
				}
			}
			jQuery.extend(options, userOptions);
			
			if (!options.IP) {
				showMsg("未获取到IP");
				return;
			}
			
			jQuery.extend(lsParam, userSearchParam);
			if (typeof (userSearchCallBack === "function")) {
				searchCallBack = userSearchCallBack;
			}
			// login(certPass, ptPassword, doGxcx);
			doAction=dotjqr;
			dotjqr(certPass, ptPassword);

	}
});	

function dotjqr(certPass, ptPassword) {
	var date = new Date();
	console.log("dotjqr:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
	var token = getCookie("token");
	setCookie("token", token, options.SECONDS);
	if (token === "" || token === undefined) {
		showMsg("会话失效，正在重新登录！");
		login(certPass, ptPassword);
	} else {
		var nsrmc = getCookie("nsrmc");
		setCookie("nsrmc", nsrmc, options.SECONDS);
		var dqrq = getCookie("dqrq");
		var year = dqrq.substring(0, 4);
		var month = parseInt(dqrq.substring(5, 7), 10);
		setCookie("dqrq", dqrq, options.SECONDS);
		var cert = getThisCert();
		if (!velidateNsrsbh(cert)) {
			return;
		}
		    
		/*	var searchParamAuth = param;
			jQuery.extend(searchParamAuth, authParam);*/
		cxtjqr(cert, token);
	}
 }
function cxtjqr(cert,token) {
	console.log("cxtjqr:进来了pswork:"+pswork);
	var rtype="0";
    var validate = lsParam.tjyf+rtype;
    var sign = hex_md5(encodeURIComponent(validate));
	var authParam = {
			"id":"qrsb",
			"cert":cert,
			"token":token,
			"tjyf":lsParam.tjyf,
			"ymbb":options.YMBB,
			"rtype":rtype,
			 "sign":sign
		};
	$.ajax({
		   type: 'post',
		   crossDomain:false,
	       url:options.IP+ "/NSbsqWW/dkrzsb.do",
	       data: authParam,
	       dataType:"jsonp",
		   timeout:options.TIMEOUT,
		   contentType:"application/x-www-form-urlencoded;charset=utf-8",
		   jsonp:"callback",
       success: function (jsonData) {
           var key1=jsonData.key1;
           var key2=jsonData.key2;
           if(key1=="200"){
               var tjsjsign= "";
               /*var cryptType=1;*/
               //var  alg =getAlg();
               /*if(cryptType == 0){
                   var pw = $('#password').val();
                   var obj= signDataApi(tjsjstr+key2,pw,true,alg);
                   if(obj.code == 0){
                       tjsjsign= obj.p7Signature;
                   }
               }else{
                   tjsjsign= signData(tjsjstr+key2,"",0x400000);
               }
               if(tjsjsign == ""){
                   spinner.stop();
                   return;
               }*/
               rtype="1";
               var DQSSQ=lsParam.tjyf;
               var validate = DQSSQ+tjsjsign+rtype+tjsjstr;
               var sign = hex_md5(encodeURIComponent(validate));
               $.ajax({
                   type: "post",
                   url:options.IP+ "/NSbsqWW/dkrzsb.do",
                   crossDomain:false,
                   data:{"id":"qrsb","cert":cert,"token":token,"tjyf":DQSSQ,"tjsjsign":tjsjsign,"tjsjstr":tjsjstr,"password":pswork,"ymbb":options.YMBB,"rtype":rtype,"sign":sign,"alg":alg},
                   dataType: "jsonp",
                   timeout:TIMEOUT,
                   jsonp: "callback",
                   success: function(jsonData) {
                       var key1=jsonData.key1;
                       var key2=jsonData.key2;
                       var key3=jsonData.key3;
                       if(key1=="200"){
                           token=key2;
                           clearCookie("token");
                           setCookie("token",token,seconds);
                           var nsrmc=getCookie("nsrmc");
                           setCookie("nsrmc",nsrmc,seconds);

                          /* $('#qrtj_button').hide();

                           $('#qrqmsj').text(key3);*/
                           /*step.goStep(3);

                           $('#dq_tip_info').show();
                           $('#dq_result_panle').show();*/
                           /*dq_clearMxData();*/

                          /* //切换税款所属期
                           isQh = token.split(MENUSPLIT)[10];//按季切换税款所属期标志
                           if(isQh=="0"){//可以切换
                               $("#qhskssq").show();
                           }else{
                               $("#qhskssq").hide();
                           }*/
                           searchCallBack("success","确认成功！");
                         /*  jAlert("<div id='popup_message'>确认成功！</div>","提示");*/
                       }else{
                    	   searchCallBack("error","确认异常！");
                          /* spinner.stop();
                           handleResult(jsonData);*/
                       }
                   },error:function(data){
                	   showMsg("操作异常");
                   }
               });
           }else{
        	   searchCallBack("error","确认异常！");
           }
       },error:function(data){
    	   showMsg("操作异常");
       }
	});
}
/**
 * 不抵扣勾选
 */
jQuery.extend({
	bdkgx:function (certPass, ptPassword, userOptions, userSearchParam,
			userSearchCallBack, msgCallBack){
				dataList=[];
		if (typeof (msgCallBack === "function")) {
			showMsg = msgCallBack;
		}
		if (!userOptions.PROVINCE && !userOptions.IP) {
			showMsg("PROVINCE IP不能同时为空");
			return;
		} else {
			if (userOptions.PROVINCE) {
				options.IP = getIP(userOptions.PROVINCE);
			}
		}
		jQuery.extend(options, userOptions);

		if (!options.IP) {
			showMsg("未获取到IP");
			return;
		}

		jQuery.extend(subParam, userSearchParam);
		if (typeof (userSearchCallBack === "function")) {
			searchCallBack = userSearchCallBack;
		}
		// login(certPass, ptPassword, doGxcx);
		doAction=dobdkgx;
		dobdkgx(certPass, ptPassword);
	}
});
function dobdkgx(certPass, ptPassword) {
	var token = getCookie("token");
	setCookie("token", token, options.SECONDS);
	if (token === "" || token === undefined) {
		showMsg("会话失效，正在重新登录！");
		login(certPass, ptPassword);
	} else {
		var nsrmc = getCookie("nsrmc");
		setCookie("nsrmc", nsrmc, options.SECONDS);
		var dqrq = getCookie("dqrq");
		var year = dqrq.substring(0, 4);
		var month = parseInt(dqrq.substring(5, 7), 10);
		setCookie("dqrq", dqrq, options.SECONDS);
		var cert = getThisCert();
		if (!velidateNsrsbh(cert)) {
			return;
		}
		var rznf = '';
		gxbdkgx(cert, token);
	}
}

function gxbdkgx(cert,token){
	console.log("这个---");
	 $.ajax({
	        url:options.IP+ "/NSbsqWW/querymm.do",
	        type: 'post',
	        crossDomain:false,
	        data: {
	         	"cert":cert,
	        	"funType":"02"
	        },
	        dataType:"jsonp",
			    timeout:TIMEOUT,
			    contentType:"application/x-www-form-urlencoded;charset=utf-8",
			    jsonp:"callback",
	        success: function (a){
	        	var isCanPost=true;
	        	var n=a.page,i=a.ts,o="";
      if(""!=n&&(o=$.checkInvConf(cert,getCookie("token"),i,"",n)),isCanPost)
    	isCanPost=!1;
    	var o=subParam.fpdm+subParam.fphm+subParam.kprq+subParam.zt+subParam.yxse,d=hex_md5(encodeURIComponent(o));
	    var t={
	    	 "method":"bdkgxcommit",
		   	 "fpdm":subParam.fpdm,
		   	 "fphm":subParam.fphm,
		   	 "kprq":subParam.kprq,
		   	 "zt":subParam.zt,
		   	 "se":subParam.se,
		   	 "cert":cert,
		   	 "token":token,
		   	 "ymbb":options.YMBB,
		   	 "ts":i,
		   	 "publickey":o,
		   	 "sign":d
		   };
	    $.ajax({
	    type: "post",
	    url: options.IP + options.BDKGX_URL,
	    data:t,
	    crossDomain:false,
	    dataType: "jsonp",
	    jsonp: "callback",
	    success: function(e) {
	    	isCanPost=!0;
	    	var t=e.key1;
	    	if(t==200){
	    		token=e.key2;
	    		var s=e.key3
	    		clearCookie("token");
	    		setCookie("token",token,seconds);
	    		showMsg("数据提交成功");
	    		if("ysd"==s){
	    			searchCallBack("success1","您已完成当期勾选发票的统计，当期发票勾选已被锁定；若您需在当期继续勾选发票，请前往“抵扣勾选统计”功能进行“撤销统计！");
	    		}else if("wsd"==s){
	    			searchCallBack("success1","数据提交成功！");
	    		}
	    	}
	    },
	    error:function(data){
	      if(data.responseText==""||data.responseText==undefined){
	    	  showMsg(data.responseText);
	    	  searchCallBack("error","数据处理异常！");
	        //jAlert_error("<div id='popup_message'>网络异常，请重试！</div>","提示");
	      }else{
	    	  showMsg(data.responseText);
	    	  searchCallBack("error","数据处理异常！");
	        //jAlert_error("<div id='popup_message'>系统异常，请重试！统一受理系统报文为:"+data.responseText+"</div>","提示");
	       }        
	       }
	      });
	    }
	 }
	);
}

jQuery.extend({
	cxbdkgx: function(certPass, ptPassword, userOptions, userSearchParam,
			userSearchCallBack, msgCallBack) {
		var date = new Date();
		console.log("cxbdkgx:"+certPass+";"+ptPassword+";"+userOptions.PROVINCE+";"+!userOptions.IP+";"+date .toLocaleTimeString());
		dataList=[];
		if (typeof (msgCallBack === "function")) {
			showMsg = msgCallBack;
		}
		if (!userOptions.PROVINCE && !userOptions.IP) {
			showMsg("PROVINCE IP不能同时为空");
			return;
		} else {
			if (userOptions.PROVINCE) {
				options.IP = getIP(userOptions.PROVINCE);
			}
		}
		jQuery.extend(options, userOptions);

		if (!options.IP) {
			showMsg("未获取到IP");
			return;
		}

		jQuery.extend(searchParam, userSearchParam);
		if (typeof (userSearchCallBack === "function")) {
			searchCallBack = userSearchCallBack;
		}
		// login(certPass, ptPassword, doGxcx);
		doAction=docxbdkgx;
		docxbdkgx(certPass, ptPassword);
	
	}
});
function docxbdkgx(certPass, ptPassword) {
	var date = new Date();
	console.log("docxbdkgx:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
	var token = getCookie("token");
	setCookie("token", token, options.SECONDS);
	if (token === "" || token === undefined) {
		showMsg("会话失效，正在重新登录！");
		login(certPass, ptPassword);
	} else {
		var nsrmc = getCookie("nsrmc");
		setCookie("nsrmc", nsrmc, options.SECONDS);
		var dqrq = getCookie("dqrq");
		var year = dqrq.substring(0, 4);
		var month = parseInt(dqrq.substring(5, 7), 10);
		setCookie("dqrq", dqrq, options.SECONDS);
		var cert = getThisCert();
		if (!velidateNsrsbh(cert)) {
			return;
		}
		var rznf = '';
		var aoData = getAoData();
	/*	var authParam = {
				"id":"dkgxquery",
				"cert":cert,
				"token":token,
				"aoData":JSON.stringify(aoData),
				"ymbb":options.YMBB
			};
		var searchParamAuth = searchParam;
		jQuery.extend(searchParamAuth, authParam);*/
		bdkgxquery(cert, token, searchParam,aoData);
	}
}
function bdkgxquery(cert,token,param,aoData) {
	//var aoData = getAoData();
	var authParam = {
			"method":"fpquery",
			"cert":cert,
			"token":token,
			"aoData":JSON.stringify(aoData),
			"ymbb":options.YMBB
		};
	var searchParamAuth = param;
	jQuery.extend(searchParamAuth, authParam);
	/*var cert = getThisCert();
	var token = getCookie("token");*/
	console.log("dkgxquery:进来了");
	$.ajax({
		type: 'post',
		crossDomain:false,
        url:options.IP+options.BDKGX_URL,
        data: searchParamAuth,
        dataType:"jsonp",
	    timeout:options.TIMEOUT,
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",
	    jsonp:"callback",
        success: function (jsonData) {
        	var p=0;
        	var key1 = jsonData.key1;
			var key2 = jsonData.key2;
			var key3 = jsonData.key3;
			var key4 = jsonData.key4;
        	/*var t=e.key1;
        	var t=e.key1;
        	var t=e.key1;
        	var t=e.key1;*/
        	if("200"==key1){
        		token=key2,
        		clearCookie("token"),
        		setCookie("token",token,seconds);
        		if (key4 === 0) {
					if(dataList.length==0){
                		  dataList[0]="null";
                	  }
					showMsg("没有符合条件的记录！");
				}else{
					dataList=dataList.concat(key3.aaData);
				}
        		var iTotalRecords = key3.iTotalRecords;//总数
        		// aoData[4]：每页行数  aoData[3]：
        		//dataList=dataList.concat(key2.aaData);
				 if(key3.iTotalRecords-(aoData[4].value+aoData[3].value)>0&&aoData[3].value-key3.iTotalRecords<aoData[4].value){  
             	//lsParam.aoData.iDisplayStart=key2.iDisplayStart+lsParam.aoData.iDisplayLength;
					 aoData[3].value=aoData[3].value+aoData[4].value;
					 dkgxquery(cert,token,searchParamAuth,aoData);
                 }else{
               	  if(dataList.length==0){
               		  dataList[0]="null";
               	  }
                   searchCallBack(param,dataList);
                 }     
        	 }else{ 
        		 showMsg("查询失败，请稍后再试！");
        		 searchCallBack(param,dataList);
        		/* reloadInfo(),
        		 handleResult(e);
        	     spinner.stop(),
        	     $("#unsearch").hide(),
        	     $("#search").show();*/
        	 }
           }
	});
}
/**
 * 出口转内销不抵扣勾选
 */
jQuery.extend({
	ckznx:function (certPass, ptPassword, userOptions, userSearchParam,
			userSearchCallBack, msgCallBack){
				dataList=[];
		if (typeof (msgCallBack === "function")) {
			showMsg = msgCallBack;
		}
		if (!userOptions.PROVINCE && !userOptions.IP) {
			showMsg("PROVINCE IP不能同时为空");
			return;
		} else {
			if (userOptions.PROVINCE) {
				options.IP = getIP(userOptions.PROVINCE);
			}
		}
		jQuery.extend(options, userOptions);

		if (!options.IP) {
			showMsg("未获取到IP");
			return;
		}

		jQuery.extend(subParam, userSearchParam);
		if (typeof (userSearchCallBack === "function")) {
			searchCallBack = userSearchCallBack;
		}
		// login(certPass, ptPassword, doGxcx);
		doAction=dockznx;
		dockznx(certPass, ptPassword);
	}
});
function dockznx(certPass, ptPassword) {
	var token = getCookie("token");
	setCookie("token", token, options.SECONDS);
	if (token === "" || token === undefined) {
		showMsg("会话失效，正在重新登录！");
		login(certPass, ptPassword);
	} else {
		var nsrmc = getCookie("nsrmc");
		setCookie("nsrmc", nsrmc, options.SECONDS);
		var dqrq = getCookie("dqrq");
		var year = dqrq.substring(0, 4);
		var month = parseInt(dqrq.substring(5, 7), 10);
		setCookie("dqrq", dqrq, options.SECONDS);
		var cert = getThisCert();
		if (!velidateNsrsbh(cert)) {
			return;
		}
		var rznf = '';
		gxckznx(cert, token);
	}
}

function gxckznx(cert,token){
	console.log("这个---");
	 $.ajax({
	        url:options.IP+ "/NSbsqWW/querymm.do",
	        type: 'post',
	        crossDomain:false,
	        data: {
	         	"cert":cert,
	        	"funType":"02"
	        },
	        dataType:"jsonp",
			    timeout:TIMEOUT,
			    contentType:"application/x-www-form-urlencoded;charset=utf-8",
			    jsonp:"callback",
	        success: function (n){
	        	var s=n.page,i=n.ts,o="";
	        	var isCanPost=true;
	        	if(""!=s&&(o=$.checkInvConf(cert,getCookie("token"),i,"",s)),isCanPost){
	        		isCanPost=!1;
	        		var e="";
	        		if(subParam.flag=="1"){
	        			var r=subParam.fpdm+subParam.fphm+subParam.kprq+subParam.zt+subParam.yxse+subParam.znxbh,d=hex_md5(encodeURIComponent(r));
		        		e={id:"znxdkgxcommit",fpdm:subParam.fpdm,fphm:subParam.fphm,kprq:subParam.kprq,zt:subParam.zt,yxse:subParam.yxse,znxbh:subParam.znxbh,cert:cert,token:getCookie("token"),ymbb:options.YMBB,ts:i,publickey:o,sign:d}
	        		}else{
	        		   var r=subParam.fpdm+subParam.fphm+subParam.kprq+subParam.zt+subParam.znxbh,d=hex_md5(encodeURIComponent(r));
	        		   e={id:"znxbdkgxcommit",fpdm:subParam.fpdm,fphm:subParam.fphm,kprq:subParam.kprq,zt:subParam.zt,znxbh:subParam.znxbh,cert:t,token:getCookie("token"),ymbb:ymbb,ts:i,publickey:o,sign:d}
	        		}
	        	    $.ajax({
	        		    type: "post",
	        		    url: options.IP+"/NSbsqWW/dktj.do",
	        		    data:e,
	        		    crossDomain:false,
	        		    dataType: "jsonp",
	        		    jsonp: "callback",
	        		    success: function(e) {
	        		    	isCanPost=!0;
	        		    	var t=e.key1;
	        		    	if(t==200){
	        		    		token=e.key2;
	        		    		var s=e.key3
	        		    		clearCookie("token");
	        		    		setCookie("token",token,seconds);
	        		    		showMsg("数据提交成功");
	        		    		searchCallBack("success1","数据提交成功！");
	        		    	}else if(t="n4100004"){
	        		    		searchCallBack("success1","您已完成当期勾选发票的统计，当期发票勾选已被锁定；若您需在当期继续勾选发票，请前往“抵扣勾选统计”功能进行“撤销统计！");
	        		    	}
	        		    },
	        		    error:function(data){
	        		      if(data.responseText==""||data.responseText==undefined){
	        		    	  showMsg(data.responseText);
	        		    	  searchCallBack("error","数据处理异常！");
	        		        //jAlert_error("<div id='popup_message'>网络异常，请重试！</div>","提示");
	        		      }else{
	        		    	  showMsg(data.responseText);
	        		    	  searchCallBack("error","数据处理异常！");
	        		        //jAlert_error("<div id='popup_message'>系统异常，请重试！统一受理系统报文为:"+data.responseText+"</div>","提示");
	        		       }        
	        		       }
	        		      });
	        	 }
	            }
	         });
         }
jQuery.extend({
	tbckznx: function(certPass, ptPassword, userOptions, userSearchParam,
			userSearchCallBack, msgCallBack) {
		var date = new Date();
		console.log("1dztb:"+certPass+";"+ptPassword+";"+userOptions.PROVINCE+";"+!userOptions.IP+";"+date .toLocaleTimeString());
		dataList=[];
		if (typeof (msgCallBack === "function")) {
			showMsg = msgCallBack;
		}
		if (!userOptions.PROVINCE && !userOptions.IP) {
			showMsg("PROVINCE IP不能同时为空");
			return;
		} else {
			if (userOptions.PROVINCE) {
				options.IP = getIP(userOptions.PROVINCE);
			}
		}
		jQuery.extend(options, userOptions);

		if (!options.IP) {
			showMsg("未获取到IP");
			return;
		}

		jQuery.extend(searchParam, userSearchParam);
		if (typeof (userSearchCallBack === "function")) {
			searchCallBack = userSearchCallBack;
		}
		// login(certPass, ptPassword, doGxcx);
		doAction=dotbckznx;
		dotbckznx(certPass, ptPassword);
	
	}
});
function dotbckznx(certPass, ptPassword) {
	var date = new Date();
	console.log("doDxcx:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
	var token = getCookie("token");
	setCookie("token", token, options.SECONDS);
	if (token === "" || token === undefined) {
		showMsg("会话失效，正在重新登录！");
		login(certPass, ptPassword);
	} else {
		var nsrmc = getCookie("nsrmc");
		setCookie("nsrmc", nsrmc, options.SECONDS);
		var dqrq = getCookie("dqrq");
		var year = dqrq.substring(0, 4);
		var month = parseInt(dqrq.substring(5, 7), 10);
		setCookie("dqrq", dqrq, options.SECONDS);
		var cert = getThisCert();
		if (!velidateNsrsbh(cert)) {
			return;
		}
		var rznf = '';
		var aoData = getAoData();
	/*	var authParam = {
				"id":"dkgxquery",
				"cert":cert,
				"token":token,
				"aoData":JSON.stringify(aoData),
				"ymbb":options.YMBB
			};
		var searchParamAuth = searchParam;
		jQuery.extend(searchParamAuth, authParam);*/
		tbckznxquery(cert, token, searchParam,aoData);
	}
}
function tbckznxquery(cert,token,param,aoData) {
	//var aoData = getAoData();
/*	var id="";
	if(searchParam.flag=="1"){
		id="znxdkgxquery";
	}else{
		id="znxbdkgxquery";
	}*/
	var authParam = {
			"cert":cert,
			"token":token,
			"aoData":JSON.stringify(aoData),
			"ymbb":options.YMBB
		};
	var searchParamAuth = param;
	jQuery.extend(searchParamAuth, authParam);
	/*var cert = getThisCert();
	var token = getCookie("token");*/
	console.log("tbckznxquery:进来了");
	$.ajax({
		type: 'post',
		crossDomain:false,
        url:options.IP+ "/NSbsqWW/ckznx.do",
        data: searchParamAuth,
        dataType:"jsonp",
	    timeout:options.TIMEOUT,
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",
	    jsonp:"callback",
        success: function (jsonData) {
        	var p=0;
        	var key1 = jsonData.key1;
			var key2 = jsonData.key2;
			var key3 = jsonData.key3;
			console.log(key3.aaData+"---");
			var key4 = jsonData.key4;
        	if("200"==key1){
        		token=key2,
        		clearCookie("token"),
        		setCookie("token",token,seconds);
        		if (key4 === 0) {
					if(dataList.length==0){
                		  dataList[0]="null";
                	  }
					showMsg("没有符合条件的记录！");
				}else{
					dataList=dataList.concat(key3.aaData);
				}
        		var iTotalRecords = key3.iTotalRecords;//总数
        		// aoData[4]：每页行数  aoData[3]：
        		//dataList=dataList.concat(key2.aaData);
				 if(key3.iTotalRecords-(aoData[4].value+aoData[3].value)>0&&aoData[3].value-key3.iTotalRecords<aoData[4].value){  
             	//lsParam.aoData.iDisplayStart=key2.iDisplayStart+lsParam.aoData.iDisplayLength;
					 aoData[3].value=aoData[3].value+aoData[4].value;
					 dkgxquery(cert,token,searchParamAuth,aoData);
                 }else{
               	  if(dataList.length==0){
               		  dataList[0]="null";
               	  }
                   searchCallBack(param,dataList);
                 }     
        	 }else{ 
        		 showMsg("查询失败，请稍后再试！");
        		 searchCallBack(param,dataList);
        		/* reloadInfo(),
        		 handleResult(e);
        	     spinner.stop(),
        	     $("#unsearch").hide(),
        	     $("#search").show();*/
        	 }
           }
	});
}

/**
 * 发票逾期抵扣查询
 */
jQuery.extend({
	fpyqdksq: function(certPass, ptPassword, userOptions, userSearchParam,
			userSearchCallBack, msgCallBack) {
		var date = new Date();
		dataList=[];
		if (typeof (msgCallBack === "function")) {
			showMsg = msgCallBack;
		}
		if (!userOptions.PROVINCE && !userOptions.IP) {
			showMsg("PROVINCE IP不能同时为空");
			return;
		} else {
			if (userOptions.PROVINCE) {
				options.IP = getIP(userOptions.PROVINCE);
			}
		}
		jQuery.extend(options, userOptions);
		if (!options.IP) {
			showMsg("未获取到IP");
			return;
		}
		jQuery.extend(yqfpsqParam, userSearchParam);
		if (typeof (userSearchCallBack === "function")) {
			searchCallBack = userSearchCallBack;
		}
		// login(certPass, ptPassword, doGxcx);
		doAction=dofpyqdksq;
		dofpyqdksq(certPass, ptPassword);
	
	}
});
function dofpyqdksq(certPass, ptPassword) {
	var date = new Date();
	console.log("dofpyqdksq:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
	var token = getCookie("token");
	setCookie("token", token, options.SECONDS);
	if (token === "" || token === undefined) {
		showMsg("会话失效，正在重新登录！");
		login(certPass, ptPassword);
	} else {
		var nsrmc = getCookie("nsrmc");
		setCookie("nsrmc", nsrmc, options.SECONDS);
		var dqrq = getCookie("dqrq");
		var year = dqrq.substring(0, 4);
		var month = parseInt(dqrq.substring(5, 7), 10);
		setCookie("dqrq", dqrq, options.SECONDS);
		var cert = getThisCert();
		if (!velidateNsrsbh(cert)) {
			return;
		}
		var rznf = '';
		var aoData = getAoData();
		fpyqdksqquery(cert, token, yqfpsqParam,aoData);
	}
}
function fpyqdksqquery(cert,token,param,aoData) {
	//var aoData = getAoData();
	/*var id="";
	if(yqfpsqParam.flag=="1"){
		id="fpyqdksqquery";
	}else{
		id="fpyqdkgxquery";
	}*/
	var authParam = {
			"cert":cert,
			"token":token,
			"aoData":JSON.stringify(aoData),
			"ymbb":options.YMBB
		};
	var searchParamAuth = param;
	jQuery.extend(searchParamAuth, authParam);
	console.log("fpyqdksqquery:进来了");
	$.ajax({
		type: 'post',
		crossDomain:false,
        url:options.IP+ "/NSbsqWW/yqdk.do",
        data: searchParamAuth,
        dataType:"jsonp",
	    timeout:options.TIMEOUT,
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",
	    jsonp:"callback",
        success: function (jsonData) {
        	var p=0;
        	var key1 = jsonData.key1;
			var key2 = jsonData.key2;
			var key3 = jsonData.key3;
			var key4 = jsonData.key4;
        	if("200"==key1){
        		token=key2,
        		clearCookie("token"),
        		setCookie("token",token,seconds);
        		if (key4 === 0) {
					if(dataList.length==0){
                		  dataList[0]="null";
                	  }
					showMsg("没有符合条件的记录！");
				}else{
					dataList=dataList.concat(key3.aaData);
				}
        		var iTotalRecords = key3.iTotalRecords;//总数
        		// aoData[4]：每页行数  aoData[3]：
        		//dataList=dataList.concat(key2.aaData);
				 if(key3.iTotalRecords-(aoData[4].value+aoData[3].value)>0&&aoData[3].value-key3.iTotalRecords<aoData[4].value){  
             	//lsParam.aoData.iDisplayStart=key2.iDisplayStart+lsParam.aoData.iDisplayLength;
					 aoData[3].value=aoData[3].value+aoData[4].value;
					 dkgxquery(cert,token,searchParamAuth,aoData);
                 }else{
               	  if(dataList.length==0){
               		  dataList[0]="null";
               	  }
                   searchCallBack(param,dataList);
                 }     
        	 }else{ 
        		 showMsg("查询失败，请稍后再试！");
        		 searchCallBack(param,dataList);
        	 }
           }
	});
}

/**
 * 发票逾期抵扣提交
 */
jQuery.extend({
	yqdktj:function (certPass, ptPassword, userOptions, userSearchParam,
			userSearchCallBack, msgCallBack){
				dataList=[];
		if (typeof (msgCallBack === "function")) {
			showMsg = msgCallBack;
		}
		if (!userOptions.PROVINCE && !userOptions.IP) {
			showMsg("PROVINCE IP不能同时为空");
			return;
		} else {
			if (userOptions.PROVINCE) {
				options.IP = getIP(userOptions.PROVINCE);
			}
		}
		jQuery.extend(options, userOptions);
		if (!options.IP) {
			showMsg("未获取到IP");
			return;
		}

		jQuery.extend(lsParam, userSearchParam);
		if (typeof (userSearchCallBack === "function")) {
			searchCallBack = userSearchCallBack;
		}
		doAction=doyqdktj;
		doyqdktj(certPass, ptPassword);
	}
});	

function doyqdktj(certPass, ptPassword) {
var date = new Date();
console.log("dosqtj:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
var token = getCookie("token");
setCookie("token", token, options.SECONDS);
if (token === "" || token === undefined) {
	showMsg("会话失效，正在重新登录！");
	login(certPass, ptPassword);
} else {
	var nsrmc = getCookie("nsrmc");
	setCookie("nsrmc", nsrmc, options.SECONDS);
	var dqrq = getCookie("dqrq");
	var year = dqrq.substring(0, 4);
	var month = parseInt(dqrq.substring(5, 7), 10);
	setCookie("dqrq", dqrq, options.SECONDS);
	var cert = getThisCert();
	if (!velidateNsrsbh(cert)) {
		return;
	}
	cxyqdktj(cert, token);
}
}
function cxyqdktj(cert,token) {
	var	isCanPost=!1;var t=d+l+p+c+u+g,a=hex_md5(encodeURIComponent(t));spinner.spin(target);
	var authParam = {
			"id":"savefp",
			"cert":cert,
			"sign":a,
			"token":token,
			"ymbb":options.YMBB,
		};
	var searchParamAuth = lsParam;
	jQuery.extend(searchParamAuth, authParam);
$.ajax({
	   type: 'post',
	   crossDomain:false,
       url:options.IP+ "/NSbsqWW/yqdk.do",
       data: searchParamAuth,
       dataType:"jsonp",
	   timeout:options.TIMEOUT,
	   contentType:"application/x-www-form-urlencoded;charset=utf-8",
	   jsonp:"callback",
   success: function (jsonData) {
	   var key1=jsonData.key1
       var key2=jsonData.key2;
       var key3=jsonData.key3;
   	if("200"==key1){
        token=key2;
        clearCookie("token");
        setCookie("token",token,seconds);
        var nsrmc=getCookie("nsrmc");
        setCookie("nsrmc",nsrmc,seconds);
        searchCallBack("success","保存发票信息成功！");
     }else if("201"==key1){
    	setCookie("token",key2,seconds);
    	searchCallBack("提示",key3);
     }else{ 
   		 searchCallBack("提示","提交有误请稍后重试！");
   	 }
    }
});
}

/**
 * 发票逾期抵扣提交
 */
jQuery.extend({
	swsxtzs:function (certPass, ptPassword, userOptions, userSearchParam,
			userSearchCallBack, msgCallBack){
				dataList=[];
		if (typeof (msgCallBack === "function")) {
			showMsg = msgCallBack;
		}
		if (!userOptions.PROVINCE && !userOptions.IP) {
			showMsg("PROVINCE IP不能同时为空");
			return;
		} else {
			if (userOptions.PROVINCE) {
				options.IP = getIP(userOptions.PROVINCE);
			}
		}
		jQuery.extend(options, userOptions);
		if (!options.IP) {
			showMsg("未获取到IP");
			return;
		}
		jQuery.extend(swsxtzsParam, userSearchParam);
		if (typeof (userSearchCallBack === "function")) {
			searchCallBack = userSearchCallBack;
		}
		doAction=doswsxtzs;
		doswsxtzs(certPass, ptPassword);
	}
});	

function doswsxtzs(certPass, ptPassword) {
var date = new Date();
console.log("doswsxtzs:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
var token = getCookie("token");
setCookie("token", token, options.SECONDS);
if (token === "" || token === undefined) {
	showMsg("会话失效，正在重新登录！");
	login(certPass, ptPassword);
} else {
	var nsrmc = getCookie("nsrmc");
	setCookie("nsrmc", nsrmc, options.SECONDS);
	var dqrq = getCookie("dqrq");
	var year = dqrq.substring(0, 4);
	var month = parseInt(dqrq.substring(5, 7), 10);
	setCookie("dqrq", dqrq, options.SECONDS);
	var cert = getThisCert();
	if (!velidateNsrsbh(cert)) {
		return;
	}
	swsxtzstj(cert, token);
}
}
function swsxtzstj(cert,token) {
	var	isCanPost=!1;var t=d+l+p+c+u+g,a=hex_md5(encodeURIComponent(t));spinner.spin(target);
	var authParam = {
			"id":"queryswsxtzs",
			"cert":cert,
			"token":token,
			"ymbb":options.YMBB,
		};
	var searchParamAuth = swsxtzsParam;
	jQuery.extend(searchParamAuth, authParam);
$.ajax({
	   type: 'post',
	   crossDomain:false,
       url:options.IP+ "/NSbsqWW/swsxtzs.do",
       data: searchParamAuth,
       dataType:"jsonp",
	   timeout:options.TIMEOUT,
	   contentType:"application/x-www-form-urlencoded;charset=utf-8",
	   jsonp:"callback",
   success: function (jsonData) {
	   var key1=jsonData.key1
       var key2=jsonData.key2;
       var key3=jsonData.key3;
   	if("200"==key1){
        token=key2;
        clearCookie("token");
        setCookie("token",token,seconds);
        var nsrmc=getCookie("nsrmc");
        setCookie("nsrmc",nsrmc,seconds);
        searchCallBack("success","保存发票信息成功！");
     }else if("201"==key1){
    	setCookie("token",key2,seconds);
    	searchCallBack("提示",key3);
     }else{ 
   		 searchCallBack("提示","提交有误请稍后重试！");
   	 }
    }
});
}

/**
 * 切换税控所属期
 */
jQuery.extend({
	qhssq:function (certPass, ptPassword, userOptions, userSearchParam,
			userSearchCallBack, msgCallBack){
				dataList=[];
		if (typeof (msgCallBack === "function")) {
			showMsg = msgCallBack;
		}
		if (!userOptions.PROVINCE && !userOptions.IP) {
			showMsg("PROVINCE IP不能同时为空");
			return;
		} else {
			if (userOptions.PROVINCE) {
				options.IP = getIP(userOptions.PROVINCE);
			}
		}
		jQuery.extend(options, userOptions);

		if (!options.IP) {
			showMsg("未获取到IP");
			return;
		}

		jQuery.extend(lsParam, userSearchParam);
		if (typeof (userSearchCallBack === "function")) {
			searchCallBack = userSearchCallBack;
		}
		// login(certPass, ptPassword, doGxcx);
		doAction=doqhssq;
		doqhssq(certPass, ptPassword);
	}
});	

function doqhssq(certPass, ptPassword) {
	var date = new Date();
	console.log("dosqtj:"+certPass+";"+ptPassword+";"+date.toLocaleTimeString());
	var token = getCookie("token");
	setCookie("token", token, options.SECONDS);
	if (token === "" || token === undefined) {
		showMsg("会话失效，正在重新登录！");
		login(certPass, ptPassword);
	} else {
		var nsrmc = getCookie("nsrmc");
		setCookie("nsrmc", nsrmc, options.SECONDS);
		var dqrq = getCookie("dqrq");
		var year = dqrq.substring(0, 4);
		var month = parseInt(dqrq.substring(5, 7), 10);
		setCookie("dqrq", dqrq, options.SECONDS);
		var cert = getThisCert();
		if (!velidateNsrsbh(cert)) {
			return;
		}
		if(isCanPost) {
			isCanPost = false;
            var timestamp = (new Date()).getTime() + "a";
            var validate = token + timestamp;
            var sign = hex_md5(encodeURIComponent(validate));
            var param = {"id":"qhssq","cert":cert,"token":token,"timestamp":timestamp,"sign":sign,"ymbb":options.YMBB};
           // spinner.spin(target);
			/*
		    var validate = lsParam.tjyf;
	        var sign = hex_md5(encodeURIComponent(validate));
			var authParam = {
					"id":lsParam.id,
					"cert":cert,
					"token":token,
					"tjyf":validate,
					"ymbb":options.YMBB,
					 "sign":sign
				};*/
		    cxqhssq(cert, token,param);
		}else{
			 searchCallBack("error","当前不允许切换税款所属期！");
        }
	}
}
function cxqhssq(cert,token,param) {
	console.log("cxqhssq:进来了");
	$.ajax({
		type: 'post',
		crossDomain:false,
       url:options.IP+ "/NSbsqWW/dkgx.do",
       data: param,
       dataType:"jsonp",
	    timeout:options.TIMEOUT,
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",
	    jsonp:"callback",
       success: function (jsonData) {
    	   spinner.stop();
           isCanPost = true;
           var key1=jsonData.key1;
           if(key1=="200"){
               token=jsonData.key2;
               clearCookie("token");
               setCookie("token",token,seconds);
               searchCallBack("success","属期切换成功！");
               /*jAlert_correct("<div id='popup_message'><span>属期切换成功！</span></div>","提示",function(r) {
                   if(r){
                       loadUrl('mainpage_timeline.3a6cad3a.html');
                   }
               });*/
           }else if(key1=="n4100006"){
               token=jsonData.key2;
               clearCookie("token");
               setCookie("token",token,seconds);
               searchCallBack("error","属期切换失败，请先确认当前属期的发票！");
              // jAlert("<div id='popup_message'>属期切换失败，请先确认当前属期的发票！</div>","提示信息")
           }else{
               handleResult(jsonData);
           }
        /*   $("#unqhskssq").hide();
           $("#qhskssq").show();*/
        },
         error:function(data){
           isCanPost = true;
           spinner.stop();
           handleAjaxException(data);
          /* $("#unqhskssq").hide();
           $("#qhskssq").show();*/
       }
    });
}
//验证是否是唯一的一条数据
function unique(e){for(var t={},a=[],s=1;s<e.length;s++)t[e[s]]||(t[e[s]]=1,a.push(s));return a}
})()