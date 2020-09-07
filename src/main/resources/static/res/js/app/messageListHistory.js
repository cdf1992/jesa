	
Ext.require([
    
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.ux.window.Notification',
	'Ext.layout.container.Border',
    'Ext.picker.Date',
    'Ext.ux.jes.PagingToolbar'
]);
var messageStore = Ext.create('Ext.data.Store',{
	fields:['msgId', 'fromUser', 'toUser', 'msgBody', 'sendTime', 'expiredFlag', 'baseMsgId','urlType','urlKey','ssId'],
	autoLoad : true,
	proxy:{
		type: 'ajax',
		url: 'getUserMessages.ajax',
		reader:{
			type:'json',
			root:'data',
			totalProperty:'count'
		}
		
	}
});

Ext.onReady(function(){
	var hiddenStatus = false;
	var hiddenFlag = true;
	if(deletebillOrMessage.indexOf("true")==-1){
		hiddenFlag = false;
	}
	var searchUser = Ext.create('Ext.data.Store',{
		fields:['USER_ID_CNAME','USER_ID','USER_CNAME'],
		proxy:{
			type: 'ajax',
			url: 'searchUsers.ajax'
		}
	});
	
	//searchUser.load();
	/*
	var messageHistoryStore = Ext.create('Ext.data.Store', {
		
		fields:['MSG_BODY','MSG_ID','USER_CCNAME','USER_CNAME','SEND_TIME'],
		proxy:{
			type:'ajax',
			url: 'messagesHistoryQuery.ajax?f=BSYS.main.messagesHistoryQuery',
			reader:{
				type:'json',
				root:'messageHistory',
				totalProperty:'messageCount'
			}
		}
	});
	messageHistoryStore.loadPage(1);*/
		
	var messagebar = new Ext.ux.jes.PagingToolbar({
		store:messageStore,
		displayInfo:true,
		displayMsg:'第{0}条到第{1}条-共{2}条',
		emptyMsg:'没有查询到相关的菜单信息'
	});
	
	
		Ext.create('Ext.container.Viewport', {
				//id    : '__view__billboard__panel__',
				//title: '公告历史信息',
				//iconCls : 'edit-icon',
			//	autoScroll:true,
				//closable : true,
				layout:'fit',
				items: [{
						
						xtype:'gridpanel',
						title:'未读私信消息',
						tbar:[{
							xtype : 'tbspacer',
							width : 20
							},'对话内容：', {
								xtype : 'field',
								name: 'f.msg_body:like',
								allowBlank: false
							},'发送人：', {
								xtype : 'combobox',
								name: 'f.FROM_USER:eq',
								allowBlank: true,
						        emptyText:'请至少输入两个字符',
						        allowBlank: true,
						        queryMode :'remote',
						        minChars :'2',
						        displayField:'USER_ID_CNAME',
								valueField:'USER_ID',
								forceSelection:true,
						        store:searchUser
							},'接收人：', {
								xtype : 'combobox',
								name: 'f.TO_USER:eq',
								allowBlank: true,
						        emptyText:'请至少输入两个字符',
						        allowBlank: true,
						        queryMode :'remote',
						        minChars :'2',
						        displayField:'USER_ID_CNAME',
								valueField:'USER_ID',
								forceSelection:true,
						        store:searchUser
							},{							
								text : '查询',
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
					    				if(f[i].name=='f.FROM_USER:eq'||f[i].name=='f.TO_USER:eq')
					    					params[f[i].name]=f[i].value;
					    			}
					    			messageStore.proxy.extraParams =params;
					    			messageStore.load();
							    	
							    	
								}
						},'->',{
							text: '写消息',
			    	        iconCls : "add-message-icon",
							hidden: hiddenFlag,
							handler : function() {
						    	 var sendWin=createSendWin();
								 sendWin.down('form').getForm().reset();
								 sendWin.setTitle('写消息：');
								 sendWin.down('form').getForm().url='sendMessage.ajax';
				    			 sendWin.show();
					         }									
						},{
								text: '删除',
								iconCls: 'delete-icon',
								hidden: hiddenFlag,
								handler: function(btn){
									var params = [];
									var selectRecords = btn.up('gridpanel').getSelectionModel().getSelection();
									for(var i = 0;i<selectRecords.length;i++){
										params.push(selectRecords[i].data.msgId);
									}
									Ext.Ajax.request({
									    url: 'deleteMessage.ajax?f=BSYS.main',
									    params: {
									        messageIds: params
									    },
									    success: function(response){
									        var text = response.responseText;
									        jesAlert(text);
									        messageStore.remove(selectRecords);
										    if(text.indexOf("失败")){
										    	messageStore.reload();
										    }
									    }
									});									
									
								}
						}],
						selModel: {
							mode: 'SIMPLE'
						},
						selType : 'checkboxmodel',
						bbar:messagebar,
						store:messageStore,
						columns:[{header: '序号',xtype: 'rownumberer', width:55, align: 'center'},
						    	 { text: '查看',xtype:'actioncolumn', width: 50,iconCls : 'edit-icon', align: 'center', 
									handler:function(view, rowIndex, cellIndex, item, e, record)
									{
				            		detailWindow.show();
									detailWindow.down('form').loadRecord(record);
									detailWindow.down('panel[name=west]').collapse();
								    if(record.get('expiredFlag')!='W') return;
								    Ext.Ajax.request({
										url : 'setExpiredFlag.ajax',
										params : {
											msgId : record.get('msgId'),
											expiredFlag :'N'
										}
									});
								    record.set('expiredFlag','N');
									}},
								 { text: '回复',xtype:'actioncolumn', width: 50,iconCls : 'sent-message-icon', align: 'center', 
									handler:function(view, rowIndex, cellIndex, item, e, record)
									{
										var sendWin=createReWin(record);
										sendWin.down('textfield[name=msgId]').setValue(record.data.msgId);
										sendWin.down('textfield[name=toUser]').setValue(record.data.toUser);
										sendWin.show();	
									 
										}},
								 { text: '转发',xtype:'actioncolumn', width: 50,iconCls : 'show-message-icon', align: 'center',handler:function(view, rowIndex, cellIndex, item, e, record)
									{
									 var me=this;
										if(record  == undefined ||record == '' || record==null || record.length>1) return jesAlert('请选择一条信息');
										var sendWin=createSendWin();
										sendWin.down('form').getForm().url='forwardMessage.ajax';
										sendWin.setTitle('转发：');
										sendWin.down('textfield[name=baseMsgId]').setValue(record.data.baseMsgId);
										sendWin.down('textarea[name=msgBody]').setValue(record.data.msgBody);
										sendWin.show();	
											}},
 								 { text: '过期',xtype:'actioncolumn', width: 50,iconCls : 'sent-message-icon', align: 'center', 
									handler:function(view, rowIndex, cellIndex, item, e, record){
										console.log(record.data.expiredFlag);
										console.log(record.get('msgId'));
										  Ext.Ajax.request({
											url : 'updateExpiredFlag.ajax',
											params : {
												msgId : record.get('msgId'),
												expiredFlag :'N'
											}, failure:function(response,opts){
			      								 alert('服务器异常['+response.msg+']');
			      							 },
			      							 success: function(response,req){
			      							 	jesAlert("成功");
		                       					window.location.reload();
			      							 }
										});
								 }},
								 { text: '过期标志', width: 200, align: 'center', dataIndex: 'expiredFlag',renderer : function(v) {
									 if(v=='W'){
										 return '未读';
									 }else  if(v=='N'){
										 return '过期';
									 }else  if(v=='Y'){
										 return '未过期';
									 }
								 }},
						         { text: '对话内容',  align: 'left', dataIndex: 'msgBody', flex: 1},
								 { text: '发送人', width: 120, align: 'center', dataIndex: 'fromUser'},
								 { text: '接收人', width: 120, align: 'center', dataIndex: 'toUser'},
								 { text: '发送时间', width: 200, align: 'center', dataIndex: 'sendTime'},
								 { hidden:true, width: 200, align: 'center', dataIndex: 'baseMsgId'}
								 
								 
						]
					}]
			});
			
});
var detailWindow=Ext.create('Ext.window.Window', {
    name:'detailWindow',
    height: 300,
    width: 500,
	layout:'border',
	closeAction:'hide',
	maximizable:true,
	items:[{
        title: '同一信息链',
        region:'west',
        xtype: 'panel',
        name:'west',
        width: 256,
        collapsible: true,
        collapsed:true,
        split : true,
        layout: 'fit',
        listeners : {
        	expand:function(p, eOpts ){
        		var baseMsgIdInfo = Ext.create('Ext.data.Store',{
        			autoLoad: true,
        			fields:['msgId', 'fromUser', 'toUser', 'msgBody', 'sendTime', 'expiredFlag', 'baseMsgId','urlType','urlKey','ssId'],
        			proxy:{
        				type: 'ajax',
        				url: 'getMsgsBybaseMsgId.ajax',
        				extraParams : {
							baseMsgId : p.up('window').down('textfield[name=baseMsgId]').value
						}
        			}
        		});
        		p.down('dataview[name=baseMsgIdInfo]').bindStore(baseMsgIdInfo);
        	}
        },
        items:{
        	 overflowY: 'auto',
             xtype: 'dataview',
             name:'baseMsgIdInfo',
             itemTpl: '<div class="view-item" style="padding: 10px;border-bottom:1px solid gray;width:100%;word-break:break-all;"><span style="font-weight:bolder;">{fromUser}</span> to: <span style="font-weight:bolder;">{toUser}</span><br>{msgBody}<br><span style="float:right;text-align:right">{sendTime}</span><br></div>',
             store: null,
             itemSelector: 'div.view-item',
             emptyText: '<div class="x-grid-empty"></div>'
        }
    },{
        region: 'center',
        xtype: 'panel',
        layout: 'fit',
        items:{
			xtype : 'form',
		    bodyPadding: 5,
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },
		    items: [{
		    	xtype : 'textfield',
		    	hidden:true,
		        name: 'baseMsgId'
		    },{
		    	xtype : 'textfield',
		        fieldLabel: '发信人',
		        name: 'toUser'
		    },{
		    	xtype:'textfield',
		        fieldLabel: '子系统',
		        name: 'ssId'
		    },{
		    	xtype:'textarea',
		        fieldLabel: '收到消息',
		        name: 'msgBody'
		    },{
		    	xtype:'textfield',
		        fieldLabel: '发信时间',
		        name: 'sendTime'
		    }],
		    buttons: [ {
		        text: '我知道了',
		        handler: function() {
		        	var formPanel = this.up('form');
		        	var form = formPanel.getForm();
		        	Ext.Ajax.request({
						url : 'setExpiredFlag.ajax',
						params : {
							msgId : form.getRecord().get('msgId'),
							expiredFlag :'Y'
						},
						success: function(response,req){	
							messageStore.load();
							formPanel.up('window').close();
						}
					});
		        }
		    }]
		}
        
    }]
});
function createSendWin(){
	return Ext.create('Ext.window.Window', {
	    width: 500,
		layout:'fit',
		items:{
			xtype : 'form',
		    bodyPadding: 5,
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },
		    items: [{
		    	xtype : 'textfield',
		        fieldLabel: '消息编号',
		        name: 'msgId',
		        hidden:true
		    },{
		    	xtype : 'textfield',
		        fieldLabel: '信息链',
		        name: 'baseMsgId',
		        hidden:true
		    },{
		    	xtype : 'combobox',
		        fieldLabel: '收件人',
		        name: 'toUser',
		        emptyText:'请至少输入两个字符',
		        allowBlank: false,
		        queryMode :'remote',
		        minChars :'2',
		        displayField:'USER_ID_CNAME',
				valueField:'USER_ID',
				forceSelection:true,
		        store:Ext.create('Ext.data.Store',{
		    		fields:['USER_ID_CNAME','USER_ID','USER_CNAME'],
		    		proxy:{
		    			type: 'ajax',
		    			url: 'searchUsers.ajax'
		    		}
		    	})
		    },{
		    	xtype:'textarea',
		        fieldLabel: '发送消息',
		        name: 'msgBody',
		        allowBlank: false
		    }],
		    buttons: [ {
		        text: '发送',
		        formBind: true, //only enabled once the form is valid
		        disabled: true,
		        handler: function() {
		        	var formPanel = this.up('form');
		            var form = formPanel.getForm();
		            if (form.isValid()) {
		                form.submit({
		                    success: function(form, action) {
		                       jesAlert(action.result.msg);
		                       window.location.reload();
		                       formPanel.up('window').close();
		                    },
		                    failure: function(form, action) {
		                    	jesAlert(action.result.msg);
		                    }
		                });
		            }
		        }
		    }]
		}
	});
}


function createReWin(record){
	return Ext.create('Ext.window.Window', {
	    title:'回复：'+record.data.fromUser,
	    width: 500,
		layout:'fit',
		items:{
			xtype : 'form',
		    bodyPadding: 5,
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },
		    items: [{
		    	xtype : 'textfield',
		    	hidden:true,
		        fieldLabel: '消息编号',
		        name: 'msgId'
		    },{
		    	xtype : 'textfield',
		        fieldLabel: '收件人',
		        name: 'toUser',
		        allowBlank: false
		    },{
		    	xtype:'textarea',
		        fieldLabel: '发送消息',
		        name: 'msgBody',
		        allowBlank: false
		    }],
		    buttons: [ {
		        text: '发送',
		        formBind: true, //only enabled once the form is valid
		        disabled: true,
		        handler: function() {
		        	var formPanel = this.up('form');
		            var form = formPanel.getForm();
		            if (form.isValid()) {
		                form.submit({
		                	url:'replyMessage.ajax',
		                    success: function(form, action) {
		                       jesAlert(action.result.msg);
		                       window.location.reload();
		                       formPanel.up('window').close();
		                    },
		                    failure: function(form, action) {
		                    	jesAlert(action.result.msg);
		                    }
		                });
		            }
		        }
		    }]
		}
	});
}