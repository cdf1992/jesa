Ext.require([
			 'Ext.data.*',
			 'Ext.grid.*',
             'Ext.form.*',
             'Ext.ux.window.Notification',
             'Ext.ux.jes.PagingToolbar'
            ]);

Ext.onReady(function(){
	var userStore=Ext.create('Ext.data.Store',{
		autoLoad:true,
		fields:['USER_ID','USER_CNAME','INST_ID','INST_NAME', 'INST_SMP_NAME','DEPART_NAME','MOBILE','IS_USER_LOCKED','ENABLED','IS_DELETE','CHANGE_USER','CHECK_USER','CHANGE_STATUS'],
		proxy:{
			type:'ajax',
			url:'getUserByCondition.ajax?f=BSYS.0401.query',
			reader:{			
				type : 'json',
				totalProperty : 'total',
				root:'users'
				
			}
		}
	});
	
	
	var userStatusStore = Ext.create('Ext.data.Store',{
		fields:['status','name'],
		data:[{'status':'','name':'所有用户'},
		      {'status':'f.t.is_user_locked:eq','name':'已锁定用户'},
		      {'status':'f.t.is_delete:eq','name':'已删除用户'},
		      {'status':'f.t.enabled:eq','name':'未启用用户'}]
	})
	var checkStatusStore = Ext.create('Ext.data.Store',{
		fields:['status','name'],
		data:[
		      {'status':'_','name':'-请选择-'},
		      {'status':'NEW','name':'新增用户'},
		      {'status':'ENABLE-Y','name':'启用用户'},
		      {'status':'INITPASSWORD','name':'初始化密码'},
		      {'status':'DELETE-N','name':'恢复正常'},
		      {'status':'IS_USER_LOCKED-N','name':'解锁'}]
	})
	var changeStatusArr = {'NEW':'新增用户审核','ENABLE-Y':'启用用户审核','INITPASSWORD':'初始化密码审核','DELETE-N':'申请恢复正常','IS_USER_LOCKED-N':'申请解锁'}
	
	Ext.create('Ext.container.Viewport',{
		layout:'border',
		items:[{
				region:'center',
				xtype:'gridpanel',
				title:'用户安全管理',
				name:'userSafePanel',
				layout:'fit',
				store:userStore,
				tbar:{
					xtype:'form',
					items:[{
						xtype:'toolbar',
						items:[{
							xtype:'textfield',
							fieldLabel:'用户编号',
							flex:6,
							labelAlign:'right',
							name : 'f.t.user_id:like'
						},{
							xtype:'textfield',
							flex:6,
							fieldLabel:'用户名',
							labelAlign:'right',
							name : 'f.t.user_cname:like'
						},{
							xtype:'combobox',
			    			fieldLabel:'查看用户',
			    			flex:6,
			    			labelAlign:'right',
			    			store:userStatusStore,
			    			displayField:'name',
			    			valueField:'status',
			    			name:'queryUser',
			    			value:'',
			    	        listeners:{
			    	        	 select:function(combo, records, eOpts){
			    	        		 var me=this;	
			    	        		 var value = combo.value;
			    	        		 var params = {};
			    	        		 var fs=Ext.ComponentQuery.query('textfield', me.up('toolbar'));  
			    	        		 for(var i in fs){
			    	        			 params[fs[i].name]=fs[i].getValue();
			    	        		 }
			    	        		 if(value){
			    	        			 if(value=='f.t.enabled:eq'){
			    	        				 params[value] = 'N';
			    	        			 }else{
			    	        				 params[value] = 'Y';
			    	        			 }
			    	        		 }
			    	        		 userStore.proxy.extraParams=params;
			    	        		 userStore.loadPage(1);
			    	        		 var c = Q('combobox[name=checkUser]');
			    	        		 c.setValue('_');
			    	        	 }
			    	         }
						},{
			    			xtype:'combobox',
			    			fieldLabel:'等待审核',
			    			flex:6,
			    			labelAlign:'right',
			    			store:checkStatusStore,
			    			displayField:'name',
			    			valueField:'status',
			    			name:'checkUser',
			    			hidden:isFourEyes=='N',
			    			value:'_',
			    			listeners:{
			    				select:function(combo, records, eOpts){
			    					var me = this;
			    					var params = {};
			    					params['f.change_status:eq'] = combo.value;
			    					var fs=Ext.ComponentQuery.query('textfield', me.up('toolbar'));  
			    	        		for(var i in fs){
			    	        			params[fs[i].name]=fs[i].getValue();
			    	        		}
			    					userStore.proxy.extraParams=params;
			    	        		userStore.loadPage(1);
			    					var c = Q('combobox[name=queryUser]');
			    					c.setValue('');
			    				}
			    			}
			    		},{
							text : '查询',
							iconCls : "search-icon",
							flex:2,
							handler : function() {
										var me=this;	
										var params={};
					    		        var fs=Ext.ComponentQuery.query('textfield', me.up('toolbar'));  
						    			for(var i in fs){
						    				params[fs[i].name]=fs[i].getValue();
						    			}
								    	var c1 = Q('combobox[name=queryUser]');
								    	var v1 = c1.getValue();
								    	if(v1){
			    	        				if(v1=='f.t.enabled:eq'){
			    	        					params[v1] = 'N';
			    	        				}else{
			    	        				 	params[v1] = 'Y';
			    	        			 	}
			    	        		 	}
								    	userStore.proxy.extraParams =params;
								    	userStore.loadPage(1);
//				    					c1.setValue('');
				    					//var c2 = Q('combobox[name=checkUser]');
//				    	        		c2.setValue('_');
							}
						},{
							xtype:'tbspacer',
							flex:6
						}]
					}]
				},
				columns:[
				         {xtype: 'rownumberer', width:35, align: 'center'},
				         {text:'用户编号',dataIndex:'USER_ID'},
				         {text:'用户名',dataIndex:'USER_CNAME'},
				         {text:'机构编号',dataIndex:'INST_ID'},
				         {text:'机构简称',dataIndex:'INST_SMP_NAME'},
				         {text:'部门名称',dataIndex:'DEPART_NAME'},
				         {text:'手机',dataIndex:'MOBILE'},
				         {text:'修改人',dataIndex:'CHANGE_USER'},
				         {text:'审核人',dataIndex:'CHECK_USER'},
				         {
				        	 text : '启  用',
				        	 width:45,
				        	 align:'center',
				        	 xtype:'actioncolumn',
				        	 dataIndex:'ENABLED',
				        	 items:[{
									getClass:function(v){
										if(v=='Y'){
											return 'success-icon';
										}else{
											return 'cancel-icon';
										}
									},
					                handler: function(grid, rowIndex, colIndex) {
					                	var userId=grid.getStore().getAt(rowIndex).get('USER_ID');
					                	var changeStatus = grid.getStore().getAt(rowIndex).get('CHANGE_STATUS');
					                	var enabled=grid.getStore().getAt(rowIndex).get('ENABLED');
					                	var isUserLocked=grid.getStore().getAt(rowIndex).get('IS_USER_LOCKED');
					                	var isDelete=grid.getStore().getAt(rowIndex).get('IS_DELETE');
					                	if((isUserLocked=='Y'||isDelete=='Y')&&enabled=='Y'){
				                			Ext.MessageBox.alert("提示","用户【"+userId+"】已被锁定或者被删除！");
				                		}else{
				                			if(isFourEyes=='N'){
				                				changeUserEnabled(grid, rowIndex,userId,enabled);
				                			}else {
				                				if((changeStatus=='ENABLE-Y'||changeStatus=='NEW'||changeStatus=='INITPASSWORD')&&enabled=='N'){
				                					Ext.MessageBox.alert("提示","已有申请任务，请等待审核！");
				                				}else {
				                					changeUserEnabled(grid, rowIndex,userId,enabled);
				                				}
				                			}
				                		}
					                	
					                }
								}]
						},{
							text:'锁 定',
			        		width:45,
			        		align:'center',
			        		xtype:'actioncolumn',
			        		dataIndex:'IS_USER_LOCKED',
			        		items:[{
			        			getClass:function(v){
			        				 if(v=='N'){
			        					 return 'unlock-icon';
			        				 }else{
			        					 return 'lock-icon';
			        				 }
			        			},
				        		handler:function(grid,rowIndex){
				        			var userId=grid.getStore().getAt(rowIndex).get('USER_ID');
				        			var changeStatus = grid.getStore().getAt(rowIndex).get('CHANGE_STATUS');
				        			var isUserLocked=grid.getStore().getAt(rowIndex).get('IS_USER_LOCKED');
				        			var enabled=grid.getStore().getAt(rowIndex).get('ENABLED');
				                	var isDelete=grid.getStore().getAt(rowIndex).get('IS_DELETE');
				                	if((enabled=='N'||isDelete=='Y')&&isUserLocked=='N'){
			                			Ext.MessageBox.alert("提示","用户【"+userId+"】未启用或者被删除！");
			                		}else{
			                			if(isFourEyes=='N'){
			                				changeUserLokced(grid, rowIndex,userId,isUserLocked);
			                			}else{
			                				if(changeStatus=='IS_USER_LOCKED-N'&&isUserLocked=='Y'){
			                					Ext.MessageBox.alert("提示","已提交申请，请等待审核！");
			                				}else {
			                					changeUserLokced(grid, rowIndex,userId,isUserLocked);
			                				}
			                			}
			                		}
				        		}
				        	}]
						},{
							text:'删  除',
							width:45,
							align:'center',
							xtype:'actioncolumn',
							dataIndex:'IS_DELETE',
							items:[{
			        			getClass:function(v){
			        				 if(v=='N'){
			        					 return 'failure-icon';
			        				 }else{
			        					 return 'success-icon';
			        				 }
			        			},
				        		handler:function(grid,rowIndex){
				        			var userId=grid.getStore().getAt(rowIndex).get('USER_ID');
				        			var changeStatus = grid.getStore().getAt(rowIndex).get('CHANGE_STATUS');
				        			var isDelete=grid.getStore().getAt(rowIndex).get('IS_DELETE');
				        			var isUserLocked=grid.getStore().getAt(rowIndex).get('IS_USER_LOCKED');
				        			var enabled=grid.getStore().getAt(rowIndex).get('ENABLED');
				        			if((enabled=='N'||isUserLocked=='Y')&&isDelete=='N'){
			                			Ext.MessageBox.alert("提示","用户【"+userId+"】未启用或者被锁定！");
			                		}else{
			                			if(isFourEyes=='N'){
			                				changeUserDelete(grid, rowIndex,userId,isDelete);
			                			}else{
			                				if(changeStatus=='DELETE-N'&&isDelete=='Y'){
			                					Ext.MessageBox.alert("提示","已提交申请，请等待审核！");
			                				}else {
			                					changeUserDelete(grid, rowIndex,userId,isDelete);
			                				}
			                			}
			                		}
				        		}
				        	}]
						},{
							text:'是否通过审核',
							xtype:'actioncolumn',
							align:'center',
							hidden:isFourEyes=='N',
							items:[{
								iconCls: 'flag-green-icon',
				                handler: function(grid, rowIndex, colIndex) {
				                	 var userId=grid.getStore().getAt(rowIndex).get('USER_ID');
				        			 var changeStatus = grid.getStore().getAt(rowIndex).get('CHANGE_STATUS');
						    		 var changeUser = grid.getStore().getAt(rowIndex).get('CHANGE_USER');
						    		 if(changeStatus==''){
							    		Ext.MessageBox.alert("提示","无审核申请！");
						    		 }else{
							    		if(changeUser==currentUserId){
							    			Ext.MessageBox.alert("提示","修改人和审核人不能是同一个！");
							    		}else{
							    			auditPass(userId,changeStatus);
							    		}
							    	}
				                }
							},{
								xtype:'tbspacer',
								width:10
							},{
								iconCls:'flag-red-icon',
								handler: function(grid, rowIndex, colIndex) {			               	
									var userId = grid.getStore().getAt(rowIndex).get('USER_ID');
						    		var changeStatus = grid.getStore().getAt(rowIndex).get('CHANGE_STATUS');
						    		var changeUser = grid.getStore().getAt(rowIndex).get('CHANGE_USER');
						    		if(changeStatus==''){
						    			Ext.MessageBox.alert("提示","无审核申请！");
						    		}else{
						    			if(changeUser==currentUserId){
						    				Ext.MessageBox.alert("提示","修改人和审核人不能是同一个！");
						    			}else{
						    				auditNotPass(userId,changeStatus);
						    			}
						    		}
				                }
							}]
						},{
							text:'审核信息',
							dataIndex:'CHANGE_STATUS',
							hidden:isFourEyes=='N',
							renderer : function(val) {
			                    if(val){
			                    	return changeStatusArr[val];
			                    }
			                    return val;
							}
						},{
							text: '重置密码',
							xtype:'actioncolumn',
							width: 65,
							align: 'center',
							iconCls: 'recover-icon',
							handler: function(grid, rowIndex, colIndex,item,e,record){
								Ext.Ajax.request({
								    url: 'changePasswordInited.ajax?f=BSYS.0402.edit',
								    params: {
								        userId: record.data.USER_ID
								    },
								    success: function(response){
								    	var text = Ext.decode(response.responseText);
								    	if(text>0){
								      	 	jesAlert("操作成功");
								    	}else{
								    		jesAlert("操作失败");
								    	}
								    }
								});								
							}
						}],
				dockedItems : [{
					xtype : 'jespaging',
					store : userStore,
					dock : 'bottom',
					displayInfo : true
				}]
		}]
	})
	
	function changeUserEnabled(grid, rowIndex,userId,enabled){
		var temp = (enabled=='N'?'Y':'N');
		Ext.Ajax.request({
			url:'changeUserEnabled.ajax?f=BSYS.0401',
			params:{
				userId:userId,
				enabled:enabled
			},
			success:function(response){
				var text=Ext.decode(response.responseText);
				if(text=="success"){
					grid.getStore().getAt(rowIndex).data.ENABLED=temp;
					grid.getStore().getAt(rowIndex).data.CHANGE_STATUS='';
					grid.refresh();
				}else if(text=="wait"){
					jesAlert('申请已提交！');
					grid.getStore().getAt(rowIndex).data.CHANGE_USER=currentUserId;
					grid.getStore().getAt(rowIndex).data.CHANGE_STATUS='ENABLE-Y';
					grid.refresh();
				}
			}
		});
	}
	function changeUserLokced(grid, rowIndex,userId,isUserLocked){
		var temp = (isUserLocked=='N'?'Y':'N');
    	Ext.Ajax.request({
    		url:'changeUserLokced.ajax?f=BSYS.0401',
    		params:{
    			userId:userId,
    			isUserLocked:isUserLocked
    		},
    		success:function(response){
				 var text=Ext.decode(response.responseText);
				 if(text=="success"){
					 grid.getStore().getAt(rowIndex).data.IS_USER_LOCKED=temp;
					 grid.getStore().getAt(rowIndex).data.CHANGE_STATUS='';
					 grid.refresh();
				 }else if(text=="wait"){
					 jesAlert('申请已提交！');
					 grid.getStore().getAt(rowIndex).data.CHANGE_USER=currentUserId;
					 grid.getStore().getAt(rowIndex).data.CHANGE_STATUS='IS_USER_LOCKED-N';
					 grid.refresh();
				 }
			 }
    	});
	}
	function changeUserDelete(grid, rowIndex,userId,isDelete){
		var temp = (isDelete=='N'?'Y':'N');
    	Ext.Ajax.request({
    		url:'changeUserDelete.ajax?f=BSYS.0401',
    		params:{
    			userId:userId,
    			isDelete:isDelete
    		},
    		success:function(response){
				 var text=Ext.decode(response.responseText);
				 if(text=="success"){
					 grid.getStore().getAt(rowIndex).data.IS_DELETE=temp;
					 grid.getStore().getAt(rowIndex).data.CHANGE_STATUS='';
					 grid.refresh();
				 }else if(text=="wait"){
					 jesAlert('申请已提交！');
					 grid.getStore().getAt(rowIndex).data.CHANGE_USER=currentUserId;
					 grid.getStore().getAt(rowIndex).data.CHANGE_STATUS='DELETE-N';
					 grid.refresh();
				 }
			 }
    	});
	}
	function auditNotPass(userId,changeStatus){
		Ext.Ajax.request({
			 url:'auditNotPass.ajax?f=BSYS.0401',
			 params:{
				 userId:userId,
				 changeStatus:changeStatus
			 },
			 success:function(response){
				 var text=Ext.decode(response.responseText);
				 if(text=="success"){
					 jesAlert('操作成功！');
					 userStore.loadPage(1);
				 }else if(text=="failed"){
					 Ext.MessageBox.alert("提示","操作失败，请重试！");
				 }
			 }
		 })
	}
	function auditPass(userId,changeStatus){
		Ext.Ajax.request({
			 url:'auditPass.ajax?f=BSYS.0401',
			 params:{
				 userId:userId,
				 changeStatus:changeStatus
			 },
			 success:function(response){
				 var text=Ext.decode(response.responseText);
				 if(text=="success"){
					 jesAlert('审核成功！');
					 userStore.loadPage(1);
				 }else if(text=="failed"){
					 Ext.MessageBox.alert("提示","操作失败!");
				 }
			 }
		 })
	}
})
