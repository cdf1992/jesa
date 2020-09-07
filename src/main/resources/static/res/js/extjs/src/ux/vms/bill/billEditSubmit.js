/**
 * 票据编辑页面编辑按钮页面功能公共方法
 */
Ext.define("Ext.ux.vms.bill.billEditSubmit", {
			alias : 'Ext.ux.vms.bill.billEditSubmit'
		})

var billEditSubmit = function(billEditWindow, gridStore, grid, rowIndex,
		goodsListSize, billGoodsSwitch) {

	var billType = billEditWindow.query('textfield[name=billInfo.fapiaoType]')[0]
			.getValue(); // 发票类型
	var reviewer = billEditWindow.query('textfield[name=billInfo.reviewer]')[0]
			.getValue(); // 复核人
	var payee = billEditWindow.query('textfield[name=billInfo.payee]')[0]
			.getValue(); // 收款人
	var remark = billEditWindow.query('textfield[name=billInfo.remark]')[0]
			.getValue(); // 备注
	var customInfo = billEditWindow
			.query('textfield[name=billInfo.customerCname]')[0].getValue(); // 客户名称
	var instInfo = billEditWindow.query('textfield[name=billInfo.instcode]')[0]
			.getValue(); // 我方开票机构
	var billType = billEditWindow.query('textfield[name=billInfo.fapiaoType]')[0]
			.getValue(); // 发票类型
	var taxno = billEditWindow.query('textfield[name=billInfo.taxno]')[0]
			.getValue(); // 我方纳税人识别号
	if (issave) {
		Ext.MessageBox.alert("提示", "数据保存中，请稍候...");
		return false;
	}
	// 校验发票类型
	if (billType == "" || billType == null) {
		Ext.MessageBox.alert("提示", "请选择发票类型");
		return;
	}
	if (billInfo.fapiaoType == 1 && billType == 0) {
		Ext.MessageBox.confirm('提示', '如将普票修改为专票请确认各项功能信息输入完整', function(obj) {
			if (obj == "yes") {
				var lenPayee = 0;
				for (var i = 0; i < payee.length; i++) {
					var c = payee.charCodeAt(i);
					// 单字节加1
					if ((c >= 0x0001 && c <= 0x007e)
							|| (0xff60 <= c && c <= 0xff9f)) {
						lenPayee++;
					} else {
						lenPayee += 2;
					}
					if (lenPayee > 16) {
						alert("收款人名称过长！");
						return;
					}
				}
				var lenRemark = 0; // 字符长度
				var cLength = 120; // 汉字长度
				var zLength = 0; // 混合长度
				for (var i = 0; i < remark.length; i++) {
					var c = remark.charCodeAt(i);
					// 单字节加1
					if ((c >= 0x0001 && c <= 0x007e)
							|| (0xff60 <= c && c <= 0xff9f)) {
						lenRemark++;
						zLength++;
					} else {
						cLength += 1;
						zLength++;
					}
				}
				if (lenRemark > 120 && fapiaoType == '1' || cLength > 240
						&& fapiaoType == '1' || zLength > 120
						&& fapiaoType == '1') {
					alert("备注过长！最大长度：" + 120);
					return;
				} else if (lenRemark > 120 && fapiaoType == '0'
						|| cLength > 240 && fapiaoType == '0' || zLength > 120
						&& fapiaoType == '0') {
					alert("备注过长！最大长度：" + 120);
					return;
				}
				var isblank = true;
				var fs = billEditWindow.down('form').getForm().getValues();
				for (var fsValue in fs) {
					if (fs[fsValue] && fs[fsValue] != ""
							&& fs[fsValue].replace(/(^\s*)|(\s*$)/g, "") != "") {
						isblank = false;
						break;
					}
				}
				Ext.each(fs, function(items) {
							console.log(items.length);
						})
				if (!isblank) {
					var bill = {};
					// 票据信息
					bill['drawer'] = billEditWindow
							.query('textfield[name=billInfo.drawer]')[0]
							.getValue(); // 开票人
					bill['customerId'] = billEditWindow
							.query('textfield[name=billInfo.customerId]')[0]
							.getValue(); // 客户id
					bill['customerTaxno'] = billEditWindow
							.query('textfield[name=billInfo.customerTaxno]')[0]
							.getValue(); // 客户税号
					bill['instcode'] = instInfo; // 所属机构
					bill['customerName'] = customInfo; // 客户名称
					bill['fapiaoType'] = billType; // 发票类型
					bill['taxno'] = taxno; // 纳税人识别号
					bill['addressandphone'] = billEditWindow
							.query('textfield[name=billInfo.customerAddressandphone]')[0]
							.getValue(); // 客户地址电话
					bill['bankandaccount'] = billEditWindow
							.query('textfield[name=billInfo.customerBankandaccount]')[0]
							.getValue(); // 客户银行账号
					bill['reviewer'] = billEditWindow
							.query('textfield[name=billInfo.reviewer]')[0]
							.getValue(); // 复核人
					bill['payee'] = billEditWindow
							.query('textfield[name=billInfo.payee]')[0]
							.getValue(); // 收款人
					bill['remark'] = billEditWindow
							.query('textfield[name=billInfo.remark]')[0]
							.getValue(); // 收款人
					bill['name'] = billEditWindow
							.query('textfield[name=billInfo.name]')[0]
							.getValue(); // 我方纳税人名称
					bill['addressandphone'] = billEditWindow
							.query('textfield[name=billInfo.addressandphone]')[0]
							.getValue(); // 我方地址电话
					bill['bankandaccount'] = billEditWindow
							.query('textfield[name=billInfo.bankandaccount]')[0]
							.getValue(); // 我方银行账户
					bill['sumAmt'] = billEditWindow
							.query('textfield[name=billInfo.sumAmtStr]')[0]
							.getValue();// 价税合计
					bill['amtSum'] = billEditWindow
							.query('textfield[name=billInfo.amtSumStr]')[0]
							.getValue();// 合计收入
					bill['taxAmtSum'] = billEditWindow
							.query('textfield[name=billInfo.taxAmtSumStr]')[0]
							.getValue();// 合计税额
					bill['billId'] = grid.getStore().getAt(rowIndex)
							.get('billId');
					Ext.Ajax.request({
								url : 'saveBill.ajax',
								params : {
									bill : json.stringify(bill),
									submitFlag : 'U'
								},
								success : function(response) {
									var text = Ext
											.decode(response.responseText);
									if ("Y" == text) {
										Ext.MessageBox.alert("提示", "保存成功");
									} else if ("N" == text) {
										Ext.MessageBox.alert("提示", "保存失败");
									}
									submitFlag = false;
									billEditWindow.close();
									gridStore.load();
								}
							});
				}
			} else {
				return;
			}
		})
	} else {
		var lenPayee = 0;
		for (var i = 0; i < payee.length; i++) {
			var c = payee.charCodeAt(i);
			// 单字节加1
			if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
				lenPayee++;
			} else {
				lenPayee += 2;
			}
			if (lenPayee > 16) {
				Ext.MessageBox.alert("提示", "收款人名称过长！");
				return;
			}
		}

		var lenRemark = 0; // 字符长度
		var cLength = 120; // 汉字长度
		var zLength = 0; // 混合长度
		for (var i = 0; i < remark.length; i++) {
			var c = remark.charCodeAt(i);
			// 单字节加1
			if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
				lenRemark++;
				zLength++;
			} else {
				cLength += 1;
				zLength++;
			}
		}
		if (lenRemark > 120 && fapiaoType == '1' || cLength > 240
				&& fapiaoType == '1' || zLength > 120 && fapiaoType == '1') {
			Ext.MessageBox.alert("提示", "备注过长！最大长度：" + 120);
			return;
		} else if (lenRemark > 120 && fapiaoType == '0' || cLength > 240
				&& fapiaoType == '0' || zLength > 120 && fapiaoType == '0') {
			Ext.MessageBox.alert("提示", "备注过长！最大长度：" + 120);
			return;
		}
		// 票据信息
		var bill = {};
		bill['drawer'] = billEditWindow
				.query('textfield[name=billInfo.drawer]')[0].getValue(); // 开票人
		bill['customerId'] = billEditWindow
				.query('textfield[name=billInfo.customerId]')[0].getValue(); // 客户id
		bill['customerTaxno'] = billEditWindow
				.query('textfield[name=billInfo.customerTaxno]')[0].getValue(); // 客户税号
		bill['instcode'] = instInfo; // 所属机构
		bill['customerName'] = customInfo; // 客户名称
		bill['fapiaoType'] = billType; // 发票类型
		bill['taxno'] = taxno; // 纳税人识别号
		bill['addressandphone'] = billEditWindow
				.query('textfield[name=billInfo.customerAddressandphone]')[0]
				.getValue(); // 客户地址电话
		bill['bankandaccount'] = billEditWindow
				.query('textfield[name=billInfo.customerBankandaccount]')[0]
				.getValue(); // 客户银行账号
		bill['reviewer'] = billEditWindow
				.query('textfield[name=billInfo.reviewer]')[0].getValue(); // 复核人
		bill['payee'] = billEditWindow.query('textfield[name=billInfo.payee]')[0]
				.getValue(); // 收款人
		bill['remark'] = billEditWindow
				.query('textfield[name=billInfo.remark]')[0].getValue(); // 收款人
		bill['name'] = billEditWindow.query('textfield[name=billInfo.name]')[0]
				.getValue(); // 我方纳税人名称
		bill['addressandphone'] = billEditWindow
				.query('textfield[name=billInfo.addressandphone]')[0]
				.getValue(); // 我方地址电话
		bill['bankandaccount'] = billEditWindow
				.query('textfield[name=billInfo.bankandaccount]')[0].getValue(); // 我方银行账户
		bill['sumAmt'] = billEditWindow
				.query('textfield[name=billInfo.sumAmtStr]')[0].getValue();// 价税合计
		bill['amtSum'] = billEditWindow
				.query('textfield[name=billInfo.amtSumStr]')[0].getValue();// 合计收入
		bill['taxAmtSum'] = billEditWindow
				.query('textfield[name=billInfo.taxAmtSumStr]')[0].getValue();// 合计税额
		bill['billId'] = grid.getStore().getAt(rowIndex).get('billId');

		// 如果是铁捷版本，得到输入的商品信息明细
		var goods = [];
		if (billGoodsSwitch) {
			for (var goodsCount = 0; goodsCount < goodsListSize; goodsCount++) {
				var good = {};
				good['billId'] = grid.getStore().getAt(rowIndex).get('billId');
				good['goodsId'] = document.getElementById("goodsIdEdit" + goodsCount).value;
				//收入
				good['amt'] = document.getElementById("incomeEdit" + goodsCount).value;
				//单价
				good['goodsPrice'] = document.getElementById("goodsPriceEdit" + goodsCount).value;
				//税额
				good['taxAmt'] = document.getElementById("taxAmtEdit" + goodsCount).value;
				goods.push(good);
			}
			bill['goods'] = goods;
		}
		
		Ext.Ajax.request({
			url : 'saveBill.ajax',
			params : {
				bill : json.stringify(bill),
				submitFlag : 'U'
			},
			success : function(response) {
				var text = Ext.decode(response.responseText);
				if ("Y" == text) {
					Ext.MessageBox.alert("提示", "保存成功");
				} else if ("N" == text) {
					Ext.MessageBox.alert("提示", "保存失败");
				}
				submitFlag = false;
				billEditWindow.close();
				gridStore.load();
			}
		});
	}

};