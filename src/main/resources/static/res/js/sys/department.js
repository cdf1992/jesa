Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.ux.window.Notification',
    'Sys.app.DepartWin'
]);

Ext.onReady(function(){
	
	var departStore = Ext.create('Ext.data.Store',{
		fields:['departId', 'departName', 'headquartersOnly', 'managerOnly'],
		proxy:{
			type: 'ajax',
			url: 'listDepart.ajax?f=BSYS.0202',
			reader:{
				type:'json',
				root:'listDepart'
			}
		}
	});
	departStore.load();
	
	Ext.create('Ext.container.Viewport',{
		layout:'border',
		items:[{
				region:'center',
				xtype:'gridpanel',
				title:department_bmgl,/*部门管理*/
				layout:'fit',
				name: 'departGrid',
				id: 'departGrid',
				tbar: [
					{
						text: department_xz,/*新增*/
						iconCls: "add-icon",
						handler:function(){
							var w = new Sys.app.DepartWin();
							w.setTitle(department_xzbm);/*新增部门*/
							w.down('button[name=submit]').setHandler(function(){
								var form = w.down('form');
								if(form.isValid()) {
									form.submit({
										url : 'addDepart.ajax?f=BSYS.0202.add',
										success:function(form,action){
											var text=action.result.success;
											if(text=='true'){
												jesAlert(department_xzcg);/*新增成功！*/
												w.close();
												departStore.load();
											}else if(text=='false'){
												w.close();
												Ext.MessageBox.alert(department_ts/*提示*/,department_xzsb);/*新增失败！部门已存在*/
											}
										}
									});
								}
							});
							w.show();
						}
					},
//					{
//						text: '编辑',
//						iconCls: 'edit-icon',
//						handler: function() {
//							var grid = Ext.getCmp('departGrid').getSelectionModel().getSelection();
//							if(grid.length > 0) {
//								var w = new Sys.app.DepartWin();
//								w.setTitle('部门编辑');
//								var departId=grid[0].get('departId');
//								var departName=grid[0].get('departName');
//								var hOnly=grid[0].get('headquartersOnly');
//								var mOnly=grid[0].get('managerOnly');
//								w.down('textfield[name=departId]').setValue(departId).readOnly=true;
//								w.down('textfield[name=departName]').setValue(departName);
//					    		w.down('checkboxfield[name=headquartersOnly]').setValue(hOnly);
//					    		w.down('checkboxfield[name=managerOnly]').setValue(mOnly);
//					    		w.down('button[name=submit]').setHandler(function(){
//					    			var form = w.down('form');
//									if(form.isValid()) {
//										form.submit({
//											url : 'editDepart.ajax?f=BSYS.0202.edit',
//											success:function(form,action){
//												var text=action.result.success;
//												if(text=='true'){
//													jesAlert('修改成功！');
//													w.close();
//													departStore.load();
//												}else if(text=='false'){
//													w.close();
//													Ext.MessageBox.alert('提示','没进行任何修改！');
//												}
//											}
//										});
//									}
//								});
//								w.show();
//							}else {
//                                Ext.MessageBox.alert("提示",'至少选择一行！');
//                            }
//						}
//					},
					{
						text: department_sc,/*删除*/
						iconCls: 'delete-icon',
						handler: function(grid, rowIndex) {
							var grid = Ext.getCmp('departGrid').getSelectionModel().getSelection();
							var recordCount = grid.length;
							if(grid.length > 0){
								Ext.MessageBox.confirm(department_ts/*提示*/,department_qdsc/*您确定要删除吗?*/,function(obj) {
									if(obj=='yes'){
//										var departId=grid[0].get('departId');
										var departId = [];
										for (var i = 0; i < recordCount; i++) {
									    	var id = grid[i].get('departId');
									    	departId.push(id);
									    }
										Ext.Ajax.request({
											url: 'deleteDepart.ajax?f=BSYS.0202.remove',
											params:{
												departId: departId
											},
											success:function(response){
												var text=Ext.decode(response.responseText);
												if(text=='0'){
													Ext.MessageBox.alert(department_ts/*提示*/,department_czcg);/*操作成功!*/
												}else if(text=='1'){
													document.location.reload();
												}else if(text=='2'){
													Ext.MessageBox.alert(department_ts/*提示*/,department_czsb+"...");/*操作失败,程序发生异常*/
												}
												departStore.load();
											}
										});
									}
								});
							}else{
								Ext.MessageBox.alert(department_ts/*提示*/,department_qxyh);/*至少选择一行！*/
							}
						}
					}
				],
				selType : 'checkboxmodel',
				selModel:{mode :'SIMPLE'},
				store:departStore,
				columns:[
				         { header: department_xh/*序号*/, xtype: 'rownumberer', width:40, align: 'center'},
					     { text: department_bmbh/*部门编号*/, align: 'center', dataIndex: 'departId'},
					     { text: department_bmmc/*部门名称*/, align: 'center', dataIndex: 'departName'},
					     { 
					    	 text: department_sfzh, /*是否总行特有部门*/
					    	 align: 'center',
					    	 width:120, 
					    	 renderer : function(val) {
				                    if (val=="Y") {
				                        return '<span style="color:green;">'+department_s+'</span>';/*是*/
				                    } else if (val == "N") {
				                        return '<span style="color:red;">'+department_f+'</span>';/*否*/
				                    }
				                    return val;
				             },
					    	 dataIndex: 'headquartersOnly'
					     },{ 
					    	 text: department_sfgl, /*是否管理行特有部门*/
					    	 align: 'center', 
					    	 width:140, 
					    	 renderer : function(val) {
				                    if (val=="Y") {
				                        return '<span style="color:green;">'+department_s+'</span>';/*是*/
				                    } else if (val == "N") {
				                        return '<span style="color:red;">'+department_f+'</span>';/*否*/
				                    }
				                    return val;
				             },
					    	 dataIndex: 'managerOnly'
					     },{
					    	 text: department_bj,/*编辑*/
					    	 align: 'center',
					    	 xtype: 'actioncolumn',
					    	 iconCls: 'edit-icon',
					    	 handler: function(grid, rowIndex) {
					    		 var w = new Sys.app.DepartWin();
					    		 w.setTitle(department_bmbj);/*部门编辑*/
					    		 var departId = grid.getStore().getAt(rowIndex).get('departId');
					    		 var departName = grid.getStore().getAt(rowIndex).get('departName');
					    		 var hOnly = grid.getStore().getAt(rowIndex).get('headquartersOnly');
					    		 var mOnly = grid.getStore().getAt(rowIndex).get('managerOnly');
					    		 w.down('textfield[name=departId]').setValue(departId).readOnly=true;
					    		 w.down('textfield[name=departId]').setFieldStyle('background:#f1f1f1');
					    		 w.down('textfield[name=departName]').setValue(departName);
					    		 w.down('checkboxfield[name=headquartersOnly]').setValue(hOnly);
					    		 w.down('checkboxfield[name=managerOnly]').setValue(mOnly);
					    		 w.down('button[name=submit]').setHandler(function(){
										var form = w.down('form');
										if(form.isValid()) {
											form.submit({
												url : 'editDepart.ajax?f=BSYS.0202.edit',
												success:function(form,action){
													var text=action.result.success;
													if(text=='true'){
														jesAlert(department_xgcg);/*修改成功！*/
														w.close();
														departStore.load();
													}else if(text=='false'){
														w.close();
														Ext.MessageBox.alert(department_ts/*提示*/,department_mjxrhxg);/*没进行任何修改！*/
													}
												}
											});
										}
									});
					    		 w.show();
					    		
					    	 }
					     },{
					    	 text: department_sc,/*删除*/
					    	 align: 'center',
					    	 xtype: 'actioncolumn',
					    	 iconCls: 'delete-icon',
					    	 handler: function(grid, rowIndex) {
									var departId = grid.getStore().getAt(rowIndex).get('departId');
									Ext.MessageBox.confirm(department_ts/*提示*/,department_qdsc/*确定要删除吗?*/,function(obj){
										if(obj=='yes'){
											Ext.Ajax.request({
												url: 'deleteDepart.ajax?f=BSYS.0202.remove',
												params:{
													departId: departId
												},
												success:function(response){
													var text=Ext.decode(response.responseText);
													if(text=='0'){
														Ext.MessageBox.alert(department_ts/*提示*/,department_czsb);/*操作失败!*/
													}else if(text=='1'){
														jesAlert(department_sccg);/*删除成功！*/
														departStore.load();
													}else if(text=='2'){
														Ext.MessageBox.alert(department_ts/*提示*/,department_czsb+"...");/*操作失败,程序发生异常*/
													}
													departStore.load();
												}
											});
										}
									});
					    	 }
					     }
				]
		}]
	});
});