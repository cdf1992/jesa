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
	var options = {
		"YMBB" : "3.0.12",
		"PROVINCE" : "",
		"IP" : "",
		"LOGIN_URL" : "/SbsqWW/login.do",
		"QRGYCX_URL" : "/SbsqWW/qrgycx.do",
		"GXCX_URL" : "/SbsqWW/gxcx.do",
		"GX_URL":"/SbsqWW/gxtj.do",
		"LSCX_URL":"SbsqWW/dktj.do",
		"TIMEOUT" : 1e4,
		"SECONDS" : 1200,
		"PAGE_SIZE" : 100
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
		"rzfs" : "",
		"rzzt" : "0",
		"gxzt" : "-1",
		"fpzt" : "-1",
		"fplx" : "-1"
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
		"ymbb" : options.YMBB
	};
	// 查询回调
	var searchCallBack = function(searchParam, jsonData) {
		console.log(1);
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
				"https://fpdk.bjsat.gov.cn/",
				"https://fpdk.tjsat.gov.cn/",
				"https://fpdk.he-n-tax.gov.cn:81/",
				"https://fpdk.tax.sx.cn/",
				"https://fpdk.nm-n-tax.gov.cn/", 
				"https://fpdk.tax.ln.cn/",
				"https://fpdk.dlntax.gov.cn/",
				"https://fpdk.jl-n-tax.gov.cn:4431/",
				"https://fpdk.hl-n-tax.gov.cn/", 
				"https://fpdk.tax.sh.gov.cn/",
				"https://fpdk.jsgs.gov.cn:81/", 
				"https://fpdk.zjtax.gov.cn/",
				"https://fpdk.nb-n-tax.gov.cn/",
				"https://fpdk.ah-n-tax.gov.cn/",
				"https://fpdk.fj-n-tax.gov.cn/",
				"https://fpdk.xm-n-tax.gov.cn/", 
				"https://fpdk.jxgs.gov.cn/",
				"https://fpdk.sd-n-tax.gov.cn/",
				"https://fpdk.qd-n-tax.gov.cn/",
				"https://fpdk.ha-n-tax.gov.cn/",
				"https://fpdk.hb-n-tax.gov.cn/", 
				"https://fpdk.hntax.gov.cn/",
				"https://fpdk.gd-n-tax.gov.cn/", 
				"https://fpdk.szgs.gov.cn/",
				"https://fpdk.gxgs.gov.cn/", 
				"https://fpdk.hitax.gov.cn/",
				"https://fpdk.cqsw.gov.cn/", 
				"https://fpdk.sc-n-tax.gov.cn/",
				"https://fpdk.gz-n-tax.gov.cn/", 
				"https://fpdk.yngs.gov.cn/",
				"https://fpdk.xztax.gov.cn/",
				"https://fprzweb.sn-n-tax.gov.cn/",
				"https://fpdk.gs-n-tax.gov.cn/",
				"http://fpdk.qh-n-tax.gov.cn/", 
				"https://fpdk.nxgs.gov.cn/",
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

	function getThisCert() {
		var rtn = openDevice();
		var ret = CryptCtrl.GetCertInfo("", 71);
		var error = CryptCtrl.errCode;
		var nsrsbh = "";
		if (error === 0) {
			nsrsbh = CryptCtrl.strResult;
		}
		CryptCtrl.CloseDevice();
		return nsrsbh;
	}

	function makeClientHello() {
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

	function makeClientAuthCode(serverPacket) {
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
		var clientAuthCode = CryptCtrl.strResult;
		CryptCtrl.CloseDevice();
		return clientAuthCode;
	}

	/**
	 * --end
	 * cryp-------------------------------------------------------------------
	 */

	/**
	 * --start
	 * Cookie-------------------------------------------------------------------
	 */

	function getCookie(e) {
		for (var t = e + "=", n = document.cookie.split(";"), o = 0; o < n.length; o++) {
			for (var i = n[o]; " " === i.charAt(0);) {
				i = i.substring(1, i.length);
			}
			if (0 === i.indexOf(t)) {
				return unescape(i.substring(t.length, i.length));
			}

		}
		return "";
	}
	function setCookie(e, t, n) {
		n = n || 0;
		var o = "";
		if (0 !== n) {
			var i = new Date();
			i.setTime(i.getTime() + 1e3 * n);
			o = "; expires=" + i.toGMTString();
		}
		document.cookie = e + "=" + escape(t) + o + "; path=/";
	}
	function clearCookie(e) {
		setCookie(e, "", -1);
	}
	/**
	 * --end
	 * Cookie-------------------------------------------------------------------
	 */

	/**
	 * --start
	 * login-------------------------------------------------------------------
	 */

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
	function secondLogin(param2, cb) {
		$
				.ajax({
					type : "post",
					url : options.IP + options.LOGIN_URL,
					data : param2,
					dataType : "jsonp",

					timeout : options.TIMEOUT,
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					jsonp : "callback",
					success : function(backData) {

						var rezt = backData.key1;
						var key1 = backData.key1;
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
							} else {
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
									clearCookie("token");
									setCookie("token", backData.key3,
											options.SECONDS);

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
								gotoConfig();
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
							setCookie("dqrq", dqrq, options.SECONDS);
							setCookie("nsrmc", nsrmc, options.SECONDS);
							setCookie("token", token, options.SECONDS);
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
						} else if (rezt === "98") {
							showMsg("网络调用异常，请重新登录！", "ERROR_021");
						} else if (rezt === "99") {
							showMsg("网络调用超时，请重新登录！", "ERROR_022");
						} else if (rezt === "101") {
							showMsg("数据库连接失败,请重新登录！", "ERROR_023");
						} else {
							showMsg("系统异常，错误代码为:" + rezt, "ERROR_024");
						}
					},
					error : function(data) {
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

	/**
	 * 
	 */

	function firstLogin(param1, ptPassword, cb) {
		$.ajax({
					type : "post",
					url : options.IP + options.LOGIN_URL,
					data : param1,
					timeout : options.TIMEOUT,
					dataType : "jsonp",

					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					jsonp : "callback",
					success : function(jsonData) {
						showMsg("首次访问外网服务:正常");
						var key1 = jsonData.key1;

						if (key1 === "00") {
							showMsg("服务器调用身份认证失败！正在重试......", "ERROR_006");
							cb("00", jsonData.key2);
						} else if (key1 === "01") {
							var serverPacket = jsonData.key2;
							var serverRandom = jsonData.key3;
							var clientAuthCode = makeClientAuthCode(serverPacket);
							showMsg("第二次访问外网服务：请稍候......");
							var cert = getThisCert();
							if (!velidateNsrsbh(cert)) {
								return;
							}

							var param2 = {};

							param2 = {
								"type" : "CLIENT-AUTH",
								"clientAuthCode" : clientAuthCode,
								"serverRandom" : serverRandom,
								"password" : ptPassword,
								"cert" : cert,
								"ymbb" : options.YMBB
							};

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
						} else {
							showMsg("系统异常，错误代码为:" + key1);
						}

					},
					error : function(data) {
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

	function validateLogin(certPass) {

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
			showMsg("请输入税控盘/金税盘证书密码!", "ERROR_001");
			return false;
		}
		return true;
	}

	function login(certPass, ptPassword) {

		if (!validateCertPass(certPass)) {
			return;
		}

		if (!validateLogin(certPass)) {
			return;
		}

		var rtn = openDevice(certPass);//开盘
		if (rtn !== 0) {
			return false;
		}

		rtn = makeClientHello();//读盘交互
		if (rtn !== 0) {
			return;
		}

		var clientHello = CryptCtrl.strResult;//ocx组件
		var firstLoginParam = {
			"type" : "CLIENT-HELLO",
			"clientHello" : clientHello,
			"ymbb" : options.YMBB
		};

		showMsg("开始调用外网服务，正在进入......");
		firstLogin(firstLoginParam, ptPassword, function(data, info) {
			firstLogin(firstLoginParam, ptPassword, function(data, info) {
				firstLogin(firstLoginParam, ptPassword,
						function(data, info) {
							if (data === "00") {
								showMsg("服务器调用身份认证失败！" + info + PROVINCE
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
			"value" : 14
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
		} ];

		return aoData;
	}

	function doSearchAll(param, reqAoData) {



		param.aoData = JSON.stringify(reqAoData);
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
						showMsg("没有符合条件的记录！");
					}else{
						dataList=dataList.concat(key2.aaData);
					}
					var iTotalRecords = key2.iTotalRecords;
					
					//dataList=dataList.concat(key2.aaData);
					 if(key2.iTotalRecords-(reqAoData[4].value+reqAoData[3].value)>0&&reqAoData[3].value-key2.iTotalRecords<reqAoData[4].value){  
                  	//lsParam.aoData.iDisplayStart=key2.iDisplayStart+lsParam.aoData.iDisplayLength;
                  	reqAoData[3].value=reqAoData[3].value+reqAoData[4].value;
                  	doSearchAll(param,reqAoData);
                  }else{
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
			"ymbb" : options.YMBB
		};

		var searchParamAuth = searchParam;
		jQuery.extend(searchParamAuth, authParam);

		if (searchParamAuth.rq_q) {
			searchParamAuth.rq_q = gxfwBeginDate;
		}
		if (searchParamAuth.rq_z) {
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
		$.ajax({
					type : "post",
					url : options.IP + options.QRGYCX_URL,
					data : {
						"cert" : cert,
						"token" : token,
						"ymbb" : options.YMBB,
						"rznf" : rznf
					},
					dataType : "jsonp",
					timeout : options.TIMEOUT,
					jsonp : "callback",

					success : function(jsonData) {
						if (jsonData === undefined) {
							// setColorByMonth(month);
							showMsg("setColorByMonth");
						} else {
							var key1 = jsonData.key1;
							if (key1 === "00") {
								showMsg("获取信息失败，请重试！");
							} else if (key1 === "01") {
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
									showMsg("（当期可勾选、确认截止日期为："
											+ changeDateYYYYMMDD(infoArrSsq[1])
											+ "）");
									month = parseInt(temp_yf, 10);
									var skssn = infoArrSsq[0].substring(0, 4); // 税款所属期对应的年份
								}
								var key3 = jsonData.key3;
								var key6 = jsonData.key6;
								var infoArr;
								setCookie("gxrqfw", key6, options.SECONDS);
								if (key3 !== "") {
									var ssq_nf = infoArrSsq[0].substring(0, 4);
									var ssq_yf = infoArrSsq[0].substring(4, 6);
									infoArr = key3.split(';');
								} else {
									if (rznf !== '' && key5 !== "") {
										var infoArrSsq = key5.split(';');
										// 加强税款所属期
										var temp_nf = infoArrSsq[0].substring(
												0, 4);

									} else {

									}
								}
								searchInfo();
							} else if (key1 === "03") {
								showMsg("系统异常！");
							} else if (key1 === '09') {
								showMsg("会话已超时，请重新登陆！");
								//doGxcx(cert, ptPassword);
								clearCookie("token");
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
								showMsg(
										"<div id='popup_message'>系统异常，错误代码为:"
												+ key1 + "</div>", "提示");
								showMsg("系统异常，错误代码为:" + key1);
							}
						}
					},
					error : function(data) {
						if (data.responseText === ""
								|| data.responseText === undefined) {

							showMsg("网络异常！" + PROVINCE + "(纳税人识别号：" + cert
									+ ")首页失败");
						} else {
							showMsg("网络异常:" + data.responseText + PROVINCE
									+ "(纳税人识别号：" + cert + ")首页失败", "网络异常:"
									+ getTyslInfo(data.responseText));
						}
					}
				});
	}

	/***************************************************************************
	 * 
	 * @returns
	 */

	function doGxcx(certPass, ptPassword) {
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
		var param={"fpdm":subParam.fpdm,"fphm":subParam.fphm,"kprq":subParam.kprq,"zt":subParam.zt,"cert":cert,"token":token,"ymbb":options.YMBB};

		 if(param!=""){
		    $.ajax({
		    type: "post",
		    url: options.IP + options.GX_URL,
		    data:param,
		    dataType: "jsonp",
		    jsonp: "callback",
		    success: function(jsonData) {

		      var key1=jsonData.key1;
		      if(key1=="001"){
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
		        /*jAlert("<div id='popup_message'>会话已超时，请重新登陆！</div>","提示",function(r) {
		            if(r){
		                window.location.href = getDomainName();
		            }
		        });*/
		    	  //登录超时
		    	  clearCookie("token");
		      }else if(key1=="98"){
		       /* showMsg("<div id='popup_message'>外网调用内网异常，请重试！","提示");      }else{
		        showMsg("<div id='popup_message'>系统异常，错误代码为:"+key1+"</div>","提示");      */
		    	  //网络异常
					searchCallBack("提示","网络异常");
		      }
		    },
		    error:function(data){
		      if(data.responseText==""||data.responseText==undefined){
		        //showMsg("<div id='popup_message'>网络异常，请重试！</div>","提示");

		      }else{
		        //showMsg("<div id='popup_message'>系统异常，请重试！统一受理系统报文为:"+data.responseText+"</div>","提示");

		      }        
		    }
		    });
		  }
	}
	var lsParam={
		"cert":"",
		"token":"",
		"tjyf":"",//201712
		"oper":"cx",
		"fpdm":"",//发票代码
		"fphm":"",//发票号码
		"xfsbh":"",//税号
		"qrrzrq_q":"",//确认日期
		"qrrzrq_z":"",//认证日期
		"fply":"",//0全部 1 勾选认证 2扫描认证
		"aoData":"",
		"ymbb":options.YMBB
		
		
		}
	function lscx(certPass, ptPassword) {
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
			lsdzcx(cert, token,getAoData());
		}
	}
		function signatureCX(certPass, ptPassword) {
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
					    type: "post",
					    url: options.IP + "/SbsqWW/hqssq.do",
					    data: {
											'cert': cert,
											'token': token,
											'ymbb': options.YMBB
										},
					    dataType: "jsonp",
					    jsonp: "callback",
						success: function(e) {
							showMsg("请求已响应！");
								var t=e.key1;
								e.key2;
								if("01"==t){
									showMsg("所属期获取成功");
									token=e.key2,
									clearCookie("token"),
									setCookie("token",token,options.SECONDS),
									cookssq=e.key3,
									setCookie("skssq",cookssq,options.SECONDS),
									setCookie("gxrqfw",e.key4,options.SECONDS);
									var s=cookssq.split(";");
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
				        //showMsg("<div id='popup_message'>网络异常，请重试！</div>","提示");

				      }else{
				        //showMsg("<div id='popup_message'>系统异常，请重试！统一受理系统报文为:"+data.responseText+"</div>","提示");

				      }        
				    }
		  	});
	}
	
	
	
	function signatureCXQ(cert, token){
				 $.ajax({
					    type: "post",
					    url: options.IP + "/SbsqWW/qrgx.do",
					    data: {
											id: 'queryqrhz',
											key1: cert,
											key2: token,
											ymbb: options.YMBB
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
										var i = s.split("*");
										var signature = i[2];
										//alert(signature);
										//signatureCXQ(cert, token,"queryqrhz",nsrsbh);
										$.ajax({
											 type: "post",
									    url: options.IP + "/SbsqWW/qrgx.do",
									    data: {
															id: 'commitqrxx',
															key1: getThisCert(),
															key2: token,
															'signature':signature,
															ymbb: options.YMBB
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
				    },
						error:function(data){
				      if(data.responseText==""||data.responseText==undefined){
				        //showMsg("<div id='popup_message'>网络异常，请重试！</div>","提示");

				      }else{
				        //showMsg("<div id='popup_message'>系统异常，请重试！统一受理系统报文为:"+data.responseText+"</div>","提示");

				      }        
				    }
		  	});
	}
	
	
		
		
	function lsdzcx(cert,token,reqAoData){
		lsParam.cert=cert;
		lsParam.token=token;
		//如果开始调用，首次初始化后，一直自己调用自己，直到查询完所有值
		//lsParam.aoData=JSON.stringify(getAoData());
				lsParam.aoData=JSON.stringify(reqAoData);
				$.ajax({
                url: options.IP + options.LSCX_URL,
                data : lsParam,
                type : 'post',
                dataType : 'jsonp',
                timeout:options.TIMEOUT,
                // async : false,
                success : function(jsonData) {
                	var key1 = jsonData.key1;
		        	var key2 = jsonData.key2;
		        	var key4 = jsonData.key4;//当前返回数据个数
					if(key1=="00"){
		          		showMsg("<div id='popup_message'>查询失败，请稍后再试！</div>","提示");
                  relaodMxData();
		        	}else if(key1=="01"){
		        		
		        		//key2.iTotalRecords//总个数 iTotalDisplayRecords
		        		//iDisplayStart起始位置
		        		
	          			nsrmc=getCookie("nsrmc");
                  setCookie("nsrmc",nsrmc,options.SECONDS);
                  var dqrq=getCookie("dqrq");
                  setCookie("dqrq",dqrq,options.SECONDS);
                  token=jsonData.key3;
                  clearCookie("token");
                  setCookie("token",token,options.SECONDS);     
                  dataList=dataList.concat(key2.aaData);
                  if(key2.iTotalRecords-(reqAoData[4].value+reqAoData[3].value)>0&&reqAoData[3].value-key2.iTotalRecords<reqAoData[4].value){  
                  	//lsParam.aoData.iDisplayStart=key2.iDisplayStart+lsParam.aoData.iDisplayLength;
                  	reqAoData[3].value=reqAoData[3].value+reqAoData[4].value;
                  	lsdzcx(cert,token,reqAoData);
                  }else{
                  		searchCallBack(lsParam,dataList);
                  }       
	          			if(key4==0){
	          				jAlert("<div id='popup_message'>没有符合条件的记录！</div>","提示");
	          			}
						
		        	}else if(key1=='09'){
		          	  clearCookie("token");
			          
			        }else if(key1=="20"){
			          showMsg("<div id='popup_message'>网络异常，提交失败，请重试！</div>","提示");
               
			        }else if(key1=="98"){
			          showMsg("<div id='popup_message'>外网调用内网异常，请重试！","提示");
               
			        }else if(key1=="99"){
			          showMsg("<div id='popup_message'>外网调用内网超时，请重试！","提示");  
                
			        }else if(key1=="101"){
			          showMsg("<div id='popup_message'>外网内存数据库连接失败！","提示"); 
                
			        }else{
			          showMsg("<div id='popup_message'>系统异常！</div>","提示");
                
			        }
                },
                error:function(data) {
                  if(data["statusText"]=="timeout"){
                    showMsg("<div id='popup_message'>加载数据超时，请稍后重试！</div>","提示");
                  }else{
                      if(data.responseText==""){
                          showMsg("<div id='popup_message'>请求参数不合法，请重试！</div>","提示");
                      }else if(data.responseText==undefined){
                          showMsg("<div id='popup_message'>网络异常，请重试！</div>","提示");
                      }else{
        				  showMsg("<div id='popup_message'>系统异常，请重试！</div>","提示");
                      }
                  }
                }
            });	
	 }
	
	jQuery.extend({
		gxch : function(certPass, ptPassword, userOptions, userSearchParam,
				userSearchCallBack, msgCallBack) {
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
		jQuery.extend({
		hqssq:function (certPass, ptPassword, userOptions, userSearchParam,
				userSearchCallBack, msgCallBack,nsrsbh){
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
})()