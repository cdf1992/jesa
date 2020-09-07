Ext.define("Ext.ux.te.trader.instTaxMatchConfig", {
   alias: 'Ext.ux.te.trader.instTaxMatchConfig'
})
/**
 * 选择机构勾选销方信息
 */
function chooseInstCheckTax(treeStore,type){

	//获取选中的机构号
	var seledTreePanel = Ext.getCmp('instTreeId').getSelectionModel().getSelection();
	if(seledTreePanel.length == 0){
		Ext.MessageBox.alert('提示','请选择机构信息');
		return;
	}
	//获取选中的销方信息
	var seledGridPanel = Ext.getCmp('data_grid').getSelectionModel().getSelection();
	if(seledGridPanel.length == 0){
		Ext.MessageBox.alert('提示','请选择销方信息');
		return;
	}
	var treeValue = seledTreePanel[0].getData().id;
	var gridValue = seledGridPanel[0].getData().ttiTaxNo;
	var dataParamList = new Array();
	if(type == 'sync'){
		//同步下级
		//根据选中的机构获取下级机构
		var treeValue = seledTreePanel[0].getData().id;
		var childNodeVal = treeStore.getNodeById(treeValue).getData().children;
		if(childNodeVal == null){
			Ext.MessageBox.alert('提示','选中的机构不存在下级机构');
			return;
		}
		for(var key in childNodeVal){
			var params={};
			params['INST_ID'] = childNodeVal[key].id;
			params['TAX_NO'] = gridValue;
			dataParamList.push(params);
		}
	}
	var params={};
	params['INST_ID'] = treeValue;
	params['TAX_NO'] = gridValue;
	dataParamList.push(params);
	//保存机构对应的销方信息
	Ext.MessageBox.confirm('提示','您确定要保存数据?',function(obj) {
		if(obj=='yes'){  
			Ext.Ajax.request({
				// 后台请求路径
				url : 'instTaxSave.ajax',
				// 数据类型
				dataType: "json",
				// 请求的参数
				params : {JsonObj:JSON.stringify(dataParamList)},
				// 请求成功调用函数
				success : function(response) {
					if(response){
						var result=Ext.decode(response.responseText);
						Ext.MessageBox.alert('提示',result);
					}
				}
			});
		}
	});
}