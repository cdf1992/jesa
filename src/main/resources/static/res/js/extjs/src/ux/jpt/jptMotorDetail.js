  /**
   * 票样明细类
   * @type String
   */
  
//二手车
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
 Ext.define("Ext.ux.jpt.jptMotorDetail", {
 	
 	 	alias: 'Ext.ux.jpt.jptMotorDetail'
 	 	 })
//机动车发票
 /**.
  * 进项调用方法
  * @param {} grid  
  * @param {} rowIndex
  * @param {} type  明細頁面調用detail_HX(個性化查看明細) detail(標準版本)
  */
 var JPTMotorDetail=function  (grid,rowIndex){
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
			bodyStyle:'background:url(res/img/motor.png) no-repeat;',
			items : [
				{
				xtype : 'fieldset',
				name : 'buff',
				width:1040,
				height:45,
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
				//查验次数
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
	            	
	            	  window.open('jptMotorDetail.do?ssId=JPT&billId='+grid.getStore().getAt(rowIndex).get('jibiBillId'), 'mywindow1', 'width=1200, height=600, menubar=no, toolbar=no, scrollbars=yes'); 
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
			},
			{
				//发票号码
				xtype : 'label',
				height:20,
				width:100,
				autoSize:false,
				name:'jibiBillNo',
				dock:'fill',
					text:jptBillInfoDetails[0].jibiBillNo,//发票号码
        			 style:{
	           		'position': 'relative',
	           		'left':'950px',
	           		'top':'18px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			},{
				//发票代码
				xtype : 'label',
				height:20,
				width:100,
				autoSize:false,
				name:'jibiBillCode',
				dock:'fill',
					text:jptBillInfoDetails[0].jibiBillCode, //发票代码
        			 style:{
	           		'position': 'relative',
	           		'left':'850px',
	           		'top':'43px',
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
					text:ConvertDateFromString(jptBillInfoDetails[0].jibiBillDate),//开票日期,
        			 style:{
        				 'position': 'relative',
     	           		'left':'-100px',	
     	           		'top':'50px',
     	           		 'color':'dodgerblue',
     	           		 'border':'0px',
     	           		 'word-break':'break-all',
     	           		 'word-wrap':'break-word',
     	           		 'font-size': '16px'
	           }
			
			},{
				//机打代码
				xtype : 'label',
				height:50,
				width:150,
				autoSize:false,
				name:'',
				dock:'fill',
					text:'',//机打代码
        			 style:{
	           		'position': 'relative',
	           		'left':'-300px',
	           		'top':'100px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			
			},{
				//机打号码
				xtype : 'label',
				height:50,
				width:150,
				autoSize:false,
				name:'',
				dock:'fill',
					text:'',//机打号码
        			 style:{
	           		'position': 'relative',
	           		'left':'-450px',
	           		'top':'140px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//机器编号
				xtype : 'label',
				height:50,
				width:150,
				autoSize:false,
				name:'jibiMachineNo',
				dock:'fill',
					text:jptBillInfoDetails[0].jibiMachineNo,//机打编号
        			 style:{
	           		'position': 'relative',
	           		'left':'-600px',
	           		'top':'175px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//税控码
				xtype : 'label',
				height:300,
				width:600,
				autoSize:false,
				name:'jibiJdPaymentNo',
				dock:'fill',
					text:'',
        			 style:{
        				 'position': 'relative',
     	           		'left':'600px',
     	           		'top':'70px',
     	           		 'color':'dodgerblue',
     	           		 'border':'0px',
     	           		 'word-break':'break-all',
     	           		 'word-wrap':'break-word',
     	           		 'font-size': '18px'
	           }
			
			},{
				//购方名称
				xtype : 'label',
				height:40,
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiBuyerName',
				text:jptBillInfoDetails[0].jibiBuyerName,//购方名称
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-450px',
	           		'top':'160px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//身份证号/组织机构代码
				xtype : 'label',
				height:50,
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiJdId',
				text:jptBillInfoDetails[0].jibiJdId,
        			 style:{
	           		'position': 'relative',
	           		'left':'-650px',	
	           		'top':'180px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//组织机构代码
				xtype : 'label',
				height:50,
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiTxBuyerAdress',
				//text:jptBillInfoDetails[0].jibiTxBuyerAdress,//组织机构代码
				text:'',
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-450px',
	           		'top':'150px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//纳税人识别号
				xtype : 'label',
				height:70,
				width:250,
				autoSize:false,
				dock:'fill',
				name:'jibiBuyerTaxno',
				text:jptBillInfoDetails[0].jibiBuyerTaxno,
        			 style:{
	           		'position': 'relative',
	           		'left':'150px',
	           		'top':'86px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//车辆类型
				xtype : 'label',
				height:70,
				width:180,
				autoSize:false,
				dock:'fill',
				name:'jibiJdesVehicleType',
				text:jptBillInfoDetails[0].jibiJdesVehicleType,
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-650px',
	           		'top':'130px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//厂牌型号
				xtype : 'label',
				height:70,
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiJdesVehicleNo',
				text:jptBillInfoDetails[0].jibiJdesVehicleNo,
        			 style:{
	           		'position': 'relative',
	           		'left':'-160px',
	           		'top':'62px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//产地
				xtype : 'label',
				height:70,
				width:100,
				autoSize:false,
				dock:'fill',
				name:'jibiJdProducedarea',
				text:jptBillInfoDetails[0].jibiJdProducedarea,
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'120px',
	           		'top':'65px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//合格证号
				xtype : 'label',  
				height:70,
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiJdCertificateNo',
				text:jptBillInfoDetails[0].jibiJdCertificateNo,
        			 style:{
	           		'position': 'relative',
	           		'left':'-450px',
	           		'top':'30px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},
				
			{
				//进口证明书号
				xtype : 'label',
				height:70,
				width:150,
				autoSize:false,
				dock:'fill',
				name:'jibiJdImportNo',
				text:jptBillInfoDetails[0].jibiJdImportNo,//车牌照号
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-250px',
	           		'top':'30px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//商检单号
				xtype : 'label',
				height:70,
				width:100,
				autoSize:false,
				dock:'fill',
				name:'jibiJdCommodityNo',
				text:jptBillInfoDetails[0].jibiJdCommodityNo,//商检单号
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'850px',
	           		'top':'-40px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//发动机号码
				xtype : 'label',
				height:70,
				width:250,
				autoSize:false,
				dock:'fill',
				name:'jibiJdEngineNo',
				text:jptBillInfoDetails[0].jibiJdEngineNo,//车辆类型
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'100px',
	           		'top':'-10px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//车辆识别号代码
				xtype : 'label',
				height:70,
				width:250,
				autoSize:false,
				dock:'fill',
				name:'jibiJdVehicleNo',
				text:jptBillInfoDetails[0].jibiJdVehicleNo,//车辆识别号代码
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'350px',
	           		'top':'-10px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//价税合计(大写)
				xtype : 'label',
				height:70,
				width:300,
				autoSize:false,
				dock:'fill',
				name:'jibiAmountTotal',
				text:DX(jptBillInfoDetails[0].jibiAmountTotal),//价税合计(大写)
        			 style:{
	           		'position': 'relative',
	           		'left':Ext.ieVersion>8||Ext.ieVersion==0?'-450px':'50px',
	   	    	     'top':Ext.ieVersion>8||Ext.ieVersion==0?'25px':'25px',
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
				name:'jibiAmountTotal',
				text:"￥"+format(jptBillInfoDetails[0].jibiAmountTotal),//价税合计(小写)
        			 style:{
	           		'position': 'relative',
	           		//ie8
	           		/*'left':'300px',
	           		'top':'-562px',*/
	           		/*'left':'160px',
	           		'top':'-562px',*/
	           		'left':Ext.ieVersion>8||Ext.ieVersion==0?'750px':'380px',
	   	   	    	 'top':Ext.ieVersion>8||Ext.ieVersion==0?'-40px':'-40px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//销货单位名称
				xtype : 'label',
				height:70,
				width:350,
				autoSize:false,
				dock:'fill',
				name:'jibiSellerName',
				text:jptBillInfoDetails[0].jibiSellerName,
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-80px',
	           		'top':'0px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//电话
				xtype : 'label',
				height:70,
				width:150,
				autoSize:false,
				dock:'fill',
				name:'jibiJdTel',
				text:jptBillInfoDetails[0].jibiJdTel,
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'150px',
	           		'top':'5px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//纳税人识别号
				xtype : 'label',
				height:70,
				width:400,
				autoSize:false,
				dock:'fill',
				name:'jibiSellerTaxno',
				text:jptBillInfoDetails[0].jibiSellerTaxno,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'150px',	
	           		'top':'-25px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},		
			{
				//账号
				xtype : 'label',
				height:70,
				width:400,
				autoSize:false,
				dock:'fill',
				name:'jibiJdAccount',
				text:jptBillInfoDetails[0].jibiJdAccount,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'350px',	
	           		'top':'-25px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//地址
				xtype : 'label',
				height:70,
				width:400,
				autoSize:false,
				dock:'fill',
				name:'jibiJdAdress',
				text:jptBillInfoDetails[0].jibiJdAdress,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'150px',
	           		'top':'-55px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//开户银行账号
				xtype : 'label',
				height:70,
				width:400,
				autoSize:false,
				dock:'fill',
				name:'jibiJdBank',
				text:jptBillInfoDetails[0].jibiJdBank,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'220px',
	           		'top':'-55px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//增值税税率或征收率
				xtype : 'label',
				height:70,
				width:300,
				autoSize:false,
				dock:'fill',
				name:'jibiJdhyRate',
				text:jptBillInfoDetails[0].jibiJdhyRate,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'180px',
	           		'top':'-85px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//增值税税率
				xtype : 'label',
				height:70,
				width:300,
				autoSize:false,
				dock:'fill',
				name:'jibiJdhyRate',
				text:jptBillInfoDetails[0].jibiJdhyRate,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'90px',
	           		'top':'-85px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//主管税务机关及代码
				xtype : 'label',
				height:70,
				width:400,
				autoSize:false,
				dock:'fill',
				name:'jibiJdhyCta',
				text:jptBillInfoDetails[0].jibiJdhyCta,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'100px',
	           		'top':'-85px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//不含税价(小写)
				xtype : 'label',
				height:70,
				width:300,
				autoSize:false,
				dock:'fill',
				text:'',//不含税价(小写)
        			 style:{
	           		'position': 'relative',
	           		//ie8
	           		/*'left':'300px',
	           		'top':'-562px',*/
	           		/*'left':'160px',
	           		'top':'-562px',*/
	           		'left':Ext.ieVersion>8||Ext.ieVersion==0?'160px':'380px',
	   	   	    	 'top':Ext.ieVersion>8||Ext.ieVersion==0?'-110px':'-40px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//完税凭证号码
				xtype : 'label',
				height:70,
				width:300,
				autoSize:false,
				dock:'fill',
				name:'jibiJdPaymentNo',
				text:jptBillInfoDetails[0].jibiJdPaymentNo,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'200px',
	           		'top':'-110px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//吨位
				xtype : 'label',
				height:70,
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiJdhyTonnage',
				text:jptBillInfoDetails[0].jibiJdhyTonnage,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'200px',
	           		'top':'-110px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//限乘人数
				xtype : 'label',
				height:70,
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiJdLimitedPas',
				text:jptBillInfoDetails[0].jibiJdLimitedPas,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'170px',
	           		'top':'-110px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//开票人
				xtype : 'label',
				height:40,
				width:300,
				autoSize:false,
				dock:'fill',
				//text:jptBillInfoDetail.jibdGoodsName,//备注
				text:'',
				//html:goodsName,
        			 style:{
        				 'position': 'relative',
     	           		'left':'470px',
     	           		'top':'-145px',
     	           		 'color':'dodgerblue',
     	           		 'border':'0px',
     	           		 'word-break':'break-all',
     	           		 'word-wrap':'break-word',
     	           		 'font-size': '12px'
	           }
			},{
				//备注
				xtype : 'label',
				height:40,
				width:100,
				autoSize:false,
				dock:'fill',
				name:'jibiRemark',
				text:jptBillInfoDetails[0].jibiRemark,//备注
				//html:goodsName,
        			 style:{
        				 'position': 'relative',
     	           		'left':'500px',
     	           		'top':'-145px',
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
