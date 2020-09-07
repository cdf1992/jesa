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
 var jptBillInfoDetails=new Array();   //接收的商品列表
 var goods=[];    //保存的商品列表
 var goodsName="";
 var taxAmountSumText="";
 var taxSumText="";
 var jptBillInfo=null;
 //var jptBillInfoDetail=null;
 Ext.define("Ext.ux.jpt.jptFreightageDetail", {
 	
 	 	alias: 'Ext.ux.jpt.jptFreightageDetail'
 	 	 })
//货物运输增值税发票
 /**.
  * 进项调用方法
  * @param {} grid  
  * @param {} rowIndex
  * @param {} type  明細頁面調用detail_HX(個性化查看明細) detail(標準版本)
  */
 var JPTFreightageDetail=function  (grid,rowIndex){
 	flag="input";
 	Ext.Ajax.request({
			url:'findJptInputBillInfoUsedCarDetail.ajax',
			async:false,
			params:{
				billId:grid.getStore().getAt(rowIndex).get('jibiBillId')
			},
			success:function(response){
				var obj=Ext.decode(response.responseText);
				 jptBillInfoDetails=obj.jptBillInfoDetail;  //进项发票明细
			}
		});
	
		if(jptBillInfoDetails.length>0){
			for(var i=0;i<jptBillInfoDetails.length;i++){
			 var itemObj = jptBillInfoDetails[i];
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
		goodsName='';
	var myWin=Ext.create('Ext.window.Window', {
		
        extend : 'Ext.window.Window',
        modal:true,//设置是否添加遮罩
		height : 775,
		width : 1070,
		layout : 'fit',
		draggable:false,//拖动
		resizable:false,	//变大小	
		autoScroll:false,
		title:'查看明细',
		bodyStyle : 'overflow-x:hidden; overflow-y:scroll',
		items:{
			xtype : 'form',
			layout:'column',
			name:'form',										
			/*autoScroll : true,*/
			frame : true,
			bodyStyle:'background:url(res/img/freightage.png) no-repeat;',
			items : [
				{
				xtype : 'fieldset',
				name : 'buff',
				width:1050,
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
				//查验时间
				xtype : 'tbtext',
				text:'查验次数：第'+(jptBillInfoDetails[0].jibiCheckedLatestNo == null||jptBillInfoDetails[0].jibiCheckedLatestNo == undefined||jptBillInfoDetails[0].jibiCheckedLatestNo == ""?0:jptBillInfoDetails[0].jibiCheckedLatestNo)+'次',
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
				text:'查验时间：'+jptBillInfoDetails[0].jibiCheckedLatestTime,
        			 style:{
        			 'align':'center',
	           		 'position': 'relative',
	           		 'left':'50px',
	           		 'top':'10px',
	           		  'color':'white',
	           		 'font-size': '20px'
	           }
			
			},{ 
				xtype: "button",  
	            width:90,  
	            height:40,  
	            text:'<span style="font-size:16px;">打印</span>',
	             style:{
		           		'position': 'relative',
		           		'left':'220px',
		           		'top':'0px',
		           		 'color':'white',
		           		 'font-size': '20px'
            			 },
            			 handler:function(me){
	            	var fs = myWin.down('form').getForm().getValues();//jptSuppilerInfoEntry.do
	            	
	            	  window.open('jptFreightageDetail.do?ssId=JPT&billId='+grid.getStore().getAt(rowIndex).get('jibiBillId'), 'mywindow1', 'width=1200, height=600, menubar=no, toolbar=no, scrollbars=yes');
	            	  
	            	  //window.print();
	           		 }
            },{ 
            xtype: "button",  
            width:90,  
            height:40,  
            text:'<span style="font-size:16px;">关闭</span>',
             style:{
	           		'position': 'relative',
	           		'left':'250px',
	           		'top':'0px',
	           		 'color':'white',
	           		 'font-size': '16px'
        			 },
            handler:function(){
            	taxSumText="";
            	taxAmountSumText="";
            	goods=[];
            	myWin.hide();
            	taxAmountSum=0;
            	taxSum=0;
           		 }
            }
				]
			},{
				//发票代码
				xtype : 'label',
				height:0,
				width:150,
				autoSize:false,
				name:'jibiBillCode',
				dock:'fill',
				text:jptBillInfoDetails[0].jibiBillCode, //发票代码
        			 style:{
	           		'position': 'relative',
	           		'left':'10px',
	           		'top':'25px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//发票号码
				xtype : 'label',
				height:0,
				width:150,
				autoSize:false,
				name:'jibiBillNo',
				dock:'fill',
				text:jptBillInfoDetails[0].jibiBillNo,//发票号码
        			 style:{
	           		'position': 'relative',
	           		'left':'10px',
	           		'top':'60px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//开票日期
				xtype : 'label',
				height:50,
				width:150,
				autoSize:false,
				name:'jibiBillDate',
				dock:'fill',
				text:ConvertDateFromString(jptBillInfoDetails[0].jibiBillDate),//开票日期
        			 style:{
	           		'position': 'relative',
	           		'left':'890px',
	           		'top':'60px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//承运人
				xtype : 'label',
				height:30,
				width:350,
				autoSize:false,
				dock:'fill',
				name:'jibiHyCarrier',
				text:jptBillInfoDetails[0].jibiHyCarrier,
        			 style:{
	           		'position': 'relative',
	           		'left':'5px',
	           		'top':'102px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			},{
				//纳税人识别号
				xtype : 'label',
				height:30,
				width:350,
				autoSize:false,
				dock:'fill',
				name:'jibiHyCarrierTaxno',
				text:jptBillInfoDetails[0].jibiHyCarrierTaxno,
        			 style:{
	           		'position': 'relative',
	           		'left':'-345px',
	           		'top':'130px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			},{
				//实际受票
				xtype : 'label',
				height:30,
				width:350,
				autoSize:false,
				name:'jibiHyActualDrawee',
				dock:'fill',
				text:jptBillInfoDetails[0].jibiHyActualDrawee,
        			 style:{
	           		'position': 'relative',
	           		'left':'-10px',
	           		'top':'140px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			},{
				//纳税人识别号
				xtype : 'label',
				height:30,
				width:350,
				autoSize:false,
				name:'jibiHyDraweeTaxno',
				dock:'fill',
				text:jptBillInfoDetails[0].jibiHyDraweeTaxno,
        			 style:{
	           		'position': 'relative',
	           		'left':'-360px',
	           		'top':'170px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			},{
				//密码区
				xtype : 'label',
				height:110,
				width:450,
				autoSize:false,
				name:'jibiCheckNo',
				dock:'fill',
				text:jptBillInfoDetails[0].jibiCheckNo,
        			 style:{
	           		'position': 'relative',
	           		'left':'582px',
	           		'top':'50px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			
			},{
				//收货人
				xtype : 'label',
				height:30,
				width:380,
				autoSize:false,
				name:'jibiHyReceiver',
				dock:'fill',
				text:jptBillInfoDetails[0].jibiHyReceiver,
        			 style:{
	           		'position': 'relative',
	           		'left':'-310px',
	           		'top':'165px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//纳税人识别号
				xtype : 'label',
				height:30,
				width:380,
				autoSize:false,
				name:'jibiHyReceiverTaxno',
				dock:'fill',
				text:jptBillInfoDetails[0].jibiHyReceiverTaxno,
        			 style:{
	           		'position': 'relative',
	           		'left':'-310px',
	           		'top':'165px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//发货人
				xtype : 'label',
				height:30,
				width:400,
				autoSize:false,
				name:'jibiHySender',
				dock:'fill',
				text:jptBillInfoDetails[0].jibiHySender,
        			 style:{
	           		'position': 'relative',
	           		'left':'190px',
	           		'top':'105px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//纳税人识别号
				xtype : 'label',
				height:30,
				width:400,
				autoSize:false,
				name:'jibiHySenderTaxno',
				dock:'fill',
				text:jptBillInfoDetails[0].jibiHySenderTaxno,
        			 style:{
	           		'position': 'relative',
	           		'left':'190px',
	           		'top':'105px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//起运地、经由、到达地 
				xtype : 'label',
				height:30,
				width:870,
				autoSize:false,
				name:'jibiHyPath',
				dock:'fill',
				text:jptBillInfoDetails[0].jibiHyPath,
        			 style:{
	           		'position': 'relative',
	           		'left':'168px',
	           		'top':'116px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			
			},{
				//费用项目及金额
				xtype : 'label',
				height:150,
				width:650,
				autoSize:false,
				dock:'fill',
					text:'',
        			 style:{
	           		'position': 'relative',
	           		'left':'90px',
	           		'top':'125px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//运输货物信息
				xtype : 'label',
				height:151,
				width:360,
				autoSize:false,
				dock:'fill',
				name:'jibiHyCargoInf',
				text:jptBillInfoDetails[0].jibiHyCargoInf,
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'128px',
	           		'top':'130px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//合计金额
				xtype : 'label',
				height:30,
				width:300,
				autoSize:false,
				dock:'fill',
				//text:goods.goodsType1,
				text:jptBillInfoDetails[0].jibiAmountTotal-jptBillInfoDetails[0].jibiAmountTax,
        			 style:{
	           		'position': 'relative',
	           		'left':'92px',
	           		'top':'130px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//税率
				xtype : 'label',
				height:25,
				width:40,
				autoSize:false,
				dock:'fill',
				//text:goods.goodsUnit1,
				name:'jibiJdhyRate',
				text:jptBillInfoDetails[0].jibiJdhyRate+'%',
        			 style:{
	           		'position': 'relative',
	           		'left':'136px',
	           		'top':'135px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//税额
				xtype : 'label',
				height:25,
				width:230,
				autoSize:false,
				name:'jibiAmountTax',
				text:jptBillInfoDetails[0].jibiAmountTax,
				dock:'fill',
        			 style:{
	           		'position': 'relative',
	           		'left':'195px',
	           		'top':'135px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//机器编号
				xtype : 'label',
				height:25,
				width:170,
				autoSize:false,
				dock:'fill',
				name:'jibiMachineNo',
				text:jptBillInfoDetails[0].jibiMachineNo,
        			 style:{
	           		'position': 'relative',
	           		'left':'275px',
	           		'top':'135px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//价税合计(大写)
				xtype : 'label',
				height:30,
				width:300,
				autoSize:false,
				dock:'fill',
				name:'jibiAmountTotal',
				text:DX(jptBillInfoDetails[0].jibiAmountTotal),//价税合计(大写)
        			 style:{
	           		'position': 'relative',
	           		'left':Ext.ieVersion>8||Ext.ieVersion==0?'-600px':'50px',
	   	    	     'top':Ext.ieVersion>8||Ext.ieVersion==0?'165px':'165px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//价税合计(小写)
				xtype : 'label',
				height:30,
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiAmountTotal',
				text:"￥"+format(jptBillInfoDetails[0].jibiAmountTotal),//价税合计(小写)
        			 style:{
	           		'position': 'relative',
	           		//ie8
	           		/*'left':'300px',
	           		'top':'-562px',*/
	           		/*'left':'160px',
	           		'top':'-562px',*/
	           		'left':Ext.ieVersion>8||Ext.ieVersion==0?'840px':'380px',
	   	   	    	 'top':Ext.ieVersion>8||Ext.ieVersion==0?'140px':'140px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//车种车号
				xtype : 'label',
				height:30,
				width:300,
				autoSize:false,
				name:'jibiHyVehicleNo',
				text:jptBillInfoDetails[0].jibiHyVehicleNo,
				dock:'fill',
        			 style:{
	           		'position': 'relative',
	           		'left':'-105px',
	           		'top':'170px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},
				
			{
				//车船吨位
				xtype : 'label',
				height:30,
				width:65,
				autoSize:false,
				dock:'fill',
				name:'jibiHyVehicleNo',
				text:jptBillInfoDetails[0].jibiHyVehicleNo,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-40px',
	           		'top':'170px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//主管税务机关
				xtype : 'label',
				height:30,
				width:350,
				autoSize:false,
				dock:'fill',
				name:'jibiJdhyCtaName',
				text:jptBillInfoDetails[0].jibiJdhyCtaName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-420px',
	           		'top':'210px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//代码
				xtype : 'label',
				height:30,
				width:350,
				autoSize:false,
				dock:'fill',
				name:'jibiJdhyCta',
				text:jptBillInfoDetails[0].jibiJdhyCta,
        			 style:{
	           		'position': 'relative',
	           		'left':'145px',
	           		'top':'210px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//备注
				xtype : 'label',
				height:80,
				width:400,
				autoSize:false,
				dock:'fill',
				name:'jibiRemark',
				text:jptBillInfoDetails[0].jibiRemark,
        			 style:{
	           		'position': 'relative',
	           		'left':'250px',
	           		'top':'150px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//收款人
				xtype : 'label',
				height:20,
				width:80,
				autoSize:false,
				//text:goods.quantity2,
				text:'',
				dock:'fill',
        			 style:{
	           		'position': 'relative',
	           		'left':'-650px',
	           		'top':'245px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//复核人
				xtype : 'label',
				height:20,
				width:90,
				autoSize:false,
				//text:goods.price2,
				text:'',
				dock:'fill',
        			 style:{
	           		'position': 'relative',
	           		'left':'-405px',
	           		'top':'245px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//开票人
				xtype : 'label',
				height:20,
				width:90,
				autoSize:false,
				//text:goods.amountTaxExc2,
				id:'',
				text:'',
				dock:'fill',
        			 style:{
	           		'position': 'relative',
	           		'left':'-305px',
	           		'top':'245px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			}]
		}
	}).show();
	myWin.on("close",function(){
		taxSumText="";
    	taxAmountSumText="";
    	goods=[];
 	 	taxSum=0;
 	 	taxAmountSum=0;
 	 	jptBillInfo=null;
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
	    return strOutput.replace(/零角零分$/, '整').replace(/零[亿万仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+圆/, '圆').replace(/亿零{0,3}万/, '亿').replace(/^圆/, "零圆"); 
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
	  case '5':
		  typeValue = '卷式';
		  break;
	  case '6':
		  typeValue = '通行费';
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
		  typeValue = '普通';
		  break;
	  case '1':
		  typeValue = '专用';
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
	if(invoiceType=="2"||invoiceType=="6"){
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
