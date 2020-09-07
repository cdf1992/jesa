/**
 * 内蒙航信接口
 */
Ext.define("Ext.ux.vms.HX.asinoNM", {
			alias : 'Ext.ux.vms.HX.asinoNM'
		})
// 创建COM对象
var activeObject = new ActiveXObject("TaxCardX.GoldTax");
var is_open = 0;

// 延时
function sleep(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
		// 取得发票库存
		GetInfo();
	}
}

// 初始化
function initJSK() {
	// 服务器地址
	activeObject.Initial("10.0.1.19");
	if (activeObject.RetCode == "0") {
		// alert("初始化成功！");
	} else {
		alert("初始化失败，代码：" + activeObject.RetCode);
	}
}

// 开卡
function OpenCard() {
	activeObject.OpenCard();
	if (activeObject.RetCode == "1011" || activeObject.RetCode == "3001") {
		is_open = 1;
		var mess = "金税盘开启成功！";
		// alert(mess);
	} else {
		alert("金税盘开启失败，错误代码：" + activeObject.RetCode + activeObject.RetMsg);
	}
}

// 关卡
function CloseCard() {
	if (is_open == 0) {
		alert("金税盘未打开！");
		return;
	}
	activeObject.CloseCard();
}

// 查询金税盘信息
function CXCard() {
	if (is_open == 0) {
		alert("金税盘未打开！");
		return;
	}
	var date = new Date(activeObject.TaxClock);

	var mess = "金税盘信息如下；" + "\n\n开票限额:" + activeObject.InvLimit + "\n本单位税号:"
			+ activeObject.TaxCode + "\n金税盘时钟:" + date.getFullYear() + "-"
			+ (date.getMonth() + 1) + "-" + date.getDate() + "\n开票机号码:"
			+ activeObject.MachineNo + "\n无票标志(0有票；1无票):"
			+ activeObject.IsInvEmpty + "\n抄税标志(0未到抄税期；1已到抄税期):"
			+ activeObject.IsRepReached + "\n锁死标志(0未到锁死期；1已到锁死期):"
			+ activeObject.IsLockReached;
	alert(mess);
}

// 发票开票开关数次
function Invoice(billInfo) {
	// 开启
	OpenCard();
	if (is_open == 0) {
		alert("金税盘未打开！");
		return;
	}
	var reBill = InvoiceBillFun(billInfo);
	// 关闭
	CloseCard();

	return reBill;
}

// 绑定开具的票据信息公共方法
function InvoiceBillFun(billInfo) {
	activeObject.InfoKind = billInfo.fapiaoType;// 发票种类
	activeObject.InfoInvoicer = billInfo.drawer;// 开票人

	activeObject.InfoClientName = billInfo.customerName;// 购方名称
	activeObject.InfoClientTaxCode = billInfo.customerTaxno;// -// 购方税号
	activeObject.InfoClientBankAccount = billInfo.customerBankandaccount;// -//
	// 购方开户行及账号
	activeObject.InfoClientAddressPhone = billInfo.customerAddressandphone;// -//
	// 购方地址电话

	activeObject.InfoSellerBankAccount = billInfo.bankandaccount;// -//
	// 销方开户行及账号
	activeObject.InfoSellerAddressPhone = billInfo.addressandphone;// -//
	// 销方地址电话

	activeObject.InfoNotes = billInfo.remark;// - 备注
	activeObject.InfoChecker = billInfo.reviewer;// - 复核人，可为空
	activeObject.InfoCashier = billInfo.payee;// - 收款人，可为空

	// -// 如不为空，则开具销货清单，此为发票上商品名称栏的清单信息，应为"(详见销货清单)"字样
	// activeObject.InfoListName = document.all.InfoListName.value;
	// -// 销售单据编号，可为空
	// activeObject.InfoBillNumber = document.all.InfoBillNumber.value;

	// 非汉字防伪发票明细超过8行，将自动开具销货清单
	activeObject.ClearInvList();

	// 循环添加商品信息
	var billItemList = billInfo.billItemList;
	for (var a = 0; a < billItemList.length; a++) {
		var billItem = billItemList[a];
		var taxRate = billItem.taxRate * 100;
		activeObject.InfoTaxRate = taxRate;// 税率
		activeObject.InvListInit();// 初始化商品明细
		activeObject.ListGoodsName = billItem.goodsName;// 商品名称
		activeObject.ListTaxItem = billItem.taxItem;// 商品税目
		activeObject.ListStandard = billItem.specandmodel;// 商品规格型号
		activeObject.ListUnit = billItem.goodsUnit;// 商品计量单位
		activeObject.ListNumber = billItem.goodsNo;// 商品数量
		activeObject.ListPrice = billItem.goodsPrice;// 商品单价
		activeObject.ListAmount = billItem.amt;// 商品金额
		activeObject.ListPriceKind = 0;// 单价和金额的含税价标志 (0-不含税| 1-含税)
		activeObject.ListTaxAmount = billItem.taxAmt;// 商品税额
		activeObject.AddInvList();// 添加商品明细
	}
	// 调用开票功能
	activeObject.Invoice();

	// 开票日期
	var date = new Date(activeObject.InfoDate);
	var billDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
			+ date.getDate();

	var mess = null;

	// 发票代码/发票号码
	var billCode = "", billNo = "";

	var retCode = activeObject.RetCode;
	if (retCode == "4011") {
		mess = "开票成功！\n\n" + "发票整体信息如下：" + "\n合计金额:" + activeObject.InfoAmount
				+ "\n合计税额:" + activeObject.InfoTaxAmount + "\n开票日期:" + billDate
				+ "\n所属月份:" + activeObject.InfoMonth + "\n发票代码:" + billCode
				+ "\n发票号码:" + billNo + "\n清单标志:" + activeObject.GoodsListFlag
				+ "，成功代码：" + retCode;

		billCode = activeObject.InfoTypeCode;
		billNo = activeObject.InfoNumber;
	} else {
		mess = "开票失败，错误代码：" + activeObject.RetCode + activeObject.RetMsg;
	}

	var reBill = {
		billId : billInfo.billId,
		billCode : billCode,
		billNo : billNo,
		billDate : billDate,
		reCode : retCode,
		returnMsg : mess
	};
	return reBill;
}



//绑定开具的票据信息公共方法
function InvoiceBillFunJDC(billInfo) {
	
	activeObject.InvInfoInit();
	activeObject.InfoKind = billInfo.fapiaoType;// 发票种类
	activeObject.InfoClientAddressPhone  = "2";// 开票人
	// 购方名称
	activeObject.InfoClientTaxCode = billInfo.customerTaxno;
	// 购方税号
	activeObject.InfoClientName  = billInfo.customerName;
	//身份证号码、组织机构代码
	activeObject.IDCard = billInfo.vmsBillJDCItemInfo.idCard;
	// 车辆类型
	activeObject.VehicleKind  = billInfo.vmsBillJDCItemInfo.vehicleKind;
	// 厂牌型号
	activeObject.BrandModel  = billInfo.vmsBillJDCItemInfo.brandModel;
	// 产地
	activeObject.OriginPlace   = billInfo.vmsBillJDCItemInfo.originPlace;
	// 合格证号
	activeObject.QualityCertificate    = billInfo.vmsBillJDCItemInfo.qualityCertificate;
	// 进口证明书号
	activeObject.ImpCertificateNo    = billInfo.vmsBillJDCItemInfo.impCertificateNo;
	// 商检单号
	activeObject.CommInspectionNo    = billInfo.vmsBillJDCItemInfo.commInspectionNo;
	// 发动机号码
	activeObject.EngineNo    = billInfo.vmsBillJDCItemInfo.engineNo;
	// 车辆识别代号、车辆号码
	activeObject.VehicleNo    = billInfo.vmsBillJDCItemInfo.vehicleNo;
	// 生产厂家名称
	activeObject.ManufacturerName     = billInfo.vmsBillJDCItemInfo.manufacturerName;
	// 价税合计
	activeObject.AmountTaxTotal     = billInfo.sumAmt;
	// 销货单位电话
	activeObject.SellerPhone     = billInfo.vmsBillJDCItemInfo.sellerPhoneh;
	// 销货单位账号
	activeObject.SellerAccount     = billInfo.vmsBillJDCItemInfo.sellerAccount;
	// 地址
	activeObject.SellerAddress  = billInfo.addressandphone;
	// 开户银行
	activeObject.SellerBank  = billInfo.bankandaccount;
	// 税率
	activeObject.InfoTaxRate  = Number(billInfo.taxRate)*100;
	// 吨位
	activeObject.Tonnage  = billInfo.vmsBillJDCItemInfo.tonnage;
	//限乘人数
	activeObject.PeopleNo  = billInfo.vmsBillJDCItemInfo.peopleNo;
	
	
	// 调用开票功能
	activeObject.Invoice();

	// 开票日期
	var date = new Date(activeObject.InfoDate);
	var billDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
			+ date.getDate();

	var mess = null;

	// 发票代码/发票号码
	var billCode = "", billNo = "";

	var retCode = activeObject.RetCode;
	if (retCode == "4011") {
		mess = "开票成功！\n\n" + "发票整体信息如下：" + "\n合计金额:" + activeObject.InfoAmount
				+ "\n合计税额:" + activeObject.InfoTaxAmount + "\n开票日期:" + billDate
				+ "\n所属月份:" + activeObject.InfoMonth + "\n发票代码:" + billCode
				+ "\n发票号码:" + billNo + "\n清单标志:" + activeObject.GoodsListFlag
				+ "，成功代码：" + retCode;

		billCode = activeObject.InfoTypeCode;
		billNo = activeObject.InfoNumber;
	} else {
		mess = "开票失败，错误代码：" + activeObject.RetCode + activeObject.RetMsg;
	}

	var reBill = {
		billId : billInfo.billId,
		billCode : billCode,
		billNo : billNo,
		billDate : billDate,
		reCode : retCode,
		returnMsg : mess
	};
	return reBill;
}
// 发票开票批量开关一次
function InvoiceList(billInfoList) {
	// 开启
	OpenCard();
	if (is_open == 0) {
		alert("金税盘未打开！");
		return;
	}
	var reBill = null;// 记录发票内容信息对象
	var succCount = 0;// 记录开票成功总数
	// 循环票据信息
	for (var i = 0; i < billInfoList.length; i++) {
		// 传入票据信息进行发票内容的绑定
		reBill = Invoice(billInfoList[i]);
		// 判断返回的reCode是否是开票成功4011,如果返回成功更改数据库状态并继续开票,反之更改状态并结束

		// 更改发票开具状态
		Ext.Ajax.request({
					url : 'updateBillInvoiceNM.ajax',
					dataType : "json",
					params : {
						reBillPrintInvoice : JSON.stringify(reBill)
					},
					success : function(data) {
						// var result=Ext.decode(data.responseText);
						// Ext.MessageBox.alert('提示',data.responseText);
					}
				});
		// 判断reCode的返回值
		if (reBill.reCode != "4011") {
			alert("因票据ID为" + reBill.billId + "的数据开票失败,开票终止.一共开票成功-" + i + "笔.");
			// 关闭
			CloseCard();
			return;
		} else {
			succCount = succCount + 1;
		}
	}
	// 关闭
	CloseCard();
	alert("开票成功,一共开票-" + succCount + "笔.");
}

// 取得发票库存
function GetInfo() {
	if (is_open == 0) {
		alert("金税盘未打开！");
		return;
	}
	activeObject.InfoKind = document.all.InfoKind.value;
	activeObject.GetInfo();
	var mess = "发票库存如下：\n" + "要开具发票的十位代码:" + activeObject.InfoTypeCode
			+ "\n要开具发票的号码:" + activeObject.InfoNumber + "\n发票剩余份数:"
			+ activeObject.InvStock;
	alert(mess);
}

// 发票打印开关数次
function PrintInv(billInfo) {
	// 开启
	OpenCard();
	if (is_open == 0) {
		alert("金税盘未打开！");
		return;
	}
	var reBill = PrintInvFun(billInfo);
	// 关闭
	CloseCard();
	return reBill;
}

// 发票打印绑定票据信息公共方法
function PrintInvFun(billInfo) {
	var billCode = billInfo.billCode;
	var billNo = billInfo.billNo;
    var fapiaoType=billInfo.fapiaoType;
	activeObject.InfoKind = fapiaoType;// 发票种类
	activeObject.InfoTypeCode = billCode;// 发票代码
	activeObject.InfoNumber = billNo;// 发票号码
	// 销货清单标志：0打印发票；1打印清单
	// activeObject.GoodsListFlag = document.all.PGoodsListFlag.value;
	// 是否显示边距确认对话框：0不显示；1显示
	activeObject.InfoShowPrtDlg = 0;

	activeObject.PrintInv();
	var mess = null;

	var retCode = activeObject.RetCode;
	if (retCode == "5011") {
		mess = "发票打印成功，成功代码：" + retCode;
	} else {
		mess = "发票打印失败，错误代码：" + activeObject.RetCode + activeObject.RetMsg;
	}

	var reBill = {
		billId : billInfo.billId,
		billCode : billCode,
		billNo : billNo,
		reCode : activeObject.RetCode,
		returnMsg : mess
	};
	return reBill;
}

function PrintInvList(billInfoList) {
	// 开启
	OpenCard();
	if (is_open == 0) {
		alert("金税盘未打开！");
		return;
	}
	var reBill = null;// 记录发票内容信息对象
	var succCount = 0;// 记录开票成功总数
	// 循环票据信息
	for (var i = 0; i < billInfoList.length; i++) {
		reBill = PrintInvFun(billInfoList[i]);
		// 更改发票打印状态
		Ext.Ajax.request({
					url : 'updateBillPrintNM.ajax',
					dataType : "json",
					params : {
						reBillPrint : JSON.stringify(reBill)
					},
					success : function(data) {
						/*
						 * var result=Ext.decode(data.responseText);
						 * Ext.MessageBox.alert('提示',data.responseText);
						 */
					}
				});
		// 判断reCode的返回值
		if (reBill.reCode != "5011") {
			alert("因票据ID为" + reBill.billId + "的数据打印失败,开票终止.一共打印成功-" + i + "笔.");
			// 关闭
			CloseCard();
			return;
		} else {
			succCount = succCount + 1;
		}
	}

	// 关闭
	CloseCard();
	alert("打印成功,一共打印-" + succCount + "笔.");
}

function CancelInvFun(billInfo) {
	var billCode = billInfo.billCode;
	var billNo = billInfo.billNo;

	activeObject.InfoTypeCode = billCode;
	activeObject.InfoNumber = billNo;

	activeObject.CancelInv();

	var reMess = null;

	var retCode = activeObject.RetCode;
	if (retCode == "6011") {
		reMess = "发票作废成功，成功代码：" + retCode;
	} else {
		reMess = "发票作废失败，错误代码：" + activeObject.RetCode + activeObject.RetMsg;
	}
	// alert(reMess);
	var reBill = {
		billId : billInfo.billId,
		billCode : billCode,
		billNo : billNo,
		reCode : retCode,
		returnMsg : reMess
	};
	return reBill;
}

// 发票作废
function CancelInv(billInfo) {
	// 开启
	OpenCard();
	if (is_open == 0) {
		alert("金税盘未打开！");
		return;
	}

	var reBill = CancelInvFun(billInfo);
	// 关闭
	CloseCard();
	return reBill;
}

// 发票查询
function QryInv() {
	if (is_open == 0) {
		alert("金税盘未打开！");
		return;
	}
	activeObject.InfoKind = document.all.QInfoKind.value;
	activeObject.InfoTypeCode = document.all.QInfoTypeCode.value;
	activeObject.InfoNumber = document.all.QInfoNumber.value;

	activeObject.QryInv();
	if (activeObject.RetCode == "7011") {
		var mess = "发票查询成功！\n\n" + "发票种类:" + activeObject.InfoKind + "\n发票代码:"
				+ activeObject.InfoTypeCode + "\n发票号码:"
				+ activeObject.InfoNumber + "\n销售单据编号:"
				+ activeObject.InfoBillNumber + "\n合计不含税金额:"
				+ activeObject.InfoAmount + "\n合计税额:"
				+ activeObject.InfoTaxAmount + "\n开票日期:"
				+ activeObject.InfoDate + "\n打印标志:"
				+ activeObject.InfoPrintFlag
		alert(mess);
	} else
		alert("发票查询失败，错误代码：" + activeObject.RetCode);

}

// 手工开票设置
function QryMxInv() {
	if (is_open == 0) {
		alert("金税盘未打开！");
		return;
	}
	activeObject.HandMade = document.all.enHand.value;
	activeObject.EnHand();
	var res = activeObject.RetCode;
	if (res == "0") {
		alert("手工开票启用成功！");
	} else if (res == "1") {
		alert("手工开票禁用成功！");
	}
}