Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.ux.window.Notification',
    'Ext.ux.jes.NotOnlySpaceText'
]);

Ext.define('Sys.app.RoleManagerWin', {
	extend : 'Ext.window.Window',
	width: 300,
	layout: 'fit',
	constrainHeader: true,
	buttonAlign:'center',
	bodyPadding : 2,
	items:{
			xtype : 'form',
			frame : true,
			items: [{
		    		xtype: 'displayfield',
		    		fieldLabel: roleManagerWin_xtmc/*'系统名称'*/,
		    		name:'ssName'
				},{
					xtype: 'nostextfield',
					fieldLabel: roleManagerWin_jsbh/*'角色编号'*/,
					name:'roleId',
					maxLength:20,
					allowBlank: false,
					regexText : roleManagerWin_bnhyfhhzw/*'不能含有特殊符号和中文'*/,
					regex : /^\w+$/
				},{
					xtype: 'nostextfield',
					fieldLabel: roleManagerWin_jsmc/*'角色名称'*/,
					allowBlank: false,
					maxLength:30,
					name: 'roleName',
					regex : /^[-_\u4E00-\u9FA5a-zA-Z0-9]+$/,
					regexText : roleManagerWin_bnhytsfh/*'不能含有特殊符号'*/
				},{
					xtype: 'checkboxfield',
					fieldLabel: roleManagerWin_sfjzhsy/*'是否仅总行用'*/,
					name: 'headquartersFlag',
					inputValue : 'Y',
					uncheckedValue : 'N'
				},{
					xtype: 'checkboxfield',
					fieldLabel: roleManagerWin_sfqy/*'是否启用'*/,
					name: 'enabled',
					checked: true,
					inputValue : 'Y',
					uncheckedValue : 'N',
					hidden:true
					
				},{
					xtype:'textareafield',
					hidden: true,
					name:'ssId'
				}]
	},
	buttons:[{
			text : roleManagerWin_bc/*'保  存'*/,
			name : 'submit'
		}]
});