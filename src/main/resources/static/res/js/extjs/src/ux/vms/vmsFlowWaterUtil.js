Ext.define("Ext.ux.vms.vmsFlowWaterUtil", {
	alias : 'Ext.ux.vms.vmsFlowWaterUtil'
})

// 流水明细查看
var vmsFlowWaterDetailShowFun = function(grid, rowIndex) {
	// 获取流水id
	var flowWaterId = grid.getStore().getAt(rowIndex).get('flowWaterId');
	// 根据流水id查询明细
	var detailStore = Ext.create("Ext.data.Store", {
		fields : [ 'flowWaterId', 'detailId', 'transDate', 'goodsName',
				'taxGoodsCode', 'taxGoodsName', 'taxRate', 'unitPrice',
				'number', 'taxFreePrice', '', 'total' ],
		autoLoad : true,
		proxy : {
			type : 'ajax',
			url : 'findVmsFlowingWaterDetail.ajax?flowWaterId=' + flowWaterId,
			reader : {
				type : 'json',
				root : 'dataList'
			}
		}
	});

	Ext.create('Ext.window.Window', {
		title: '流水明细查看',
	    height: 500,
	    width: 1048,
	    layout: 'auto',
	    draggable:false,//拖动
	   	resizable:false,	//变大小
	   	style:{
	   		'background-color':'white'
	   	},
		items : [ {
			xtype : 'gridpanel',
			title : '流水开票明细',
			/*
			 * tbar : { xtype : 'container', items : [] },
			 */
			layout : 'fit',
			forceFit : true,
			store : detailStore,
			id : 'data_grid',
			selType : 'checkboxmodel',
			selModel : Ext.create('Ext.selection.CheckboxModel', {}),
			columns : [
				{header : '序号',xtype : 'rownumberer',width:50,align : 'center'},
				{text : '流水号',dataIndex: 'flowWaterId',align : 'center',width:80,hidden:true},
				{text : '明细ID',dataIndex: 'detailId',align : 'center',width:80,hidden:true},
			    {text : '交易日期',dataIndex: 'transDate',align : 'center',width:80},
			    {text : '商品名称',dataIndex: 'goodsName',align : 'center',width:80},
			    {text : '税务商品编码',dataIndex: 'taxGoodsCode',align : 'center',width:80},
			    {text : '税务商品名称',dataIndex: 'taxGoodsName',align : 'center',width:120},
			    {text : '税率',dataIndex: 'taxRate',align : 'center',width:80},
			    {text : '单价',dataIndex: 'unitPrice',align : 'center',width:80},
			    {text : '数量',dataIndex: 'number',align : 'center',width:50},
			    {text : '不含税价格',dataIndex: 'taxFreePrice',align : 'center',width:80},
			    {text : '合计',dataIndex: 'total',align : 'center',width:80}
			],
			dockedItems : {
				xtype : 'jespaging',
				autoShow : true,
				store : detailStore,
				dock : 'bottom',
				displayInfo : true
			}
		} ]
	}).show();
}

var requeirtTransFlowWaterFun = function(grid,rowIndex) {
	
	var billId=grid.getStore().getAt(rowIndex).get('billId');
	
	var storeDate = Ext.create('Ext.data.Store',{
		fields: ['flowWaterId','totalAmount','instcode','totalAmount','transDate','invoiceDate','customerId',
		    'customerName','transMode','datastatus','openBillUser'],
		autoLoad:true,
		proxy:{
			type:'ajax',
			url: 'findVmsFlowingWater.ajax?billId=' + billId,
			reader:{
				type:'json',
				root:'dataList',
				totalProperty:'total'
			}
		}
	});
	
	Ext.Ajax.request({
		url : 'vmsBillInquireSelectDate.ajax',
		dataType : "json",
		params : {
			billId : billId
		},
		success : function(response) {
			var result = Ext.decode(response.responseText);
			var billInfo = result.billInfo;
			var billDetailWin = Ext.create('Ext.window.Window',{
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
								items : [ 
								{
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
											value : billInfo[0].billDate == undefined ? "" : billInfo[0].billDate,
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
											value : billInfo[0].billNo == undefined ? "" : billInfo[0].billNo,
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
											value : Ext.util.Format.number(billInfo[0].sumAmt,'0,000.00'),
											readOnly : true,
											fieldStyle : 'border:none',
											labelAlign : 'right'
										},
										{
											fieldLabel : '是否手工录入',
											xtype : 'textfield',
											displayField : 'text',
											value : Ext.decode(result.VMS_BILL_IS_HANDIWORK)['' + billInfo[0].isHandiwork + ''].value,
											readOnly : true,
											fieldStyle : 'border:none',
											labelAlign : 'right'
										},
										{
											fieldLabel : '发票类型',
											xtype : 'textfield',
											displayField : 'text',
											value : Ext.decode(result.VMS_BILL_TYPE)['' + billInfo[0].fapiaoType + ''].value,
											readOnly : true,
											fieldStyle : 'border:none',
											labelAlign : 'right'
										},
										{
											fieldLabel : '状态',
											xtype : 'textfield',
											displayField : 'text',
											readOnly : true,
											value : Ext.decode(result.VMS_BILL_STATUS)['' + billInfo[0].datastatus + ''].value,
											fieldStyle : 'border:none',
											labelAlign : 'right'
										},
										{
											fieldLabel : '备注',
											xtype : 'textfield',
											displayField : 'text',
											readOnly : true,
											value : billInfo[0].remark == undefined ? "" : billInfo[0].remark,
											fieldStyle : 'border:none',
											labelAlign : 'right'
										} 
									]
								} 
								]
							},
							{
								xtype : 'toolbar',
								name : 'toolbar',
								layout : 'column',
								border : 0,
								items : {
									text : '关闭',
									iconCls : "close-icon",
									handler : function(wi) {
										grid.getStore().load();
										billDetailWin.hide();
									}
								}
							}
						]
					},
					layout : 'column',
					forceFit : true,
					// id : 'data_grid',
					selType : 'checkboxmodel',
					store : storeDate,
					columns : [
						{header : '序号',xtype : 'rownumberer',width:50,align : 'center'},
						{text : '流水号',dataIndex: 'flowWaterId',align : 'center',width:80,hidden:true},
					    {text : '总金额',dataIndex: 'totalAmount',align : 'center',width:80},
					    {text : '机构',dataIndex: 'instcode',align : 'center',width:80},
					    {text : '交易日期',dataIndex: 'transDate',align : 'center',width:80},
						{text : '开票日期',dataIndex: 'invoiceDate',align : 'center',width:80},
						{text : '客户号',dataIndex: 'customerId',align : 'center',width:110},
						{text : '客户名称',dataIndex: 'customerName',align : 'center',width:110},
						{text : '交易方式',dataIndex: 'transMode',align : 'center',width:80},
						{text : '数据状态',dataIndex: 'datastatus',align : 'center',width:80
							,renderer:function(value){
								if(Ext.isEmpty(value)){
									return value;
								}
								return Ext.decode(result.VMS_INVOCE_APPLY_TRANS_STATUS)['' + value+ ''].value
							}
						},
						{text : '开票方',dataIndex: 'openBillUser',align : 'center',width:80}
						/*{text : '税额',dataIndex : 'taxAmtCny',align : 'center',width : 50,
							renderer:function(value){
								var value = Ext.util.Format.number(value,'0,000.00');
								return value;
							}
						}*/
					],
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
