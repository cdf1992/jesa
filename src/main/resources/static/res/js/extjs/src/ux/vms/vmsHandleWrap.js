/**
 * jpt公共处理方法类
 * @author Lan
 * 2017-5-15
 */
 
 	 Ext.define("Ext.ux.vms.vmsHandleWrap", {
 	 	alias: 'Ext.ux.vms.vmsHandleWrap'
 	 	 })

/**
 * //进项发票grid中勾选的所有值封装
 * @param {} gridId grid的id
 */
var inputBillCheckGrid=function (gridId,data){
	var params = {};
	var list = new Array();
	for(var i=0;i<data.length;i++){
		/**
		 * 将每一行获取的数据保存到集合中
		 */
		//发票Id
		params['jibiBillId'] = data[i].get('jibiBillId');
		//查验状态
		params['jibiCheckStatus'] = data[i].get('jibiCheckStatus');
		//发票类型
		params['jibiBillType'] = data[i].get('jibiBillType');
		//发票代码
		params['jibiBillCode'] = data[i].get('jibiBillCode');
		//发票号码
		params['jibiBillNo'] = data[i].get('jibiBillNo');
		//发票状态
		params['jibiBillSatatus'] = data[i].get('jibiBillSatatus');
		//开票时间
		params['jibiBillDate'] = data[i].get('jibiBillDate');
		//不含税金额
		params['jibiAmountIncome'] = data[i].get('jibiAmountIncome');
		//价税合计（含税金额）
		params['jibiAmountTotal'] = data[i].get('jibiAmountTotal');
		//校验码
		params['jibiCheckNo'] = data[i].get('jibiCheckNo');
		//数据录入方式（采集方式）
		params['jibiCollectType'] = data[i].get('jibiCollectType');
		//录入日期（采集时间）
		params['jibiCollectDate'] = data[i].get('jibiCollectDate');
		//税额
		params['jibiAmountTax'] = data[i].get('jibiAmountTax');
		//购方名称
		params['jibiBuyerName'] = data[i].get('jibiBuyerName');
		//销方名称
		params['jibiSellerName'] = data[i].get('jibiSellerName');
		//机器编码
		params['jibiMachineNo'] = data[i].get('jibiMachineNo');
		//底账标识
		params['jibiOriginalAccount'] = data[i].get('jibiOriginalAccount');
		//底账获取时间
		params['jibiOriginalGetDate'] = data[i].get('jibiOriginalGetDate');
		//勾选状态
		params['jibiChosenStatus'] = data[i].get('jibiChosenStatus');
		//勾选日期
		params['jibiChosenDate'] = data[i].get('jibiChosenDate');
		//认证状态
		params['jibiAuthenticationStatus'] = data[i].get('jibiAuthenticationStatus');
		//认证日期
		params['jibiAuthenticationDate'] = data[i].get('jibiAuthenticationDate');
		//认证月份
		params['jibiAuthenticationMonth'] = data[i].get('jibiAuthenticationMonth');
		//是否扫描认证
		params['jibiScanFlag'] = data[i].get('jibiScanFlag');
		//最晚认证日期
		params['jibiDeductionDeadline'] = data[i].get('jibiDeductionDeadline');
		//备注
		params['jibiRemark'] = data[i].get('jibiRemark');
		//购方地址电话
		params['jibiBuyerAddpho'] = data[i].get('jibiBuyerAddpho');
		//购方税号
		params['jibiBuyerTaxno'] = data[i].get('jibiBuyerTaxno');
		//购方银行账号
		params['jibiBuyerBankAccount'] = data[i].get('jibiBuyerBankAccount');
		//销方地址电话
		params['jibiSellerAddpho'] = data[i].get('jibiSellerAddpho');
		//销方税号
		params['jibiSellerTaxno'] = data[i].get('jibiSellerTaxno');
		//销方银行账号
		params['jibiSellerBankAccount'] = data[i].get('jibiSellerBankAccount');
		//购方机构
		params['jibiBuyerInstid'] = data[i].get('jibiBuyerInstid');
		//采集者
		params['jibiCreater'] = data[i].get('jibiCreater');
		//将集合保存到list数组中
		list.push(params);
		//清空集合中的每行数据保存结果
		params = {};
	}
	return list;
}

 /**
 * 千分位标识
 * @param {} n
 * @return {}
 */
var numberToCurrency=function (n){
    Ext.util.Format.thousandSeparator= ',';
    Ext.util.Format.decimalSeparator='.';
    return Ext.util.Format.number(n, '0,000.00');
}
 /**
 * 解除千分位标识
 * @param {} s
 * @return {}
 */
 var currencyToNumber=function currencyToNumber(s){
    return s.replace(/,/g,"");
}
 /**
 * 将yyyymmdd 转换为yyyy-mm-dd
 * @param {} value
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
function toLocalTime(timestamp){
	var date = new Date(timestamp); 
	Y = date.getFullYear() + '-';
	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	D = (date.getDate()+1 < 10 ? '0'+(date.getDate()) : date.getDate()) ;
	var time = Y+M+D;

	return time;

}
//替换所有字符
String.prototype.replaceAll = function(s1,s2){
	　return this.replace(new RegExp(s1,"gm"),s2);
	}	


/** 
 * JSON 值可以是： 
 * 数字（整数或浮点数） 
 * 字符串（在双引号中） 
 * 逻辑值（true 或 false） 
 * 数组（在方括号中） 
 * 对象（在花括号中） 
 * null 
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


//检验文件格式
function checkExcelType(file){
	var index1=file.lastIndexOf(".");
	var index2=file.length;
	var suffix=file.substring(index1+1,index2);//后缀名
	if(suffix=='xlsx' || suffix=='xls'){
		return true;
	} else {
		return false;
	}
}