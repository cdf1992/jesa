/**
 * ajaxHandler 写原来handler的代码,返回一个request对象
 * requestObject
 * Ext.Ajax.request(requestObject);
 * 点击后disable，后台执行完返回再设置成enable
 */
Ext.define("Ext.ux.jes.form.AjaxButton", {
    extend: "Ext.button.Button",
    alias: 'widget.ajaxbutton',
    
    ajaxHandler:Ext.emptyFn,//
    
    handler:function(me){
    	/*
    	 * 
    	 * 
    	 */
//    	me.disable();
    	var requestObject;
    	try{
    		requestObject=me.ajaxHandler.apply(me,arguments);
    	}catch(e){
    		alert(e);
    	}
    	if(!requestObject && !requsetObject.url){
    		me.enable();
    		return ;
    	}
    	if(requestObject.success){
    		var fs=requestObject.success;
    		requestObject.success=function(){
    			me.enable();
    			fs.apply(this,arguments);
    		};
    	}else{
    		requestObject.success=function(){
    			me.enable();
    		}
    	}
    	if(requestObject.failure){
    		var ff=requestObject.failure;
    		requestObject.failure=function(){
    			me.enable();
    			ff.apply(this,arguments);
    		};
    	}else{
    		requestObject.failure=function(){
    			me.enable();
    		}
    	}
    	me.disable();
    	Ext.Ajax.request(requestObject);
	}
});
