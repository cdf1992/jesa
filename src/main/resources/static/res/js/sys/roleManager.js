Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Sys.app.RoleManagerWin',
    'Ext.form.field.ComboBox',
    'Ext.ux.jes.PagingToolbar'
]);

Ext.onReady(function() {
	
	var defaultNode=null;
	var tabRoleId =null;
	var tabRoleName=null;
	var tabSSID=null;
	var treeInstId = null;
	
	var treeStore = Ext.create('Ext.data.TreeStore', {
			proxy : {
				type : 'ajax',
				url  : 'getRoleTree.ajax?f=BSYS.0301.getRoleTree',
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
				        	if(ssNode.hasChildNodes()){
				        		var roleNode=ssNode.getChildAt(0);
				        		defaultNode=roleNode;
								tabSSID=defaultNode.parentNode.raw.id;
								tabRoleId=defaultNode.raw.id;
								tabRoleName=defaultNode.raw.text;
				        		resourceStore.proxy.extraParams = {
										roleId: roleNode.raw.id,
										ssId: ssNode.raw.id,
										resType:''
								};
								resourceStore.loadPage(1);
				        	}
			        	}
	        	}
	        }
	});
	
	
	var resourceStore=Ext.create('Ext.data.Store',{
		fields:['SS_ID','SS_NAME','ROLE_ID','ROLE_NAME','RES_ID','RESOURCE_NAME','RES_IMP_ID',
				'RES_IMP_NAME','EYES_STAT'],
		proxy:{
			type:'ajax',
			url:'getResource.ajax',
			reader:{
				type:'json',
				root:'resourceList',
				totalProperty : 'total'
			}
		}
	});
	
	var resTypeStore = Ext.create('Ext.data.Store', {
	    fields: ['resourceId', 'resourceName','ssId'],
	    data: rData
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
				title : roleManager_jsgl,/*角色管理*/
				width : 200,
                rootVisible:false,
                id: 'role_tree',
                treeInstId : null,
				store:treeStore,
				listeners: {
					load :function(treeStore, node, records, successful, eOpts ) {
						if(defaultNode) {
							this.getSelectionModel().select(defaultNode);
							resTypeStore.filter({
								id: 'ssId',
								exactMatch: true,
							    property: 'ssId',
							    value : defaultNode.parentNode.raw.id
							});
							tabSSID=defaultNode.parentNode.raw.id;
						}
					},
					itemclick : function(tree, record, item, index, e,eOpts) {
						treeInstId = record.raw.id;
						tabRoleId = record.raw.id;
						tabRoleName=record.raw.text;
						var ssId = record.parentNode.raw.id;
						tabSSID=ssId;
						if('root'!=ssId) {
							resourceStore.proxy.extraParams = {
									roleId: tabRoleId,
									ssId: ssId,
									resType:null
							};
							resourceStore.loadPage(1);
							
							resTypeStore.clearFilter(false);
							resTypeStore.load(rData);
							resTypeStore.filter({
								id: 'ssId',
								exactMatch: true,
								property: 'ssId',
								value   : ssId
							});
						}
					}
				},
				tbar:['->',{
							text: roleManager_xz,/*新增*/
							iconCls: "male-user-add-icon",
							handler: function() {
								if (treeInstId) {
									var selecttionModel = Ext.getCmp('role_tree').getSelectionModel();
									var nodes = selecttionModel.getSelection();
									if(nodes.length>0) {
										var ssId = nodes[0].get("id");
										var ssName = nodes[0].get("text");
										var pId = nodes[0].get("parentId");
										if("root" != pId) {
											var pNode = nodes[0].parentNode;
											ssId = pNode.get('id');
											ssName= pNode.get('text');
										}
										var w=new Sys.app.RoleManagerWin();
										w.setTitle(roleManager_xzjs);/*新增角色*/
										w.down('displayfield[name=ssName]').setValue(ssName).readOnly=true;
										w.down('textareafield[name=ssId]').setValue(ssId);
										w.down('nostextfield[name=roleId]').setValue(ssId+'_');
										w.down('button[name=submit]').setHandler(function(){
											var form = w.down('form');
											if(form.isValid()) {
												form.submit({
													url : 'addRole.ajax',
													success:function(form,action){
														var text=action.result.success;
														if(text=='true'){
															var myId=form.findField('roleId').getValue();
															var myName=form.findField('roleName').getValue();
															var pId=form.findField('ssId').getValue();
                                                            //alert('['+myId+']'+myName);
															treeStore.getNodeById(pId).appendChild({
																id:myId,
																text:'['+myId+']'+myName,
																iconCls:'role-icon',
																leaf:true
															});
															treeStore.getNodeById(pId).data.leaf=false;
															treeStore.getNodeById(pId).expand();
															selecttionModel.select(treeStore.getNodeById(myId));
															//treeStore.loadPage(1);
															
															tabSSID=ssId;
															tabRoleId=myId;
															tabRoleName=myName;
															
															resourceStore.proxy.extraParams = {
																	roleId: myId,
																	ssId: ssId,
																	resType:null
															};
															resourceStore.loadPage(1);
															
															resTypeStore.clearFilter(false);
															resTypeStore.load(rData);
															resTypeStore.filter({
																id: 'ssId',
																exactMatch: true,
																property: 'ssId',
																value   : ssId
															});
															w.close();
														}else if(text=='false'){
															w.close();
															Ext.MessageBox.alert(roleManager_ts/*提示*/,roleManager_xzsb);/*新增失败！角色编号或者角色名称已存在！*/
														}
													}
												});
											}
										});
										w.show();
									}else{
										Ext.MessageBox.alert(roleManager_ts/*提示*/,roleManager_qxzzxt);/*请选择要操作的子系统！*/
									}
								}else {
									Ext.MessageBox.alert(roleManager_ts/*提示*/,roleManager_qxzxzjszxt);/*请选择需要新增角色的子系统*/
								}
							}
						},{
							text: roleManager_sc,/*删除*/
							iconCls: "male-user-remove-icon",
							handler: function() {
                                if (treeInstId) {
                                    var nodes = Ext.getCmp('role_tree').getSelectionModel().getSelection();
                                    if(nodes.length>0&&nodes[0].get('leaf')==true) {
                                        Ext.MessageBox.confirm(roleManager_ts/*提示*/,roleManager_qdsc/*您确定要删除吗?*/,function(obj) {
                                                if(obj=='yes'){
                                                    var pNode = nodes[0].parentNode;
                                                    var ssId = pNode.get('id');
                                                    Ext.Ajax.request({
                                                        params:{
                                                            roleId: treeInstId,
                                                            ssId: ssId
                                                        },
                                                        url:'deleteRole.ajax',
                                                        success:function() {
                                                            treeStore.getNodeById(ssId).removeChild(nodes[0]);
                                                            pNode.expand();
                                                            tabRoleId=null;
                                                            resourceStore.load();
                                                        }
                                                    });
                                                }
                                            });
                                    }else {
                                        Ext.MessageBox.alert(roleManager_ts/*提示*/,roleManager_qxzscjs/*请选择要删除的角色！*/);
                                    }
                                } 
							}
						},{
							text:roleManager_xg,/*修改*/
							iconCls: "male-user-edit-icon",
							handler: function() {
								if (treeInstId) {
									var nodes = Ext.getCmp('role_tree').getSelectionModel().getSelection();
									if(nodes.length>0) {
										var pId = nodes[0].get("parentId");
										var roleId = nodes[0].get('id');
										
										if("root" != pId) {
											var pNode = nodes[0].parentNode;
											var ssName = pNode.get("text");
											var ssId = pId;
											var w=new Sys.app.RoleManagerWin();
											w.setTitle(roleManager_xgjs);/*修改角色*/
											w.down('nostextfield[name=roleId]').readOnly = true;
											w.down('nostextfield[name=roleId]').setFieldStyle('background:#f1f1f1');
											w.items.getAt(0).getForm().load({
												url:'getRole.ajax',
												params:{
													roleId : roleId,
													ssId : ssId
												},
												failure:function(form,action){
													Ext.Msg.alert(action.result.errorMessage);
												}
											});
											w.down('displayfield[name=ssName]').setValue(ssName).readOnly=true;
											w.down('button[name=submit]').setHandler(function(){
												var form = w.down('form');
												if(form.isValid()) {
													form.submit({
														url : 'updateRole.ajax',
														success:function(form2,action){
															var text=action.result.success;
															if(text=='true'){
																var node = treeStore.getNodeById(w.down('field[name=roleId]').getValue());
																var roleName = w.down('field[name=roleName]').getValue();
																node.set("text",roleName);
																tabRoleName=roleName;
																resourceStore.load();
																w.close();
																jesAlert(roleManager_xgcg);/*修改成功!*/
															}else if(text=='false'){
																w.close();
																jesAlert(roleManager_xgsb);/*修改失败!*/
															}
														}
													});
												}
											});
											w.show();
										}else{
											Ext.MessageBox.alert(roleManager_ts/*提示*/,roleManager_qxzxgjs);/*请选择要修改的角色！*/
										}
									}else{
										Ext.MessageBox.alert(roleManager_ts/*提示*/,roleManager_qxzxgjs);/*请选择要修改的角色！*/
									}
								} else {
									Ext.MessageBox.alert(roleManager_ts/*提示*/,roleManager_qxzxgjs);/*请选择要修改的角色！*/
								}
							}
						}
					]
			},{
				xtype: 'gridpanel',
				region: 'center',
				title:roleManager_jszy,/*角色资源关系*/
				tbar : {
					xtype : 'container',
					items:[
						new Ext.form.field.ComboBox({
				       		fieldLabel: roleManager_zylx,/*资源类型*/
				       		store: resTypeStore,
				       		labelWidth:60,
				       		displayField: 'resourceName',
				       	    valueField: 'resourceId',
				       	    id: 'cbId',
					       	listeners:{
						         select: function() {
						        	 resourceStore.proxy.extraParams.resType=this.value;
						        	 resourceStore.loadPage(1);
						         }
						    },
				       		renderTo: Ext.getBody()
				       	}),new Ext.Toolbar({
				       		items:[{
				       			text: roleManager_pz,/*配置*/
				       			iconCls: "setting-icon",
				       			handler:function() {
				       				if(tabRoleId){
				       					if(tabSSID == 'root'){
				       						Ext.Msg.alert(roleManager_ts/*提示*/,roleManager_qxzpzjs);/*请选择要配置的角色*/
				       					}else{		
				       						createRoleMgWin(tabSSID,tabRoleId,tabRoleName);
				       					}
				       				}else{
				       					Ext.Msg.alert(roleManager_ts/*提示*/,roleManager_qxzjs);/*请选中要配置的角色*/
				       				}
				       			}
				       		},{
				       			text: roleManager_dc,/*导出*/
				       			iconCls : "import-icon",
				       			handler:function() {
				       				var ssId = resourceStore.proxy.extraParams.ssId;
									Ext.Ajax.request({
										url : 'exportExcel.do?f=BSYS.0301',
										method : 'POST',
										form : 'exportForm',
										params : {
											ssId : ssId
										},
										isUpload : true
									});
				       			}
				       		},{
				       			text:roleManager_sx,/*刷新*/
				       			iconCls:"refresh-icon",
				       			handler:function(){
				       				Ext.Ajax.request({
										url : 'refreshRoleCache.ajax?f=BSYS.0301',
										success:function(){
											resourceStore.load();
										}
									});
				       			}
				       		}]
				       	})
					]
				},
				layout:'fit',
				selType : 'checkboxmodel',
				selModel:{mode :'SIMPLE'},
				store:resourceStore,
				columns:[{xtype: 'rownumberer', width:50, align: 'center', text:roleManager_xh},{/*序号*/
					text:roleManager_cgyhsd,/*系统名称*/
					dataIndex : 'SS_NAME'
				},{
					text:roleManager_xtmc,/*角色名称*/
					dataIndex : 'ROLE_NAME'
				},{
					text:roleManager_zymc,/*资源名称*/
					dataIndex : 'RESOURCE_NAME'
				},{
					text:roleManager_zysl,/*资源实例*/
					dataIndex : 'RES_IMP_NAME'
				},{
					text:roleManager_zt,/*状态*/
					hidden:fourEyesSenior!='Y',
					dataIndex:'EYES_STAT'
				}],
				dockedItems : [{
					xtype : 'jespaging',
					store : resourceStore,
					dock : 'bottom',
					displayInfo : true
				}]
				
			}]
	});
	function createRoleMgWin(tabSSID,roleId,roleName){
		Ext.Ajax.request({
				url:'getResourceBySSID.ajax?f=BSYS.0301.getResourceBySSID',
				params:{
					ssId:tabSSID,
					roleId:roleId
				},
				success:function(response){
					var result=Ext.decode(response.responseText);
					for(var i in result){
						if(result[i].items ){
							eval("result[i].items=" + result[i].items);
							if(result[i].items.store){
								result[i].items.store.load();
							}
						}
					}
					var win=Ext.create('Ext.window.Window',{
						title:roleManager_jx+' [ '+roleName+' ] '+roleManager_qxpz,/*进行 [ '+roleName+' ] 的权限配置*/
						width:500,
						height:400,
						constrainHeader: true,	
						layout:'fit',
						modal:true,
						items:{
							xtype:'tabpanel',
							defaults: {layout:'fit'}, 
							items:result
						},
						buttons : [{
							text : roleManager_bcxg,/*保存修改*/
							disabled:true,
							name : 'submit',
							itemId:'submit',
							handler:function(){
								var reses = this.up('window').items.items;
								var roleResourceArr=[];
								for(var j=0;j<reses[0].items.items.length;j++){
										if(reses[0].items.items[j].items.items){
											var panel=reses[0].items.items[j].items.items[0];
											var resImps=[];
											if('treepanel'==panel.xtype){
												var checkCount = panel.getChecked().length;
													for(var n=0;n<checkCount;n++){
														var resImpId=panel.getChecked()[n].raw.resImpId;
														var resImpName=panel.getChecked()[n].raw.resImpName;
														resImps.push({id:resImpId,
															name:resImpName});
													}
												
											}else if('gridpanel'==panel.xtype){
												var selectModel=panel.getStore().each( function(r){
													if(r.get('selected')=='Y'){
														var resImpId=r.get('res_imp_id');
														var resImpName=r.get('res_imp_name');
														resImps.push({id:resImpId,
															name:resImpName});
													}
												});
											}else if('checkboxgroup'==panel.xtype){
												var checkCount = panel.getChecked().length;
													for(var c=0;c<checkCount;c++){
														var resImpId=panel.getChecked()[c].itemId;
														var resImpName=panel.getChecked()[c].boxLabel;
														resImps.push({id:resImpId,
															name:resImpName});
													}
												
											}
											roleResourceArr.push({
												roleId:roleId,
												resId:panel.resId,
												ssId:tabSSID,
												resImps:resImps
											});
									  }
										
								}
								Ext.Ajax.request({
									url:'saveRoleResMg.ajax?f=BSYS.0301.saveRoleResMg',
									jsonData:roleResourceArr,
									success:function(response){
										var result = Ext.decode(response.responseText)
										if(result.success==true){
										  jesAlert(roleManager_bccg);/*保存成功*/
										  resourceStore.load();
										}else{
										  jesAlert(roleManager_bcsb+result.message);/*保存失败：*/
										}
									},
									failure: function(response, opts) {
										jesAlert(roleManager_fwljsb + response.status);/*服务连接失败，状态码*/
									}
								});
								this.up('window').close();
							}
						}]
					}).show();
					Ext.util.TaskManager.start({
					     run: function () {
					     	var s=0;
								for(var i in result){
									if(result[i].items){
										if(result[i].items.store){
											if(result[i].items.store.isLoading()){
												return true;
											}else{
												s++;
											}
										}
									}
								}
								//jesAlert(s);
								win.down('button[name=submit]').setDisabled(false);
								return false;
 
						 },
					     interval: 1000*1
				 });
					
					
					
				}
		});
	}
});

