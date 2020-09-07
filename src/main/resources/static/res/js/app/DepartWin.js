Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.ux.window.Notification',
    'Ext.ux.jes.NotOnlySpaceText'
]);
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('Sys.app.DepartWin', {
	extend : 'Ext.window.Window',
	width : 300,
	layout: 'fit',
	buttonAlign:'center',
	bodyPadding : 2,
	constrainHeader: true,
	items:{
			xtype : 'form',
			autoScroll: true,
			items: [{
		    		xtype: 'nostextfield',
		    		fieldLabel: departmentWin_bmbh/*'部门编号'*/,
		    		afterLabelTextTpl : required,
		    		allowBlank: false,
		    		name: 'departId',
		    		regex : /^\w+$/,
		    		validator:function(value){
		    			if(value.length<20){
		    				return true;
		    			}else{
		    				return departmentWin_bmbhgc/*'部门编号过长！'*/;
		    			}
		    		}
			},{
					xtype: 'nostextfield',
					fieldLabel: departmentWin_bmmc/*'部门名称'*/,
					afterLabelTextTpl : required,
					allowBlank: false,
					name: 'departName',
					regex : /^[-_\u4E00-\u9FA5a-zA-Z0-9]+$/,
					regexText : departmentWin_bnbhkg/*'输入的内容不能为空或者包含空格！'*/,
					validator:function(value){
		    			if(value.length<50){
		    				return true;
		    			}else{
		    				return departmentWin_bmmcgc/*'部门名称过长！'*/;
		    			}
		    		}
			},{
					xtype: 'checkboxfield',
					fieldLabel: departmentWin_sfzhty/*'是否总行特有'*/,
					name: 'headquartersOnly',
					inputValue : 'Y',
					uncheckedValue : 'N'
			},{
					xtype: 'checkboxfield',
					fieldLabel: departmentWin_sfglhty/*'是否管理行特有'*/,
					name: 'managerOnly',
					inputValue : 'Y',
					uncheckedValue : 'N'
			}]
	},
	buttons:[{
		text : departmentWin_bc/*'保  存'*/,
		name : 'submit'
	}]
});