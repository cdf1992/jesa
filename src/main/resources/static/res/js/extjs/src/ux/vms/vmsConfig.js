Ext.define("Ext.ux.vms.vmsConfig", {
	alias : 'Ext.ux.vms.vmsConfig'
})

/**
 * 数据量过大显示文本
 */
function isLarge(store,id){
	var isLargeData = store.proxy.reader.jsonData.largeData;
	if(isLargeData){
		var limitCount = store.proxy.reader.jsonData.limit;
		Ext.getCmp(id).setValue("由于当前页面数据过多，为方便用户，显示前"+limitCount+"条数据");
	    Ext.getCmp(id).show();
	}else{
		Ext.getCmp(id).hide();
	}
}

/**
 * 对list进行排序
 * 
 * @param a
 * @param b
 * @returns
 */
function sortNumber(a, b) {
	return b - a;
}