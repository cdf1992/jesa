Ext.require(['Ext.data.*', 'Ext.grid.*', 'Ext.ux.window.Notification'

]);
Ext.onReady(function() {

	var fileStore = Ext.create('Ext.data.Store', {
				fields : ['ssId', 'ssName', 'fileKey', 'filePath',
						'lastModifyDate', 'fileDesc', 'fileLength', 'fileName'],
				proxy : {
					type : 'ajax',
					url : 'getFileInfo.ajax?f=BSYS.0105.getFileInfo',
					reader : {
						type : 'json',
						root : 'fileInfo'
					}
				}
			});
	fileStore.load();

	var getSsIdStore = Ext.create('Ext.data.Store', {
				fields : ['ssName', 'ssId'],
				data : subsystemNum
			});

	Ext.create('Ext.container.Viewport', {
		layout : 'fit',
		items : [{
			xtype : 'gridpanel',
			title : fileManager_wjgl/*'文件管理'*/,
			layout : 'fit',
			tbar : [{
				text : fileManager_xinz/*'新增'*/,
				iconCls : "add-icon",
				handler : function() {

					Ext.create('Ext.window.Window', {
						title : fileManager_xzscwj/*'新增上传文件'*/,
						width : 400,
						layout : 'fit',
						constrainHeader : true,
						items : {
							layout : 'form',
							xtype : 'form',
							frame : true,
							name : 'uploadForm',
							defaultType : 'textfield',
							items : [{
										xtype : 'combobox',
										fieldLabel : fileManager_xtmc/*'系统名称'*/,
										allowBlank : false,
										name : 'ssId',
										height : 22,
										store : getSsIdStore,
										queryMode : 'local',
										displayField : 'ssName',
										valueField : 'ssId',
										editable : false

									}, {
										fieldLabel : fileManager_wjsbm/*'文件识别码'*/,
										allowBlank : false,
										name : 'fileKey',
										height : 22
									}, {
										xtype : 'fileuploadfield',
										name : 'upload_file',
										fieldLabel : fileManager_wj/*'文件'*/,
										allowBlank : false,
										anchor : '100%',
										buttonText : fileManager_ll/*'浏览...'*/
									}, {
										stype : 'textfield',
										name : 'filePath',
										fieldLabel : fileManager_kzxx/*'扩展信息'*/,
										height : 100
									}, {
										fieldLabel : fileManager_wjms/*'文件描述'*/,
										xtype : 'textareafield',
										name : 'fileDesc',
										allowBlank : true,
										height : 160
									}]
						},
						buttons : [{
							text : fileManager_scwj/*'上传文件'*/,
							name : 'upload',
							labelAlign : 'center',
							handler : function() {
								var me = this;
								var form = Q('form[name=uploadForm]');
								if (form.isValid()) {
									form.submit({
										url : 'uploadFile.do?f=BSYS.0150.uploadFile',
										enctype : 'multipart/form-data',
										method : 'POST',
										waitMsg : fileManager_zzsc/*'正在上传，请稍后...'*/,
										success : function(form, action) {
											fileStore.load();
											Ext.create('widget.uxNotification',
													{
														html : fileManager_scwjcg/*'上传文件成功...'*/
													}).show();
											me.up('window').close();
										},
										failure : function(form, action) {
											Ext.create('widget.uxNotification',
													{
														html : fileManager_gjlyjcz/*'该记录已经存在或程序异常,上传文件失败...'*/
													}).show();
											me.up('window').close();
										}
									});
								} else {
									Ext.create('widget.uxNotification', {
												html : fileManager_qjcxxsfwz/*'请检查信息是否完整...'*/
											}).show();
								}
							}
						}, {
							text : fileManager_qx/*'取消'*/,
							handler : function() {
								this.up('window').close();
							}

						}]

					}).show();
				}
			}, {
				text : fileManager_sx/*'刷新'*/,
				iconCls : "refresh-icon",
				handler : function() {
					fileStore.load();
				}
			}, {
				text : fileManager_plxz/*'批量下载'*/,
				iconCls : 'package-download-icon',
				handler : function() {
					var recordCount = Ext.getCmp('centerFrame')
							.getSelectionModel().getSelection().length;
					if (recordCount == 0) {
						alert(fileManager_qxzxyxdwj/*'请选择需要下载的文件.......'*/);
					} else {

						var selectRecords = Ext.getCmp('centerFrame')
								.getSelectionModel().getSelection();

						var datas = new Array();
						for (var i = 0; i < recordCount; i++) {
							datas.push({
										ssId : selectRecords[i].get('ssId'),
										fileKey : selectRecords[i]
												.get('fileKey')
									});
						}

						var ifameX = document.getElementById("download").contentWindow;
						ifameX.open(
								"bathDownload.ajax?f=BSYS.0150.bathDownload&datas="
										+ Ext.encode(datas), '_self');

					}
				}
			}, {
				text : fileManager_sclswj/*'删除临时文件'*/,
				iconCls : "delete-icon",
				handler : function() {
					var isDel = Q('checkboxfield[name=isDeleteTempFile]')
							.getValue();
					if (isDel) {
						Ext.Msg.confirm(fileManager_ts/*"提示"*/, fileManager_sccxx/*"删除此信息，页面可能需要两次刷新，否则不能正确渲染页面"*/,
								function(btn) {
									if (btn == "yes") {
										Ext.Ajax.request({
											url : 'deleteTempFile.ajax?f=BSYS.0150.deleteTempFile',
											params : {
												isDel : isDel
											},
											success : function(response) {
												var text = Ext
														.decode(response.responseText);
												if (text.success) {
													jesAlert(text.msg);
												} else {
													jesErrorAlert(text.msg);
												}
											}
										});
									}
								})
					} else {
						Ext.Ajax.request({
							url : 'deleteTempFile.ajax?f=BSYS.0150.deleteTempFile',
							success : function(response) {
								var text = Ext.decode(response.responseText);
								if (text.success) {
									jesAlert(text.msg);
								} else {
									jesErrorAlert(text.msg);
								}
							}
						});
					}
				}
			}, {
				xtype : 'checkboxfield',
				boxLabel : fileManager_schttlwj/*'删除httl文件'*/,
				name : 'isDeleteTempFile'
			}],
			layout : 'fit',
			store : fileStore,
			xtype : 'gridpanel',
			id : 'centerFrame',
			selType : 'checkboxmodel',
			selModel:{mode :'SIMPLE'},
			columns : [{
						header : fileManager_xh,/*序号*/
						xtype : 'rownumberer',
						width : 35,
						align : 'center'
					}, {
						text : fileManager_xtbh/*'系统编号'*/,
						width : 80,
						dataIndex : 'ssId'
					}, {
						text : fileManager_wjmc/*'文件名称'*/,
						flex : 1,
						dataIndex : 'fileName'
					}, {
						text : fileManager_wjsbm/*'文件识别码'*/,
						width : 120,
						dataIndex : 'fileKey'
					}, {
						text : fileManager_wjms/*'文件描述'*/,
						id : 'fileDesc',
						width : 160,
						align : '',
						dataIndex : 'fileDesc'
					}, {
						text : fileManager_kzxx/*'扩展信息'*/,
						id : 'filePath',
						width : 125,
						dataIndex : 'filePath'
					}, {
						text : fileManager_xgsj/*'修改时间'*/,
						width : 140,
						align : 'center',
						dataIndex : 'lastModifyDate'
					}, {
						text : fileManager_wjdx/*'文件大小/B'*/,
						width : 90,
						align : 'center',
						dataIndex : 'fileLength'
					}, {
						text : fileManager_shangchuan/*'上传'*/,
						width : 40,
						align : 'center',
						xtype : 'actioncolumn',
						iconCls : 'upload-icon',
						handler : function(grid, rowIndex) {
							var ssId = grid.getStore().getAt(rowIndex)
									.get('ssId');
							var fileKey = grid.getStore().getAt(rowIndex)
									.get('fileKey');
							var filePath = grid.getStore().getAt(rowIndex)
									.get('filePath');

							Ext.create('Ext.window.Window', {
								title : fileManager_gxhsc/*'更新或上传'*/,
								width : 400,
								height : 100,
								frame : true,
								items : {
									xtype : 'form',
									layout : 'form',
									name : 'updateFile',
									items : [{
												xtype : 'fileuploadfield',
												name : 'update_file',
												fieldLabel : fileManager_wj/*'文件'*/,
												labelWidth : 60,
												labelAlign : 'right',
												msgTarget : 'filePath',
												allowBlank : false,
												anchor : '98%',
												buttonText : fileManager_ll/*'浏览...'*/
											}]
								},
								buttons : [{
									text : fileManager_shangchuan/*'上传'*/,
									algin : 'center',
									handler : function() {
										var me = this;

										var updateForm = Q('form[name=updateFile]');
										if (updateForm.isValid) {
											updateForm.submit({
												url : 'updateFile.do?f=BSYS.0150.updateFile',
												params : {
													ssId : ssId,
													fileKey : fileKey,
													filePath : filePath
												},

												method : 'POST',
												enctype : 'multipart/form-data',
												waitMsg : fileManager_zzgxwj/*'正在更新文件，请耐心等候......'*/,
												success : function(form, action) {
													var text = action.result.success;
													if (text == 'updateOk') {

														fileStore.load();
														Ext
																.create(
																		'widget.uxNotification',
																		{
																			html : fileManager_gxwjcg/*'更新文件成功...'*/
																		})
																.show();
														me.up('window').close();

													} else if (text == 'updateFalse') {
														Ext
																.create(
																		'widget.uxNotification',
																		{
																			html : fileManager_gxwjsb/*'更新文件失败...'*/
																		})
																.show();
														me.up('window').close();
													}
												}
											});

										} else {
											Ext.create('widget.uxNotification',
													{
														html : fileManager_qshzs/*'请稍后再试.......'*/
													}).show();
										}
									}
								}, {
									text : fileManager_qx/*'取消'*/,
									handler : function() {
										this.up('window').close();
									}
								}]
							}).show();
						}
					}, {
						text : fileManager_xz,/*下载*/
						width : 40,
						align : 'center',
						xtype : 'actioncolumn',
						iconCls : 'package-download-icon',
						handler : function(grid, rowIndex) {
							var ssId = grid.getStore().getAt(rowIndex)
									.get('ssId');
							var fileKey = grid.getStore().getAt(rowIndex)
									.get('fileKey');
							var ifameX = document.getElementById("download").contentWindow;
							ifameX.open(
									"downloadFile.ajax?f=BSYS.0150.downloadFile&ssId="
											+ encodeURI(ssId) + "&fileKey="
											+ encodeURI(fileKey), '_self');
						}
					}, {
						text : fileManager_bj/*'编辑'*/,
						width : 40,
						xtype : 'actioncolumn',
						iconCls : 'edit-icon',
						align : 'center',
						handler : function(grid, rowIndex) {
							var filePath = grid.getStore().getAt(rowIndex)
									.get('filePath');
							var ssId = grid.getStore().getAt(rowIndex)
									.get('ssId');
							var fileKey = grid.getStore().getAt(rowIndex)
									.get('fileKey');
							var fileDesc = grid.getStore().getAt(rowIndex)
									.get('fileDesc');
							Ext.create('Ext.window.Window', {
								title : fileManager_bjxx/*'编辑信息'*/,
								width : 400,
								layout : 'fit',
								constrainHeader : true,
								items : {
									layout : 'form',
									xtype : 'form',
									frame : true,
									name : 'edit',
									defaultType : 'textfield',
									items : [{
												fieldLabel : fileManager_xtmc/*'系统名称'*/,
												name : 'ssId',
												height : 22,
												value : ssId,
												readOnly : true

											}, {
												fieldLabel : fileManager_wjsbm/*'文件识别码'*/,
												name : 'fileKey',
												height : 22,
												value : fileKey,
												readOnly : true
											}, {
												fieldLabel :fileManager_kzxx/* '扩展信息'*/,
												xtype : 'textareafield',
												name : 'filePath',
												value : filePath,
												allowBlank : true,
												height : 100
											}, {
												fieldLabel : fileManager_wjms/*'文件描述'*/,
												xtype : 'textareafield',
												name : 'fileDesc',
												value : fileDesc,
												allowBlank : true,
												height : 160
											}],
									buttons : [{
										text : fileManager_bc/*'保存'*/,
										name : 'save',
										labelAlign : 'center',
										handler : function() {
											var me = this;
											var form = Q('form[name=edit]');

											if (form.isValid()) {
												form.submit({
													url : 'editInfo.ajax?f=BSYS.0150.editInfo',
													method : 'POST',
													success : function(form,
															action) {
														fileStore.load();
														Ext
																.create(
																		'widget.uxNotification',
																		{
																			html : fileManager_gxcg/*'更新成功...'*/
																		})
																.show();
														me.up('window').close();
													},
													failure : function(form,
															action) {
														Ext
																.create(
																		'widget.uxNotification',
																		{
																			html : fileManager_cxycqshzs/*'程序异常,请稍后再试......'*/
																		})
																.show();
														me.up('window').close();
													}
												});
											}
										}
									}, {
										text : fileManager_qx/*'取消'*/,
										labelAlign : 'center',
										handler : function() {
											var me = this;
											me.up('window').close();
										}
									}]
								}
							}).show();
						}
					}, {
						text : fileManager_shanchu/*'删除'*/,
						width : 40,
						xtype : 'actioncolumn',
						iconCls : 'delete-icon',
						align : 'center',
						handler : function(grid, rowIndex) {
							var ssId = grid.getStore().getAt(rowIndex)
									.get('ssId');
							var fileKey = grid.getStore().getAt(rowIndex)
									.get('fileKey');
							var fileName = grid.getStore().getAt(rowIndex).raw.fileName;
							Ext.MessageBox.confirm(fileManager_ts/*'提示'*/, fileManager_nqdyscm/*'你确定要删除吗？'*/, function(
									obj) {
								if (obj == 'yes') {
									Ext.Ajax.request({
										url : 'deleteFileRecord.ajax?f=BSYS.0150.delete',
										method : 'post',
										params : {
											ssId : ssId,
											fileKey : fileKey,
											fileName : fileName
										},
										success : function(response) {
											var text = Ext
													.decode(response.responseText);
											if (text == 'deleteOk') {
												fileStore.load();
												Ext
														.create(
																'widget.uxNotification',
																{
																	html : fileManager_sccg/*'删除成功...'*/
																}).show();
											} else if (text == 'deleteFalse') {
												Ext
														.create(
																'widget.uxNotification',
																{
																	html : fileManager_scsb/*'删除失败...'*/
																}).show();
											} else if (text == 'exception') {
												Ext
														.create(
																'widget.uxNotification',
																{
																	html : fileManager_cxfsyc/*'程序发生异常，请一会再试...'*/
																}).show();
											}
										}
									});
								}
							});
						}
					}, {
						text : fileManager_schcwj/*'删除缓存文件'*/,
						xtype : 'actioncolumn',
						iconCls : 'delete-icon',
						align : 'center',
						handler : function(grid, rowIndex) {
							var ssId = grid.getStore().getAt(rowIndex)
									.get('ssId');
							var fileKey = grid.getStore().getAt(rowIndex)
									.get('fileKey');
							var fileName = grid.getStore().getAt(rowIndex).raw.fileName;
							Ext.Ajax.request({
								url : 'deleteCacheFile.ajax?f=BSYS.0150.delete',
								method : 'post',
								params : {
									ssId : ssId,
									fileKey : fileKey,
									fileName : fileName
								},
								success : function(response) {
									var text = Ext
											.decode(response.responseText);
									if (text == 'deleteOk') {
										fileStore.load();
										Ext.create('widget.uxNotification', {
													html : fileManager_sccg/*'删除成功...'*/
												}).show();
									} else if (text == 'deleteFalse') {
										Ext.create('widget.uxNotification', {
													html : fileManager_scsb/*'删除失败...'*/
												}).show();
									} else if (text == 'exception') {
										Ext.create('widget.uxNotification', {
													html : fileManager_cxfsyc/*'程序发生异常，请一会再试...'*/
												}).show();
									}
								}
							});
						}
					}]
		}]
	});
});
