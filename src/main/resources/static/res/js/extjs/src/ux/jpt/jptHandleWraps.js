/**
 * jpt公共处理方法类
 * 
 * @author Lan 2017-5-15
 */
 
 	 Ext.define("Ext.ux.jpt.jptHandleWraps", {
 	 	alias: 'Ext.ux.jpt.jptHandleWraps'
 	 	 })

/**
 * //进项发票grid中勾选的所有值封装
 * 
 * @param {}
 *            gridId grid的id
 */
var inputBillCheckGrid=function (gridId,data){
 		 console.log("23");
	var params = {};
	var list = new Array();
	for(var i=0;i<data.length;i++){
		/**
		 * 将每一行获取的数据保存到集合中
		 */
		// 发票Id
		params['jibiBillId'] = data[i].get('jibiBillId');
		// 查验状态
		params['jibiCheckStatus'] = data[i].get('jibiCheckStatus');
		// 查验次数
		params['jibiCheckedLatestNo'] = data[i].get('jibiCheckedLatestNo');
		// 发票类型
		params['jibiBillType'] = data[i].get('jibiBillType');
		// 发票代码
		params['jibiBillCode'] = data[i].get('jibiBillCode');
		// 发票号码
		params['jibiBillNo'] = data[i].get('jibiBillNo');
		// 发票状态
		params['jibiBillSatatus'] = data[i].get('jibiBillSatatus');
		// 开票时间
		params['jibiBillDate'] = data[i].get('jibiBillDate');
		// 不含税金额
		params['jibiAmountIncome'] = data[i].get('jibiAmountIncome');
		// 价税合计（含税金额）
		params['jibiAmountTotal'] = data[i].get('jibiAmountTotal');
		// 校验码
		params['jibiCheckNo'] = data[i].get('jibiCheckNo');
		// 数据录入方式（采集方式）
		params['jibiCollectType'] = data[i].get('jibiCollectType');
		// 录入日期（采集时间）
		params['jibiCollectDate'] = data[i].get('jibiCollectDate');
		// 税额
		params['jibiAmountTax'] = data[i].get('jibiAmountTax');
		// 购方名称
		params['jibiBuyerName'] = data[i].get('jibiBuyerName');
		// 销方名称
		params['jibiSellerName'] = data[i].get('jibiSellerName');
		// 机器编码
		params['jibiMachineNo'] = data[i].get('jibiMachineNo');
		// 底账标识
		params['jibiOriginalAccount'] = data[i].get('jibiOriginalAccount');
		// 底账获取时间
		params['jibiOriginalGetDate'] = data[i].get('jibiOriginalGetDate');
		// 勾选状态
		params['jibiChosenStatus'] = data[i].get('jibiChosenStatus');
		// 勾选日期
		params['jibiChosenDate'] = data[i].get('jibiChosenDate');
		// 认证状态
		params['jibiAuthenticationStatus'] = data[i].get('jibiAuthenticationStatus');
		// 认证日期
		params['jibiAuthenticationDate'] = data[i].get('jibiAuthenticationDate');
		// 认证月份
		params['jibiAuthenticationMonth'] = data[i].get('jibiAuthenticationMonth');
		// 是否扫描认证
		params['jibiScanFlag'] = data[i].get('jibiScanFlag');
		// 最晚认证日期
		params['jibiDeductionDeadline'] = data[i].get('jibiDeductionDeadline');
		// 备注
		params['jibiRemark'] = data[i].get('jibiRemark');
		// 购方地址电话
		params['jibiBuyerAddpho'] = data[i].get('jibiBuyerAddpho');
		// 购方税号
		params['jibiBuyerTaxno'] = data[i].get('jibiBuyerTaxno');
		// 购方银行账号
		params['jibiBuyerBankAccount'] = data[i].get('jibiBuyerBankAccount');
		// 销方地址电话
		params['jibiSellerAddpho'] = data[i].get('jibiSellerAddpho');
		// 销方税号
		params['jibiSellerTaxno'] = data[i].get('jibiSellerTaxno');
		// 销方银行账号
		params['jibiSellerBankAccount'] = data[i].get('jibiSellerBankAccount');
		// 购方机构
		params['jibiBuyerInstid'] = data[i].get('jibiBuyerInstid');
		// 采集者
		params['jibiCreater'] = data[i].get('jibiCreater');
		// 有效税额
		params['jibiAmountTaxEffective'] = data[i].get('jibiAmountTaxEffective');
		// 将集合保存到list数组中
		list.push(params);
		// 清空集合中的每行数据保存结果
		params = {};
	}
	return list;
}

 /**
	 * 千分位标识
	 * 
	 * @param {}
	 *            n
	 * @return {}
	 */
var numberToCurrency=function (n){
    Ext.util.Format.thousandSeparator= ',';
    Ext.util.Format.decimalSeparator='.';
    return Ext.util.Format.number(n, '0,000.00');
}
 /**
	 * 解除千分位标识
	 * 
	 * @param {}
	 *            s
	 * @return {}
	 */
 var currencyToNumber=function currencyToNumber(s){
    return s.replace(/,/g,"");
}
 /**
	 * 将yyyymmdd 转换为yyyy-mm-dd
	 * 
	 * @param {}
	 *            value
	 * @return {}
	 */
var formatValue=function (value){
	if(value.length == 8){
		return value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8);
	} else if(value.length == 6){
		return value.substring(0, 4) + "-" + value.substring(4, 6);
	} else {
		return value;
	}
}

// 替换所有字符
String.prototype.replaceAll = function(s1,s2){
	return this.replace(new RegExp(s1,"gm"),s2);
}	


/**
 * JSON 值可以是： 数字（整数或浮点数） 字符串（在双引号中） 逻辑值（true 或 false） 数组（在方括号中） 对象（在花括号中） null
 * 解决json对于浏览器的兼容问题
 */

var json = {
	stringify : function(val) {
		var stringify = '', curVal;

		if (val === null) { // null
			return String(val);
		}

		switch (typeof val) {
			case 'number': // number
			case 'boolean': // boolean
				return String(val);
			case 'string': // string
				return '"' + val + '"';
			case 'undefined': // undefined
			case 'function': // function
				return undefined;
		}

		switch (Object.prototype.toString.call(val)) {
			case '[object Array]': // array
				stringify += '[';
				for (var i = 0, len = val.length - 1; i < len; i++) {
					curVal = json.stringify(val[i]);
					stringify += (curVal === undefined ? null : curVal) + ",";
				}
				stringify += json.stringify(val[i]);
				stringify += ']';
				return stringify;
			case '[object Date]': // date
				return '"' + (val.toJSON ? val.toJSON() : val.toString()) + '"';
			case '[object RegExp]': // regular expression
				return "{}";
			case '[object Object]': // object
				stringify += '{';
				for ( var i in val) {
					if (val.hasOwnProperty(i)) {
						curVal = json.stringify(val[i]);
						if (curVal !== undefined) {
							stringify += '"' + i + '":' + curVal + ',';
						}
					}
				}
				stringify = stringify.slice(0, -1);
				stringify += '}';
				return stringify;
			}
	}
}
/**
 * 接口参数区
 */

var invoiceInterfaceParameter=function(flag,temp,store){
	var searchState;
	var searchParam={
			'YMBB':"3.0.11",
			"fpdm" : "",
			"fphm" : "",
			"xfsbh" : "",
			"rzfs" : "-1",
			"rzzt" : "0",
			"fplx" : "01"
	};
	
	if("free"==flag){
		//勾选确认
		searchParam["fpzt"]="-1";
	}else if("cancel"==flag){
		//作废
		searchState="-1";
		searchParam["fpzt"]="2";
		
	}else if("exception"==flag){
		//异常
		searchState="-1";
		searchParam["fpzt"]="4";
	}else if("negative"==flag){
		//红冲
		searchState="-1";
		searchParam["fpzt"]="3";
	}else if("outof"==flag){
		//失控
		searchState="-1";
		searchParam["fpzt"]="1";
	}else if("detail"==flag){
		//到期提醒
		searchParam["fpzt"]="-1";
	}
	var myWin=Ext.create('Ext.window.Window', {
		extend : 'Ext.window.Window',
        modal:true,// 设置是否添加遮罩
		height : 200,
		width : 400,
		layout : 'fit',
		draggable:false,// 拖动
		resizable:false,	// 变大小
		autoScroll:false,
		title:'参数区',
		bodyStyle : 'overflow-x:hidden; overflow-y:hidden',
		items:{
			xtype:'form',
			items :[
				{
					xtype:'form',
					layout : 'form',
					name:'dzZone',
					//frame : true,
					defaultType : 'textfield',
					border:0,
					items:[/*{
						xtype:'textfield',
						fieldLabel:'金税设备',
						//afterLabelTextTpl : required,
						name:'jptDiskNo',
						labelAlign:'right',
						value:jptDiskNo[0].key,
						maxLength:12
					
					}*//*,{
						xtype:'combobox'
						,fieldLabel:'金税设备'
						,name:'jptDiskNo'
						,labelAlign:'right'
						,queryMode: 'local'
					    ,valueField: 'value'
						,store: 
							Ext.create('Ext.data.Store', {
							     fields: ['key', 'value']
							     ,data: jptDiskNo
							})
						,displayField : 'key'
			            ,emptyText : '请选择' 
			            ,editable : false
			            ,selectOnFocus : true 
					
					}*/,{
							fieldLabel:'开票开始日期',
					        xtype: 'datefield',				    
					        format:'Y-m-d',
							name: 'jibiBillBeginDate',  
							labelAlign: 'right',
							queryMode: 'local',
							format: 'Y-m-d',
							editable : false,
							maxValue:new Date(),
							vtype : 'daterange',// daterange类型为上代码定义的类型
						　　　endDateField : 'jibiBillEndDate'// 必须跟endDate的name名相同
						}
						,{
							xtype:'datefield'
							,fieldLabel:'开票结束日期'
							,name:'jibiBillEndDate'
							,labelAlign:'right'
							,format: 'Y-m-d'
							,editable : false
							,maxValue:new Date()
							,minValue:'jibiBillBeginDate'// 允许选择的最小日期
							,vtype : 'daterange'// daterange类型为上代码定义的类型
							,startDateField : 'jibiBillBeginDate'
						},{

							xtype:'combobox'
							,fieldLabel:'查询类型'
							,name:'jibiSeachStatus'
							,labelAlign:'right'
							,queryMode: 'local'
						    ,valueField: 'key'
						    ,hidden:flag=="free"?false:true
							,store: 
								Ext.create('Ext.data.Store', {
								     fields: ['key', 'value']
								     ,data: jptCheckTypeListfree
								})
							,displayField : 'value'
				            ,emptyText : '请选择' 
				            ,editable : false
				            ,selectOnFocus : true
						
						}]
				}]
		},buttons : [{
			text : '清空',
			iconCls : "rules-icon",
			instWin:null,
			handler:function(){
				myWin.down('form').getForm().reset();
			}
		},{
			text : '确定',
			iconCls : "success-icon",
			instWin:null,
			handler:function(){
				 var myMask = new Ext.LoadMask(Ext.getBody(),{msg:"正在处理，请稍后......"});
				 myMask.show();
				var record = myWin.query('form[name="dzZone"]')[0].getForm();
				//var records = myWin.query('form[name="tbarChose"]')[0].getForm();
				//var temp=record.findField('jptDiskNo').getValue();
				//alert(temp);
				//myView.down('textfield[name="certPass"]').getValue();
				//var localtab = a[1];
				
				/*var localtab;
				
				var count=0;
				for(var i=0;i<jptDiskNo.length;i++){
					if(jptDiskNo[i].key==temp){
						count++;
						temp=jptDiskNo[i].value;
					}
				}
				if(count<1){
					myMask.hide();
					return Ext.Msg.alert('提示','税控设备有误！');
				}*/
				var a=temp.split("@");
				var certPass =a[0];
				var localtab=a[1];
				var ymbb=a[2];
				/*alert(localtab);*/
				//myView.down('textfield[name="localtab"]').getValue();
				if(null==certPass||""==certPass){
					return Ext.Msg.alert('提示','请先填写税控密码！');
				}
				if(null==localtab||""==localtab){
					return Ext.Msg.alert('提示','请先填写地区名称！');
				}
				//开票开始日期
				var billBeginDate = record.findField('jibiBillBeginDate').getRawValue();
				//开票结束日期
				var billEndDate = record.findField('jibiBillEndDate').getRawValue();
				if("free"==flag){
					//查询类型
					searchState = record.findField('jibiSeachStatus').getValue();
				}
				//发票状态
				var options = {
						"PROVINCE" : localtab,
						'YMBB':ymbb
					};


					var resultData = [];
					var searchCallBack = function(searchParam, jsonData) {
						//alert(jsonData.length);
							if(jsonData.length>0){
								resultData=jsonData;
								Ext.Msg.alert('提示',resultData);
								Ext.Ajax.request({
									url:'dzDownloadFree.ajax',
									dataType: "json",  
									params:{
										params :jsonData,
										type :searchState
									},
									success:function(response){
										var result=Ext.decode(response.responseText);
										Ext.MessageBox.alert('提示',result);
										store.loadPage(1);
										myWin.hide();
									}
								});		
							}
					};
					var say="";
					var msgCallBack = function(msg, error_code) {
						console.log(error_code + "--MyShowMsg---" + msg);
						say+=msg+"<br/>"
						Ext.Msg.alert('提示',say);
					}
					
					var certPass = certPass;
					var ptPassword = "";
					/* 
						certPass  8位证书口令
						ptPassword 占时保持空
						options 配置参数 
						searchParam 查询条件
						searchCallBack  查询完成回调
						msgCallBack 消息显示回调 
					 */
			searchParam["rq_q"]=billBeginDate;
			searchParam["rq_z"]=billEndDate;
			searchParam["gxzt"]=searchState;
					$.gxch(certPass, ptPassword, options, searchParam, searchCallBack, msgCallBack);
					myMask.hide();
					
					//myWin.hide();
					//alert(resultData.length);
			
			}
		},{
				text : '关闭',
				iconCls : "close-icon",
				instWin:null,
				handler:function(){
					myWin.hide();
				}
			
		}]
	}).show();
	
}

function checkDisk(){
	if(document.all.CryptCtrl.object == null) {
	    flag=false;
	    Ext.Msg.alert('提示', '参考基础驱动及安全控件安装手册(2.1安全控件),进行控件的安装');
	   // alert('参考基础驱动及安全控件安装手册(2.1安全控件),进行控件的安装');
	    return "N";
	  }
	var rtn = openDevice();
	if(rtn==0){/*
		var ret = CryptCtrl.GetCertInfo("",71);
		document.getElementById("nsrsbh").value=CryptCtrl.strResult;
		var ret = CryptCtrl.GetCertInfo("",69);
		//alert(CryptCtrl.strResult);
		document.getElementById("taxDiskNo").value=CryptCtrl.strResult;
		//alert(CryptCtrl.strResult);
		
	   */
		return "Y";	
	}else{
	    flag=false;
	    Ext.Msg.alert('提示', '请检查税控盘(金税盘)是否插入，如果插入请安装金税盘或税控盘驱动，参考基础驱动及安全控件安装手册（2.2使用航天信息金报税盘或2.2使用百旺金赋税控盘）。如果没有插入，则将税控盘(金税盘)插好后重新加载该页面！');
	   // alert('请检查税控盘(金税盘)是否插入，如果插入请安装金税盘或税控盘驱动，参考基础驱动及安全控件安装手册（2.2使用航天信息金报税盘或2.2使用百旺金赋税控盘）。如果没有插入，则将税控盘(金税盘)插好后重新加载该页面！');
	    //callBack();
	    return "N";
	    /* if(rtn==167){
	      $("#skpqdazqk").text("未安装");
	    }
	    if(rtn==187){
	      $("#skpqdazqk").text("未安装");

	    } */
	  }	
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {
	var k;
	if (this == null) {
	throw new TypeError('"this" is null or not defined');
	}
	var O = Object(this);
	var len = O.length >>> 0;
	if (len === 0) {
	return -1;
	}
	var n = +fromIndex || 0;
	if (Math.abs(n) === Infinity) {
	n = 0;
	}
	if (n >= len) {
	return -1;
	}
	k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
	while (k < len) {
	if (k in O && O[k] === searchElement) {
	return k;
	}
	k++;
	}
	return -1;
	};
	}
function setDeviceParam(r) {
	0 != CryptCtrl.IsDeviceOpened() && CryptCtrl.CloseDevice(), CryptCtrl.strContainer = "", userPasswd = r
}
function openDevice(r) {
	return setDeviceParam(r), 0 != CryptCtrl.IsDeviceOpened() && CryptCtrl.CloseDevice(), CryptCtrl.OpenDeviceEx(userPasswd), 87 == CryptCtrl.ErrCode && CryptCtrl.OpenDeviceEx(userPasswd), 0 != CryptCtrl.ErrCode && CryptCtrl.ErrCode != -1 ? (CryptCtrl.ErrMsg, CryptCtrl.ErrCode) : (devicePort = CryptCtrl.strContainer, CryptCtrl.ErrCode)
}
var serverPacket = "",
clientAuthCode = "",
serverRandom = "",
operType = "",
//userId = "",
userPasswd = "",
deviceType = "",
devicePort = "",
userName = "",
clientPubKey = "",
sysName = "",
sysCode = "",
userAccount = "",
userPin = "",
strContainer = "",
strProvider = "",
nProvType = 1;
//将对象元素转换成字符串以作比较  
function obj2key(obj, keys){  
    var n = keys.length,  
        key = [];  
    while(n--){  
        key.push(obj[keys[n]]);  
    }  
    return key.join('|');  
}  

function gxUnSuccessdetail(text){
	text=text.replace(/~/g,'<br>');
	Ext.onReady(function() {
		Ext.create('Ext.window.Window', {
			target: 'gxUnSuccessdetail',
		    title: '<span style="color: red;">操作失败明细</span>',
		    height: '50%',
		    width: '50%',
		    autoHide: false,
		    autoScroll : true,
		    closable: true,
		    draggable: true,
		    modal:true,
		    id: 'applyTip',
		    html:text,
		    style: {
		    	background: '#F6F6F6'
		    }
		}).show();
	})
}
//去重操作  
function uniqeByKeys(array,keys){  
    var arr = [];  
    var hash = {};  
    for (var i = 0, j = array.length; i < j; i++) {  
        var k = obj2key(array[i], keys);  
        if (!(k in hash)) {  
            hash[k] = true;  
            arr .push(array[i]);  
        }  
    }  
    console.log(arr);
    return arr ;  
}
//解决 IE8 不支持console
window.console = window.console || (function () {
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
    = c.clear = c.exception = c.trace = c.assert = function () { };
    return c;
})();