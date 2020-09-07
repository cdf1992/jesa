Ext.require([
	'Ext.ux.TreePicker',
	'Ext.form.*',
	'Ext.ux.window.Notification',
	'Ext.ux.jes.PagingToolbar'
]);

Ext.onReady(function() {
	Ext.define('Sys.com.Window', {
		extend:'Ext.window.Window',
		width : 400,
		height : 300,
		modal : true,
		title : '新增机构对照关系',
		items : {
			xtype : 'form',
			name : 'form',
			layout : 'fit',
			autoScroll : true,
			frame : true,
			items : [{
				xtype : 'panel',
				title : '基本信息',
				flex : 1,
				items : [{
					xtype : 'textfield',
					fieldLabel : '行内机构号',
					name : 'INST_ID',
					allowBlank : false,
					editable:false,
					height:25,
					padding:'10,10,10,10',
					labelAlign:'right',
					maxLength:20
				},{
					xtype : 'textfield',
					fieldLabel : '法人代码',
					name : 'LEGAL_PERSON_CODE',
					allowBlank : false,
					editable:false,
					height:25,
					padding:'10,10,10,10',
					labelAlign:'right',
					maxLength:20
				},{
					xtype : 'textfield',
					fieldLabel : '地区码',
					name : 'AREA_ID',
					allowBlank : false,
					editable:false,
					height:25,
					padding:'10,10,10,10',
					labelAlign:'right',
					maxLength:20
				}]
			}],
			buttons : [{
				text : '保存',
				name:'submit',
				formBind : true,
				disabled : true							
			}]
		}
	});
	
	
	var instMappStore = Ext.create('Ext.data.Store',{
		fields : fields,
		proxy : {
			type : 'ajax',
			url : 'instMappList.ajax?f=BSYS.0207',
			reader:{
				type:'json',
				root:'instMappList',
				totalProperty : 'instMappCount'
			}
		}
	});
	instMappStore.load();
	
	
	var pagebar = new Ext.ux.jes.PagingToolbar({
		store : instMappStore,
		displayInfo : true,
		displayMsg : '第{0}条到第{1}条-共{2}条',
		emptyMsg : '没有查询到相关的菜单信息'
	});
	
	
	Ext.create('Ext.container.Viewport', {
		layout:'fit',
		items:[{
			xtype : 'gridpanel',
			title : '机构对照关系',
			tbar : {
			    xtype : 'form',
			    items : [
			    	new Ext.Toolbar({
			    		items : [' ','请输入行内机构',{
			    			xtype : 'textfield',
			    			triggerCls : 'search-icon',
			    			name : 'f.a.inst_id:like',
							itemId:'condition',
							id:'condition'
			    		},{
			    			text : '查询',
			    			iconCls : "search-icon",
			    			handler:function(){
								var params = {};
								params['f.a.inst_id:like']=Ext.getCmp('condition').getValue();
								instMappStore.proxy.extraParams =params;
								instMappStore.loadPage(1);
							},
							scope : this
			    		}]
			    	}),
			    	new Ext.Toolbar({
			    		items : [{
			    			text : '导入',
			    			iconCls:'import-icon',
			    			handler: function(){
			    				Ext.create('Ext.window.Window',{
			    					width : 400,
									height : 100,
									modal : true,
									title : '导入Excel文件',
									items : [{
										xtype : 'form',
										frame : 'true',
										itemId : 'uploadPanel',
										items : [{
											xtype : 'fileuploadfield',
											name : 'filePath',
											fieldLabel : '文件', 
											labelWidth : 50,
											width:370,
											msgTarget : 'side',
											allowBlank : false,
											buttonText : '浏览...'
										}],
										buttons : [{
											text : '导入',
											name : 'upload',
											handler : function() {
												var me = this;
												var form = this.up('form').getForm();
												if(form.isValid()) {
													form.submit({
														url : 'importInstMapping.do?f=BSYS.0207',
														enctype : 'multipart/form-data',
										  			 	method : 'POST',
														waitMsg : '正在升级，请稍后...',
														success : function(form, action) {
															jesAlert("数据导入成功");
															me.up('window').close();
															instMappStore.reload();
														},
														failure:function(form,action){
															jesErrorAlert(action.result.msg);
															me.up('window').close();
														}
													});
												}
											}
										}]
									}]
			    				}).show();
			    			}
			    		},{
			    			text : '导出',
			    			iconCls:'export-icon',
			    			handler : function() {
			    				var ifameX = document.getElementById('download').contentWindow;
								ifameX.open('exportInstExcel.ajax?f=BSYS.0207', '_self');
			    			}
			    		},{
			    			text : '保存',
			    			iconCls : "save-icon",
			    			handler : function(me){
			    				var params=new Array();
			    				Ext.each(instMappStore.getModifiedRecords(), function(item){
			    					params.push(item.data);
			    				});
			    				Ext.Ajax.request({
			    					method : 'post',
			    					url : 'saveInstMapp.ajax?f=BSYS.0207',
			    					jsonData : params,
			    					success : function(response){
			    						var t = Ext.decode(response.responseText);
			    						if(t=='success'){
			    							Ext.each(instMappStore.getModifiedRecords(), function(item) { 
								        		item.commit();
							                });
							                jesAlert("数据保存成功！");
			    						} 
			    						else if (t == 'exception') {
			    							jesAlert("错误", "该机构ID已经存在");
			    						}
			    					}
			    				});
			    			}
			    		}]
			    	})
			    ]
			},
			selType : 'checkboxmodel',
			selModel:{mode :'SIMPLE'},
//			bbar : FilePathPagebar,
			store : instMappStore,
			columns :cols,
			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit: 1
				})
			],
			bbar : pagebar
		}]
	});
});

