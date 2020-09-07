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
	
	var summaryTreeStore = Ext.create('Ext.data.TreeStore', {
	   autoLoad : false,
	   fields:['ownId','text','calcFlag','operatorFlag'],
	   root:{
		   text:'',
		   iconCls: 'role-icon',
		   expanded:false
	   },
	   proxy : {
			type : 'ajax',
			url: 'getTreeNodes.ajax?f=BSYS.0205.getTreeNodes',
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
				title : summaryRelation_xzgx,/*行政关系*/
				collapsible:true,
				width : 300,
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
					        	          text: summaryRelation_cwgjd,/*成为根节点*/
					        	          iconCls:'add-icon',
					        	          handler:function(){
					        	        	  var relation = Q('radio[name=relation]');
					        	        	  var relationVaue = relation.getGroupValue();
					        	        	    var instTree = this.up("#inst_tree");
							        			var cInstRs = instTree.getView().getChecked();//checkedInstRecords
							        			var summaryRoot=summaryTreeStore.getRootNode();
							        			if(cInstRs.length>0){
							        				if('Y'==relationVaue){
							        					var	arrNodes = []; 
							        					 for(var instR in cInstRs){
										        				if(getAllNode(summaryRoot,cInstRs[instR])){
//										        					console.log(summaryTreeStore);
										        					var ss = new Ext.tree.TreeNode({ id: 'nodeOne', text: 'NodeOne' });
//										        					console.log(ss);
//													        			summaryRoot.appendChild({
//													        				id:cInstRs[instR].data.id,
//									        								ownId:cInstRs[instR].data.id,
//									        								text:cInstRs[instR].data.text,
//									        								iconCls: cInstRs[instR].data.iconCls,
//									        								expanded:true
//									    							      });
										        					
												        		}else{
												        			jesAlert(summaryRelation_jdbcf);/*节点不能重复！*/
												        		}
									        			    }
							        					 summaryRoot.appendChild(arrNodes);
							        				}else{
											        	  for(var instR in cInstRs){
										        				if(getAllNode(summaryRoot,cInstRs[instR])){
													        			summaryRoot.appendChild({
									        								ownId:cInstRs[instR].data.id,
									        								text:cInstRs[instR].data.text,
									        								iconCls: cInstRs[instR].data.iconCls,
									        								expanded:true
									    							      });
												        		}else{
												        			jesAlert(summaryRelation_jdbcf);/*节点不能重复！*/
												        		}
									        			    }
							        				}
							        			}else{
							        				jesAlert(summaryRelation_qxzgjd);/*请选择根节点！*/
							        			}
					        	          }
							           },
								       { xtype: 'button', 
							        	 text: summaryRelation_cwzjd,/*成为子节点*/
							        	 iconCls:'data-add-icon',
							        	 handler:function(){
								        			var instTree = this.up("#inst_tree");
								        			var summaryTree = Ext.ComponentQuery.query("#summary_tree");
								        			var summaryRoot=summaryTreeStore.getRootNode()
								        			var cInstRs = instTree.getView().getChecked();//checkedInstRecords
								        			
								        			//从下往上遍历一棵树
								        			function downToupTree(currentNode,exitNode){
								        				var parentNode = currentNode.parentNode;
								        				if(parentNode!=null&&parentNode.data.ownId==exitNode.data.id){
								        					return false;
								        				}
								        				if(parentNode!=null&&parentNode.parentNode!=null){
								        					if(downToupTree(parentNode,exitNode)==false){
								        						return false;
								        					}
								        				}
								        				return true;
								        			}
								        			var selectNode = summaryTree[0].getView().getRecord(summaryTree[0].getView().getSelectedNodes()[0]);
								        			if(selectNode&&!selectNode.isRoot()){
								        				if(cInstRs.length>0){
									        				for(var instR in cInstRs){
									        					if(selectNode.data.ownId!=cInstRs[instR].data.id&&downToupTree(selectNode,cInstRs[instR])){
									        						 if(getAllNode(summaryRoot,cInstRs[instR])){
												        				    selectNode.data.leaf=false;
												        				    selectNode.appendChild({
										        								ownId:cInstRs[instR].data.id,
										        								text:cInstRs[instR].data.text,
										        								iconCls: cInstRs[instR].data.iconCls,
														        				calcFlag:'Y',
														        				operatorFlag:'+',
										        								expanded:true
									        							    });
									        							    selectNode.expand();
									        						 }else{
									        							 jesAlert(summaryRelation_gzjdtj);/*该子节点已经添加！*/
									        						 }
									        					}else{
									        						jesAlert(summaryRelation_sjjd);/*上级节点不能是下级结点！*/
									        					}
									        				}
								        			  }else{
								        				  jesAlert(summaryRelation_qxzzjd);/*请选择子节点！*/
								        			  }
								        			}else{
								        				jesAlert(summaryRelation_qxzsjjd);/*请选择上级节点！*/
								        			}
							        	          }
							           
								       },
								       { xtype: 'button', 
								    	 text: summaryRelation_czhz,/*重置汇总*/
								    	 iconCls:'undo-icon',
								    	 handler:function(){
					                		 summaryTreeStore.getRootNode().removeAll();
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
						        			      {'cascadeCname':summaryRelation_bjl,'cascadeType':'0'},/*不级联*/
						        			      {'cascadeCname':summaryRelation_jlyj,'cascadeType':'1'},/*级联一级*/
						        			      {'cascadeCname':summaryRelation_jlqb,'cascadeType':'2'}/*级联全部*/
						        		    ]
						        	 }),
						        	 displayField:'cascadeCname',
						        	 valueField:'cascadeType',
						        	 listeners:{
						        		 change:function(me,newValue,oldValue,eOpts){
						        			me.up('cascadetree').cascadeType=newValue;
						        		 }
						        	 }
						         },{
										xtype:'tbspacer',
										width:20
						         	},{
						        	 xtype      : 'fieldcontainer',
						        	 fieldLabel : summaryRelation_sfdxzgx,/*是否带行政关系*/
						             defaultType: 'radiofield',
						             layout: 'hbox',
						             hidden:true,
						             items: [
						                 {
						                     boxLabel  : summaryRelation_s,/*是*/
						                     name      : 'relation',
						                     inputValue: 'Y',
						                     id        : 'Y'
						                 }, {
						                     boxLabel  : summaryRelation_f,/*否*/
						                     name      : 'relation',
						                     inputValue: 'N',
						                     id        : 'N',
						                     checked   : true
						                 }
						             ]
						         }]
							})      
					]
				}				
			   },{
				xtype: 'treepanel',
				region: 'center',
				id:'summary_tree',
				store:summaryTreeStore,
				title : summaryRelation_hxgx,/*汇总关系*/
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
			            	fieldLabel: summaryRelation_xt,/*系统*/
			            	queryMode:'local',
			            	anyMatch:true,
			            	allowBlank:false,
			            	itemId: 'ssId_combo',
			            	listeners: {
		            			select: function(combo, records, eOpts) {
			            			summaryTypeStore.clearFilter(true);
			            			summaryTypeStore.filter({
										property: 'ssId',
										value   : combo.value
									});	
			            			var stCombobox = this.up('form').down('combobox[name=summaryTypeName]');
			            			var sTIdTextField = this.up('form').down('textfield[name=summaryTypeId]');
			            			var summaryTypeId = null;
			            			if(summaryTypeStore.getCount()>0){
				       	    			stCombobox.select(summaryTypeStore.getAt(0));
				       	    			summaryTypeId = summaryTypeStore.getAt(0).data.summaryTypeId;
			            			}else{
				            			stCombobox.setValue(null);
			            			}
				            		sTIdTextField.setValue(summaryTypeId);
				            		var params={
										summaryTypeId:summaryTypeId
									};
									summaryTreeStore.proxy.extraParams =params;
									summaryTreeStore.load();
									summaryTreeStore.getRootNode().set('text',stCombobox.getRawValue());
		            			}
			       	    	}										
				     	}]
					
					},{
						xtype:'toolbar',
						items:[{
						    xtype : 'tbspacer',
							width : 5
					 	},{					
			            	xtype: 'combobox',
			            	labelWidth:40,
			            	id:'summaryTypeName',
			            	name: 'summaryTypeName',
			            	store: summaryTypeStore,	
			            	queryMode:'local',
			            	anyMatch:true,
			            	displayField: 'summaryTypeName',
				       	    valueField: 'summaryTypeId',
			            	fieldLabel: summaryRelation_mc,/*名称*/
			            	itemId: 'summaryTypeName',
			            	allowOnlyWhitespace:false,
			                allowBlank:false,
			            	/*regex:/^\S*$/,
			    	        regexText:'任务模板ID中不能夹带空格！',*/
			            	listeners: {
			            		select: function(combo, records, eOpts) {
			            			combo.nextSibling('textfield[name=summaryTypeId]').setValue(combo.value);
			            			var params={
										summaryTypeId:combo.value
									};
									summaryTreeStore.proxy.extraParams =params;
									summaryTreeStore.load();
									summaryTreeStore.getRootNode().set('text',combo.getRawValue());
			            		}
			            		
				       	    }										
					      },{
								xtype: 'button',
								iconCls: 'delete-icon',
								handler: function() {
									var stCombobox = this.up('toolbar').getComponent('summaryTypeName');
									var summaryIdFiled = this.up('toolbar').getComponent('summaryTypeId');
									var summaryTypeId = stCombobox.value;
									//var ssId= toolbar.down('combobox[name=ssId]').value;
									var ssId = this.up('form').down('combobox[name=ssId]').value;
									if(summaryTypeId){
										 Ext.Msg.confirm(summaryRelation_xtts/*系统提示*/,summaryRelation_qdschz,/*确定要删除该类型的汇总关系？*/
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
																stCombobox.setValue(null);
																summaryIdFiled.setValue(null);
																summaryTypeStore.reload();
																summaryTreeStore.getRootNode().removeAll();
												                summaryTreeStore.getRootNode().set('text',null);
															}
														},
														failure: function(response, opts) {
															jesAlert(summaryRelation_fwljsb + response.status);/*服务连接失败，状态码*/
														}
													});
										        }
										});
									}else{
										jesAlert(summaryRelation_qxzschz);/*请选择要删除的汇总*/
									}
									
								}
							},{
								xtype : 'tbspacer',
								width : 2
							},{
								xtype: 'textfield',
								itemId:'summaryTypeId',
								fieldLabel: summaryRelation_bh,/*编号*/
								labelWidth: 40,
								width: 160,
								name: 'summaryTypeId',
								allowOnlyWhitespace:false,
			                    allowBlank:false
							},{
								xtype : 'tbspacer',
								width : 5
							},{
								xtype: 'button',
								text: summaryRelation_xz,/*新增*/
								iconCls: 'add-icon',
								handler: function() {
									var pattern=/^\s*$/;
									var toolbar = this.up('toolbar');
									var comb1 = toolbar.down('textfield[name=summaryTypeId]');
									var comb2 = toolbar.down('combobox[name=summaryTypeName]');
									var comb3 = this.up('form').down('combobox[name=ssId]');
									this.up('form').getForm().isValid();
									if(comb3.value == null){
										return jesAlert(summaryRelation_qxtxxtmc);/*请先填写系统名称！*/
									}
									var ssId = this.up('form').down('combobox[name=ssId]').value;
									var summaryTypeName= toolbar.down('combobox[name=summaryTypeName]').rawValue;
									if(summaryTypeName==null||pattern.test(summaryTypeName)){
										return jesAlert(summaryRelation_qxtxzqhz);/*请先填写正确汇总类型名称！*/
									}
									if(summaryTypeName.length>15){
										return jesAlert(summaryRelation_hzlxmcgc);/*汇总类型名称过长*/
									}
									var summaryTypeId = toolbar.down('textfield[name=summaryTypeId]').value;
									if(summaryTypeId==null||pattern.test(summaryTypeId)){
										return jesAlert(summaryRelation_qxtxzqhzbh);/*请先填写正确汇总类型编号！*/
									}
									if(summaryTypeId.length>10){
										return jesAlert(summaryRelation_hzlbhgc);/*汇总类编号过长*/
									}
									Ext.Ajax.request({
										url: 'addSummaryType.ajax?f=BSYS.0205.addSummaryType',
										params:{
											ssId: ssId,
											summaryTypeId:summaryTypeId,
											summaryTypeName: summaryTypeName
										},
										success: function(response) {
											var result = Ext.decode(response.responseText);
											jesAlert(result.message);
											if(result.success){
											  summaryTypeStore.reload();
											  summaryTreeStore.getRootNode().removeAll();
									          summaryTreeStore.getRootNode().set('text',summaryTypeName);
											}
										},
									   failure: function(response, opts) {
											jesAlert(summaryRelation_fwljsb + response.status);/*服务连接失败，状态码*/
									   }
									});
								}
							},{
								xtype: 'button',
								text: summaryRelation_fzxzgx,/*复制行政关系*/
								iconCls: 'copy-icon',
								handler:function(){
									summaryTreeStore.getRootNode().removeAll();
									function copyTree(rootNode,sTreeRoot){
										var cNodes = rootNode.childNodes;
										for(var i=0;i<cNodes.length;i++){
											var	 pNode = sTreeRoot.appendChild({
													ownId:cNodes[i].data.id,
													text:cNodes[i].data.text,
													iconCls: cNodes[i].data.iconCls,
													calcFlag:'Y',
													operatorFlag:'+',
													expanded:true
												});
											if(cNodes[i].hasChildNodes()){
												copyTree(cNodes[i],pNode);
											}
										}
									}
									copyTree(checkInstTreeStore.getRootNode(),summaryTreeStore.getRootNode());
									summaryTreeStore.getRootNode().eachChild(function(node){
										node.set('calcFlag',null);
										node.set('operatorFlag',null);
									});
								}
						},{
								xtype: 'button',
								text: summaryRelation_bc,/*保存*/
								iconCls: 'save-icon',
								handler:function(){
									var summaryTypeName= this.up('toolbar').down('combobox[name=summaryTypeName]').rawValue;
									var summaryTypeId = this.up('toolbar').down('textfield[name=summaryTypeId]').value;
									function getNodeValue(pNode,summaryTypeInfo){
										var childnodes = pNode.childNodes;
										for(var i=0; i < childnodes.length; i++){
											var cNode = childnodes[i];
											var summaryTypeInfoJson={
													             SUMMARYTYPEID:summaryTypeId,
													             SUPERIORINSTID:cNode.parentNode.data.ownId,
													             SUBORDINATEINSTID:cNode.data.ownId,
																 CALCFLAG:cNode.data.calcFlag,
																 OPERATORFLAG:cNode.data.operatorFlag
																 };	
											summaryTypeInfo.push(summaryTypeInfoJson);
											if(!cNode.leaf){
												getNodeValue(cNode,summaryTypeInfo);//递归调用
											}
										}	
									};
									var summaryTypeInfo=[];
									var rootN = summaryTreeStore.tree.root;	
						            getNodeValue(rootN,summaryTypeInfo);
						            if(summaryTypeName){
										if(summaryTypeId){
											Ext.Ajax.request({
												url: 'addSummaryRela.ajax?f=BSYS.0205.addSummaryRela',
												params:{
													summaryTypeId:summaryTypeId,
													summaryTypeInfo:Ext.encode(summaryTypeInfo)										
												},
												success: function(response) {
													var text=Ext.decode(response.responseText);
													jesAlert(text.success);
													summaryTypeStore.reload();
												}
											});
											}else{
												jesAlert(summaryRelation_qxtxhzbh);/*请先填写汇总类型编号！*/
												}
										}else{
											jesAlert(summaryRelation_qxtxhzmc);/*请先填写汇总类型名称!*/
										}
								}
							},{
								text: summaryRelation_qc,/*清除无效数据*/
								xtype: 'button',
								iconCls: 'delete-icon',
								handler: function(){
									var invalidStore = Ext.create('Ext.data.Store', {
									   fields:['summaryTypeId','superiorInstId','subordinateInstId'],
									   proxy : {
											type : 'ajax',
											url: 'selectInvalidSummary.ajax?f=BSYS.0205',
											reader : {
												type : 'json'
											}
									   }
									});		
									Ext.create('Ext.window.Window', {
									    title: summaryRelation_wxsj,/*无效数据*/
									    height: 400,
									    width: 600,
									    constrainHeader: true,
									    modal: true,
									    layout: 'fit',
									    items: [{  // Let's put an empty grid in just to illustrate fit layout
									        xtype: 'gridpanel',
										    selType: 'checkboxmodel',
										    selModel: {
										    	mode: 'SIMPLE'
										    },
										    tbar: {
										    		xtype: 'form',
										    		items: [{
										    			xtype: 'toolbar',
										    			items: [{
										    				xtype: 'displayfield',
										    				value: summaryRelation_tsjgh/*提示：机构号只在汇总关系中存在，不在机构信息中存在，则视为无效数据。*/
										    			},'->',{
										    				xtype: 'button',
										    				text: summaryRelation_sc,/*删除*/
										    				iconCls: 'delete-icon',
										    				handler: function(btn){
										    					var win  = this.up('window');
										    					var records = btn.up('gridpanel').getSelectionModel().getSelection();
										    					if(records.length==0){
										    						jesAlert(summaryRelation_qxzsc);/*请选择要删除的记录*/
										    						return; 
										    					}
										    					var summaryRelas = [];
										    					for(var i=0;i<records.length;i++){
										    						summaryRelas.push(records[i].data);	
										    					}
										    					Ext.Ajax.request({
																    url: 'deleteInvalidSummary.ajax?f=BSYS.0205',
																/*    params: {
																    	id: '11'
																    }*/
																    jsonData : summaryRelas,
																    success: function(response){
																        var text = response.responseText;
																        jesAlert(Ext.decode(text));
																    	win.close();
																    }
																});
										    				}
										    			}]
										    		}]
										    },
									        columns: [{ header: summaryRelation_xh/*序号*/, xtype: 'rownumberer', width:40, align: 'center'},
					           						{text : summaryRelation_hzlxbm/*汇总类型编码*/,dataIndex : 'summaryTypeId',flex: 1},
					           						{text : summaryRelation_jgh/*机构号*/,dataIndex : 'subordinateInstId',flex: 1}
					           				],                 
									        store: invalidStore,
									        listeners: {
									        	viewready: function(grid){
									        		invalidStore.load( function(){
									        			grid.getSelectionModel().selectAll(true)
									        		});
									        			
									        	}
									        }
									    }]
									}).show();
								}
							}]
					}]
				}],
				 plugins: [
			           Ext.create('Ext.grid.plugin.CellEditing', {
			               clicksToEdit: 1,
			               listeners : {
		                          beforeedit: function( editor, e, eOpts ){
		                        	 if(e.record.parentNode.parentNode==null){
		                        		  return false;
		                        	 }
		                          }
			               }
			           })
				],
				columns: [{
					xtype: 'treecolumn',
	                text: summaryRelation_hxgx,/*汇总关系*/
	                flex: 2,
	                sortable: true,
	                dataIndex: 'text'
	            },{
	                text: summaryRelation_sfcyhs,/*是否参与计算*/
	                flex: 1,
	                align: 'center',
	                dataIndex: 'calcFlag',
	                sortable: true,
	                editor: {
		                xtype: 'combobox',
		                store:['Y','N','U'],
		                editable:false
		               //allowOnlyWhitespace:false,
		                //allowBlank:false,
		            }
	            },{
	                text: summaryRelation_ysjgx,/*与上级关系*/
	                flex: 1,
	                dataIndex: 'operatorFlag',
	                align: 'center',
	                sortable: true,
	                editor: {
		                xtype: 'combobox',
		                store:['+','-'],
		                 editable:false
		            }
	                
	            },{
	                xtype: 'actioncolumn',
	                header: summaryRelation_sc,/*删除*/
	                align:'center',
	                items:[{
						iconCls: 'delete-icon',
		                handler: function(grid, rowIndex, colIndex) {
		                	if(rowIndex=='0'){
		                		 summaryTreeStore.getRootNode().removeAll();
		                	}
		                	grid.getRecord(rowIndex).remove();
		                	
		                }
					}],
	                dataIndex: 'done',
	                width: 55,
	                menuDisabled: true
	            }]
	        }]											
	});
});

