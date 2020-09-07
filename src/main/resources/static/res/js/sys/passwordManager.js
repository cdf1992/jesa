Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.ux.window.Notification'
])

Ext.onReady(function(){
	var userStore = Ext.create('Ext.data.Store',{
		fields:['USER_ID', 'USER_CNAME', 'MOBILE','EMAIL','TEL','DEPART_NAME'
		        ,'INST_NAME'],
		proxy:{
			type: 'ajax',
			url: 'getUserByPasswordInited.ajax?f=BSYS.0402',
			reader:{
				type:'json',
				root:'users'
			}
		}
	});
	userStore.load();
	
	Ext.create('Ext.container.Viewport',{
		layout:'border',
		items:[{
				region:'center',
				xtype:'gridpanel',
				title:'用户密码重置',
				layout:'fit',
				name: 'userGrid',
				selType : 'checkboxmodel',
				selModel:{mode :'SIMPLE'},
				store: userStore,
				columns:[
					{ header: '序号', xtype: 'rownumberer', width:40, align: 'center'},
					{ text: '用户编号', align: 'center', width: 65,dataIndex: 'USER_ID'},
					{ text: '用户中文名', align: 'center', dataIndex: 'USER_CNAME'},
					{ text: '座机号', align: 'center', dataIndex: 'TEL'},
					{ text: '手机号', align: 'center', dataIndex: 'MOBILE'},
					{ text: '邮箱', align: 'center', dataIndex: 'EMAIL'},
					{ text: '部门名称', align: 'center', dataIndex: 'DEPART_NAME'},
					{ text: '机构名称', align: 'center', dataIndex: 'INST_NAME'},
					{ 
						text: '设为默认密码', 
						align: 'center', 
						xtype: 'actioncolumn',
						iconCls: 'recover-icon',
						handler: function(grid, rowIndex) {
							var userId = grid.getStore().getAt(rowIndex).get('USER_ID');
							Ext.MessageBox.confirm('提示','确定要给['+userId+']用户的密码初始化吗？',function(obj){
								if(obj=='yes'){
									Ext.Ajax.request({
										url:'changePasswordInited.ajax?f=BSYS.0402.edit',
										params:{
											userId: userId
										},
										success: function(response) {
											var text = Ext.decode(response.responseText);
											if(text=="1"){
												userStore.load();
												Ext.create('widget.uxNotification', {html: '用户['+userId+']'+'申请已成功提交！'}).show();
											}else{
												Ext.MessageBox.alert('提示','操作出现异常！');
											}
										}
						    		});
								}
							});
						}
					}
				]
		}]
	});
});