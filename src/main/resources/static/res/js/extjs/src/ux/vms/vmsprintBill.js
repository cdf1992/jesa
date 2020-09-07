Ext.define("Ext.ux.vms.vmsprintBill", {
 	
	 	alias: 'Ext.ux.vms.vmsprintBill'
	 	 })

var flag="";  //标志，区分进项和销项
var billId="";  //发票Id
var gName="";   //购方名称
var xName="";   //销方名称
var billCode="";  //所属增值税普通发票代码
var number ="";  //号码
var taxSum=0;  //合计金额
 var taxAmountSum=0;  //合计税额
var jptBillInfoDetails=new Array();   //接收的商品列表
var goods=[];    //保存的商品列表
var goodsName="";
var taxAmountSumText="";
var taxSumText="";
var jptBillInfo=null;
//var billId=$!{billId.encodeJson};
var printM=function(billId){
 	flag="input";
	Ext.Ajax.request({
		url:'findJptInputBillInfoDetail.ajax',
		async:false,
		params:{
			billId:billId
		},
		success:function(response){
			var obj=Ext.decode(response.responseText);
			
			 jptBillInfo=obj.jptBillInfo;    //进项发票信息
			 xName=jptBillInfo.jibiSellerName;
			 gName=jptBillInfo.jibiBuyerName;
			 billCode=jptBillInfo.jibiBillCode;
			 number=jptBillInfo.jibiBillNo;
			  billId=jptBillInfo.jibiBillId;
			 jptBillInfoDetails=obj.jptBillInfoDetail;  //进项发票明细
		}
	});
	//alert(jptBillInfoDetails);
	//console.log(jptBillInfo);
	if(jptBillInfoDetails.length>8){
		goodsName='<a href="#" style="font-size:16px" onclick="outList(flag,billId,gName,xName,billCode,number)">(详见销货清单)</a>'
	}else{
		if(jptBillInfoDetails.length>0){
			for(var i=0;i<jptBillInfoDetails.length;i++){
			 var itemObj = jptBillInfoDetails[i];
			 //商品名称
			  goods["goodsName"+parseInt(i+1)]=itemObj.jibdGoodsName;
			  //规格型号
			  goods["goodsType"+parseInt(i+1)]=itemObj.jibdGoodsType;
			  //计量单位
			  goods["goodsUnit"+parseInt(i+1)]=itemObj.jibdGoodsUnit;
			  //数量
			  goods["quantity"+parseInt(i+1)]=itemObj.jibdQuantity;
			  //单价
			  goods["price"+parseInt(i+1)]=itemObj.jibdPrice;
			  //金额
			  goods["amountTaxExc"+parseInt(i+1)]=itemObj.jibdAmountTaxExc;
			   //税率
			  if(itemObj.jibdTaxRate){
			  	goods["taxRate"+parseInt(i+1)]=parseFloat(itemObj.jibdTaxRate)*100+"%";
			  }
			  //goods["taxRate"+parseInt(i+1)]=itemObj.jibdTaxRate;
			   //税额
			  goods["amountTax"+parseInt(i+1)]=itemObj.jibdAmountTax;
			  //合计金额
			  taxSum+=parseFloat(itemObj.jibdAmountTaxExc);
			  //合计税额
			  taxAmountSum+=parseFloat(itemObj.jibdAmountTax);
			  
			 //console.log( itemObj);
			}
			taxSumText=parseFloat(taxSum).toFixed(2);
			taxAmountSumText=parseFloat(taxAmountSum).toFixed(2);
		}
		//console.log(goods)
		//console.log(goods.amountTax1)
		goodsName='';
	}
var myWin=Ext.create('Ext.window.Window', {
    extend : 'Ext.window.Window',
    modal:true,//设置是否添加遮罩
	height : 630,
	width : 1050,
	layout : 'fit',
	draggable:false,//拖动
		resizable:false,	//变大小	
	autoScroll:true,
	title:'查看明细',
	bodyStyle : 'overflow-x:hidden; overflow-y:scroll',
	/*modal:true,
	constrainHeader : true,*/
	items:{
			xtype : 'form',
		layout:'column',
		name:'form',										
		/*autoScroll : true,*/
		frame : true,
		bodyStyle:'background:url(res/img/piaoyang1.png) no-repeat;',
		items : [{
			//发票查验明细
			xtype : 'tbtext',
   			text:'发票查验明细',
   			 style:{
   			 'align':'center',
          		 'position': 'relative',
          		 'left':'10px',
          		 'top':'10px',
          		 'font-size': '20px'
          }
		},{
			xtype : 'fieldset',
			name : 'buff',
			width:1000,
			height:50,
			layout:'column',
			 style:{
          		'position': 'relative',
          		'left':'10px',
          		'top':'30px',
          		'background-color':'dodgerblue',
          		 'color':'white'
   			 },
			items:[
			{
			//查验时间
			xtype : 'tbtext',
   			text:'查验次数：第'+jptBillInfo.jibiCheckedLatestNo+'次',
   			 style:{
   			 'align':'center',
          		 'position': 'relative',
          		 'left':'10px',
          		 'top':'10px',
          		  'color':'white',
          		 'font-size': '20px',
          		 'color':'white'
          }
		
		
		},{
			//查验时间
			xtype : 'tbtext',
   			text:'查验时间：'+jptBillInfo.jibiCheckedLatestTime,
   			 style:{
   			 'align':'center',
          		 'position': 'relative',
          		 'left':'50px',
          		 'top':'10px',
          		  'color':'white',
          		 'font-size': '20px'
          }
		
		}]
		},{
			xtype : 'tbtext',
   			text:areaCodeContrast(jptBillInfo.jibiBillCode,jptBillInfo.jibiBillType)+'增值税'+billTypeValue(jptBillInfo.jibiBillType)+'发票',
   			 style:{
   			 'align':'center',
          		 'position': 'relative',
          		 'left':'440px',
          		 'top':'40px',
          		 'color':'dodgerblue',
          		 'font-size': '20px'
          }
		},{
			//发票代码
			xtype : 'label',
			height:70,
			width:270,
			autoSize:false,
			name:'jibiBillCode',
			
			dock:'fill',
				text:jptBillInfo.jibiBillCode,//发票代码
   			 style:{
          		'position': 'relative',
          		'left':'-100px',
          		'top':'85px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		},{
			//发票号码
			xtype : 'label',
			height:70,
			width:270,
			autoSize:false,
			name:'jibiBillNo',
			dock:'fill',
				text:jptBillInfo.jibiBillNo, //发票号码
   			 style:{
          		'position': 'relative',
          		'left':'-198px',
          		'top':'85px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		
		
		},{
			//开票日期
			xtype : 'label',
			height:70,
			width:270,
			autoSize:false,
			name:'jibiBillDate',
			dock:'fill',
				text:ConvertDateFromString(jptBillInfo.jibiBillDate),//开票日期
   			 style:{
          		'position': 'relative',
          		'left':'-310px',
          		'top':'85px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		
		},{
			//校检码
			xtype : 'label',
			height:70,
			width:270,
			autoSize:false,
			dock:'fill',
			name:'jibiCheckNo',
				text:jptBillInfo.jibiCheckNo,//校检码
   			 style:{
          		'position': 'relative',
          		'left':'610px',
          		'top':'15px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		},{
			//机器编码
			xtype : 'label',
			height:70,
			width:270,
			autoSize:false,
			name:'jibiMachineNo',
			dock:'fill',
				text:jptBillInfo.jibiMachineNo,//机器编码
   			 style:{
          		'position': 'relative',
          		'left':'595px',
          		'top':'15px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		},{
			//购买方名称
			xtype : 'label',
			height:70,
			width:400,
			autoSize:false,
			name:'jibiBuyerName',
			dock:'fill',
				text:jptBillInfo.jibiBuyerName,//购买方名称
   			 style:{
          		'position': 'relative',
          		'left':'-382px',
          		'top':'40px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		
		
		},{
			//购买方纳税人识别号
			xtype : 'label',
			height:70,
			width:400,
			autoSize:false,
			name:'jibiBuyerTaxno',
			dock:'fill',
				text:jptBillInfo.jibiBuyerTaxno,//购买方纳税人识别号
   			 style:{
          		'position': 'relative',
          		'left':'160px',
          		'top':'-5px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		
		},{
			//购买方地址、电话
			xtype : 'label',
			height:70,
			width:400,
			autoSize:false,
			name:'jibiBuyerAddpho',
			dock:'fill',
				text:jptBillInfo.jibiBuyerAddpho,//购买方地址、电话
   			 style:{
          		'position': 'relative',
          		'left':'-242px',
          		'top':'20px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		
		},{
			//开户行及账户
			xtype : 'label',
			height:70,
			width:400,
			autoSize:false,
			name:'jibiBuyerBankAccount',
			dock:'fill',
				text:jptBillInfo.jibiBuyerBankAccount,//开户行及账户
   			 style:{
          		'position': 'relative',
          		'left':'158px',
          		'top':'-22px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		
		
		},{
			//密码区
			xtype : 'label',
			height:70,
			width:370,
			autoSize:false,
			dock:'fill',
				text:'',
   			 style:{
          		'position': 'relative',
          		'left':'210px',
          		'top':'-95px',
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
			text:goods.goodsName1,//货物或应税劳务名称
			//text:'1111111111111111111111111',
			
			html:goodsName,
   			 style:{
          		'position': 'relative',
          		'left':'28px',
          		'top':'-50px',
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
			text:goods.goodsType1,
   			 style:{
          		'position': 'relative',
          		'left':'40px',
          		'top':'-50px',
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
			text:goods.goodsUnit1,
   			 style:{
          		'position': 'relative',
          		'left':'50px',
          		'top':'-50px',
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
          		'top':'-50px',
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
			text:goods.price1,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'75px',
          		'top':'-50px',
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
			text:goods.amountTaxExc1,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'85px',
          		'top':'-50px',
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
          		'top':'-50px',
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
			text:goods.amountTax1,
			autoSize:false,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'90px',
          		'top':'-50px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '12px'
          }
		
		},
			
		{
			//货物或应税劳务名称
			xtype : 'label',
			height:70,
			width:280,
			autoSize:false,
			dock:'fill',
			text:goods.goodsName2,//货物或应税劳务名称
			//html:goodsName,
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
			text:goods.goodsType2,
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
			text:goods.goodsUnit2,
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
			text:goods.price2,
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
			text:goods.amountTaxExc2,
			id:'',
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
			text:goods.amountTax2,
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
		
		},		
		{
			//货物或应税劳务名称
			xtype : 'label',
			height:70,
			width:280,
			autoSize:false,
			dock:'fill',
			//text:jptBillInfoDetail.jibdGoodsName,//货物或应税劳务名称
			text:goods.goodsName3,
			//html:goodsName,
   			 style:{
          		'position': 'relative',
          		'left':'28px',
          		'top':'-170px',
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
			text:goods.goodsType3,
   			 style:{
          		'position': 'relative',
          		'left':'40px',
          		'top':'-170px',
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
			text:goods.goodsUnit3,
   			 style:{
          		'position': 'relative',
          		'left':'50px',
          		'top':'-170px',
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
          		'top':'-170px',
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
			text:goods.price3,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'75px',
          		'top':'-170px',
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
			text:goods.amountTaxExc3,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'85px',
          		'top':'-170px',
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
          		'top':'-170px',
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
			text:goods.amountTax3,
			autoSize:false,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'90px',
          		'top':'-170px',
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
			//html:goodsName,
   			 style:{
          		'position': 'relative',
          		'left':'28px',
          		'top':'-230px',
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
			text:goods.goodsType4,
   			 style:{
          		'position': 'relative',
          		'left':'40px',
          		'top':'-230px',
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
			text:goods.goodsUnit4,
   			 style:{
          		'position': 'relative',
          		'left':'50px',
          		'top':'-230px',
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
          		'top':'-230px',
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
			text:goods.price4,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'75px',
          		'top':'-230px',
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
			text:goods.amountTaxExc4,
			id:'',
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'85px',
          		'top':'-230px',
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
          		'top':'-230px',
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
			text:goods.amountTax4,
			autoSize:false,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'90px',
          		'top':'-230px',
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
			//html:goodsName,
   			 style:{
          		'position': 'relative',
          		'left':'28px',
          		'top':'-290px',
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
			text:goods.goodsType5,
   			 style:{
          		'position': 'relative',
          		'left':'40px',
          		'top':'-290px',
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
			text:goods.goodsUnit5,
   			 style:{
          		'position': 'relative',
          		'left':'50px',
          		'top':'-290px',
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
          		'top':'-290px',
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
			text:goods.price5,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'75px',
          		'top':'-290px',
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
			text:goods.amountTaxExc5,
			id:'',
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'85px',
          		'top':'-290px',
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
          		'top':'-290px',
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
			text:goods.amountTax5,
			autoSize:false,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'90px',
          		'top':'-290px',
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
			//html:goodsName,
   			 style:{
          		'position': 'relative',
          		'left':'28px',
          		'top':'-350px',
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
			text:goods.goodsType6,
   			 style:{
          		'position': 'relative',
          		'left':'40px',
          		'top':'-350px',
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
			text:goods.goodsUnit6,
   			 style:{
          		'position': 'relative',
          		'left':'50px',
          		'top':'-350px',
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
          		'top':'-350px',
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
			text:goods.price6,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'75px',
          		'top':'-350px',
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
			text:goods.amountTaxExc6,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'85px',
          		'top':'-350px',
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
          		'top':'-350px',
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
			text:goods.amountTax6,
			autoSize:false,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'90px',
          		'top':'-350px',
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
			//html:goodsName,
   			 style:{
          		'position': 'relative',
          		'left':'28px',
          		'top':'-410px',
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
			text:goods.goodsType7,
   			 style:{
          		'position': 'relative',
          		'left':'40px',
          		'top':'-410px',
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
			text:goods.goodsUnit7,
   			 style:{
          		'position': 'relative',
          		'left':'50px',
          		'top':'-410px',
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
          		'top':'-410px',
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
			text:goods.price7,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'75px',
          		'top':'-410px',
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
			text:goods.amountTaxExc7,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'85px',
          		'top':'-410px',
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
          		'top':'-410px',
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
			text:goods.amountTax7,
			autoSize:false,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'90px',
          		'top':'-410px',
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
			//html:goodsName,
   			 style:{
          		'position': 'relative',
          		'left':'28px',
          		'top':'-470px',
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
			text:goods.goodsType8,
   			 style:{
          		'position': 'relative',
          		'left':'40px',
          		'top':'-470px',
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
			text:goods.goodsUnit8,
   			 style:{
          		'position': 'relative',
          		'left':'50px',
          		'top':'-470px',
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
          		'top':'-470px',
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
			text:goods.price8,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'75px',
          		'top':'-470px',
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
			text:goods.amountTaxExc8,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'85px',
          		'top':'-470px',
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
          		'top':'-470px',
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
			text:goods.amountTax8,
			autoSize:false,
			dock:'fill',
   			 style:{
          		'position': 'relative',
          		'left':'90px',
          		'top':'-470px',
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
			text:taxSumText,
			autoSize:false,
			dock:'fill',
   			 style:{
          		'position': 'absolute',
          		'left':'660px',
          		'top':'400px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		
		},
		{
			//合计税额
			xtype : 'label',
			height:70,
			width:135,
			text:taxAmountSumText,
			autoSize:false,
			dock:'fill',
   			 style:{
          		'position': 'absolute',
          		'left':'850px',
          		'top':'400px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		
		},
		{
			//价税合计(大写)
			xtype : 'label',
			height:70,
			width:300,
			autoSize:false,
			dock:'fill',
			text:DX(jptBillInfo.jibiAmountTotal),//价税合计(大写)
   			 style:{
          		'position': 'absolute',
          		'left':'320px',
          		'top':'430px',
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
			text:"￥"+format(jptBillInfo.jibiAmountTotal),//价税合计(小写)
   			 style:{
          		'position': 'absolute',
          		'left':'730px',
          		'top':'430px',
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
				text:jptBillInfo.jibiSellerName,//销方名称
   			 style:{
          		'position': 'absolute',
          		'left':'155px',
          		'top':'456px',
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
				text:jptBillInfo.jibiSellerTaxno,//销方纳税人识别号
   			 style:{
          		'position': 'absolute',
          		'left':'155px',
          		'top':'486px',
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
			text:jptBillInfo.jibiSellerAddpho,//销方地址、电话
   			 style:{
          		'position': 'absolute',
          		'left':'155px',
          		'top':'516px',
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
				text:jptBillInfo.jibiSellerBankAccount,//销方开户行及账号
   			 style:{
          		'position': 'absolute',
          		'left':'155px',
          		'top':'546px',
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
		    text:jptBillInfo.jibiRemark,//备注
   			 style:{
          		'position': 'absolute',
          		'left':'612px',
          		'top':'456px',
          		 'color':'dodgerblue',
          		 'border':'0px',
          		 'word-break':'break-all',
          		 'word-wrap':'break-word',
          		 'font-size': '16px'
          }
		
		}]
	}
   /*title: '查看明细' ,
   item:[
   {
   	xtype : 'tbtext',
   	text:'123'
   }
   ]*/
}).show();
	myWin.on("close",function(){
	 	taxSum=0;
	 	taxAmountSum=0;
	 	jptBillInfo=null;
			});
	
}	
