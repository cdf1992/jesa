Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.window.Window',
    'Ext.ux.window.Notification'
]);

Ext.define('Sys.app.SsConfigWin', {
	extend : 'Ext.window.Window',
	width : 400,
	minWidth: 400,
	layout: 'fit',
	constrainHeader: true,
	buttonAlign:'center',
	items:[{
			xtype: 'form',
			frame : true,
			
			autoScorll: true,
			items: [{
					xtype : 'fieldset',
					labelAlign: 'right',
					title : SsConfigWin_xtjbxx/*系统基本信息*/,
					layout: 'form',
					defaultType : 'textfield',
					items:[{
					    		fieldLabel: SsConfigWin_xtywm/*系统英文名*/,
					    		allowBlank: false,
					    		name: 'ssId',
					    		height: 22
							},{
								fieldLabel: SsConfigWin_xtzwm/*系统中文名*/,
								allowBlank: false,
								name: 'ssName',
								height: 22
							},{
								xtype: 'checkboxfield',
								fieldLabel: SsConfigWin_xtsfzwh/*系统是否在维护*/,
								name: 'ssRunningState',
								inputValue : 'Y',
								uncheckedValue : 'N'
							},{
								xtype: 'checkboxfield',
								fieldLabel: SsConfigWin_sfzcdzxs/*是否在菜单中显示*/,
								name: 'ssMenuVisible',
								inputValue : 'Y',
								uncheckedValue : 'N'
							}
						]
					},{
					xtype : 'fieldset',
					layout: 'form',
					title : SsConfigWin_zxtpzxx/*子系统配置信息*/,
					defaultType : 'textfield',
					items:[{
								fieldLabel: SsConfigWin_xtwwdz/*系统外网地址*/,
								allowBlank: false,
								name: 'ssOuterUrl'
							},{
								fieldLabel: SsConfigWin_xtnwdz/*系统内网地址*/,
								allowBlank: false,
								name: 'ssInnerUrl'
							},{
								fieldLabel: SsConfigWin_xtsydz/*系统首页地址*/,
								name: 'ssDeafultPage'
							}]
					}]
		}],
	buttons:[{
		text : SsConfigWin_baocun/*保  存*/,
		name : 'submit'
	}]
});