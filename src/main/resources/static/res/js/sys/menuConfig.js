Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.ux.window.Notification',
	'Ext.layout.container.Border',
    'Ext.picker.Date',
    'Ext.ux.jes.PagingToolbar'
]);

Ext.onReady(function(){
	 
	var menuStore = Ext.create('Ext.data.Store',{
		fields : ['MENU_ID','MENU_NAME', 'PARENT_ID','PARENTNAME', 'DISPLAY', 'SYS_ADMIN_ONLY', 'SS_ADMIN_ONLY','SHOW_TYPE', 'SS_NAME','SS_ID'],
		autoLoad:true,
		proxy:{
			type:'ajax',
			url: 'getMenuList.ajax?f=BSYS.0104',
			reader:{
				type:'json',
				root:'menuList',
				totalProperty:'count'
			}
		}
	});
	//menuStore.loadPage(1);
	var ssStore = Ext.create('Ext.data.Store',{
		fields : ['ssId','ssName'],
		data : allSs
	});
	var pagebar = new Ext.ux.jes.PagingToolbar({
		store:menuStore,
		displayInfo:true,
		displayMsg:menuConfig_dtd/*'第{0}条到第{1}条-共{2}条'*/,
		emptyMsg:menuConfig_mycxd/*'没有查询到相关的菜单信息'*/
	});
	Ext.create('Ext.container.Viewport',{
		layout:'fit',
		items:[{
			xtype:'gridpanel',
			title:menuConfig_cdxxpz/*'菜单信息配置'*/,
			tbar:[{
				xtype:'tbspacer',
				width:20
			},{
            	xtype: 'combobox',
            	labelWidth:60,
            	name: 'f.t.ss_id:eq',
            	store: ssStore,
            	displayField: 'ssName',
	       	    valueField: 'ssId',
	       	    value: '',
            	fieldLabel: menuConfig_ssxt/*'所属系统'*/,
            	itemId: 'ssId_combo',
            	editable:false
			},{
				xtype : 'tbspacer',
				width : 40
			}, {
				labelWidth:60,
				fieldLabel: menuConfig_cdmc/*'菜单名称'*/,
				xtype : 'textfield',
				name: 'f.t.menu_name:like'
			},  {
				xtype : 'tbspacer',
				width : 40
			},{
				text : menuConfig_cx/*'查询'*/,
				iconCls : "search-icon",
				handler : function() {
							var me = this;
							var params={};
		    		        var fs=Ext.ComponentQuery.query('field', me.up('toolbar'));
			    			for(var i in fs){
		    					params[fs[i].name]=fs[i].getValue();
			    			}
			    			var f = Ext.ComponentQuery.query('combobox',this.up('tbar'));
			    			for(var i in f){
			    				if(f[i].name=='f.t.ss_id:eq')
			    					params[f[i].name]=f[i].value;
			    			}
			    			menuStore.proxy.extraParams =params;
			    			menuStore.loadPage(1);
						}
			}],
			bbar:pagebar,
			store:menuStore,
			forceFit:true,
			scrollOffset:0,
			columns:[{header: menuConfig_xh/*'序号'*/, xtype: 'rownumberer', width:35, align: 'center'},
			         { text: menuConfig_cdmc/*'菜单名称'*/, width: 120,  dataIndex: 'MENU_NAME'
			         },
					 { text: menuConfig_sjcdmc/*'上级菜单名称'*/, width: 120, align: 'center', dataIndex: 'PARENTNAME'},
					 { text: menuConfig_sfxs/*'是否显示'*/, width: 150, align: 'center', dataIndex: 'DISPLAY',xtype:'actioncolumn',
						 items:[{getClass:function(v){
							 if(v=='Y'){
									return 'success-icon';
								}else{
									return 'cancel-icon';
								}
						 }, 
						 handler: function(grid, rowIndex, colIndex) {							 
			                	var code=grid.getStore().getAt(rowIndex).get('DISPLAY');
			                	var temp=null;
			                	if(code=='Y'){
			                		temp='N';
			                	}else{
			                		temp='Y';
			                	}
			                	Ext.Ajax.request({
			                		url:'changMenu.ajax?f=BSYS.0104',
			                		params:{
			                			menuId:grid.getStore().getAt(rowIndex).get('MENU_ID'),
			                			ssId:grid.getStore().getAt(rowIndex).get('SS_ID'),
			                			display:temp,
			                			sysAdminOnly:grid.getStore().getAt(rowIndex).get('SYS_ADMIN_ONLY'),
			                			ssAdminOnly:grid.getStore().getAt(rowIndex).get('SS_ADMIN_ONLY')
			                		},
			                		success:function(response){
			                			var text=Ext.decode(response.responseText);
			                			if(text=='1'){
			                				grid.getStore().getAt(rowIndex).data.DISPLAY=temp;
			                				grid.refresh();
			                				jesAlert(menuConfig_czcg/*'操作成功！'*/);
			                			}else{
			                				Ext.Msg.alert(menuConfig_ts/*'提示'*/,menuConfig_czsb/*'操作失败'*/);
			                			}
			                		}
			                	});
			                }
						 
						 }]
					 },
					 { text: menuConfig_kjgly/*'科技管理员'*/, width: 150, align: 'center', dataIndex: 'SYS_ADMIN_ONLY',xtype:'actioncolumn',
						 items:[{getClass:function(v){
							 if(v=='Y'){
									return 'success-icon';
								}else{
									return 'cancel-icon';
								}
						 }, handler: function(grid, rowIndex, colIndex) {
			                	var code=grid.getStore().getAt(rowIndex).get('SYS_ADMIN_ONLY');
			                	var temp=null;
			                	if(code=='Y'){
			                		temp='N';
			                	}else{
			                		temp='Y';
			                	}
			                	Ext.Ajax.request({
			                		url:'changMenu.ajax?f=BSYS.0104',
			                		params:{
			                			menuId:grid.getStore().getAt(rowIndex).get('MENU_ID'),
			                			ssId:grid.getStore().getAt(rowIndex).get('SS_ID'),
			                			display:grid.getStore().getAt(rowIndex).get('DISPLAY'),
			                			sysAdminOnly:temp,
			                			ssAdminOnly:grid.getStore().getAt(rowIndex).get('SS_ADMIN_ONLY')
			                		},
			                		success:function(response){
			                			var text=Ext.decode(response.responseText);
			                			if(text=='1'){
			                				grid.getStore().getAt(rowIndex).data.SYS_ADMIN_ONLY=temp;
			                				grid.refresh();
			                				jesAlert(menuConfig_czcg/*'操作成功！'*/);
			                			}else{
			                				Ext.Msg.alert(menuConfig_ts/*'提示'*/,menuConfig_czsb/*'操作失败'*/);
			                			}
			                		}
			                	});
			                }}]
					 },
					 { text: menuConfig_ywgly/*'业务管理员'*/, width: 150, align: 'center', dataIndex: 'SS_ADMIN_ONLY',xtype:'actioncolumn',
						 items:[{getClass:function(v){
							 if(v=='Y'){
									return 'success-icon';
								}else{
									return 'cancel-icon';
								}
						 }, handler: function(grid, rowIndex, colIndex) {
			                	var code=grid.getStore().getAt(rowIndex).get('SS_ADMIN_ONLY');
			                	var temp=null;
			                	if(code=='Y'){
			                		temp='N';
			                	}else{
			                		temp='Y';
			                	}
			                	
			                	Ext.Ajax.request({
			                		url:'changMenu.ajax?f=BSYS.0104',
			                		params:{
			                			menuId:grid.getStore().getAt(rowIndex).get('MENU_ID'),
			                			ssId:grid.getStore().getAt(rowIndex).get('SS_ID'),
			                			display:grid.getStore().getAt(rowIndex).get('DISPLAY'),
			                			sysAdminOnly:grid.getStore().getAt(rowIndex).get('SYS_ADMIN_ONLY'),
			                			ssAdminOnly:temp
			                		},
			                		success:function(response){
			                			var text=Ext.decode(response.responseText);
			                			if(text=='1'){
			                				grid.getStore().getAt(rowIndex).data.SS_ADMIN_ONLY=temp;
			                				grid.refresh();
			                				jesAlert(menuConfig_czcg/*'操作成功！'*/);
			                			}else{
			                				Ext.Msg.alert(menuConfig_ts/*'提示'*/,menuConfig_czsb/*'操作失败'*/);
			                			}
			                		}
			                	});
			                }}]
					 },
					 { text:menuConfig_sfzdzk/*'是否自动展开'*/, width: 150, align: 'center', dataIndex: 'SHOW_TYPE',xtype:'actioncolumn',
						 items:[{
							 getClass : function(v, m, r){
							 	if(Ext.isEmpty(r.data.PARENT_ID)){
									 if(v=='Y'){
										return 'success-icon';
									 }else{
										return 'cancel-icon';
									 }
							 	}else{
							 		 return '';
							 	} 
						 }, handler: function(grid, rowIndex, colIndex) {
			                	var parentId=grid.getStore().getAt(rowIndex).get('PARENT_ID');
			                	var code=grid.getStore().getAt(rowIndex).get('SHOW_TYPE');
			                	var temp=null; 
			                	if(Ext.isEmpty(parentId)){
			                		if(code=='Y'){
				                		temp='N';
				                	}else{
				                		temp='Y';
				                	}
							 	}else{
			                		return false;
							 	}
			                	
			                	Ext.Ajax.request({
			                		url:'changMenu.ajax?f=BSYS.0104',
			                		params:{
			                			menuId:grid.getStore().getAt(rowIndex).get('MENU_ID'),
			                			ssId:grid.getStore().getAt(rowIndex).get('SS_ID'),
			                			display:grid.getStore().getAt(rowIndex).get('DISPLAY'),
			                			sysAdminOnly:grid.getStore().getAt(rowIndex).get('SYS_ADMIN_ONLY'),
			                			ssAdminOnly:grid.getStore().getAt(rowIndex).get('SS_ADMIN_ONLY'),
			                			showType:temp
			                		},
			                		success:function(response){
			                			var text=Ext.decode(response.responseText);
			                			if(text=='1'){
			                				grid.getStore().getAt(rowIndex).data.SHOW_TYPE=temp;
			                				grid.refresh();
			                				jesAlert(menuConfig_czcg/*'操作成功！'*/);
			                			}else{
			                				Ext.Msg.alert(menuConfig_ts/*'提示'*/,menuConfig_czsb/*'操作失败'*/);
			                			}
			                		}
			                	});
			                }}]
					 },
					 { text: menuConfig_xt/*'系统'*/, width: 150, align: 'center', dataIndex: 'SS_NAME'}]
		}]
	});
});
