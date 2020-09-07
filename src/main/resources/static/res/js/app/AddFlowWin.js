Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.ux.window.Notification',
    'Ext.ux.jes.NotOnlySpaceText'
]);
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

Ext.define('Sys.app.AddFlowWin', {
	extend :'Ext.window.Window',
	width : 300,
	height: 210,
	layout: 'fit',
	buttonAlign:'center',
	bodyPadding : 2,
	constrainHeader: true,
	items:{  
			xtype:'form', 
			items: [{
		    		xtype: 'nostextfield',
		    		fieldLabel: '流程编号',
		    		afterLabelTextTpl : required,
		    		allowBlank: false,
		    		name: 'flowId',
		    		regex : /^\w+$/,
		    		validator:function(value){
		    			if(value.length<20){
		    				return true;
		    			}else{
		    				return '流程编号过长！';
		    			}
		    		}
			},{
					xtype: 'nostextfield',
					fieldLabel: '流程名称',
					afterLabelTextTpl : required,
					allowBlank: false,
					name: 'flowName',
					regex : /^[-_\u4E00-\u9FA5a-zA-Z0-9]+$/,
					regexText : '输入的内容不能为空或者包含空格！',
					validator:function(value){
		    			if(value.length<50){
		    				return true;
		    			}else{
		    				return '流程名称过长！';
		    			}
		    		}
			},{
				xtype: 'nostextfield',
				fieldLabel: '第一步',
				allowBlank: false,
				name: 'firstStep'
		}]
	},
	buttons:[{
		text : '保  存',
		name : 'submit'
	}]
});
