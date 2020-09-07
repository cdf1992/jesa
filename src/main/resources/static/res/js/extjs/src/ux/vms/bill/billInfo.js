/**
 * 发票打印公用方法
 */
Ext.define("Ext.ux.vms.bill.billInfo", {
	alias : 'Ext.ux.vms.bill.billInfo'
})
/**
 * 发票打印公用方法
 */
Ext.define("Ext.ux.vms.bill.billInfo", {
	alias : 'Ext.ux.vms.bill.billInfo'
})

function quantity(cmp) {
	var j = Ext.getCmp('cust_data_grid').getSelectionModel().getSelection()[0];
	var quantity = Number(Ext.getCmp(cmp.id).value);
	var income = Number(j.data.income);
	j.data.unitPrice = (income / quantity).toFixed(8);
	j.commit();
}

function income(cmp, goodsNameStore, goodStore) {
	var j = Ext.getCmp('cust_data_grid').getSelectionModel().getSelection()[0];
	var income = Number(Ext.getCmp(cmp.id).value);
	var rate = j.data.taxRate;
	var quantity = j.data.quantity;
	if (isNaN(income)) {
		return false;
	}
	j.data.income = income;
	if (isDiscount(j, goodsNameStore, goodStore)) {
		var tax = (income * rate).toFixed(2);
		j.data.tax = tax;
	} else {
		var unitPrice = (income / quantity).toFixed(8);
		var tax = (income * rate).toFixed(2);
		j.data.unitPrice = unitPrice;
		j.data.tax = tax;
	}
	j.commit();
	var newSumIncome = 0;
	var newSumTax = 0;
	var items = goodStore.data.items;
	for (var i = 0; i < items.length; i++) {
		var itemData = items[i].data;
		newSumIncome += Number(itemData.income);
		newSumTax += Number(itemData.tax);
	}
	Ext.getCmp('income').setValue(newSumIncome);
	Ext.getCmp('tax').setValue(newSumTax);
	var sum = Number(Ext.getCmp('sum').value);
	if (typeof (Ext.getCmp('changeSum')) != "undefined") {
		Ext.getCmp('changeSum').setValue(
				(newSumIncome + newSumTax - sum).toFixed(2));
	} else {
		Ext.getCmp('sum').setValue((newSumIncome + newSumTax).toFixed(2));
	}
}

function taxRate(cmp, goodStore, keepSum) {
	var j = Ext.getCmp('cust_data_grid').getSelectionModel().getSelection()[0];
	var taxRate = Number(Ext.getCmp(cmp.id).value);
	if (isNaN(taxRate)) {
		Ext.getCmp(cmp.id).setValue(0);
		taxRate = 0;
	} else if (taxRate >= 0.50) {
		Ext.getCmp(cmp.id).setValue(0);
		taxRate = 0;
	}
	if (taxRate == 0) {
		j.data.dutyFree = 'Z';
	} else {
		j.data.dutyFree = 'N';
	}
	if (keepSum) {
		var balance = Number(j.data.income) + Number(j.data.tax);
		var tax = (balance * taxRate).toFixed(2);
		var income = balance - tax;
		j.data.income = income;
		j.data.tax = tax;
	} else {
		var income = Number(j.data.income);
		var tax = (income * taxRate).toFixed(2);
		j.data.tax = tax;
	}
	var items = goodStore.data.items;
	var newSumIncome = 0;
	var newSumTax = 0;
	for (var i = 0; i < items.length; i++) {
		var itemData = items[i].data;
		newSumIncome += Number(itemData.income);
		newSumTax += Number(itemData.tax);
	}
	Ext.getCmp('income').setValue(newSumIncome);
	Ext.getCmp('tax').setValue(newSumTax);
	var sum = Number(Ext.getCmp('sum').value);
	if (typeof (Ext.getCmp('changeSum')) != "undefined") {
		Ext.getCmp('changeSum').setValue(
				(newSumIncome + newSumTax - sum).toFixed(2));
	} else {
		Ext.getCmp('sum').setValue((newSumIncome + newSumTax).toFixed(2));
	}
	j.commit();
}

function isDiscount(j, goodsNameStore, goodStore) {
	if (Number(j.data.income) < 0) {
		j.data.model = "";
		j.data.unit = "";
		j.data.quantity = "";
		j.data.unitPrice = "";
		j.data.discount = 'Y';
		j.commit();
		return true;
	} else {
		var quantity = isNaN(Number(j.data.quantity)) ? 1
				: Number(j.data.quantity);
		quantity = quantity == 0 ? 1 : quantity;
		var goodsItems = goodsNameStore.data.items;
		var goodsId = j.data.goodsCode;
		if (goodsId != 'anonymous' && goodsId != '' && null != goodsId) {
			if (goodsItems.length == 0) {
				j.data.model = j.raw.model;
				j.data.unit = j.raw.unit;
			} else {
				var goods = goodsItems.filter(function(g) {
					if (g.data.goodsCode == goodsId) {
						return g;
					}
				});
				if (goods.length > 0) {
					j.data.model = goods[0].data.model;
					j.data.unit = goods[0].data.unit;
				}
			}
		}
		j.data.quantity = quantity;
		j.data.discount = 'N';
		j.commit();
		return false;
	}
}

function validation(goodStore) {
	var billType = Ext.getCmp('billType').getValue();
	if (null == billType || '' == billType) {
		Ext.MessageBox.alert("提示", "请选择发票类型");
		return false;
	}
	var inventory = Ext.getCmp('inventory').getValue();
	if (null == inventory || '' == inventory) {
		Ext.MessageBox.alert("提示", "请选择是否清单开票");
		return false;
	}
	var digitizing = Ext.getCmp('digitizing').getValue();
	if (null == digitizing || '' == digitizing) {
		Ext.MessageBox.alert("提示", "请选择是否电子发票");
		return false;
	}
	var sellerTaxNo = Ext.getCmp('sellerTaxNo').getValue();
	var sellerName = Ext.getCmp('sellerName').getValue();
	var sellerContactInfo = Ext.getCmp('sellerContactInfo').getValue();
	var sellerAccountInfo = Ext.getCmp('sellerAccountInfo').getValue();
	var reviewer = Ext.getCmp('reviewer').getValue();
	var payee = Ext.getCmp('payee').getValue();
	var issuer = Ext.getCmp('issuer').getValue();
	if ((null == sellerTaxNo || '' == sellerTaxNo)
			|| (null == sellerName || '' == sellerName)
			|| (null == sellerContactInfo || '' == sellerContactInfo)
			|| (null == sellerAccountInfo || '' == sellerAccountInfo)
			|| (null == reviewer || '' == reviewer)
			|| (null == payee || '' == payee)
			|| (null == issuer || '' == issuer)) {
		Ext.MessageBox.alert("提示", "销方信息不全，请检查");
		return false;
	}
	var buyerTaxNo = Ext.getCmp('buyerTaxNo').getValue();
	var buyerName = Ext.getCmp('buyerName').getValue();
	var buyerAccountInfo = Ext.getCmp('buyerAccountInfo').getValue();
	var buyerContactInfo = Ext.getCmp('buyerContactInfo').value;
	if (billType == "Z") {
		if ((buyerTaxNo == null || buyerTaxNo == "")
				|| (buyerName == null || buyerName == "")
				|| (buyerAccountInfo == null || buyerAccountInfo == "")
				|| (buyerContactInfo == null || buyerContactInfo == "")) {
			Ext.MessageBox.alert("提示", "购方信息不全，请检查");
			return false;
		}
	} else {
		if (buyerName == null || buyerName == "") {
			Ext.MessageBox.alert("提示", "购方信息不全，请检查");
			return false;
		}
	}
	// 获取数据对象
	var items = goodStore.data.items;
	var ds = goodStore.data.items.filter(function(g) {
		if (g.data.discount == 'Y') {
			return g;
		}
	});
	if (ds.length > 1) {
		Ext.MessageBox.alert('提示', '最多拥有一条折扣行商品，请检查');
		return false;
	}
	if (items.length == 0) {
		Ext.MessageBox.alert('提示', '请新增商品明细数据');
		return false;
	}
	var sum = 0;
	for (var i = 0; i < items.length; i++) {
		var itemData = items[i].data;
		if (itemData.discount == 'Y') {
			if (i == 0 || i != items.length - 1) {
				Ext.MessageBox.alert('提示', '商品折扣行信息有误，请检查');
				return false;
			} else {
				var idx = i - 1;
				var previous = items[idx].data;
				if (previous.goodsName != itemData.goodsName
						|| previous.taxRate != itemData.taxRate
						|| previous.dutyFree != itemData.dutyFree) {
					Ext.MessageBox.alert('提示', '商品折扣行与原商品不匹配，请检查');
					return false;
				}
			}
			/*
			 * if ((null == itemData.goodsName || itemData.goodsName == '') ||
			 * (null == itemData.dutyFree || itemData.dutyFree == '')) {
			 * Ext.MessageBox.alert('提示', '商品信息有误，请检查'); return false; }
			 */
			if (itemData.income == 0) {
				Ext.MessageBox.alert('提示', '商品金额信息有误，请检查');
				return false;
			}
		} else {
			/*
			 * if ((null == itemData.goodsName || itemData.goodsName == '') ||
			 * (null == itemData.model || itemData.model == '') || (null ==
			 * itemData.unit || itemData.unit == '') || (null ==
			 * itemData.dutyFree || itemData.dutyFree == '')) {
			 * Ext.MessageBox.alert('提示', '商品信息有误，请检查'); return false; }
			 */
			if (itemData.quantity == 0 || itemData.unitPrice == 0
					|| itemData.income == 0) {
				Ext.MessageBox.alert('提示', '商品金额信息有误，请检查');
				return false;
			}
		}
		if (itemData.taxRate >= 1 || itemData.taxRate < 0) {
			Ext.MessageBox.alert('提示', '商品税率信息有误，请检查');
			return false;
		}
	}
	if (typeof (Ext.getCmp('changeSum')) != "undefined") {
		var change = Ext.getCmp('changeSum').value;
		var total = Ext.getCmp('sum').value;
		if (Number(change) != 0) {
			Ext.MessageBox.alert('提示', '商品总计与票面金额不符，请检查');
			return false;
		}
	}
	return true;
}

Ext.override(Ext.selection.Model, {
	onStoreLoad : function(store, records, successful, eOpts) {
		var me = this, length = me.selected.getCount();

		// 如果没有选中的记录，则不需要进行任何的操作
		if (length === 0)
			return;

		// 遍历selected并更新其中的记录
		me.selected.eachKey(function(key, item) {
			var model = store.getById(key);

			// 如果获取到了model就更新，否则从selected中移除
			if (model) {
				me.selected.add(model);// add时会覆盖掉原来的值
			} else {
				me.selected.removeAtKey(key);
			}
		})

	}
});
function editBill(gridItemData, vmsInvoiceTypeList, booleanCode, billStore,
		dutyFreeList) {
	var goodsNameStore = Ext.create('Ext.data.Store', {
		fields : [ 'goodsName', 'goodsCode', 'model', 'unit' ],
		proxy : {
			type : 'ajax',
			url : 'fetch10byGoodsName.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
	});
	var params = new Object();
	params["id"] = gridItemData.get("id");
	params["stateCode"] = gridItemData.get("controlState");
	var fds = [ 'goodsId', 'billId', 'goodsCode', 'goodsName', 'model', 'unit',
			'quantity', 'unitPrice', 'income', 'taxRate', 'tax', 'dutyFree',
			'discount' ];
	var goodStore = Ext.create('Ext.data.Store', {
		fields : fds,
		autoLoad : true,
		proxy : {
			type : 'ajax',
			url : 'queryGoods.ajax?',
			extraParams : {
				params : JSON.stringify(params)
			},
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		}
	});

	// 新增的动态行
	var rows = new Object();
	// 固定的columns
	var cm = [
			{
				header : '序号',
				xtype : 'rownumberer',
				width : 40,
				align : 'center'
			},
			{
				text : '商品编号',
				dataIndex : 'goodsCode',
				align : 'center',
				width : 50,
				hidden : true
			},
			{
				text : '货物或应税服务、劳务名称',
				dataIndex : 'goodsName',
				align : 'center',
				width : 200,
				editor : new Ext.form.field.ComboBox({
					labelAlign : 'right',
					name : "goodsName",
					minChars : 2,// minchars 在键入1个字符之前，什么都不会发生,如果不可编辑则此值无效
					store : goodsNameStore,
					triggerAction : "all", // 请设置为"all",否则默认为"query"的情况下，你选择某个值后，再此下拉时，只出现匹配选项，如果设为"all"的话，每次下拉均显示全部选项
					mode : "local", // 'local'：指定数据源为本地数据源，如果是本地创建的数据源，该属性也是必须的，如果数据源来自于服务器，设置为'remote'表示数据源来自于服务器
					queryParam : "goodsName",// 查询时传递的名字（默认为'query'）
					valueField : "goodsName",
					displayField : "goodsName",
					selectOnFocus : true, // 值为 ture
					// 时表示字段获取焦点时自动选择字段既有文本(默认为false)
					typeAhead : true,
					typeAheadDelay : 0, // 延时显示下拉框第一列
					editable : true, // 可以编辑
					hideTrigger : true,// 隐藏文本框后面的倒三角
					queryDelay : 1000,
					listeners : {
						'select' : function(combo, records, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							j.data.goodsCode = records[0].data.goodsCode;
							j.data.model = records[0].data.model;
							j.data.unit = records[0].data.unit;
							j.commit();
						},
						'blur' : function(combo, records, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							if (null == j.data.goodsCode
									|| j.data.goodsCode == '') {
								j.data.goodsCode = 'anonymous';
								j.commit();
							}
						},
						'change' : function(_this, newValue, oldValue, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							j.data.goodsCode = '';
							j.data.model = '';
							j.data.unit = '';
							j.commit();
						}
					}
				})
			},
			{
				text : '规格型号',
				dataIndex : 'model',
				align : 'center',
				width : 100,
				editor : {
					xtype : 'textfield',
					listeners : {
						'blur' : function(_this, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							if (isDiscount(j, goodsNameStore, goodStore)) {
								Ext.getCmp(_this.id).setValue("");
							}
						}
					}
				}
			},
			{
				text : '单位',
				dataIndex : 'unit',
				align : 'center',
				width : 50,
				editor : {
					xtype : 'textfield',
					listeners : {
						'blur' : function(_this, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							if (isDiscount(j, goodsNameStore, goodStore)) {
								Ext.getCmp(_this.id).setValue("");
							}
						}
					}
				}
			},
			{
				text : '数量',
				dataIndex : 'quantity',
				align : 'center',
				width : 50,
				editor : {
					xtype : 'numberfield',
					minValue : 0,
					hideTrigger : true,
					listeners : {
						'change' : function(_this, n, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							var unit = Number(Ext.getCmp(_this.id).value);
							if (isDiscount(j, goodsNameStore, goodStore)) {
								Ext.getCmp(_this.id).setValue("");
							} else {
								quantity(_this);
							}
						},
						'blur' : function(_this, o, eOpts) {
							var unit = Number(Ext.getCmp(_this.id).value);
							if (isNaN(unit) || unit <= 0) {
								Ext.getCmp(_this.id).setValue(1);
							}
						},
						'specialkey' : function(_this, field, event, eOpts) {
							var unit = Number(Ext.getCmp(_this.id).value);
							if (isNaN(unit) || unit <= 0) {
								Ext.getCmp(_this.id).setValue(1);
							}
						}
					}
				}
			},
			{
				text : '单价',
				dataIndex : 'unitPrice',
				align : 'center',
				width : 100
			},
			{
				text : '金额(不含税)',
				dataIndex : 'income',
				align : 'center',
				width : 100,
				editor : {
					xtype : 'numberfield',
					// minValue : 0,
					hideTrigger : true,
					listeners : {
						'change' : function(_this, newValue, oldValue, eOpts) {
							income(_this, goodsNameStore, goodStore);
						}
					}
				}
			},
			{
				text : '税率',
				dataIndex : 'taxRate',
				align : 'center',
				width : 100,
				editor : {
					xtype : 'numberfield',
					minValue : 0,
					maxValue : 0.50,
					hideTrigger : true,
					listeners : {
						'change' : function(_this, newValue, oldValue, eOpts) {
							taxRate(_this, goodStore, true);
						}
					}
				}
			},
			{
				text : '0税标识',
				dataIndex : 'dutyFree',
				align : 'center',
				width : 100,
				editor : new Ext.form.field.ComboBox({
					typeAhead : true,
					triggerAction : 'all',
					displayField : 'value',
					valueField : 'key',
					selectOnFocus : true,
					store : Ext.create('Ext.data.Store', {
						fields : [ 'key', 'value' ],
						data : dutyFreeList
					}),
					listeners : {
						'select' : function(a, b, c) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							j.data.dutyFree.key = key;
							var key = b[0].data.key;
							var value = b[0].data.value;
							j.data.dutyFree = key;
							var cmp = a.up().up().columns.find(function(c) {
								if (c.dataIndex == 'taxRate') {
									return c;
								}
							}).getEditor();
							if (key != 'N') {
								j.data.taxRate = 0;
								cmp.setValue(0);
							} else {
								j.data.taxRate = j.raw.taxRate;
								cmp.setValue(j.raw.taxRate);
							}
							j.commit();
						}
					}
				}),
				renderer : function(value) {
					if (value == "") {
						return value;
					} else {
						for ( var i in dutyFreeList) {
							if (value == dutyFreeList[i].key) {
								return value = dutyFreeList[i].value;
							}
						}
					}
				}
			},
			{
				text : '税额',
				dataIndex : 'tax',
				align : 'center',
				width : 100
			},
			{
				text : '折扣行',
				dataIndex : 'discount',
				align : 'center',
				width : 50,
				hidden : true
			},
			{
				text : '操作',
				align : 'center',
				width : 40,
				xtype : 'actioncolumn',
				items : [ {
					icon : 'res/img/icon16-hrs/delete.png',
					altText : "删除",
					tooltip : '删除',
					handler : function(grid, rowIndex, colIndex) {
						if (goodStore.data.items.length == 1) {
							return;
						}
						grid.getStore().removeAt(rowIndex);
						Ext.getCmp('cust_data_grid').getView().refresh();
						var newSumIncome = 0;
						var newSumTax = 0;
						var items = goodStore.data.items;
						for (var i = 0; i < items.length; i++) {
							var itemData = items[i].data;
							newSumIncome += Number(itemData.income);
							newSumTax += Number(itemData.tax);
						}
						Ext.getCmp('income').setValue(newSumIncome);
						Ext.getCmp('tax').setValue(newSumTax);
						var sum = Number(Ext.getCmp('sum').value);
						Ext.getCmp('changeSum').setValue(
								(newSumIncome + newSumTax - sum).toFixed(2));
						return;
					}

				} ]
			} ];

	// 选中的票据
	var editBillWin = Ext
			.create(
					'Ext.window.Window',
					{
						width : 900,
						modal : true,// 设置是否添加遮罩
						draggable : true,// 拖动
						resizable : true, // 变大小
						autoScroll : true,
						constrainHeader : true,
						layout : 'fit',
						title : '票据编辑',
						items : [ {
							xtype : 'gridpanel',
							layout : 'fit',
							tbar : {
								xtype : 'container',
								items : [ {
									xtype : 'form',
									items : [
											{
												xtype : 'toolbar',
												layout : 'column',
												border : 0,
												items : [
														{
															xtype : 'textfield',
															fieldLabel : '购方税号',
															name : 'buyerTaxNo',
															id : 'buyerTaxNo',
															itemId : 'buyerTaxNo',
															value : gridItemData
																	.get('buyerTaxNo')
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方税号',
															name : 'sellerTaxNo',
															id : 'sellerTaxNo',
															itemId : 'sellerTaxNo',
															value : gridItemData
																	.get('sellerTaxNo'),
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '总金额',
															name : 'sum',
															id : 'sum',
															itemId : 'sum',
															value : Number(gridItemData
																	.get('income'))
																	+ Number(gridItemData
																			.get('tax')),
															hideTrigger : true,
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '购方名称',
															name : 'buyerName',
															id : 'buyerName',
															itemId : 'buyerName',
															value : gridItemData
																	.get('buyerName')
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方名称',
															name : 'sellerName',
															id : 'sellerName',
															itemId : 'sellerName',
															value : gridItemData
																	.get('sellerName'),
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '发票金额(不含税)',
															name : 'income',
															id : 'income',
															itemId : 'income',
															value : gridItemData
																	.get('income'),
															hideTrigger : true,
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '购方银行及账户号',
															name : 'buyerAccountInfo',
															id : 'buyerAccountInfo',
															itemId : 'buyerAccountInfo',
															value : gridItemData
																	.get('buyerAccountInfo')
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方银行及账户号',
															name : 'sellerAccountInfo',
															id : 'sellerAccountInfo',
															itemId : 'sellerAccountInfo',
															value : gridItemData
																	.get('sellerAccountInfo'),
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '发票税额',
															name : 'tax',
															id : 'tax',
															itemId : 'tax',
															value : gridItemData
																	.get('tax'),
															hideTrigger : true,
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '购方地址及电话',
															name : 'buyerContactInfo',
															id : 'buyerContactInfo',
															itemId : 'buyerContactInfo',
															value : gridItemData
																	.get('buyerContactInfo')
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方地址及电话',
															name : 'sellerContactInfo',
															id : 'sellerContactInfo',
															itemId : 'sellerContactInfo',
															value : gridItemData
																	.get('sellerContactInfo'),
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '总金额差额',
															name : 'changeSum',
															id : 'changeSum',
															itemId : 'changeSum',
															value : Number(0),
															hideTrigger : true,
															disabled : true
														},
														{
															fieldLabel : '开票人',
															xtype : 'textfield',
															enforceMaxLength : true,
															name : 'issuer',
															id : 'issuer',
															value : gridItemData
																	.get('issuer'),
														},
														{
															fieldLabel : '复核人',
															xtype : 'textfield',
															enforceMaxLength : true,
															name : 'reviewer',
															id : 'reviewer',
															value : gridItemData
																	.get('reviewer'),
														},
														{
															fieldLabel : '收款人',
															xtype : 'textfield',
															enforceMaxLength : true,
															name : 'payee',
															id : 'payee',
															value : gridItemData
																	.get('payee'),
														},
														{
															xtype : 'combobox',
															fieldLabel : '电子发票',
															name : 'digitizing',
															id : 'digitizing',
															itemId : 'digitizing',
															// labelAlign:'right',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : booleanCode
																			}),
															editable : false,
															selectOnFocus : true,
															value : gridItemData
																	.get('digitizing')
														},
														{
															xtype : 'combobox',
															fieldLabel : '清单开票',
															name : 'inventory',
															id : 'inventory',
															itemId : 'inventory',
															// labelAlign:'right',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : booleanCode
																			}),
															editable : false,
															selectOnFocus : true,
															value : gridItemData
																	.get('inventory')
														},
														{
															xtype : 'combobox',
															fieldLabel : '发票类型',
															name : 'billType',
															id : 'billType',
															itemId : 'billType',
															// labelAlign:'right',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : vmsInvoiceTypeList
																			}),
															editable : false,
															selectOnFocus : true,
															value : gridItemData
																	.get('billType')
														},
														{
															fieldLabel : '备注',
															xtype : 'textareafield',
															enforceMaxLength : true,
															name : 'remark',
															id : 'remark',
															width : 684,
															value : gridItemData
																	.get('remark')
														},
														{
															fieldLabel : '购方客户号',
															xtype : 'textareafield',
															enforceMaxLength : true,
															name : 'buyerCustId',
															id : 'buyerCustId',
															width : 684,
															value : gridItemData
																	.get('buyerCustId'),
															hidden : true
														} ]
											},
											{
												xtype : 'toolbar',
												html : null,
												border : 0,
												bodyStyle : 'backgroundColor:#d8d8d8;backgroundImage: -webkit-linear-gradient(top,#e6e6e6,#efefef);',
												layout : 'column',
												items : [
														{
															xtype : 'button',
															text : '添加商品',
															iconCls : "add-icon",
															instWin : null,
															tooltip : '商品明细',
															autoShow : true, // 默认false,自动显示
															handler : function() {
																var goodsCount = goodStore.data.items.length;
																var inventory = Ext
																		.getCmp('inventory').value;
																if (inventory == 'N'
																		&& goodsCount == 8) {
																	Ext.MessageBox
																			.alert(
																					'提示',
																					'非清单开票最多开具商品明细为8条，请确认');
																	return;
																} else if (inventory == 'Y'
																		&& goodsCount == 200) {
																	Ext.MessageBox
																			.alert(
																					'提示',
																					'清单发票最多开具商品明细为200条，请确认');
																	return;
																}
																var goods = goodStore.data.items[goodsCount - 1].data;
																var changeSum = Ext
																		.getCmp('changeSum').value;
																var sum = 0;
																var unitPrice = 0;
																var income = 0;
																var tax = 0;
																if (changeSum < 0) {
																	sum = -Number(changeSum);
																	unitPrice = (sum / (1 + Number(goods.taxRate)))
																			.toFixed(2);
																	income = unitPrice;
																	tax = (sum - income)
																			.toFixed(2);
																}
																rows.goodsName = goods.goodsName;
																rows.goodsCode = goods.goodsCode;
																rows.model = goods.model;
																rows.unit = goods.unit;
																rows.dutyFree = goods.dutyFree;
																rows.discount = goods.discount;
																rows.quantity = 1;
																rows.taxRate = Number(goods.taxRate);
																rows.income = income;
																rows.unitPrice = unitPrice
																rows.tax = tax;
																rows.billId = gridItemData
																		.get("id");
																goodStore
																		.add(rows);
																var newSumIncome = 0;
																var newSumTax = 0;
																var items = goodStore.data.items;
																for (var i = 0; i < items.length; i++) {
																	var itemData = items[i].data;
																	newSumIncome += Number(itemData.income);
																	newSumTax += Number(itemData.tax);
																}
																Ext
																		.getCmp(
																				'income')
																		.setValue(
																				newSumIncome);
																Ext
																		.getCmp(
																				'tax')
																		.setValue(
																				newSumTax);
																var sum = Number(Ext
																		.getCmp('sum').value);
																Ext
																		.getCmp(
																				'changeSum')
																		.setValue(
																				(newSumIncome
																						+ newSumTax - sum)
																						.toFixed(2));
															}
														},
														{
															xtype : 'button',
															text : '',
															iconCls : "rules-icon",
															instWin : null,
															tooltip : '商品明细',
															autoShow : true, // 默认false,自动显示
															handler : function() {
																goodStore
																		.reload()
															}
														} ]
											} ]
								} ]
							},
							autoFill : true,
							id : 'cust_data_grid',
							store : goodStore,
							selModel : {
								selType : 'checkboxmodel',
								checkOnly : true
							},
							plugins : [ Ext.create(
									'Ext.grid.plugin.CellEditing', {
										clicksToEdit : 2
									// 配置点击几次显示gird编辑器
									}) ],
							columns : cm,
							dockedItems : {
								xtype : 'jespaging',
								autoShow : true,
								store : goodStore,
								dock : 'bottom',
								displayInfo : true
							}
						} ],
						buttons : [
								{
									text : '保存并提交',
									iconCls : "save-icon",
									handler : function() {
										var bill = gridItemData.data;
										if (!validation(goodStore)) {
											return false;
										}
										// 获取数据对象
										var items = goodStore.data.items;
										var goodsList = items.map(function(g) {
											return g.data;
										});
										bill["buyerTaxNo"] = Ext
												.getCmp('buyerTaxNo').value;
										bill["buyerName"] = Ext
												.getCmp('buyerName').value;
										bill["buyerAccountInfo"] = Ext
												.getCmp('buyerAccountInfo').value;
										bill["buyerContactInfo"] = Ext
												.getCmp('buyerContactInfo').value;
										bill["digitizing"] = Ext
												.getCmp('digitizing').value;
										bill["inventory"] = Ext
												.getCmp('inventory').value;
										bill["billType"] = Ext
												.getCmp('billType').value;
										bill["income"] = Ext.getCmp('income').value;
										bill["tax"] = Ext.getCmp('tax').value;
										bill["payee"] = Ext.getCmp('payee')
												.getValue(); // 收款人
										bill["reviewer"] = Ext.getCmp(
												'reviewer').getValue(); // 复核人
										bill["issuer"] = Ext.getCmp('issuer')
												.getValue();// 开票人
										bill["remark"] = Ext.getCmp('remark')
												.getValue();// 备注
										bill["buyerCustId"] = Ext.getCmp(
												'buyerCustId').getValue();
										bill["goodsList"] = goodsList;
										// 请求后台
										Ext.MessageBox
												.confirm(
														'提示',
														'您确定要保存数据?',
														function(obj) {
															if (obj == 'yes') {
																Ext.Ajax
																		.request({
																			url : 'saveAndiAuditBill.ajax',
																			dataType : "json",
																			params : {
																				params : JSON
																						.stringify(bill),
																			},
																			// 请求成功调用函数
																			success : function(
																					response) {
																				if (response) {
																					var result = Ext
																							.decode(response.responseText);
																					Ext.MessageBox
																							.alert(
																									'提示',
																									result);
																					editBillWin
																							.close();
																					// 提交成功后重新加载当前页
																					billStore
																							.loadPage(1);
																				}
																			}
																		});
															}
														});
									}
								}, {
									text : '关闭',
									iconCls : "close-icon",
									handler : function() {
										editBillWin.close();
									}
								} ]
					}).show();

	Ext.Ajax.request({
		// 后台请求路径
		url : 'billEditExpire.ajax',
		// 数据类型
		dataType : "json",
		// 请求的参数
		params : {
			JsonObj : JSON.stringify(gridItemData.data)
		},
		// 请求成功调用函数
		success : function(response) {
			if (response) {
				var result = Ext.decode(response.responseText);
				if (result == "succ") {
					console.log("缓存时间延长成功");
				}
			}
		}
	});
}

function addBillPreOpen(fetchBillStore, vmsInvoiceTypeList, booleanCode,
		billStore, dutyFreeList) {

	var taxNoStore = Ext.create('Ext.data.Store', {
		fields : [ 'ttiTaxNo', 'ttiName', 'ttiContactInfo', 'ttiAccountInfo',
				'ttiPayee', 'ttiReviewer', 'ttiIssuer' ],
		proxy : {
			type : 'ajax',
			url : 'fetch10bytaxNo.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
	});
	var customerFetchStore = Ext.create('Ext.data.Store', {
		fields : [ 'ciId', 'ciTaxNo', 'ciChineseName', 'ciDomesticBank',
				'ciDomesticAccount', 'ciDomesticTel', 'ciDomesticAddress' ],
		proxy : {
			type : 'ajax',
			url : 'fetchTop10Customers.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
	});
	var goodsNameStore = Ext.create('Ext.data.Store', {
		fields : [ 'goodsName', 'goodsCode', 'model', 'unit' ],
		autoLoad : true,
		proxy : {
			type : 'ajax',
			url : 'fetch10byGoodsName.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
	});
	var goodStore = Ext.create('Ext.data.Store', {
		fields : [ 'goodsId', 'billId', 'goodsCode', 'goodsName', 'model',
				'unit', 'quantity', 'unitPrice', 'income', 'taxRate', 'tax',
				'dutyFree' ],
		autoLoad : true
	});
	// 新增的动态行
	var rows = new Object();
	// 固定的columns
	var cm = [
			{
				header : '序号',
				xtype : 'rownumberer',
				width : 40,
				align : 'center'
			},
			{
				text : '商品编号',
				dataIndex : 'goodsCode',
				align : 'center',
				width : 50,
				hidden : true
			},
			{
				text : '货物或应税服务、劳务名称',
				dataIndex : 'goodsName',
				align : 'center',
				width : 200,
				editor : new Ext.form.field.ComboBox({
					labelAlign : 'right',
					name : "goodsName",
					minChars : 2,// minchars 在键入1个字符之前，什么都不会发生,如果不可编辑则此值无效
					store : goodsNameStore,
					triggerAction : "all", // 请设置为"all",否则默认为"query"的情况下，你选择某个值后，再此下拉时，只出现匹配选项，如果设为"all"的话，每次下拉均显示全部选项
					mode : "local", // 'local'：指定数据源为本地数据源，如果是本地创建的数据源，该属性也是必须的，如果数据源来自于服务器，设置为'remote'表示数据源来自于服务器
					queryParam : "goodsName",// 查询时传递的名字（默认为'query'）
					valueField : "goodsName",
					displayField : "goodsName",
					selectOnFocus : true, // 值为 ture
					// 时表示字段获取焦点时自动选择字段既有文本(默认为false)
					typeAhead : true,
					typeAheadDelay : 0, // 延时显示下拉框第一列
					editable : true, // 可以编辑
					hideTrigger : true,// 隐藏文本框后面的倒三角
					queryDelay : 1000,
					listeners : {
						'select' : function(combo, records, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							j.data.goodsCode = records[0].data.goodsCode;
							j.data.model = records[0].data.model;
							j.data.unit = records[0].data.unit;
							j.commit();
						},
						'blur' : function(combo, records, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							if (null == j.data.goodsCode
									|| j.data.goodsCode == '') {
								j.data.goodsCode = 'anonymous';
								j.commit();
							}
						},
						'change' : function(_this, newValue, oldValue, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							j.data.goodsCode = '';
							j.data.goodsName = '';
							j.commit();
						}
					}
				})
			},
			{
				text : '规格型号',
				dataIndex : 'model',
				align : 'center',
				width : 100,
				editor : {
					xtype : 'textfield',
					listeners : {
						'blur' : function(_this, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							if (isDiscount(j, goodsNameStore, goodStore)) {
								Ext.getCmp(_this.id).setValue("");
							}
						}
					}
				}
			},
			{
				text : '单位',
				dataIndex : 'unit',
				align : 'center',
				width : 50,
				editor : {
					xtype : 'textfield',
					listeners : {
						'blur' : function(_this, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							if (isDiscount(j, goodsNameStore, goodStore)) {
								Ext.getCmp(_this.id).setValue("");
							}
						}
					}
				}
			},
			{
				text : '数量',
				dataIndex : 'quantity',
				align : 'center',
				width : 50,
				editor : {
					xtype : 'numberfield',
					minValue : 0,
					hideTrigger : true,
					listeners : {
						'change' : function(_this, n, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							var unit = Number(Ext.getCmp(_this.id).value);
							if (isDiscount(j, goodsNameStore, goodStore)) {
								Ext.getCmp(_this.id).setValue("");
							} else {
								quantity(_this);
							}
						},
						'blur' : function(_this, o, eOpts) {
							var unit = Number(Ext.getCmp(_this.id).value);
							if (isNaN(unit) || unit <= 0) {
								Ext.getCmp(_this.id).setValue(1);
							}
						},
						'specialkey' : function(_this, field, event, eOpts) {
							var unit = Number(Ext.getCmp(_this.id).value);
							if (isNaN(unit) || unit <= 0) {
								Ext.getCmp(_this.id).setValue(1);
							}
						}
					}
				}
			},
			{
				text : '单价',
				dataIndex : 'unitPrice',
				align : 'center',
				width : 100
			},
			{
				text : '金额(不含税)',
				dataIndex : 'income',
				align : 'center',
				width : 100,
				editor : {
					xtype : 'numberfield',
					// minValue : 0,
					hideTrigger : true,
					listeners : {
						'change' : function(_this, newValue, oldValue, eOpts) {
							income(_this, goodsNameStore, goodStore);
						}
					}
				}
			},
			{
				text : '税率',
				dataIndex : 'taxRate',
				align : 'center',
				width : 100,
				editor : {
					xtype : 'numberfield',
					minValue : 0,
					maxValue : 0.50,
					hideTrigger : true,
					listeners : {
						'change' : function(_this, newValue, oldValue, eOpts) {
							taxRate(_this, goodStore, false);
						}
					}
				}
			},
			{
				text : '0税标识',
				dataIndex : 'dutyFree',
				align : 'center',
				width : 100,
				editor : new Ext.form.field.ComboBox({
					typeAhead : true,
					triggerAction : 'all',
					displayField : 'value',
					valueField : 'key',
					selectOnFocus : true,
					store : Ext.create('Ext.data.Store', {
						fields : [ 'key', 'value' ],
						data : dutyFreeList
					}),
					listeners : {
						'select' : function(a, b, c) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							j.data.dutyFree.key = key;
							var key = b[0].data.key;
							var value = b[0].data.value;
							j.data.dutyFree = key;
							var cmp = a.up().up().columns.find(function(c) {
								if (c.dataIndex == 'taxRate') {
									return c;
								}
							}).getEditor();
							if (key != 'N') {
								j.data.taxRate = 0;
								cmp.setValue(0);
							} else {
								j.data.taxRate = j.raw.taxRate;
								cmp.setValue(j.raw.taxRate);
							}
							j.commit();
						}
					}
				}),
				renderer : function(value) {
					if (value == "") {
						return value;
					} else {
						for ( var i in dutyFreeList) {
							if (value == dutyFreeList[i].key) {
								return value = dutyFreeList[i].value;
							}
						}
					}
				}
			},
			{
				text : '税额',
				dataIndex : 'tax',
				align : 'center',
				width : 100
			},
			{
				text : '折扣行',
				dataIndex : 'discount',
				align : 'center',
				width : 50,
				hidden : true
			},
			{
				text : '操作',
				align : 'center',
				width : 40,
				xtype : 'actioncolumn',
				items : [ {
					icon : 'res/img/icon16-hrs/delete.png',
					altText : "删除",
					tooltip : '删除',
					handler : function(grid, rowIndex, colIndex) {
						if (goodStore.data.items.length == 1) {
							Ext.MessageBox.alert('提示', '最后一条数据不可删除');
							return;
						}
						grid.getStore().removeAt(rowIndex);
						Ext.getCmp('cust_data_grid').getView().refresh();
						var newSumIncome = 0;
						var newSumTax = 0;
						var items = goodStore.data.items;
						for (var i = 0; i < items.length; i++) {
							var itemData = items[i].data;
							newSumIncome += Number(itemData.income);
							newSumTax += Number(itemData.tax);
						}
						Ext.getCmp('income').setValue(newSumIncome);
						Ext.getCmp('tax').setValue(newSumTax);
						Ext.getCmp('sum').setValue(
								Number(newSumIncome) + Number(newSumTax));
						return;
					}

				} ]
			} ];

	// 选中的票据
	var editBillWin = Ext
			.create(
					'Ext.window.Window',
					{
						width : 1000,
						modal : true,// 设置是否添加遮罩
						draggable : true,// 拖动
						resizable : true, // 变大小
						autoScroll : true,
						constrainHeader : true,
						layout : 'fit',
						title : '新增票据预开',
						items : [ {
							xtype : 'gridpanel',
							layout : 'fit',
							tbar : {
								xtype : 'container',
								items : [ {
									xtype : 'form',
									items : [
											{
												xtype : 'toolbar',
												layout : 'column',
												border : 0,
												items : [
														{
															xtype : 'combobox',
															fieldLabel : '购方税号',
															name : "buyerTaxNo",
															id : "buyerTaxNo",
															minChars : 2,// minchars
															// 在键入1个字符之前，什么都不会发生,如果不可编辑则此值无效
															store : customerFetchStore,
															triggerAction : "all", // 请设置为"all",否则默认为"query"的情况下，你选择某个值后，再此下拉时，只出现匹配选项，如果设为"all"的话，每次下拉均显示全部选项
															mode : "local", // 'local'：指定数据源为本地数据源，如果是本地创建的数据源，该属性也是必须的，如果数据源来自于服务器，设置为'remote'表示数据源来自于服务器
															queryParam : "params",// 查询时传递的名字（默认为
															// 'query'）
															displayField : 'ciTaxNo',
															valueField : 'ciTaxNo',
															selectOnFocus : true, // 值为
															// ture
															// 时表示字段获取焦点时自动选择字段既有文本(默认为
															// false)
															typeAhead : true,
															typeAheadDelay : 0, // 延时显示下拉框第一列
															editable : true, // 可以编辑
															hideTrigger : true,// 隐藏文本框后面的倒三角
															queryDelay : 1000,
															renderTo : document.body,
															listeners : {
																'beforequery' : function(
																		_query,
																		_oEpts) {
																	if (_query.query.length < 2) {
																		return;
																	}
																	var ciTaxNo = Ext
																			.getCmp(
																					'buyerTaxNo')
																			.getValue();
																	var params = {};
																	params["ciTaxNo"] = ciTaxNo;
																	_query.query = JSON
																			.stringify(params);
																},
																'select' : function(
																		t, i,
																		eOpts) {
																	Ext
																			.getCmp(
																					'buyerName')
																			.setValue(
																					i[0].data.ciChineseName); // 购方名称
																	Ext
																			.getCmp(
																					'buyerAccountInfo')
																			.setValue(
																					i[0].data.ciDomesticBank
																							+ " "
																							+ i[0].data.ciDomesticAccount); // 购方银行及账户号
																	Ext
																			.getCmp(
																					'buyerContactInfo')
																			.setValue(
																					i[0].data.ciDomesticAddress
																							+ " "
																							+ i[0].data.ciDomesticTel); // 购方地址电话
																	Ext
																			.getCmp(
																					'buyerCustId')
																			.setValue(
																					i[0].data.ciId); // 购方地址电话

																}
															}
														},
														{
															xtype : 'combobox',
															fieldLabel : '销方税号',
															name : "sellerTaxNo",
															id : "sellerTaxNo",
															minChars : 2,// minchars
															// 在键入1个字符之前，什么都不会发生,如果不可编辑则此值无效
															store : taxNoStore,
															triggerAction : "all", // 请设置为"all",否则默认为"query"的情况下，你选择某个值后，再此下拉时，只出现匹配选项，如果设为"all"的话，每次下拉均显示全部选项
															mode : "local", // 'local'：指定数据源为本地数据源，如果是本地创建的数据源，该属性也是必须的，如果数据源来自于服务器，设置为'remote'表示数据源来自于服务器
															queryParam : "ttiTaxNo",// 查询时传递的名字（默认为
															// 'query'）
															valueField : "ttiTaxNo",
															displayField : "ttiTaxNo",
															selectOnFocus : true, // 值为
															// ture
															// 时表示字段获取焦点时自动选择字段既有文本(默认为
															// false)
															typeAhead : true,
															typeAheadDelay : 0, // 延时显示下拉框第一列
															editable : true, // 可以编辑
															hideTrigger : true,// 隐藏文本框后面的倒三角
															queryDelay : 1000,
															renderTo : document.body,
															listeners : {
																'beforequery' : function(
																		_query,
																		_oEpts) {
																	if (_query.query.length < 2) {
																		return;
																	}
																	var ttiTaxNo = Ext
																			.getCmp(
																					'sellerTaxNo')
																			.getValue();
																	_query.query = ttiTaxNo;
																},
																'select' : function(
																		t, i,
																		eOpts) {
																	Ext
																			.getCmp(
																					'sellerName')
																			.setValue(
																					i[0].data.ttiName); // 销方名称
																	Ext
																			.getCmp(
																					'sellerAccountInfo')
																			.setValue(
																					i[0].data.ttiAccountInfo); // 销方银行及账户号
																	Ext
																			.getCmp(
																					'sellerContactInfo')
																			.setValue(
																					i[0].data.ttiContactInfo); // 地址电话
																	Ext
																			.getCmp(
																					'payee')
																			.setValue(
																					i[0].data.ttiPayee); // 收款人
																	Ext
																			.getCmp(
																					'reviewer')
																			.setValue(
																					i[0].data.ttiReviewer); // 复核人
																	Ext
																			.getCmp(
																					'issuer')
																			.setValue(
																					i[0].data.ttiIssuer); // 开票人
																}
															}
														},
														{
															xtype : 'numberfield',
															fieldLabel : '总金额',
															name : 'sum',
															id : 'sum',
															itemId : 'sum',
															hideTrigger : true,
															disabled : true
														},
														{
															fieldLabel : '收款人',
															xtype : 'textfield',
															enforceMaxLength : true,
															name : 'payee',
															id : 'payee',
															width : 200
														},
														{
															xtype : 'combobox',
															fieldLabel : '购方名称',
															name : "buyerName",
															id : "buyerName",
															minChars : 2,// minchars
															// 在键入1个字符之前，什么都不会发生,如果不可编辑则此值无效
															store : customerFetchStore,
															triggerAction : "all", // 请设置为"all",否则默认为"query"的情况下，你选择某个值后，再此下拉时，只出现匹配选项，如果设为"all"的话，每次下拉均显示全部选项
															mode : "local", // 'local'：指定数据源为本地数据源，如果是本地创建的数据源，该属性也是必须的，如果数据源来自于服务器，设置为'remote'表示数据源来自于服务器
															queryParam : "params",// 查询时传递的名字（默认为
															// 'query'）
															displayField : 'ciChineseName',
															valueField : 'ciChineseName',
															selectOnFocus : true, // 值为
															// ture
															// 时表示字段获取焦点时自动选择字段既有文本(默认为
															// false)
															typeAhead : true,
															typeAheadDelay : 0, // 延时显示下拉框第一列
															editable : true, // 可以编辑
															hideTrigger : true,// 隐藏文本框后面的倒三角
															queryDelay : 1000,
															renderTo : document.body,
															listeners : {
																'beforequery' : function(
																		_query,
																		_oEpts) {
																	if (_query.query.length < 2) {
																		return;
																	}
																	var ciChineseName = Ext
																			.getCmp(
																					'buyerName')
																			.getValue();
																	var params = {};
																	params["ciChineseName"] = ciChineseName;
																	_query.query = JSON
																			.stringify(params);
																},
																'select' : function(
																		t, i,
																		eOpts) {
																	Ext
																			.getCmp(
																					'buyerTaxNo')
																			.setValue(
																					i[0].data.ciTaxNo); // 购方税号
																	Ext
																			.getCmp(
																					'buyerAccountInfo')
																			.setValue(
																					i[0].data.ciDomesticBank
																							+ " "
																							+ i[0].data.ciDomesticAccount); // 购方银行及账户号
																	Ext
																			.getCmp(
																					'buyerContactInfo')
																			.setValue(
																					i[0].data.ciDomesticAddress
																							+ " "
																							+ i[0].data.ciDomesticTel); // 购方地址电话
																	Ext
																			.getCmp(
																					'buyerCustId')
																			.setValue(
																					i[0].data.ciId); // 购方地址电话
																}
															}
														},
														{
															xtype : 'combobox',
															fieldLabel : '销方名称',
															name : "sellerName",
															id : "sellerName",
															minChars : 2,// minchars
															// 在键入1个字符之前，什么都不会发生,如果不可编辑则此值无效
															store : taxNoStore,
															triggerAction : "all", // 请设置为"all",否则默认为"query"的情况下，你选择某个值后，再此下拉时，只出现匹配选项，如果设为"all"的话，每次下拉均显示全部选项
															mode : "local", // 'local'：指定数据源为本地数据源，如果是本地创建的数据源，该属性也是必须的，如果数据源来自于服务器，设置为'remote'表示数据源来自于服务器
															queryParam : "ttiName",// 查询时传递的名字（默认为
															// 'query'）
															valueField : "ttiName",
															displayField : "ttiName",
															selectOnFocus : true, // 值为
															// ture
															// 时表示字段获取焦点时自动选择字段既有文本(默认为
															// false)
															typeAhead : true,
															typeAheadDelay : 0, // 延时显示下拉框第一列
															editable : true, // 可以编辑
															hideTrigger : true,// 隐藏文本框后面的倒三角
															queryDelay : 1000,
															renderTo : document.body,
															listeners : {
																'beforequery' : function(
																		_query,
																		_oEpts) {
																	if (_query.query.length < 2) {
																		return;
																	}
																	var ttiName = Ext
																			.getCmp(
																					'sellerName')
																			.getValue();
																	_query.query = ttiName;
																},
																'select' : function(
																		t, i,
																		eOpts) {
																	Ext
																			.getCmp(
																					'sellerTaxNo')
																			.setValue(
																					i[0].data.ttiTaxNo); // 销方名称
																	Ext
																			.getCmp(
																					'sellerAccountInfo')
																			.setValue(
																					i[0].data.ttiAccountInfo); // 销方银行及账户号
																	Ext
																			.getCmp(
																					'sellerContactInfo')
																			.setValue(
																					i[0].data.ttiContactInfo); // 地址电话
																	Ext
																			.getCmp(
																					'payee')
																			.setValue(
																					i[0].data.ttiPayee); // 收款人
																	Ext
																			.getCmp(
																					'reviewer')
																			.setValue(
																					i[0].data.ttiReviewer); // 复核人
																	Ext
																			.getCmp(
																					'issuer')
																			.setValue(
																					i[0].data.ttiIssuer); // 开票人
																}
															}
														},
														{
															xtype : 'numberfield',
															fieldLabel : '发票金额(不含税)',
															name : 'income',
															id : 'income',
															itemId : 'income',
															hideTrigger : true,
															disabled : true
														},
														{
															fieldLabel : '复核人',
															xtype : 'textfield',
															enforceMaxLength : true,
															name : 'reviewer',
															id : 'reviewer',
															width : 200
														},
														{
															xtype : 'textfield',
															fieldLabel : '购方银行及账户号',
															name : 'buyerAccountInfo',
															id : 'buyerAccountInfo',
															itemId : 'buyerAccountInfo'
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方银行及账户号',
															name : 'sellerAccountInfo',
															id : 'sellerAccountInfo',
															itemId : 'sellerAccountInfo'
														},
														{
															xtype : 'numberfield',
															fieldLabel : '发票税额',
															name : 'tax',
															id : 'tax',
															itemId : 'tax',
															hideTrigger : true,
															disabled : true
														},
														{
															fieldLabel : '开票人',
															xtype : 'textfield',
															enforceMaxLength : true,
															name : 'issuer',
															id : 'issuer',
															width : 200
														},
														{
															xtype : 'textfield',
															fieldLabel : '购方地址及电话',
															name : 'buyerContactInfo',
															id : 'buyerContactInfo',
															itemId : 'buyerContactInfo'
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方地址及电话',
															name : 'sellerContactInfo',
															id : 'sellerContactInfo',
															itemId : 'sellerContactInfo'
														},
														{
															xtype : 'combobox',
															fieldLabel : '发票类型',
															name : 'billType',
															id : 'billType',
															itemId : 'billType',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : vmsInvoiceTypeList
																			}),
															editable : false,
															selectOnFocus : true
														},
														{
															xtype : 'combobox',
															fieldLabel : '电子发票',
															name : 'digitizing',
															id : 'digitizing',
															width : 200,
															itemId : 'digitizing',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : booleanCode
																			}),
															editable : false,
															selectOnFocus : true
														},
														{
															xtype : 'combobox',
															fieldLabel : '清单开票',
															name : 'inventory',
															id : 'inventory',
															itemId : 'inventory',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : booleanCode
																			}),
															editable : false,
															selectOnFocus : true
														},
														{
															fieldLabel : '备注',
															xtype : 'textareafield',
															enforceMaxLength : true,
															name : 'remark',
															id : 'remark',
															width : 684,
															height : 30
														},
														{
															fieldLabel : '购方客户号',
															xtype : 'textfield',
															fieldLabel : '购方客户号',
															name : 'buyerCustId',
															id : 'buyerCustId',
															itemId : 'buyerCustId',
															hidden : true
														} ]
											},
											{
												xtype : 'toolbar',
												html : null,
												border : 0,
												bodyStyle : 'backgroundColor:#d8d8d8;backgroundImage: -webkit-linear-gradient(top,#e6e6e6,#efefef);',
												layout : 'column',
												items : [
														{
															xtype : 'button',
															text : '',
															iconCls : "add-icon",
															instWin : null,
															tooltip : '商品明细',
															autoShow : true, // 默认false,自动显示
															handler : function() {
																var treetaxNo = Ext
																		.getCmp(
																				'sellerTaxNo')
																		.getValue();
																var params = {};
																params['taxNo'] = treetaxNo;
																Ext.Ajax
																		.request({
																			// 后台请求路径
																			url : 'queryGoodsArea.ajax',
																			// 数据类型
																			dataType : "json",
																			// 请求的参数
																			params : {
																				JsonObj : JSON
																						.stringify(params)
																			},
																			// 请求成功调用函数
																			success : function(
																					response) {
																				if (response) {
																					var result = Ext
																							.decode(response.responseText);
																					var dataList = result.dataList;
																					var goodsCount = goodStore.data.items.length;
																					if (inventory == 'N'
																							&& goodsCount == 8) {
																						Ext.MessageBox
																								.alert(
																										'提示',
																										'非清单开票最多开具商品明细为8条，请确认');
																						return;
																					} else if (inventory == 'Y'
																							&& goodsCount == 200) {
																						Ext.MessageBox
																								.alert(
																										'提示',
																										'清单发票最多开具商品明细为200条，请确认');
																						return;
																					}
																					if (goodsCount > 0) {
																						var goods = goodStore.data.items[goodsCount - 1].data;
																						var inventory = Ext
																								.getCmp('inventory').value;
																						rows.goodsName = goods.goodsName;
																						rows.goodsCode = goods.goodsCode;
																						rows.model = goods.model;
																						rows.unit = goods.unit;
																						rows.quantity = 1;
																						rows.taxRate = goods.taxRate;
																						rows.income = 0;
																						rows.unitPrice = 0
																						rows.tax = 0;
																						rows.dutyFree = goods.dutyFree;
																						goodStore
																								.add(rows);
																						var newSumIncome = 0;
																						var newSumTax = 0;
																						var items = goodStore.data.items;
																						for (var i = 0; i < items.length; i++) {
																							var itemData = items[i].data;
																							newSumIncome += Number(itemData.income);
																							newSumTax += Number(itemData.tax);
																						}
																						Ext
																								.getCmp(
																										'income')
																								.setValue(
																										newSumIncome);
																						Ext
																								.getCmp(
																										'tax')
																								.setValue(
																										newSumTax);
																						Ext
																								.getCmp(
																										'sum')
																								.setValue(
																										Number(newSumIncome)
																												+ Number(newSumTax));
																					} else {
																						if (dataList.length > 0) {
																							var goods = dataList[0];
																							rows.goodsName = goods.goodsName;
																							rows.goodsCode = goods.goodsCode;
																							rows.model = goods.model;
																							rows.unit = goods.unit;
																							rows.quantity = 1;
																							rows.taxRate = 0;
																							rows.income = 0;
																							rows.unitPrice = 0
																							rows.tax = 0;
																						} else {
																							rows.goodsName = "";
																							rows.goodsCode = "";
																							rows.model = "";
																							rows.unit = "";
																							rows.quantity = 1;
																							rows.taxRate = 0;
																							rows.income = 0;
																							rows.unitPrice = 0
																							rows.tax = 0;
																						}
																						rows.dutyFree = "Z";
																						goodStore
																								.add(rows);
																						var newSumIncome = 0;
																						var newSumTax = 0;
																						var items = goodStore.data.items;
																						for (var i = 0; i < items.length; i++) {
																							var itemData = items[i].data;
																							newSumIncome += Number(itemData.income);
																							newSumTax += Number(itemData.tax);
																						}
																						Ext
																								.getCmp(
																										'income')
																								.setValue(
																										newSumIncome);
																						Ext
																								.getCmp(
																										'tax')
																								.setValue(
																										newSumTax);
																						Ext
																								.getCmp(
																										'sum')
																								.setValue(
																										Number(newSumIncome)
																												+ Number(newSumTax));
																					}
																				}
																			}
																		});
															}
														},
														{
															xtype : 'button',
															text : '',
															iconCls : "rules-icon",
															instWin : null,
															tooltip : '商品明细',
															autoShow : true, // 默认false,自动显示
															handler : function() {
																goodStore
																		.reload()
															}
														} ]
											} ]
								} ]
							},
							autoFill : true,
							id : 'cust_data_grid',
							store : goodStore,
							selModel : {
								selType : 'checkboxmodel',
								checkOnly : true
							},
							plugins : [ Ext.create(
									'Ext.grid.plugin.CellEditing', {
										clicksToEdit : 2
									// 配置点击几次显示gird编辑器
									}) ],
							columns : cm,
							dockedItems : {
								xtype : 'jespaging',
								autoShow : true,
								store : goodStore,
								dock : 'bottom',
								displayInfo : true
							}
						} ],
						buttons : [
								{
									text : '保存并提交',
									iconCls : "save-icon",
									handler : function() {
										var bill = new Object();
										if (!validation(goodStore)) {
											return false;
										}
										// 获取数据对象
										var items = goodStore.data.items;
										var goodsList = items.map(function(g) {
											return g.data;
										});
										bill["buyerTaxNo"] = Ext.getCmp(
												'buyerTaxNo').getValue();
										bill["buyerName"] = Ext.getCmp(
												'buyerName').getValue();
										bill["buyerAccountInfo"] = Ext.getCmp(
												'buyerAccountInfo').getValue();
										bill["buyerContactInfo"] = Ext.getCmp(
												'buyerContactInfo').getValue();
										bill["digitizing"] = Ext.getCmp(
												'digitizing').getValue();
										bill["inventory"] = Ext.getCmp(
												'inventory').getValue();
										bill["billType"] = Ext.getCmp(
												'billType').getValue();
										bill["income"] = Ext.getCmp('income')
												.getValue();
										bill["tax"] = Ext.getCmp('tax')
												.getValue();
										bill["payee"] = Ext.getCmp('payee')
												.getValue(); // 收款人
										bill["reviewer"] = Ext.getCmp(
												'reviewer').getValue(); // 复核人
										bill["issuer"] = Ext.getCmp('issuer')
												.getValue();// 开票人
										bill["remark"] = Ext.getCmp('remark')
												.getValue();// 备注
										bill["buyerCustId"] = Ext.getCmp(
												'buyerCustId').getValue();
										bill["sellerTaxNo"] = Ext.getCmp(
												"sellerTaxNo").getValue();
										bill["sellerName"] = Ext.getCmp(
												"sellerName").getValue();
										bill["sellerAccountInfo"] = Ext.getCmp(
												"sellerAccountInfo").getValue();
										bill["sellerContactInfo"] = Ext.getCmp(
												"sellerContactInfo").getValue();
										bill["createType"] = 'M';
										bill["goodsList"] = goodsList;
										// 请求后台
										Ext.MessageBox
												.confirm(
														'提示',
														'您确定要保存数据?',
														function(obj) {
															if (obj == 'yes') {
																Ext.Ajax
																		.request({
																			url : 'saveAndiAuditBill.ajax',
																			dataType : "json",
																			params : {
																				params : JSON
																						.stringify(bill),
																			},
																			// 请求成功调用函数
																			success : function(
																					response) {
																				if (response) {
																					var result = Ext
																							.decode(response.responseText);
																					Ext.MessageBox
																							.alert(
																									'提示',
																									result);
																					editBillWin
																							.close();
																					// 提交成功后重新加载当前页
																					billStore
																							.loadPage(1);
																				}
																			}
																		});
															}
														});
									}
								}, {
									text : '关闭',
									iconCls : "close-icon",
									handler : function() {
										editBillWin.close();
									}
								} ]
					}).show();
}

function editBillWriteOff(gridItemData, vmsInvoiceTypeList, booleanCode,
		billStore) {
	booleanCode = booleanCode.slice(1, 3);
	var goodsNameStore = Ext.create('Ext.data.Store', {
		fields : [ 'goodsName', 'goodsCode', 'model', 'unit' ],
		proxy : {
			type : 'ajax',
			url : 'fetch10byGoodsName.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
	});
	var params = new Object();
	params["id"] = gridItemData.get("id");
	params["stateCode"] = gridItemData.get("controlState");
	var fds = [ 'goodsId', 'billId', 'goodsCode', 'goodsName', 'model', 'unit',
			'quantity', 'unitPrice', 'income', 'taxRate', 'tax', 'dutyFree',
			'balanceIncome', 'balanceTax' ];
	var goodStore = Ext.create('Ext.data.Store', {
		fields : fds,
		autoLoad : true,
		proxy : {
			type : 'ajax',
			url : 'queryForWriteOffGoods.ajax',
			extraParams : {
				params : JSON.stringify(params)
			},
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		}
	});
	// 新增的动态行
	var rows = new Object();
	// 固定的columns
	var cm = [
			{
				header : '序号',
				xtype : 'rownumberer',
				width : 40,
				align : 'center'
			},
			{
				text : '商品编号',
				dataIndex : 'goodsCode',
				align : 'center',
				width : 50,
				hidden : true
			},
			{
				text : '货物或应税服务、劳务名称',
				dataIndex : 'goodsName',
				align : 'center',
				width : 150
			},
			{
				text : '剩余数量',
				dataIndex : 'quantity',
				align : 'center',
				width : 50,
				editor : {
					xtype : 'numberfield',
					allowDecimals : true,
					decimalPrecision : 8,
					minValue : 0,
					hideTrigger : true,
					listeners : {
						'change' : function(_this, n, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							var unit = Number(Ext.getCmp(_this.id).value);
							if (null != j.data.unitPrice
									&& '' != j.data.unitPrice) {
								quantity(_this);
							}
						},
						'blur' : function(_this, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							if (null == j.data.unitPrice
									|| '' == j.data.unitPrice) {
								Ext.getCmp(_this.id).setValue('');
							}
						},
						'specialkey' : function(_this, field, event, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							if (null == j.data.unitPrice
									|| '' == j.data.unitPrice) {
								Ext.getCmp(_this.id).setValue('');
							}
						}
					}
				}
			},
			{
				text : '单价',
				dataIndex : 'unitPrice',
				align : 'center',
				width : 100
			},
			{
				text : '金额(不含税)',
				dataIndex : 'income',
				align : 'center',
				width : 100,
				editor : {
					xtype : 'numberfield',
					minValue : 0,
					hideTrigger : true,
					listeners : {
						'change' : function(_this, newValue, oldValue, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							var income = Number(_this.value);
							var taxRate = Number(j.data.taxRate);
							var tax = (income * taxRate).toFixed(2);
							j.data.tax = tax;
							if (null != j.data.unitPrice
									&& '' != j.data.unitPrice) {
								if (!isNaN(income) && income > 0) {
									var unitPrice = Number(j.data.unitPrice);
									var quantity = (income / unitPrice)
											.toFixed(8);
									j.data.quantity = quantity;
								}
							}
							j.commit();
						},
						'blur' : function(_this, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							var income = Number(_this.value);
							if (!isNaN(income) && income <= 0) {
								Ext.getCmp(_this.id).setValue(
										j.data.balanceIncome);
								if (null != j.data.unitPrice
										&& '' != j.data.unitPrice) {
									j.data.quantity = j.raw.quantity;
								}
								j.data.tax = j.data.balanceTax;
								j.commit();
							}
						},
						'specialkey' : function(_this, field, event, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							var income = Number(_this.value);
							if (!isNaN(income) && income <= 0) {
								Ext.getCmp(_this.id).setValue(
										j.data.balanceIncome);
								if (null != j.data.unitPrice
										&& '' != j.data.unitPrice) {
									j.data.quantity = j.raw.quantity;
								}
								j.data.tax = j.data.balanceTax
								j.commit();
							}
						}
					}
				}
			}, {
				text : '剩余金额(不含税)',
				dataIndex : 'balanceIncome',
				align : 'center',
				width : 100
			}, {
				text : '税率',
				dataIndex : 'taxRate',
				align : 'center',
				width : 100
			}, {
				text : '税额',
				dataIndex : 'tax',
				align : 'center',
				width : 100
			}, {
				text : '剩余税额',
				dataIndex : 'balanceTax',
				align : 'center',
				width : 100
			}, {
				text : '是否免税',
				dataIndex : 'dutyFree',
				align : 'center',
				width : 50,
				hidden : true
			}, {
				text : '操作',
				align : 'center',
				width : 40,
				xtype : 'actioncolumn',
				items : [ {
					icon : 'res/img/icon16-hrs/delete.png',
					altText : "删除",
					tooltip : '删除',
					handler : function(grid, rowIndex, colIndex) {
						if (goodStore.data.items.length == 1) {
							return;
						}
						grid.getStore().removeAt(rowIndex);
						Ext.getCmp('cust_data_grid').getView().refresh();
						var newSumIncome = 0;
						var newSumTax = 0;
						var items = goodStore.data.items;
						for (var i = 0; i < items.length; i++) {
							var itemData = items[i].data;
							newSumIncome += Number(itemData.income);
							newSumTax += Number(itemData.tax);
						}
					}
				} ]
			} ];
	// 选中的票据
	var editBillWriteOffWin = Ext
			.create(
					'Ext.window.Window',
					{
						width : 920,
						modal : true,// 设置是否添加遮罩
						draggable : true,// 拖动
						resizable : true, // 变大小
						autoScroll : true,
						constrainHeader : true,
						layout : 'fit',
						title : '红冲申请票据编辑',
						items : [ {
							xtype : 'gridpanel',
							layout : 'fit',
							tbar : {
								xtype : 'container',
								items : [ {
									xtype : 'form',
									items : [
											{
												xtype : 'toolbar',
												layout : 'column',
												border : 0,
												items : [
														{
															xtype : 'textfield',
															fieldLabel : '购方税号',
															name : 'buyerTaxNo',
															id : 'buyerTaxNo',
															itemId : 'buyerTaxNo',
															value : gridItemData
																	.get('buyerTaxNo'),
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方税号',
															name : 'sellerTaxNo',
															id : 'sellerTaxNo',
															itemId : 'sellerTaxNo',
															value : gridItemData
																	.get('sellerTaxNo'),
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '总金额',
															name : 'sum',
															id : 'sum',
															itemId : 'sum',
															value : Number(gridItemData
																	.get('income'))
																	+ Number(gridItemData
																			.get('tax')),
															hideTrigger : true,
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '购方名称',
															name : 'buyerName',
															id : 'buyerName',
															itemId : 'buyerName',
															value : gridItemData
																	.get('buyerName'),
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方名称',
															name : 'sellerName',
															id : 'sellerName',
															itemId : 'sellerName',
															value : gridItemData
																	.get('sellerName'),
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '发票金额(不含税)',
															name : 'income',
															id : 'income',
															itemId : 'income',
															value : gridItemData
																	.get('income'),
															hideTrigger : true,
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '购方银行及账户号',
															name : 'buyerAccountInfo',
															id : 'buyerAccountInfo',
															itemId : 'buyerAccountInfo',
															value : gridItemData
																	.get('buyerAccountInfo'),
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方银行及账户号',
															name : 'sellerAccountInfo',
															id : 'sellerAccountInfo',
															itemId : 'sellerAccountInfo',
															value : gridItemData
																	.get('sellerAccountInfo'),
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '发票税额',
															name : 'tax',
															id : 'tax',
															itemId : 'tax',
															value : gridItemData
																	.get('tax'),
															hideTrigger : true,
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '购方地址及电话',
															name : 'buyerContactInfo',
															id : 'buyerContactInfo',
															itemId : 'buyerContactInfo',
															value : gridItemData
																	.get('buyerContactInfo'),
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方地址及电话',
															name : 'sellerContactInfo',
															id : 'sellerContactInfo',
															itemId : 'sellerContactInfo',
															value : gridItemData
																	.get('sellerContactInfo'),
															disabled : true
														},
														{
															xtype : 'combobox',
															fieldLabel : '发票类型',
															name : 'billType',
															id : 'billType',
															itemId : 'billType',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : vmsInvoiceTypeList
																			}),
															editable : false,
															selectOnFocus : true,
															value : gridItemData
																	.get('billType'),
															disabled : true
														},
														{
															xtype : 'combobox',
															fieldLabel : '电子发票',
															name : 'digitizing',
															id : 'digitizing',
															itemId : 'digitizing',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : booleanCode
																			}),
															editable : false,
															selectOnFocus : true,
															value : gridItemData
																	.get('digitizing'),
															disabled : true
														},
														{
															xtype : 'combobox',
															fieldLabel : '清单开票',
															name : 'inventory',
															id : 'inventory',
															itemId : 'inventory',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : booleanCode
																			}),
															editable : false,
															selectOnFocus : true,
															value : gridItemData
																	.get('inventory'),
															disabled : true
														},
														{
															fieldLabel : '备注',
															xtype : 'textareafield',
															enforceMaxLength : true,
															name : 'remark',
															id : 'remark',
															width : 684,
															height : 30
														},
														{
															xtype : 'combobox',
															fieldLabel : '是否释放交易',
															name : 'rewriteTrans',
															id : 'rewriteTrans',
															itemId : 'rewriteTrans',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : booleanCode
																			}),
															editable : false,
															selectOnFocus : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '剩余金额(不含税)',
															name : 'balanceIncome',
															id : 'balanceIncome',
															itemId : 'balanceIncome',
															value : gridItemData
																	.get('balanceIncome'),
															hideTrigger : true,
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '剩余税额',
															name : 'balanceTax',
															id : 'balanceTax',
															itemId : 'balanceTax',
															value : gridItemData
																	.get('balanceTax'),
															hideTrigger : true,
															disabled : true
														} ]
											},
											{
												xtype : 'toolbar',
												html : null,
												border : 0,
												bodyStyle : 'backgroundColor:#d8d8d8;backgroundImage: -webkit-linear-gradient(top,#e6e6e6,#efefef);',
												layout : 'column',
												items : [ {
													xtype : 'button',
													text : '',
													iconCls : "rules-icon",
													instWin : null,
													tooltip : '商品明细',
													autoShow : true, // 默认false,自动显示
													handler : function() {
														goodStore.reload()
													}
												} ]
											} ]
								} ]
							},
							autoFill : true,
							id : 'cust_data_grid',
							store : goodStore,
							selModel : {
								selType : 'checkboxmodel',
								checkOnly : true
							},
							plugins : [ Ext.create(
									'Ext.grid.plugin.CellEditing', {
										clicksToEdit : 2
									// 配置点击几次显示gird编辑器
									}) ],
							columns : cm,
							dockedItems : {
								xtype : 'jespaging',
								autoShow : true,
								store : goodStore,
								dock : 'bottom',
								displayInfo : true
							}
						} ],
						buttons : [
								{
									text : '保存并提交',
									iconCls : "save-icon",
									handler : function() {
										var dataParamList = new Array();
										// 获取数据对象
										var items = goodStore.data.items;
										for (var i = 0; i < items.length; i++) {
											var itemData = items[i].data;
											/*
											 * if (isNaN(itemData.income)) {
											 * Ext.MessageBox.alert('提示',
											 * '商品信息有误，请检查'); return; } else if
											 * (Number(itemData.income) == 0 ||
											 * Number(itemData.income) >
											 * Number(itemData.balanceIncome)) {
											 * Ext.MessageBox.alert('提示',
											 * '商品金额超出可红冲金额，请检查'); return; }
											 */
											dataParamList.push(itemData);
										}
										var bill = {};
										for ( var f in gridItemData.data) {
											bill[f] = gridItemData.get(f);
										}
										var rewriteTrans = Ext
												.getCmp('rewriteTrans').value;
										if (rewriteTrans == null) {
											Ext.MessageBox.alert('提示',
													"请选择是否释放交易");
											return;
										}
										// bill["buyerTaxNo"] =
										// Ext.getCmp('buyerTaxNo').value;
										// bill["buyerName"] =
										// Ext.getCmp('buyerName').value;
										// bill["buyerAccountInfo"] =
										// Ext.getCmp('buyerAccountInfo').value;
										// bill["buyerContactInfo"] =
										// Ext.getCmp('buyerContactInfo').value;
										// bill["sellerTaxNo"] =
										// Ext.getCmp('sellerTaxNo').value;
										// bill["sellerName"] =
										// Ext.getCmp('sellerName').value;
										// bill["sellerAccountInfo"] =
										// Ext.getCmp('sellerAccountInfo').value;
										// bill["sellerContactInfo"] =
										// Ext.getCmp('sellerContactInfo').value;
										// bill["digitizing"] =
										// Ext.getCmp('digitizing').value;
										// bill["inventory"] =
										// Ext.getCmp('inventory').value;
										// bill["billType"] =
										// Ext.getCmp('billType').value;
										bill["income"] = Ext.getCmp('income').value;
										bill["tax"] = Ext.getCmp('tax').value;
										bill["remark"] = Ext.getCmp('remark')
												.getValue();
										bill["rewriteTrans"] = rewriteTrans;
										bill["goodsList"] = dataParamList;
										// 请求后台
										Ext.MessageBox
												.confirm(
														'提示',
														'您确定要保存数据?',
														function(obj) {
															if (obj == 'yes') {
																Ext.Ajax
																		.request({
																			url : 'saveAndAuditWriteOffBill.ajax',
																			dataType : "json",
																			params : {
																				params : JSON
																						.stringify(bill),
																			},
																			// 请求成功调用函数
																			success : function(
																					response) {
																				if (response) {
																					var result = Ext
																							.decode(response.responseText);
																					Ext.MessageBox
																							.alert(
																									'提示',
																									result);
																					editBillWriteOffWin
																							.close();
																					// 提交成功后重新加载当前页
																					billStore
																							.loadPage(1);
																				}
																			}
																		});
															}
														});
									}
								}, {
									text : '关闭',
									iconCls : "close-icon",
									handler : function() {
										editBillWriteOffWin.close();
									}
								} ]
					}).show();

	Ext.Ajax.request({
		// 后台请求路径
		url : 'billEditExpire.ajax',
		// 数据类型
		dataType : "json",
		// 请求的参数
		params : {
			JsonObj : JSON.stringify(gridItemData.data)
		},
		// 请求成功调用函数
		success : function(response) {
			if (response) {
				var result = Ext.decode(response.responseText);
				if (result == "succ") {
					console.log("缓存时间延长成功");
				}
			}
		}
	});
}

function relateBill(gridItemData, vmsInvoiceTypeList, billStore) {
	var pageType = null;
	var rows = new Object();
	// transInfo固定列
	var baseCm = [ {
		header : '序号',
		xtype : 'rownumberer',
		width : 50,
		align : 'center'
	}, {
		text : '交易编号',
		dataIndex : 'TRANS_ID',
		align : 'center',
		hidden : true
	}, {
		text : '机构编码',
		dataIndex : 'INST_ID',
		align : 'center',
		width : 100,
		hidden : true
	}, {
		text : '所属机构',
		dataIndex : 'AUTH_INST_NAME',
		align : 'center',
		width : 120
	}, {
		text : '交易日期',
		dataIndex : 'TRANS_DATE',
		align : 'center',
		width : 120
	}, {
		text : '开票方名称',
		dataIndex : 'CI_CHINESE_NAME',
		align : 'center',
		width : 120
	}, {
		text : '交易类型',
		dataIndex : 'TRANS_TYPE_NAME',
		align : 'center',
		width : 120
	}, {
		text : '税率',
		dataIndex : 'TAX_RATE',
		align : 'center',
		width : 120
	}, {
		text : '交易金额(不含税)',
		dataIndex : 'INCOME_CNY',
		align : 'center',
		width : 120
	}, {
		text : '税额',
		dataIndex : 'TAX_CNY',
		align : 'center',
		width : 120
	}, {
		text : '可钩稽金额(含税)',
		dataIndex : 'BALANCE_CNY',
		align : 'center',
		width : 200
	} ];

	// 钩稽金额编辑列
	var relateEditor = {
		text : '钩稽金额',
		dataIndex : 'RELATE_BALANCE',
		align : 'center',
		width : 200,
		editor : {
			xtype : 'numberfield',
			minValue : 0,
			hideTrigger : true,
			listeners : {
				'change' : function(_this, n, o, eOpts) {
					if (isNaN(Number(n))) {
						return;
					}
					if (Number(n) < 0) {
						return;
					}
					var billSum = Number(Ext.getCmp("relatableBalance").value);
					billSum = billSum + Number(o) - Number(n);
					Ext.getCmp("relatableBalance").setValue(billSum);
				},
				'blur' : function(combo, records, eOpts) {

				},
				'specialkey' : function(_this, field, event, eOpts) {

				}
			}
		}
	};

	// 确认钩稽按钮
	var selectHandle = {
		text : '确认钩稽',
		dataIndex : 'relate',
		align : 'center',
		width : 100,
		align : 'center',
		xtype : 'actioncolumn',
		items : [ {
			altText : '钩稽',
			tooltip : '钩稽',
			iconCls : 'accept-icon',
			handler : function(grid, index, col, item, e, me) {
				var record = grid.store.getAt(index).data;
				var billSum = (Number(Ext.getCmp("relatableBalance").value));
				if (billSum == 0) {
					Ext.MessageBox.alert("提示", "钩稽金额已满足");
					return;
				}
				rows.TRANS_ID = record.TRANS_ID;
				rows.AUTH_INST_NAME = record.AUTH_INST_NAME;
				rows.TRANS_DATE = record.TRANS_DATE;
				rows.CI_CHINESE_NAME = record.CI_CHINESE_NAME;
				rows.TRANS_TYPE_NAME = record.TRANS_TYPE_NAME;
				rows.TAX_RATE = record.TAX_RATE;
				rows.INCOME_CNY = record.INCOME_CNY;
				rows.TAX_CNY = record.TAX_CNY;
				rows.BALANCE_CNY = record.BALANCE_CNY;
				rows.TAX_NO = record.TAX_NO;
				rows.RELATE_BALANCE = billSum > Number(record.BALANCE_CNY) ? record.BALANCE_CNY
						: billSum;
				Ext.getCmp("relatableBalance").setValue(
						(billSum - Number(rows.RELATE_BALANCE)).toFixed(2));
				checkedStore.add(rows);
				var cmp = Ext.getCmp("unselectedTrans");
				cmp.reconfigure();
				Ext.Ajax.request({
					// 后台请求路径
					url : 'transDoEditExpire.ajax',
					// 数据类型
					dataType : "json",
					// 请求的参数
					params : {
						JsonObj : JSON.stringify(record)
					},
					// 请求成功调用函数
					success : function(response) {
						if (response) {
							var result = Ext.decode(response.responseText);
							if (result == "succ") {
								console.log("缓存时间延长成功");
							}
						}
					}
				});
			},
			getClass : function(v, metadata, r, rowIndex, colIndex, store) {
				var items = Ext.getCmp("selectedTrans").store.data.items;
				items = items.filter(function(e) {
					return e.get("TRANS_ID") == r.get("TRANS_ID");
				});
				if (items.length == 0) {
					return "accept-icon";
				} else {
					return "cancel-icon";
				}
			},
			isDisabled : function(view, rowIndex, colIndex, item, record) {
				var items = Ext.getCmp("selectedTrans").store.data.items;
				items = items.filter(function(e) {
					return e.get("TRANS_ID") == record.get("TRANS_ID");
				});
				if (items.length == 0) {
					return false;
				} else {
					return true;
				}
			}
		} ]
	};
	// 取消钩稽按钮
	var deselectHandle = {
		text : '撤销钩稽',
		dataIndex : 'deRelate',
		align : 'center',
		width : 100,
		align : 'center',
		xtype : 'actioncolumn',
		items : [ {
			altText : '撤销钩稽',
			tooltip : '撤销钩稽',
			iconCls : 'undo-icon',
			handler : function(grid, index, col, item, e) {
				var j = checkedStore.getAt(index);
				var balance = Number(Ext.getCmp("relatableBalance").value);
				balance = (balance + Number(j.get("RELATE_BALANCE")))
						.toFixed(2);
				Ext.getCmp("relatableBalance").setValue(balance);
				var related = Number(j.get('RELATE_BALANCE'));
				var balance = Number(Ext.getCmp("relatableBalance").getValue());
				checkedStore.remove(j);
				var cmp = Ext.getCmp("unselectedTrans");
				cmp.reconfigure();

				// 获取grid的数据，传入后台保存
				var array = new Array();
				array.push(j.data);
				Ext.Ajax.request({
					// 后台请求路径
					url : 'transRemoveExpire.ajax',
					sync : true,
					// 数据类型
					dataType : "json",
					// 请求的参数
					params : {
						JsonObj : JSON.stringify(array),
					},
					// 请求成功调用函数
					success : function(response) {
						if (response) {
							var result = Ext.decode(response.responseText);
						}
					}
				});
			}
		} ]
	};
	// 建立已待钩稽列
	var selectedCm = new Array();
	baseCm.forEach(function(e) {
		selectedCm.push(e);
	});
	selectedCm.push(relateEditor);
	selectedCm.push(deselectHandle);

	// 建立待钩稽列
	var unselectedCm = new Array();
	baseCm.forEach(function(e) {
		unselectedCm.push(e);
	});
	unselectedCm.push(selectHandle);
	// 客户列
	var custFields = [ 'CI_ID', 'CI_CUSTOMER_ID', 'CI_TAX_NO',
			'CI_CHINESE_NAME', 'CI_FOREIGN_NAME', 'CI_DOMESTIC_BANK',
			'CI_DOMESTIC_ACCOUNT', 'CI_DOMESTIC_TEL', 'CI_DOMESTIC_ADDRESS',
			'CI_FOREIGN_BANK', 'CI_FOREIGN_ACCOUNT', 'CI_FOREIGN_TEL',
			'CI_FOREIGN_ADDRESS', 'CI_CONTACT_NAME', 'CI_CONTACT_TEL',
			'CI_CONTACT_ADDRESS', 'CI_TAXPAYER_TYPE', 'CI_SUBJECT_PROPERTY',
			'CI_NATIONALITY', 'CI_P_ID_CARD', 'CI_P_GENDER', 'CI_P_AGE',
			'CI_C_LEGAL_PERSON', 'CI_C_ORG_FORM', 'CI_BILLED',
			'CI_DATA_SOURCE', 'CI_INST_ID', 'CI_CONTROL_STATUS',
			'CI_CONTROL_REMARK', 'CI_DATA_STATUS', 'ciIdentityCode' ];

	// 客户名称store
	var nameStore = Ext.create('Ext.data.Store', {
		fields : custFields,
		proxy : {
			type : 'ajax',
			url : 'customerByIdentity.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
	});

	// 销方税号store
	var taxNoStore = Ext.create('Ext.data.Store', {
		fields : [ 'ttiTaxNo' ],
		proxy : {
			type : 'ajax',
			url : 'fetch10bytaxNo.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
	});

	// 交易类型store
	var transTypeStore = Ext.create('Ext.data.Store', {
		fields : [ "typeId", 'typeName' ],
		proxy : {
			type : 'ajax',
			url : 'fetch10byTransType.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
	});
	var transFields = [ 'TRANS_ID', 'INST_ID', 'CUSTOMER_ID',
			'BILL_CUSTOMER_ID', 'TRANS_DATE', 'TRANS_TYPE', 'TRANS_TYPE_NAME',
			'TAX_INCLUDED', 'QUANTITY', 'UNIT_PRICE', 'TAX_RATE', 'AMT_CNY',
			'TAX_CNY', 'BALANCE_CNY', 'INCOME_CNY', 'TAX_BALANCE_CNY',
			'SHORT_AND_OVER', 'TAX_NO', 'INVOICE_TYPE', 'INVOICE_LIMIT',
			'TAIL_LIMIT', 'TAX_CODE', 'GOODS_CODE', 'INDICATED',
			'AUTO_BILLING', 'DIGITIZING', 'CONTROL_STATUS',
			'WRITEOFF_CONTROL_STATUS', 'CONTROL_REMARK', 'DATA_STATUS',
			'AUTH_INST_NAME', 'CI_ID', 'CI_CUSTOMER_ID', 'CI_TAX_NO',
			'CI_CHINESE_NAME', 'CI_DOMESTIC_BANK', 'CI_DOMESTIC_ACCOUNT',
			'CI_DOMESTIC_TEL', 'CI_DOMESTIC_ADDRESS', 'CI_CONTACT_NAME',
			'CI_CONTACT_TEL', 'CI_CONTACT_ADDRESS', 'CI_TAXPAYER_TYPE',
			'CI_SUBJECT_PROPERTY', 'CI_NATIONALITY', 'CI_P_ID_CARD',
			'CI_C_LEGAL_PERSON', 'CI_C_ORG_FORM', 'CI_BILLED', 'TTI_ID',
			'TTI_TAX_NO', 'TTI_NAME', 'TTI_CONTACT_INFO', 'TTI_ACCOUNT_INFO',
			'TTI_PAYEE', 'TTI_REVIEWER', 'TTI_ISSUER', 'RELATE_BALANCE',
			'checkOn' ];

	// 钩稽的数据
	var checkedStore = Ext.create("Ext.data.Store", {
		fields : transFields,
		proxy : {
			type : 'ajax',
			url : 'queryRelatedData.ajax',
			extraParams : {
				billId : gridItemData.id
			},
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
		autoLoad : true
	});

	// 待钩稽
	var transStore = Ext.create("Ext.data.Store", {
		fields : transFields,
		proxy : {
			type : 'ajax',
			url : 'queryRelatableData.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
		autoLoad : true,
		listeners : {
			load : function(a, b, options) {
				if (null != b) {
					b.forEach(function(j) {
						for ( var f in j.data) {
							var l = f.length;
							if (f.substr(l - 4, l) == 'DATE') {
								j.data[f] = Ext.util.Format.date(j.data[f],
										'Y-m-d G:i:s')
							}
						}
						j.commit();
					});
					isLarge(a, "transLargeData");// isLargeData 字段显示文本框id
				}
				pageType = null;
				Ext.getCmp("transJespaging").pageType = null;
			}
		}
	});

	// 票据信息
	var billInfo = Ext.create('Ext.form.FieldSet', {
		modal : true,// 设置是否添加遮罩
		layout : 'fit',
		draggable : false,// 拖动
		resizable : false, // 变大小
		autoScroll : true,
		title : '基本信息',
		// height : 102,
		// width : 900,
		constrainHeader : true,
		items : [ {
			defaultType : 'textfield',
			name : 'billInfo',
			border : 0,
			items : [ {
				xtype : 'toolbar',
				layout : 'column',
				border : 0,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '购方税号',
					name : 'buyerTaxNo',
					id : 'buyerTaxNo',
					itemId : 'buyerTaxNo',
					value : gridItemData.buyerTaxNo,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : '销方税号',
					name : 'sellerTaxNo',
					id : 'sellerTaxNo',
					itemId : 'sellerTaxNo',
					value : gridItemData.sellerTaxNo,
					readOnly : true
				}, {
					xtype : 'numberfield',
					fieldLabel : '待钩稽金额',
					name : 'relatableBalance',
					id : 'relatableBalance',
					itemId : 'relatableBalance',
					value : gridItemData.relatableBalance,
					hideTrigger : true,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : '购方名称',
					name : 'buyerName',
					id : 'buyerName',
					itemId : 'buyerName',
					value : gridItemData.buyerName,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : '销方名称',
					name : 'sellerName',
					id : 'sellerName',
					itemId : 'sellerName',
					value : gridItemData.sellerName,
					readOnly : true
				}, {
					xtype : 'numberfield',
					fieldLabel : '发票金额(不含税)',
					name : 'income',
					id : 'income',
					itemId : 'income',
					value : gridItemData.income,
					hideTrigger : true,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : '购方银行及账户号',
					name : 'buyerAccountInfo',
					id : 'buyerAccountInfo',
					itemId : 'buyerAccountInfo',
					value : gridItemData.buyerAccountInfo,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : '销方银行及账户号',
					name : 'sellerAccountInfo',
					id : 'sellerAccountInfo',
					itemId : 'sellerAccountInfo',
					value : gridItemData.sellerAccountInfo,
					readOnly : true
				}, {
					xtype : 'numberfield',
					fieldLabel : '发票税额',
					name : 'tax',
					id : 'tax',
					itemId : 'tax',
					value : gridItemData.tax,
					hideTrigger : true,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : '购方地址及电话',
					name : 'buyerContactInfo',
					id : 'buyerContactInfo',
					itemId : 'buyerContactInfo',
					value : gridItemData.buyerContactInfo,
					readOnly : true
				}, {
					xtype : 'textfield',
					fieldLabel : '销方地址及电话',
					name : 'sellerContactInfo',
					id : 'sellerContactInfo',
					itemId : 'sellerContactInfo',
					value : gridItemData.sellerContactInfo,
					readOnly : true
				}, {
					fieldLabel : '开票人',
					xtype : 'textfield',
					enforceMaxLength : true,
					name : 'issuer',
					id : 'issuer',
					value : gridItemData.issuer,
					readOnly : true
				}, {
					fieldLabel : '复核人',
					xtype : 'textfield',
					enforceMaxLength : true,
					name : 'reviewer',
					id : 'reviewer',
					value : gridItemData.reviewer,
					readOnly : true
				}, {
					fieldLabel : '收款人',
					xtype : 'textfield',
					enforceMaxLength : true,
					name : 'payee',
					id : 'payee',
					value : gridItemData.payee,
					readOnly : true
				}, {
					xtype : 'combobox',
					fieldLabel : '发票类型',
					name : 'billType',
					id : 'billType',
					itemId : 'billType',
					// labelAlign:'right',
					queryMode : 'local',
					displayField : 'value',
					valueField : 'key',
					store : Ext.create('Ext.data.Store', {
						fields : [ 'key', 'value' ],
						data : vmsInvoiceTypeList
					}),
					editable : false,
					selectOnFocus : true,
					value : gridItemData.billType,
					readOnly : true
				} ]
			} ]
		} ]
	});

	// 钩稽的数据
	var selectedTrans = Ext.create('Ext.grid.GridPanel', {
		id : 'selectedTrans',
		title : "已钩稽的数据",
		height : 150,
		draggable : false,// 拖动
		resizable : true, // 变大小
		autoScroll : true,
		forceFit : true,
		autoScroll : true,
		store : checkedStore,
		columns : selectedCm,
		plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit : 2
		}) ]
	});

	// 未钩稽的数据
	var unselectedTrans = Ext
			.create(
					'Ext.grid.GridPanel',
					{
						id : "unselectedTrans",
						title : "未钩稽的数据",
						draggable : false,// 拖动
						resizable : true, // 变大小
						autoScroll : true,
						forceFit : true,
						autoScroll : true,
						tbar : {
							xtype : 'container',
							items : [
									{
										xtype : 'form',
										items : [ {
											xtype : 'toolbar',
											layout : 'column',
											border : 0,
											items : [ {
												xtype : 'toolbar',
												layout : 'column',
												border : 0,
												items : [
														{
															xtype : 'combobox',
															fieldLabel : '交易类型',
															labelAlign : 'right',
															name : "TRANS_TYPE",
															id : "TRANS_TYPE",
															minChars : 2,
															store : transTypeStore,
															triggerAction : "all",
															mode : "local",
															queryParam : "typeName",
															valueField : "typeId",
															displayField : "typeName",
															selectOnFocus : true,
															typeAhead : true,
															typeAheadDelay : 0,
															editable : true,
															hideTrigger : true,
															queryDelay : 1000,
															renderTo : document.body
														},
														{
															xtype : 'combobox',
															fieldLabel : '开票方名称',
															labelAlign : 'right',
															name : "BILL_CUSTOMER_ID",
															id : "CI_CHINESE_NAME",
															minChars : 2,
															store : nameStore,
															triggerAction : "all",
															mode : "local",
															queryParam : "params",
															valueField : "CI_CUSTOMER_ID",
															displayField : "CI_CHINESE_NAME",
															selectOnFocus : true,
															typeAhead : true,
															typeAheadDelay : 0,
															editable : true,
															hideTrigger : true,
															queryDelay : 1000,
															renderTo : document.body,
															listeners : {
																'beforequery' : function(
																		_query,
																		_oEpts) {
																	if (_query.query.length < 2) {
																		return;
																	}
																	var params = {};
																	params["ciChineseName"] = _query.query;
																	_query.query = JSON
																			.stringify(params);
																}
															}
														},
														{
															xtype : 'datefield',
															fieldLabel : '交易日期',
															id : 'TRANS_START_DATE',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															format : 'Y-m-d',
															labelAlign : 'right',
															name : "TRANS_START_DATE",
															editable : true,
															maxValue : new Date(),
															vtype : 'daterange',// daterange类型为上代码定义的类型
															endDateField : 'TRANS_END_DATE'// 必须跟endDate的name名相同
														},
														{
															xtype : 'datefield',
															labelSeparator : '',
															labelWidth : 10,
															fieldLabel : '-',
															id : 'TRANS_END_DATE',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															format : 'Y-m-d',
															name : "TRANS_END_DATE",
															maxValue : new Date(),
															labelAlign : 'right',
															editable : true,
														},
														{
															xtype : 'combobox',
															fieldLabel : '销方税号',
															id : 'TAX_NO',
															labelAlign : 'right',
															name : 'TAX_NO',
															minChars : 2,
															store : taxNoStore,
															triggerAction : "all",
															mode : "local",
															queryParam : "ttiTaxNo",
															valueField : "ttiTaxNo",
															displayField : "ttiTaxNo",
															selectOnFocus : true,
															typeAhead : true,
															typeAheadDelay : 0,
															editable : true,
															hideTrigger : true,
															queryDelay : 1000,
															renderTo : document.body
														},
														{
															xtype : 'combobox',
															fieldLabel : '发票类型',
															name : 'INVOICE_TYPE',
															id : 'INVOICE_TYPE',
															labelAlign : 'right',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : vmsInvoiceTypeList
																			}),
															editable : false,
															selectOnFocus : true
														},
														{
															text : '查询',
															iconCls : "search-icon",
															handler : function(
																	me) {
																var params = {};
																var fs = Ext.ComponentQuery
																		.query(
																				'textfield',
																				me
																						.up('toolbar'));
																for ( var i in fs) {
																	var value = fs[i]
																			.getValue();
																	if (false == fs[i].wasValid) {
																		value = null;
																	}
																	if (null != value
																			&& fs[i].name == 'TRANS_END_DATE'
																			&& fs[i].xtype == 'datefield') {
																		var day = Number(fs[i]
																				.getValue()
																				.getDate()) + 1;
																		value
																				.setDate(day);
																	}
																	params[fs[i].name] = value;
																}
																transStore.proxy.extraParams = params;
																transStore
																		.loadPage(1);
																var seledData = Ext
																		.getCmp(
																				'data_grid')
																		.getSelectionModel()
																		.getSelection();
																if (seledData.length > 0) {
																	pageType = 'query';
																}
															}
														},
														{
															xtype : 'button',
															text : '重置',
															iconCls : "rules-icon",
															instWin : null,
															handler : function(
																	me) {
																me
																		.up(
																				'form')
																		.getForm()
																		.reset();
															}
														} ]
											} ]
										} ]
									},
									{
										xtype : 'toolbar',
										html : null,
										border : 0,
										bodyStyle : 'backgroundColor:#d8d8d8;backgroundImage: -webkit-linear-gradient(top,#e6e6e6,#efefef);',
										layout : 'column',
										items : [ {
											text : '提示',
											xtype : 'textfield',
											id : 'transLargeData',
											name : 'largeData',
											align : 'center',
											width : 350,
											fieldStyle : 'color:red;font-weight:bold',// 改变字体颜色
											// 加粗
											disabled : true,
											hidden : true
										} ]
									} ]
						},
						store : transStore,
						selModel : {
							selType : 'checkboxmodel',
							checkOnly : false,// 只能通过checkbox选中
							mode : 'SIMPLE',
						},
						listeners : {
							beforeselect : function(_this, _record, _index,
									_eOpts) {
								if (_record.data.checkOn == 'OCCUPIED') {
									// 设置当前数据不选中
									return false;
								}
							},
							afterlayout : function(_this, eOpts) {
								var thisStore = _this.store.data.items;
								thisStore.forEach(function(record, index) {
									if (record.data.checkOn == 'SELECTED') {
										// 设置当前数据选中
										Ext.getCmp('unselectedTrans')
												.getSelectionModel().select(
														record, true, true);
									} else {
										Ext.getCmp('unselectedTrans')
												.getSelectionModel().deselect(
														record, true, true);
									}
								});
							}
						},
						viewConfig : {
							getRowClass : function(record, rowIndex, rowParams,
									store) {
								// 控制行颜色
								if (record.data.checkOn == 'OCCUPIED') {
									return "getRowClassLock";
								}
							}
						},
						columns : unselectedCm,
						selType : 'checkboxmodel',
						dockedItems : {
							id : 'transJespaging',
							xtype : 'jespaging',
							autoShow : true,
							store : transStore,
							dock : 'bottom',
							pageType : null,
							displayInfo : true,
							listeners : {
								beforechange : function() {
									pageType = 'query';
								}
							}
						}
					});

	var relateBillWin = Ext
			.create(
					'Ext.window.Window',
					{
						title : '票据钩稽',
						width : 1000,
						height : 550,
						forceFit : false,
						modal : true,// 设置是否添加遮罩
						draggable : true,// 拖动
						resizable : true, // 变大小
						autoScroll : true,
						closeAction : 'close',
						items : [ billInfo, selectedTrans, unselectedTrans ],
						buttons : [ {
							text : '保存',
							name : 'saveBtn',
							iconCls : "save-icon",
							handler : function(me) {
								var valid = true;
								var transList = [];
								checkedStore.data.items
										.forEach(function(j) {
											var balance = Number(j.data.RELATE_BALANCE);
											if (0 == balance || isNaN(balance)) {
												Ext.MessageBox.alert("提示",
														"钩稽金额不正确");
												valid = false;
											}
											var transInfo = new Object();
											transInfo.TAX_RATE = j.data.TAX_RATE;
											transInfo.RELATED_CNY = j.data.RELATE_BALANCE;
											transInfo.TRANS_ID = j.data.TRANS_ID;
											transInfo.BALANCE_CNY = j.data.BALANCE_CNY;
											transInfo.CONTROL_REMARK = j.data.CONTROL_REMARK
											transList.push(transInfo);
										});
								if (valid) {
									Ext.MessageBox
											.confirm(
													'提示',
													'确认保存吗？',
													function(obj) {
														if (obj == 'yes') {
															// 需要传给后台的数据
															var billInfo = new Object();
															billInfo = gridItemData;
															billInfo.relatableBalance = Ext
																	.getCmp("relatableBalance").value;
															var params = new Object();
															params["bill"] = billInfo;
															params["trans"] = transList;
															Ext.Ajax
																	.request({
																		url : 'saveRelatedData.ajax',
																		// 数据类型
																		dataType : "json",
																		params : {
																			params : JSON
																					.stringify(params)
																		},
																		success : function(
																				response) {
																			var result = Ext
																					.decode(response.responseText);
																			Ext.MessageBox
																					.alert(
																							'提示',
																							result);
																			relateBillWin
																					.close();
																			// 提交成功后重新加载当前页
																			billStore
																					.loadPage(1);
																		}
																	});
														}
													})
								}
							}
						} ]
					}).show();
	relateBillWin.on("close", function() {
		var items = checkedStore.data.items;
		// 获取grid的数据，传入后台保存
		var array = new Array();
		items.forEach(function(el) {
			array.push(el.data);
		});
		Ext.Ajax.request({
			// 后台请求路径
			url : 'transRemoveExpire.ajax',
			sync : true,
			// 数据类型
			dataType : "json",
			// 请求的参数
			params : {
				JsonObj : JSON.stringify(array),
			},
			// 请求成功调用函数
			success : function(response) {
				if (response) {
					var result = Ext.decode(response.responseText);
				}
			}
		});
		relateBillWin.destroy();
	});

	Ext.Ajax.request({
		// 后台请求路径
		url : 'billEditExpire.ajax',
		// 数据类型
		dataType : "json",
		// 请求的参数
		params : {
			JsonObj : JSON.stringify(gridItemData)
		},
		// 请求成功调用函数
		success : function(response) {
			if (response) {
				var result = Ext.decode(response.responseText);
				if (result == "succ") {
					console.log("缓存时间延长成功");
				}
			}
		}
	});
}
function editCiitcBillWriteOff(gridItemData,booleanCode, billStore) {
	booleanCode = booleanCode.slice(1, 3);
	var goodsNameStore = Ext.create('Ext.data.Store', {
		fields : [ 'goodsName', 'goodsCode', 'model', 'unit' ],
		proxy : {
			type : 'ajax',
			url : 'fetch10byGoodsName.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
	});
	var params = new Object();
	params["id"] = gridItemData.get("id");
	params["stateCode"] = gridItemData.get("controlState");
	var fds = [ 'goodsId', 'billId', 'goodsCode', 'goodsName', 'model',
			'unit', 'quantity', 'unitPrice', 'income', 'taxRate', 'tax',
			'dutyFree', 'balanceIncome', 'balanceTax' ];
	var goodStore = Ext.create('Ext.data.Store', {
		fields : fds,
		autoLoad : true,
		proxy : {
			type : 'ajax',
			url : 'queryForWriteOffGoods.ajax',
			extraParams : {
				params : JSON.stringify(params)
			},
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		}
	});
	// 新增的动态行
	var rows = new Object();
	// 固定的columns
	var cm = [
			{
				header : '序号',
				xtype : 'rownumberer',
				width : 40,
				align : 'center'
			},
			{
				text : '商品编号',
				dataIndex : 'goodsCode',
				align : 'center',
				width : 50,
				hidden : true
			},
			{
				text : '货物或应税服务、劳务名称',
				dataIndex : 'goodsName',
				align : 'center',
				width : 150
			},
			{
				text : '剩余数量',
				dataIndex : 'quantity',
				align : 'center',
				width : 50,
				editor : {
					xtype : 'numberfield',
					allowDecimals : true,
					decimalPrecision : 8,
					minValue : 0,
					hideTrigger : true,
					listeners : {
						'change' : function(_this, n, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							var unit = Number(Ext.getCmp(_this.id).value);
							if (null != j.data.unitPrice
									&& '' != j.data.unitPrice) {
								quantity(_this);
							}
						},
						'blur' : function(_this, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							if (null == j.data.unitPrice
									|| '' == j.data.unitPrice) {
								Ext.getCmp(_this.id).setValue('');
							}
						},
						'specialkey' : function(_this, field, event, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							if (null == j.data.unitPrice
									|| '' == j.data.unitPrice) {
								Ext.getCmp(_this.id).setValue('');
							}
						}
					}
				}
			},
			{
				text : '单价',
				dataIndex : 'unitPrice',
				align : 'center',
				width : 100
			},
			{
				text : '金额(不含税)',
				dataIndex : 'income',
				align : 'center',
				width : 100,
				editor : {
					xtype : 'numberfield',
					minValue : 0,
					hideTrigger : true,
					listeners : {
						'change' : function(_this, newValue, oldValue,
								eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							var income = Number(_this.value);
							var taxRate = Number(j.data.taxRate);
							var tax = (income * taxRate).toFixed(2);
							j.data.tax = tax;
							if (null != j.data.unitPrice
									&& '' != j.data.unitPrice) {
								if (!isNaN(income) && income > 0) {
									var unitPrice = Number(j.data.unitPrice);
									var quantity = (income / unitPrice)
											.toFixed(8);
									j.data.quantity = quantity;
								}
							}
							j.commit();
						},
						'blur' : function(_this, o, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							var income = Number(_this.value);
							if (!isNaN(income) && income <= 0) {
								Ext.getCmp(_this.id).setValue(
										j.data.balanceIncome);
								if (null != j.data.unitPrice
										&& '' != j.data.unitPrice) {
									j.data.quantity = j.raw.quantity;
								}
								j.data.tax = j.data.balanceTax;
								j.commit();
							}
						},
						'specialkey' : function(_this, field, event, eOpts) {
							var j = Ext.getCmp('cust_data_grid')
									.getSelectionModel().getSelection()[0];
							var income = Number(_this.value);
							if (!isNaN(income) && income <= 0) {
								Ext.getCmp(_this.id).setValue(
										j.data.balanceIncome);
								if (null != j.data.unitPrice
										&& '' != j.data.unitPrice) {
									j.data.quantity = j.raw.quantity;
								}
								j.data.tax = j.data.balanceTax
								j.commit();
							}
						}
					}
				}
			}, {
				text : '剩余金额(不含税)',
				dataIndex : 'balanceIncome',
				align : 'center',
				width : 100
			}, {
				text : '税率',
				dataIndex : 'taxRate',
				align : 'center',
				width : 100
			}, {
				text : '税额',
				dataIndex : 'tax',
				align : 'center',
				width : 100
			}, {
				text : '剩余税额',
				dataIndex : 'balanceTax',
				align : 'center',
				width : 100
			}, {
				text : '是否免税',
				dataIndex : 'dutyFree',
				align : 'center',
				width : 50,
				hidden : true
			}, {
				text : '操作',
				align : 'center',
				width : 40,
				xtype : 'actioncolumn',
				items : [ {
					icon : 'res/img/icon16-hrs/delete.png',
					altText : "删除",
					tooltip : '删除',
					handler : function(grid, rowIndex, colIndex) {
						if (goodStore.data.items.length == 1) {
							return;
						}
						grid.getStore().removeAt(rowIndex);
						Ext.getCmp('cust_data_grid').getView().refresh();
						var newSumIncome = 0;
						var newSumTax = 0;
						var items = goodStore.data.items;
						for (var i = 0; i < items.length; i++) {
							var itemData = items[i].data;
							newSumIncome += Number(itemData.income);
							newSumTax += Number(itemData.tax);
						}
					}
				} ]
			} ];
	// 选中的票据
	var editBillWriteOffWin = Ext
			.create(
					'Ext.window.Window',
					{
						width : 920,
						modal : true,// 设置是否添加遮罩
						draggable : true,// 拖动
						resizable : true, // 变大小
						autoScroll : true,
						constrainHeader : true,
						layout : 'fit',
						title : '电子发票红冲申请票据编辑',
						items : [ {
							xtype : 'gridpanel',
							layout : 'fit',
							tbar : {
								xtype : 'container',
								items : [ {
									xtype : 'form',
									items : [
											{
												xtype : 'toolbar',
												layout : 'column',
												border : 0,
												items : [
														{
															xtype : 'textfield',
															fieldLabel : '购方税号',
															name : 'buyerTaxNo',
															id : 'buyerTaxNo',
															itemId : 'buyerTaxNo',
															value : gridItemData
																	.get('buyerTaxNo'),
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方税号',
															name : 'sellerTaxNo',
															id : 'sellerTaxNo',
															itemId : 'sellerTaxNo',
															value : gridItemData
																	.get('sellerTaxNo'),
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '总金额',
															name : 'sum',
															id : 'sum',
															itemId : 'sum',
															value : Number(gridItemData
																	.get('income'))
																	+ Number(gridItemData
																			.get('tax')),
															hideTrigger : true,
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '购方名称',
															name : 'buyerName',
															id : 'buyerName',
															itemId : 'buyerName',
															value : gridItemData
																	.get('buyerName'),
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方名称',
															name : 'sellerName',
															id : 'sellerName',
															itemId : 'sellerName',
															value : gridItemData
																	.get('sellerName'),
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '发票金额(不含税)',
															name : 'income',
															id : 'income',
															itemId : 'income',
															value : gridItemData
																	.get('income'),
															hideTrigger : true,
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '购方银行及账户号',
															name : 'buyerAccountInfo',
															id : 'buyerAccountInfo',
															itemId : 'buyerAccountInfo',
															value : gridItemData
																	.get('buyerAccountInfo'),
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方银行及账户号',
															name : 'sellerAccountInfo',
															id : 'sellerAccountInfo',
															itemId : 'sellerAccountInfo',
															value : gridItemData
																	.get('sellerAccountInfo'),
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '发票税额',
															name : 'tax',
															id : 'tax',
															itemId : 'tax',
															value : gridItemData
																	.get('tax'),
															hideTrigger : true,
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '购方地址及电话',
															name : 'buyerContactInfo',
															id : 'buyerContactInfo',
															itemId : 'buyerContactInfo',
															value : gridItemData
																	.get('buyerContactInfo'),
															disabled : true
														},
														{
															xtype : 'textfield',
															fieldLabel : '销方地址及电话',
															name : 'sellerContactInfo',
															id : 'sellerContactInfo',
															itemId : 'sellerContactInfo',
															value : gridItemData
																	.get('sellerContactInfo'),
															disabled : true
														},
														{
															xtype : 'combobox',
															fieldLabel : '清单开票',
															name : 'inventory',
															id : 'inventory',
															itemId : 'inventory',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : booleanCode
																			}),
															editable : false,
															selectOnFocus : true,
															value : gridItemData
																	.get('inventory'),
															disabled : true
														},
														{
															fieldLabel : '备注',
															xtype : 'textareafield',
															enforceMaxLength : true,
															name : 'remark',
															id : 'remark',
															width : 684,
															height : 30
														},
														{
															xtype : 'combobox',
															fieldLabel : '是否释放交易',
															name : 'rewriteTrans',
															id : 'rewriteTrans',
															itemId : 'rewriteTrans',
															queryMode : 'local',
															displayField : 'value',
															valueField : 'key',
															store : Ext
																	.create(
																			'Ext.data.Store',
																			{
																				fields : [
																						'key',
																						'value' ],
																				data : booleanCode
																			}),
															editable : false,
															selectOnFocus : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '剩余金额(不含税)',
															name : 'balanceIncome',
															id : 'balanceIncome',
															itemId : 'balanceIncome',
															value : gridItemData
																	.get('balanceIncome'),
															hideTrigger : true,
															disabled : true
														},
														{
															xtype : 'numberfield',
															fieldLabel : '剩余税额',
															name : 'balanceTax',
															id : 'balanceTax',
															itemId : 'balanceTax',
															value : gridItemData
																	.get('balanceTax'),
															hideTrigger : true,
															disabled : true
														} ]
											},
											{
												xtype : 'toolbar',
												html : null,
												border : 0,
												bodyStyle : 'backgroundColor:#d8d8d8;backgroundImage: -webkit-linear-gradient(top,#e6e6e6,#efefef);',
												layout : 'column',
												items : [ {
													xtype : 'button',
													text : '',
													iconCls : "rules-icon",
													instWin : null,
													tooltip : '商品明细',
													autoShow : true, // 默认false,自动显示
													handler : function() {
														goodStore.reload()
													}
												} ]
											} ]
								} ]
							},
							autoFill : true,
							id : 'cust_data_grid',
							store : goodStore,
							selModel : {
								selType : 'checkboxmodel',
								checkOnly : true
							},
							plugins : [ Ext.create(
									'Ext.grid.plugin.CellEditing', {
										clicksToEdit : 2
									// 配置点击几次显示gird编辑器
									}) ],
							columns : cm,
							dockedItems : {
								xtype : 'jespaging',
								autoShow : true,
								store : goodStore,
								dock : 'bottom',
								displayInfo : true
							}
						} ],
						buttons : [
								{
									text : '保存并提交',
									iconCls : "save-icon",
									handler : function() {
										var dataParamList = new Array();
										// 获取数据对象
										var items = goodStore.data.items;
										for (var i = 0; i < items.length; i++) {
											var itemData = items[i].data;
											/*
											 * if (isNaN(itemData.income)) {
											 * Ext.MessageBox.alert('提示',
											 * '商品信息有误，请检查'); return; } else
											 * if (Number(itemData.income) ==
											 * 0 || Number(itemData.income) >
											 * Number(itemData.balanceIncome)) {
											 * Ext.MessageBox.alert('提示',
											 * '商品金额超出可红冲金额，请检查'); return; }
											 */
											dataParamList.push(itemData);
										}
										var bill = {};
										for ( var f in gridItemData.data) {
											bill[f] = gridItemData.get(f);
										}
										var rewriteTrans = Ext
												.getCmp('rewriteTrans').value;
										if (rewriteTrans == null) {
											Ext.MessageBox.alert('提示',
													"请选择是否释放交易");
											return;
										}
										bill["billType"] = "P";
										bill["digitizing"] = "Y";
										bill["income"] = Ext.getCmp('income').value;
										bill["tax"] = Ext.getCmp('tax').value;
										bill["remark"] = Ext.getCmp('remark').getValue();
										bill["rewriteTrans"] = rewriteTrans;
										bill["goodsList"] = dataParamList;
										// 请求后台
										Ext.MessageBox
												.confirm(
														'提示',
														'您确定要保存数据?',
														function(obj) {
															if (obj == 'yes') {
																Ext.Ajax
																		.request({
																			url : 'saveAndAuditWriteOffBill.ajax',
																			dataType : "json",
																			params : {
																				params : JSON
																						.stringify(bill),
																			},
																			// 请求成功调用函数
																			success : function(
																					response) {
																				if (response) {
																					var result = Ext
																							.decode(response.responseText);
																					Ext.MessageBox
																							.alert(
																									'提示',
																									result);
																					editBillWriteOffWin
																							.close();
																					// 提交成功后重新加载当前页
																					billStore
																							.loadPage(1);
																				}
																			}
																		});
															}
														});
									}
								}, {
									text : '关闭',
									iconCls : "close-icon",
									handler : function() {
										editBillWriteOffWin.close();
									}
								} ]
					}).show();

	Ext.Ajax.request({
		// 后台请求路径
		url : 'billEditExpire.ajax',
		// 数据类型
		dataType : "json",
		// 请求的参数
		params : {
			JsonObj : JSON.stringify(gridItemData.data)
		},
		// 请求成功调用函数
		success : function(response) {
			if (response) {
				var result = Ext.decode(response.responseText);
				if (result == "succ") {
					console.log("缓存时间延长成功");
				}
			}
		}
	});
}
