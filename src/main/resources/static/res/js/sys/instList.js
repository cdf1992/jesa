Ext.require("Sys.app.InstWin");
Ext.require('Ext.ux.window.Notification');

Ext.onReady(function() {
	var treeInstId = null;
	var instsStore=Ext.create('Ext.data.Store',{
		fields:['instId','instName','instSmpName',
				'legalPersonFlag','address','tel','createTime',
				'enabled','description','headquartersFlag','parentInstId',
				'legalPersonCode','startDate','endDate','pbocInstCode','stdInstCode','instLicenceCode'],
		proxy:{
			type:'ajax',
			url:'getInsts.ajax?f=BSYS.0201.getInsts',
			reader:{
				type:'json',
				root:'insts'
			}
		}
	});
	
	instsStore.load({
		params:{
			pId:null
		}
	});
	
	var treeStore = Ext.create('Ext.data.TreeStore', {
				proxy : {
					type : 'ajax',
					url : 'getInstsTree.ajax?f=BSYS.0201.getInstsTree',
					reader : {
						type : 'json'
					}
				},
				root: {
		            expanded: true
		        },
		        autoLoad : true,
		        listeners:{
		        	load:function (me, node, records, successful, eOpts ){
				        	var root = me.getRootNode();
				        	if(root.hasChildNodes()){
					        	var ssNode = root.getChildAt(0);
					        	ssNode.expand();
				        	}
		        	}
		        }
			});

	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		defaults :{
			split :true
		},
		items : [{
				xtype:'treepanel',
				region : 'west',
				collapsible : true,
				title : instList_jgxx,/*机构信息*/
				width : 200,
				height : 150,
				opState:'list',//move
				childNodeName:null,
				newPid:null,
				treeInstId:null,
                rootVisible:false,
				store:treeStore,
				name:'treePanel',
				listeners : {
					itemclick : function(tree, record, item, index, e,eOpts) {
						var opState=record.store.ownerTree.opState || '';
						if(opState=='list'){
							treeInstId=record.raw.id;
							childNodeName=record.raw.text;
							instsStore.proxy.extraParams = {
									pId:record.raw.id
							};
							instsStore.load();
						}else{
							newPid=record.raw.id;
							if(treeStore.getNodeById(newPid).hasChildNodes()){
								treeStore.getNodeById(newPid).collapse();
							}
							if(treeInstId==newPid){
								Ext.Msg.alert(instList_ts/*提示*/,'');/*自己不能移动在本身节点下*/
								record.store.ownerTree.opState='list';
								return;
							}
							Ext.MessageBox.confirm(instList_ts/*提示*/,instList_qdyjjd+'【'+childNodeName+'】'+instList_ydd+'【'+record.raw.text+'】'+instList_jdxm,function(obj){
								                              /*确定要将节点【'+childNodeName+'】移动到【'+record.raw.text+'】节点下吗?*/
								if(obj=='yes'){
									Ext.Ajax.request({
										url:'changePid.ajax?f=BSYS.0201.changePid',
										params:{
											instId:treeInstId,
											parentInstId:newPid
										},
										success:function(response){
											var text=Ext.decode(response.responseText);
											if(text=='1'){
												var oldNode = treeStore.getNodeById(treeInstId);
												treeStore.getNodeById(treeInstId).parentNode.removeChild(oldNode);//将原来的节点删除
												treeStore.getNodeById(newPid).appendChild(oldNode);
												treeStore.getNodeById(newPid).data.leaf=false;
												oldNode.set('cls',null);
												treeStore.getNodeById(newPid).expand();
												record.store.ownerTree.opState='list';
											}else if(text=='2'){
												Ext.Msg.alert(instList_ts/*提示*/,instList_fjdbnyd/*父节点不能移动到子节点下面*/);
												record.store.ownerTree.opState='list';
											}
										}
									});
								}else{
									record.store.ownerTree.opState='list';
								}
							});
						}
					}
				},
				tbar:['->',{
					text : instList_yd,/*移动*/
					iconCls:'hide-right-icon',
					handler:function(){
						var me=this;
						var node=me.up('treepanel').getSelectionModel().getSelection();
						if(node.length>0){
							var n = treeStore.getNodeById(treeInstId);
							node[0].store.ownerTree.opState='move';
							n.set('cls','red');
							jesAlert(instList_yxz+' 【'+n.get('text')+'】'+instList_qjxxz,5000,'t',600);
							          /*已选择 【'+n.get('text')+'】,请继续选择它的新上级机构.点击【刷新】取消选择和移动。*/
						}else{
							jesAlert(instList_qxzydjd);/*请选择要移动的节点*/
						}
					}
				}, {
					text : instList_sx,/*刷新*/
					iconCls : "refresh-icon",
					handler:function(){
						treeStore.ownerTree.opState='list';
						Ext.Ajax.request({
						url : 'refreshInstCache.ajax?f=BSYS.0201',
						success:function(){
							treeStore.load();
						}
					});}
				}]
			}, {
			region : 'center',
			xtype : 'gridpanel',
			title : instList_dqwz+'：'+path,/*当前位置*/
			tbar : {
				xtype : 'container',
				items : [
					new Ext.form.Panel({
						items:[
				         new Ext.Toolbar({
									items : [' ',instList_qsrjgmc+':',{/*请输入机构名称*/
												xtype : 'textfield',
												name : 'f.inst_name:like'
											},{
												xtype:'textfield',
												name:'f.inst_smp_name:like',
												fieldLabel:instList_jgjc,/*机构简称*/
												labelAlign:'right'
											
											}, {
												text : instList_cx,/*查询*/
												iconCls : "search-icon",
												handler:function(){
													var me=this;	
													var params={};
								    		        var fs=Ext.ComponentQuery.query('textfield', me.up('toolbar'));  
									    			for(var i in fs){
									    				params[fs[i].name]=fs[i].getValue();
									    			}
									    			params['flag']='query';
									    			instsStore.proxy.extraParams =params;
													instsStore.load();
												}
											}]
								})
				         ]})
				         , new Ext.Toolbar({
									items : [{
												text : instList_xztj,/*新增同级*/
												iconCls : "add-icon",
												hidden:hasChance=='no',
												instWin:null,
												handler:function(me){
													this.instWin=new Sys.app.InstWin();
													this.instWin.setProperty('add');
													if(treeInstId){
														
														this.instWin.down('datefield[name=endDate]').setVisible(false);
														this.instWin.down('datefield[name=startDate]').setVisible(false);

														var tree = me.up('viewport').down('treepanel[name=treePanel]').getSelectionModel().getSelection();
														var parentInstId = tree[0].parentNode.get('id');
														if (parentInstId == 'root') {
															parentInstId = '';
															this.instWin.down('textfield[name=parentInstId]').setVisible(false);
														}
														this.instWin.down('textfield[name=parentInstId]').setValue(parentInstId);
														this.instWin.down('button[name=submit]').setHandler(function(){
	 													 	var w=this.up('window');
	 													 	//看是否选中了为法人机构
	 													 	var boxs=w.down('#checkboxgroupID').getChecked();
	 													 	if(boxs.length>0){ 													 		
	 													 		if(boxs[0].boxLabel=='是否法人机构'){
	 													 			if(!w.down('#legalPersonCode').getValue()){
	 													 				jesAlert(instList_qtxfrdm);/*请填写法人代码*/
	 													 				return;
	 													 			}
	 													 		}
	 													 	}
															
															var form=w.down('form').getForm();
																if(form.isValid()){
																	form.submit({
																			url : 'addInst.ajax?f=BSYS.0201.addInst',
																			success : function(form,action) {
																				var text=action.result.success;
																				if (text=='true') {
																					Ext.create('widget.uxNotification', {html: instList_bccg+'...'}).show();/*保存成功*/
																					var myId=form.findField('instId').getValue();
																					var myName=form.findField('instName').getValue();
																					var pId=form.findField('parentInstId').getValue();
																					if(pId){
																						treeStore.getNodeById(pId).appendChild({
																							id:myId,
																							text:myName,
																							leaf:true
																						});
																						treeStore.getNodeById(pId).data.leaf=false;
																						treeStore.getNodeById(pId).expand();
																						
																					}else{
																						treeStore.load();
																					}
																					instsStore.load({
																						params:{
																							pId:null
																						}
																					});
																					treeInstId=null;
																					w.close();
																				} else if(text=='false'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_bcsb);/*保存失败!*/
																				}else if(text=='UnMatch'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_ssrsjbpp);/*所输入的类型与数据库类型不匹配!*/
																				}else if(text=='noPid'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_ssrsjjgbcz);/*所输入的上级机构不存在!*/
																				}else if(text=='isExitId'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_ssrbhycz);/*所输入的编号已存在!*/
																				}else if(text=='isLpc'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_ssrfrycz);/*所输入的法人代码已存在!*/
																				}else if(text=='pid=id'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_sjjgbnhdyy);/*上级机构不能和·一样!*/
																				}else if(text=='exception'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_cxyxcw+'...');/*程序运行错误,请重试*/
																				}
																			},
																			 failure: function(form, action) {
															                        Ext.MessageBox.alert(instList_ts/*提示*/,instList_cxcw+'...');/*程序错误,请重试*/
														                    }
																		});
																}
														 });
														this.instWin.show();
													}else{
														Ext.MessageBox.alert(instList_ts/*提示*/,instList_qxztjjg);/*请选择同级机构*/
													}
												}
											}, {
												text:instList_xzxj,/*新增下级*/
												iconCls:'add-icon',
												handler:function(){
													this.instWin=new Sys.app.InstWin();		
													this.instWin.setProperty('add');
													if(treeInstId){
														this.instWin.down('#parentInstId').setValue(treeInstId);
														this.instWin.down('datefield[name=startDate]').setVisible(false);
														this.instWin.down('datefield[name=endDate]').setVisible(false);
														this.instWin.down('button[name=submit]').setHandler(function(){
	 													 	var w=this.up('window');
	 													 	//看是否选中了为法人机构
	 													 	var boxs=w.down('#checkboxgroupID').getChecked();
	 													 	if(boxs.length>0){
	 													 		if(boxs[0].boxLabel=='是否法人机构'){
//	 													 			this.instWin('textfield[name=legalPersonCode]').setAllowBlank(false);
	 													 			if(!w.down('#legalPersonCode').getValue()){
	 													 				jesAlert(instList_qtxfrdm);/*请填写法人代码*/
	 													 				return;
	 													 			}
	 													 		}
	 													 	}
															var form=w.down('form').getForm();
																if(form.isValid()){
																	form.submit({
																			url : 'addInst.ajax?f=BSYS.0201.addInst',
																			success : function(form,action) {
																				var text=action.result.success;
																				if (text=='true') {
																					Ext.create('widget.uxNotification', {html: instList_bccg+'...'}).show();/*保存成功*/
																					var myId=form.findField('instId').getValue();
																					var myName=form.findField('instName').getValue();
																					var pId=form.findField('parentInstId').getValue();
																					
																					if(pId){
																						treeStore.getNodeById(pId).appendChild({
																							id:myId,
																							text:myName,
																							leaf:true
																						});
																						treeStore.getNodeById(pId).data.leaf=false;
																						treeStore.getNodeById(pId).expand();
																					}
																					instsStore.load({
																						params:{
																							pId:pId
																						}
																					});
																					w.close();
																					treeInstId=null;
																				} else if(text=='false'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_bcsb);/*保存失败!*/
																				}else if(text=='UnMatch'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_ssrsjbpp);/*所输入的类型与数据库类型不匹配!*/
																				}else if(text=='noPid'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_ssrsjjgbcz);/*所输入的上级机构不存在!*/
																				}else if(text=='isExitId'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_ssrbhycz);/*所输入的编号已存在!*/
																				}else if(text=='isLpc'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_ssrfrycz);/*所输入的法人代码已存在!*/
																				}else if(text=='pid=id'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_sjjgyy);/*上级机构不能和机构编号一样!*/
																				}else if(text=='exception'){
																					Ext.MessageBox.alert(instList_ts/*提示*/,instList_cxyxcw+'...');/*程序运行错误,请重试*/
																				}
																			},
																			 failure: function(form, action) {
															                        Ext.MessageBox.alert(instList_ts/*提示*/,instList_cxcw+'...');/*程序错误,请重试*/
														                    }
																		});
																}
														 });
														this.instWin.show();
													}else{
														Ext.MessageBox.alert(instList_ts/*提示*/,instList_qxzsjjg);/*提示*/
													}
												}
											},{
												text : instList_sx,/*刷新*/
												iconCls : "refresh-icon",
												handler:function(me){
													var treepanel = me.up('gridpanel').previousSibling('treepanel');
													var node = treepanel.getSelectionModel().getSelection();
													var pId = node.length==0?null:node[0].get("id")
													instsStore.proxy.extraParams = {
															pId:pId
													};
													instsStore.load();
												}
											}, {
												text : instList_sc1,/*删除*/
												iconCls : "delete-icon",
												handler:function(){
                                                 	var grid = Ext.getCmp('data_grid').getSelectionModel().getSelection();
													 if (grid.length > 0) {
														Ext.MessageBox.confirm(instList_ts/*提示*/,instList_rhjxccz,function(obj){
															                                /*如果进行此操作，将会连带删除用户、角色资源配置等关联数据，确认删除吗？*/
															if(obj=='yes'){
																var ids = [];
																for(var i=0;i<grid.length;i++){
																  ids.push(grid[i].get('instId'));
																} 
																Ext.Ajax.request({
																	url:'removeInst.ajax?f=BSYS.0201.removeInst',
																	params:{
																		ids:ids
																	},
																	success:function(response){
																		var text=Ext.decode(response.responseText);
																		if(text=='0'){
																			Ext.MessageBox.alert(instList_ts/*提示*/,instList_czsb);/*操作失败!*/
																		}else if(text=='1'){
																			Ext.create('widget.uxNotification', {html: instList_sccg+'...'}).show();/*删除成功*/
																			treeStore.load();
																			instsStore.proxy.extraParams = {
																					pId:null
																			};
																			instsStore.load();
																		}else if(text=='2'){
																			Ext.MessageBox.alert(instList_ts/*提示*/,instList_qxzbhzjg+"...");/*您所选中的还包含子机构，请先删除子机构*/
																		}else if(text=='nocan'){
																			Ext.MessageBox.alert(instList_ts/*提示*/,instList_sxzhzczjl+"...");/*您所选中的机构在汇总关系中存在记录，请先解除关系*/
																		}
																	}
																});
																treeInstId=null;
															}
														});
                                                     } else {
                                                        Ext.MessageBox.alert(instList_ts/*提示*/,instList_csxzyh);/*至少选择一行！*/
                                                    }
												}
											},{
												text:instList_dr,/*导入*/
												iconCls:'import-icon',
												hidden:isSysAdmin,
												handler:function(){
													Ext.create('Ext.window.Window', {
														width : 400,
														height : 100,
														modal : true,
														constrainHeader: true,
														title : '导入Excel文件',
														items:[{
															xtype:'form',
															frame : true,
															itemId : 'uploadPanel',
															items : [{
																xtype : 'fileuploadfield',
																name : 'filePath',
																fieldLabel : instList_wj,/*文件*/
																labelWidth : 50,
																width:370,
																msgTarget : 'side',
																allowBlank : false,
																buttonText : instList_ll+'...'/*浏览*/
															}],
															buttons : [{
																text : instList_dr,/*导入*/
																name : 'upload',
																handler : function() {
																	var me = this;
																	var form = this.up('form').getForm();
																	if(form.isValid()) {
																		form.submit({
																			url : 'importInstExcel.do?f=BSYS.0201',
																			enctype : 'multipart/form-data',
															  			 	method : 'POST',
																			waitMsg : instList_zzsc+'...',/*正在上传，请稍后*/
																			success:function(form,action){
																				jesAlert(action.result.msg);
																				me.up('window').close();
																				instsStore.loadPage(1);
																			},
																			failure:function(form,action){
																				jesErrorAlert(action.result.msg);
																				me.up('window').close();
																			}
																		});
																	}
																}
															},{
																text : instList_gb,/*关闭*/
																handler : function() {
																	this.up('window').close();
																}
															}]
														}]
														
													}).show();	
												}
											},{
												text:instList_dc,/*导出*/
												iconCls:'export-icon',
												handler:function(){
													var ifameX = document.getElementById('download').contentWindow;
													ifameX.open('exportInstExcel.ajax?f=BSYS.0201', '_self');
												}
											}]
								})]
			},

			layout : 'fit',
			id:'data_grid',
			store:instsStore,
			selType : 'checkboxmodel',
			selModel:{mode :'SIMPLE'},
			columns : [{header:instList_xh/*序号*/,xtype:'rownumberer',width:40,align:'center'},{
						text : instList_jgbh,/*机构编号*/
						id:'instId',
						align:'center',
						dataIndex : 'instId'
					}, {
						text : instList_jgmc,/*机构名称*/
						align:'center',
						dataIndex : 'instName'
					}, {
						text : instList_jgjc,/*机构简称*/
						align:'center',
						dataIndex : 'instSmpName'
					}, {
						text : instList_jgdz,/*机构地址*/
						align:'center',
						dataIndex : 'address'
					}, {
						text:instList_sjjg,/*上级机构*/
						align:'center',
						name:'parentInstId',
						dataIndex:'parentInstId',
						hidden:true
						
					},{
						text : instList_jgdh,/*机构电话*/
						align:'center',
						dataIndex : 'tel'
					}, {
						text : instList_jrxk,/*金融许可证号*/
						align:'center',
						dataIndex : 'instLicenceCode'
					},{
						text : instList_ms,/*描述*/
						align:'center',
						dataIndex : 'description'
					},{
						text : instList_qyjy,/*启用/禁用*/
						align:'center',
						xtype:'actioncolumn',
						align:'center',
						dataIndex:'enabled',
						hidden:true,
						width:60,
						items:[{
							getClass:function(v){
								if(v=='Y'){
									return 'success-icon';
								}else{
									return 'cancel-icon';
								}
							},
			                handler: function(grid, rowIndex, colIndex) {
			                	var code=grid.getStore().getAt(rowIndex).get('enabled');
			                	var temp=null;
			                	if(code=='Y'){
			                		temp='N';
			                	}else{
			                		temp='Y';
			                	}
			                	Ext.Ajax.request({
			                		url:'changeEnabled.ajax?f=BSYS.0201.changeEnabled',
			                		params:{
			                			instId:grid.getStore().getAt(rowIndex).get('instId'),
			                			enabled:temp
			                		},
			                		success:function(response){
			                			var text=Ext.decode(response.responseText);
			                			if(text=='1'){
			                				grid.getStore().getAt(rowIndex).data.enabled=temp;
			                				grid.refresh();
			                				jesAlert(instList_czcg);/*操作成功！*/
			                			}else{
			                				Ext.Msg.alert(instList_ts/*提示*/,instList_czsb);/*操作失败*/
			                			}
			                		}
			                	});
			                }
						}]
					}, {
						text : instList_ck,/*查  看*/
						xtype : 'actioncolumn',
						align:'center',
						width : 60,
						items : [
							{
							iconCls : "look-icon",
							instWin:null,
							handler:function(grid,rowIndex){
								var rec=grid.getStore().getAt(rowIndex);
								var id=rec.get('instId');
								this.instWin=new Sys.app.InstWin();
								this.instWin.down('button[name=submit]').setVisible(false);
								this.instWin.setProperty('query');
								this.instWin.items.getAt(0).getForm().load({
									url:'getInfoById.ajax?f=BSYS.0201.getInfoById',
									params:{
										id:id
									},
									failure:function(form,action){
										Ext.Msg.alert(action.result.errorMessage);
									}
								});
								this.instWin.show();
							}
						}]
					},{
						text : instList_xg,/*修  改*/
						align:'center',
						xtype:'actioncolumn',
						width:60,
						iconCls : "edit-icon",
						instWin:null,
						handler:function(grid,rowIndex){
							var rec=grid.getStore().getAt(rowIndex);
							var id=rec.get('instId');
							this.instWin=new Sys.app.InstWin();
							this.instWin.down('datefield[name=startDate]').setVisible(false);
							this.instWin.down('datefield[name=endDate]').setVisible(false);
							this.instWin.setProperty('edit');
							this.instWin.down('textfield[name=instId]').setFieldStyle('background:#f1f1f1');
							
							
							this.instWin.items.getAt(0).getForm().load({
								url:'getInfoById.ajax?f=BSYS.0201.getInfoById',
								params:{
									id:id
								},
								failure:function(form,action){
									Ext.Msg.alert(action.result.errorMessage);
								}
							});
							if(rec.get('legalPersonFlag')=="Y"){
								this.instWin.down('textfield[name=legalPersonCode]').setReadOnly(true);
								this.instWin.down('textfield[name=legalPersonCode]').setFieldStyle('background:#f1f1f1');
							}
							this.instWin.down('button[name=submit]').setHandler(function(){
							var w=this.up('window');
							//看是否选中了为法人机构
						 	var boxs=w.down('#checkboxgroupID').getChecked();
						 	if(boxs.length>0){ 													 		
						 		if(boxs[0].boxLabel=='是否法人机构'){
						 			if(!w.down('#legalPersonCode').getValue()){
						 				jesAlert(instList_qtxfrdm);/*请填写法人代码*/
						 				return;
						 			}
						 		}
						 	}
							var form=w.down('form').getForm();
							var pId=form.findField('parentInstId').getValue();
							if(form.isValid()){
								form.submit({
										url : 'editInst.ajax?f=BSYS.0201.editInst',
										success : function(form,action) {
											var text=action.result.success;
											if (text=='true') {
												Ext.create('widget.uxNotification', {html: instList_xgcg+'...'}).show();/*修改成功*/
												treeStore.load();
												instsStore.load({
													params:{
														pId:pId
													}
												});
												w.close();
											} else if(text=='false'){
												Ext.MessageBox.alert(instList_ts/*提示*/,instList_xgsb);/*修改失败!*/
											}else if(text=='noPid'){
												Ext.MessageBox.alert(instList_ts/*提示*/,instList_sjjgbcz);/*上级机构不存在!*/
											}else if(text=='pid=id'){
												Ext.MessageBox.alert(instList_ts/*提示*/,instList_sjjgyy);/*上级机构不能和机构编号一样*/
											}else if(text=='exception'){
												Ext.MessageBox.alert(instList_ts/*提示*/,instList_cxyxcw+'...');/*程序运行错误,请重试*/
											}
										},
										 failure: function(form, action) {
										 	if (!action.result.success) {
						                        Ext.MessageBox.alert(instList_ts/*提示*/,instList_cxcw+'...');/*程序运行错误,请重试*/
											} 
					                    }
								});
							}
							});
							this.instWin.show();
						}
					},{
				width : 60,
				text : '删  除',/*删  除*/
				align:'center',
				xtype:'actioncolumn',
				iconCls : "delete-icon",
				fileWin:null,
				handler:function(grid,rowIndex){
					var instId=grid.getStore().getAt(rowIndex).get('instId');
					Ext.MessageBox.confirm(instList_ts/*提示*/,instList_rhjxccz,function(obj){
						                                /*如果进行此操作，将会连带删除用户、角色资源配置等关联数据，确认删除吗？*/
						if(obj=='yes'){
							Ext.Ajax.request({
								url:'removeInst.ajax?f=BSYS.0201.removeInst',
								params:{
									ids:instId
								},
								success:function(response){
									var text=Ext.decode(response.responseText);
									if(text=='0'){
										Ext.MessageBox.alert(instList_ts/*提示*/,instList_czsb);/*操作失败!*/
									}else if(text=='1'){
										Ext.create('widget.uxNotification', {html: instList_sccg+'...'}).show();/*删除成功*/
										treeStore.load();
										instsStore.proxy.extraParams = {
												pId:null
										};
										instsStore.load();
									}else if(text=='2'){
										Ext.MessageBox.alert(instList_ts/*提示*/,instList_qxzbhzjg+"...");/*您所选中的还包含子机构，请先删除子机构*/
									}else if(text=='nocan'){
										Ext.MessageBox.alert(instList_ts/*提示*/,instList_sxzhzczjl+"...");/*您所选中的机构在汇总关系中存在记录，请先解除关系*/
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
