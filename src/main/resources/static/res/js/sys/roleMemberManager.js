Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Sys.app.RoleManagerWin',
    'Ext.form.field.ComboBox',
    'Ext.ux.jes.PagingToolbar',
    'Sys.app.RoleMemberConfigWin2',
    'Sys.app.store.UserStore'
]);

Ext.onReady(function() {
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
        autoLoad : true	     
	});
	var pageingStore=Ext.create('Ext.data.Store', {
	fields : ['SS_NAME', 'ROLE_NAME', 'MEMBER_TYPE', 'USER_CNAME','USER_ID',
						'DEPART_NAME','INST_NAME','EYES_STAT'],
				proxy : {
					type : 'ajax',
					url : 'getRoleRelations.ajax?f=BSYS.0302.getRRs',
					reader : {
						type : 'json',
						root : 'roleRelations',
						totalProperty : 'total'
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
				title : roleMemberManager_syjs,/*所有角色*/
				width : 200,
                rootVisible:false,
                id: 'role_tree',
                store:treeStore,
                listeners : {
						itemclick : function(tree, record, item, index, e,eOpts) {
							if(record.parentNode.isRoot()){
								return;
							}
							sysId = record.parentNode.raw.id;
							roleId=record.raw.id;
							pageingStore.proxy.extraParams = {
								sysId:sysId,
								roleId : roleId
							};
							pageingStore.loadPage(1);
						}
					}
			},{
				xtype: 'gridpanel',
				region: 'center',
				title:roleMemberManager_jsry,/*角色人员/部门关系*/
				tbar : {
					xtype : 'container',
					items:[
						new Ext.Toolbar({
				       		items:[{
				       			text: roleMemberManager_pz,/*配置*/
				       			iconCls: "setting-icon",
				       			handler:function(me) {
				       				var treepanel = me.up('gridpanel').previousSibling('treepanel');
				       				var roleRecod = treepanel.getSelectionModel().getLastSelected();
				       				if(roleRecod==undefined||roleRecod.parentNode.isRoot()){
				       					jesAlert(roleMemberManager_qxzjs);/*请选中要配置的角色*/
								        return;
							        }
			       					var memberWin=new Sys.app.RoleMemberConfigWin2();
			       					memberWin.roleId = roleRecod.raw.id;
			       					memberWin.sysId = roleRecod.parentNode.raw.id;
			       					var eastGridPanel=memberWin.down('gridpanel[name=eastGridPanel]');
									eastGridPanel.store.removeAll();
									memberWin.setTitle(roleMemberManager_jx+"["+roleRecod.raw.text+"]"+roleMemberManager_qxpz);/*进行["+roleRecod.raw.text+"]的权限配置*/
			       					memberWin.show();
			       					memberWin.on('close',function(panel,eOpts){
			       					    pageingStore.proxy.extraParams = {
											sysId:roleRecod.parentNode.raw.id,
											roleId : roleRecod.raw.id
										};
							           pageingStore.loadPage(1);
			       					});
				       			}
				       		},{
				       			text: roleMemberManager_dc,/*导出*/
				       			iconCls : "import-icon",
				       			handler:function() {
				       				var ssId = pageingStore.proxy.extraParams.sysId;
									Ext.Ajax.request({
										url : 'exportExcel.do?f=BSYS.0302',
										method : 'POST',
										form : 'exportForm',
										params : {
											ssId : ssId
										},
										isUpload : true
									});
				       			}
				       		},{
				       			text:roleMemberManager_sx,/*刷新*/
				       			iconCls:"refresh-icon",
				       			handler:function(){
				       				Ext.Ajax.request({
										url : 'refreshRoleMemberCache.ajax?f=BSYS.0302',
										success:function(){
//											document.location.reload();
											pageingStore.load();
										}
									});
				       			}
				       		}]
				       	})
					]
				},
				layout:'fit',
				store : pageingStore,
				columns:[{ header: roleMemberManager_xh/*序号*/, xtype: 'rownumberer', width:40, align: 'center'},
				         {
					text:roleMemberManager_xtmc,/*系统名称*/
					dataIndex : 'SS_NAME',
					align: 'center'
					
				},{
					text:roleMemberManager_jsmc,/*角色名称*/
					dataIndex : 'ROLE_NAME'
				},{
					text:roleMemberManager_jslx,/*角色类型*/
					dataIndex : 'MEMBER_TYPE',
					renderer : function(val) {
						          if(val=='P'){
				                   return roleMemberManager_ry; /*人员*/						          	
						          }else{
						          	return roleMemberManager_bm;/*部门*/
						          }
				             }
					
				},{
					text:roleMemberManager_rymc,/*人员名称*/
					dataIndex : 'USER_CNAME'
				},{
					text:roleMemberManager_rybm,/*人员编号*/
					dataIndex:'USER_ID'
				},{
					text:roleMemberManager_bmmc,/*部门名称*/
					dataIndex : 'DEPART_NAME'
				},{
					text:roleMemberManager_jgmc,/*机构名称*/
					dataIndex : 'INST_NAME'
				},{
					text:roleMemberManager_zt,/*状态*/
					hidden:fourEyesSenior!='Y',
					dataIndex:'EYES_STAT'
				}],
				dockedItems : [{
					xtype : 'jespaging',
					store : pageingStore,
					dock : 'bottom',
					displayInfo : true
				}]
				
			}]
	});
});