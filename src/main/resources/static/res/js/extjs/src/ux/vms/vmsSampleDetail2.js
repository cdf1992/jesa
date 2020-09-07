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
 var VmsBillJDCItemInfo=null;
 //var jptBillInfoDetail=null;
 Ext.define("Ext.ux.vms.vmsSampleDetail2", {
 	
 	 	alias: 'Ext.ux.vms.vmsSampleDetail2'
 	 	 })

/**
 * 销项调用方法
 * @param {} grid
 * @param {} rowIndex
 */
var VMSOutPutBillInfoDetailJDC=function  (grid,rowIndex){
	flag="out";
	Ext.Ajax.request({
		url:'findVMSBillJDCInfoSample.ajax',
		async:false,
		params:{
			billId:grid.getStore().getAt(rowIndex).get('billId')
		},
		success:function(response){
			var obj=Ext.decode(response.responseText);
			vmsBillInfo=obj.billInfo;    //进项发票信息
			vmsBillInfoDetails=obj.billItemInfos;  //进项发票明细
			VmsBillJDCItemInfo=obj.billjdcItemInfo//机动车发票明细
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
        height : 650,
		width : 1560,
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
			bodyStyle:'background:url(res/img/JDCpiaoyang.png) no-repeat;',
			items : [{
				xtype : 'fieldset',
				name : 'buff',
				width:1560,
				height:30,
				layout:'column',
				 style:{
	           		'position': 'relative',
	           		'left':'0px',
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
            width:70,  
            height:30,  
            text:'<span style="font-size:16px;">关闭</span>',
             style:{
	           		'position': 'relative',
	           		'left':'1400px',
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
        			text:'机动车统一销售发票',
        			 style:{
        			 'align':'center',
	           		 'position': 'relative',
	           		 'left':'700px',
	           		 'top':'0px',
	           		 'color':'dodgerblue',
	           		 'font-size': '25px'
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
	           		'left':'50px',
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
	           		'left':'-110px',
	           		'top':'70px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '20px'
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
	           		'left':'460px',
	           		'top':'90px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '20px'
	           }
			
			},{
				//金额
				xtype : 'label',
				height:70,
				width:135,
				autoSize:false,
				text:"￥"+format(goods.amountTaxExc1),
				dock:'fill',
        			 style:{
	           		'position': 'relative',
	           		'left':'-835px',
	           		'top':'475px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '15px'
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
	           		'left':'-925px',
	           		'top':'420px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '15px'
	           }
			
			},{
				//税额
				xtype : 'label',
				height:70,
				width:145,
				text:"￥"+format(goods.amountTax1),
				autoSize:false,
				dock:'fill',
        			 style:{
	           		'position': 'relative',
	           		'left':'-600px',
	           		'top':'420px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '15px'
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
	           		'left':'185px',
	           		'top':'370px',
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
	           		'left':'1400px',
	           		'top':'380px',
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
	           		'top':'410px',
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
	           		'left':'160px',
	           		'top':'450px',
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
	           		'top':'480px',
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
	           		'left':'955px',
	           		'top':'480px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//身份证或机构证书
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.idCard,//身份证或机构证书
        			 style:{
	           		'position': 'absolute',
	           		'left':'160px',
	           		'top':'210px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '20px'
	           }
			
			},{
				//车辆类型
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.vehicleKind,//车辆类型
        			 style:{
	           		'position': 'absolute',
	           		'left':'160px',
	           		'top':'265px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//厂牌型号
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.brandModel,//厂牌型号
        			 style:{
	           		'position': 'absolute',
	           		'left':'765px',
	           		'top':'265px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//产地
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.originPlace,//产地
        			 style:{
	           		'position': 'absolute',
	           		'left':'1285px',
	           		'top':'265px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//合格证号
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.qualityCertificate,//合格证号
        			 style:{
	           		'position': 'absolute',
	           		'left':'160px',
	           		'top':'300px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//合格证号
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.impCertificateNo,//进口证明书号
        			 style:{
	           		'position': 'absolute',
	           		'left':'880px',
	           		'top':'300px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//商检单号
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.commInspectionNo,//商检单号
        			 style:{
	           		'position': 'absolute',
	           		'left':'1285px',
	           		'top':'300px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//发动机号码
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.engineNo,//发动机号码
        			 style:{
	           		'position': 'absolute',
	           		'left':'160px',
	           		'top':'340px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//车辆识别代号、车辆号码
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.vehicleNo,//车辆识别代号、车辆号码
        			 style:{
	           		'position': 'absolute',
	           		'left':'1105px',
	           		'top':'340px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//销货单位电话
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.sellerPhoneh,//销货单位电话
        			 style:{
	           		'position': 'absolute',
	           		'left':'1105px',
	           		'top':'415px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//销货单位账号
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.sellerAccount,//销货单位账号
        			 style:{
	           		'position': 'absolute',
	           		'left':'1105px',
	           		'top':'450px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//吨位
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.tonnage,//吨位
        			 style:{
	           		'position': 'absolute',
	           		'left':'1175px',
	           		'top':'580px',
	           		 'color':'dodgerblue',
	           		 'border':'0px',
	           		 'word-break':'break-all',
	           		 'word-wrap':'break-word',
	           		 'font-size': '16px'
	           }
			
			},{
				//限乘人数
				xtype : 'label',
				height:50,
				width:300,
				autoSize:false,
				dock:'fill',
				text:VmsBillJDCItemInfo.peopleNo,//限乘人数
        			 style:{
	           		'position': 'absolute',
	           		'left':'1455px',
	           		'top':'580px',
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
