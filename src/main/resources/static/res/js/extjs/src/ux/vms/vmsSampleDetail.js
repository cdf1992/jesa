  /**
   * 票样明细类
   * @type String
   */
  
  var flag="";  //标志，区分进项和销项
 var billId="";  //发票Id
 var gName="";   //购方名称
 var xName="";   //销方名称
 var billCode="";  //所属增值税普通发票代码
 var number ="";  //号码
 var taxSum=0;  //合计金额
  var taxAmountSum=0;  //合计税额
 var vmsBillInfoDetails=new Array();   //接收的商品列表
 var goods=[];    //保存的商品列表
 var goodsName="";
 var taxAmountSumText="";
 var taxSumText="";
 var vmsBillInfo=null;
 //var jptBillInfoDetail=null;
 Ext.define("Ext.ux.vms.vmsSampleDetail", {
 	
 	 	alias: 'Ext.ux.vms.vmsSampleDetail'
 	 	 })

/**
 * 销项调用方法
 * @param {} grid
 * @param {} rowIndex
 */
var VMSOutPutBillInfoDetail=function  (grid,rowIndex){
	flag="out";
	Ext.Ajax.request({
		url:'findVMSBillInfoSample.ajax',
		async:false,
		params:{
			billId:grid.getStore().getAt(rowIndex).get('billId')
		},
		success:function(response){
			var obj=Ext.decode(response.responseText);
			vmsBillInfo=obj.billInfo;    //进项发票信息
			vmsBillInfoDetails=obj.billItemInfos;  //进项发票明细
			 billId=vmsBillInfo.billId;
			  xName=vmsBillInfo.name;
			 gName=vmsBillInfo.customerName;
			 billCode=vmsBillInfo.billCode;
			 number=vmsBillInfo.billNo;
		}
	});
	for(var i=0;i<11;i++){
		goods["goodsName"+parseInt(i+1)]=[];
		goods["goodsType"+parseInt(i+1)]=[];
		goods["goodsUnit"+parseInt(i+1)]=[];
		goods["quantity"+parseInt(i+1)]=[];
		goods["price"+parseInt(i+1)]=[];
		goods["amountTaxExc"+parseInt(i+1)]=[];
		goods["taxRate"+parseInt(i+1)]=[];
		goods["amountTax"+parseInt(i+1)]=[];
	}
	if(vmsBillInfoDetails.length>0){
		for(var i=0;i<vmsBillInfoDetails.length;i++){
		 var itemObj = vmsBillInfoDetails[i];
		 //商品名称
		  goods["goodsName"+parseInt(i+1)]=itemObj.goodsName;
		  //规格型号
		  goods["goodsType"+parseInt(i+1)]=itemObj.specandmodel;
		  //计量单位
		  goods["goodsUnit"+parseInt(i+1)]=itemObj.goodsUnit;
		  //数量
		  goods["quantity"+parseInt(i+1)]=itemObj.goodsNo;
		  //单价
		  goods["price"+parseInt(i+1)]=itemObj.goodsPrice;
		  //金额
		  goods["amountTaxExc"+parseInt(i+1)]=itemObj.amt;
		   //税率
		  if(itemObj.taxRate){
		  	goods["taxRate"+parseInt(i+1)]=parseFloat(itemObj.taxRate)*100+"%";
		  }
		  //goods["taxRate"+parseInt(i+1)]=itemObj.jibdTaxRate;
		   //税额
		  goods["amountTax"+parseInt(i+1)]=itemObj.taxAmt;
		  //合计金额
		  taxSum+=parseFloat(itemObj.amt==null?0:itemObj.amt);
		  //合计税额
		  taxAmountSum+=parseFloat(itemObj.taxAmt==null?0:itemObj.taxAmt);
		  
		 //console.log( itemObj);
		}
		taxSumText=parseFloat(taxSum).toFixed(2);
		taxAmountSumText=parseFloat(taxAmountSum).toFixed(2);
	}
	//console.log(goods)
	//console.log(goods.amountTax1)
	goodsName='';
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
			/*autoScroll : true,*/
			frame : true,
			bodyStyle:'background:url(res/img/piaoyang2.png) no-repeat;',
			items : [{
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
				/*{ 
			xtype: "button",  
            width:90,  
            height:40,  
            text:'<span style="font-size:16px;">打印</span>',
             style:{
	           		'position': 'relative',
	           		'left':'650px',
	           		'top':'0px',
	           		 'color':'white'
        			 },
            handler:function(){
            	
           		 }
            }*/,{ xtype: "button",  
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
				//发票代码
				xtype : 'tbtext',
        			text:'增值税'+billTypeConvt(vmsBillInfo.fapiaoType)+'发票',
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
					text:vmsBillInfo.billCode,//发票代码
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
					text:vmsBillInfo.billNo, //发票号码
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
					text:ConvertDateFromString(vmsBillInfo.billDate),//开票日期
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
				//购买方名称
				xtype : 'label',
				height:70,
				width:400,
				autoSize:false,
				dock:'fill',
					text:vmsBillInfo.customerName,//购买方名称
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
					text:vmsBillInfo.customerTaxno,//购买方纳税人识别号
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
					text:vmsBillInfo.customerAddressandphone,//购买方地址、电话
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
				//开户行及账户
				xtype : 'label',
				height:70,
				width:400,
				autoSize:false,
				dock:'fill',
					text:vmsBillInfo.customerBankandaccount,//开户行及账户
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
				text:goods.goodsName1,//货物或应税劳务名称
				//text:'1111111111111111111111111',
				
				html:goodsName,
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
				text:goods.goodsType1,
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
				text:goods.goodsUnit1,
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
				text:goods.price1,
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
				text:goods.amountTaxExc1,
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
				text:goods.amountTax1,
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
				text:goods.goodsName2,//货物或应税劳务名称
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'28px',
	           		'top':'-168px',
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
				text:goods.goodsUnit2,
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
				text:goods.quantity2,
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
				text:goods.price2,
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
				text:goods.amountTaxExc2,
				id:'',
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
				text:goods.taxRate2,
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
				text:goods.amountTax2,
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
				text:goods.goodsType3,
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
				text:goods.goodsUnit3,
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
				text:goods.quantity3,
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
				text:goods.price3,
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
				text:goods.amountTaxExc3,
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
				text:goods.taxRate3,
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
				text:goods.amountTax3,
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
				text:goods.goodsName4,
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
				text:goods.goodsType4,
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
				text:goods.goodsUnit4,
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
				text:goods.quantity4,
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
				text:goods.price4,
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
				text:goods.amountTaxExc4,
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
				text:goods.taxRate4,
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
				text:goods.amountTax4,
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
				text:goods.goodsName5,
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
				text:goods.goodsType5,
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
				text:goods.goodsUnit5,
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
				text:goods.quantity5,
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
				text:goods.price5,
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
				text:goods.amountTaxExc5,
				id:'',
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
				text:goods.taxRate5,
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
				text:goods.amountTax5,
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
				text:goods.goodsName6,
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
				text:goods.goodsType6,
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
				text:goods.goodsUnit6,
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
				text:goods.quantity6,
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
				text:goods.price6,
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
				text:goods.amountTaxExc6,
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
				text:goods.taxRate6,
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
				text:goods.amountTax6,
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
				text:goods.goodsName7,
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
				text:goods.goodsType7,
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
				text:goods.goodsUnit7,
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
				text:goods.quantity7,
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
				text:goods.price7,
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
				text:goods.amountTaxExc7,
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
				text:goods.taxRate7,
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
				text:goods.amountTax7,
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
	           		'top':'-530px',
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
	           		'top':'-530px',
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
	           		'top':'-530px',
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
	           		'top':'-530px',
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
	           		'top':'-530px',
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
	           		'top':'-530px',
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
	           		'top':'-530px',
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
	           		'top':'-530px',
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
	           		'top':'305px',
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
	           		'top':'305px',
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
				text:DX(vmsBillInfo.sumAmt),//价税合计(大写)
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
				text:"￥"+format(vmsBillInfo.sumAmt),//价税合计(小写)
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
					text:vmsBillInfo.name,//销方名称
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
					text:vmsBillInfo.taxno,//销方纳税人识别号
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
					text:vmsBillInfo.addressandphone,//销方地址、电话
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
				text:vmsBillInfo.bankandaccount,//销方开户行及账号
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
					text:vmsBillInfo.remark,//备注
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
			
			}]
		}
	}).show();
	myWin.on("close",function(){
 	 	taxSum=0;
 	 	taxAmountSum=0;
 	 	vmsBillInfo=null;
	});
}

 

/**
 * 商品明细
 * @param {} flag  标志
 * @param {} billId  发票id
 * @param {} gName   购方纳税人名称
 * @param {} xName   销方纳税人名称
 * @param {} billCode   发票代码
 * @param {} number    发票号码
 */
var outList=function (flag,billId,gName,xName,billCode,number){
	if(gName==undefined){
		gName="";
	}
	if(xName==undefined){
		xName="";
	}
	var store;
	var columns;
	if(flag=="out"){

		store = Ext.create("Ext.data.Store", {
			fields: [
				 'detail','billId','billItemId','goodsName','specandmodel','goodsUnit','goodsNo','goodsPrice','taxFlag',
				 'amt','taxRate','taxAmt','taxItem','isMaingoods','rowNature','disItemId','discountRate','goodsId','balance'
			    ],
			   /* data:[
			    	 {'goodsName':'测试商品','specandmodel':'031001600411','goodsUnit':'份','goodsNo':'1','goodsPrice':'866.29','amt':'866.29','taxRate':'6%','taxAmt':'51.98'},
			    	 {'goodsName':'测试商品','specandmodel':'622366331122','goodsUnit':'份','goodsNo':'1','goodsPrice':'1426.89','amt':'1426.89','taxRate':'6%','taxAmt':'86.51'}
			    ],*/
			autoLoad:true,
			proxy:{
				type:'ajax',
				url: 'findJptOutBillInfoGoodsDetail.ajax?billId='+billId,
				reader:{
					type:'json',
					root:'jptOutputBillItemInfos'
				}
			}
		});
		columns=[

			{header:'${message("jes.vm.sys.myTaskList.xh")}',xtype:'rownumberer',width:LAYOUT_CONSTANTS.GRID.HEADER_WIDTH.W1,align:'center',
			    renderer:function(value,metaData,r,rowIndex,colIndex,store){
			   	if(r.data.detail=="tax"){
			   		return '小计</br></br>总计';
			   	}
			   		if(r.data.detail=="detail"){
			   		return '备注';
			   		
			   	}
		   		return "<font style='color:dodgerblue'>"+parseInt(rowIndex+1)+"</font>"; 
			    }
			},
		 	{text: '发票ID', dataIndex: 'billId',width: 120,align: 'center',hidden:true},
			{text: '货物(劳务)名称', dataIndex: 'goodsName',width: 120,align: 'center', 
		 		renderer:function(val){ 
			        if(null!=val) 
			            return "<font style='color:dodgerblue'>"+val+"</font>"; 
		            else return val; 
		        } 
		 	},
			{text: '规格型号', dataIndex: 'specandmodel',width: 120,align: 'center', 
		 		renderer:function(val){ 
		            if(null!=val) 
		            	return "<font style='color:dodgerblue'>"+val+"</font>"; 
		            else return val; 
		        } 
		 	},
			{text: '单位', dataIndex: 'goodsUnit',width: 120,align: 'center', 
		 		renderer:function(val){ 
		            if(null!=val) 
		            	return "<font style='color:dodgerblue'>"+val+"</font>"; 
		            else return val; 
		        }
			},
			{text: '数量', dataIndex: 'goodsNo',width: 120,align: 'center', 
				renderer:function(val){ 
			        if(null!=val) 
			        	return "<font style='color:dodgerblue'>"+val+"</font>"; 
			        else return val; 
			    }
			},
		    {text: '单价', dataIndex: 'goodsPrice',width: 120,align: 'center', 
				renderer:function(val){ 
		            if(null!=val) 
		            	return "<font style='color:dodgerblue'>"+val+"</font>"; 
		            else return val; 
		        }
			},
			{text: '金额', dataIndex: 'amt',width: 120,align: 'center', 
				renderer:function(val){ 
		            if(null!=val) 
		            	return "<font style='color:dodgerblue'>"+val+"</font>"; 
		            else return val; 
		        } 
			},
		    {text: '税率', dataIndex: 'taxRate',width: 120,align: 'center', 
				renderer:function(val){ 
		            if(null!=val) 
		            	return "<font style='color:dodgerblue'>"+val*100+"%"+"</font>"; 
		            else return val; 
		        }
			},
			{text: '税额', dataIndex: 'taxAmt',width: 120,align: 'center', 
				renderer:function(val){ 
		            if(null!=val) 
		            	return "<font style='color:dodgerblue'>"+val+"</font>"; 
		            else return val; 
		        } 
			}
		]
	}else if(flag=="input"){
		store = Ext.create("Ext.data.Store", {
			fields: [
			 'detail','jibdBillDetailId','jibdBillId','jibdGoodsName','jibdGoodsType','jibdGoodsUnit','jibdQuantity','jibdPrice','jibdAmountTaxExc',
			 'jibdTaxRate','jibdAmountTax','taxItem','isMaingoods','rowNature','disItemId','discountRate','goodsId','balance'
		    ],
		   /* data:[
		    	 {'jibdGoodsName':'测试商品123','jibdGoodsType':'031001600411','jibdGoodsUnit':'份','jibdQuantity':'1','jibdPrice':'866.29','jibdAmountTaxExc':'866.29','jibdTaxRate':'6%','jibdAmountTax':'51.98'},
		    	 {'jibdGoodsName':'测试商品','jibdGoodsType':'622366331122','jibdGoodsUnit':'份','jibdQuantity':'1','jibdPrice':'1426.89','jibdAmountTaxExc':'1426.89','jibdTaxRate':'6%','jibdAmountTax':'86.51'}
		    ],*/
			autoLoad:true,
			proxy:{
				type:'ajax',
				url: 'findJptInputBillInfoGoodsDetail.ajax?billId='+billId,
				reader:{
					type:'json',
					root:'jptBillInfoDetail'
				}
			}
		});
	columns=[
		{header:'${message("jes.vm.sys.myTaskList.xh")}',/*序号*/xtype:'rownumberer',width:LAYOUT_CONSTANTS.GRID.HEADER_WIDTH.W1,align:'center',
			renderer:function(value,metaData,r,rowIndex,colIndex,store){
			   	if(r.data.detail=="tax"){
			   		return '小计</br></br>总计';
			   	}
		   		if(r.data.detail=="detail"){
		   			return '备注';
			   	}
		   		return "<font style='color:dodgerblue'>"+parseInt(rowIndex+1)+"</font>"; 
		   }
		},
	 	{text: '发票ID', dataIndex: 'jibdBillId',width: 120,align: 'center',hidden:true},
		{text: '货物(劳务)名称', dataIndex: 'jibdGoodsName',width: 120,align: 'center', 
	 		renderer:function(val){ 
                if(null!=val) 
                	return "<font style='color:dodgerblue'>"+val+"</font>"; 
                else return val; 
            } 
        },
		{text: '规格型号', dataIndex: 'jibdGoodsType',width: 120,align: 'center', 
        	renderer:function(val){ 
                if(null!=val) 
                	return "<font style='color:dodgerblue'>"+val+"</font>"; 
                else return val; 
            }
        },
		{text: '单位', dataIndex: 'jibdGoodsUnit',width: 120,align: 'center', 
        	renderer:function(val){ 
                if(null!=val) 
                	return "<font style='color:dodgerblue'>"+val+"</font>"; 
                else return val; 
            } 
        },
        {text: '数量', dataIndex: 'jibdQuantity',width: 120,align: 'center', 
        	renderer:function(val){ 
                if(null!=val) 
                	return "<font style='color:dodgerblue'>"+val+"</font>"; 
                else return val; 
            } 
        },
        {text: '单价', dataIndex: 'jibdPrice',width: 120,align: 'center', 
        	renderer:function(val){ 
                if(null!=val) 
                	return "<font style='color:dodgerblue'>"+val+"</font>"; 
                else return val; 
            } 
        },
		{text: '金额', dataIndex: 'jibdAmountTaxExc',width: 120,align: 'center', 
        	renderer:function(val){ 
	            if(null!=val) 
	            	return "<font style='color:dodgerblue'>"+val+"</font>"; 
	            else return val; 
	        }
        },
        {text: '税率', dataIndex: 'jibdTaxRate',width: 120,align: 'center', 
        	renderer:function(val){ 
	         	if(null!=val) 
	                return "<font style='color:dodgerblue'>"+val+"</font>"; 
	            else return val; 
            } 
        },
		{text: '税额', dataIndex: 'jibdAmountTax',width: 120,align: 'center', 
        	renderer:function(val){ 
                if(null!=val) 
                	return "<font style='color:dodgerblue'>"+val+"</font>"; 
                else return val; 
            } 
        }
		]
	}
	var count=store.getCount();  //grid总条数
	Ext.create('Ext.window.Window', {
	    title: '销售货物或提供应税劳务清单',
	    height: 700,
	    width: 1048,
	    layout: 'auto',
	    draggable:false,//拖动
	   	resizable:false,	//变大小	
	   	style:{
	   		'background-color':'white'
	   	},
	    items: [{
			xtype : 'form',
			layout:'column',
			name:'form',										
			frame : true,
			width:1038,
			height:150,
			layout:'column',
			items:[
			{
				xtype : 'label',
				height:70,
				width:500,
				autoSize:false,
				dock:'fill',
				html:'销售货物或提供应税劳务清单',
				style:{
					'position': 'relative',
					'left':'430px',
					'top':'0px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '20px',
					'color':'dodgerblue'
				}
			},{
				xtype : 'label',
				height:70,
				width:500,
				autoSize:false,
				dock:'fill',
				html:'购买方名称:'+'<lable style="color:dodgerblue;">'+gName+'</lable>',
				style:{
					'position': 'relative',
					'left':'-500px',
					'top':'50px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '16px'
				}
			},{
				xtype : 'label',
				height:70,
				width:500,
				autoSize:false,
				dock:'fill',
				html:'销售方名称:'+'<lable style="color:dodgerblue;">'+xName+'</lable>',
				style:{
					'position': 'relative',
					'left':'0px',
					'top':'10px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '16px'
				}
			},{
				xtype : 'label',
				height:20,
				width:350,
				autoSize:false,
				dock:'fill',
				html:'所属增值税普通发票代码:'+'<lable style="color:dodgerblue;">'+billCode+'</lable>',
				style:{
					'position': 'relative',
					'left':'-500px',
					'top':'40px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '16px'
				}
			},{
				xtype : 'label',
				height:70,
				width:130,
				autoSize:false,
				dock:'fill',
				html:'号码:'+'<lable style="color:dodgerblue;">'+number+'</lable>',
				style:{
					'position': 'relative',
					'left':'-230px',
					'top':'50px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '16px'
				}
			},{
				xtype : 'label',
				height:70,
				width:90,
				autoSize:false,
				dock:'fill',
				text:'共'+'1'+'页 第'+'1'+'页',
				style:{
					'position': 'relative',
					'left':'940px',
					'top':'-20px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '16px'
				}
			}
		]
	},{
		layout : 'fit',
	    xtype: 'gridpanel',
	    height:540,//设置面板的高度 
	    id:'grid',
	    autoScroll:true,
	    bodyStyle : 'overflow-x:hidden; overflow-x:scroll',
	    border: false,
	    selModel:{mode :'SIMPLE'},
	    store : store,
	    columns: columns
    } ]
	}).show();
var json="";
var minSum=0;  //金额小计
var sumAmt=0; //金额总计
var taxMin=0;  //税额小计
var taxAmt=0;   //税额总计

Ext.getCmp('grid').store.on('load',function(store,records,successful,eOpts){
	    var girdcount=0;
	    store.each(function(r){
	    	if(r.get('10')=='数据错误'){
	    		Ext.getCmp('grid').getView().getRow(girdcount).style.backgroundColor='dodgerblue';
	    	}
	    	girdcount=girdcount+1;
	    });
	    var gridStore = Ext.getCmp('grid').getStore();
		//获取store的数据总行数
		var count = gridStore.getCount();
		var params={};
		var list=new Array();
		//循环获取每一行的数据
		for (var i = 0; i < count; i++) {
			//获取当前行的数据
			var record = gridStore.getAt(i);
			if(flag=="out"){
				minSum+=parseFloat(record.data.amt);
				taxMin+=parseFloat(record.data.taxAmt);
				json="{'detail':'tax','amt':'￥"+minSum.toFixed(2)+"</br></br>￥"+minSum.toFixed(2)+"','taxAmt':'￥"+taxMin.toFixed(2)+"</br></br>￥"+taxMin.toFixed(2)+"'}";
			}else if(flag=="input"){
				minSum+=parseFloat(record.data.jibdAmountTaxExc);
				taxMin+=parseFloat(record.data.jibdAmountTax);
				//alert(minSum+"="+taxMin);
				json="{'detail':'tax','jibdAmountTaxExc':'￥"+minSum.toFixed(2)+"</br></br>￥"+minSum.toFixed(2)+"','jibdAmountTax':'￥"+taxMin.toFixed(2)+"</br></br>￥"+taxMin.toFixed(2)+"'}";
			}
		}
		var detail="";
		//json+="{'goodsName':'测试商品','specandmodel':'622366331122','goodsUnit':'份','goodsNo':'1','goodsPrice':'1426.89','amt':'1426.89','taxRate':'6%','taxAmt':'86.51'}";
		store.add(Ext.decode(json));
		detail="{'detail':'detail'}"
		store.add(Ext.decode(detail));
})
			
	}
	
/* var DX=function (n) {
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "数据非法";
        var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
            n += "00";
        var p = n.indexOf('.');
        if (p >= 0)
            n = n.substring(0, p) + n.substr(p+1, 2);
            unit = unit.substr(unit.length - n.length);
        for (var i=0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|圆)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^圆零?|零分/g, "").replace(/元$/g, "圆整");
}*/
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
	  
	/*if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
	    	return "";
	    var unit = "仟佰拾亿仟佰拾万仟佰拾圆角分", str = "";
	    n += "00";
	    var p = n.indexOf('.');
	    if (p >= 0)
	    n = n.substring(0, p) + n.substr(p+1, 2);
	    unit = unit.substr(unit.length - n.length);
	    for (var i=0; i < n.length; i++)
	    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
	    return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|圆)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g,

	    "").replace(/圆$/g, "圆整");*/
	};


 var billTypeValue=function (typeCode){
	  var typeValue;
	  switch(typeCode)
	  {
	  case '0':
		  typeValue = '普通';
		  break;
	  case '1':
		  typeValue = '专用';
		  break;
	  case '2':
		  typeValue = '电子';
		  break;
	  case '3':
	      typeValue = '货物运输';
		  break;
	  case '4':
	      typeValue = '机动车';
		  break;
	  default:
		  typeValue = '';
	  	break;
	  }
	  return typeValue;
  }
  var billTypeConvt=function (typeCode){
	  var typeValue;
	  switch(typeCode)
	  {
	  case '0':
		  typeValue = '专用';
		  break;
	  case '1':
		  typeValue = '普通';
		  break;
	  case '2':
		  typeValue = '电子';
		  break;
	  default:
		  typeValue = '';
	  	break;
	  }
	  return typeValue;
  }
  
  /**
   * 时间处理  将yyyy-mm-dd 转换为yyyy年mm月dd日的格式
   * @param {} date
   * @return {}
   */
var ConvertDateFromString=function (dateString) { 
    if (dateString) { 
    	var date="";
    	if(dateString.indexOf("-")>0){
        var arr1 = dateString.split(" "); 
        var sdate = arr1[0].split('-');
        date=sdate[0]+"年"+sdate[1]+"月"+sdate[2]+"日";
    	}else{
			 if(dateString.length == 8){
				date=dateString.substring(0, 4) + "年" + dateString.substring(4, 6) + "月" + dateString.substring(6, 8)+"日";
			} else if(dateString.length == 6){
				date=dateString.substring(0, 4) + "年" + dateString.substring(4, 6)+"月";
			} else {
				date=dateString;
			}
    	}
    
/*        var date = new Date(sdate[0], sdate[1], sdate[2]); 
*/        return date; 
    } 
}

var format=function  (num) {
	if(num!=undefined){
		return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
	}else{
		return '0.00';
	}
}

/**
 * 全国地区代码对照方法
 * @param {} invoiceCode  发票代码（第1--4位代表各地区代码）
 * @param {} invoiceType   发票类型
 */
var areaCodeContrast=function(invoiceCode,invoiceType){
	var areaCode="";
	//截取发票代码前四位，获取到地区代码
	if(invoiceType=="2"){
		areaCode=invoiceCode.substr(1,4);
	}else{
		areaCode=invoiceCode.substr(0,4);
	}
	 var typeValue;
	  switch(areaCode)
	  {
	  case '1100':
		  typeValue = '北京';
		  break;
	  case '1200':
		  typeValue = '天津';
		  break;
	  case '1300':
		  typeValue = '河北';
		  break;
	  case '1400':
		typeValue= '山西';
		break;
	case '1500':
		typeValue='内蒙古';
		break;
	case '2100':
		typeValue= '辽宁';
		break;
	case '2200':
		typeValue= '吉林';
		break;
	case '2300':
		typeValue= '黑龙江';
		break;
	case '3100':
		typeValue= '上海';
		break;
	case '3200':
		typeValue=  '江苏';
		break;
	case '3300':
		typeValue= '浙江';
		break;
	case '3400':
		typeValue= '安徽';
		break;
	case '3500':
		typeValue=  '福建';
		break;
	case '3600':
		typeValue=  '江西';
		break;
	case '3700':
		typeValue=  '山东';
		break;
	case '4100':
		typeValue= '河南';
		break;
	case '4200':
		typeValue= '湖北';
		break;
	case '4300':
		typeValue= '湖南';
		break;
	case '4400':
		typeValue=  '广东';
		break;
	case '4500':
		typeValue=  '广西';
		break;
	case '4600':
		typeValue= '海南';
		break;
	case '5000':
		typeValue=  '重庆';
		break;
	case '5100':
		typeValue=  '四川';
		break;
	case '5200':
		typeValue=  '贵州';
		break;
	case '5300':
		typeValue=  '云南';
		break;
	case '5400':
		typeValue= '西藏';
		break;
	case '6100':
		typeValue= '陕西';
		break;
	case '6200':
		typeValue= '甘肃';
		break;
	case '6300':
		typeValue= '青海';
		break;
	case '6400':
		typeValue= '宁夏';
		break;
	case '6500':
		typeValue= '新疆';
		break;
	case '7100':
		typeValue= '台湾';
		break;
	case '8100':
		typeValue= '香港';
		break;
	case '8200':
		typeValue= '澳门';
		break;
	case '4403':
		typeValue= '深圳';
		break;
	default:
		  typeValue = '';
	  	break;
	  }
	  return typeValue;
  
	
}

var goodList=function (flag,billId,gName,xName,billCode,number,vmsBillInfos,vmsBillInfoDetail){
	vmsBillInfo = vmsBillInfos;
	vmsBillInfoDetails = vmsBillInfoDetail;
	if(gName==undefined){
		gName="";
	}
	if(xName==undefined){
		xName="";
	}
	if(billCode==undefined){
		billCode="";
	}
	if(number==undefined){
		number="";
	}
	var store;
	var columns;
	if(flag=="out"){

		store = Ext.create("Ext.data.Store", {
			fields: [
				 'detail','billId','billItemId','goodsName','specandmodel','goodsUnit','goodsNo','goodsPrice','taxFlag',
				 'amt','taxRate','taxAmt','taxItem','isMaingoods','rowNature','disItemId','discountRate','goodsId','balance'
			    ],
			autoLoad:true,
			proxy:{
				type:'ajax',
				url: 'findJptOutBillInfoGoodsDetail.ajax?billId='+billId,
				reader:{
					type:'json',
					root:'jptOutputBillItemInfos'
				}
			}
		});
		columns=[
			{header:'序号',xtype:'rownumberer',align:'center',width:50
			},
			{text: '货物(劳务)名称', dataIndex: 'goodsName',align: 'center', width:100,
		 		renderer:function(val){ 
			        if(null!=val) 
			            return "<font>"+val+"</font>"; 
		            else return val; 
		        } 
		 	},
			{text: '规格型号', dataIndex: 'specandmodel',align: 'center', width:70,
		 		renderer:function(val){ 
		            if(null!=val) 
		            	return "<font>"+val+"</font>"; 
		            else return val; 
		        } 
		 	},
			{text: '单位', dataIndex: 'goodsUnit',align: 'center',width:60,
		 		renderer:function(val){ 
		            if(null!=val) 
		            	return "<font>"+val+"</font>"; 
		            else return val; 
		        }
			},
			{text: '数量', dataIndex: 'goodsNo',align: 'center',width:60,
				renderer:function(val){ 
			        if(null!=val) 
			        	return "<font>"+val+"</font>"; 
			        else return val; 
			    }
			},
		    {text: '单价', dataIndex: 'goodsPrice',align: 'center',width:60,
				renderer:function(val){ 
		            if(null!=val) 
		            	return "<font>"+val+"</font>"; 
		            else return val; 
		        }
			},
			{text: '金额', dataIndex: 'amt',align: 'center',
				renderer:function(val){ 
		            if(null!=val) 
		            	return "<font>"+val+"</font>"; 
		            else return val; 
		        } 
			},
		    {text: '税率', dataIndex: 'taxRate',align: 'center',
				renderer:function(val){ 
		            if(null!=val) 
		            	return "<font>"+val+"</font>"; 
		            else return val; 
		        }
			},
			{text: '税额', dataIndex: 'taxAmt',align: 'center',
				renderer:function(val){ 
		            if(null!=val) 
		            	return "<font>"+val+"</font>"; 
		            else return val; 
		        } 
			}
		]
	}
	var count=store.getCount();  //grid总条数
	goodsInformation = Ext.create('Ext.window.Window', {
	    title: '销售货物或提供应税劳务清单',
	    height: 700,
	    width: 700,
	    id:'goodsList',
	    layout: 'auto',
	    modal : true,// 设置是否添加遮罩
	    draggable:false,//拖动
	   	resizable:false,	//变大小	
	   	style:{
	   		'background-color':'white'
	   	},
	    items: [{
			xtype : 'form',
			layout:'column',
			name:'form',										
			frame : true,
			width:700,
			height:150,
			layout:'column',
			items:[
			{
				xtype : 'label',
				height:70,
				autoSize:false,
				dock:'fill',
				html:'销售货物或提供应税劳务清单',
				style:{
					'position': 'relative',
					'left':'180px',
					'top':'0px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '20px'
				}
			},
			/*{ xtype: "button",  
	            text:'<span style="font-size:16px;">关闭</span>',
	             style:{
	            	 'position': 'relative',
						'left':'200px',
						'top':'0px',
						'border':'0px',
						'word-break':'break-all',
						'word-wrap':'break-word',
						'font-size': '20px'
	        			 },
	            handler:function(){
	            	goodsInformation.close();
	           		 }
	            },*/
			{
				xtype : 'label',
				autoSize:false,
				dock:'fill',
				width:400,
				html:'购买方名称:'+'<lable>'+gName+'</lable>',
				style:{
					'position': 'relative',
					'left':'-250px',
					'top':'40px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '14px'
				}
			},{
				xtype : 'label',
				autoSize:false,
				dock:'fill',
				width:400,
				html:'销售方名称:'+'<lable>'+xName+'</lable>',
				style:{
					'position': 'relative',
					'left':'-250px',
					'top':'60px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '14px'
				}
			},{
				xtype : 'label',
				autoSize:false,
				dock:'fill',
				width:140,
				html:'发票代码:'+'<lable>'+billCode+'</lable>',
				style:{
					'position': 'relative',
					'left':'-250px',
					'top':'80px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '14px'
				}
			},{
				xtype : 'label',
				autoSize:false,
				dock:'fill',
				width:140,
				html:'发票号码:'+'<lable>'+number+'</lable>',
				style:{
					'position': 'relative',
					'left':'-200px',
					'top':'80px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '14px'
				}
			},{
				xtype : 'label',
				autoSize:false,
				dock:'fill',
				html:'<input type="button" onclick="buttonPrinter()" value="打印" />',
				style:{
					'position': 'relative',
					'left':'90px',
					'top':'80px',
					'border':'0px',
					'word-break':'break-all',
					'word-wrap':'break-word',
					'font-size': '14px'
				}
			}
		]
	},{
		layout : 'fit',
	    xtype: 'gridpanel',
	    height:540,//设置面板的高度 
	    id:'grid',
	    autoScroll:true,
	    bodyStyle : 'overflow-x:hidden; overflow-x:scroll',
	    border: false,
	    selModel:{mode :'SIMPLE'},
	    store : store,
	    columns: columns
    }]
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
	dayinc += '<span style="float:left;">购买方名称：'+vmsBillInfo.customerName+'</span>';
	dayinc += '</div>';
	dayinc += '<div style="clear:both; margin:15px auto;">';
	dayinc += '<span style="float:left;">销售方名称：'+vmsBillInfo.name+'</span>';
	dayinc += '</div>';
	dayinc += '<div style=" clear:both; margin:15px auto;">';
	dayinc += '<span style="float:left;">发票代码：'+vmsBillInfo.billCode+'</span>';
	dayinc += '                                                      ';
	dayinc += '<span>发票号码:'+vmsBillInfo.billNo+'</span>';
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
