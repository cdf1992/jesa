Ext.require([ 'Ext.Viewport', 'Ext.data.*', 'Ext.ux.jes.PagingToolbar',
		'Ext.layout.container.Border', 'Ext.ux.window.Notification',
		'Ext.picker.Date' ]);


Ext.onReady(function() {
			Ext.QuickTips.init();
			var drawSsId = 'BSYS';
			var drawCalendarId = '0001';

			var sysStore = Ext.create('Ext.data.Store', {
				fields : [ 'ssId', 'ssName' ],
				data : subSysData
			});
			var calendarStore = Ext.create('Ext.data.Store', {
				fields : [ 'CALENDAR_ID', 'CALENDAR_NAME', 'START_Y' ,'END_Y','SS_ID'],
				data : calendarData
			});
			calendarStore.loadRawData(calendarData);
			calendarStore.filter({
				id : 'SS_ID',
				property : 'SS_ID',
				value : 'BSYS'
			});
			var typeStore = Ext.create('Ext.data.Store', {
				fields : [ 'disValue', 'vValue' ],
				data : [ {
					'disValue' : '标准',
					'vValue' : 'normal'
				}, {
					'disValue' : '全工作日',
					'vValue' : 'allwork'
				} ]
			});

			var workDaysStore = Ext.create('Ext.data.Store', {
				autoLoad : true,
				fields : [ 'ssId', 'calendarId', 'dateValue', 'isWorkDay','dayInfo', 'dayOfWeek' ],
				proxy : {
					type : 'ajax',
					url : 'getWorkDaysList.ajax?f=BSYS.0103',
					reader : {
						type : 'json',
						root : 'workDaysList',
						totalProperty : 'total'
					}
				}
			});
			
	

			var yesOrNoStore = Ext.create('Ext.data.Store', {
				fields : [ 'key', 'value' ],
				data : [ {
					'key' : 'Y',
					'value' : '是'
				}, {
					'key' : 'N',
					'value' : '否'
				} ]
			});
		

			var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
				 saveBtnText: '保存', 
		         cancelBtnText: "取消", 
		         autoCancel: false, 
		         clicksToEdit:1,
		         listeners:{
		        	 afteredit: function(editor, e, eOpts){
		        		 Ext.Ajax.request({ 
		        			 url: 'updateWorkDays.ajax?f=BSYS.0103.update', 
		        			 params: { 
			        				 ssId: e.record.get('ssId'),
			        				 calendarId: e.record.get('calendarId'),
			        				 dateValue: e.record.get('dateValue'),
				 					 isWorkDay:e.record.get('isWorkDay'),
				 					 dayInfo:e.record.get('dayInfo'),
				 					 dayOfWeek:e.record.get('dayOfWeek')
		        				 }, 
		        			 success: function(response){ 
		        			 var text=response.responseText;
		        			 if(text=="\"failure\""){
									Ext.MessageBox.alert("提示","操作失败!");
									workDaysStore.load();
								}else if(text=="\"success\""){
									Ext.create('widget.uxNotification', {html: '修改成功...'}).show();
									workDaysStore.load();
								}
		        			  } 
		        		 });
		        	 }
		         }
			    });
			

			var yearStore = Ext.create('Ext.data.Store', {
				fields : [ 'year', 'number' ],
				data : [ {
					'year' : '2014',
					'number' : '2014'
				}, {
					'year' : '2015',
					'number' : '2015'
				}, {
					'year' : '2016',
					'number' : '2016'
				}, {
					'year' : '2017',
					'number' : '2017'
				}, {
					'year' : '2018',
					'number' : '2018'
				}, {
					'year' : '2019',
					'number' : '2019'
				}, {
					'year' : '2020',
					'number' : '2020'
				}, {
					'year' : '2021',
					'number' : '2021'
				}, {
					'year' : '2022',
					'number' : '2022'
				}, {
					'year' : '2023',
					'number' : '2024'
				}, {
					'year' : '2024',
					'number' : '2024'
				}, {
					'year' : '2025',
					'number' : '2025'
				}, {
					'year' : '2026',
					'number' : '2026'
				}, {
					'year' : '2027',
					'number' : '2027'
				}, {
					'year' : '2028',
					'number' : '2028'
				}, {
					'year' : '2029',
					'number' : '2029'
				}, {
					'year' : '2030',
					'number' : '2030'
				}, {
					'year' : '2031',
					'number' : '2031'
				}, {
					'year' : '2032',
					'number' : '2032'
				}, {
					'year' : '2033',
					'number' : '2033'
				}, {
					'year' : '2034',
					'number' : '2034'
				} ]
			});

			Ext.create('Ext.Viewport',{
								layout : 'border',
								items : [
										{
											xtype : 'panel',
											title : '选择日期',
											region : 'west',
											padding : 0,
											items : [ {
												xtype : 'datepicker',
												id : 'date-picker',
												listeners : {
													select : function(picker,
															date, eOpts) {drawCalendar(drawSsId,drawCalendarId,date);
														Ext.getCmp('view-icon').setText(Ext.util.Format.date(date,'Y-m'));
													}
												}
											} ]
										},
										{
											xtype : 'panel',
											itemId : 'monthPanel',
											layout : 'fit',
											region : 'center',
											name : 'monthPanel',
											tbar : [ {
												xtype : 'form',
												width : '100%',
												items : [
														{
															xtype : 'toolbar',
															items : [
																	{
																		xtype : 'combobox',
																		labelWidth : 40,
																		name : 'f.SS_ID:eq',
																		store : sysStore,
																		displayField : 'ssName',
																		valueField : 'ssId',
																		labelAlign : 'right',
																		editable : false,
																		value : 'BSYS',
																		fieldLabel : '系统',
																		itemId : 'ssId_combo',
																		listeners : {
																			select : function(combo,records,eOpts) {
																				calendarStore.clearFilter(false);
																				calendarStore.filter({id : 'SS_ID',property : 'SS_ID',value : combo.value});
																				var caCombobox = this.up('toolbar').getComponent('calendar_combobox');
																				caCombobox.select(calendarStore.getCount() > 0 ? calendarStore.getAt(0): null);
																				if(calendarStore.getCount()==0){
																					Q('displayfield[name=startY]').setValue('');
																				}
																				if(calendarStore.getCount()>0){
																					Q('displayfield[name=startY]').setValue(calendarStore.getAt(0).get('START_Y')+"至"+calendarStore.getAt(0).get('END_Y'));
																				}
																				drawSsId = combo.value;
																				drawCalendarId = caCombobox.value;
																				drawCalendar(
																						drawSsId,
																						drawCalendarId,
																						new Date());
																			}
																		}
																	},
																	{
																		xtype : 'combobox',
																		queryMode : 'local',
																		labelWidth : 40,
																		name : 'f.CALENDAR_ID:eq',
																		labelAlign : 'right',
																		store : calendarStore,
																		displayField : 'CALENDAR_NAME',
																		valueField : 'CALENDAR_ID',
																		fieldLabel : '日历',
																		width: 140,
																		editable : false,
																		itemId : 'calendar_combobox',
																		emptyText:'请选择日历',
																		listeners : {
																			select : function(combo,records,eOpts) {
																				Q('displayfield[name=startY]').setValue(records[0].data.START_Y+"至"+records[0].data.END_Y);
																				var ssId_combo = this.up('toolbar').getComponent('ssId_combo');
																				drawSsId = ssId_combo.value;
																				drawCalendarId = combo.value;
																				drawCalendar(drawSsId,drawCalendarId,new Date());
																			}
																		}
																	},{
																		tooltip: '删除当前日历',
																		iconCls : 'delete-icon',
																		handler : function() {
																			var ssId = this.up('toolbar').down('combobox[name=f.SS_ID:eq]').value;
																			var combo = this.up('toolbar').down('combobox[name=f.CALENDAR_ID:eq]');
																			var calendarId = combo.value;
																			Ext.MessageBox.confirm('提示','您确定要删除日历【'+ combo.rawValue+ '】吗?',
																							function(obj) {
																								if (obj == 'yes') {
																									Ext.Ajax.request({
																												url : 'removeWorkCalendar.ajax?f=BSYS.0103.remove',
																												params : {
																													ssId : ssId,
																													calendarId : calendarId
																												},
																												success : function(
																														response) {
																													var text = Ext
																															.decode(response.responseText);
																													if (text == "1") {
																														calendarStore.remove(combo.findRecordByValue(calendarId));
																														if (calendarStore.getCount() > 0) {
																															combo.select(calendarStore.getAt(0));
																															drawCalendarId = combo.value;
																															drawCalendar(
																																	ssId,
																																	drawCalendarId,
																																	new Date());
																														} else {
																															combo.setValue(null);
																														}
																														Ext.create('widget.uxNotification',{html : '删除成功！'}).show();
																													} else {
																														Ext.MessageBox.alert('提示','日历不存在！');
																													}
																												}
																											});
																								}
																							});
																		}
																	},
																	{
																		tooltip: '初始化日历',
																		iconCls : 'recover-icon',
																		handler : function() {
																			var ssId = this.up('toolbar').down('combobox[name=f.SS_ID:eq]').value;
																			var combo = this.up('toolbar').down('combobox[name=f.CALENDAR_ID:eq]');
																			var calendarId = combo.value;
																			if(Ext.isEmpty(combo.value)){
																				jesAlert("请选择您要初始化的日历！");
																				return;
																			}
																			Ext.MessageBox.confirm('提示','您确定要初始化日历【'+ combo.rawValue+ '】吗?',
																				function(obj) {
																					if (obj == 'yes') {
																						Ext.create("Ext.window.Window",{
																							title : "请您确定您要初始化的起止年份",
																							layout : "fit",
																							items : [ {
																									xtype : "form",
																									defaultType : 'textfield',
																									items : [{
																											xtype : 'combobox',
																											fieldLabel : '起始年',
																											labelWidth : 50,
																											labelAlign : 'right',
																											store : yearStore,
																											displayField : 'number',
																											valueField : 'year',
																											editable : false,
																											name : 'startYear'
																										},{
																											xtype : 'combobox',
																											fieldLabel : '终止年',
																											labelWidth : 50,
																											labelAlign : 'right',
																											store : yearStore,
																											displayField : 'number',
																											valueField : 'year',
																											editable : false,
																											name : 'endYear'
																										} ]
																									} ],
																									buttons : [{
																											xtype : "button",
																											text : "确定",
																											handler : function() {
																												var startYear = this.up('window').down('form').down('combobox[name=startYear]').value;
																												var endYear = this.up('window').down('form').down('combobox[name=endYear]').value;
																												Ext.Ajax.request({
																													url : 'reInitWorkCalendar.ajax?f=BSYS.0103.reInit',
																													params : {
																															ssId : ssId,
																															calendarId : calendarId,
																															startYear : startYear,
																															endYear : endYear
																															},
																													success : function(response) {
																															var text = Ext.decode(response.responseText);
																															if (text == "1") {
																																calendarStore.remove(combo.findRecordByValue(calendarId));
																																if (calendarStore.getCount() > 0) {
																																		combo.select(calendarStore.getAt(0));
																																		drawCalendarId = combo.value;
																																		drawCalendar(ssId,drawCalendarId,new Date());
																																} else {
																																		combo.setValue(null);
																																}
																																Ext.create('widget.uxNotification',{html : '初始化成功！'}).show();
																															} else {
																																Ext.MessageBox.alert('提示','日历不存在！');
																															}
																													}});
																													this.up("window").close();
																											}},{
																												xtype : "button",
																												text : "取消",
																												handler : function() {this.up("window").close();}
																											}]
																						}).show();
																						}});
																		}
																	},
																	{
																		tooltip: '列表查看当前日历',
																		iconCls : 'look-icon',
																		handler : function() {
																			var ssId = this.up('toolbar').down('combobox[name=f.SS_ID:eq]').value;
																		    var calendarId=this.up('toolbar').down('combobox[name=f.CALENDAR_ID:eq]').value;
															    			var params = {};
																			var fs = Ext.ComponentQuery.query('textfield',this.up('toolbar'));
															    			for(var i in fs){
																    				params[fs[i].name]=fs[i].getValue();
															    			}
															    			workDaysStore.proxy.extraParams =params;
															    			workDaysStore.load();
																			Ext.create("Ext.window.Window",{
																								width : 750,
																								height : 480,
//																								modal : true,
																								constrainHeader: true,
																								title : "日历列表显示 &nbsp;&nbsp;&nbsp; "+"系统："+ssId+" &nbsp;日历编号："+calendarId,
																								layout : 'fit',
																								items : [
																									 {
																										xtype : 'gridpanel',
																										store : workDaysStore,
																										dockedItems:{
																									    	xtype:'jespaging',
																									    	autoShow:true,
																									    	store:workDaysStore,
																									    	dock:'bottom',
																									    	displayInfo:true
																									    },
																										plugins: [rowEditing],
																										columnLines : true,
																										tbar : {
																												xtype : 'toolbar',
																												items : [
																												         {
																																xtype : 'combobox',
																																fieldLabel : '起始年',
																																labelWidth : 40,
																																width:130,
																																labelAlign : 'right',
																																store : yearStore,
																																displayField : 'number',
																																valueField : 'year',
																																editable : false,
																																name : 'SY'
																															},{
																																xtype : 'combobox',
																																fieldLabel : '终止年',
																																labelWidth : 40,
																																width:130,   
																																labelAlign : 'right',
																																store : yearStore,
																																displayField : 'number',
																																valueField : 'year',
																																editable : false,
																																name : 'EY'
																															},{
																												        	 xtype : 'button',
																												        	 text:   '特殊的工作日',
																															 iconCls : 'search-icon',
																															 handler : function() {
																																 var params = {};
																																 var SY = this.up('toolbar').down('combobox[name=SY]').value;
																																 var EY=this.up('toolbar').down('combobox[name=EY]').value;
																																 params['f.SS_ID:eq']=ssId;
																																 params['f.CALENDAR_ID:eq']=calendarId;
																																 if(SY!=null&&EY!=null&&SY>EY){
																																	 jesAlert('起始年不能大于终至年，请重新选择年限！');
																																 }else{
																																	 if(SY!=null){
																																		 params['f.DATE_VALUE:ge']=SY+"-01-01";
																																	 }

																																	 if(EY!=null){
																																		 params['f.DATE_VALUE:le']=EY+"-12-31"; 
																																	 }
																																	 params['f.IS_WORK_DAY:eq']='Y';
																																	 params['f.DAY_OF_WEEK:IN']="6,0";
																																 }
																																 workDaysStore.proxy.extraParams =params;
																													    	     workDaysStore.load();
																															 }
																												         },{
																												        	 xtype : 'button',
																												        	 text:   '特殊的节假日',
																															 iconCls : 'search-icon',
																															 handler : function() {
																																 var params = {};
																																 var SY = this.up('toolbar').down('combobox[name=SY]').value;
																																 var EY=this.up('toolbar').down('combobox[name=EY]').value;
																																 params['f.SS_ID:eq']=ssId;
																																 params['f.CALENDAR_ID:eq']=calendarId;
																																 if(SY!=null&&EY!=null&&SY>EY){
																																	 jesAlert('起始年不能大于终至年，请重新选择年限！');
																																 }else{
																																	 if(SY!=null){
																																		 params['f.DATE_VALUE:ge']=SY+"-01-01";
																																	 }

																																	 if(EY!=null){
																																		 params['f.DATE_VALUE:le']=EY+"-12-31"; 
																																	 }
																																	 params['f.IS_WORK_DAY:eq']='N';
																																	 params['f.DAY_OF_WEEK:IN']="1,2,3,4,5";
																																 }
																																 workDaysStore.proxy.extraParams =params;
																													    	     workDaysStore.load();
																															 }
																												           	},{
																													        	 xtype : 'button',
																													        	 text:   '查询',
																																 iconCls : 'search-icon',
																																 handler : function() {
																																	 var SY = this.up('toolbar').down('combobox[name=SY]').value;
																																	 var EY=this.up('toolbar').down('combobox[name=EY]').value;
																																	 var params = {};
																																	 if(SY!=null&&EY!=null&&SY>EY){
																																		 jesAlert('起始年不能大于终至年，请重新选择年限！');
																																	 }else{
																																		 params['f.SS_ID:eq']=ssId;
																																		 params['f.CALENDAR_ID:eq']=calendarId;
																																		 if(SY!=null){
																																			 params['f.DATE_VALUE:ge']=SY+"-01-01";
																																		 }

																																		 if(EY!=null){
																																			 params['f.DATE_VALUE:le']=EY+"-12-31"; 
																																		 }
																																		 workDaysStore.proxy.extraParams =params;
																															    	     workDaysStore.load();
																																	 }
																																	 
																																 }
																													         }
																												        ]
																										},
																										columns : [ 
																										{
																											flex : 2,
																											text : '日期',
																											name : 'DATE_VALUE',
																											dataIndex:'dateValue'
																										}, {
																											flex : 2,
																											text : '是否为工作日',
																											name : 'IS_WORK_DAY',
																											dataIndex:'isWorkDay',
																											renderer : function(val) {
																												var index = yesOrNoStore.find('key', val);
																												if (index == -1) {
																													return val;
																												}
																												return yesOrNoStore.getAt(index).data.value;
																									
																											},
																											editor : {
																												xtype : 'combobox',
																												allowBlank : false,
																												dateIndex : 'isWorkDay',
																												height : 25,
																												store : yesOrNoStore,
																												queryMode : 'local',
																												displayField : 'value',
																												valueField : 'key',
																												editable : false
																											}
																										}, {
																											flex : 3,
																											text : '节假日信息',
																											name:'DAY_INFO',
																											dataIndex : 'dayInfo',
																											editor : {
																												xtype : 'textfield',
																												maxLength : 50
																											}
																										}, {
																											flex : 1,
																											text : '周',
																											name : 'DAY_OF_WEEK',
																											dataIndex:'dayOfWeek',
																											renderer : function(val) {
																												if (val == 0) {
																													return '日';
																												} else if (val == 1) {
																													return '一';
																												} else if (val == 2) {
																													return '二';
																												} else if (val == 3) {
																													return '三';
																												} else if (val == 4) {
																													return '四';
																												} else if (val == 5) {
																													return '五';
																												} else if (val == 6) {
																													return '六';
																												}
																											}
																										} ]
																									}]
																							}).show();
																		}
																	},{
																		text : '导入',
																		tooltip:'导入',
																		iconCls : 'import-icon',
																		handler : function() {
																			var ssId = this.up('toolbar').down('combobox[name=f.SS_ID:eq]').value;
																		    var calendarId=this.up('toolbar').down('combobox[name=f.CALENDAR_ID:eq]').value;
																			Ext.create('Ext.window.Window', {
																				width : 400,
																				height : 150,
																				modal : true,
																				constrainHeader: true,
																				layout:'fit',
																				title : '导入Excel文件',
																				items:[{
																					xtype:'form',
																					frame : true,
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
																					},{
																						xtype:'textfield',
																						name:'ssId',
																						hidden:true,
																						value:ssId
																					},{
																						xtype:'textfield',
																						name:'calendarId',
																						hidden:true,
																						value:calendarId
																					},{
																				        xtype: 'displayfield',
																				        value: '<div style="color: red">注意： 导入的excel文件，从第二行开始录入数据：第一列为数据日期（格式：yyyy-MM-dd）,第二列为是否为工作日（取值：N/Y），第三列为节假日信息（例如：元旦）</div>'						        
																			        }],
																					buttons : [{
																						text : '导入',
																						name : 'upload',
																						handler : function() {
																							var me = this;
																							var form = this.up('form').getForm();
																							if(form.isValid()) {
																								form.submit({
																									url : 'importWorkDaysExcel.do?f=BSYS.0103',
																									enctype : 'multipart/form-data',
																					  			 	method : 'POST',
																									waitMsg : '正在上传，请稍后...',
																									success:function(form,action){
																										jesAlert(action.result.msg);
																										me.up('window').close();
																										workDaysStore.loadPage(1);
																									},
																									failure:function(form,action){
																										jesErrorAlert(action.result.msg);
																										me.up('window').close();
																									}
																								});
																							}
																						}
																					},{
																						text : '取消',
																						handler : function() {
																							this.up('window').close();
																						}
																					}]
																				}]
																				
																			}).show();	
																		
																		}
																	} ,{
																		xtype : 'tbspacer',
																		width : 40
																	},
																	{
																		xtype : 'button',
																		iconCls : 'navigate-left-icon',
																		handler : function() {
																			var dateButton = Ext.getCmp('view-icon');
																			var strDate = dateButton.getText();
																			var arr = strDate.split('-');
																			var date = new Date(arr[1] == 1 ? (arr[0] - 1): arr[0],arr[1] == 1 ? 11: (arr[1] - 2),1);
																			drawCalendar(drawSsId,drawCalendarId,date);
																			dateButton.setText(Ext.util.Format.date(date,'Y-m'));
																			Ext.getCmp('date-picker').setValue(date);
																		}
																	},
																	{
																		xtype : 'button',
																		text : Ext.util.Format.date(new Date(),'Y-m'),
																		id : 'view-icon'
																	},
																	{
																		xtype : 'button',
																		iconCls : 'navigate-right-icon',
																		handler : function() {
																			var dateButton = Ext.getCmp('view-icon');
																			var strDate = dateButton.getText();
																			var arr = strDate.split('-');
																			var date = new Date(arr[1] == 12 ? (parseInt(arr[0]) + 1): arr[0],arr[1] == 12 ? 0: arr[1],1);
																			drawCalendar(drawSsId,drawCalendarId,date);
																			dateButton.setText(Ext.util.Format.date(date,'Y-m'));
																			Ext.getCmp('date-picker').setValue(date);
																		}
																	},'->',{
																		xtype:'displayfield',
																		fieldLabel : '有效期限',
																		name: 'startY',
																		labelWidth : 60,
																		width: 230,
																		labelAlign : 'right',
																		readOnly : true,
																		value:''
																		
																	}]
														},
														{
															xtype : 'toolbar',
															items : [
																	{
																		xtype : 'button',
																		text : '新增日历',
																		iconCls : 'add-icon',
																		handler : function() {
																			var previousToolvar = this.up('toolbar').previousSibling();
																			var cacombo = previousToolvar.down('combobox[name=f.CALENDAR_ID:eq]');
																			var sscombo = previousToolvar.down('combobox[name=f.SS_ID:eq]');
																			drawSsId = sscombo.value;
																			var ssName = sscombo.rawValue;
																			var calendarName = this.up('toolbar').down('textfield[name=calendarName]').value;
																			var baseType = this.up('toolbar').down('combobox[name=baseType]').value;
																			drawCalendarId = this.up('toolbar').down('textfield[name=caText]').value;
																			if(drawCalendarId&&drawCalendarId.indexOf("_")!=-1) return  jesAlert('日历编号中不能包含下划线 _');
																			if (drawCalendarId) {
																				if (calendarName) {
																					Ext.MessageBox.confirm('提示','您确定是要把“'+ calendarName+ '”增加到 “'+ ssName+ '”吗?',function(obj) {
																										if (obj == 'yes') {
																											Ext.create("Ext.window.Window",{
																																title : "选择初始化年份",
																																maximizable : true,
																																layout : "fit",
																																items : [ {
																																	xtype : "form",
																																	defaultType : 'textfield',
																																	items : [
																																			{
																																				xtype : 'combobox',
																																				fieldLabel : '起始年',
																																				labelWidth : 50,
																																				labelAlign : 'right',
																																				store : yearStore,
																																				displayField : 'number',
																																				valueField : 'year',
																																				editable : false,
																																				name : 'startYear'
																																			},
																																			{
																																				xtype : 'combobox',
																																				fieldLabel : '终止年',
																																				labelWidth : 50,
																																				labelAlign : 'right',
																																				store : yearStore,
																																				displayField : 'number',
																																				valueField : 'year',
																																				editable : false,
																																				name : 'endYear'
																																			} ]
																																} ],
																																buttons : [
																																		{
																																			xtype : "button",
																																			text : "确定",
																																			handler : function() {
																																				var startYear = this.up('window').down('form').down('combobox[name=startYear]').value;
																																				var endYear = this.up('window').down('form').down('combobox[name=endYear]').value;
																																				if (startYear > endYear) {
																																					jesAlert('起始年不能大于终至年，请重新选择年限！');
																																				} else {
																																					Ext.Ajax
																																							.request({
																																								url : 'addWorkCalendar.ajax?f=BSYS.0103.add',
																																								params : {
																																									ssId : drawSsId,
																																									calendarId : drawCalendarId,
																																									baseType : baseType,
																																									calendarName : calendarName,
																																									startYear : startYear,
																																									endYear : endYear
																																								},
																																								success : function(
																																										response) {
																																									var text = Ext
																																											.decode(response.responseText);
																																									if (text == "1") {
																																										calendarStore
																																												.add({
																																													CALENDAR_ID : drawCalendarId,
																																													CALENDAR_NAME : calendarName,
																																													SS_ID : drawSsId
																																												});
																																										cacombo.bindStore(calendarStore);
																																										cacombo.setValue(drawCalendarId);
																																										drawCalendar(
																																												drawSsId,
																																												drawCalendarId,
																																												new Date());
																																										Ext.create('widget.uxNotification',{html : '新增成功！'}).show();
																																									} else {
																																										Ext.MessageBox.alert('提示','新增失败，日历已存在！');
																																									}
																																								}
																																							});
																																				}
																																				this.up("window").close();
																																			}
																																		},
																																		{
																																			xtype : "button",
																																			text : "取消",
																																			handler : function() {
																																				this.up("window").close();
																																			}
																																		} ]
																															}).show();}
																									});
																				} else {
																					Ext.MessageBox.alert('提示','日历名称不能为空！');
																				}
																			} else {
																				Ext.MessageBox.alert('提示','请先填写编号！');
																			}
																		}
																	},
																	{
																		xtype : 'textfield',
																		fieldLabel : '日历编号',
																		labelWidth : 60,
																		width : 120,
																		labelAlign : 'right',
																		name : 'caText'
																	},
																	{
																		xtype : 'textfield',
																		fieldLabel : '日历名称',
																		name : 'calendarName',
																		labelAlign : 'right'
																	},
																	{
																		xtype : 'combobox',
																		fieldLabel : '类型',
																		labelWidth : 50,
																		labelAlign : 'right',
																		width : 160,
																		store : typeStore,
																		displayField : 'disValue',
																		valueField : 'vValue',
																		value : 'normal',
																		editable : false,
																		name : 'baseType'
																	} ]
														} ]
											} ],
											contentEl : 'monthView'
										} ]
							});
		});