Ext.require('Ext.ux.vms.trader.customerConfig');

Ext.define("Ext.ux.vms.trans.createBill", {
    alias : 'Ext.ux.vms.trans.createBill'
})

// 拆分开票
function toSplitBill(createBillStore, seledGridPanel, nameStore, invoiceTypeMapList, ciCustomerStatusFilter, transFields) {
    // var digitizing = Ext.getCmp('DIGITIZING').getValue();
    // if(digitizing == null){
    // Ext.MessageBox.alert("提示","请选择是否是电子发票！");
    // return;
    // }
    // 选中的交易
    var gridItemData = seledGridPanel[0].data;
    // 选中的交易发票类型
    var invoiceType = gridItemData.INVOICE_TYPE;
    // 获取客户类型
    var ciSubjectProperty = gridItemData.CI_SUBJECT_PROPERTY;
    // 控制发票类型的下拉选项
    var invoiceTypeCombox = [];
    for (var i = 1; i < invoiceTypeMapList.length; i++) {
	invoiceTypeCombox.push(invoiceTypeMapList[i]);
    }

    var fds = transFields;
    fds.push("ciIdentityCode");

    var billStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	fields : fds
    });

    // 新增的动态行
    var rows = new Object();
    rows = Ext.apply(rows, gridItemData);
    var CI_TAX_NO = gridItemData.CI_TAX_NO;
    var CI_P_ID_CARD = gridItemData.CI_P_ID_CARD;
    var CI_IDENTITY_CODE = null != CI_TAX_NO || CI_TAX_NO != '' ? CI_TAX_NO : CI_P_ID_CARD;
    rows.ciIdentityCode = CI_IDENTITY_CODE;
    rows.BALANCE_CNY = 0;
    rows.INVOICE_TYPE = '';

    // 固定的columns
    var cm = [ {
	header : '序号',
	xtype : 'rownumberer',
	width : 40,
	align : 'center'
    }, {
	text : '开票方名称',
	dataIndex : 'CI_CHINESE_NAME',
	align : 'center',
	width : 80,
	editor : new Ext.form.field.ComboBox({
	    labelAlign : 'right',
	    name : "CI_CHINESE_NAME",
	    minChars : 2,// minchars 在键入1个字符之前，什么都不会发生,如果不可编辑则此值无效
	    store : nameStore,
	    triggerAction : "all", // 请设置为"all",否则默认为"query"的情况下，你选择某个值后，再此下拉时，只出现匹配选项，如果设为"all"的话，每次下拉均显示全部选项
	    mode : "local", // 'local'：指定数据源为本地数据源，如果是本地创建的数据源，该属性也是必须的，如果数据源来自于服务器，设置为'remote'表示数据源来自于服务器
	    queryParam : "params",// 查询时传递的名字（默认为'query'）
	    valueField : "CI_CHINESE_NAME",
	    displayField : "CI_CHINESE_NAME",
	    selectOnFocus : true, // 值为 ture 时表示字段获取焦点时自动选择字段既有文本(默认为false)
	    typeAhead : true,
	    typeAheadDelay : 0, // 延时显示下拉框第一列
	    editable : true, // 可以编辑
	    hideTrigger : true,// 隐藏文本框后面的倒三角
	    queryDelay : 1000,
	    listeners : {
		'beforequery' : function(_query, _oEpts) {
		    if (_query.query.length < 2) {
			return;
		    }
		    var params = {};
		    params["ciChineseName"] = _query.query;
		    params["ciCustomerStatusFilter"] = ciCustomerStatusFilter;
		    _query.query = JSON.stringify(params);

		},
		'select' : function(combo, records, eOpts) {
		    var j = Ext.getCmp('bill_data_grid').getSelectionModel().getSelection()[0];
		    j.data.BILL_CUSTOMER_ID = records[0].data.CI_ID;
		    j.data.ciIdentityCode = records[0].data.ciIdentityCode;
		    for ( var f in j.data) {
			if (f.substr(0, 3) == 'CI_') {
			    j.data[f] = records[0].data[f];
			}
		    }
		    j.commit();
		},
		'blur' : function(combo, records, eOpts) {
		    var j = Ext.getCmp('bill_data_grid').getSelectionModel().getSelection()[0];
		    if (null == j.data.BILL_CUSTOMER_ID || j.data.BILL_CUSTOMER_ID == '') {
			var map = invoiceTypeCombox[0];
			j.data.INVOICE_TYPE = map.key;
			j.data.INVOICE_TYPE_NAME = map.value;
			j.commit();
		    }
		},
		'change' : function() {
		    var j = Ext.getCmp('bill_data_grid').getSelectionModel().getSelection()[0];
		    j.data.BILL_CUSTOMER_ID = '';
		    var chineseName = j.data.CI_CHINESE_NAME;
		    for ( var f in j.data) {
			if (f.substr(0, 3) == 'CI_') {
			    j.data[f] = '';
			}
		    }
		    j.data.ciIdentityCode = '';
		    j.data.CI_CHINESE_NAME = chineseName
		    j.commit();
		}
	    }
	})
    }, {
	text : '开票方客户号',
	dataIndex : 'BILL_CUSTOMER_ID',
	align : 'center',
	width : 180,
	hidden : true
    }, {
	text : '开票方税号/身份证号',
	dataIndex : 'ciIdentityCode',
	align : 'center',
	width : 180,
	editor : new Ext.form.field.ComboBox({
	    labelAlign : 'right',
	    name : "ciIdentityCode",
	    minChars : 2,// minchars
	    // 在键入1个字符之前，什么都不会发生,如果不可编辑则此值无效
	    store : nameStore,
	    triggerAction : "all", // 请设置为"all",否则默认为"query"的情况下，你选择某个值后，再此下拉时，只出现匹配选项，如果设为"all"的话，每次下拉均显示全部选项
	    mode : "local", // 'local'：指定数据源为本地数据源，如果是本地创建的数据源，该属性也是必须的，如果数据源来自于服务器，设置为'remote'表示数据源来自于服务器
	    queryParam : "params",// 查询时传递的名字（默认为
	    // 'query'）
	    valueField : "ciIdentityCode",
	    displayField : "ciIdentityCode",
	    selectOnFocus : true, // 值为 ture
	    // 时表示字段获取焦点时自动选择字段既有文本(默认为false)
	    typeAhead : true,
	    typeAheadDelay : 0, // 延时显示下拉框第一列
	    editable : true, // 可以编辑
	    hideTrigger : true,// 隐藏文本框后面的倒三角
	    queryDelay : 1000,
	    listeners : {
		'beforequery' : function(_query, _oEpts) {
		    if (_query.query.length < 2) {
			return;
		    }
		    var params = {};
		    params["ciIdentityCode"] = _query.query;
		    params["ciCustomerStatusFilter"] = ciCustomerStatusFilter;
		    _query.query = JSON.stringify(params);

		},
		'select' : function(combo, records, eOpts) {
		    var j = Ext.getCmp('bill_data_grid').getSelectionModel().getSelection()[0];
		    j.data.BILL_CUSTOMER_ID = records[0].data.CI_ID;
		    for ( var f in j.data) {
			if (f.substr(0, 3) == 'CI_') {
			    j.data[f] = records[0].data[f];
			}
		    }
		    j.commit();
		},
		'blur' : function(combo, records, eOpts) {
		    var j = Ext.getCmp('bill_data_grid').getSelectionModel().getSelection()[0];
		    if (null == j.data.CI_CHINESE_NAME || j.data.CI_CHINESE_NAME == '') {
			j.data.INVOICE_TYPE = '';
			j.data.INVOICE_TYPE_NAME = '';
			j.commit();
		    }
		},
		'focus' : function() {
		    var j = Ext.getCmp('bill_data_grid').getSelectionModel().getSelection()[0];
		    for ( var f in j.data) {
			if (f.substr(0, 3) == 'CI_') {
			    j.data[f] = '';
			}
		    }
		    j.commit();
		}
	    }
	})
    }, {
	text : 'INVOICE_TYPE',
	dataIndex : 'INVOICE_TYPE',
	align : 'center',
	width : 80,
	hidden : true
    }, {
	text : 'CI_TAX_NO',
	dataIndex : 'CI_TAX_NO',
	align : 'center',
	width : 80,
	hidden : true
    }, {
	text : '发票类型',
	dataIndex : 'INVOICE_TYPE_NAME',
	align : 'center',
	width : 80,
	editor : new Ext.form.field.ComboBox({
	    id : invoiceType,
	    typeAhead : true,
	    triggerAction : 'all',
	    displayField : 'value',
	    valueField : 'value',
	    editable : false,
	    selectOnFocus : true,
	    store : Ext.create('Ext.data.Store', {
		fields : [ 'key', 'value' ],
		data : invoiceTypeCombox
	    }),
	    listeners : {
		'select' : function(combo, records, eOpts) {
		    var j = Ext.getCmp('bill_data_grid').getSelectionModel().getSelection()[0];
		    j.data.INVOICE_TYPE = records[0].data.key;
		    j.commit();
		},
		'focus' : function() {
		    var _store = this.store;
		    var grid = Ext.getCmp('bill_data_grid').getSelectionModel().getSelection()[0].data;
		    if (grid.BILL_CUSTOMER_ID == '' || null == grid.BILL_CUSTOMER_ID) {
			var data = invoiceTypeCombox[0];
			_store.loadData(data);
		    } else if (grid.CI_CHINESE_NAME == '' || null == grid.CI_CHINESE_NAME) {
			var data = [];
			_store.loadData(data);
		    } else {
			_store.loadData(invoiceTypeCombox);
		    }
		},
		'blur' : function() {
		    var _store = this.store;
		    _store.loadData(invoiceTypeCombox);
		}
	    }
	})
    }, {
	text : 'TAX_BALANCE_CNY',
	dataIndex : 'TAX_BALANCE_CNY',
	align : 'center',
	width : 80,
	hidden : true
    }, {
	text : 'TAX_RATE',
	dataIndex : 'TAX_RATE',
	align : 'center',
	width : 80,
	hidden : true
    }, {
	text : '开票金额(含税)',
	dataIndex : 'BALANCE_CNY',
	align : 'center',
	width : 100,
	editor : {
	    xtype : 'numberfield',
	    minValue : 0,
	    hideTrigger : true,
	    listeners : {
		'change' : function(_this, newValue, oldValue, eOpts) {
		    if (null == newValue || newValue == '') {
			newValue = 0;
		    }
		    var input = Number(newValue);
		    var j = Ext.getCmp('bill_data_grid').getSelectionModel().getSelection()[0];
		    if (isNaN(input)) {
			input = 0;
		    }
		    j.data.BALANCE_CNY = input;
		    var splittedTotal = 0;
		    var items = billStore.data.items;
		    for (var i = 0; i < items.length; i++) {
			var itemData = items[i].data;
			var itemBalance = Number(itemData.BALANCE_CNY);
			splittedTotal += itemBalance;
		    }
		    // 获取剩余未开票金额
		    var balanceCny = Ext.getCmp('BALANCE_CNY').value;
		    // 更改剩余金额的值
		    var moneySy = balanceCny - splittedTotal;
		    Ext.getCmp('moneySy').setValue(moneySy);
		    // 算税额
		    var rate = Number(j.data.TAX_RATE);
		    var tax = (input - input / (1 + rate)).toFixed(2);
		    j.data.TAX_BALANCE_CNY = tax;
		    j.commit();
		}
	    }
	}
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
		grid.getStore().removeAt(rowIndex);
		Ext.getCmp('bill_data_grid').getView().refresh();
		var splittedTotal = 0;
		var items = billStore.data.items;
		for (var i = 0; i < items.length; i++) {
		    var itemData = items[i].data;
		    var itemBalance = Number(itemData.BALANCE_CNY);
		    splittedTotal += itemBalance;
		}
		// 获取剩余未开票金额
		var balanceCny = Ext.getCmp('BALANCE_CNY').value;
		// 更改剩余金额的值
		var moneySy = balanceCny - splittedTotal;
		Ext.getCmp('moneySy').setValue(moneySy);
		return;
	    }

	} ]
    } ];

    // 打开二级窗口
    var billWindow = Ext.create('Ext.window.Window', {
	modal : true,// 设置是否添加遮罩
	draggable : true,// 拖动
	autoScroll : true,
	constrainHeader : true,
	width : 800,
	height : 400,
	title : '拆分开票',
	layout : 'fit',
	items : [ {
	    xtype : 'gridpanel',
	    layout : 'fit',
	    tbar : {
		xtype : 'container',
		items : [ {
		    xtype : 'form',
		    items : [ {
			xtype : 'toolbar',
			layout : 'column',
			border : 0,
			items : [ {
			    xtype : 'numberfield',
			    fieldLabel : '剩余未开票金额(含税)',
			    name : 'BALANCE_CNY',
			    id : 'BALANCE_CNY',
			    itemId : 'BALANCE_CNY',
			    value : gridItemData.BALANCE_CNY,
			    hideTrigger : true,
			    disabled : true
			}, {
			    xtype : 'numberfield',
			    fieldLabel : '剩余金额(含税)',
			    name : 'moneySy',
			    id : 'moneySy',
			    itemId : 'moneySy',
			    value : gridItemData.BALANCE_CNY,
			    hideTrigger : true,
			    disabled : true
			} ]
		    }, {
			xtype : 'toolbar',
			html : null,
			border : 0,
			bodyStyle : 'backgroundColor:#d8d8d8;backgroundImage: -webkit-linear-gradient(top,#e6e6e6,#efefef);',
			layout : 'column',
			items : [ {
			    xtype : 'button',
			    text : '',
			    iconCls : "add-icon",
			    instWin : null,
			    tooltip : '添加',
			    autoShow : true, // 默认false,自动显示
			    handler : function() {
				billStore.add(rows);
			    }
			} ]
		    } ]
		} ]
	    },
	    id : 'bill_data_grid',
	    store : billStore,
	    selModel : {
		mode : 'SINGLE'
	    },
	    plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit : 2
	    // 配置点击几次显示gird编辑器
	    }) ],
	    columns : cm
	} ],
	buttons : [ {
	    text : '开票',
	    iconCls : "save-icon",
	    handler : function() {
		if (Ext.getCmp('moneySy').value < 0) {
		    Ext.MessageBox.alert('提示', '开票金额已大于交易发生额，请确认');
		    return;
		}
		// 获取添加好的数据
		var dataParamList = new Array();
		// 获取数据对象
		var items = billStore.data.items;
		for (var i = 0; i < items.length; i++) {
		    var itemsData = items[i].data;
		    if ((null == itemsData.BILL_CUSTOMER_ID || itemsData.BILL_CUSTOMER_ID == '' || itemsData.CI_SUBJECT_PROPERTY == 'I') && itemsData.INVOICE_TYPE == 'Z') {
			Ext.MessageBox.alert('提示', '无法对个人用户，或尚未录入系统的企业开具专用发票，请确认');
			return;
		    } else if (null == itemsData.INVOICE_TYPE || itemsData.INVOICE_TYPE == '' || null == itemsData.CI_CHINESE_NAME || itemsData.CI_CHINESE_NAME == '') {
			Ext.MessageBox.alert('提示', '发票信息不全，请确认');
			return;
		    } else if (itemsData.BALANCE_CNY == 0 || null == itemsData.BALANCE_CNY || itemsData.BALANCE_CNY == '') {
			Ext.MessageBox.alert('提示', '开票金额不正确，请确认');
			return;
		    }
		    dataParamList.push(itemsData);
		}
		if (dataParamList.length == 0) {
		    Ext.MessageBox.alert('提示', '请新增需要开票的数据');
		    return;
		}
		// 请求后台
		Ext.MessageBox.confirm('提示', '您确定要保存数据?', function(obj) {
		    if (obj == 'yes') {
			Ext.Ajax.request({
			    url : 'toSplitBill.ajax',
			    dataType : "json",
			    params : {
				transList : JSON.stringify(dataParamList)
			    // ,digital:digitizing
			    },
			    // 请求成功调用函数
			    success : function(response) {
				if (response) {
				    var result = Ext.decode(response.responseText);
				    Ext.MessageBox.alert('提示', result);
				    billWindow.close();
				    // 提交成功后重新加载当前页
				    createBillStore.loadPage(1);
				}
			    }
			});
		    }
		});
	    }
	}, {
	    text : '取消',
	    iconCls : "close-icon",
	    handler : function() {
		billWindow.close();
	    }
	} ]
    }).show();
}

// 变更开票方
function changeBillCust(subMapList, vmsTaxpayerType, conStatusMapList, dataStatusMapList, dataSourceMapList, ciCustomerStatusFilter, createBillStore, custFields) {
    // 获取选中的交易数据
    var seledGridTrans = Ext.getCmp('data_grid').getSelectionModel().getSelection();
    /*
     * if(seledGridTrans.length == 0){
     * Ext.MessageBox.alert("提示","请选择需要变更开票方的交易！"); return; }
     */
    // 设置进入页面的默认值
    var pageType = null;

    var deCamelField = [];

    custFields.forEach(function(field, i) {
	var deCamel = '';
	var fragment = field.split('_');
	fragment.forEach(function(fra, index) {
	    if (index == 0) {
		fra = fra.toLowerCase();
		deCamel += fra;
	    } else {
		var f = fra.substr(0, 1);
		var left = fra.substr(1, fra.length);
		left = left.toLowerCase();
		deCamel += f + left;
	    }
	});
	deCamelField[i] = deCamel;
    });

    var nameStore = Ext.create('Ext.data.Store', {
	fields : [ 'ciChineseName' ],
	proxy : {
	    type : 'ajax',
	    url : 'fetchCustByObject.ajax',
	    reader : {
		type : 'json',
		root : 'dataList',
		totalProperty : 'total'
	    }
	},
    });
    var taxNoStore = Ext.create('Ext.data.Store', {
	fields : [ 'ciTaxNo' ],
	proxy : {
	    type : 'ajax',
	    url : 'fetchCustByObject.ajax',
	    reader : {
		type : 'json',
		root : 'dataList',
		totalProperty : 'total'
	    }
	},
    });
    // 身份证号
    var pIdCardStore = Ext.create('Ext.data.Store', {
	fields : [ 'ciPIdCard' ],
	proxy : {
	    type : 'ajax',
	    url : 'fetchCustByObject.ajax',
	    reader : {
		type : 'json',
		root : 'dataList',
		totalProperty : 'total'
	    }
	},
    });
    var instNameStore = Ext.create('Ext.data.Store', {
	fields : [ 'instId', 'instName' ],
	proxy : {
	    type : 'ajax',
	    url : 'fetch10byInstName.ajax',
	    reader : {
		type : 'json',
		root : 'dataList',
		totalProperty : 'total'
	    }
	},
    });

    var pCm = [ {
	header : '序号',
	xtype : 'rownumberer',
	width : 50,
	align : 'center'
    }, {
	text : 'id',
	dataIndex : 'ciId',
	align : 'center',
	hidden : true
    }, {
	text : '客户号',
	dataIndex : 'ciCustomerId',
	align : 'center',
	hidden : true
    }, {
	text : '客户税号',
	dataIndex : 'ciTaxNo',
	align : 'center',
	width : 70
    }, {
	text : '客户中文名称',
	dataIndex : 'ciChineseName',
	align : 'center',
	width : 100
    }, {
	text : '客户英文名称',
	dataIndex : 'ciForeignName',
	align : 'center',
	width : 120
    }, {
	text : '客户国内开户行名称',
	dataIndex : 'ciDomesticBank',
	align : 'center',
	width : 130
    }, {
	text : '客户国内开户行账号',
	dataIndex : 'ciDomesticAccount',
	align : 'center',
	width : 130
    }, {
	text : '客户国内电话号码',
	dataIndex : 'ciDomesticTel',
	align : 'center',
	width : 120
    }, {
	text : '客户国内地址',
	dataIndex : 'ciDomesticAddress',
	align : 'center',
	width : 100
    }, {
	text : '客户联系人姓名',
	dataIndex : 'ciContactName',
	align : 'center',
	width : 110
    }, {
	text : '客户联系人电话',
	dataIndex : 'ciContactTel',
	align : 'center',
	width : 110
    }, {
	text : '客户联系人地址',
	dataIndex : 'ciContactAddress',
	align : 'center',
	width : 110
    }, {
	text : '客户纳税人类型',
	dataIndex : 'ciTaxpayerType',
	align : 'center',
	width : 110,
	renderer : function(value) {
	    if (value == "") {
		return value;
	    } else {
		for ( var i in vmsTaxpayerType) {
		    if (value == vmsTaxpayerType[i].key) {
			return value = vmsTaxpayerType[i].value;
		    }
		}
	    }
	}
    }, {
	text : '客户法人名称',
	dataIndex : 'ciCLegalPerson',
	align : 'center',
	width : 90
    }, {
	text : '客户主体类型',
	dataIndex : 'ciSubjectProperty',
	align : 'center',
	width : 110,
	renderer : function(value) {
	    if (value == "") {
		return value;
	    } else {
		for ( var i in subMapList) {
		    if (value == subMapList[i].key) {
			return value = subMapList[i].value;
		    }
		}
	    }
	}
    }, {
	text : '客户国籍',
	dataIndex : 'ciNationality',
	align : 'center',
	hidden : true
    }, {
	text : '客户身份证号',
	dataIndex : 'ciPIdCard',
	align : 'center',
	hidden : true
    }, {
	text : '所属机构',
	dataIndex : 'ciInstId',
	align : 'center',
	width : 80,
	hidden : true
    }, {
	text : '机构名称',
	dataIndex : 'instName',
	align : 'center',
	width : 120
    }, {
	text : '流程数据状态',
	dataIndex : 'ciControlStatus',
	align : 'center',
	width : 100,
	renderer : function(value) {
	    if (value == "") {
		return value;
	    } else {
		for ( var i in conStatusMapList) {
		    if (value == conStatusMapList[i].key) {
			return value = conStatusMapList[i].value;
		    }
		}
	    }
	}
    }, {
	text : '数据状态',
	dataIndex : 'ciDataStatus',
	align : 'center',
	width : 80,
	renderer : function(value) {
	    if (value == "") {
		return value;
	    } else {
		for ( var i in dataStatusMapList) {
		    if (value == dataStatusMapList[i].key) {
			return value = dataStatusMapList[i].value;
		    }
		}
	    }
	}
    }, {
	text : '数据来源',
	dataIndex : 'ciDataSource',
	align : 'center',
	width : 80,
	hidden : true,
	renderer : function(value) {
	    if (value == "") {
		return value;
	    } else {
		for ( var i in dataSourceMapList) {
		    if (value == dataSourceMapList[i].key) {
			return value = dataSourceMapList[i].value;
		    }
		}
	    }
	}
    } ];
    var iCm = [ {
	header : '序号',
	xtype : 'rownumberer',
	width : 50,
	align : 'center'
    }, {
	text : 'id',
	dataIndex : 'ciId',
	align : 'center',
	hidden : true
    }, {
	text : '客户号',
	dataIndex : 'ciCustomerId',
	align : 'center',
	hidden : true
    }, {
	text : '客户税号',
	dataIndex : 'ciTaxNo',
	align : 'center',
	hidden : true
    }, {
	text : '客户中文名称',
	dataIndex : 'ciChineseName',
	align : 'center',
	width : 100
    }, {
	text : '客户英文名称',
	dataIndex : 'ciForeignName',
	align : 'center',
	width : 120
    }, {
	text : '客户国内开户行名称',
	dataIndex : 'ciDomesticBank',
	align : 'center',
	hidden : true
    }, {
	text : '客户国内开户行账号',
	dataIndex : 'ciDomesticAccount',
	align : 'center',
	hidden : true
    }, {
	text : '客户国内电话号码',
	dataIndex : 'ciDomesticTel',
	align : 'center',
	width : 120
    }, {
	text : '客户国内地址',
	dataIndex : 'ciDomesticAddress',
	align : 'center',
	width : 100
    }, {
	text : '客户联系人姓名',
	dataIndex : 'ciContactName',
	align : 'center',
	width : 110
    }, {
	text : '客户联系人电话',
	dataIndex : 'ciContactTel',
	align : 'center',
	width : 110
    }, {
	text : '客户联系人地址',
	dataIndex : 'ciContactAddress',
	align : 'center',
	width : 110
    }, {
	text : '客户纳税人类型',
	dataIndex : 'ciTaxpayerType',
	align : 'center',
	hidden : true
    }, {
	text : '客户法人名称',
	dataIndex : 'ciCLegalPerson',
	align : 'center',
	hidden : true
    }, {
	text : '客户主体类型',
	dataIndex : 'ciSubjectProperty',
	align : 'center',
	hidden : true
    }, {
	text : '客户国籍',
	dataIndex : 'ciNationality',
	align : 'center',
	width : 80
    }, {
	text : '客户身份证号',
	dataIndex : 'ciPIdCard',
	align : 'center',
	width : 90
    }, {
	text : '所属机构',
	dataIndex : 'ciInstId',
	align : 'center',
	width : 80,
	hidden : true
    }, {
	text : '机构名称',
	dataIndex : 'instName',
	align : 'center',
	width : 120
    }, {
	text : '流程数据状态',
	dataIndex : 'ciControlStatus',
	align : 'center',
	width : 100,
	renderer : function(value) {
	    if (value == "") {
		return value;
	    } else {
		for ( var i in conStatusMapList) {
		    if (value == conStatusMapList[i].key) {
			return value = conStatusMapList[i].value;
		    }
		}
	    }
	}
    }, {
	text : '数据状态',
	dataIndex : 'ciDataStatus',
	align : 'center',
	width : 80,
	renderer : function(value) {
	    if (value == "") {
		return value;
	    } else {
		for ( var i in dataStatusMapList) {
		    if (value == dataStatusMapList[i].key) {
			return value = dataStatusMapList[i].value;
		    }
		}
	    }
	}
    }, {
	text : '数据来源',
	dataIndex : 'ciDataSource',
	align : 'center',
	width : 80,
	hidden : true,
	renderer : function(value) {
	    if (value == "") {
		return value;
	    } else {
		for ( var i in dataSourceMapList) {
		    if (value == dataSourceMapList[i].key) {
			return value = dataSourceMapList[i].value;
		    }
		}
	    }
	}
    } ];

    var custStore = Ext.create("Ext.data.Store", {
	fields : deCamelField,
	proxy : {
	    type : 'ajax',
	    url : 'queryCustomer.ajax',
	    reader : {
		type : 'json',
		root : 'dataList',
		totalProperty : 'total'
	    }
	},
	autoLoad : true,
	listeners : {
	    load : function(store, records, options) {
		var status = Ext.getCmp('ciSubjectProperty').value;
		onShow(status, iCm, pCm, store, 'cust_data_grid');
		isLarge(store, "largeData2");
	    }
	}
    });
    // 打开二级窗口
    var updateCustWindow = Ext.create('Ext.window.Window', {
	width : 800,
	modal : true,// 设置是否添加遮罩
	draggable : true,// 拖动
	resizable : true, // 变大小
	autoScroll : true,
	constrainHeader : true,
	layout : 'fit',
	title : '变更开票方',
	items : [ {
	    xtype : 'gridpanel',
	    layout : 'fit',
	    tbar : {
		xtype : 'container',
		items : [ {
		    xtype : 'form',
		    items : [ {
			xtype : 'toolbar',
			layout : 'column',
			border : 0,
			items : [ {
			    xtype : 'combobox',
			    fieldLabel : '客户名称',
			    labelAlign : 'right',
			    name : "ciChineseName",
			    minChars : 2,
			    store : nameStore,
			    triggerAction : "all",
			    mode : "local",
			    queryParam : "params",
			    valueField : "ciChineseName",
			    displayField : "ciChineseName",
			    selectOnFocus : true,
			    typeAhead : true,
			    typeAheadDelay : 0,
			    editable : true,
			    hideTrigger : true,
			    queryDelay : 1000,
			    renderTo : document.body,
			    listeners : {
				'beforequery' : function(_query, _oEpts) {
				    if (_query.query.length < 2) {
					return;
				    }
				    var params = {};
				    params["ciChineseName"] = _query.query;
				    var ciSubjectProperty = Ext.getCmp('ciSubjectProperty').getValue();
				    params["ciSubjectProperty"] = ciSubjectProperty;
				    params["ciCustomerStatusFilter"] = ciCustomerStatusFilter;
				    _query.query = JSON.stringify(params);

				}
			    }
			}, {
			    xtype : 'combobox',
			    fieldLabel : '客户主体类型',
			    name : 'ciSubjectProperty',
			    id : 'ciSubjectProperty',
			    labelAlign : 'right',
			    queryMode : 'local',
			    displayField : 'value',
			    valueField : 'key',
			    editable : false,
			    selectOnFocus : true,
			    store : Ext.create('Ext.data.Store', {
				fields : [ 'key', 'value' ],
				data : subMapList
			    }),
			    value : subMapList[0].key,
			    listeners : {
				'render' : function(combo, eOpts) {
				    // 重新加载store
				    var params = {};
				    params["ciSubjectProperty"] = subMapList[0].key;
				    params["ciCustomerStatusFilter"] = JSON.stringify(ciCustomerStatusFilter);
				    custStore.proxy.extraParams = params;
				    // 设置查询条件的显示隐藏
				    if (combo.getValue() == 'P') {
					Ext.getCmp('ciTaxNo').setDisabled(false);
					Ext.getCmp('ciPIdCard').setDisabled(true);
				    } else {
					Ext.getCmp('ciPIdCard').setDisabled(false);
					Ext.getCmp('ciTaxNo').setDisabled(true);
				    }
				},
				'change' : function(combox, record, index) {
				    // 重新加载store
				    var params = {};
				    params["ciSubjectProperty"] = combox.getValue();
				    params["ciCustomerStatusFilter"] = JSON.stringify(ciCustomerStatusFilter);
				    custStore.proxy.extraParams = params;
				    custStore.loadPage(1);
				    if (combox.getValue() == 'P') {
					Ext.getCmp('ciTaxNo').setDisabled(false);
					Ext.getCmp('ciPIdCard').setDisabled(true);
				    } else {
					Ext.getCmp('ciPIdCard').setDisabled(false);
					Ext.getCmp('ciTaxNo').setDisabled(true);
				    }
				}
			    }
			}, {
			    xtype : 'combobox',
			    fieldLabel : '客户税号',
			    labelAlign : 'right',
			    id : 'ciTaxNo',
			    name : "ciTaxNo",
			    minChars : 2,
			    store : taxNoStore,
			    triggerAction : "all", // 请设置为"all",否则默认为"query"的情况下，你选择某个值后，再此下拉时，只出现匹配选项，如果设为"all"的话，每次下拉均显示全部选项
			    mode : "local", // 'local'：指定数据源为本地数据源，如果是本地创建的数据源，该属性也是必须的，如果数据源来自于服务器，设置为'remote'表示数据源来自于服务器
			    queryParam : "params",// 查询时传递的名字（默认为
			    // 'query'）
			    valueField : "ciTaxNo",
			    displayField : "ciTaxNo",
			    selectOnFocus : true,
			    typeAhead : true,
			    typeAheadDelay : 0, // 延时显示下拉框第一列
			    editable : true, // 可以编辑
			    hideTrigger : true,// 隐藏文本框后面的倒三角
			    queryDelay : 1000,
			    renderTo : document.body,
			    listeners : {
				'beforequery' : function(_query, _oEpts) {
				    if (_query.query.length < 2) {
					return;
				    }
				    var params = {};
				    params["ciTaxNo"] = _query.query;
				    var ciSubjectProperty = Ext.getCmp('ciSubjectProperty').getValue();
				    params["ciSubjectProperty"] = ciSubjectProperty;
				    params["ciCustomerStatusFilter"] = ciCustomerStatusFilter;
				    _query.query = JSON.stringify(params);

				}
			    }
			}, {
			    xtype : 'combobox',
			    fieldLabel : '客户身份证号',
			    id : 'ciPIdCard',
			    name : 'ciPIdCard',
			    labelAlign : 'right',
			    hideTrigger : true,
			    minChars : 2,
			    store : pIdCardStore,
			    triggerAction : "all",
			    mode : "local",
			    queryParam : "params",
			    valueField : "ciPIdCard",
			    displayField : "ciPIdCard",
			    selectOnFocus : true,
			    typeAhead : true,
			    typeAheadDelay : 0,
			    editable : true,
			    hideTrigger : true,
			    queryDelay : 1000,
			    renderTo : document.body,
			    listeners : {
				'beforequery' : function(_query, _oEpts) {
				    if (_query.query.length < 2) {
					return;
				    }
				    var params = {};
				    params["ciPIdCard"] = _query.query;
				    var ciSubjectProperty = Ext.getCmp('ciSubjectProperty').getValue();
				    params["ciSubjectProperty"] = ciSubjectProperty;
				    params["ciCustomerStatusFilter"] = ciCustomerStatusFilter;
				    _query.query = JSON.stringify(params);

				}
			    }
			}, {
			    xtype : 'combobox',
			    fieldLabel : '机构',
			    labelAlign : 'right',
			    name : "ciInstId",
			    id : "INST_ID",
			    minChars : 2,
			    store : instNameStore,
			    triggerAction : "all",
			    mode : "local",
			    queryParam : "instName",
			    valueField : "instId",
			    displayField : "instName",
			    selectOnFocus : true,
			    typeAhead : true,
			    typeAheadDelay : 0,
			    editable : true,
			    hideTrigger : true,
			    queryDelay : 1000,
			    renderTo : document.body
			}, {
			    text : '查询',
			    iconCls : "search-icon",
			    handler : function(me) {
				var params = custStore.proxy.extraParams;
				var fs = Ext.ComponentQuery.query('textfield', me.up('toolbar'));
				for ( var i in fs) {
				    params[fs[i].name] = fs[i].getValue();
				}
				custStore.proxy.extraParams = params;
				custStore.loadPage(1);
				var seledData = Ext.getCmp('data_grid').getSelectionModel().getSelection();
				if (seledData.length > 0) {
				    pageType = 'query';
				}

			    }
			}, {
			    xtype : 'button',
			    text : '重置',
			    iconCls : "rules-icon",
			    instWin : null,
			    handler : function(me) {
				me.up('form').getForm().reset();
			    }
			}, {
			    text : '提示',
			    xtype : 'textfield',
			    id : 'largeData2',
			    name : 'largeData',
			    align : 'center',
			    width : 350,
			    fieldStyle : 'color:red;font-weight:bold',// 改变字体颜色
			    // 加粗
			    disabled : true,
			    hidden : true
			} ]
		    } ]
		} ]
	    },
	    autoFill : true,
	    id : 'cust_data_grid',
	    store : custStore,
	    selModel : {
		selType : 'checkboxmodel',
		mode : 'SINGLE',
		checkOnly : true
	    },
	    plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit : 2
	    // 配置点击几次显示gird编辑器
	    }) ],
	    columns : [],
	    dockedItems : {
		xtype : 'jespaging',
		autoShow : true,
		store : custStore,
		dock : 'bottom',
		displayInfo : true
	    }
	} ],
	buttons : [ {
	    text : '保存',
	    iconCls : "save-icon",
	    handler : function() {
		// 获取选中的客户数据
		var seledGridCust = Ext.getCmp('cust_data_grid').getSelectionModel().getSelection();
		if (seledGridCust.length == 0) {
		    Ext.MessageBox.alert('提示', '请选择变更开票方');
		    return;
		}
		// 获取grid的数据，传入后台保存
		var dataParamList = new Array();
		for (var i = 0; i < seledGridTrans.length; i++) {
		    var itemsData = seledGridTrans[i].data;
		    dataParamList.push(itemsData);
		}
		// 请求后台
		Ext.MessageBox.confirm('提示', '您确定要保存数据?', function(obj) {
		    if (obj == 'yes') {
			Ext.Ajax.request({
			    url : 'changeBillCust.ajax',
			    dataType : "json",
			    params : {
				transList : JSON.stringify(dataParamList),
				cust : JSON.stringify(seledGridCust[0].data)
			    },
			    // 请求成功调用函数
			    success : function(response) {
				if (response) {
				    var result = Ext.decode(response.responseText);
				    Ext.MessageBox.alert('提示', result);
				    updateCustWindow.close();
				    // 提交成功后重新加载当前页
				    createBillStore.loadPage(1);
				}
			    }
			});
		    }
		});
	    }
	}, {
	    text : '取消',
	    iconCls : "close-icon",
	    handler : function() {
		updateCustWindow.close();
	    }
	} ]
    }).show();
}