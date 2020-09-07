Ext.define("Ext.ux.vms.trader.customerConfig", {
	alias : 'Ext.ux.vms.trader.customerConfig'
})

/**
 * 动态展示grid表头及数据
 * 
 * @param status客户类型
 * @param iCm
 * @param pCm
 * @returns
 */
function onShow(status, iCm, pCm, store, dataGridId) {
	var grid = Ext.getCmp(dataGridId);
	// 如果在添加这些组件之前调用Ext.suspendLayouts方法，将不再单独执行个别组件的布
	// 局操作。添加完成后，调用Ext.resumeLayouts方法，框架将只执行一次渲染和布局操作。
	Ext.suspendLayouts();
	var cm = [];
	if (status == "I") {
		cm = iCm;
	} else if (status == "P") {
		cm = pCm;
	}
	grid.reconfigure(store, cm);// 重新添加组件
	Ext.resumeLayouts(true);
}

/**
 * 新增
 * 
 * @param store展示数据
 * @param rows展示列
 * @param currUserInstId当前用户机构
 * @returns
 */
function addFun(store, rows, currUserInstId) {
	store.add(rows);
	// 设置列不显示
	var grid = Ext.getCmp('data_grid');
//	grid.down("gridcolumn[dataIndex=ciControlRemark]").hide();
//	grid.down("gridcolumn[dataIndex=ciControlStatus]").hide();

	// 获取grid中的store数据
	var rangeData = store.getRange();
	var rowIndex = rangeData.length - 1;
	// 设置默认机构&流程数据状态&数据状态的值
	store.getAt(rowIndex).set("ciInstId", currUserInstId);
	store.getAt(rowIndex).set("instName", currUserInstId);
	store.getAt(rowIndex).set("ciSubjectProperty",
			Ext.getCmp('ciSubjectProperty').getValue());
	store.getAt(rowIndex).set("ciDataStatus", "A");
	store.getAt(rowIndex).set("ciDataSource", "M");
	// grid.getView().refresh();
}

function checkNull(itemData, subValue) {
	var msg = "";
	if (itemData.ciInstId == "") {
		msg = msg + "机构不能为空, ";
	}
	if (itemData.ciChineseName == "") {
		msg = msg + "客户中文名称不能为空, ";
	}
	if (subValue == "P") {
		if (itemData.ciTaxpayerType == "") {
			msg = msg + "客户纳税人类型不能为空, ";
		}
		if (itemData.ciDomesticBank == "") {
			msg = msg + "客户国内开户行名称不能为空, ";
		}
		if (itemData.ciDomesticAccount == "") {
			msg = msg + "客户国内开户行账号不能为空, ";
		}
		if (itemData.ciDomesticTel == "") {
			msg = msg + "客户国内电话号码不能为空, ";
		}
		if (itemData.ciDomesticAddress == "") {
			msg = msg + "客户国内地址不能为空, ";
		}
	}
	if (msg != "") {
		msg = msg + "请重新输入";
	}
	return msg;
}

/**
 * 删除
 * 
 * @param store
 * @param rows
 * @returns
 */
function removeFun(store, rows) {
	store.remove(rows);
}

// 调用后台处理缓存方法&单选
function doEditExpire(itemData) {
	if (itemData.ciId == '') {
		return;
	}
	// 获取grid的数据，传入后台保存
	Ext.Ajax.request({
		// 后台请求路径
		url : 'doEditExpire.ajax',
		// 数据类型
		dataType : "json",
		// 请求的参数
		params : {
			JsonObj : JSON.stringify(itemData)
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