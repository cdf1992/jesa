Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.window.Window',
    'Ext.ux.window.Notification'
]);

Ext.define('Sys.app.ClusterRegWin', {
	extend : 'Ext.window.Window',
	width : 400,
	height : 300,
	buttonAlign:'center',
	bodyPadding : 2,
	constrainHeader: true,
	layout:'fit',
	items:{
			xtype:'form',
			layout:'form',
			autoScroll:true,
			items: [{
					xtype : 'fieldset',
					layout:'form',
					defaultType : 'textfield',
					items:[{
					    		fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.fwmc")}'/*'服务名称'*/,
					    		name: 'serverName'
							},{
								fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.zj")}'/*'主机'*/,
								name: 'host'
							},{
								fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.dkh")}'/*'端口号'*/,
								name: 'port'
							},{
								fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.yymc")}'/*'应用名称'*/,
								name: 'webAppName'
							},{
								fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.yylj")}'/*'应用路径'*/,
								name: 'storePath'
							},{
								fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.yxms")}'/*'运行模式'*/,
								name: 'runMode'
							},{
								fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.zt")}'/*'状态'*/,
								name: 'status'
							},{
								fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.xtsj")}'/*'心跳时间'*/,
								name: 'haertTime'
							},{
								fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.xx")}'/*'信息'*/,
								name: 'info'
							},{
								fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.xgr")}'/*'修改人'*/,
								name: 'changeUser'
							},{
								fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.xgsj")}'/*'修改时间'*/,
								name: 'changeTime'
							},{
								fieldLabel: '${message("jes.ext.src.vm.ext.clusterRegWin.tbsj")}'/*'同步时间'*/,
								name: 'synchronizationTime'
							}
						]
					}]
		},
	buttons:[{
		text : '${message("jes.WebContent.res.js.app.roleManagerWin.bc")}'/*'保  存'*/,
		name : 'submit'
	}]
});