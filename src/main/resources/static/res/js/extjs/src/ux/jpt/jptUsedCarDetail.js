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
 Ext.define("Ext.ux.jpt.jptUsedCarDetail", {
 	
 	 	alias: 'Ext.ux.jpt.jptUsedCarDetail'
 	 	 })

 /**.
  * 进项调用方法
  * @param {} grid  
  * @param {} rowIndex
  * @param {} type  明細頁面調用detail_HX(個性化查看明細) detail(標準版本)
  */
 var JPTUsedCarDetail=function  (grid,rowIndex){
 	flag="input";
 		Ext.Ajax.request({
 			url:'findJptInputBillInfoUsedCarDetail.ajax',//../findUsedCarDetail.html
 			async:false,
 			params:{
 				billId:grid.getStore().getAt(rowIndex).get('jibiBillId')
 			},
 			success:function(response){
 				var obj=Ext.decode(response.responseText);
 				/* xName=jptBillInfo.jibiSellerName;
 				 gName=jptBillInfo.jibiBuyerName;
 				 billCode=jptBillInfo.jibiBillCode;
 				 number=jptBillInfo.jibiBillNo;
 				 billId=jptBillInfo.jibiBillId;*/
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
		height : 800,
		width : 1040,
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
			bodyStyle:'background:url(res/img/car.png) no-repeat;',
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
	            	
	            	  window.open('jptUsedCarDetail.do?ssId=JPT&billId='+grid.getStore().getAt(rowIndex).get('jibiBillId'), 'mywindow1', 'width=1200, height=600, menubar=no, toolbar=no, scrollbars=yes');
	            	  
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
				xtype : 'tbtext',
        			text:'二手车销售统一发票',
        			 style:{
        			 'align':'center',
	           		 'position': 'relative',
	           		 'left':'440px',
	           		 'top':'0px',
	           		 'color':'dodgerblue',
	           		 'font-size': '20px'
	           }
			},
			{
				xtype : 'tbtext',
        			text:'出入库联',
        			 style:{
        			 'align':'center',
	           		 'position': 'relative',
	           		 'left':'450px',
	           		 'top':'15px',
	           		 'color':'dodgerblue',
	           		 'font-size': '20px'
	           }
			},
			{
				//发票号码
				xtype : 'label',
				height:20,
				width:100,
				autoSize:false,
				name:'jibiBillCode',
				
				dock:'fill',
					text:jptBillInfoDetails[0].jibiBillNo,//发票号码
        			 style:{
	           		'position': 'relative',
	           		'left':'600px',
	           		'top':'-10px',
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
				name:'jibiBillNo',
				dock:'fill',
					text:jptBillInfoDetails[0].jibiBillCode, //发票代码
        			 style:{
	           		'position': 'relative',
	           		'left':'500px',
	           		'top':'10px',
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
     	           		'left':'-350px',
     	           		'top':'11px',
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
	           		'left':'-450px',
	           		'top':'45px',
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
					text:'11111',//机打号码
        			 style:{
	           		'position': 'relative',
	           		'left':'-450px',
	           		'top':'18px',
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
					text:jptBillInfoDetails[0].jibiMachineNo,//机打号码
        			 style:{
	           		'position': 'relative',
	           		'left':'300px',
	           		'top':'2px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//税控码
				xtype : 'label',
				height:150,
				width:350,
				autoSize:false,
				name:'jibiJdPaymentNo',
				dock:'fill',
					text:jptBillInfoDetails[0].jibiJdPaymentNo,
        			 style:{
        				 'position': 'relative',
     	           		'left':'600px',
     	           		'top':'-20px',
     	           		 'color':'dodgerblue',
     	           		 'border':'0px',
     	           		 'word-break':'break-all',
     	           		 'word-wrap':'break-word',
     	           		 'font-size': '12px'
	           }
			
			},{
				//卖方单位个人
				xtype : 'label',
				height:70,
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiTxBuyer',
				text:jptBillInfoDetails[0].jibiTxBuyer,//卖方单位个人
				//text:'1111111111111111111111111',
				
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-150px',
	           		'top':'35px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//单位代码/身份证号
				xtype : 'label',
				height:70,
				width:170,
				autoSize:false,
				dock:'fill',
				name:'jibiTxBuyerId',
				text:jptBillInfoDetails[0].jibiTxBuyerId,
        			 style:{
	           		'position': 'relative',
	           		'left':'120px',	
	           		'top':'35px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//买方单位/个人住址
				xtype : 'label',
				height:70,
				width:300,
				autoSize:false,
				dock:'fill',
				name:'jibiTxBuyerAdress',
				text:jptBillInfoDetails[0].jibiTxBuyerAdress,//买方单位个人
				//text:'1111111111111111111111111',
				
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-120px',
	           		'top':'-1px',
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
				name:'jibiTxBuyerTel',
				text:jptBillInfoDetails[0].jibiTxBuyerTel,
        			 style:{
	           		'position': 'relative',
	           		'left':'100px',
	           		'top':'-1px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//卖方单位/个人
				xtype : 'label',
				height:70,
				width:300,
				autoSize:false,
				dock:'fill',
				name:'jibiTxSeller',
				text:jptBillInfoDetails[0].jibiTxSeller,//卖方单位/个人
				//text:'1111111111111111111111111',
				
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-150px',
	           		'top':'-30px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//单位代码/身份证号
				xtype : 'label',
				height:70,
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiTxSellerId',
				text:jptBillInfoDetails[0].jibiTxSellerId,
        			 style:{
	           		'position': 'relative',
	           		'left':'45px',
	           		'top':'-30px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},{
				//卖方单位/个人住址
				xtype : 'label',
				height:70,
				width:300,
				autoSize:false,
				dock:'fill',
				name:'jibiTxSellerAdress',
				text:jptBillInfoDetails[0].jibiTxSellerAdress,//卖方单位个人
				//text:'1111111111111111111111111',
				
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'380px',
	           		'top':'-70px',
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
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiTxSellerTel',
				text:jptBillInfoDetails[0].jibiTxSellerTel,
        			 style:{
	           		'position': 'relative',
	           		'left':'600px',
	           		'top':'-65px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			
			},
				
			{
				//车牌照号
				xtype : 'label',
				height:70,
				width:150,
				autoSize:false,
				dock:'fill',
				name:'jibiTxVehicleNo',
				text:jptBillInfoDetails[0].jibiTxVehicleNo,//车牌照号
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-180px',
	           		'top':'-35px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//登记证号
				xtype : 'label',
				height:70,
				width:100,
				autoSize:false,
				dock:'fill',
				name:'jibiEsCertificateNo',
				text:jptBillInfoDetails[0].jibiEsCertificateNo,//登记证号
				//text:'1111111111111111111111111',
				
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-50px',
	           		'top':'-30px',
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
				width:100,
				autoSize:false,
				dock:'fill',
				name:'jibiJdesVehicleType',
				text:jptBillInfoDetails[0].jibiJdesVehicleType,//车辆类型
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'140px',
	           		'top':'-30px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//车架号/车辆识别代码
				xtype : 'label',
				height:70,
				width:150,
				autoSize:false,
				dock:'fill',
				name:'jibiEsVehicleNo',
				text:jptBillInfoDetails[0].jibiEsVehicleNo,//车架号/车辆识别代码
				//text:'1111111111111111111111111',
				
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'-550px',
	           		'top':'-1px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//厂牌号
				xtype : 'label',
				height:70,
				width:150,
				autoSize:false,
				dock:'fill',
				name:'jibiJdesVehicleNo',
				text:jptBillInfoDetails[0].jibiJdesVehicleNo,//厂牌号
				//text:'1111111111111111111111111',
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'580px',
	           		'top':'-70px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//转入地车辆管理所名称
				xtype : 'label',
				height:70,
				width:150,
				autoSize:false,
				dock:'fill',
				name:'jibiEsManageAddress',
				text:jptBillInfoDetails[0].jibiEsManageAddress,//转入地车辆管理所名称
				//text:'1111111111111111111111111',
				html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'700px',
	           		'top':'-70px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},			{
				//价税合计(大写)
				xtype : 'label',
				height:70,
				width:300,
				autoSize:false,
				dock:'fill',
				text:'',//价税合计(大写)
        			 style:{
	           		'position': 'relative',
	           		//ie8
	           		/*'left':'180px',
	           		'top':'-562px',*/
	           		/*'left':'50px',
	           		'top':'-562px',*/
	           		'left':Ext.ieVersion>8||Ext.ieVersion==0?'50px':'180px',
	   	    	     'top':Ext.ieVersion>8||Ext.ieVersion==0?'-30px':'-30px',
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
				text:'',//价税合计(小写)
        			 style:{
	           		'position': 'relative',
	           		//ie8
	           		/*'left':'300px',
	           		'top':'-562px',*/
	           		/*'left':'160px',
	           		'top':'-562px',*/
	           		'left':Ext.ieVersion>8||Ext.ieVersion==0?'240px':'380px',
	   	   	    	 'top':Ext.ieVersion>8||Ext.ieVersion==0?'-30px':'-30px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//经营 、拍卖单位
				xtype : 'label',
				height:70,
				width:800,
				autoSize:false,
				dock:'fill',
				name:'jibiEsOperater',
				text:jptBillInfoDetails[0].jibiEsOperater,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'280px',	
	           		'top':'-65px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},		
			{
				//经营 、拍卖单位地址
				xtype : 'label',
				height:70,
				width:700,
				autoSize:false,
				dock:'fill',
				//text:jptBillInfoDetail.jibdGoodsName,//经营 、拍卖单位
				name:'jibiEsOperaterAddress',
				text:jptBillInfoDetails[0].jibiEsOperaterAddress,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'280px',	
	           		'top':'-95px',
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
				width:300,
				autoSize:false,
				dock:'fill',
				//text:jptBillInfoDetail.jibdGoodsName,//纳税人识别号
				name:'jibiEsOperaterTaxno',
				text:jptBillInfoDetails[0].jibiEsOperaterTaxno,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'180px',
	           		'top':'-95px',
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
				width:600,
				autoSize:false,
				dock:'fill',
				name:'jibiEsOperaterBank',
				text:jptBillInfoDetails[0].jibiEsOperaterBank,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'280px',
	           		'top':'-135px',
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
				width:200,
				autoSize:false,
				dock:'fill',
				name:'jibiEsOperaterTel',
				text:jptBillInfoDetails[0].jibiEsOperaterTel,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'255px',
	           		'top':'-135px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//二手车市场
				xtype : 'label',
				height:70,
				width:300,
				autoSize:false,
				dock:'fill',
				//text:jptBillInfoDetail.jibdGoodsName,//二手车市场
				name:'jibiEsLemonMarket',
				text:jptBillInfoDetails[0].jibiEsLemonMarket,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'280px',
	           		'top':'-150px',
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
				width:200,
				autoSize:false,
				dock:'fill',
				//text:jptBillInfoDetail.jibdGoodsName,//纳税人识别号
				name:'jibiEsLemonMarketTaxno',
				text:jptBillInfoDetails[0].jibiEsLemonMarketTaxno,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'360px',
	           		'top':'-160px',
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
				width:200,
				autoSize:false,
				dock:'fill',
				//text:jptBillInfoDetail.jibdGoodsName,//地址
				name:'jibiEsLemonMarketAddress',
				text:jptBillInfoDetails[0].jibiEsLemonMarketAddress,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'140px',
	           		'top':'-120px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//开户银行
				xtype : 'label',
				height:70,
				width:600,
				autoSize:false,
				dock:'fill',
				//text:jptBillInfoDetail.jibdGoodsName,//开户银行
				name:'jibiEsLemonMarketBank',
				text:jptBillInfoDetails[0].jibiEsLemonMarketBank,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'280px',
	           		'top':'-145px',
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
				width:200,
				autoSize:false,
				dock:'fill',
				//text:jptBillInfoDetail.jibdGoodsName,//电话
				name:'jibiEsLemonMarketTel',
				text:jptBillInfoDetails[0].jibiEsLemonMarketTel,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'260px',
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
				height:70,
				width:900,
				autoSize:false,
				dock:'fill',
				//text:jptBillInfoDetail.jibdGoodsName,//备注
				name:'jibiRemark',
				text:jptBillInfoDetails[0].jibiRemark,
				//html:goodsName,
        			 style:{
	           		'position': 'relative',
	           		'left':'135px',
	           		'top':'-180px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '12px'
	           }
			},{
				//开票人
				xtype : 'label',
				height:70,
				width:100,
				autoSize:false,
				dock:'fill',
				//text:jptBillInfoDetail.jibdGoodsName,//备注
				text:'',
				//html:goodsName,
        			 style:{
        				 'position': 'relative',
     	           		'left':'-210px',
     	           		'top':'-140px',
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
