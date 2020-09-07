
function ajaxRequest(url,win,roleMember,memberType,callback){
	callback=callback || function(){};
	Ext.Ajax.request({
		url : url,							
		params : {
			ssId : win.sysId,
			roleId : win.roleId,
			roleMember:roleMember,
			memberType:memberType
		},
		success: function(response){
			var objData = Ext.decode(response.responseText);
			if(objData){
				callback();	
			}else{
				jesAlert(roleMemberWin_czsb/*'操作失败，请联系管理员！'*/);
			}
			
		}
    });
}
var selecteMemberStore = Ext.create('Ext.data.Store', {
	autoLoad : false,
	fields : ['USERID', 'USERNAME'],
	proxy : {
		type : 'ajax',
		url : 'getRoleMemberRelation2.ajax?f=BSYS.0302.getRR',							
		reader : {
			type : 'json'
		}
  }
})
var userStore  = Ext.create('Ext.data.Store', {
		autoLoad : false,
		fields : ['USER_ID', 'PASSWORD', 'USER_CNAME', 'USER_ENAME',
							'INST_ID'],
		proxy : {
				type : 'ajax',
				url : 'getUserBycondition.ajax?f=BSYS.0203.getUsers',
				reader : {
					type : 'json',
					root : 'users',
					totalProperty : 'total'
				}
		},
		listeners: {
			load:function(me,records){
				selecteMemberStore.each(function(s){
					for(var j=0;j<records.length;j++){
						if(s.get('USERID')==records[j].data.USER_ID){
							Q('gridpanel[itemId=centerGridPanel]').getSelectionModel().select(records[j],true,true);
					   }
					}
				});
			}
		}
	});
Ext.define('Sys.app.RoleMemberConfigWin2',{
	extend:'Ext.window.Window',
	modal : true,
	width:800,
	constrainHeader: true,
	height:500,
	layout : 'fit',
	items:{
		xtype:'tabpanel',
		items: [{
			    title: roleMemberWin_ry/*'人员'*/,
			    layout: {
			        type: 'hbox',
			        align: 'stretch'
			    },
			    items : [{
			    	xtype:'treepanel',
			    	itemId:'instTreePanel',
				    title:roleMemberWin_syjg/*'所有机构'*/,
				    flex: 5,
			        store:Ext.create('Ext.data.TreeStore', {			       
						proxy : {
							type : 'ajax',
							url : 'getInstTree.ajax?f=*.0203.getInstTree',
							reader : {
								type : 'json'
							}
						},
						root : {
							expanded : true
						}
			        }),
					collapsible : true,
					collapseDirection:'left',
					rootVisible:false,
					listeners : {
						itemclick : function(tree, record, item, index, e,eOpts) {
							userStore.proxy.extraParams = {
									'f.INST_ID:like' : record.raw.id
									, ssId : this.up('window').sysId
				            };
							userStore.loadPage(1);
						}						
					}
				},{
					xtype: 'gridpanel',
					title:roleMemberWin_ryxx/*'人员信息'*/,	
					flex: 11,
					itemId:'centerGridPanel',
					tbar:[roleMemberWin_yhbh/*'用户编号'*/,'：',{
							xtype : 'textfield',
							name : 'filterUser',
							flex:1,
							regexText : roleMemberWin_srdzykg/*'输入的值有空格'*/,
							regex : /^(?:(?!\s).){1,}$/
				    },roleMemberWin_yhzwm/*'用户中文名'*/,'：',{
							xtype : 'textfield',
							name : 'filterUserName',
							flex:1
				    },{
							width: 60,
							text : roleMemberWin_cz/*'查找'*/,
							iconCls : "search-icon",
							handler : function(me) {
								var filterUserId=Q('textfield[name=filterUser]').value;
								var filterUserCName=Q('textfield[name=filterUserName]').value;
								userStore.proxy.extraParams={'f.USER_ID:like':filterUserId,'f.USER_CNAME:like':filterUserCName, ssId:userStore.proxy.extraParams.ssId};
								userStore.reload();
							}
					}],
					store : userStore,
					dockedItems: [{
				        xtype: 'jespaging',
				        store:userStore,   
				        dock: 'bottom',
				        displayInfo: true
					}],		
					listeners: {
						viewready:function(me){
							var win = this.up('window');
							selecteMemberStore.proxy.extraParams = {
				        			ssId:win.sysId,
									roleId : win.roleId,
									memberType:'P'
				             };
							selecteMemberStore.load(function(){
								var rNode = me.up().getComponent('instTreePanel').store.getRootNode();
								var ssNode='';
								if(rNode.hasChildNodes()){
									ssNode = rNode.getChildAt(0);
								}
								userStore.proxy.extraParams = {
										'f.INST_ID:like' : ssNode.internalId
										, ssId : me.up('window').sysId
								};
								userStore.loadPage(1);
							});
							
						},
						select:function(me, record, index, eOpts ){	
							var win = this.up('window');
							var ccStore=this.up().getComponent('eastGridPanel').store; //changedCache
							var r=ccStore.findRecord('USERID', record.data.USER_ID);
							var callback=function(){
								if(!r){
									ccStore.insert(ccStore.getCount(),{USERID:record.data.USER_ID,USERNAME: record.data.USER_CNAME});
								}
							};
							if(roleoperateconfirm =="Y"){
								Ext.MessageBox.confirm("请确认", "是否确认角色添加该用户？", function(button, text) {
									if (button == "yes") {
										ajaxRequest('addRoleMemberRelation.ajax?f=BSYS.0302.add',win,record.data.USER_ID,'P',callback);
									}else{
										userStore.loadPage(userStore.currentPage);
									}
						        });
							}else{
								ajaxRequest('addRoleMemberRelation.ajax?f=BSYS.0302.add',win,record.data.USER_ID,'P',callback);
							}
							
						},
						deselect:function( me, record, index, eOpts){
							var win = this.up('window');
							var ccStore=this.up().getComponent('eastGridPanel').store; //changedCache
							var r=ccStore.findRecord('USERID', record.data.USER_ID);
							var callback=function(){
								if(r){
									ccStore.remove(r);
								}
							};
							if(roleoperateconfirm =="Y"){
								Ext.MessageBox.confirm("请确认", "是否确认角色删除该用户？", function(button, text) {
									if (button == "yes") {
										ajaxRequest('removeRoleMemberRelation.ajax?f=BSYS.0302.remove',win,record.data.USER_ID,'P',callback);
									}else{
										userStore.loadPage(userStore.currentPage);
									}
						        });
							}else{
								ajaxRequest('removeRoleMemberRelation.ajax?f=BSYS.0302.remove',win,record.data.USER_ID,'P',callback);
							}
							
						}
					},
					selType : 'checkboxmodel',
					selModel:{mode :'SIMPLE'},
					columns:[{
						text:roleMemberWin_yhbh/*'用户编号'*/,
						flex: 1,
						dataIndex : 'USER_ID'
					},{
						text:roleMemberWin_yhywm/*'用户英文名'*/,
						flex: 1,
						dataIndex : 'USER_ENAME'
					},{
						text:roleMemberWin_yhzwm/*'用户中文名'*/,
						flex: 1,
						dataIndex : 'USER_CNAME'
					},{
						text : roleMemberWin_jgbh/*'机构编号'*/,
						flex: 1,
						dataIndex : 'INST_ID'
					}]
			    },{
					xtype:'gridpanel',
					itemId:'eastGridPanel',
					name:'eastGridPanel',
					flex: 4,
					collapsible : true,
					collapseDirection:'right',
					title : roleMemberWin_syry/*'所选人员'*/,
			        store : selecteMemberStore,
			        columns:[{
						text:roleMemberWin_bh/*'编号'*/,
						flex: 1,
						dataIndex : 'USERID'
					},{
						text:roleMemberWin_yhm/*'用户名'*/,
						flex: 1,
						dataIndex : 'USERNAME'
					},{
						text : roleMemberWin_sc/*'删除'*/,
						xtype:'actioncolumn',
						flex: 1,
						align: 'center',
						items:[{
							iconCls: 'delete-icon',
			                handler: function(grid, rowIndex, colIndex) {
			                	var win = this.up('window');
			                	var centerGridPanel=grid.up().up().getComponent('centerGridPanel');
			                	var centerStore=centerGridPanel.store;					   
			                	var eastStore=grid.getStore();
			                	var memberId = eastStore.getAt(rowIndex).data.USERID;
								var r = eastStore.getAt(rowIndex);
								var callback=function(){
									eastStore.remove(r);
									centerGridPanel.getSelectionModel().deselect(centerStore.findRecord('USER_ID',memberId),true);
								};
								ajaxRequest('removeRoleMemberRelation.ajax?f=BSYS.0302.remove',win,memberId,'P',callback);
								selecteMemberStore.loadPage(1);
								userStore.loadPage(1);
			                }	                
						}]
					}]
				}]
		    }, {
		        title:roleMemberWin_bm /*'部门'*/,
		        layout : 'fit',
		        xtype: 'gridpanel',
			    layout:'fit',
				store : Ext.create('Ext.data.Store',{
					autoLoad : true,
					fields:['departId', 'departName', 'headquartersOnly', 'managerOnly'],
					proxy:{
						type: 'ajax',
						url: 'listDepart.ajax?f=BSYS.0202',
						reader:{
							type:'json',
							root:'listDepart'
						}
					}
				}),
				listeners: {
					viewready:function(me){
						    scope: this,
						    win = this.up('window');
	                        var roleId = win.roleId;
	                        var ssId =  win.sysId;
	    	        		var centerStore=me.store;	
						    Ext.Ajax.request({
									url : 'getRoleMemberRelation.ajax?f=BSYS.0302.getRR',							
									params : {
										ssId:ssId,
										roleId : roleId,
										memberType:'D'
									},
									success : function(response) {
										var departId = Ext.decode(response.responseText);
										for(var i=0;i<departId.length;i++){
											for(var j=0;j<centerStore.getCount();j++){
												if(departId[i]==centerStore.getAt(j).data.departId){
					                              me.getSelectionModel().select(centerStore.getAt(j),true,true);										
												}
											}
										}
									}
								});
					},
					select:function(me, record, index, eOpts ){					
						var win = this.up('window');
						ajaxRequest('addRoleMemberRelation.ajax?f=BSYS.0302.add',win,record.data.departId,'D');
					},
					deselect:function( me, record, index, eOpts){
						var win = this.up('window');
						ajaxRequest('removeRoleMemberRelation.ajax?f=BSYS.0302.remove',win,record.data.departId,'D');
					}
				},
				selType : 'checkboxmodel',
				selModel:{mode :'SIMPLE'},
				columns:[{
					text:roleMemberWin_bmbh/*'部门编号'*/,
					dataIndex : 'departId'
				},{
					text:roleMemberWin_bmmc/*'部门名称'*/,
					dataIndex : 'departName'
				},{
					text:roleMemberWin_sfzhtybm/*'是否总行特有部门'*/,
					dataIndex : 'headquartersOnly',
					width:140 
				},{
					text : roleMemberWin_sfglhtybm/*'是否管理行特有部门'*/,
					dataIndex : 'managerOnly',
					width:140
				}]
		    }]
	}
});