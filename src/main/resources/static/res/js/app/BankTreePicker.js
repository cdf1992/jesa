/**
 * 带权限机构下拉树
 * 支持输入机构ID或机构名称，按键盘Enter键查询
 */

Ext.define("Sys.app.BankTreePicker", {
    extend: "Ext.ux.TreePicker"
    , alias: 'widget.banktreepicker'
    , labelAlign : 'right'
    , displayField : 'text'
    , valueField : 'id'
    , editable : true
    , enableKeyEvents : true
    , autoSelectTheOne : false
    , autoSelectFlag : false
    , store : null
    , initComponent : function(){
        var me = this;
        if(Ext.isEmpty(me.ssId)){
            throw 'ssId must not be null';
        }
        me.store = Ext.create('Ext.data.TreeStore',{
        	extend : 'Ext.data.TreeStore',
        	proxy : {
        		type : 'ajax',
        		url : 'getInstTree.ajax?f=*.0203.getInstTree',
        		reader : {
        			type : 'json'
        		}
        		,extraParams : {ssId : me.ssId}
        	},
        	root : {
        		text : '',
        		expanded : false
        	},
        	listeners: {
        		load: function( theStore, node, records, successful, eOpts ){
        			var root = theStore.getRootNode();
        			if(me.autoSelectTheOne && root && root.childNodes && root.childNodes.length==1){
        				var firstNode=root.childNodes[0];
        				if(firstNode.data['leaf']){
        					//仅有一个成员
        					me.autoSelectFlag = true
        					me.setValue(firstNode.data['id']);
        				}
        			}
        			me.autoSelectFlag = false;  // 为change提供标识位
        		}
        	}
        	
        }) 
        var picker = me.getPicker();
        picker.expandNode(picker.getRootNode());
        me.callParent(arguments);
    }
});