Ext.require([ 'Ext.data.*',
              'Ext.grid.*',
              'Ext.ux.window.Notification',
              'Sys.app.SsConfigWin',
              'Ext.ux.jes.NotOnlySpaceText']);
Ext.onReady(function() {
				var instsStore = Ext.create('Ext.data.TreeStore', {
					proxy : {
						type : 'ajax',
						url : 'getInstsTree.ajax?f=BSYS.0201.getInstsTree',
						reader : {
							type : 'json'
						}
					}
				});
			var dataStore = Ext.create('Ext.data.Store', {
				fields : [ 'instId', 'instName', 'instSmpName', 'parentInstId',
						'parentInstId', 'instLayer', 'address', 'tel', 'fax' ],
				proxy : {
					type : 'ajax',
					url : 'getInstClassify.ajax?f=BSYS.0206',
					reader : {
						type : 'json',
						root : 'classifyId'
					}
				}
			});
			
			var subSystem = Ext.create('Ext.data.Store', {
				fields : [ 'ssId', 'ssName' ],
				data : sysStore
			});
			var instClassifyData = Ext.create('Ext.data.Store', {
				fields : [ 'classifyId', 'ssId', 'classifyName' ],
				data : instClassify
			});
			instClassifyData.loadRawData(instClassify);
			instClassifyData.filter({
				id : 'ssId',
				property : 'ssId',
				value : 'BSYS'
			});
			Ext.create('Ext.container.Viewport',
							{layout : 'border',
							defaults :{
									split :true
							},
							items : [{xtype : 'treepanel',
										region : 'west',
										collapsible : true,
										title : '机构信息（双击可添加机构信息）',
										width : 210,
										height : 150,
										rootVisible : false,
										store : instsStore,
										itemId : 'treePanelId',
										listeners : {
											itemdblclick : function(tree,record, item, index, e,eOpts) {
												var instId = record.raw.id;
												var classifyId = null;
												var fields = Ext.ComponentQuery.query('combobox',this.up('tbar'));
												for ( var i in fields) {
													if (fields[i].name == 'changeInst') {
														classifyId = fields[i].getValue();
													}
												}
												if(classifyId != null){
													Ext.Ajax.request({
														url : 'addInstId.ajax?f=BSYS.0206',
														method : 'GET',
														params : {
															instId : instId,
															classifyId : classifyId
														},
														success:function(response){
															var result = Ext.decode(response.responseText);
															if (result=="Y") {
																Ext.create('widget.uxNotification', {html: '添加成功！'}).show();
																dataStore.load();
															}else if(result=="N"){
																Ext.MessageBox.alert('提示','此机构集中已存在该条数据！');
															}else {
																Ext.MessageBox.alert('提示','操作失败！');
															}
														}
													});
												}else{
													Ext.MessageBox.alert('提示','机构集名称为空，请选择机构集！');
												}
											}
										}
//										tbar:['->',{
//											text : "显示新增机构",
//											iconCls:'time_markers',
//											handler : function (){
//												var classifyId = null;
//												var fields = Ext.ComponentQuery.query('combobox',this.up('tbar'));
//												for(var i in fields){
//													if(fields[i].name = 'changeInst'){
//														classifyId = fields[i].getValue();
//													}
//												}
//												if (classifyId != null) {
//													Ext.Ajax.request({
//														url : 'changeColor.ajax?f=BSYS.0206',
//														method : 'GET',
//														params : {
//															classifyId : classifyId
//														},
//													success : function(response){
//														var list = Ext.decode(response.responseText);
//														for (var i in list) {
//															instsStore.getNodeById(list[i]).set('cls','red');
//														}
//														}
//													});
//												}else {
//													Ext.MessageBox.alert('提示','机构集名称为空，请选择机构集！');
//												}
//											}
//										}]
									},
									{
										xtype : 'gridpanel',
										region : 'center',
										title : '机构集管理',
										rootVisible : false,
										tbar : [
												{
													xtype : 'tbspacer',
													width : 20
												},
												{
													xtype : 'combobox',
													fieldLabel: '选择系统',
													labelWidth: 60,
													editable:false,
													width : 180,
													store : subSystem,
													queryMode: 'local',
													displayField : 'ssName',
													valueField : 'ssId',
													value : 'BSYS',
													itemId : 'sys_combobox',
													name:'changeSys',
													listeners : {
														select : function(combo,records,eOpts) {
															instClassifyData.clearFilter(false);
															instClassifyData.filter({
																		id : 'ssId',
																		property : 'ssId',
																		value : combo.value
																	});
															var caCombobox = this.up('toolbar').getComponent('instClassify_combobox');
															caCombobox.select(instClassifyData.getCount() > 0 ? instClassifyData.getAt(0): null);
														}
													}
												},
												{
													xtype : 'tbspacer',
													width : 20
												},
												{
													xtype : 'combobox',
													fieldLabel:'选择机构集',
													labelWidth: 70,
													width : 180,
													queryMode: 'local',
													editable:false,
													store : instClassifyData,
													name : 'changeInst',
													displayField : 'classifyName',
													valueField : 'classifyId',
													itemId : 'instClassify_combobox',
													value : instClassifyData.getCount() > 0 ? instClassifyData.getAt(0): null,
													listeners : {
														change : function(combo,records,eOpts) {
															dataStore.proxy.extraParams.resType = records;
															dataStore.load();
															if(!instsStore.isLoading( )){
																instsStore.load();
															}
														}
													}
												},
												{
													xtype : 'button',
													text : '删除',
													iconCls : "delete-icon",
													queryMode: 'local',
													handler: function(){
														var classifyId = this.up('toolbar').down('combobox[name=changeInst]').value;
														var combo = this.up('toolbar').down('field[name=changeInst]');
														Ext.MessageBox.confirm('提示','您确定要删除吗?',function(obj) {
															if (obj=='yes') {
																Ext.Ajax.request({
																	url: 'deleteClassify.ajax?f=BSYS.0206',
																	method : 'GET',
																	params:{
																		classifyId : classifyId
																	},
																success:function(response){
																	var result=Ext.decode(response.responseText);
																	if (result=='Y') {
																		instClassifyData.remove(combo.findRecordByValue(classifyId));
																		if(instClassifyData.getCount()>0){
																			combo.select(instClassifyData.getAt(0));
																		}else{
																			combo.setValue(null);
																		}
																		Ext.create('widget.uxNotification', {html: '删除成功！'}).show();
																	}else {
																		Ext.MessageBox.alert('提示','操作失败！');
																	}
																}
																});
															}
														});
													}
												}, {
													xtype : 'tbspacer',
													width : 30
												},{
													xtype : 'nostextfield',
													fieldLabel:'新增机构集',
													labelWidth:70,
													name:'newConfigName',
													allowBlank: false,
													width :180
												},{
													xtype : 'nostextfield',
													fieldLabel:'新增编号',
													labelWidth: 60,
													name:'newConfigId',
													allowBlank: false,
													width : 150
												}, {
													text : '新增',
													iconCls : 'add-icon',
													handler:function (){
														var c = this.up('toolbar').down('field[name=changeInst]');
														var newConfigName = this.up('toolbar').down('field[name=newConfigName]').value;
														var newConfigId = this.up('toolbar').down('field[name=newConfigId]').value;
														var fields = Ext.ComponentQuery.query('combobox',this.up('tbar'));
														for(var i in fields){
															if(fields[i].name=='changeSys'){
																ssId = fields[i].value;
															}
														}
														if(newConfigName){
															if(newConfigId){
																Ext.Ajax.request({
																	url : 'addConfig.ajax?f=BSYS.0206',
																	method : 'GET',
																	params : {
																		newConfigName : newConfigName,
																		newConfigId : newConfigId,
																		ssId : ssId
																	},
																	success:function(response){
																		var result=Ext.decode(response.responseText);
																		if(result == '1'){
																			Ext.MessageBox.alert('提示','此编号已经存在!');
																		}else if(result == '2'){
																			Ext.MessageBox.alert('提示','此名称已经存在!');
																		}else if(result == '3'){
																			instClassifyData.add({
																				classifyId : newConfigId,
																				classifyName: newConfigName,
																				ssId: ssId
																			});
																			c.bindStore(instClassifyData);
																			c.setValue(newConfigId);
																			Ext.create('widget.uxNotification', {html: '添加成功！'}).show();
																		}
																	}
																});
															}else{
																Ext.MessageBox.alert('提示','新增编号不能为空！');
															}
														}else{
															Ext.MessageBox.alert('提示','新增机构集名称不能为空！');
														}
													}
												} ],
										store : dataStore,
										columns : [ {
											header : '序号',
											xtype : 'rownumberer',
											width : 40,
											align : 'center'
										}, {
											text : '机构编号',
											width : 100,
											align : 'center',
											dataIndex : 'instId'
										}, {
											text : '机构名称',
											width : 100,
											align : 'center',
											dataIndex : 'instName'
										}, {
											text : '机构简称',
											width : 100,
											align : 'center',
											dataIndex : 'instSmpName'
										}, {
											text : '上级机构',
											width : 100,
											align : 'center',
											dataIndex : 'parentInstId'
										}, {
											text : '机构级别',
											width : 100,
											align : 'center',
											dataIndex : 'instLayer'
										}, {
											text : '机构地址',
											width : 100,
											align : 'center',
											dataIndex : 'address'
										}, {
											text : '机构电话',
											width : 100,
											align : 'center',
											dataIndex : 'tel'
										}, {
											text : '机构传真',
											width : 100,
											align : 'center',
											dataIndex : 'fax'
										}, {
											text : '删除',
											width : 50,
											align : 'center',
											xtype : 'actioncolumn',
											iconCls : 'delete-icon',
											handler: function(grid,rowIndex){
												var instId = grid.getStore().getAt(rowIndex).get('instId');
												var fields = Ext.ComponentQuery.query('combobox',this.up('tbar'));
												var classifyId = null;
												for ( var i in fields) {
													if (fields[i].name == 'changeInst') {
														classifyId = fields[i].getValue();
													}
												}
												Ext.MessageBox.confirm('提示','您确定要删除吗?',function(obj) {
													if (obj=='yes') {
														Ext.Ajax.request({
															url: 'deleteSsAdmin.ajax?f=BSYS.0206',
															method : 'GET',
															params:{
																instId : instId,
																classifyId : classifyId
															},
														success:function(response){
															var result=Ext.decode(response.responseText);
															if (result=='Y') {
																Ext.create('widget.uxNotification', {html: '删除成功！'}).show();
																dataStore.load();
															}else {
																Ext.MessageBox.alert('提示','操作失败！');
															}
														}
														});
													}
												});
											}
										} ]
									} ]
							});
		});
