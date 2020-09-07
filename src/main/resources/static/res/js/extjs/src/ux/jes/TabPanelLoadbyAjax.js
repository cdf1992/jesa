/**
 * 支持Ajax装载新tab页的tabpanel
 */
Ext.define("Ext.ux.jes.TabPanelLoadbyAjax", {
    extend: "Ext.tab.Panel",
    alias: 'widget.aldtabpanel',
    validAjax:function(url,itemId,isasync,params,config,jsonData){
    	params=params || {};
    	itemId=itemId || '';
        var me=this;
        if(!url){
        	alert('url不能为空');
        }
        var tab = me.child('panel[myItemId='+itemId+']');
        if(tab){
        	me.setActiveTab(tab);
        }else{
	        Ext.Ajax.request({
			    url: url,
			    async: isasync,
		    	params: params,
		    	jsonData: jsonData,
			    failure:function(response,opts){
			    	alert(jesFwqycMsg/*'服务器异常['*/+response.status+jesGbllqcsMsg/*'],请关闭浏览器稍后重试.'*/);
			    },
			    success: function(response,req){ //第二个参数req就是本次Ext.Ajax.request的参数
			    	var obj;
			    	eval('obj='+response.responseText);
			    	if(obj.error !=undefined){
			    		alert(obj.error);
			    		return;
			    	}
			    	if(obj.getObject && Ext.isFunction(obj.getObject)) {
					  		obj=obj.getObject(config||params);
			    	}
			    	if(!obj){return;}
			    	obj.itemId=itemId; // 兼容原来程序
			    	obj.myItemId=itemId;
					var panel = me.add(obj);
					me.setActiveTab(panel);
			    }
				     
			});
        }
    },
    addByAjax:function(url,itemId,isasync,params,config,jsonData){
    	params=params || {};
    	itemId=itemId || '';
        var me=this;
        if(!url){
        	alert('url不能为空');
        }
        var tab = me.child('panel[myItemId='+itemId+']');
        if(tab){
        	me.setActiveTab(tab);
        }else{
	        Ext.Ajax.request({
			    url: url,
			    async: isasync,
		    	params: params,
		    	jsonData: jsonData,
			    failure:function(response,opts){
			    	alert('${message("beehive.src.jes.beehive.vm.dataFill.auditQuery.fwqyc")}'/*'服务器异常['*/+response.status+
	    			'${message("beehive.src.jes.beehive.vm.dataFill.auditQuery.gbllqcs")}'/*'],请关闭浏览器稍后重试.'*/);
			    },
			    success: function(response,req){ //第二个参数req就是本次Ext.Ajax.request的参数
			    	var obj;
			    	//try{
			    		//请注意此处请直接返回String内容(*.do)不要返回string的json(*.ajax)
			    		 eval('obj='+response.responseText);
			    		 if(obj.getObject && Ext.isFunction(obj.getObject)) {
					    		obj=obj.getObject(config||params);
			    		 }
			    	//}catch(e){
			    		//alert('由于服务器错误,您需要重新刷新页面.'+response.responseText+e,'错误');
			    		//return;
			    	//}
			    	if(!obj){return;}
			    	obj.itemId=itemId; // 兼容原来程序
			    	obj.myItemId=itemId;
					var panel = me.add(obj);
					me.setActiveTab(panel);
			    }
				     
			});
        }
    }
});