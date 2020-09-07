Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*',
    'Ext.window.Window',
    'Ext.ux.window.Notification',
    'Sys.app.SsConfigWin'
]);

Ext.onReady(function(){
	var subStore = Ext.create('Ext.data.TreeStore',{
		fields:['id','text','ssId','ssName', 'ssOuterUrl', 'ssInnerUrl', 'ssRunningState', 'ssMenuVisible', 'ssIcon','ssDeafultPage'],
		proxy:{
			type: 'ajax',
			url: 'listSubSystem.ajax?f=BSYS.0102',
			reader:{
				type:'json'
			}
		}
	});
	subStore.load();
	
	var userStore = Ext.create('Ext.data.TreeStore', {
		
		proxy : {
			type : 'ajax',
			url  : 'getUserTree.ajax?f=BSYS.0102',
			reader : {
				type : 'json'
			}
		},
		root: {
	        expanded: true
	    }
	});
	
	var ssAdminStore = Ext.create('Ext.data.Store',{
		fields:['SS_ID', 'USER_ID', 'SS_NAME', 'USER_CNAME', 'ADMIN_LEVEL','TECH_ADMIN','BUS_ADMIN'],
		proxy:{
			type: 'ajax',
			url: 'listSsAdmin.ajax?f=BSYS.0102',
			reader:{
				type:'json',
				root:'listSsAdmin'
			}
		}
	});
	
	Ext.create('Ext.container.Viewport',{
		layout: 'fit',
		items:[{
				xtype:'treepanel',
				rootVisible: false,
				title:ssConfig_zxtxxpz/*子系统信息配置*/,
				tbar : [{
						xtype : 'tbspacer',
						width : 20
						},ssConfig_xtywm/*'系统英文名'*/, {
							xtype : 'field',
							name: 'f.ss_id:like',
							allowBlank: false
						}, {
							xtype : 'tbspacer',
							width : 40
						}, ssConfig_xtzwm/*'系统中文名'*/, {
							xtype : 'field',
							name : 'f.ss_name:like',
							allowBlank: false
						},{
							xtype : 'tbspacer',
							width : 10
						},{
							text : ssConfig_chaxun/*'查询'*/,
							iconCls : "search-icon",
							handler : function() {
										var me = this;
										var params={};
					    		        var fs=Ext.ComponentQuery.query('field', me.up('toolbar')); 
						    			for(var i in fs){
					    					params[fs[i].name]=fs[i].getValue();
						    			}
					    				subStore.proxy.url='querySub.ajax?f=BSYS.0102';
					    				subStore.proxy.extraParams =params;
					    				subStore.load();
					    				subStore.on('load',function(){
					    					if(subStore.getCount()==0){
					    						Ext.MessageBox.alert(ssConfig_tishi/*'提示'*/,ssConfig_wxgxx/*'无相关信息！'*/);
					    					}
					    				});
									}
						}],
				store : subStore,
				columns:[
				         { text: ssConfig_xtywm/*'系统英文名'*/, width: 200, xtype: 'treecolumn',  dataIndex: 'text'},
					     { text: ssConfig_xtwwdz/*'系统外网地址'*/, flex: 1,  dataIndex: 'ssOuterUrl'},
					     { text: ssConfig_xtnwdz/*'系统内网地址'*/, flex: 1,  dataIndex: 'ssInnerUrl'},
					     { text: ssConfig_mrym/*'默认页面'*/, flex: 1,  dataIndex: 'ssDeafultPage'},
					     { 
					    	 text: ssConfig_weihu/*'维护'*/, 
					    	 width: 80, 
					    	 align: 'center', 
					    	 renderer : function(val) {
				                    if (val=="Y") {
				                        return '<span style="color:green;">'+ssConfig_shi/*是*/+'</span>';
				                    } else if (val == "N") {
				                        return '<span style="color:red;">'+ssConfig_fou/*否*/+'</span>';
				                    }
				                    return val;
				             },
					    	 dataIndex: 'ssRunningState'
					     },{ 
					    	 text: ssConfig_xianshi/*'显示'*/, 
					    	 width: 60, 
					    	 align: 'center', 
					    	 renderer : function(val) {
				                    if (val=="Y") {
				                        return '<span style="color:green;">'+ssConfig_shi/*是*/+'</span>';
				                    } else if (val == "N") {
				                        return '<span style="color:red;">'+ssConfig_fou/*否*/+'</span>';
				                    }
				                    return val;
				             },
					    	 dataIndex: 'ssMenuVisible'
					     },{ 
					    	 text: ssConfig_chakan/*'查看'*/, 
					    	 xtype : 'actioncolumn',
					    	 align: 'center',
					    	 width: 60,
					    	 iconCls: "look-icon",
					    	 handler: function(grid, rowIndex) {
					    		 var w = new Sys.app.SsConfigWin();
					    		 w.setTitle(ssConfig_zxtxxxx/*'子系统详细信息'*/);
					    		 w.down('button[name=submit]').hide();
					    		 var ssId = grid.getStore().getAt(rowIndex).get('ssId');
					    		 var ssName = grid.getStore().getAt(rowIndex).get('ssName');
					    		 var ssOuterUrl = grid.getStore().getAt(rowIndex).get('ssOuterUrl');
					    		 var ssInnerUrl = grid.getStore().getAt(rowIndex).get('ssInnerUrl');
					    		 var ssRunningState = grid.getStore().getAt(rowIndex).get('ssRunningState');
					    		 var ssMenuVisible = grid.getStore().getAt(rowIndex).get('ssMenuVisible');
					    		 var ssDeafultPage = grid.getStore().getAt(rowIndex).get('ssDeafultPage');
					    		 w.down('textfield[name=ssId]').setValue(ssId).readOnly=true;
					    		 w.down('textfield[name=ssName]').setValue(ssName).readOnly=true;
					    		 w.down('textfield[name=ssOuterUrl]').setValue(ssOuterUrl).readOnly=true;
					    		 w.down('textfield[name=ssInnerUrl]').setValue(ssInnerUrl).readOnly=true;
					    		 w.down('textfield[name=ssDeafultPage]').setValue(ssDeafultPage).readOnly=true;
					    		 w.down('checkboxfield[name=ssRunningState]').setValue(ssRunningState).readOnly=true;
					    		 w.down('checkboxfield[name=ssMenuVisible]').setValue(ssMenuVisible).readOnly=true;
					    		 w.show();
					    	 }
					     },{ 
					    	 text: ssConfig_xiugai/*'修改'*/, 
					    	 xtype : 'actioncolumn',
					    	 align: 'center',
					    	 width: 60,
					    	 iconCls: 'edit-icon',
					    	 handler: function(grid, rowIndex) {
					    		 var w = new Sys.app.SsConfigWin();
					    		 w.setTitle(ssConfig_xgzxtxx/*'修改子系统信息'*/);
					    		 var ssId = grid.getStore().getAt(rowIndex).get('ssId');
					    		 var ssName = grid.getStore().getAt(rowIndex).get('ssName');
					    		 var ssOuterUrl = grid.getStore().getAt(rowIndex).get('ssOuterUrl');
					    		 var ssInnerUrl = grid.getStore().getAt(rowIndex).get('ssInnerUrl');
					    		 var ssRunningState = grid.getStore().getAt(rowIndex).get('ssRunningState');
					    		 var ssMenuVisible = grid.getStore().getAt(rowIndex).get('ssMenuVisible');
					    		 var ssDeafultPage = grid.getStore().getAt(rowIndex).get('ssDeafultPage');
					    		 w.down('textfield[name=ssId]').setValue(ssId).readOnly=true;
					    		 w.down('textfield[name=ssId]').setFieldStyle('background:#f1f1f1');
					    		 w.down('textfield[name=ssName]').setValue(ssName);
					    		 w.down('textfield[name=ssOuterUrl]').setValue(ssOuterUrl);
					    		 w.down('textfield[name=ssInnerUrl]').setValue(ssInnerUrl);
					    		 w.down('textfield[name=ssDeafultPage]').setValue(ssDeafultPage);
					    		 w.down('checkboxfield[name=ssRunningState]').setValue(ssRunningState);
					    		 w.down('checkboxfield[name=ssMenuVisible]').setValue(ssMenuVisible);
					    		 if(ssId=='BSYS'){
					    		 	var chb=w.down('checkboxfield[name=ssMenuVisible]');
					    		 	chb.setVisible(false);
					    		 }
					    		 w.down('button[name=submit]').setHandler(function(){
										var form = w.down('form');
										if(form.isValid()) {
											form.submit({
												url : 'editSsConfig.ajax?f=BSYS.0102.edit',
												success:function(form,action){
													var text=action.result.success;
													if(text=='true'){
														w.close();
														jesAlert(ssConfig_xgcg/*'修改成功！'*/);
														subStore.load();
													}else{
														w.close();
														jesErrorAlert(ssConfig_xgsb/*'修改失败！'*/);
													}
												}
											});
										}
					    		 });
					    		 w.show();
					    	 }
					     },{
					    	 text: ssConfig_szgly/*'设置管理员'*/, 
					    	 xtype : 'actioncolumn',
					    	 align: 'center',
					    	 width: 75,
					    	 iconCls: 'setting-icon', 
					    	 handler: function(grid, rowIndex) {
					    		 var ssId = grid.getStore().getAt(rowIndex).get('ssId');
					    		 var ssName = grid.getStore().getAt(rowIndex).get('ssName');
					    		 ssAdminStore.proxy.extraParams.ssId=ssId;
					    		 ssAdminStore.load({
					    			 callback:function(){
					    				 Ext.create('Ext.window.Window', {
								    			title: ssConfig_pzgly/*'配置管理员'*/,
								    			width : 750,
								    			height : 400,
								    			constrainHeader: true,
								    			buttonAlign:'center',
								    			layout: {
										        	type: 'hbox',
										            align: 'stretch'
										        },
								    			tbar: [{
								    						xtype : 'tbspacer',
								    						width : 10
								    						}, {
								    							xtype : 'displayfield',
								    							fieldLabel:ssConfig_zxtmc/*'子系统名称'*/,
								    							labelWidth:70,
								    							name: 'ssName',
								    							value: ssName
								    						},{
								    							xtype : 'tbspacer',
									    						width : 40
								    						},{
								    							xtype: 'combobox',
								    							fieldLabel:ssConfig_glyyxj/*'管理员优先级'*/,
								    							labelWidth:80,
								    							name: 'adminLevel',
								    							store: [1,2,3],
								    							value: 1,
								    							width:130
								    						},{
									    						xtype : 'tbspacer',
									    						width : 10
									    					},{
								    							xtype: 'checkboxfield',
								    							fieldLabel: ssConfig_sfkjgly/*'是否科技管理员'*/,
								    							name: 'techAdmin',
								    							labelWidth:90,
								    							checked: true,
								    							inputValue : 'Y',
								    							uncheckedValue : 'N'
								    						},{
									    						xtype : 'tbspacer',
									    						width : 10
									    					},{
								    							xtype: 'checkboxfield',
								    							fieldLabel: ssConfig_sfywgly/*'是否业务管理员'*/,
								    							name: 'busAdmin',
								    							labelWidth:90,
								    							checked:true,
								    							inputValue : 'Y',
								    							uncheckedValue : 'N'
								    						},{
									    						xtype : 'tbspacer',
									    						width : 30
									    					}
								    				],
								    			items: [{
								    					xtype: 'treepanel',
								    					flex:3,
								    					height: 400,
								    			    	title: ssConfig_zhyh/*'总行用户（双击可新增管理员）'*/,
								    			    	rootVisible:false,
								    			    	id: 'user_tree',
								    			    	store: userStore,
								    			    	listeners:{
								    			    		itemdblclick:function( tree, record, item, index, e, eOpts ) {
								    			    			var userId = record.raw.id;
								    							var instId = record.parentNode.raw.id;
								    							if('root'!=instId) {
								    								var me = this;
								    								var adminLevel = null;
						    										var techAdmin = null;
						    										var busAdmin = null;
						    										var fields = Ext.ComponentQuery.query('field', me.up('tbar'));
						    										for(var i in fields) {
						    											if(fields[i].name=='adminLevel'){
						    												adminLevel = fields[i].getValue();
						    											}else if(fields[i].name=='techAdmin'){
						    												techAdmin = fields[i].getValue();
						    											}else if(fields[i].name=='busAdmin') {
						    												busAdmin = fields[i].getValue();
						    											}
						    										}
						    										Ext.Ajax.request({
																		url: 'addSsAdmin.ajax?f=BSYS.0102.add',
																		params:{
																			ssId: ssId,
																			userId: userId,
																			adminLevel: adminLevel,
																			techAdmin: techAdmin,
																			busAdmin: busAdmin
																		},
																		success: function(response) {
																			var text=Ext.decode(response.responseText);
																			if(text=="1") {
																				Ext.create('widget.uxNotification', {html: ssConfig_cgtjgly/*'成功添加管理员！'*/}).show();
																				ssAdminStore.load();
																			}else{
//                                                                                  alert("tet"+text);
																				Ext.MessageBox.alert(ssConfig_tishi1/*'提示1'*/,ssConfig_tjsb/*'添加失败！管理员已存在！'*/);
																			}
						    											}
						    										});
								    							}
								    			    		}
								    			    	}
								    				},{
								    					xtype: 'gridpanel',
								    					flex:7,
								    					height: 400,
								    			    	title: ssConfig_gly/*'管理员'*/,
								    			    	store: ssAdminStore,
								    			    	columns:[{
								    						text: ssConfig_xtbh/*'系统编号'*/,
								    						align: 'center',
								    						dataIndex: 'SS_ID'
								    					},{
								    						text: ssConfig_yhmc/*'用户名称'*/,
								    						align: 'center',
								    						dataIndex: 'USER_CNAME'
								    					},{
								    						text: ssConfig_glyyxj/*'管理员优先级'*/,
								    						align: 'center',
								    						dataIndex: 'ADMIN_LEVEL'
								    					},{
								    						text: ssConfig_kjgl/*'科技管理'*/,
								    						align: 'center',
								    						renderer : function(val) {
											                    if (val=="Y"){
											                        return '<span style="color:green;">'+ssConfig_shi/*是*/+'</span>';
											                    } else{
											                        return '<span style="color:red;">'+ssConfig_fou/*否*/+'</span>';
											                    }
											                    return val;
								    						},
								    						dataIndex: 'TECH_ADMIN',
								    						width: 70
								    					},{
								    						text: ssConfig_ywgl/*'业务管理'*/,
								    						align: 'center',
								    						renderer : function(val) {
											                    if (val=="Y") {
											                        return '<span style="color:green;">'+ssConfig_shi/*是*/+'</span>';
											                    } else{
											                        return '<span style="color:red;">'+ssConfig_fou/*否*/+'</span>';
											                    }
											                    return val;
								    						},
								    						dataIndex: 'BUS_ADMIN',
								    						width: 70
								    					},{
								    						text: ssConfig_shanchu/*'删除'*/, 
								    						align: 'center',
								    						width: 50,
								    				    	xtype : 'actioncolumn',
								    				    	iconCls: 'delete-icon',
								    				    	handler:function(grid, rowIndex) {
								    				    		var ssId = grid.getStore().getAt(rowIndex).get('SS_ID');
													    		var userId = grid.getStore().getAt(rowIndex).get('USER_ID');
													    		Ext.MessageBox.confirm(ssConfig_tishi/*'提示'*/,ssConfig_nqdyscm/*'您确定要删除吗?'*/,function(obj) {
																	if(obj=='yes'){
																		Ext.Ajax.request({
																			url: 'deleteSsAdmin.ajax?f=BSYS.0102.remove',
																			params:{
																				ssId: ssId,
																				userId: userId
																			},
																			success: function(response) {
																				var text=Ext.decode(response.responseText);
																				if(text=="1") {
																					Ext.create('widget.uxNotification', {html: ssConfig_cgscgly/*'成功删除管理员！'*/}).show();
																					ssAdminStore.load();
																				}
																			}
																		});
																	}
																});
								    				    	}
								    					}]
								    				}]
								    		 }).show();
					    			 }
					    		 });
					    		 
					    	 }
					     }
				]
		}]
	});
});
