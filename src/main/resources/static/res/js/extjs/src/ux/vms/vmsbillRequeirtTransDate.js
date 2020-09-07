/**
 * 修改内容：1.添加遮罩2.添加关闭按钮3.弹框优化，添加属性
 * @updateDate 2018-1-11 19:37:03
 * @author liangshijun
 */

//通过票据id查交易
//综合查询交易id查询票据信息
Ext.define('Ext.ux.vms.vmsbillRequeirtTransDate', {
	alias : 'Ext.ux.vms.vmsbillRequeirtTransDate'
})

var requeirtTrans = function(grid,rowIndex) {
	
	var billId=grid.getStore().getAt(rowIndex).get('billId');
	
	var storeDate = Ext.create("Ext.data.Store", {
		fields : [ 'transId', 'transDate', 'instcode', 'transTypeName',
				'taxFlag', 'amtCny', 'taxRate', 'taxAmtCny', 'incomeCcy',
				'balance', 'fapiaoType', 'transFapiaoFlag', 'transFlag',
				'datastatus', 'isReverse','incomeCny'],
		proxy : {
			type : 'ajax',
			url : 'vmsBillInquireSelectTranstionDate.ajax?billId=' + billId,
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		}
	});

	storeDate.load({
		params:{
			limit:new Ext.util.LocalStorage().getItem('pageSize') || 40
		}
	});
	Ext.Ajax
			.request({
				url : 'vmsBillInquireSelectDate.ajax',
				dataType : "json",
				params : {
					billId : billId
				},
				success : function(response) {
					var result = Ext.decode(response.responseText);
					var billInfo = result.billInfo;
					// var dic=result.dic;
					var billDetailWin = Ext
							.create(
									'Ext.window.Window',
									{
										layout : 'fit',
										width : 900,
										height : 600,
										modal : true,// 设置是否添加遮罩
										draggable : true,// 拖动
										resizable : false, // 变大小
										autoScroll : false,
										items : [ {
											xtype : 'gridpanel',
											title : '票据信息界面',
											layout : 'fit',
											tbar : {
												xtype : 'container',
												items : [
														{
															xtype : 'form',
															items : [ {
																xtype : 'toolbar',
																layout : 'column',
																border : 0,
																items : [
																		{
																			fieldLabel : '申请日期',
																			xtype : 'textfield',
																			displayField : 'text',
																			readOnly : true,
																			value : billInfo[0].applyDate,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '开票日期',
																			xtype : 'textfield',
																			displayField : 'text',
																			readOnly : true,
																			value : billInfo[0].billDate == undefined ? ""
																					: billInfo[0].billDate,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '机构号码',
																			xtype : 'textfield',
																			displayField : 'text',
																			readOnly : true,
																			value : billInfo[0].instcode,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '纳税人名称',
																			xtype : 'textfield',
																			displayField : 'text',
																			readOnly : true,
																			value : billInfo[0].customerName,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '纳税人识别号',
																			xtype : 'textfield',
																			displayField : 'text',
																			readOnly : true,
																			value : billInfo[0].customerTaxno,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '发票代码',
																			xtype : 'textfield',
																			displayField : 'text',
																			readOnly : true,
																			value : billInfo[0].billCode,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '发票号码',
																			xtype : 'textfield',
																			displayField : 'text',
																			readOnly : true,
																			value : billInfo[0].billNo == undefined ? ""
																					: billInfo[0].billNo,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '合计金额',
																			xtype : 'textfield',
																			displayField : 'text',
																			readOnly : true,
																			value : Ext.util.Format.number(billInfo[0].amtSum,'0,000.00'),
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '合计税额',
																			xtype : 'textfield',
																			//value : billInfo[0].taxAmtSum,
																			value : Ext.util.Format.number(billInfo[0].taxAmtSum,'0,000.00'),
																			displayField : 'text',
																			readOnly : true,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '价税合计',
																			xtype : 'textfield',
																			displayField : 'text',
																			//value : billInfo[0].sumAmt,
																			value : Ext.util.Format.number(billInfo[0].sumAmt,'0,000.00'),
																			readOnly : true,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '是否手工录入',
																			xtype : 'textfield',
																			displayField : 'text',
																			value : Ext
																					.decode(result.VMS_BILL_IS_HANDIWORK)[''
																					+ billInfo[0].isHandiwork
																					+ ''].value,
																			readOnly : true,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '发票类型',
																			xtype : 'textfield',
																			displayField : 'text',
																			value : Ext
																					.decode(result.VMS_BILL_TYPE)[''
																					+ billInfo[0].fapiaoType
																					+ ''].value,
																			readOnly : true,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '状态',
																			xtype : 'textfield',
																			displayField : 'text',
																			readOnly : true,
																			value : Ext
																					.decode(result.VMS_BILL_STATUS)[''
																					+ billInfo[0].datastatus
																					+ ''].value,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		},
																		{
																			fieldLabel : '备注',
																			xtype : 'textfield',
																			displayField : 'text',
																			readOnly : true,
																			value : billInfo[0].remark == undefined ? ""
																					: billInfo[0].remark,
																			fieldStyle : 'border:none',
																			labelAlign : 'right'
																		} ]
															} ]
														},
														{
															xtype : 'toolbar',
															name : 'toolbar',
															layout : 'column',
															border : 0,
															items : [{
																text : '关闭',
																iconCls : "close-icon",
																handler : function(
																		wi) {
																	grid.getStore().load();
																	billDetailWin
																			.hide();
																}
															},{
																xtype: 'button',
																text : '导出',
																iconCls : "undo-icon",
																handler : function() {
																	var fs = billDetailWin.down('form').getForm().getValues();
																	var column = billDetailWin.down('grid').columns; 
																	var grid = billDetailWin.down('grid').getSelectionModel().getSelection();
																	exportExcel(column,"票据信息",'vmsBillInquireSelectTranstionDate.ajax?billId='+billId,fs,grid);
																}
															} ]
														}]
											},
											layout : 'fit',
											forceFit : true,
											// id : 'data_grid',
											selType : 'checkboxmodel',
											store : storeDate,
											columns : [
													{
														header : '序号',
														xtype : 'rownumberer',
														align : 'center',
														width : 50
													},
													{
														text : '交易编号',
														dataIndex : 'transId',
														align : 'center'
													},
													{
														text : '交易时间',
														dataIndex : 'transDate',
														align : 'center'
													},
													{
														text : '机构',
														dataIndex : 'instcode',
														align : 'center'
													},
													{
														text : '交易类型',
														dataIndex : 'transTypeName',
														align : 'center'
													},
													{
														text : '是否含税',
														dataIndex : 'taxFlag',
														align : 'center',
														renderer : function(
																value) {
															if (Ext
																	.isEmpty(value)) {
																return value;
															}
															return Ext
																	.decode(result.VMS_IS_REVERSE_TYPE)[''
																	+ value
																	+ ''].value;
														}
													},
													{
														text : '金额',
														dataIndex : 'amtCny',
														align : 'center',
														width : 50,
														hidden : true,
														renderer:function(value){
															var value = Ext.util.Format.number(value,'0,000.00');
															return value;
															
														}
													},
													{
														text : '税率',
														dataIndex : 'taxRate',
														align : 'center',
														width : 50
													},
													{
														text : '税额',
														dataIndex : 'taxAmtCny',
														align : 'center',
														width : 50,
														renderer:function(value){
															var value = Ext.util.Format.number(value,'0,000.00');
															return value;
															
														}
													},
													{
														text : '收入',
														dataIndex : 'incomeCny',
														align : 'center',
														width : 50,
														renderer:function(value){
															var value = Ext.util.Format.number(value,'0,000.00');
															return value;
															
														}
													},
													{
														text : '价税合计',
														dataIndex : 'amtCny',
														align : 'center',
														width : 50,
														renderer:function(value){
															var value = Ext.util.Format.number(value,'0,000.00');
															return value;
															
														}
													},
													{
														text : '未开票金额',
														dataIndex : 'balance',
														align : 'center',
														width : 50,
														renderer:function(value){
															var value = Ext.util.Format.number(value,'0,000.00');
															return value;
															
														}
													},
													{
														text : '发票类型',
														dataIndex : 'fapiaoType',
														align : 'center',
														width : 50,
														renderer : function(
																value) {
															if (Ext
																	.isEmpty(value)) {
																return value;
															}
															return Ext
																	.decode(result.VMS_BILL_TYPE)[''
																	+ value
																	+ ''].value;
														}
													},
													{
														text : '是否打票',
														dataIndex : 'transFapiaoFlag',
														align : 'center',
														width : 50,
														renderer : function(
																value) {
															if (Ext
																	.isEmpty(value)) {
																return value;
															}
															return Ext
																	.decode(result.VMS_CUSTOMER_FAPIAO_FLAG)[''
																	+ value
																	+ ''].value;
														}
													},
													{
														text : '交易标志',
														dataIndex : 'transFlag',
														align : 'center',
														width : 50,
														renderer : function(
																value) {
															if (Ext
																	.isEmpty(value)) {
																return value;
															}
															return Ext
																	.decode(result.VMS_TRANS_FLAG_TYPE)[''
																	+ value
																	+ ''].value;
														}
													},
													{
														text : '状态',
														dataIndex : 'datastatus',
														align : 'center',
														width : 50,
														renderer : function(
																value) {
															if (Ext
																	.isEmpty(value)) {
																return value;
															}
															return Ext
																	.decode(result.VMS_TRANS_DATA_STATUS)[''
																	+ value
																	+ ''].value;
														}
													},
													{
														text : '冲账状态',
														dataIndex : 'isReverse',
														align : 'center',
														width : 50,
														renderer : function(
																value) {
															if (Ext
																	.isEmpty(value)) {
																return value;
															}
															return Ext
																	.decode(result.VMS_IS_REVERSE_TYPE)[''
																	+ value
																	+ ''].value;
														}
													} ],
											dockedItems : {
												xtype : 'jespaging',
												autoShow : true,
												store : storeDate,
												dock : 'bottom',
												displayInfo : true
											}
										} ]

									}).show();
				}
			});
}