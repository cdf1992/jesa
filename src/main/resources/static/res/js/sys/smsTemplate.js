Ext.require([
             'Ext.form.*',
             'Ext.tree.*',
             'Ext.grid.*',
             'Ext.window.Window',
             'Ext.ux.window.Notification',
             'Ext.ux.jes.PagingToolbar',
             'Sys.app.store.UserStore',
             'Sys.app.store.InstTreeStore',
             'Ext.tip.QuickTipManager',
             'Ext.ux.jes.NotOnlySpaceText'
            ]);

Ext.onReady(function() {
	Ext.tip.QuickTipManager.init();
	var pageingStore=new Sys.app.store.UserStore();
	
	var userStore  = Ext.create('Ext.data.Store', {
		autoLoad : false,
		fields : ['USER_ID', 'USER_CNAME', 'MOBILE'],
		proxy:{
			type: 'ajax',
			url: 'querySmsTemplateId.ajax?f=BSYS.0203',
			reader:{
				 type: 'json',
		         root: 'userList'
			}
		},
		listeners: {
			load:function(me,records){
				Q('grid[name=user1]').getSelectionModel().deselectAll();
				pageingStore.each(function(s){
					for(var j=0;j<records.length;j++){
						if(s.get('USER_ID')==records[j].data.USER_ID){
							Q('grid[name=user1]').getSelectionModel().select(s,true,false);
						}
					}
				});
			}
		}
	});
	
	var smsTemplateStore  = Ext.create('Ext.data.Store', {
		autoLoad : true,
		fields : ['smsTemplateId', 'smsTemplateName', 'smsTemplateMsg'],
		proxy:{
			type: 'ajax',
			url: 'querySmsTemplate.ajax?f=BSYS.0203',
			reader:{
				 type: 'json',
		         root: 'smsTemplateList'
			}
		}
	});
	
	pageingStore.proxy.extraParams = {
		instId : instId
	};
	pageingStore.loadPage(1);
								
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		defaults :{
			split :true
		},
		items : [{
			region : 'center',
			xtype : 'gridpanel',
			flex:2,
			name : 'userTemplate',					
			title : '短信模板列表',
			selType : 'checkboxmodel',
			selModel:{mode :'SIMPLE'},
			tbar : {
				xtype : 'container',
				items : [new Ext.Toolbar({
							items : [{
										xtype : 'tbspacer',
										width: 5
									},'模板名称:',{
										xtype : 'textfield',
										name : 'smsTemplate',
										id : 'smsTemplate',
										flex : 1,
										regexText : '输入的值有空格',
										regex : /^(?:(?!\s).){1,}$/
									}, {
										xtype : 'tbspacer',
										width: 5
									},{
										width: 60,
										text : '查询',
										iconCls : "search-icon",
										handler : function() {
													var me=this;	
													var params={};
								    		        var fs=Ext.ComponentQuery.query('field', me.up('toolbar'));  
									    			for(var i in fs){
									    				params[fs[i].name]=fs[i].getValue();
									    			}
									    			smsTemplateStore.proxy.extraParams =params;
									    			smsTemplateStore.loadPage(1);
										}
									}, {
										xtype : 'tbspacer',
										flex :2
									}]
						}), new Ext.Toolbar({
					items : [{
						text : '增加',
						iconCls : "add-icon",
						handler : function(bt) {
							var from = bt.up("viewport").down("form").getForm();
							var stor = bt.up("viewport").down("grid[name=user2]").getStore();
							pageingStore.loadPage(1);
							from.reset();
							stor.removeAll();
							bt.up("viewport").down("form").down("hiddenfield[name=userStrType]").setValue("save");
							bt.up("viewport").down("form").down("textfield[name=smsTemplateId]").setReadOnly(false);
						}								
					},{
						text : '删除',
						iconCls : "delete-icon",
						handler : function(bt) {
							var params = [];
							var selectRecords = bt.up("viewport").down("gridpanel[name=userTemplate]").getSelectionModel().getSelection();
							for(var i = 0;i<selectRecords.length;i++){
								params.push(selectRecords[i].data.smsTemplateId);
							}
							Ext.Ajax.request({
							    url: 'deleteSmsTemplate.ajax?f=BSYS.0203',
							    params: {
							    	templateId: params
							    },
							    success: function(response){
							        var text = response.responseText;
							        if(text.indexOf("success")>0){
							        	jesAlert("删除成功！");
							        	var from = bt.up("viewport").down("form").getForm();
										var stor = bt.up("viewport").down("grid[name=user2]").getStore();
										pageingStore.loadPage(1);
										from.reset();
										stor.removeAll();
							        	//smsTemplateStore.remove(selectRecords);
							        }
								    if(text.indexOf("fail")>0){
								    	jesAlert("删除失败！");
								    }
								    smsTemplateStore.reload();
							    }
							});			
						}								
					}]
				})]
			},
			layout : 'fit',
			store : smsTemplateStore,
			columns : [{ header: '序号', xtype: 'rownumberer', width:40, align: 'center'},
			           {
						text : '短信模板ID',
						dataIndex : 'smsTemplateId'
					},{
						text : '短信模板名称',
						dataIndex : 'smsTemplateName',
						flex:1
					},{
						text : '短信模板描述',
						dataIndex : 'smsTemplateMsg',
						flex:2,
						align:'center'
					}],
			listeners: {
				itemclick:function(t,record,item){
					var from = t.up("viewport").down("form").getForm();
					from.loadRecord(record);
					var smsTemplateId = record.get("smsTemplateId")
					var params={smsTemplateId:smsTemplateId};
					userStore.proxy.extraParams =params;
			    	userStore.loadPage(1);
			    	t.up("viewport").down("panel[name=smsPanel]").down("hiddenfield[name=userStrType]").setValue("update");
			    	t.up("viewport").down("panel[name=smsPanel]").down("textfield[name=smsTemplateId]").setReadOnly(true);
				}
			},
			dockedItems : [{
						xtype : 'jespaging',
						store : smsTemplateStore,
						dock : 'bottom',
						displayInfo : true
					}]
		},{
					region : 'east',
					xtype : 'form',
					title : '短信模板',
					name : "smsPanel",
					flex:3,
		    	    items:[{
	    	        	  xtype:'panel',
	    	        	  title:'模板信息',
	    	        	  height:170,
	    	        	  layout:"column",
		    	    	  defaults:{columnWidth:.5,padding:"10 5 0 0",labelWidth:80},
		    	    	  bodyPadding:10,
	    	        	  flex:1,
	    	        	  items:[{
	    	        		  	xtype: 'hiddenfield',
	    	        	        name: 'userStr'
	    	        	    	},{
		    	        		  	xtype: 'hiddenfield',
		    	        	        name: 'userStrType',
		    	        	        value: 'save'
		    	        	    },{
	    	        	        xtype: 'textfield',
	    	        	        name: 'smsTemplateId',
	    	        	        fieldLabel: '短信模板ID',
	    	        	        allowBlank: false  
		    	        	    }, {
		    	        	        xtype: 'textfield',
		    	        	        name: 'smsTemplateName',
		    	        	        fieldLabel: '短信模板名称',
		    	        	        allowBlank: false   
		    	        	    },{
	    	        		  	xtype     : 'textareafield',
	    	        	        grow      : true,
	    	        	        name      : 'smsTemplateMsg',
	    	        	        columnWidth:1,
	    	        	        fieldLabel: '短信模板内容',
	    	        	        anchor    : '100%'
								}
	        	          ]
	    	          },{
	    	        	  xtype:'panel',
	    	        	  layout:"column",
	    	        	  defaults:{columnWidth:.498},
	    	        	  items:[{
	    	    			xtype : 'gridpanel',
	    	    			height: 380,
	    	    			name : 'user1',					
	    	    			title : '待选用户信息',
	    	    			layout : 'fit',
	    	    			selType : 'checkboxmodel',
	    	    			selModel:{mode :'SIMPLE'},
	    	    			tbar : {
	    	    				xtype : 'container',
	    	    				items : [new Ext.Toolbar({
	    	    							items : [{
	    	    										xtype : 'tbspacer',
	    	    										width: 10
	    	    									},'用户:',{
	    	    										xtype : 'textfield',
	    	    										name : 'f.user_id:like',
	    	    										id : 'user_Id',
	    	    										flex:1,
	    	    										regexText : '输入的值有空格',
	    	    										regex : /^(?:(?!\s).){1,}$/
	    	    									}, {
	    	    										xtype : 'tbspacer',
	    	    										width: 10
	    	    									},{
	    	    										width: 60,
	    	    										text : '查询',
	    	    										iconCls : "search-icon",
	    	    										handler : function() {
	    	    													var me=this;	
	    	    													var params={};
	    	    								    		        var fs=Ext.ComponentQuery.query('field', me.up('toolbar'));  
	    	    									    			for(var i in fs){
	    	    									    				params[fs[i].name]=fs[i].getValue();
	    	    									    			}
	    	    									    			pageingStore.proxy.url='queryUser.ajax?f=BSYS.0203.query';
	    	    											    	pageingStore.proxy.extraParams =params;
	    	    											    	pageingStore.loadPage(1);
	    	    										}
	    	    									}]
	    	    						})]
	    	    			},
	    	    			store : pageingStore,
	    	    			columns : [{ header: '序号', xtype: 'rownumberer', width:40, align: 'center'},
	    	    			           {
	    	    						text : '用户编号',
	    	    						dataIndex : 'USER_ID',
	    	    						flex:3,
	    	    						align:'center'
	    	    					},{
	    	    						text : '用户中文名',
	    	    						dataIndex : 'USER_CNAME',
	    	    						flex:3,
	    	    						align:'center'
	    	    					},{
	    	    						text:'手机',
	    	    						dataIndex:'MOBILE',
	    	    						flex:3,
	    	    						align:'center'
	    	    					}],
	    	    					listeners: {
	    	    						/*itemclick:function(t,record,item){
	    	    							var store = t.up("panel[name=smsPanel]").down("grid[name=user2]").getStore();
	    	    							var r=store.findRecord('USER_ID', record.data.USER_ID);
    	    								if(!r){
    	    									store.add(record.copy())
    	    								}else{
    	    									store.remove(r);
    	    								}
	    	    						},*/
	    	    						select:function(me, record, index, eOpts ){	
	    	    							var store = this.up("panel[name=smsPanel]").down("grid[name=user2]").getStore();
	    	    							var r=store.findRecord('USER_ID', record.data.USER_ID);
    	    								if(!r){
    	    									store.add(record.copy())
    	    								}
	    	    						},
	    	    						deselect:function( me, record, index, eOpts){
	    	    							var store = this.up("panel[name=smsPanel]").down("grid[name=user2]").getStore();
	    	    							var r=store.findRecord('USER_ID', record.data.USER_ID);
    	    								if(r){
    	    									store.remove(r);
    	    								}
	    	    						}
	    	    					},
	    	    			dockedItems : [{
	    	    						xtype : 'jespaging',
	    	    						store : pageingStore,
	    	    						dock : 'bottom',
	    	    						displayInfo : true
	    	    					}]
	    	    			},{
				    	    	xtype : 'gridpanel',
				    			name : 'user2',					
				    			title : '已选用户信息',
				    			selModel:{mode :'SIMPLE'},
				    			layout : 'fit',
				    			store : userStore,
				    			columns : [{
				    				 text: '删除',
							    	 align: 'center',
							    	 xtype: 'actioncolumn',
							    	 iconCls: 'delete-icon',
									handler: function(grid, rowIndex) {
										var store = grid.getStore()
										var record = store.getAt(rowIndex);
										store.remove(record);
									}
								},{
				    						text : '用户编号',
				    						dataIndex : 'USER_ID',
				    						flex:3,
				    						align:'center'
				    					},{
				    						text : '用户中文名',
				    						dataIndex : 'USER_CNAME',
				    						flex:3,
				    						align:'center'
				    					},{
				    						text:'手机',
				    						dataIndex:'MOBILE',
				    						flex:3,
				    						align:'center'
				    					}]
			    	          }]
	    	          }],buttons:[{
		                    	 text:'保存',
		                    	 handler:function(me){
		                    		 var userGridStore = me.up("panel[name=smsPanel]").down("grid[name=user2]").getStore();
		                    		 var form = me.up('form').getForm();
		                    		 var datar = new Array();  
		                    		 var jsonDataEncode = "";  
		                    		 var records = userGridStore.getRange(); 
		                    		 for (var i = 0; i < records.length; i++) {  
		                    		     datar.push(records[i].data.USER_ID);  
		                    		 }  
		                    		 me.up('form').down("hiddenfield[name=userStr]").setValue(datar.toString());
		 			                 form.submit({
		 			                	url: 'sendSmsTemplate.ajax?f=BSYS.0203&ssId='+'${ssId}',
		 			                    success: function(form, action) {
		 			                       smsTemplateStore.loadPage(1);
		 			                       form.reset();
		 			                       userStore.removeAll();
		 			                       pageingStore.loadPage(1);
		 			                       jesAlert(action.result.msg);
		 			                    },
		 			                    failure: function(form, action) {
		 			                        jesErrorAlert(action.result.msg);
		 			                    }
		 			                });		
		                    	 }
		                     }]
				}]
	});
});