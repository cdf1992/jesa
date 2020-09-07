Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.ux.window.Notification',
    'Ext.form.field.ComboBox',
    'Ext.ux.jes.PagingToolbar',
	'Ext.ux.jes.CascadeTree',
	'Ext.tree.*'
]);

Ext.onReady(function() {
	var checkInstTreeStore = Ext.create('Ext.data.TreeStore', {
		proxy : {
			type : 'ajax',
			url  : 'getCheckInstTree.ajax?f=BSYS.0205.getCheckInstTree',
			reader : {
				type : 'json'
			}
		},
		root: {
            expanded: true
        }
	});
	
	var supTreeStore = Ext.create('Ext.data.TreeStore', {
	   autoLoad : false,
	   root:{
		   text:'',
		   iconCls: 'role-icon',
		   expanded:false
	   },
	   proxy : {
			type : 'ajax',
			url: 'getSupInsts.ajax?f=BSYS.0205.getSupInsts',
			reader : {
				type : 'json'
			}
	   },
	   listeners:{
		    load:function(me, records, successful, eOpts){
		    	me.getRootNode().expand();
		    }
	    }
	});
	var subInstStore = Ext.create('Ext.data.Store', {
		autoLoad : false,  
		fields : ['summaryTypeId','superiorInstId','subordinateInstId', 'instName','calcFlag','operatorFlag'],
		proxy : {
			type : 'ajax',
			url : 'getSubInsts.ajax?f=BSYS.0205.getSubInsts',
			reader : {
				type : 'json'
			}
		}
	});	
	var sysStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		fields : ['ssId', 'ssName'],
		proxy : {
			type : 'ajax',
			url : 'getSysData.ajax?f=BSYS.0205.getSysData',
			reader : {
				type : 'json'
			}
		}
	});	
	var summaryTypeStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		fields : ['summaryTypeId', 'summaryTypeName','ssId'],
		proxy : {
			type : 'ajax',
			url : 'getSummaryTypes.ajax?f=BSYS.0205.getSummaryTypes',
			reader : {
				type : 'json'
			}
		},
		filters: [
			{
				property: 'ssId',
				value   : 'BSYS'
			}
      ]
	});
	
	//pNode的子节点中是否存在exitNode节点  从上往下遍历，存在返回false
	function getAllNode(pNode,exitNode){
		var childNodes = pNode.childNodes;
		for(var i=0; i < childNodes.length; i++){
			var cNode = childNodes[i];
			var ownId = cNode.data.ownId;
			if(exitNode.data.id==ownId){
				return false;
			}
			if(cNode.hasChildNodes()){
				if(getAllNode(cNode,exitNode)==false){
					return false;
				}
			}
		}
		return true;
	};
	
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		defaults :{
			split :true
		},
		items : [{
				xtype:'cascadetree',
				region : 'west',
				title : '机构关系',
				collapsible:true,
				flex : 1,
                rootVisible:false,
                id: 'inst_tree',
                store:checkInstTreeStore,
                selType:'treemodel',
				tbar: {    
				        xtype : 'container',
				        items : [
							new Ext.Toolbar({
								flex:1,
								width:'100%',
								layout : {
									pack : 'left'
								},
								items : [
									{ xtype: 'button', 
					        	          text: '成为上级节点',
					        	          iconCls:'arrow-merge',
					        	          handler:function(){
						        	          	var summaryTypeId = Q('combobox[name=summaryTypeComb]').value;
								        	 	if(Ext.isEmpty(summaryTypeId)){
								        	 		return jesAlert('请选择汇总类型');
								        	 	}
					        	        	    var instTree = this.up("#inst_tree");
							        			var nodes = instTree.getView().getChecked();
							        			if(nodes.length==0){
							        				return jesAlert('请选择上级机构');
							        			}
							        			var supNodes=[];
							        			for(var s in nodes){
							        				supNodes.push(nodes[s].data.id);
							        			}
							        			supTreeStore.proxy.extraParams={summaryTypeId:summaryTypeId,supNodes:supNodes};
							        			supTreeStore.load();
					        	          }
							           },
								       { xtype: 'button', 
							        	 text: '成为下级节点',
							        	 iconCls:'arrow-branch',
							        	 handler:function(){
							        	 	var summaryTypeId = Q('combobox[name=summaryTypeComb]').value;
							        	 	if(Ext.isEmpty(summaryTypeId)){
							        	 		return jesAlert('请选择汇总类型');
							        	 	}
						        			var instTree = this.up("#inst_tree");
						        			var summaryTree = instTree.nextSibling('panel').down('#summary_tree');
						        			var parent = summaryTree.getView().getSelectionModel().getSelection();
						        			if(parent.length==0){
						        				return jesAlert('请选择一个上级机构');
						        			}
						        			var subs = instTree.getView().getChecked();
						        			if(subs.length==0){
						        				return jesAlert('请选择下级机构');
						        			}
						        			var relas=[];
						        			for(var s in subs){
						        				if(parent[0].data.id!=subs[s].data.id){//自己不能成为自己的下级机构
						        					relas.push({
							        				    summaryTypeId:summaryTypeId,
							        				    superiorInstId:parent[0].data.id,
							        				    subordinateInstId:subs[s].data.id,
							        				    calcFlag:'Y',
							        				    operatorFlag:'+'
							        				});
						        				}
						        			}
						        			Ext.Ajax.request({
												  url:'saveSubNodes.ajax?f=BSYS.0205.saveSubNodes',
												  jsonData:relas,
												  success:function(response){
														jesAlert(Ext.decode(response.responseText));
														subInstStore.proxy.extraParams={summaryTypeId:summaryTypeId,superiorInstId:parent[0].data.id};
        			                                    subInstStore.load();
												  },
												  failure: function(response, opts) {
														jesAlert('服务连接失败，状态码' + response.status);
												  }
											});
							        	 }
								       }
								]
							}),
							new Ext.Toolbar({
								flex:1,
								width:'100%',
								layout : {
									pack : 'left'
								},
								items : [{
						        	 xtype:'combobox',
						        	 width:80,
						        	 name:'cascade', 
						        	 value:'0',
						        	 store:Ext.create('Ext.data.Store',{
						        			fields:['cascadeCname','cascadeType'],
						        			data:[
						        			      {'cascadeCname':'不级联','cascadeType':'0'},
						        			      {'cascadeCname':'级联一级','cascadeType':'1'},
						        			      {'cascadeCname':'级联全部 ','cascadeType':'2'}
						        		    ]
						        	 }),
						        	 displayField:'cascadeCname',
						        	 valueField:'cascadeType',
						        	 listeners:{
						        		 change:function(me,newValue,oldValue,eOpts){
						        			me.up('cascadetree').cascadeType=newValue;
						        		 }
						        	 }
						         }]
							})      
					]
				}				
			   },{
			   	xtype: 'panel',
				region: 'center',
				flex :3,
				layout : 'border',
				tbar:[{
						xtype:'form',
						border:0,
						width:'100%',
						items:[{
							xtype:'toolbar',
							items:[{
							    xtype : 'tbspacer',
							    width : 5
					    	},{					
				            	xtype: 'combobox',
				            	labelWidth:30,
				            	name: 'ssId',
				            	store: sysStore,
				            	displayField: 'ssName',
					       	    valueField: 'ssId',
				            	fieldLabel: '系统',
				            	forceSelection : true,
								queryMode: 'local',
								anyMatch: true,
				            	listeners: {
			            			select: function(combo, records, eOpts) {
				            			summaryTypeStore.clearFilter(true);
				            			summaryTypeStore.filter({
											property: 'ssId',
											value   : combo.value
										});	
										var stCombobox = this.up('form').down('combobox[name=summaryTypeComb]');
			            			    stCombobox.select(summaryTypeStore.getAt(0));
			            			}
				       	    	}										
					     	},{
							    xtype : 'tbspacer',
							    width : 5
					    	},{					
				            	xtype: 'combobox',
				            	labelWidth:55,
				            	name: 'summaryTypeComb',
				            	store: summaryTypeStore,	
				            	forceSelection : true,
								queryMode: 'local',
								anyMatch: true,
				            	displayField: 'summaryTypeName',
					       	    valueField: 'summaryTypeId',
				            	fieldLabel: '汇总类型',
				            	listeners: {
				            		change: function(combo, newValue, oldValue, eOpts) {
							        	supTreeStore.proxy.extraParams={summaryTypeId:newValue};
							        	supTreeStore.load();
				            		}
				            		
					       	    }										
						      }]
						
						},{
							xtype:'toolbar',
							items:[{
							    xtype : 'tbspacer',
								width : 5
						 	},{
								xtype: 'button',
								text: '新增汇总类型',
								iconCls: 'add-icon',
								handler: function() {
									var typeWin=Ext.create('Ext.window.Window', {
									    title: '新增汇总类型',
									    height: 220,
									    width: 300,
									    layout: 'fit',
									    modal:true,
									    resizable:false,
									    items: {  
									        xtype: 'form',
									        buttonAlign:'center',
									        defaults:{
									        	labelWidth:120
									        },
									        items:[{					
									            	xtype: 'combobox',
									            	labelAlign:'right',
									            	style:'margin-top:10px',
									            	fieldLabel: '系统',
									            	name: 'ssId',
									            	store: sysStore,
									            	displayField: 'ssName',
										       	    valueField: 'ssId',
										       	    forceSelection : true,
													queryMode: 'local',
													anyMatch: true,
													allowBlank:false
										     	},{
								            	   xtype:'textfield',
								            	   fieldLabel:'汇总类型编号',
								            	   labelAlign:'right',
								            	   name: 'summaryTypeId',
								            	   maxLength:20,
								            	   regex:/^[a-zA-Z0-9_]+$/,
								            	   regexText:'请输入数字、字母、下划线！',
								            	   allowBlank:false,
								    	           style:'margin-top:10px'
								               },{
								            	   xtype:'textfield',
								            	   fieldLabel:'汇总类型名称',
								            	   labelAlign:'right',
								            	   name: 'summaryTypeName',
								            	   maxLength:15,
								            	   allowBlank:false,
								    	           style:'margin-top:10px'
								               }
							                ],
							                buttons: [{
							                    text: '保存',
							                    formBind: true, 
							                    disabled: true,
							                    handler: function() {
							                        var form = this.up('form').getForm();
							                        if (form.isValid()) {
							                        	Ext.Ajax.request({
															url: 'addSummaryType.ajax?f=BSYS.0205.addSummaryType',
															params:form.getValues(),
															success: function(response) {
																var result = Ext.decode(response.responseText);
																jesAlert(result.message);
																if(result.success){
																  typeWin.close();
																  summaryTypeStore.reload();
																}
															},
														   failure: function(response, opts) {
																jesAlert('服务连接失败，状态码' + response.status);
														   }
														});
							                        }
							                    }
							                }]
									    }
									}).show();
								}
							},{
								xtype: 'button',
								text: '删除汇总类型',
								iconCls: 'delete-icon',
								handler: function() {
									var summaryTypeComb = this.up('toolbar').previousSibling('toolbar').down('combobox[name=summaryTypeComb]');
									var summaryTypeId = summaryTypeComb.getValue(); 
									if(Ext.isEmpty(summaryTypeId)) jesAlert('请选择要删除的汇总关系类型');
									var summaryTypeRecord = summaryTypeComb.findRecordByValue(summaryTypeId);
									var ssId = summaryTypeRecord.get('ssId');
									Ext.Msg.confirm('系统提示','确定要删除该汇总类型？',
										      function(btn){
										        if(btn=='yes'){
										        	Ext.Ajax.request({
														url: 'removeSummary.ajax?f=BSYS.0205.remove',
														params:{
															summaryTypeId:summaryTypeId,
															ssId:ssId
														},
														success: function(response) {
															var text=Ext.decode(response.responseText);
															jesAlert(text);
															if("删除成功"==text){
																summaryTypeComb.setValue(null);
																summaryTypeStore.reload();
															}
														},
														failure: function(response, opts) {
															jesAlert('服务连接失败，状态码' + response.status);
														}
													});
										        }
										});
								}
							}]
						}]
					}],
		        items : [
		           {xtype: 'treepanel',
					region: 'center',
					flex :1,
					id:'summary_tree',
					store:supTreeStore,
					title : '上级机构',
					listeners : {
	                      itemclick: function( view, record, item, index, e, eOpts  ){
	                    	subInstStore.proxy.extraParams={summaryTypeId:Q('combobox[name=summaryTypeComb]').value,superiorInstId:record.get('id')};
        			        subInstStore.load();
	                      }
				    },
					columns: [{
						xtype: 'treecolumn',
		                text: '上级机构',
		                flex: 2,
		                sortable: true,
		                dataIndex: 'text'
		            },{
		                xtype: 'actioncolumn',
		                header: '删除',
		                align:'center',
		                width: 55,
						getClass:function(value,metaData,record,rowIndex,colIndex){
							return rowIndex=='0'?null:'delete-icon';
						},
		                handler: function(view, rowIndex, colIndex,item,e,record) {
		                	var summaryTypeId = Q('combobox[name=summaryTypeComb]').getValue();
		                	Ext.Ajax.request({
								url: 'removeSupNode.ajax?f=BSYS.0205.removeSubNode',
								params:{
									summaryTypeId:summaryTypeId,
									supInstId:record.get('id')
								},
								success: function(response) {
									var text=Ext.decode(response.responseText);
									jesAlert(text);
									supTreeStore.proxy.extraParams={summaryTypeId:summaryTypeId};
							        supTreeStore.load();
								},
								failure: function(response, opts) {
									jesAlert('服务连接失败，状态码' + response.status);
								}
							});
		                }
		            }]
		        },{
		            region : 'east',
		        	xtype:'gridpanel',
		        	flex : 1,
		        	title: '下级机构',
				    store: subInstStore,
				    columns: [ 
				        { text: '机构编号',  dataIndex: 'subordinateInstId',flex: 1 },
				        { text: '机构',  dataIndex: 'instName',flex: 1 },
				        { text: '上级机构',  dataIndex: 'superiorInstId',flex: 1 ,hidden:true},
				        { text: '是否参与计算', dataIndex: 'calcFlag', flex: 1 },
				        { text: '与上级关系', dataIndex: 'operatorFlag',flex: 1 },
				        {
		                xtype: 'actioncolumn',
		                header: '删除',
		                align:'center',
						iconCls: 'delete-icon',
		                width: 55,
			            handler: function(view, rowIndex, colIndex,item,e,record) {
		                	var summaryTypeId = Q('combobox[name=summaryTypeComb]').getValue();
		                	Ext.Ajax.request({
								url: 'removeSubNode.ajax?f=BSYS.0205.removeSubNode',
								params:{
									summaryTypeId:summaryTypeId,
									supInstId:record.get('superiorInstId'),
									subInstId:record.get('subordinateInstId')
								},
								success: function(response) {
									var text=Ext.decode(response.responseText);
									jesAlert(text);
									subInstStore.proxy.extraParams={summaryTypeId:summaryTypeId,superiorInstId:record.get('superiorInstId')};
        			                subInstStore.load();
								},
								failure: function(response, opts) {
									jesAlert('服务连接失败，状态码' + response.status);
								}
							});
			            }
		            }
				    ]
		        }
		        ]
			   }]											
	});
});

