/**
 * 票样明细类
 * 
 * @type String
 */
Ext.define("Ext.ux.vms.bill.showBillTemplate", {
	alias : 'Ext.ux.vms.bill.showBillTemplate'
})

/**
 * 销项调用方法
 * 
 * @param {}
 *            grid
 * @param {}
 *            rowIndex
 */

var DX = function (num) {
      var strOutput = "";  
	  var strUnit = '仟佰拾亿仟佰拾万仟佰拾圆角分';  
	  num += "00";  
	  var intPos = num.indexOf('.');  
	  if (intPos >= 0)  
	    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);  
	  strUnit = strUnit.substr(strUnit.length - num.length);  
	  for (var i=0; i < num.length; i++)  
	    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);  
	    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+圆/, '圆').replace(/亿零{0,3}万/, '亿').replace(/^圆/, "零圆"); 
	};
	
var format=function  (num) {
	if(num!=undefined){
		return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
	}else{
		return '0.00';
	}
}

function getBillType(typeCode, digitizing){
	if(typeCode == "Z"){
		return "专用";
	}else{
		if(digitizing == "Y"){
			return "电子";
		}else{
			return "普通"
		}
	}
}

function convertDate(val){
	var reVal = '';
	if(null != val && val.length > 0){
		var d = new Date(val);
		reVal = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
	}else{
		reVal = '    年  月  日'
	}
	return reVal;
	}

var VMSOutPutBillInfoDetail = function(invoice,stateCode, url) {
	var invoiceType = getBillType(invoice.billType,invoice.digitizing);
	var controlState = invoice.controlState;
	var goodsList;
	var goods = [];
	var params = new Object();
	params["id"] = invoice.id;
	params["stateCode"] = stateCode;
	Ext.Ajax.request({
		url: url,
		async:false,
		params:{params:JSON.stringify(params)},
		success:function(response){
			goodsList = Ext.decode(response.responseText).dataList;
		}
	});
	var sumIncome = 0;
	var sumTax = 0;
	for(var i=0;i<11;i++){
		goods["goodsName"+parseInt(i+1)]=[];
		goods["model"+parseInt(i+1)]=[];
		goods["unit"+parseInt(i+1)]=[];
		goods["quantity"+parseInt(i+1)]=[];
		goods["unitPrice"+parseInt(i+1)]=[];
		goods["income"+parseInt(i+1)]=[];
		goods["taxRate"+parseInt(i+1)]=[];
		goods["tax"+parseInt(i+1)]=[];
	}
	if(invoice.inventory == 'N'){
		if(goodsList.length>0){
			for(var i=0;i<goodsList.length;i++){
			 var itemObj = goodsList[i];
			 //商品名称
			  goods["goodsName"+parseInt(i+1)]=itemObj.goodsName;
			  //规格型号
			  goods["model"+parseInt(i+1)]=itemObj.model;
			  //计量单位
			  goods["unit"+parseInt(i+1)]=itemObj.unit;
			  //数量
			  goods["quantity"+parseInt(i+1)]=itemObj.quantity;
			  //单价
			  goods["unitPrice"+parseInt(i+1)]=itemObj.unitPrice;
			  //金额
			  goods["income"+parseInt(i+1)]=itemObj.income;
			   //税率
			  if(itemObj.taxRate){
			  	goods["taxRate"+parseInt(i+1)]=parseFloat(itemObj.taxRate)*100+"%";
			  }
			   //税额
			  goods["tax"+parseInt(i+1)]=itemObj.tax;
			  //合计金额
			  sumIncome+=parseFloat(itemObj.income==null?0:itemObj.income);
			  //合计税额
			  sumTax+=parseFloat(itemObj.tax==null?0:itemObj.tax);
			  
			 //console.log( itemObj);
			}
			sumIncome = sumIncome.toFixed(2);
			sumTax = sumTax.toFixed(2);
		}
	}else{
		goods["goodsName1"] = "详见清单";
		sumIncome = invoice.income;
		sumTax = invoice.tax;
	}
	var total = Number((Number(invoice.income) + Number(invoice.tax)).toFixed(2));
	var myWin=Ext.create('Ext.window.Window', {
        extend : 'Ext.window.Window',
        modal:true,//设置是否添加遮罩
        height : 560,
		width : 1050,
		layout : 'fit',
		draggable:true,//拖动
		resizable:false,	//变大小	
		autoScroll:false,
		title:'查看票样',
		bodyStyle : 'overflow-x:hidden; overflow-y:scroll',
		items:{
			xtype : 'form',
			layout:'column',
			frame : true,
			bodyStyle:'background:url(res/img/piaoyang2.png) no-repeat;',
			items : [
				{
					xtype : 'fieldset',
					name : 'buff',
					width:1000,
					height:40,
					layout:'column',
					style:{
		           		'position': 'relative',
		           		'left':'10px',
		           		'top':'0px',
		           		'background-color':'dodgerblue',
		           		'color':'white'
					},
					items:[
						{
							xtype: "button",  
				            width:90,  
				            height:40,  
				            text:'<span style="font-size:16px;">关闭</span>',
				            style:{
				           		'position': 'relative',
				           		'left':'720px',
				           		'top':'0px',
				           		 'color':'white'
				            },
				            handler:function(){
				            	myWin.close();
				            }
						}
					]
				},{
					//发票类型
					xtype : 'tbtext',
	        			text:'增值税'+invoiceType+'发票',
	        			 style:{
	        			 'align':'center',
		           		 'position': 'relative',
		           		 'left':'440px',
		           		 'top':'0px',
		           		 'color':'dodgerblue',
		           		 'font-size': '15px'
		           }
				},{
					//发票代码
					xtype : 'label',
					height:70,
					width:270,
					autoSize:false,
					dock:'fill',
						text:invoice.billCode,//发票代码
	        			 style:{
		           		'position': 'relative',
		           		'left':'-50px',
		           		'margin-left':'30px',
		           		'top':'23px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '15px'
		           }
				},{
					//发票号码
					xtype : 'label',
					height:70,
					width:270,
					autoSize:false,
					dock:'fill',
						text:invoice.billNo, //发票号码
	        			 style:{
		           		'position': 'relative',
		           		'left':'-148px',
		           		'top':'23px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '15px'
		           }
				},{
					//开票日期
					xtype : 'label',
					height:70,
					width:270,
					autoSize:false,
					dock:'fill',
						text:convertDate(invoice.offerDate),//开票日期
	        			 style:{
		           		'position': 'relative',
		           		'left':'-260px',
		           		'top':'23px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '15px'
		           }
				},{
					//校检码
					xtype : 'label',
					height:70,
					width:270,
					autoSize:false,
					dock:'fill',
						//text:vmsBillInfo.jibiCheckNo,//校检码
	        			 style:{
		           		'position': 'relative',
		           		'left':'560px',
		           		'top':'23px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '15px'
		           }
				},{
					//机器编码
					xtype : 'label',
					height:70,
					width:270,
					autoSize:false,
					dock:'fill',
						//text:vmsBillInfo.machineNo,//机器编码
	        			 style:{
		           		'position': 'relative',
		           		'left':'545px',
		           		'top':'23px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '15px'
		           }
				},{
					//购方名称
					xtype : 'label',
					height:70,
					width:400,
					autoSize:false,
					dock:'fill',
						text:invoice.buyerName,//购买方名称
	        			 style:{
		           		'position': 'relative',
		           		'left':'-382px',
		           		'top':'-20px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '15px'
		           }
				},{
					//购买方纳税人识别号
					xtype : 'label',
					height:70,
					width:400,
					autoSize:false,
					dock:'fill',
						text:invoice.buyerTaxNo,//购买方纳税人识别号
	        			 style:{
		           		'position': 'relative',
		           		'left':'160px',
		           		'top':'-65px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '15px'
		           }
				},{
					//购买方地址、电话
					xtype : 'label',
					height:70,
					width:400,
					autoSize:false,
					dock:'fill',
					id:'goufangP',
						text:invoice.sellerContactInfo,//购买方地址、电话
	        			 style:{
		           		'position': 'relative',
		           		'left':'-242px',
		           		'top':'-40px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '14px'
		           }
				},{
					//购买方开户行及账户
					xtype : 'label',
					height:70,
					width:400,
					autoSize:false,
					dock:'fill',
						text:invoice.buyerAccountInfo,//开户行及账户
	        			 style:{
		           		'position': 'relative',
		           		'left':'158px',
		           		'top':'-86px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '15px'
		           }
				},{
					//密码区
					xtype : 'label',
					height:70,
					width:370,
					autoSize:false,
					dock:'fill',
						//text:'密码区',
	        			 style:{
		           		'position': 'relative',
		           		'left':'210px',
		           		'top':'-155px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '16px'
		           }
				},{
					//货物或应税劳务名称
					xtype : 'label',
					height:70,
					width:280,
					autoSize:false,
					dock:'fill',
					//text:jptBillInfoDetail.jibdGoodsName,//货物或应税劳务名称
					text:goods.goodsName1,
//	        		style:{
//		           		'position': 'relative',
//		           		'left':'28px',
//		           		'top':'-350px',
//		           		 'color':'dodgerblue',
//		           		 'border':'0px',
//		           		 'word-break':'break-all',
//		           		 'word-wrap':'break-word',
//		           		 'font-size': '12px'
//		           }
					style:{
		           		'position': 'relative',
		           		'left':'28px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//规格型号
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					dock:'fill',
					text:goods.model1,
	        			 style:{
		           		'position': 'relative',
		           		'left':'40px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//单位
					xtype : 'label',
					height:70,
					width:40,
					autoSize:false,
					dock:'fill',
					text:goods.unit1,
	        			 style:{
		           		'position': 'relative',
		           		'left':'50px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//数量
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					text:goods.quantity1,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'65px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				
				},{
					//单价
					xtype : 'label',
					height:70,
					width:90,
					autoSize:false,
					text:goods.unitPrice1,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'75px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//金额
					xtype : 'label',
					height:70,
					width:135,
					autoSize:false,
					text:goods.income1,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'85px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税率
					xtype : 'label',
					height:70,
					width:50,
					autoSize:false,
					text:goods.taxRate1,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'86px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税额
					xtype : 'label',
					height:70,
					width:145,
					text:goods.tax1,
					autoSize:false,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'90px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//货物或应税劳务名称
					xtype : 'label',
					height:70,
					width:280,
					autoSize:false,
					dock:'fill',
					//text:jptBillInfoDetail.jibdGoodsName,//货物或应税劳务名称
					text:goods.goodsName2,
					style:{
		           		'position': 'relative',
		           		'left':'28px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//规格型号
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					dock:'fill',
					text:goods.model2,
	        			 style:{
		           		'position': 'relative',
		           		'left':'40px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//单位
					xtype : 'label',
					height:70,
					width:40,
					autoSize:false,
					dock:'fill',
					text:goods.unit2,
	        			 style:{
		           		'position': 'relative',
		           		'left':'50px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//数量
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					text:goods.quantity2,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'65px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				
				},{
					//单价
					xtype : 'label',
					height:70,
					width:90,
					autoSize:false,
					text:goods.unitPrice2,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'75px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//金额
					xtype : 'label',
					height:70,
					width:135,
					autoSize:false,
					text:goods.income2,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'85px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税率
					xtype : 'label',
					height:70,
					width:50,
					autoSize:false,
					text:goods.taxRate2,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'86px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税额
					xtype : 'label',
					height:70,
					width:145,
					text:goods.tax2,
					autoSize:false,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'90px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//货物或应税劳务名称
					xtype : 'label',
					height:70,
					width:280,
					autoSize:false,
					dock:'fill',
					//text:jptBillInfoDetail.jibdGoodsName,//货物或应税劳务名称
					text:goods.goodsName3,
					style:{
		           		'position': 'relative',
		           		'left':'28px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//规格型号
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					dock:'fill',
					text:goods.model3,
	        			 style:{
		           		'position': 'relative',
		           		'left':'40px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//单位
					xtype : 'label',
					height:70,
					width:40,
					autoSize:false,
					dock:'fill',
					text:goods.unit3,
	        			 style:{
		           		'position': 'relative',
		           		'left':'50px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//数量
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					text:goods.quantity3,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'65px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				
				},{
					//单价
					xtype : 'label',
					height:70,
					width:90,
					autoSize:false,
					text:goods.unitPrice3,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'75px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//金额
					xtype : 'label',
					height:70,
					width:135,
					autoSize:false,
					text:goods.income3,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'85px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税率
					xtype : 'label',
					height:70,
					width:50,
					autoSize:false,
					text:goods.taxRate3,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'86px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税额
					xtype : 'label',
					height:70,
					width:145,
					text:goods.tax3,
					autoSize:false,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'90px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//货物或应税劳务名称
					xtype : 'label',
					height:70,
					width:280,
					autoSize:false,
					dock:'fill',
					//text:jptBillInfoDetail.jibdGoodsName,//货物或应税劳务名称
					text:goods.goodsName4,
					style:{
		           		'position': 'relative',
		           		'left':'28px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//规格型号
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					dock:'fill',
					text:goods.model4,
	        			 style:{
		           		'position': 'relative',
		           		'left':'40px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//单位
					xtype : 'label',
					height:70,
					width:40,
					autoSize:false,
					dock:'fill',
					text:goods.unit4,
	        			 style:{
		           		'position': 'relative',
		           		'left':'50px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//数量
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					text:goods.quantity4,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'65px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				
				},{
					//单价
					xtype : 'label',
					height:70,
					width:90,
					autoSize:false,
					text:goods.unitPrice4,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'75px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//金额
					xtype : 'label',
					height:70,
					width:135,
					autoSize:false,
					text:goods.income4,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'85px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税率
					xtype : 'label',
					height:70,
					width:50,
					autoSize:false,
					text:goods.taxRate4,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'86px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税额
					xtype : 'label',
					height:70,
					width:145,
					text:goods.tax4,
					autoSize:false,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'90px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//货物或应税劳务名称
					xtype : 'label',
					height:70,
					width:280,
					autoSize:false,
					dock:'fill',
					//text:jptBillInfoDetail.jibdGoodsName,//货物或应税劳务名称
					text:goods.goodsName5,
					style:{
		           		'position': 'relative',
		           		'left':'28px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//规格型号
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					dock:'fill',
					text:goods.model5,
	        			 style:{
		           		'position': 'relative',
		           		'left':'40px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//单位
					xtype : 'label',
					height:70,
					width:40,
					autoSize:false,
					dock:'fill',
					text:goods.unit5,
	        			 style:{
		           		'position': 'relative',
		           		'left':'50px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//数量
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					text:goods.quantity5,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'65px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				
				},{
					//单价
					xtype : 'label',
					height:70,
					width:90,
					autoSize:false,
					text:goods.unitPrice5,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'75px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//金额
					xtype : 'label',
					height:70,
					width:135,
					autoSize:false,
					text:goods.income5,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'85px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税率
					xtype : 'label',
					height:70,
					width:50,
					autoSize:false,
					text:goods.taxRate5,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'86px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税额
					xtype : 'label',
					height:70,
					width:145,
					text:goods.tax5,
					autoSize:false,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'90px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//货物或应税劳务名称
					xtype : 'label',
					height:70,
					width:280,
					autoSize:false,
					dock:'fill',
					//text:jptBillInfoDetail.jibdGoodsName,//货物或应税劳务名称
					text:goods.goodsName6,
					style:{
		           		'position': 'relative',
		           		'left':'28px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//规格型号
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					dock:'fill',
					text:goods.model6,
	        			 style:{
		           		'position': 'relative',
		           		'left':'40px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//单位
					xtype : 'label',
					height:70,
					width:40,
					autoSize:false,
					dock:'fill',
					text:goods.unit6,
	        			 style:{
		           		'position': 'relative',
		           		'left':'50px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//数量
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					text:goods.quantity6,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'65px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				
				},{
					//单价
					xtype : 'label',
					height:70,
					width:90,
					autoSize:false,
					text:goods.unitPrice6,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'75px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//金额
					xtype : 'label',
					height:70,
					width:135,
					autoSize:false,
					text:goods.income6,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'85px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税率
					xtype : 'label',
					height:70,
					width:50,
					autoSize:false,
					text:goods.taxRate6,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'86px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税额
					xtype : 'label',
					height:70,
					width:145,
					text:goods.tax6,
					autoSize:false,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'90px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//货物或应税劳务名称
					xtype : 'label',
					height:70,
					width:280,
					autoSize:false,
					dock:'fill',
					//text:jptBillInfoDetail.jibdGoodsName,//货物或应税劳务名称
					text:goods.goodsName7,
					style:{
		           		'position': 'relative',
		           		'left':'28px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//规格型号
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					dock:'fill',
					text:goods.model7,
	        			 style:{
		           		'position': 'relative',
		           		'left':'40px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//单位
					xtype : 'label',
					height:70,
					width:40,
					autoSize:false,
					dock:'fill',
					text:goods.unit7,
	        			 style:{
		           		'position': 'relative',
		           		'left':'50px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//数量
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					text:goods.quantity7,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'65px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				
				},{
					//单价
					xtype : 'label',
					height:70,
					width:90,
					autoSize:false,
					text:goods.unitPrice7,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'75px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//金额
					xtype : 'label',
					height:70,
					width:135,
					autoSize:false,
					text:goods.income7,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'85px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税率
					xtype : 'label',
					height:70,
					width:50,
					autoSize:false,
					text:goods.taxRate7,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'86px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税额
					xtype : 'label',
					height:70,
					width:145,
					text:goods.tax7,
					autoSize:false,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'90px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//货物或应税劳务名称
					xtype : 'label',
					height:70,
					width:280,
					autoSize:false,
					dock:'fill',
					//text:jptBillInfoDetail.jibdGoodsName,//货物或应税劳务名称
					text:goods.goodsName8,
					style:{
		           		'position': 'relative',
		           		'left':'28px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//规格型号
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					dock:'fill',
					text:goods.model8,
	        			 style:{
		           		'position': 'relative',
		           		'left':'40px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//单位
					xtype : 'label',
					height:70,
					width:40,
					autoSize:false,
					dock:'fill',
					text:goods.unit8,
	        			 style:{
		           		'position': 'relative',
		           		'left':'50px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//数量
					xtype : 'label',
					height:70,
					width:80,
					autoSize:false,
					text:goods.quantity8,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'65px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				
				},{
					//单价
					xtype : 'label',
					height:70,
					width:90,
					autoSize:false,
					text:goods.unitPrice8,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'75px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//金额
					xtype : 'label',
					height:70,
					width:135,
					autoSize:false,
					text:goods.income8,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'85px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税率
					xtype : 'label',
					height:70,
					width:50,
					autoSize:false,
					text:goods.taxRate8,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'86px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//税额
					xtype : 'label',
					height:70,
					width:145,
					text:goods.tax8,
					autoSize:false,
					dock:'fill',
	        			 style:{
		           		'position': 'relative',
		           		'left':'90px',
		           		'top':'-110px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '12px'
		           }
				},{
					//合计金额
					xtype : 'label',
					height:70,
					width:135,
					text:sumIncome,
					autoSize:false,
					dock:'fill',
	        			 style:{
		           		'position': 'absolute',
		           		'left':'660px',
		           		'top':'305px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '16px'
		           }
				},{
					//合计税额
					xtype : 'label',
					height:70,
					width:135,
					text:sumTax,
					autoSize:false,
					dock:'fill',
	        			 style:{
		           		'position': 'absolute',
		           		'left':'850px',
		           		'top':'305px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '16px'
		           }
				},{
					//价税合计(大写)
					xtype : 'label',
					height:70,
					width:300,
					autoSize:false,
					dock:'fill',
					text:DX(total),//价税合计(大写)
	        			 style:{
		           		'position': 'absolute',
		           		'left':'320px',
		           		'top':'325px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '16px'
		           }
				},{
					//价税合计(小写)
					xtype : 'label',
					height:70,
					width:230,
					autoSize:false,
					dock:'fill',
					text:"￥"+format(total),//价税合计(小写)
	        			 style:{
		           		'position': 'absolute',
		           		'left':'730px',
		           		'top':'325px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '16px'
		           }
				},{
					//销方名称
					xtype : 'label',
					height:70,
					width:400,
					autoSize:false,
					dock:'fill',
						text:invoice.sellerName,//销方名称
	        			 style:{
		           		'position': 'absolute',
		           		'left':'155px',
		           		'top':'356px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '16px'
		           }
				
				},{
					//销方纳税人识别号
					xtype : 'label',
					height:70,
					width:400,
					autoSize:false,
					dock:'fill',
						text:invoice.sellerTaxNo,//销方纳税人识别号
	        			 style:{
		           		'position': 'absolute',
		           		'left':'155px',
		           		'top':'385px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '16px'
		           }
				
				},{
					//销方地址、电话
					xtype : 'label',
					height:70,
					width:400,
					autoSize:false,
					dock:'fill',
						text:invoice.sellerContactInfo,//销方地址、电话
	        			 style:{
		           		'position': 'absolute',
		           		'left':'155px',
		           		'top':'416px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '16px'
		           }
				
				},{
					//销方开户行及账号
					xtype : 'label',
					height:70,
					width:400,
					autoSize:false,
					dock:'fill',
					text:invoice.sellerAccountInfo,//销方开户行及账号
	        			 style:{
		           		'position': 'absolute',
		           		'left':'155px',
		           		'top':'446px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '16px'
		           }
				},{
					//备注
					xtype : 'label',
					height:70,
					width:370,
					autoSize:false,
					dock:'fill',
						text:invoice.remark,//备注
	        			 style:{
		           		'position': 'absolute',
		           		'left':'612px',
		           		'top':'396px',
		           		 'color':'dodgerblue',
		           		 'border':'0px',
		           		 'word-break':'break-all',
		           		 'word-wrap':'break-word',
		           		 'font-size': '16px'
		           }
				}
			]
		}
	}).show();
}

function buttonPrinter(){
	//goodsInformation.hidden();
	//window.document.body.innerHTML=window.document.getElementById("goodsList-body").innerHTML;
   // window.print();
   // window.close();
    //var newstr = document.getElementById("goodsList-body").innerHTML;
   // var oldstr = document.body.innerHTML;
   // document.body.innerHTML = newstr;
    //window.print();
   // document.body.innerHTML = oldstr;
    //window.location.reolad();
   // return false; 
    var dayinc = '';
	dayinc += '<meta charset="UTF-8">';
	dayinc += '<style>';
	dayinc += 'table {table-layout:fixed;}';
	dayinc += 'td {padding-top:5px; padding-bottom:5px;word-wrap:break-word;}';
	dayinc += '</style>';
	dayinc += '<div id="printBox" style="width:750px; height:750px;text-align:center">';
	dayinc += '<div style="margin: 10px auto;  width:410px; font-size:20px;">';
	dayinc += '销售货物或提供应税劳务清单</div>';
	dayinc += '<div style="clear:both; margin:15px auto;">';
	dayinc += '<span style="float:left;">购买方名称：'+invoice.customerName+'</span>';
	dayinc += '</div>';
	dayinc += '<div style="clear:both; margin:15px auto;">';
	dayinc += '<span style="float:left;">销售方名称：'+invoice.name+'</span>';
	dayinc += '</div>';
	dayinc += '<div style=" clear:both; margin:15px auto;">';
	dayinc += '<span style="float:left;">发票代码：'+invoice.billCode+'</span>';
	dayinc += '                                                      ';
	dayinc += '<span>发票号码:'+invoice.billNo+'</span>';
	//dayinc += '<span style="float:right;">日期：</span>';
	dayinc += '</div>';
	dayinc += '<div style=" clear:both;">';
	dayinc += '<table border="1" style="border-collapse:collapse; width:750px;">';
	dayinc += '<tr>';
	dayinc += '<td style="width: 50px;text-align:center;">序号</td>';
	dayinc += '<td style="width: 180px;text-align:center;">货物(劳务)名称</td>';
	dayinc += '<td style="width: 100px;text-align:center;">规格型号</td>';
	dayinc += '<td style="width: 50px;text-align:center;">单位</td>';
	dayinc += '<td style="width: 100px;text-align:center;">数量</td>';
	dayinc += '<td style="width: 100px;text-align:center;">单价</td>';
	dayinc += '<td style="width: 100px;text-align:center;">金额(元)</td>';
	dayinc += '<td style="width: 50px;text-align:center;">税率</td>';
	dayinc += '<td style="width: 100px;text-align:center;">税额(元)</td>';
	dayinc += '</tr>';
	for (i=0;i<vmsBillInfoDetails.length;i++) {
		dayinc += '<tr>';
	dayinc += '<td style="width:50px;text-align:center;">'+(i+1)+'</td>';
	dayinc += '<td style="width:35px;text-align:center;">'+vmsBillInfoDetails[i].goodsName+'</td>';
	dayinc += '<td style="width:35px;text-align:center;">'+vmsBillInfoDetails[i].specandmodel+'</td>';
	dayinc += '<td style="width:70px;text-align:center;">'+vmsBillInfoDetails[i].goodsUnit+'</td>';
	dayinc += '<td style="width:70px;text-align:center;">'+vmsBillInfoDetails[i].goodsNo+'</td>';
	dayinc += '<td style="width:100px;text-align:center;">'+vmsBillInfoDetails[i].goodsPrice+'</td>';
	dayinc += '<td style="width:85px;text-align:center;">'+vmsBillInfoDetails[i].amt+'</td>';
	dayinc += '<td style="width:120px;text-align:center;">'+vmsBillInfoDetails[i].taxRate+'</td>';
	dayinc += '<td style="width:100px;text-align:center;">'+vmsBillInfoDetails[i].taxAmt+'</td>';
	dayinc += '</tr>';
	}
	dayinc += '</table>';
	dayinc += '</div>';
	dayinc += '</div>';
	var wind = window.open("",'newwindow');
	wind.document.body.innerHTML = dayinc;
	wind.print();  
	wind.close();
}