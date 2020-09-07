/**
 * 发票开具公用方法(不包含电子发票开具功能)
 */
Ext.define("Ext.ux.vms.bill.billInvoice", {
	alias : 'Ext.ux.vms.bill.billInvoice'
})

/**
 * 
 * @param {} kpStatus 开票接口
 * @param {} grid 选中的开票数据
 * @param {} mk
 * @param {} vmskpRelyon 是否支持多税控设备【1、否；2、是】
 * @param {} invoiceTaxControl 设置的用户开具用到的开票设备
 */
var billIssureInvoice = function(kpStatus,grid,gridStore,mk,vmskpRelyon,invoiceTaxControl) {
	if (grid.length > 0) {
		var ids = [];
		for (var i = 0; i < grid.length; i++) {
			ids.push(grid[i].get('billId'));
		}
	} else {
		Ext.MessageBox.alert('提示', '请选择一笔需要开票的数据...');
		return;
	}
	var reqUrl = "";
	if(vmskpRelyon == "2"){
		kpStatus = invoiceTaxControl;
	}
	switch(kpStatus){
		//1:百旺单机,2:百旺税控,3:北京航信,4:上海航信,5:内蒙航信
	 	case 1:
	 		break;
	 	case 2:
	 		break;
	 	case 3:
		 	reqUrl = 'createBillissue.ajax';
	 		break;
	 	case 4:
		 	reqUrl = 'billIssureListASSH.ajax';
	 		break;
	 	case 5:
	 		reqUrl = 'billInvoiceNM.ajax';
	 		break;
	}
	mk.show(); // 显示
	Ext.Ajax.request({
		url : reqUrl,
		dataType : "json",
		params : {ids : ids},
		success : function(response) {
			if(kpStatus != 5){
				mk.hide();
				var result=Ext.decode(response.responseText);
				Ext.MessageBox.alert('提示',response.responseText);
				gridStore.reload();
			}else{
				//内蒙前端开票接口调用
				var result=Ext.decode(response.responseText);
				var billInfoList = result.billInfoList;
				console.log("需要开具的数据返回成功,开始开启税控盘.");
				var succCount = 0;//记录开票成功总数
				OpenCard();//打开税盘
				if (is_open == 0) {
					alert("金税盘未打开！");
					return;
				}
				console.log("税控盘开启成功.");
				var reBillList = new Array();
				for (var i = 0; i < billInfoList.length; i++) {
					//调用开票接口
					var reBill = InvoiceBillFun(billInfoList[i]);
					console.log(i + " : " + JSON.stringify(reBill));
					reBillList.push(reBill);
					if(reBill.reCode != "4011"){
						alert("因票据ID为" + reBill.billId + "的数据开票失败,开票终止.一共开票成功-" + i + "笔.");
						// 关闭
						CloseCard();
						break;
					}else{
						succCount = succCount + 1;
					}
				}
				console.log("税控盘开具票据信息返回完成,开始关闭税控盘.");
				CloseCard();
				console.log("税控盘关闭成功,进入开具后台请求.");
				//更改发票开具状态
				Ext.Ajax.request({
					url:'updateBillInvoiceNM.ajax',
					dataType : "json",
					params : {reBillInvoiceList : JSON.stringify(reBillList)},
					success:function(data){
						var result=Ext.decode(data.responseText);
						//Ext.MessageBox.alert('提示',data.responseText);
						alert("开票成功,一共开票-" + succCount + "笔." );
						gridStore.reload();
						mk.hide();
					}
				});
				
			}
		}
	});
};

/**
 * 
 * @param {} kpStatus 开票接口
 * @param {} grid 选中的开票数据
 * @param {} mk
 * @param {} vmskpRelyon 是否支持多税控设备【1、否；2、是】
 * @param {} invoiceTaxControl 设置的用户开具用到的开票设备
 */
var jdcbillIssureInvoice = function(kpStatus,grid,gridStore,mk,vmskpRelyon,invoiceTaxControl) {
	if (grid.length > 0) {
		var ids = [];
		for (var i = 0; i < grid.length; i++) {
			ids.push(grid[i].get('billId'));
		}
	} else {
		Ext.MessageBox.alert('提示', '请选择一笔需要开票的数据...');
		return;
	}
	var reqUrl = "";
	if(vmskpRelyon == "2"){
		kpStatus = invoiceTaxControl;
	}
	switch(kpStatus){
		//1:百旺单机,2:百旺税控,3:北京航信,4:上海航信,5:内蒙航信
	 	case 1:
	 		break;
	 	case 2:
	 		break;
	 	case 3:
		 	reqUrl = 'createBillissue.ajax';
	 		break;
	 	case 4:
		 	reqUrl = 'billIssureListASSH.ajax';
	 		break;
	 	case 5:
	 		reqUrl = 'jdcbillInvoiceNM.ajax';
	 		break;
	}
	mk.show(); // 显示
	Ext.Ajax.request({
		url : reqUrl,
		dataType : "json",
		params : {ids : ids},
		success : function(response) {
			if(kpStatus != 5){
				mk.hide();
				var result=Ext.decode(response.responseText);
				Ext.MessageBox.alert('提示',response.responseText);
				gridStore.reload();
			}else{
				//内蒙前端开票接口调用
				var result=Ext.decode(response.responseText);
				var billInfoList = result.billInfoList;
				console.log("需要开具的数据返回成功,开始开启税控盘.");
				var succCount = 0;//记录开票成功总数
				OpenCard();//打开税盘
				if (is_open == 0) {
					alert("金税盘未打开！");
					return;
				}
				console.log("税控盘开启成功.");
				var reBillList = new Array();
				for (var i = 0; i < billInfoList.length; i++) {
					//调用开票接口
					var reBill = InvoiceBillFun(billInfoList[i]);
					console.log(i + " : " + JSON.stringify(reBill));
					reBillList.push(reBill);
					if(reBill.reCode != "4011"){
						alert("因票据ID为" + reBill.billId + "的数据开票失败,开票终止.一共开票成功-" + i + "笔.");
						// 关闭
						CloseCard();
						break;
					}else{
						succCount = succCount + 1;
					}
				}
				console.log("税控盘开具票据信息返回完成,开始关闭税控盘.");
				CloseCard();
				console.log("税控盘关闭成功,进入开具后台请求.");
				//更改发票开具状态
				Ext.Ajax.request({
					url:'updateBillInvoiceNM.ajax',
					dataType : "json",
					params : {reBillInvoiceList : JSON.stringify(reBillList)},
					success:function(data){
						var result=Ext.decode(data.responseText);
						//Ext.MessageBox.alert('提示',data.responseText);
						alert("开票成功,一共开票-" + succCount + "笔." );
						gridStore.reload();
						mk.hide();
					}
				});
				
			}
		}
	});
};

// 蓝票打印
var billPrintListASSH = function(grid, rowIndex) {

};

// 蓝票作废
var billcancelASSH = function(grid, rowIndex) {

};

// 红票开具
var rebillListASSH = function(grid, rowIndex) {

};

// 红票打印
var redbillPrintListASSH = function(grid, rowIndex) {

};
