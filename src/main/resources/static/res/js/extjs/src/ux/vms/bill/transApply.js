/**
 * 开票申请公共方法
 */
Ext.define("Ext.ux.vms.bill.transApply", {
	alias : 'Ext.ux.vms.bill.transApply'
})

/**
 * 开票申请
 * 
 * @param grid选中交易
 * @param gridStore刷新页面
 */
var myViewVar = null;
var transApply = function(grid, gridStore,myView) {
	myViewVar = myView;
	if (grid.length > 0) {
		Ext.MessageBox.confirm('提示', '确认对选中的数据进行开票吗？', function(obj) {
			if (obj == 'yes') {
				// 校验客户名称
				if (!regTest()) {
					return;
				}
				if (IsNum() && first()) {
					var ids = [];
					for (var i = 0; i < grid.length; i++) {
						ids.push(grid[i].get('transId'));
					}
					// 请求后台
					requestUrl(ids, "1",gridStore);
				}
			}
		});
	} else {
		Ext.MessageBox.alert("提示", '至少选择一行！');
	}

};

/**
 * 合并交易 *
 * 
 * @param grid选中交易
 * @param gridStore刷新页面
 */
var transMerge = function(grid, gridStore,myView) {
	myViewVar = myView;
	var transIds = [];
	var fapiaoTypes = [];
	var selectTransIds = "";
	var customer = "";
	var fapiaoType = "";
	if (grid.length > 0) {
		Ext.MessageBox.confirm('提示', '确认对选中的数据进行合并开票吗？', function(obj) {
			if (obj == 'yes') {
				var hasEInvoiceResult = hasEInvoice();	
				if (hasEInvoiceResult) {
					Ext.MessageBox.alert("提示","电子发票不能合并开票[交易流水号" + hasEInvoiceResult + "]");
					return false;
				}
				if (IsNum()) {
					for (var i = 0; i < grid.length; i++) {
						transIds.push(grid[i].get('transId'));
						fapiaoTypes.push(grid[i].get('fapiaoType'));
						selectTransIds += grid[i].get('transId')+ ",";
					}
					if (!isNaN(transIds.length)) {
						for (var i = 0; i < transIds.length; i++) {
							if (customer == "") {
								customer = grid[i].get('billCustomerId');
							}
							if (fapiaoType == "") {
								fapiaoType = fapiaoTypes[i];
							}
						}
					}
					Ext.Ajax.request({
						url : 'selectTransToOneBill.ajax',
						params : {
							selectTransIds : selectTransIds.substring(0,selectTransIds.length - 1),
							subType : "2"
						},
						success : function(response) {
							var text = eval(response.responseText);
							var result = eval('('+ text + ')');
							if (result.checkFlag == "Y") {
								Ext.MessageBox.confirm('提示',result.checkResultMsg,function(obj) {
									if (obj == 'yes') {
										requestUrl(selectTransIds.substring(0,selectTransIds.length - 1),"2",gridStore);
									}
								})
							}else{
								Ext.MessageBox.alert("提示",result.checkResultMsg);
								return;
							}
						}
					});
				} else {
					return;
				}
			}
		
		});
	} else {
		Ext.MessageBox.alert("提示", '至少选择一行！');
	}
}

//拆分开票
var transSplit = function(grid,gridStore,myView){
	myViewVar = myView;
	if (grid.length > 0&&grid.length<2) {
		Ext.MessageBox.confirm('提示','确认对选中的数据进行拆分开票吗？',function(obj){
			if(obj=='yes'){
				var hasEInvoiceResult = hasEInvoice();		 
				if(hasEInvoiceResult){
					Ext.MessageBox.alert("电子发票不能拆分开票[交易流水号"+ hasEInvoiceResult +"]");
					return false;
				}
				if(!regTest()){
					return;
				}
				if(IsNum()){
					var transIds = [];
					for(var i=0;i<grid.length;i++){
						transIds.push(grid[i].get('transId'));
					} 
					
					if(grid[0].get('fapiaoType')==0){
						if(grid[0].get('taxRate')==0.0||grid[0].get('taxRate')==""){
							alert("税率不存在,不可以拆分");
							return;
							}
					}
					
					Ext.Ajax.request({
						url:'selectTransToOneBill.ajax',
						params:{
							selectTransIds:transIds
						},
						success:function(response){
							var text=eval(response.responseText);
							var result=eval('(' + text + ')');
							if(result.checkFlag=="N"){
								// 存在无对应商品信息的交易
								Ext.MessageBox.alert("提示",result.checkResultMsg);
								return;
							}
							 if(result=="N"){
								 Ext.Ajax.request({
										url:'transToOneBill.ajax',
										params:{
											selectTransIds:transIds.substring(0,selectTransIds.length-1)
										},
										success:function(response){
											Ext.MessageBox.alert("提示",response.responseText);
											gridStore.load();
										}
									});
							} 
							if(result.checkFlag=="Y"){
								var billStore=Ext.create('Ext.data.Store', {
									autoLoad: false,
									fields:['sumAmt', 'remark']
								});
								// 加载客户下拉框
								var html="";
								var grids = myView.down('grid').getSelectionModel().getSelection();
								var sl=grids[0].get('taxRate')*1
								Ext.Ajax.request({
									url:'selectCustomerDown.ajax',
									params:{
										customerId:grid[0].get('billCustomerId')
									},
									success:function(response){
										var text=eval(response.responseText);
										var listmms=new Array();
										var flag=false;
										for(var i=0 ;i<text.length;i++){
											var sValue=text[i].customerCname+"-"+text[i].customerId;
										    html+="<option>"+sValue+"</option>";
										    // alert(html);
										}    
											var billWindow=Ext.create('Ext.window.Window', {
												modal:true,// 设置是否添加遮罩
												width : 800,
												layout : 'fit',
												draggable:true,// 拖动
												resizable:true,	// 变大小
												autoScroll:true,
												title:'拆分开票',
												constrainHeader : true,
												items : [{
													layout : 'form',
													xtype : 'form',
													autoScroll : true,
													frame : true,
													defaultType : 'textfield',
													items : [{
														xtype : 'text',
														itemId:'totalSumAmt',
														value:grid[0].get('balance'),
														name:'totalSumAmt',
														text:"总金额："+grid[0].get('balance')
													},{
														xtype : 'text',
														itemId:'moneySy',
														value:grid[0].get('balance'),
														name:'moneySy',
														text:"剩余金额："+grid[0].get('balance')
													},{
														xtype : 'text',
														itemId:'diffTaxAmt',
														name:'diffTaxAmt',
														text:"参考误差："
													}]
												},{
													xtype:'toolbar',
														items : [{
															xtype: 'button',
															text : '',
															iconCls : "add-icon",
															instWin:null,
															tooltip:'添加',
															autoShow:true,  // 默认false,自动显示
															handler:function(me){
																var count=billStore.getCount()-1;
																 var dom=Ext.get(document.getElementById('sumAmt'+count));
																 var sumAmtValue= dom.dom.value;
																if(sumAmtValue!=''){
																	billStore.add(Ext.decode("{'sumAmt':'','remark':''}"));
																}
															}
														},{
															xtype: 'button',
															text : '',
															iconCls : "delete-icon",
															autoShow:true,  // 默认false,自动显示
															instWin:null,
															tooltip:'删除',
															handler:function(me){
																if(billStore.getCount()>1){
																	billStore.remove(billStore.getAt(billStore.getCount()-1));
																}else{
																	Ext.MessageBox.alert("提示","已是最后一行了，不能删除！");
																}
															}
														},{
															xtype: 'button',
															text : '',
															iconCls : "success-icon",
															autoShow:true,  // 默认false,自动显示
															instWin:null,
															tooltip:'校验',
															handler:function(me){
																var listms=new Array();
																var moneyTotal=billWindow.down('panel').getComponent('totalSumAmt').value;  // 总金额
																var count=billStore.getCount();
																var store =billWindow.down('grid').getStore();
																var grid = myView.down('grid').getSelectionModel().getSelection();
																var diffTaxAmt = 0;
																var taxRate = grid[0].get('taxRate')*1;// 交易税率
																var taxCnyBalance = grid[0].get('taxCnyBalance');// 交易未开票税额
																
																var lineTaxAmtSum = 0;// 拆分税额合计
																var lineAmtSum = 0;// 拆分价税合计
																var params={};
																
																var sm=0;
																var myMoneyNum = 0;
																for (var i = 0; i < count; i++) {
																	
																	 // 获取当前行的数据
																	 var record = store.getAt(i);
																	 var sumAmtValue="sumAmt"+i;
																	 var dom=Ext.get(document.getElementById(sumAmtValue));
																	 sm=dom.dom.value==""||isNaN(Ext.util.Format.trim(dom.dom.value))?0:dom.dom.value;
																	 myMoneyNum += parseFloat(sm);
																	 var lineAmt = sm*1;
																		var lineTaxAmt = sm/(1+taxRate)*taxRate;// 拆分后税额
																		lineTaxAmtSum = lineTaxAmtSum + lineTaxAmt.toFixed(2)*1;// 拆分税额合计
																		lineAmtSum = lineAmtSum + lineAmt;// 拆分价税合计
														 			 // 将集合保存到list数组中
																		
																		listms.push(sm);
														 			 // 清空数组中的每行数据保存结果
														 			 params={};
																 }
																moneyTotal = parseFloat(moneyTotal);
																var moneySy = moneyTotal - myMoneyNum;
																 // 剩余未开票金额
																 var afterSplitBlance =  moneyTotal - lineAmtSum;
																 // 剩余未开票
																	// 实际税额
																 var afterSplitTaxCnyBalance = afterSplitBlance/(1+taxRate)*taxRate;
																 listmms=listms;
																 // 误差
																 var diffTaxAmt = afterSplitTaxCnyBalance - (taxCnyBalance-lineTaxAmtSum);
																 diffTaxAmt = diffTaxAmt.toFixed(4);
																billWindow.down('panel').getComponent('diffTaxAmt').setText("参考误差："+Math.abs(diffTaxAmt));
																billWindow.down('panel').getComponent('diffTaxAmt').value=Math.abs(diffTaxAmt);
																billWindow.down('panel').getComponent('moneySy').setText("剩余金额："+moneySy.toFixed(2));
																billWindow.down('panel').getComponent('moneySy').value=moneySy.toFixed(2);
																flag=true;
																if(myMoneyNum.toFixed(2) - moneyTotal.toFixed(2) > 0){
																	Ext.MessageBox.alert("提示","输入金额不能超过总金额！");
																}
															}
														}]
												},{
													xtype : 'gridpanel',
													name  : 'grid',
													width:700,
													height:600,
													layout:'fit',
													store:billStore,
													selModel:{mode :'SIMPLE'},
													columns : [
														{ header: '序号', xtype: 'rownumberer', width:50, align: 'center'},
														{text: '金额', dataIndex: 'sumAmt',width: 100,align: 'center',renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) { // 

															return "<span><input type='text' id='sumAmt"+rowIndex+"' name='sumAmtValue'  /></span>"
										                }},
										                {text: '税额', dataIndex: 'taxAmt',width: 100,align: 'center',renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) { // 
										                  
															
															return "<span><input type='text' id='taxAmt"+rowIndex+"' name='taxAmtValue'  onkeyup='change(this,"+rowIndex+","+sl+");' /></span>"
										                }},
										                {text: '收入', dataIndex: 'income',width: 100,align: 'center',renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) { // 
										                  
															
															return "<span><input type='text' id='income"+rowIndex+"' name='incomeValue' onkeyup='changeTotal(this,"+rowIndex+","+sl+");' /></span>"
										                }},
										           	 	{text: '备注', dataIndex: 'remark',width: 100,sortable : true,align: 'center',renderer : function(value) {
															return '金额最多两位小数';
														}},
														{text: '客户', dataIndex: 'cust',width: 200,align: 'center',renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) { // 
										                  
															
															return "<span><select  id='cust"+rowIndex+"' name='cust'/>"+html+"</select></span>"
										                }}
													],
													 listeners:{  
														 beforeselect : function(  _this ,  _rowIndex ,  _keepExisting ,  _record  ) {
														return false; 	
														 }
														    }
												
												}],buttons : [{
													text : '关闭',
													iconCls : "close-icon",
													handler : function() {
														billWindow.close();// 将
																			// billWindow.hide();替换成billWindow.close();
														gridStore.reload();// 重新加载
																			// //将gridStore.loadPage();替换成gridStore.reload();
													}
												
												},{
													text : '保存',
													iconCls : "save-icon",
													id:"saveBtn",
													handler : function(me) {
														var list=new Array();
														var listcust=new Array();
														var listtaxAmt=new Array();
														var listincome=new Array();
														var moneyTotal=billWindow.down('panel').getComponent('totalSumAmt').value;  // 总金额
														var grid = myView.down('grid').getSelectionModel().getSelection();
														var count=billStore.getCount();
														var store =billWindow.down('grid').getStore();
														if(flag){
															var myAllMoney = "";
															var myMoney = "";
															var myMoneyNum = 0;
															for (var i = 0; i < count; i++) {
																 // 获取当前行的数据
																 var record = store.getAt(i);
																 var sumAmtValue="sumAmt"+i;
																 var dom=Ext.get(document.getElementById(sumAmtValue));
																 myMoney=dom.dom.value; 
																 if(listmms[i]-myMoney!=0){
																	 Ext.MessageBox.alert("提示","金额发生改变请重新校验！");
																	 return false;
																 }
																 // 获取金额
																 if(Ext.util.Format.trim(myMoney)==null||Ext.util.Format.trim(myMoney)==""){
																	 Ext.MessageBox.alert("提示","金额不能为空！");
																	 return false;
																 }
																 if(isNaN(Ext.util.Format.trim(myMoney))){
																	 Ext.MessageBox.alert("提示","请输入数值型！");
																		return false;
																 }
																 if(Ext.util.Format.trim(myMoney)<=0){
																	 Ext.MessageBox.alert("提示","金额" + "必须大于0");
																		return false;
																	}
																 var reg = new RegExp("^[0-9]+(.[0-9]{0,2})?$", "g");
														            if (!reg.test(Ext.util.Format.trim(myMoney))) {
														            	Ext.MessageBox.alert("提示","金额" + "最多只能有两位小数");
																		// url.focus();
																		return false;
																	}
														            myMoneyNum += parseFloat(myMoney);
																	myAllMoney += myMoney+"_";
																	list.push(myMoney);
																	
																	 var cut="cust"+i;
																	 var p=Ext.get(document.getElementById(cut));
																	 listcust.push(p.dom.value);
																	 
																	 var t="taxAmt"+i;
																	 var tp=Ext.get(document.getElementById(t));
																	 listtaxAmt.push(tp.dom.value);
																	 
																	 var inc="income"+i;
																	 var pi=Ext.get(document.getElementById(inc));
																	 listincome.push(pi.dom.value);
															 }
															moneyTotal = parseFloat(moneyTotal);
															if(myMoneyNum.toFixed(2) - moneyTotal.toFixed(2) > 0){
																Ext.MessageBox.alert("提示","输入金额不能超过总金额！");
																return false;
															}else if(myMoneyNum.toFixed(2) - moneyTotal.toFixed(2)<0){
																Ext.MessageBox.confirm('提示','拆分金额不完全相等是否继续',function(obj){
																	if(obj=="yes"){
																		Ext.getCmp('saveBtn').disable();
																		Ext.Ajax.request({
																			url:'transToManyBill.ajax',
																			params:{
																				transId:grid[0].get("transId"),
																				money:list,
																				cust:listcust,
																				listtaxAmt:listtaxAmt,
																				listincome:listincome
																				
																			},
																			success:function(response){
																				Ext.MessageBox.alert("提示",response.responseText);
																				billWindow.close();
																				gridStore.reload();
																			}
																		});
																	}else{
																		return ;
																	}
																});
															}else {
																Ext.MessageBox.confirm('提示','拆分金额完全相等是否继续',function(obj){
																	if(obj=="yes"){
																		Ext.getCmp('saveBtn').disable();
																		Ext.Ajax.request({
																			url:'transToManyBill.ajax',
																			params:{
																				transId:grid[0].get("transId"),
																				money:list,
																				cust:listcust,
																				listtaxAmt:listtaxAmt,
																				listincome:listincome
																				
																			},
																			success:function(response){
																				Ext.MessageBox.alert("提示",response.responseText);
																				billWindow.close();
																				gridStore.reload();
																			}
																		});
																	}else{
																		return ;
																	}
																});
															}
															
														}else{
															Ext.MessageBox.alert("提示","请先进行校验！");
														}
													}
												}]
											}).show();
										}
								
								});
								// 打开拆分开票窗体
								billStore.add(Ext.decode("{'sumAmt':'','remark':''}"));
							}
							
						}
					});
				}
			}
		});
     } else {
        Ext.MessageBox.alert("提示",'请选择一笔交易进行拆分！');
    }
}
// 开票公共请求
function requestUrl(ids, subType,gridStore) {
	Ext.Ajax.request({
		url : 'makeBillManual.ajax',
		params : {
			ids : ids
			,subType : subType
		},
		success : function(response) {
			Ext.MessageBox.alert("提示",response.responseText);
			gridStore.load();
		}
	});
}

//判断选择的交易中是否含有电子发票
function hasEInvoice(){
	var result = false;
	var checkeds = myViewVar.down('grid').getSelectionModel().getSelection();
	for (var i = 0; i < checkeds.length; i++){
		if(checkeds[i].get('fapiaoType')=='2'){
			result=checkeds[i].get('transId');
		}
	}
	return result;
}

/**
 * 校验开票金额
 */
function IsNum(){ 
	var checkeds = myViewVar.down('grid').getSelectionModel().getSelection();
	var balanceSum= Number(0);
	for (var i = 0; i < checkeds.length; i++){
		var balance=checkeds[i].get('balance');
		balanceSum+=parseFloat(balance);
	}
    if(balanceSum<1){
    	Ext.MessageBox.alert("提示","未开票金额之和不能为负数或为零！");
		return false; 
	}
	return true;
} 

function first(){
	var checkeds = myViewVar.down('grid').getSelectionModel().getSelection();
	for (var i = 0; i < checkeds.length; i++){
		if(checkeds[i].get('customerFapiaoFlag')=="N"){
			Ext.MessageBox.alert("提示","该客户为永不打印用户，无法开票！");
			return false;
		}
		if(checkeds[i].get('firstBill')=="N"){
			Ext.MessageBox.confirm('提示','存在首次开票的客户 \n 请仔细核对该客户信息 \n 是否开票？',function(obj){
				if (obj=='yes'){
					return false;
				}else{
					return true;
				}
			});
		}else{
			return true;
		}
	}
}

function regTest(){
	var flag = true;
	var checkeds = myViewVar.down('grid').getSelectionModel().getSelection();
	if (checkeds && checkeds.length > 0) {
		Ext.each(checkeds, function(n, i) {
			var customerName = checkeds[i].get('customerId');
			if(!/^[\u4e00-\u9fa5\u0000-\u00FF\uFF00-\uFFFF]{0,}$/.test(customerName)==null){
				flag = false;
				return Ext.MessageBox.alert("提示","客户名称必须为中文,请修改!");;
			}
		});
	}
	return flag;
}