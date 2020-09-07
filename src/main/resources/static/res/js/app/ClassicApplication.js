/**
 * ExtJs风格应用程序定义
 */

Ext.require('Ext.container.Viewport');
Ext.require('Ext.ux.IFrame');
Ext.require('Ext.ux.window.Notification');
Ext.require('Sys.app.PassWin');
Ext.require('Ext.util.DelayedTask');
Ext.require('Ext.chart.Chart');
Ext.require('Ext.window.Window');
Ext.require([
             'Ext.ux.jes.PagingToolbar',
             'Ext.ux.jes.TabPanelLoadbyAjax'
         ]);
var jesLocalStorage=new Ext.util.LocalStorage();
var billStore = Ext.create('Ext.data.Store', {
	fields:['BILL_TITLE','BILL_ID','PUBLISH_TIME','USER_CNAME'],
	data:billboardList
});

var menuPanelListeners={
	beforecollapse:function(p){
		if('N'!=jesLocalStorage.getItem('preference.hideMenu')){
			p.up('tabpanel').tabBar.hide(this);
			p.up('viewport').items.getAt(0).hide(this);
		}
	},
	beforeexpand:function(p){
		if('N'!=jesLocalStorage.getItem('preference.hideMenu')){
			p.up('tabpanel').tabBar.show();
			p.up('viewport').items.getAt(0).show();
		}
	}
};


var messageStore = Ext.create('Ext.data.Store',{
	fields:['msgId', 'fromUser', 'toUser', 'msgBody', 'sendTime', 'expiredFlag', 'baseMsgId','urlType','urlKey','ssId'],
	proxy:{
		type: 'ajax',
		url: 'getCurrentUserMessages.ajax'
	},
	msgCount:-1,
	listeners:{
		load:function(me,record,opts){
			Ext.getCmp('__message__panel__').setTitle('私人对话 <span style="color:blue;">['+me.getCount()+'条]</span>');
			if(me.getCount()>0){
				Ext.getCmp('__billboard__Message__panel').expand();
				Ext.getCmp('__message__panel__').expand();
			}
			if(me.getCount()>me.msgCount && me.getCount()>0){
				jesAlert('您有新消息,消息总数['+me.getCount()+']',3000,'br');
		    	me.msgCount=me.getCount();
		    }
		}
	}
});

Ext.define('Sys.app.ClassicApplication', {
	extend : 'Ext.app.Application',
	name : 'BsysApp',
	author : 'jes',
	version : '3.0',
	//productName : null,
	home : 'http://www.chinajes.com.cn/',
	about : function() {
		Ext.MessageBox.alert('华颉信息软件', productName + this.version + '.');
	},
	addMsg : function(msg) {
		Ext.getCmp('__system_msg_saving__').add({html: Ext.util.Format.date(new Date(),'H:i:s')+':'+msg});
	},
	launch : function() {
		var vp=Ext.create('Ext.container.Viewport', {
			layout : 'border',
			items : [{
				region : 'north',
				height : jeslogoHeight+25,
				xtype : "toolbar",
				cls:'bg_dark',
               	//style : 'background:url(res/img/top.jpg) no-repeat;background-size:100% 100%;',
				items :function(a1,a3){
							for(var s1 in subSystems){
								if(!subSystems[s1].menu){
									subSystems[s1].handler=function(){
										viewSubsystem(this.outerUrl || '',this.text,this.id,this.defalutPage,this.iconCls,this.ssShowType);
									};
								}else{
									for(var s2 in subSystems[s1].menu.items){
									subSystems[s1].menu.items[s2].handler=function(){
										if('blank'==this.ssShowType){
											viewOpenWindow(this);
										}else{
											viewSubsystem(this.outerUrl,this.text,this.id,this.defalutPage,this.iconCls,this.ssShowType);
										}

									};
								}
								}
                                subSystems[s1]['height']=30;
							}

							return a1.concat(subSystems).concat(a3);

						}([ {
							xtype : 'box',
							html : '<img src="'+jesLogo+'" />',
							width : jeslogoWidth,
							height : jeslogoHeight
						}, {
							xtype : 'tbtext',
							text : '<span id="productName">' + productName
									+ '<span style="color:red;">'+ envType +'</span></span>'
						}, '', {
							xtype : 'tbtext',
							text : '<span>' + userCname +'[' + userId + ']' + ','+getHello()+'</span>'
						}, '->'], // same as { xtype: 'tbfill' }
						[
						{
							xtype : 'tbspacer',
							width : 2
						}, '', {
							xtype : 'button',
							handler : function() {
								 window.open('main.do','_blank','left=0,top=0,width='+
								 (screen.availWidth - 10) +',height='+
								 (screen.availHeight-50)
								 +',scrollbars,resizable=yes,toolbar=no').focus();
								 window.open("about.ajax",'_self');
							},
							listeners: {
								render: function(btn){
									if(iconMax=="showText"){
										btn.setText("最大化");
									}else if(iconMax=="showNot"){
										btn.hide();
									}else {
										btn.setIconCls('full-icon');
										btn.setTooltip('最大化');
									}
								}
							}
						}, {
							xtype : 'button',
							hidden:isThird,
							id:'__changePWD__',
							handler : function(me,e) {
								Ext.create('Sys.app.PassWin').showBy(Ext.getCmp('__changePWD__'));
							},
							listeners: {
								render: function(btn){
									if(iconUpdate=="showText"){
										btn.setText("修改密码");
									}else if(iconUpdate=="showNot"){
										btn.hide();
									}else {
										btn.setIconCls('keys-icon');
										btn.setTooltip('修改密码');
									}
								}
							}
						},{
							xtype : 'button',
							handler : function() {
								Ext.create('widget.uxNotification', {
									html : '注销登录中...'
								}).show();
								try{
									if(isThird){
										document.execCommand('ClearAuthenticationCache',false);
										window.open('about:blank','_self');
									}else{
										new Ext.util.DelayedTask(function(){
											window.location = 'exit.do';
										}).delay(1000);
									}
								}catch(e){
									//非IE未必支持
								}
							},
							listeners: {
								render: function(btn){
									if(iconExit=="showText"){
										btn.setText("退出系统");
									}else if(iconExit=="showNot"){
										btn.hide();
									}else{
										btn.setIconCls('logout-icon');
										btn.setTooltip('退出系统');
									}
								}
							}
						}, ''])

			}, {
				region : 'center',
				xtype : 'tabpanel',
				id : '__jes_desktop__',
				tabBar : {
					html:expirationDate
				},
				items : [{
							title : '首页',
							layout : 'border',
							items : [{
								region : 'west',
								title : '个人中心',
                                padding : '3 0 3 3',
								tools: [{
									        type: 'gear',
									        callback: function() {
									        	Ext.Msg.show({
													    title: '偏好选择',
													    msg: '隐藏菜单时是否同时隐藏系统标题栏?<BR>是:全隐藏，操作页面最大化.<BR>否:仅隐藏菜单,保持宽屏显示.',
													    width: 330,
													    buttons: Ext.MessageBox.YESNOCANCEL,
													    fn: function(bId){
													    	if('yes'==bId){
													    		jesLocalStorage.setItem('preference.hideMenu','Y');
													    	}
													    	if('no'==bId){
													    		jesLocalStorage.setItem('preference.hideMenu','N');
													    	}
													    },
													    animateTarget: this,
													    icon: Ext.MessageBox.QUESTION
													});
									         }
									    }],
								collapseFirst:false,
								xtype : 'treepanel',
								id:'__favorite__',
								width : 200,
								split : true,
								autoScroll : true,
								collapsible : true,
								rootVisible : false,
								store :Ext.create('Ext.data.TreeStore', {	
										proxy : {
										type : 'ajax',
										url : 'getMyFavorite.ajax',
										reader : {
											type : 'json'
										}
									},
									root : {
										expanded : true
									}
						        }),
								listeners: {
									//取消收藏
									itemcontextmenu:function(view,record,item,index,e,eOpts){
										//禁用浏览器的右键相应事件
										e.preventDefault();
										e.stopEvent();
										 if(record.raw.id=="init_1"||record.raw.id=="init_2"||record.raw.id=="init_3"){
											 return;
										 }
										var dmenus = new Ext.menu.Menu({
												width: 100,
												float:true,
												renderTo: Ext.getBody(),
												items: [{
													 text: '取消收藏',
													 handler:function(){
														 Ext.Ajax.request({
															 url: 'deleteFromMyFavorite.ajax',
				   											 params: {
					    												objectId:record.raw.id,
					    												ssId:record.raw.ssId,
					    												leaf:record.raw.leaf
				   												 },
				   											 success: function(response,req){	
					   											 jesAlert(record.raw.text+'已成功从我的收藏中移除！');
					   											 Ext.getCmp("__favorite__").getStore().getNodeById(record.raw.id).remove();
				   											 }	 
														 });
													 }
											    }]
									    });
									   dmenus.showAt(e.getPoint());
									},
			                        itemclick: function( t, record, item, index, e, eOpts ){
			                        	if(record.raw.id=="init_1"){
			                        		Ext.create('Sys.app.PassWin').show();
			                        	}else if(record.raw.id=="init_2"){
			                        		modifyUser();
			                        	}else if(record.raw.id=="init_3"){
			                        		asynchDownload();
			                        	}else{			                        	
			                        		if(record.raw.ssUrl){
					                        	viewFavorite(record.raw.id,record.raw.ssUrl,record.raw.text,record.raw.ssId,'edit-icon');
											 }
			                        	}
			                        }, 
			                        beforecollapse:menuPanelListeners.beforecollapse,
									beforeexpand: menuPanelListeners.beforeexpand
			                    }
							}, {
								region : 'center',
								layout:{
							        type: 'vbox',
							        align: 'stretch'
							    },
                                padding : '3 0 3 0',
                                border : 0,
								//contentEl:'divPoweredby',
								items : [
									         portlet,
									         {
												flex:1,
												xtype : 'tabpanel',
												id : 'taskTabpanel',
 												title : '我的任务',
					                            activeTab: 0,
 												items : tasks
									         }
 										]
							}, {
								region : 'east',
                                padding : '3 3 3 0',
								collapsible : true,
								collapsed : billboardListShow,
								title : '<i class="fa fa-envelope-o"></i> 消息',
								xtype : 'panel',
								id    : '__billboard__Message__panel',
								width : 200,
								minWidth : 150,
								maxWidth : 600,
								autoScroll : false,
								collapseMode : 'mini',
								split : true,
								collapseFirst:false,
					            layout: {
								        type: 'accordion',
								        titleCollapse: false,
								        animate: true,
								        activeOnTop: false
								    },
								items: [{
									collapseFirst:false,
									tbar: [{
										 xtype: 'button',
										 hidden: isBillboardAuthority,
							      	     tooltip: '发布公告',
							    	     iconCls : "edit-icon",
									     handler : function() {
									    	 addBillboard(billStore);
								         }
						             },{
						            	 xtype   : 'button',
						            	 tooltip : '查看历史',
						            	 iconCls : 'history-icon',
						            	 handler : function() {
						            		 viewFavorite('billboarShow','billboardListHistory.do?f=BSYS.main.billboardListHistory','公告历史信息','BSYS','edit-icon') ;
						            		 //window.open("billboardListHistory.do?f=BSYS.main.billboardListHistory",'_blank');
						            		// billboardHistory();
						            	 }
						             }],
						            id   :'__billboard__panel__',
							        title: '公告信息 <span style="color:blue;">['+billStore.getCount()+'条]</span>',
							        layout:'fit',
							        items:{
								            overflowY: 'auto',
								            xtype: 'dataview',
								            itemTpl: '<div class="view-item" style="padding: 10px;border-bottom:1px solid gray;width:100%;word-break:break-all;"><span style="font-weight:bolder;">{USER_CNAME}</span><span>发布:</span><br><span>{BILL_TITLE}</span><br><span style="float:right;text-align:right">{PUBLISH_TIME}</span></div>',
								            store: billStore ,
								            itemSelector: 'div.view-item',
								            emptyText: '<div class="x-grid-empty">No Matching Billboard</div>',
								            listeners :{
								            	itemclick:function( me, record, item, index, e, eOpts ){
								            		getBillboardById(billStore,record);
								            	}
								            }
								        }
								    },{
								        title: '私人对话',
								        hidden:perSession,
								        layout:'fit',
								        id    :'__message__panel__',
								        tbar: [{ xtype: 'button',
								      	     tooltip: '收取',
								    	     iconCls : "received-meassage-icon",
										     handler : function() {
										    	 messageStore.load();
									         }
							             },{ xtype: 'button',
								       	     tooltip: '写消息',
								    	     iconCls : "add-message-icon",
										     handler : function() {
										    	 var sendWin=createSendWin();
												 sendWin.down('form').getForm().reset();
												 sendWin.setTitle('写消息：');
												 sendWin.down('form').getForm().url='sendMessage.ajax';
												 sendWin.show();
									         }
							             },{ xtype: 'button',
							            	 tooltip: '回复',
							            	 iconCls : "sent-message-icon",
											 handler : function() {
												 var me=this;
												 var msgDataView=me.up('panel').down('dataview[name=msgDataView]');
												 var record=msgDataView.getSelectionModel().getSelection()[0];
												 if(record==null) return jesAlert('请选择一条信息');
												 Ext.create('Ext.window.Window', {
													    title:'回复：'+record.get('fromUser'),
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
														    	xtype : 'hidden',
														        fieldLabel: '消息编号',
														        name: 'msgId',
														        value:record.get('msgId')
														    },{
														    	xtype : 'textfield',
														        fieldLabel: '收件人',
														        name: 'toUser',
														        allowBlank: false,
														        value:record.get('fromUser')
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
													}).show();
											 }
							             },{ xtype: 'button',
							            	 tooltip: '转发',
							            	 iconCls : "show-message-icon",
											 handler : function() {
												var me=this;
												var msgDataView=me.up('panel').down('dataview[name=msgDataView]');
												var record=msgDataView.getSelectionModel().getSelection()[0];
												if(record==null) return jesAlert('请选择一条信息');
												var sendWin=createSendWin();
												sendWin.down('form').getForm().url='forwardMessage.ajax';
												sendWin.setTitle('转发：');
												sendWin.down('textfield[name=baseMsgId]').setValue(record.get('baseMsgId'));
												sendWin.down('textarea[name=msgBody]').setValue(record.get('msgBody'));
												sendWin.show();	
											}
							             },{
								            	 xtype   : 'button',
								            	 tooltip : '查看历史',
								            	 iconCls : 'history-icon',
								            	 handler : function() {	 
								            		 viewFavorite('messageShow','messageListHistory.do?f=BSYS.main.messageListHistory','对话历史信息','BSYS','edit-icon') ;
								            		 //window.open("billboardListHistory.do?f=BSYS.main.billboardListHistory",'_blank');
								            		// billboardHistory();
								            	 }
							             }
							             
							        ],
							        items: {
							            overflowY: 'auto',
							            xtype: 'dataview',
							            name:'msgDataView',
							            itemTpl: '<div class="view-item" style="padding: 10px;border-bottom:1px solid gray;width:100%;word-break:break-all;">from:<span style="font-weight:bolder;">{fromUser}</span><br>{msgBody}<br><span style="float:right; text-align:right;">{sendTime}</span></div>',
							            store: messageStore,
							            itemSelector: 'div.view-item',
							            emptyText: '<div class="x-grid-empty"></div>',
							            listeners : {
							            	added:function(){
							            		messageStore.load();
							            	},
							            	refresh:function(me, eOpts ){
							            		me.getStore().each(function(r){
							            			if('W'==r.get('expiredFlag')){
							            				var node=me.getNode(r);
							         				    node.style.background="#CCCCFF";
							            			}
							            		});
							            	},
							            	itemclick:function( me, record, item, index, e, eOpts ){
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
							            	},
							            	select : function(me, record, eOpts ){
											    var node=me.view.getNode(record);
											    node.style.background="#C0C0C0";
											},
											deselect:function( me, record, eOpts ){
											    var node=me.view.getNode(record);
											    node.style.background="";
											}
										}
										
							        }
								    },{
								        title: '系统提示',
								        id: '__system_msg_saving__'
								    }]
							}]
						}],
						listeners:{
							afterrender:function(me, eOpts){
								try{
									for(var s1 in subSystems){
										if(subSystems[s1].menu){
											for(var s2 in subSystems[s1].menu.items){
												if('autoShow'==subSystems[s1].menu.items[s2].ssShowType){
													var subSystem = subSystems[s1].menu.items[s2];
													viewSubsystem(subSystem.outerUrl,subSystem.text,subSystem.id,subSystem.defalutPage,subSystem.iconCls,subSystem.ssShowType);
												}
											}
										}
									}
								}catch(error){
									
								}
							}
						}
			}]
		});
		var lid = lastIpAndDate.split('_');
		
		/*
		 * 准备增加密码修改后初次登陆，以及密码即将过期的修改密码提醒功能。*/
		if(!isThird){
		if(isFirstLogin=="Y"||passwordInited=="Y"||(passwordExpire!=0 && pwdExpireDays>=0)){
			if(isFirstLogin=="Y"){
				jesAlert('您第一次登入本系统，请重新设置密码.');
			}else if(passwordInited=="Y"){
				jesAlert('您的密码已被管理员重置，请重新设置密码.');
			}else if(pwdExpireDays>=0){
				jesAlert('您有超过'+passwordExpire+'天未修改密码，请重新设置密码.');
			}
			vp.mask();
			var w=new Sys.app.PassWin(vp);
			w.closable=false;
			w.show(Ext.getCmp('__changePWD__'));
		}else{
			jesAlert("您上次登入IP:"+lid[1]+"<BR>登入时间:"+lid[0]+"<BR>密码有效期还剩:<B style='color:red;'>"+(-pwdExpireDays)+"</B>天",3000,'br');
		}
		}
		if (activation == 'no') {
			vp.mask();
			Ext.create('Ext.window.Window', {
				width : 800,
    			height : 120,
    			title : '您的试用版已到期，请输入licence激活',
    			items : [{
    				xtype : 'textfield',
    				name : 'lisenceNum',
    				fieldLabel : '请输入激活码',
    				width : 750,
    				padding : '10,10,10,10'
    			}],
    			buttons: [{
    				text : '提交',
					inputType : 'submit',
					handler : function (me) {
						Ext.Ajax.request({
							url : 'updateLisence.ajax?f=BSYS.0101',
							params : {
								lisenceNum : me.up('window').down('textfield[name=lisenceNum]').getValue()
							},
							success : function(response) {
								var text = Ext.decode(response.responseText);
								if (text == 'true') {
									jesAlert('激活成功！');
									me.up('window').close();
									history.go(0);
								} else {
									Ext.Msg.alert('提示', '激活码已过期，请重新输入或联系管理员！');
								}
							}
						});
					}
    			}]
			}).show();
		}
		
		Ext.util.TaskManager.start({
			     run: function (runCount) {
					 window.top.document.jesRunDuration+=2;
			     	
			     	 if(runCount>1 && (runCount-1)%15==0){
			     		jesAlert('您已连续工作['/*'您已连续工作['*/+2*(runCount-1)+
		     			']分钟,请注意休息.'/*']分钟,请注意休息.'*/);
			     	 }
			     	 
			     	if(runCount>1 && (runCount-1)%5==0){
			     		messageStore.load();
			     	 }

			     	 if(window.top.document.jesRunDuration>=sysJesRunDuration){
			     	 	window.location = 'exit.do';
	                    alert('由于您['/* "由于您[" */+sysJesRunDuration+
	                    		']分钟没有使用本系统，出于安全原因，系统将自动注销您的本次登录。'/* "]分钟没有使用本系统，出于安全原因，系统将自动注销您的本次登录。" */);			     	 			     	 }
				 },
			     interval: 1000*60*2
		 });
	}
	

});

function viewOpenWindow(obj) {

    var tempForm =document.getElementById(obj.ssId) || document.createElement("form");
	tempForm.id=obj.ssId;
	tempForm.action= obj.outerUrl;
	tempForm.method="post";
	tempForm.target="_blank";
	document.body.appendChild(tempForm);
	
	Ext.Ajax.request({
	    url: 'sswindow.ajax',
		params:{
	    	ssUrlExt:obj.ssUrlExt
		},
		async: false,  
	    failure:function(response,opts){
	    	alert('服务器异常['/*'服务器异常['*/+response.status+
			'],请关闭浏览器稍后重试.'/*'],请关闭浏览器稍后重试.'*/);
	    },
		success: function(response) {
			var objData = Ext.decode(response.responseText);
	    	for(var key in objData){
		    	var tempInput = document.createElement("input");
		    	tempInput.type="hidden";
		    	tempInput.name= key;
		    	tempInput.value=objData[key];
		    	tempForm.appendChild(tempInput);
			} 
		}
	});
	
	tempForm.submit();  
}

function viewSubsystem(outerUrl,parentName,ssId,defalutPage,iconCls,ssShowType) {
	var main = Ext.getCmp("__jes_desktop__");
	if(Ext.getCmp(ssId+"_panel")){
		main.setActiveTab(Ext.getCmp(ssId+"_panel"));
		return;
	}
	
	Ext.Ajax.request({
		    url: 'ssmenu.ajax',
	    	defalutPage:defalutPage,
	    	parentName:parentName,
		    params: {
		    	ssId:ssId,
	    		outerUrl:outerUrl
		    },
		    failure:function(response,opts){
		    	alert('服务器异常['/*'服务器异常['*/+response.status+
    			'],请关闭浏览器稍后重试.'/*'],请关闭浏览器稍后重试.'*/);
		    },
		    success: function(response,req){ //第二个参数req就是本次Ext.Ajax.request的参数
		    	var obj;
		    	try{
		    		obj=Ext.decode(response.responseText);
		    	}catch(e){
		    		alert('由于服务器超时,您需要重新登录.','错误');
		    		window.open('login.html','_self');
		    		return;
		    	}
		    	var store = Ext.create('Ext.data.TreeStore', {
		    		//id:ssId+"_store",
					root : {
						text : parentName,
						expanded : true,
						children : obj
					}
				});
				var panel = main.add(new Ext.panel.Panel({
							id:ssId+"_panel",
							title : parentName,
							iconCls : iconCls,
							closable : true,
							layout : {
								type : 'border',
								padding : '1'
							},
							loadMask : '子系统加载中...',
							border : false,
							items : [{
								xtype : 'treepanel',
								region : 'west',
								hidden : ssShowType=='nomenu',
								width : 200,
								title : '菜单(右键收藏)',
								padding :  2,
								collapsible : true,
								store : store,
								rootVisible : false,
								ssId: req.params.ssId,
								listeners : {
									itemcontextmenu:function(view,record,item,index,e,eOpts){
										//禁用浏览器的右键相应事件
										e.preventDefault();
										e.stopEvent();
										var menus = new Ext.menu.Menu({
												width: 100,
												float:true,
												renderTo: Ext.getBody(),
												items: [{
													 text: '加入收藏',
													 handler:function(){
														 if(!record.raw.leaf){
															 jesAlert('请选择子菜单添加到我的收藏！');
															 return;
														 }
														 Ext.Ajax.request({
															 url: 'addToMyFavorite.ajax',
				   											 params: {
				    											ssId:ssId,
			    												menuId:record.raw.id,
			    												menuName:record.raw.text,
			    												menuUrl:record.raw.menuUrl
				   											 },
				   											 success: function(response,req){	
				   												 jesAlert(record.raw.text+'已成功添加到我的收藏！');
				   												 Ext.getCmp("__favorite__").getStore().load();
				   											 }	 
														 });
													 }
												}]
										});
										menus.showAt(e.getPoint());
									 },
									itemclick : function(tree, record, item, index, e,eOpts) {
										if(record.raw.ssUrl){
											Ext.getCmp(this.ssId+"_frame").load(record.raw.ssUrl);
										}
									},
									beforecollapse:menuPanelListeners.beforecollapse,
									beforeexpand: menuPanelListeners.beforeexpand
								}
							}, {
								xtype : 'uxiframe',
								region : 'center',
								padding :  '2 2 2 2',
								layout : 'fit',
								border : false,
								src :req.defalutPage,
								id : req.params.ssId+"_frame",
								listeners : {
									 load : function(me) {
									 	me.getDoc().onclick=window.top.document.resetJesRunDuration;
										me.getDoc().onkeydown=window.top.document.resetJesRunDuration;
									}
								}
							}]
			
						}));
						main.setActiveTab(panel);
			    }
		});
}


function getHello(){
	var h = new Date().getHours();
	if(h>=0 && h<6){
		return '辛苦了';
	}else if(h>=6 && h<9){
		return '早上好';
	}else if(h<11){
	    return  '上午好';
	}else if(h>=11 && h<13){
	    return '中午好';
	}else if(h>=13 && h<18){
		return '下午好';
	}else{
		return '晚上好';
	}	
	
}

function viewFavorite(menuId,menuUrl,parentName,ssId,iconCls) {
				var main = Ext.getCmp("__jes_desktop__");
				if(Ext.getCmp("C_"+ssId+"-"+menuId+"_panel")){
						main.setActiveTab(Ext.getCmp("C_"+ssId+"-"+menuId+"_panel"));
						return;
				}
			   var panel = main.add(new Ext.panel.Panel({
							id:"C_"+ssId+"-"+menuId+'_panel',
							title : parentName+'['+ssId+']',
							iconCls : iconCls,
							closable : true,
							layout : {
								type : 'border',
								padding : '1'
							},
							loadMask : '子系统加载中...',
							border : false,
							items : [{
								xtype : 'uxiframe',
								region : 'center',
								padding : 1,
								layout : 'fit',
								border : true,
								src :menuUrl
							}]
				}));
				main.setActiveTab(panel);
}

function modifyUser(){
	Ext.Ajax.request({
		url : 'modifyUser.ajax?f=BSYS.modifyUser',
		success : function(response) {
			var text = Ext.decode(response.responseText);
			var user = eval("("+text.user+")");
			Ext.create('Ext.window.Window', {
				width : 640,
				height : 310,
				title : '个人信息修改界面',
				items : [{
					xtype : 'form',
					layout:'column',
					name:'form',										
					autoScroll : true,
					frame : true,
				    defaults : {
						columnWidth : .5,
						border : false,
						height:25,
						padding:'10,1,1,1',
						labelAlign:'right'
					},
					items : [{
						xtype:'textfield',
						fieldLabel : '用户英文名',
						name : 'userEname',
						value : user.userEname,
						maxLength:20,
						allowBlank : false,
						validator:function(){
							var value = this.getValue();
							var reg = /^\w+$/;
							if(reg.test(value)){
								return true;
							}else{
								return "不能含有汉字！";
							}
						}
					},{
						xtype:'textfield',
						fieldLabel : '用户中文名',
						name : 'userCname',
						value : user.userCname,
						allowBlank : false,
						maxLength:40,
						validator:function(){
							var value = this.getValue();
			//				var reg = /^[\u4E00-\u9FA5]+$/;
							var reg = /^[-_\u4E00-\u9FA5a-zA-Z0-9]+$/;
							if(value){
								if(reg.test(value)){
									return true;
								}else{
									return "请输入中文！";
								}
							}else{
								return true;
							}
						}
					},{
						xtype:'displayfield',
						fieldLabel:'部门名称',
						name:'departName',
						value:text.departName,
						readOnly:true,
						maxLength:40
					},{
						xtype:'displayfield',
						fieldLabel : '用户所属机构',
						name : 'instName',
						value:text.instName,
						readOnly:true
					},{
						xtype:'textfield',
						fieldLabel : '座机电话',										
						name : 'tel',
						value : user.tel,
						regexText : '格式为 XXXX-XXXXXXX',
						editable : true,
						regex : /^(0(10|2[1-3]|[3-9]\d{2}))?[1-9]\d{6,7}$/
					},{
						xtype:'textfield',
						fieldLabel : '手机号',										
						name : 'mobile',
						value : user.mobile,
						regexText : '请输入正确的电话号码',
						regex : /^(1)\d{10}$/
					},{
						xtype:'textfield',
						fieldLabel : '地址',										
						name : 'address',
						value : user.address,
						maxLength:120
					},{
						xtype:'textfield',
						fieldLabel : '邮箱',										
						name : 'email',
						value : user.email,
						regex : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
						regexText : '请输入正确的邮箱地址'
					},{
						xtype:'textfield',
						fieldLabel : '描述',										
						name : 'description',
						value : user.description
					}],
					buttons: [{
						text : '提交',
						handler : function () {
								var form = this.up('form').getForm();
								var  win = this.up('window');
								if (form.isValid()) {
									form.submit({
										url : 'modifyUserDo.ajax?f=BSYS.main.modifyUserDo',
										success : function(form,action) {	
										jesAlert('修改成功！');
										win.close();
										},
										failure : function(form,action) {
										Ext.Msg.alert('修改失败！');
										win.close();
										}
									});
								}
						}
					}]
				}]
			}).show();
		}
	});
}

function asynchDownload(){
	 viewFavorite('asynchDownload','asynchDownload.do?f=BSYS.asynchDownload','异步下载','BSYS','edit-icon') ;
}
function addBillboard(billStore){
	var index = isShowSendType.indexOf("hidden: true");
	var flag = index > 0 ? true : false;
	Ext.create('Ext.window.Window', {
		width : 420,
		height : 480,
		title : '发布公告',
		maximizable:true,
		constrainHeader: true,
		modal: true,
		layout: 'fit',
		items : [{
			xtype : 'form',
			layout: 'form',
			autoScroll: true,
			bodyPadding: '10,25,0,5',
			defaults: {
				labelWidth: 70,
				labelAlign: 'right'
			},
			items : [{
				xtype:'textfield',
				fieldLabel : '公告标题',
				name : 'billTitle'
			},{
				xtype:'combobox',
				fieldLabel : '指定角色',
				editable: false,//不允许输入  
				emptyText:'请选择...',//默认值 
			    store:Ext.create('Ext.data.Store', {
			       fields: ['publishTargetParent', 'nameParent'],
			        data : [{"publishTargetParent":"1", "nameParent":"所用用户"},
			            {"publishTargetParent":"2", "nameParent":"机构级别"},
			            {"publishTargetParent":"3", "nameParent":"子系统"},
			            {"publishTargetParent":"4", "nameParent":"角色"}]
			    }),
			    name:'publishTargetParent',
			    queryMode: 'local',
			    displayField: 'nameParent',
			    listeners:{    
		            select : function(combobox, record,index){ 
		            	var comb = this.up('form').down('combobox[name=publishTarget]');
		            	comb.setVisible(false);
		            	if(combobox.getValue()!=1){
			            	comb.setValue('');
			            	comb.setVisible(true);
			            	comb.store.load({params:{
			            		publishTarget:combobox.value
			            	}});		            		
		            	}
		            }  
		        } , 
			    valueField: 'publishTargetParent'
			},{
				xtype:'combobox',
				fieldLabel : '选择',
				hidden: true,
				anyMatch: true,
				//editable: false,//不允许输入  
				emptyText:'请选择子类...',//默认值 
			    store:Ext.create('Ext.data.Store', {	
			    	
			    	fields: ['billTitle', 'billBody'],
			    	proxy : {
			    		type : 'ajax',
			    		url : 'getPublicTargetChild.ajax?f=BSYS.main.getPublicTargetChild',
			    		reader : {
			    			type : 'json',
			    			root:'data'
			    		}
			    	}
			    }),
			    multiSelect : true,
			    queryMode: 'local',
			    displayField: 'billTitle',
			    valueField: 'billBody',
			    name:'publishTarget'
			    
			},{
				fieldLabel:'公告内容',
				name      :'billBody',
		        xtype: 'htmleditor',
		        height : 180,
		        enableColors: false,
		        defaultValue: '',
		        enableAlignments: false
			},{
		        xtype     : 'datefield',
				fieldLabel:'过期时间',
				format: 'Y-m-d',
				value:(Ext.Date.add(new Date(), Ext.Date.DAY, 10)),
				name      :'expiredTime'
			},{
		        xtype: 'filefield',
		        name: 'fileAttach1',
		        fieldLabel: '上传附件1',
		        msgTarget: 'side',
		        anchor: '100%',
		        buttonText: '浏览'
			},{
		        xtype: 'filefield',
		        name: 'fileAttach2',
		        fieldLabel: '上传附件2',
		        msgTarget: 'side',
		        anchor: '100%',
		        buttonText: '浏览'
			},{
		        xtype: 'filefield',
		        name: 'fileAttach3',
		        fieldLabel: '上传附件3',
		        msgTarget: 'side',
		        anchor: '100%',
		        buttonText: '浏览'
			},{
		        xtype: 'filefield',
		        name: 'fileAttach4',
		        fieldLabel: '上传附件4',
		        msgTarget: 'side',
		        anchor: '100%',
		        buttonText: '浏览'
			},{
		        xtype: 'filefield',
		        name: 'fileAttach5',
		        fieldLabel: '上传附件5',
		        msgTarget: 'side',
		        anchor: '100%',
		        buttonText: '浏览'
			}/*,{
				xtype:'combobox',
				fieldLabel : '扩展通知',
				hidden: flag,
				editable: false,//不允许输入  
				//emptyText:'请选择...',//默认值 
			    store:Ext.create('Ext.data.Store', {
			       fields: ['key', 'value'],
			        data : [{"key":"", "value":"请选择"},
			            {"key":"SMS", "value":"短信"},
			            {"key":"EMAIL", "value":"邮件"}]
			    }),
			    name:'sendType',
			    displayField: 'value',
			    valueField: 'key',
			    value: ''
			}*/
			],
			buttons: [{
		        xtype: 'checkboxfield',
		        boxLabel: '扩展通知',
		        name: 'extendedNotice',
		        hidden: flag,
		        inputValue: 'EXTENDEDNOTICE'
			},{
				text : '发布',
				handler : function () {
					    var billform = this.up('form');
						var form = this.up('form').getForm();
						var  win = this.up('window');
						if (form.isValid()) {
							form.submit({
								url :'addBillboard.do?f=BSYS.main.addBill&',
								success : function(form,action) {	
									jesAlert('发布成功！');
									var billtitle = billform.down('textfield[name=billTitle]').getValue('billTitle');
									var billRecoder = {BILL_TITLE:billtitle,BILL_ID:action.result.msg,PUBLISH_TIME:Ext.Date.format(new Date(),'Y-m-d H:i:s') ,USER_CNAME:userId};
									billStore.add(billRecoder);
									billStore.sort('PUBLISH_TIME','DESC');
									Ext.getCmp('__billboard__panel__').setTitle('公告信息 <span style="color:blue;">['+billStore.getCount()+'条]</span>');
									win.close();
								},
								failure : function(form,action) {
									jesErrorAlert(action.result.msg);
								}
							});
						}
				}
			}]
		}]
	}).show();
}

function viewBillboard(objData,billFeebacks,billStore,recoder){

	Ext.create('Ext.window.Window', {
		width : 500,
		height : Ext.get('__favorite__').getHeight(),
		title : '查看公告',
		layout: 'border',
		maximizable:true,
		modal : true,
		items : [{
			region : 'north',
			monitorResize: true,
			xtype  : 'form',
			layout : 'form',
			autoScroll :true,
			height :220,
			bodyPadding: 15,
			items  : getAtts(objData),
			buttons: [{
				text : '我知道了',
				handler : function () {
					var billId = this.up('window').down('hiddenfield[name=billId]').getValue('billId');
					var  win = this.up('window');
			    	Ext.Ajax.request({
			             url: "knowBillboard.ajax?f=BSYS.main.knowBillboard",
			             params:{ billId:billId},
			             success: function (response) {
			            	 billStore.remove(recoder);
			            	 win.close();
			             }
			         });
				}
			}]
		},{
			width  : 400,
			region : 'center',
			xtype  : 'panel',
			title  : '反馈信息',
			layout : 'border',
			tools  :[{
				type  : 'save',
				tooltip: '反馈',
				
			    handler: function(event, toolEl, panelHeader) {
			    	var feebackName = this.up('window').down('textareafield[name=feebackName]').getValue('feebackName');
			    	var userId = this.up('window').down('hiddenfield[name=userId]').getValue('userId');
			    	var billId = this.up('window').down('hiddenfield[name=billId]').getValue('billId');
			    	var win = this.up('window');
			    	Ext.Ajax.request({
			             url: "addBillFeeback.ajax?f=BSYS.main.addBillFeeback",
			             params:{ billId:billId,
			            	      feebackName:feebackName,
			            	      userId:userId},
			             success: function (response) {
			            	 jesAlert('反馈成功！');
			            	 win.close();
			             },
			             failure: function(response){
							 Ext.Msg.alert('失败！');
			             }
			         });
			    }
			}],
			items  :[{
				region    : 'north',
		        fieldLabel: '反馈内容',
		        style     : {
		            width: '95%',
		            marginRight: '15px',
		            marginLeft: '15px'
		        },
		        height    : 25,
		        name      : 'feebackName',
				xtype     : 'textareafield'
			},{
				region    : 'center',
		        autoScroll:true,
				title     : '反馈记录',
				items     : [{
		            overflowY: 'auto',
		            xtype    : 'dataview',
		            itemTpl  : '<div class="view-item" style="padding: 15px;border-bottom:1px solid gray;width:100%;word-break:break-all;"><span style="font-weight:bolder;">{USER_CNAME}反馈:</span><br><span style="">&nbsp;&nbsp;&nbsp;&nbsp;{FEEBACK_BODY}</span><br><span style="float:right;text-align:right">{PUBLISH_TIME}</span></div>',
		            store    :  Ext.create('Ext.data.Store', {
		            	   fields  :['USER_CNAME','FEEBACK_BODY','PUBLISH_TIME'],
		            	   data    :billFeebacks
		            })
				}]
			}]
		}]
	}).show();
}
 
function getAtts(objData){
      var atts=[{
			xtype     :'displayfield',
			fieldLabel: '公告标题',
			editable  : false,
			value     : objData.billTitle
		},{
			fieldLabel:'公告内容',
			name      :'billBody',
	        xtype     : 'displayfield',
	        enableColors: false,
	        value :objData.billBody,
	        editable  : false,
	        enableAlignments: false
		},{
	        xtype     : 'displayfield',
			fieldLabel:'过期时间',
			value: objData.expiredTime,
			name      :'expiredTime'
		},{
			xtype     : 'hiddenfield',
			name      : 'userId',
			value     : objData.userId
		},{
			xtype     : 'hiddenfield',
			name      : 'billId',
			value     : objData.billId
		}];

	  for(var i=1;i<=5;i++){
		  if(!Ext.isEmpty(objData['att'+i+'Name'])){
			  atts.push(newFieldContainer (objData,i));
		  };
	  }
	  return atts;
}
function newFieldContainer (objData,i){
     return Ext.create('Ext.form.FieldContainer', {
		 fieldLabel : '附件'+i,
	     layout     : 'hbox',
	     anchor     : '100%',
         defaults   : {
					      fex      :1,
	                      hideLabel: true
        		      },
	     items      :[{
			      xtype  :'button',
			      iconCls:'package-download-icon',
			      handler: function() {
			    	  var ifameX=document.getElementById("download").contentWindow;
			    	  ifameX.open("downloadBillAttch.do?f=BSYS.main.downloadBill&billId="+encodeURI(objData.billId)+"&sign="+encodeURI(i),'_self');
			       }
         }, {
				  xtype  :'displayfield',
				  margin : '0 25 0 0',
				  value  : objData['att'+i+'Name']
	     }]
     });
}

function getBillboardById(billStore,recoder){
	 Ext.Ajax.request({
         url: "getBillboardById.ajax?f=BSYS.main.viewBill",
         params:{ billId:recoder.get('BILL_ID')},
         success: function (response) {
 			var objData = Ext.decode(response.responseText);
 			
        	viewBillboard(objData.bill,objData.billFeebacks,billStore,recoder);
         }
     });
}

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
             itemTpl: '<div class="view-item" style="padding: 10px;border-bottom:1px solid gray;width:100%;word-break:break-all;"><span style="font-weight:bolder;">{fromUser}</span> to: <span style="font-weight:bolder;">{toUser}</span><br>{msgBody}<br><span style="float:right;text-align:right">{sendTime}</span></div>',
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

