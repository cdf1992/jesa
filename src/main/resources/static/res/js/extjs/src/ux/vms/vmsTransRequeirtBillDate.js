
//综合查询交易id查询票据信息
 	 Ext.define('Ext.ux.vms.vmsTransRequeirtBillDate', {
 	 	alias:'Ext.ux.vms.vmsTransRequeirtBillDate'
 	 	 })

var requeirtBill=function(transId){
	var storeBill = Ext.create("Ext.data.Store", {
	    fields : ['applyDate','billDate','instname','customerName','customerTaxno','billCode','billNo','amtSum','taxAmtSum','sumAmt'
	    	,'isHandiwork','fapiaoType','issueType','datastatus','addTexType','vatRateCode'],
	    proxy : {
			type : 'ajax',
			url : 'vmsTransactionInquireSelectBillDate.ajax?transId='+transId,
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
		autoLoad:true
	});
	
	var billDetailWin=	Ext.Ajax.request({
			url : 'vmsTransactionInquireSelectDate.ajax',
			dataType: "json",
			params : {transId:transId},
			success : function(response) { 
					var result=Ext.decode(response.responseText);
					var transInfo = result.transInfo;
					var dic=result.dic;
					var taxpayerType = "";
					if(transInfo[0].taxpayerType!=undefined){
						taxpayerType = Ext.decode(result.VMS_TAXPAYER_TYPE)[''+transInfo[0].taxpayerType+''].value;
					}
					var transFlag = "";
					if(transInfo[0].transFlag!=undefined){
						transFlag = Ext.decode(result.VMS_TRANS_FLAG_TYPE)[''+transInfo[0].transFlag+''].value;
					}
					var transFapiaoFlag="";
					if(transInfo[0].transFapiaoFlag!=undefined){
						transFapiaoFlag = Ext.decode(result.VMS_CUSTOMER_FAPIAO_FLAG)[''+transInfo[0].transFapiaoFlag+''].value;
					}
					var fapiaoType="";
					if(transInfo[0].fapiaoType!=undefined){
						fapiaoType = Ext.decode(result.VMS_BILL_TYPE)[''+transInfo[0].fapiaoType+''].value;
					}
					var vatRateCode="";
						if(transInfo[0].vatRateCode!=undefined){
							vatRateCode = Ext.decode(result.VMS_RATE_CODE_STATUS)[''+transInfo[0].vatRateCode+''].value;
						}
					var taxFlag="";
					if(transInfo[0].taxFlag!=undefined){
						taxFlag = Ext.decode(result.VMS_IS_REVERSE_TYPE)[''+transInfo[0].taxFlag+''].value;
					}
					
					var isReverse="";
					if(transInfo[0].isReverse!=undefined){
						isReverse = Ext.decode(result.VMS_IS_REVERSE_TYPE)[''+transInfo[0].isReverse+''].value;
					}
					var addTexType="";
					if(transInfo[0].addTexType!=undefined){
						addTexType = Ext.decode(result.VMS_BILL_TYPE)[''+transInfo[0].addTexType+''].value;
					}
					var manualWin=Ext.create('Ext.window.Window', {
						layout : 'fit',
						modal : true,// 设置是否添加遮罩
						draggable : true,// 拖动
						resizable : true, // 变大小
						autoScroll : false,
						width:750,
						title : '交易信息界面',
						height:450,
						items : [{
							xtype : 'gridpanel',
							layout : 'fit',
							tbar : {
								xtype : 'container',
								items : [{					
									xtype:'form',
									items:[{
										xtype:'toolbar',
					        	 		layout:'column',
					        	 		border:0,
										items : [{
											fieldLabel: '客户名称',
											xtype: 'textfield',
										    displayField: 'text',    
										    readOnly: true,
										    value:transInfo[0].customerName,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '客户账号',
											xtype: 'textfield',
										    displayField: 'text',    
										    readOnly: true,
								            fieldStyle:'border:none',
								            value:transInfo[0].customerId,
										    labelAlign:'right',
										},{
											fieldLabel: '交易时间',
											xtype: 'textfield',
										    displayField: 'text',    
										    readOnly: true,
								            fieldStyle:'border:none',
										    value:transInfo[0].transDate,
										    labelAlign:'right',
										},{
											fieldLabel: '纳税人类型',
											xtype: 'textfield',
											 value:taxpayerType,
										    displayField: 'text',    
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '纳税人识别号',
											xtype: 'textfield',
											value:transInfo[0].customerTaxno,
										    displayField: 'text',    
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '交易类型',
											xtype: 'textfield',
										    displayField: 'text',    
										    readOnly: true,
										    value:transInfo[0].transTypeName,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '交易标志',
											xtype: 'textfield',
										    displayField: 'text',    
										    readOnly: true,
										    
										    value:transFlag,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '是否打票',
											xtype: 'textfield',
											
											value:transFapiaoFlag,
										    displayField: 'text',    
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '交易编号',
											xtype: 'textfield',
											 value:transInfo[0].transId,
										    displayField: 'text',    
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '交易金额',
											xtype: 'textfield',
											//value:transInfo[0].amtCny,
											value:Ext.util.Format.number(transInfo[0].amtCny,'0,000.00'),
										    displayField: 'text',    
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '发票类型',
											xtype: 'textfield',
										    displayField: 'text', 
										    readOnly: true,
										    value:fapiaoType,
								            fieldStyle:'border:none',
								            
										    labelAlign:'right',
										},{
											fieldLabel: '是否冲账',
											xtype: 'textfield',
											value:isReverse,
										    displayField: 'text',    
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '税率',
											xtype: 'textfield',
										    displayField: 'text',    
										    value:transInfo[0].taxRate,
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '税额',
											xtype: 'textfield',
										    displayField: 'text',    
										    //value:transInfo[0].taxAmtCny,
										    value:Ext.util.Format.number(transInfo[0].taxAmtCny,'0,000.00'),
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '是否含税',
											xtype: 'textfield',
											value:taxFlag,
										    displayField: 'text',    
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '收入',
											xtype: 'textfield',
										    displayField: 'text',    
										    readOnly: true,
										    //value:transInfo[0].incomeCny,
										    value:Ext.util.Format.number(transInfo[0].incomeCny,'0,000.00'),
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '未开票金额',
											xtype: 'textfield',
										    displayField: 'text',    
										    readOnly: true,
										    //value:transInfo[0].balance,
										    value:Ext.util.Format.number(transInfo[0].balance,'0,000.00'),
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '价税合计',
											xtype: 'textfield',
											//value:transInfo[0].amtCny,
											value:Ext.util.Format.number(transInfo[0].amtCny,'0,000.00'),
										    displayField: 'text',    
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '状态',
											xtype: 'textfield',
										    displayField: 'text',    
										    readOnly: true,
										    value:Ext.decode(result.VMS_TRANS_DATA_STATUS)[''+transInfo[0].datastatus+''].value,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										},{
											fieldLabel: '备注',
											xtype: 'textfield',
										    displayField: 'text',    
										    value:transInfo[0].remark,
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										}
										,{
											fieldLabel: '合约号',
											xtype: 'textfield',
										    displayField: 'text',    
										    value:transInfo[0].contractNumber,
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										}
										,{
											fieldLabel: '凭证号',
											xtype: 'textfield',
										    displayField: 'text',    
										    value:transInfo[0].voucherNo,
										    readOnly: true,
								            fieldStyle:'border:none',
										    labelAlign:'right',
										}
										]
					         },{

					        	 	xtype:'toolbar',	
									html:null,
									border:0,
									bodyStyle: 'backgroundColor:#d8d8d8;backgroundImage: -webkit-linear-gradient(top,#e6e6e6,#efefef);',
									layout:'column',
									items: [{

										text : '关闭',
										iconCls : "close-icon",
										handler : function(wi) {
											manualWin.hide();
										}
									
									},{
										xtype: 'button',
										text : '导出',
										iconCls : "undo-icon",
										handler : function() {
											var fs = manualWin.down('form').getForm().getValues();
											var column = manualWin.down('grid').columns; 
											var grid = manualWin.down('grid').getSelectionModel().getSelection();
											exportExcel(column,"交易开票记录",'vmsTransactionInquireSelectBillDate.ajax?transId='+transId,fs,grid);
										}
									}]

					         }
					         ]}
								]
							},
							layout : 'fit',
							forceFit:true,
							selType : 'checkboxmodel',
							store:storeBill,
							columns: [
								{header : '序号',xtype : 'rownumberer',width:50,align : 'center'},
							    {text : '申请日期',dataIndex: 'applyDate',align : 'center',width:80},
							    {text : '开票日期',dataIndex: 'billDate',align : 'center',width:80},
							    {text : '机构',dataIndex: 'instname',align : 'center',width:80},
							    {text : '客户名称',dataIndex: 'customerName',align : 'center',width:80},
								{text : '纳税人识别号',dataIndex: 'customerTaxno',align : 'center',width:110},
								{text : '发票代码',dataIndex: 'billCode',align : 'center',width:80},
								{text : '发票号码',dataIndex: 'billNo',align : 'center',width:80},
								//{text : '合计金额',dataIndex: 'amtSum',align : 'center',width:80},
								//{text : '合计税额',dataIndex: 'taxAmtSum',align : 'center',width:80},
								//{text : '价税合计',dataIndex: 'sumAmt',align : 'center',width:80},
								{text : '合计金额',dataIndex: 'amtSum',align : 'center',width:80,renderer:function(value){
									var value = Ext.util.Format.number(value,'0,000.00');
									return value;
									
								}},
								{text : '合计税额',dataIndex: 'taxAmtSum',align : 'center',width:80,renderer:function(value){
									var value = Ext.util.Format.number(value,'0,000.00');
									return value;
									
								}},
								{text : '价税合计',dataIndex: 'sumAmt',align : 'center',width:80,renderer:function(value){
									var value = Ext.util.Format.number(value,'0,000.00');
									return value;
									
								}},
								{text : '发票类型',dataIndex: 'fapiaoType',align : 'center',width:80,renderer:function(value){
									if(Ext.isEmpty(value)){
										return value;
									}
									return Ext.decode(result.VMS_BILL_TYPE)[''+value+''].value;
								}},
								{text : '状态',dataIndex: 'datastatus',align : 'center',width:80,renderer:function(value){
									if(Ext.isEmpty(value)){
										return value;
									}
									return Ext.decode(result.VMS_BILL_STATUS)[''+value+''].value;
								}
							
								}
								],dockedItems:{
						     	xtype:'jespaging',
						     	autoShow:true,
						     	store:storeBill,
						     	dock:'bottom',
						     	displayInfo:true
						     }
						}]
					
					}).show();
			}
		});
	
	
}
 	 
var requeirtBillApply=function(transId,gridStore){
		var  storeTransType=Ext.create('Ext.data.Store', {
	         fields : ['key', 'value'],  
	         data : transTypeStatus
	     });
		var  storeFapiaoType=Ext.create('Ext.data.Store', {
	         fields : ['key', 'value'],  
	         data : vmsFapiaoTypeList
	     });
		var  RateCodeType=Ext.create('Ext.data.Store', {
	         fields : ['key', 'value'],  
	         data : RateCodeStatus
	     });
 		var billDetailWin=	Ext.Ajax.request({
 				url : 'vmsTransactionInquireSelectApplyDate.ajax',
 				dataType: "json",
 				params : {transId:transId},
 				success : function(response) { 
 						var result=Ext.decode(response.responseText);
 						var transInfo = result.transInfo;
 						var dic=result.dic;
 						var taxpayerType = "";
 						if(transInfo[0].taxpayerType!=undefined){
 							taxpayerType = Ext.decode(result.VMS_TAXPAYER_TYPE)[''+transInfo[0].taxpayerType+''].value;
 						}
 						var transFlag = "";
 						if(transInfo[0].transFlag!=undefined){
 							transFlag = Ext.decode(result.VMS_TRANS_FLAG_TYPE)[''+transInfo[0].transFlag+''].value;
 						}
 						var transFapiaoFlag="";
 						if(transInfo[0].transFapiaoFlag!=undefined){
 							transFapiaoFlag = Ext.decode(result.VMS_CUSTOMER_FAPIAO_FLAG)[''+transInfo[0].transFapiaoFlag+''].value;
 						}
 						var fapiaoType="";
 						if(transInfo[0].fapiaoType!=undefined){
 							fapiaoType = Ext.decode(result.VMS_BILL_TYPE)[''+transInfo[0].fapiaoType+''].value;
 						}
 						var vatRateCode="";
 						if(transInfo[0].vatRateCode!=undefined){
 							vatRateCode = Ext.decode(result.VMS_RATE_CODE_STATUS)[''+transInfo[0].vatRateCode+''].value;
 						}
 						var taxFlag="";
 						if(transInfo[0].taxFlag!=undefined){
 							taxFlag = Ext.decode(result.VMS_IS_REVERSE_TYPE)[''+transInfo[0].taxFlag+''].value;
 						}
 						
 						var isReverse="";
 						if(transInfo[0].isReverse!=undefined){
 							isReverse = Ext.decode(result.VMS_IS_REVERSE_TYPE)[''+transInfo[0].isReverse+''].value;
 						}
 						/*var transAditorWin;//new Ext.window.Window({
						transAditorWin=new Ext.window.Window({*/
 						var transAditorWin = Ext
						.create(
								'Ext.window.Window',
								{
							layout : 'fit',
							/*modal : true,// 设置是否添加遮罩
							draggable : true,// 拖动
							resizable : true, // 变大小
							autoScroll : false,*/
							modal : true,// 设置是否添加遮罩
							draggable : false,// 拖动
							resizable : false, // 变大小
							autoScroll : false,
							width:750,
							title : '交易信息界面',
							items : [{
									xtype : 'container',
									items : [{					
										xtype:'form',
										items:[{
											xtype:'toolbar',
						        	 		layout:'column',
						        	 		border:0,
											items : [{
 												fieldLabel: '客户名称',
 												xtype: 'textfield',
 											    displayField: 'text',    
 											    readOnly: true,
 											    value:transInfo[0].customerName==null?"":transInfo[0].customerName,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											},{
 												fieldLabel: '客户账号',
 												xtype: 'textfield',
 											    displayField: 'text',    
 											    readOnly: true,
 									            fieldStyle:'border:none',
 									            value:transInfo[0].customerId,
 											    labelAlign:'right',
 											},{
 												fieldLabel: '交易时间',
 												xtype: 'textfield',
 											    displayField: 'text',    
 											    readOnly: true,
 									            fieldStyle:'border:none',
 											    value:transInfo[0].transDate,
 											    labelAlign:'right',
 											},{
 												fieldLabel: '纳税人类型',
 												xtype: 'textfield',
 												value:taxpayerType,
 											    displayField: 'text',    
 											    readOnly: true,
 									            fieldStyle:'border:none',
 									            hidden:cus_flag==false?true:false,
 											    labelAlign:'right',
 											},{
 												fieldLabel: '纳税人识别号',
 												xtype: 'textfield',
 												value:transInfo[0].customerTaxno,
 											    displayField: 'text',    
 											    readOnly: true,
 									            fieldStyle:'border:none',
 											    labelAlign:'right'
 											}/*,{
 												fieldLabel: '交易类型',
 												xtype: 'textfield',
 											    displayField: 'text',    
 											    readOnly: true,
 											    value:transInfo[0].transTypeName,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											}*/,{
 												fieldLabel: '交易标志',
 												xtype: 'textfield',
 											    displayField: 'text',    
 											    readOnly: true,
 											    value:transFlag,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											},{
 												fieldLabel: '是否打票',
 												xtype: 'textfield',
 												value:transFapiaoFlag,
 											    displayField: 'text',    
 											    readOnly: true,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											},{
 												fieldLabel: '交易编号',
 												xtype: 'textfield',
 												value:transInfo[0].transId,
 											    displayField: 'text',    
 											    readOnly: true,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											},{
 												fieldLabel: '交易金额',
 												xtype: 'textfield',
 												id:'amtCny',
 												//value:transInfo[0].amtCny,
 												value:Ext.util.Format.number(transInfo[0].amtCny,'0,000.00'),
 											    displayField: 'text',    
 											    //readOnly: true,
 									            fieldStyle:'border:3',
 											    labelAlign:'right',
 											},{
 												xtype: 'combobox',
 											    fieldLabel: '交易类型',
 											    id:'transType',
 											    name:'transType',
 											    labelAlign: 'right',
 											    queryMode: 'local',
 											    displayField: 'value',
 											    valueField: 'key',
 											    store:storeTransType , 
 									            displayField : 'value',  
 									            emptyText : '请选择',  
 									            editable : false,  
 									            selectOnFocus : true,
 									            hidden:cus_flag,
 									            listeners : {
 											    	afterRender : function(combo) {
 											    		combo.select(transInfo[0].transType);
 											    	}
 											    }
 											},{
 												xtype: 'combobox',
 											    fieldLabel: '发票类型',
 											    id:'fapiaoType',
 											    name:'fapiaoType',
 											    labelAlign: 'right',
 											    queryMode: 'local',
 											    displayField: 'value',
 											    valueField: 'key',
 											    store:storeFapiaoType , 
 									            displayField : 'value',  
 									            emptyText : '请选择',  
 									            editable : false,  
 									            selectOnFocus : true,
 									            hidden:cus_flag,
 									            listeners : {
 											    	afterRender : function(combo) {
 											    		combo.select(transInfo[0].fapiaoType);
 											    	}
 											    }
 											},{
 												xtype: 'combobox',
 											    fieldLabel: '增值税类型',
 											    id:'vatRateCode',
 											    name:'vatRateCode',
 											    labelAlign: 'right',
 											    queryMode: 'local',
 											    displayField: 'value',
 											    valueField: 'key',
 											    store:RateCodeType, 
 									            displayField : 'value',  
 									            emptyText : '请选择',  
 									            editable : false,  
 									            selectOnFocus : true,
 									            hidden:cus_flag,
 									            listeners : {
 											    	afterRender : function(combo) {
 											    		combo.select(transInfo[0].vatRateCode);
 											    	}
 											    }
 											},
 											{
 												fieldLabel: '是否冲账',
 												xtype: 'textfield',
 												value:isReverse,
 											    displayField: 'text',    
 											    readOnly: true,
 											    hidden:cus_flag==false?true:false,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											},{
 												fieldLabel: '税率',
 												xtype: 'textfield',
 											    displayField: 'text',  
 											    id:'taxRate',
												name:'taxRate',
 											    value:transInfo[0].taxRate,
 											    //readOnly: true,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											},{
 												fieldLabel: '税额',
 												xtype: 'textfield',
 												displayField: 'text',    
 												id:'taxAmtCny',
 												name:'taxAmtCny',
 											    //value:transInfo[0].taxAmtCny,
 											    value:Ext.util.Format.number(transInfo[0].taxAmtCny,'0,000.00'),
 											    //readOnly: true,
 									            fieldStyle:'border:4',
 											    labelAlign:'right',
 											    enableKeyEvents:true,
												   listeners: {
													   keyup: function(){
												            //失去焦点事件
														     var a=Number(Ext.getCmp('incomeCny').getValue());
															 var b=Number(Ext.getCmp('taxAmtCny').getValue());
															 var sum=Number(a+b);
															 Ext.getCmp('balance').setValue(sum);
															 Ext.getCmp('amtCny').setValue(sum);
												        } 
													  }
 											},{
 												fieldLabel: '收入',
 												xtype: 'textfield',
 											    displayField: 'text',
 											    id:'incomeCny',
 											    name:'incomeCny',
 											    //readOnly: true,
 											    value:transInfo[0].incomeCny,
 											    value:Ext.util.Format.number(transInfo[0].incomeCny,'0,000.00'),
 									            fieldStyle:'border:4',
 											    labelAlign:'right',
 											    enableKeyEvents:true,
	 											   listeners: {
	 												  keyup: function(){
												            //失去焦点事件
															 var a=Number(Ext.getCmp('incomeCny').getValue());
															 var b=Number(Ext.getCmp('taxAmtCny').getValue());
															 var sum=Number(a+b);
															 Ext.getCmp('balance').setValue(sum);
															 Ext.getCmp('amtCny').setValue(sum);
												        },
												        blur: function(){
												        	var ori=Number(transInfo[0].incomeCny);
												        	//alert(ori);
												        	var aa=Number(Ext.getCmp('incomeCny').getValue());
												        	//alert(aa);
												        	var t=Number(ori-aa).toFixed(2);
												        	//alert(t);
												        	/*if(-1<=t<=1){
												        		Ext.MessageBox.alert('提示','不在修改范围内(+-1元内)');	
												        	}*/
												        }
													  }
 											},{
 												fieldLabel: '是否含税',
 												xtype: 'textfield',
 												value:taxFlag,
 											    displayField: 'text',    
 											    readOnly: true,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											},{
 												fieldLabel: '未开票金额',
 												xtype: 'textfield',
 											    displayField: 'text',
 											    readOnly: true,
 											    id:'balance',
 											    name:'balance',
 											    //value:transInfo[0].balance,
 											    value:Ext.util.Format.number(transInfo[0].balance,'0,000.00'),
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											},{
 												fieldLabel: '价税合计',
 												xtype: 'textfield',
 												id:'amtCny',
 												name:'amtCny',
 												//value:transInfo[0].amtCny,
 												value:Ext.util.Format.number(transInfo[0].amtCny,'0,000.00'),
 											    displayField: 'text',    
 											    readOnly: true,
 									            fieldStyle:'border:none',
 											    labelAlign:'right'
 									
 											},{
 												fieldLabel: '状态',
 												xtype: 'textfield',
 											    displayField: 'text',    
 											    readOnly: true,
 											    value:Ext.decode(result.VMS_TRANS_DATA_STATUS)[''+transInfo[0].datastatus+''].value,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											},{
 												fieldLabel: '备注',
 												xtype: 'textfield',
 											    displayField: 'text',    
 											    value:transInfo[0].remark,
 											    readOnly: true,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											}
 											,{
 												fieldLabel: '合约号',
 												xtype: 'textfield',
 											    displayField: 'text',    
 											    value:transInfo[0].contractNumber,
 											    readOnly: true,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											}
 											,{
 												fieldLabel: '凭证号',
 												xtype: 'textfield',
 											    displayField: 'text',    
 											    value:transInfo[0].voucherNo,
 											    readOnly: true,
 									            fieldStyle:'border:none',
 											    labelAlign:'right',
 											}
 											]
						         }
						         ]}
									]
								
							}]
						     ,buttons : [
						    	 {
										text : '清空',
										iconCls : "rules-icon",
										instWin:null,
										handler:function(){
											transAditorWin.down('form').getForm().reset();
										}
									},{
										text : '保存',
										iconCls : "save-icon",
										handler : function() {	
										var params={};
										var myForm=transAditorWin.down('form').getForm();
										var fs = myForm.getValues();
										if(!myForm.isValid()){
											return;
										}
										for(var i in fs){
											params[i]=fs[i];
											
										}
										params['transId']=transId;
										Ext.MessageBox.confirm('提示','您确定要提交数据?',function(obj) {
									    	if(obj=='yes'){ // 选择了是
												Ext.Ajax.request({
													url : 'updateTransInfoApply.ajax',
													dataType: "json",  
													params : {params:json.stringify(params)},
													success : function(response) {
														var result=Ext.decode(response.responseText);
														if(result=='1'){
															Ext.MessageBox.alert('提示','交易流水号重复');
														}else if(result=='2'){
															Ext.MessageBox.alert('提示','保存成功');
															transAditorWin.close();
														}
														gridStore.reload();
													}
												});
									    	}
										});
										}
									}, {
										text : '关闭',
										iconCls : "close-icon",
										handler : function() {
											//transAditorWin.down('form').getForm().reset();
											transAditorWin.close();										
											//gridStore.reload();
										}

									}]
						}).show();
						//transAditorWin.show();

 				}
 			});
 		
 		
 } 	 