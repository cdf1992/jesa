/**
 * 红票开具公用方法(不包含电子发票开具功能)
 */
Ext.define("Ext.ux.vms.bill.redBillInvoice", {
			alias : 'Ext.ux.vms.bill.redBillInvoice'
		})

/**
 * 
 * @param {} kpStatus 开票接口
 * @param {} grid 选中的开票数据
 * @param {} vmskpRelyon 是否支持多税控设备【1、否；2、是】
 * @param {} invoiceTaxControl 设置的用户开具用到的开票设备
 */
var redBillInvoice = function(kpStatus, grid, gridStore, vmskpRelyon,invoiceTaxControl) {
	if (grid.length > 0) {
		var ids = [];
		for (var i = 0; i < grid.length; i++) {
			ids.push(grid[i].get('billId'));
		}
	} else {
		Ext.MessageBox.alert('提示', '请选择需要开票的数据');
	}
	var reqUrl = "";
	if (vmskpRelyon == "2") {
		kpStatus = invoiceTaxControl;
	}
	switch (kpStatus) {
		// 1:百旺单机,2:百旺税控,3:北京航信,4:上海航信,5:内蒙航信
		case 1 :
			break;
		case 2 :
			break;
		case 3 :
			reqUrl = 'createRedBillissue.ajax';
			break;
		case 4 :
			reqUrl = 'reBillIssureListASSH.ajax';
			break;
		case 5 :
			break;
	}
	Ext.Ajax.request({
		url:reqUrl,
		dataType: "json",  
		params:{
			ids:ids
		},
		success:function(response){
			var result=Ext.decode(response.responseText);
			Ext.MessageBox.alert('提示',response.responseText);
			store.load();
		}
							
	});
};