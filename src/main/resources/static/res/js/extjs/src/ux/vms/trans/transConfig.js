Ext.define("Ext.ux.vms.trans.transConfig", {
	alias : 'Ext.ux.vms.trans.transConfig'
})

/**
 * 新增
 * 
 * @param store展示数据
 * @param rows展示列
 * @returns
 */
function addRow(store, rows) {
	store.add(rows);
	// 设置列不显示
//	var grid = Ext.getCmp('data_grid');
//	grid.down("gridcolumn[dataIndex=CONTROL_REMARK]").hide();
//	grid.down("gridcolumn[dataIndex=CONTROL_STATUS]").hide();
	// 获取grid中的store数据
	var rangeData = store.getRange();
	var rowIndex = rangeData.length - 1;
	store.getAt(rowIndex).set("DATA_STATUS", "A");
	store.getAt(rowIndex).set("TRANS_DATE",
			Ext.util.Format.date(new Date(),'Y-m-d G:i:s'));
}

function checkNull(itemData){
	var msg = "";
	if(itemData.TRANS_TYPE == ""){
		msg = "交易类型为空, ";
	}
	if(itemData.TRANS_DATE == ""){
		msg = msg +"交易日期为空, ";
	}
	if(itemData.BILL_CUSTOMER_ID == ""){
		msg = msg +"开票客户号为空, ";
	}
	if(itemData.INST_ID == ""){
		msg = msg +"机构为空, ";
	}
	if(itemData.TAX_INCLUDED == ""){
		msg = msg +"是否含税为空, ";
	}
	if(itemData.TRANS_TYPE == ""){
		msg = msg +"交易类型为空, ";
	}
	if(itemData.AMT_CNY == ""){
		msg = msg +"交易金额为空, ";
	}
	if(itemData.INVOICE_TYPE == ""){
		msg = msg +"发票类型为空, ";
	}
	if(itemData.DIGITIZING == ""){
		msg = msg +"是否电子发票类型为空, ";
	}
	if(msg !=""){
		msg =msg+"请重新输入";
	}
	return msg;
}
// 调用后台处理缓存方法&单选
function transDoEditExpire() {
	// 获取当前选中数据
	var seledGrid = Ext.getCmp('data_grid').getSelectionModel().getSelection();
	if (seledGrid.length == 0) {
		console.log("未选中数据");
		return;
	}
	var itemsData = seledGrid[0].data;
	// 获取grid的数据，传入后台保存
	Ext.Ajax.request({
		// 后台请求路径
		url : 'transDoEditExpire.ajax',
		// 数据类型
		dataType : "json",
		// 请求的参数
		params : {
			JsonObj : JSON.stringify(itemsData)
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