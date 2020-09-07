Ext.define('Sys.app.RoleDepartmentConfigWin',{
	extend:'Ext.window.Window',
	modal : true,
	width:600,
	height:500,
	layout : 'border',
	defaults :{
			split :true
	},
	items : [{
		    region : 'center',
			xtype: 'gridpanel',
			itemId:'centerGridPanel',
		    title:'部门信息',	
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
    	        		var centerStore=me.store;	
					    Ext.Ajax.request({
								url : 'getRoleMemberRelation.ajax?f=BSYS.0302.getRR',							
								params : {
									roleId : roleId
								},
								success : function(response) {
									var departId = Ext.decode(response.responseText);
									for(var i=0;i<departId.length;i++){
										for(var j=0;j<centerStore.getCount();j++){
											if(departId[i]==centerStore.getAt(j).data.departId){
				                              me.getSelectionModel().select(centerStore.getAt(j),true);										
											}
										}
									}
								}
							});
				},
				select:function(me, record, index, eOpts ){					
					var win = this.up('window');
					var sysId = win.sysId;
					var roleId=win.roleId;
					Ext.Ajax.request({
							url : 'addRoleMemberRelation.ajax?f=BSYS.0302.add',							
							params : {
								sysId :sysId,
								roleId : roleId,
								memberId:record.data.departId
							}							
						});
					
				},
				deselect:function( me, record, index, eOpts){
					var win = this.up('window');
					var roleId=win.roleId;
					Ext.Ajax.request({
							url : 'removeRoleMemberRelation.ajax?f=BSYS.0302.remove',							
							params : {
								roleId : roleId,
								memberId:record.data.departId
							}
						});									
				}
			},
			selType : 'checkboxmodel',
			selModel:{mode :'SIMPLE'},
			columns:[{
				text:'部门编码',
				dataIndex : 'departId'
			},{
				text:'部门名称',
				dataIndex : 'departName'
			},{
				text:'是否总行特有部门',
				dataIndex : 'headquartersOnly',
				width:140 
			},{
				text : '是否管理行特有部门',
				dataIndex : 'managerOnly',
				width:140
			}]
	    }],		
	buttons:[
	        {
	        	text:'重置',
	        	handler:function(){
	        		win = this.up('window');
	        		var roleId=win.roleId;
	        		var centerGridPanel=win.getComponent('centerGridPanel');
	        		var centerStore=centerGridPanel.store;	
	        		centerGridPanel.getSelectionModel().deselectAll(true);
	        		var memberId = [];
	        	 	for(var i=0;i<centerStore.data.items.length;i++){
	        	 		memberId.push(centerStore.data.items[i].raw.departId);
	        	 	}
	        		Ext.Ajax.request({
							url : 'romoveRoleMemberRelation.ajax?f=BSYS.0302.getRR',							
							params : {
								roleId : roleId,
								memberId:memberId
							}
						});	
	        	}
	        }
       ]
});