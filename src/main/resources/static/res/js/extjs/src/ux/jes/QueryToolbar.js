
Ext.define('Ext.ux.jes.QueryToolbar', {
	extend:'Ext.toolbar.Toolbar',
    alias: 'widget.querytoolbar',
    initComponent:function(){
    	var me=this;
    	var queryArray=[{
				xtype: 'combobox',
				fieldLabel:'查询字段',
				labelAlign:'right',
				name : 'colId',
				store: Ext.create('Ext.data.Store', {
			        fields: ['columnName', 'columnId', 'itemTypeArguments','itemType','defaultCompare'],
					data :me.queryFieldStoreData
			    }),
			    queryMode: 'local',
			    displayField: 'columnName',
			    valueField: 'columnId',
			    listeners : {
			    	change : function(t, newValue, oldValue, eOpts){
			    		var g = t.up('gridpanel');
			    		var bo = g.down('combobox[name=queryCombo]');
			    		var te = g.down('textfield[name=queryText]');
			    		var date = g.down('textfield[name=queryDate]');
			    		var te2 = g.down('textfield[name=queryText2]');
			    		var date2 = g.down('textfield[name=queryDate2]');
			    		var tri = g.down('triggerfield[name=triggerfield]');
			    		bo.setValue('');
			    		te.setValue('');
			    		date.setValue('');
			    		te2.setValue('');
			    		date2.setValue('');
			    		tri.setValue('');
			    		if(Ext.isEmpty(newValue)){
			    			bo.hide();
			    			te.hide();
			    			date.hide();
			    			te2.hide();
			    			date2.hide();
			    			tri.hide();
			    		} else {
			    			if(t.getStore().findRecord('columnId', newValue)){
				    			var type = t.getStore().findRecord('columnId', newValue)['data']['itemType'];
				    			var param = t.getStore().findRecord('columnId', newValue)['data']['itemTypeArguments'];
				    			var defaultCompare = t.getStore().findRecord('columnId', newValue)['data']['defaultCompare'];
					    		if(type=='combo'){
					    			bo.show();
					    			te.hide();
					    			date.hide();
					    			te2.hide();
					    			date2.hide();
					    			bo.getStore().proxy.extraParams.type = param;
					    			bo.getStore().load();
					    		} else if(type=='datefield'){
					    			bo.hide();
					    			te.hide();
					    			te2.hide();
					    			if(!Ext.isEmpty(param)){
					    				date.format = param;
					    			}
					    			date.show();
					    			if('='==defaultCompare||Ext.isEmpty(defaultCompare)){
					    				date2.hide();
									}else if('=><='==defaultCompare||'><'==defaultCompare){
										if(!Ext.isEmpty(param)){
						    				date2.format = param;
						    			}
					    				date2.show();
									}else if('like'==defaultCompare){
										date2.hide();
									}
					    		}else if(type=='triggerfield'){
					    			bo.hide();
					    			te.hide();
					    			date.hide();
					    			te2.hide();
					    			date2.hide();
					    			tri.show();
					    			tri.gridParam=param;
					    		} else {
					    			bo.hide();
					    			date.hide();
					    			date2.hide();
					    			te.show();
					    			if('='==defaultCompare||Ext.isEmpty(defaultCompare)){
					    				te2.hide();
									}else if('=><='==defaultCompare||'><'==defaultCompare){
										te2.show();
									}else if('like'==defaultCompare){
										te2.hide();
									}
					    		}
			    			}
			    		}
			    	}
			    }
			},{
				xtype : 'textfield',
				name : 'queryText'
			},{
				xtype : 'textfield',
				name : 'queryText2',
				hidden:true
			},{
				xtype : 'datefield',
				name : 'queryDate',
				format :'Y-m-d',
				hidden : true
			},{
				xtype : 'datefield',
				name : 'queryDate2',
				format :'Y-m-d',
				hidden : true
			}, {
				xtype : 'combobox',
				queryMode: 'local',
			    displayField: 'value',
			    valueField: 'key',
			    store : Ext.create('Ext.data.Store', {
					fields: ['key', 'value'],
			        proxy: {
			            type: 'ajax',
			            url: 'getDisDict.ajax?f=BSYS.0106.getDisDict',
			            reader: {
			                type: 'json'
			            },
			            extraParams: {
			            	type : ''
			            }
			        }
				}),
			    name : 'queryCombo',
			    hidden : true
			},{
  			  xtype:'triggerfield',
			  editable : false,
			  name:'triggerfield',
			  hidden:true,
			  onTriggerClick : function() {
				  var tigger=this;
				  var gridparam = Ext.decode(tigger.gridParam);
				  var gridColumns=[],gridStoreFields=[],queryFieldStoreData=[];
				  var gridArr=gridparam.grid;
				  for(var g in gridArr){
					  gridColumns.push({ text: gridArr[g].name,  dataIndex:gridArr[g].id, flex: gridArr[g].flex });
					  gridStoreFields.push(gridArr[g].id)
					  queryFieldStoreData.push({"columnName":gridArr[g].name,"columnId":gridArr[g].id,"itemType":"textfield","itemTypeArguments":"","defaultCompare":"like"});
				  }
				  
				  Ext.create('Ext.ux.jes.FlyGridWindow', {
            		    title: '待选项',
            		    height: 300,
            		    width: 650,
            		    modal:true,
            		    layout: 'fit',
      		    	    gridColumns:gridColumns,
                        gridStoreFields:gridStoreFields,
                        queryFieldStoreData:queryFieldStoreData,
                        gridVal:null,
                        gridName:gridparam.grid[0].id,
                        ssId:gridparam.ssId,
                        sqlId:gridparam.sqlId,
                        selModel:{mode :'SINGLE'},
                        listeners:{
                          	close:function(window){
                          		 var gridpanel=window.down('datagridpanel');
                          		 var selections = gridpanel.getSelectionModel().getSelection();
                          		 if(selections.length==0){
                          			tigger.setValue('');
                              		tigger.previousSibling('textfield[name=queryText]').setValue('');
                          		 }else{
                          			tigger.setValue(selections[0].get(gridparam.grid[1].id));
                              		tigger.previousSibling('textfield[name=queryText]').setValue(selections[0].get(gridparam.grid[0].id));
                          		 }
                          	}
                      }
            		}).show();
			  }
			  
        }, {
				text : '查询',
				iconCls : "search-icon",
				handler : function(t){
					var g = t.up('gridpanel');
					var params = g.getStore().proxy.extraParams;
					for(var i in params){
						if(i.substring(0,2)=='f.' && !Ext.isEmpty(params[i])){
							params[i]=null;
						}
	    			}
					var coIdComb = g.down('combobox[name=colId]');
		    		var colId = coIdComb.value;
		    		if(!Ext.isEmpty(colId)){
		    			var defaultCompare = coIdComb.findRecord('columnId', colId)['data']['defaultCompare'];
		    			var queryCombo = g.down('textfield[name=queryCombo]');
		    			var queryDate = g.down('textfield[name=queryDate]');
		    			var queryDate2 = g.down('textfield[name=queryDate2]');
		    			var queryText = g.down('textfield[name=queryText]');
		    			var queryText2 = g.down('textfield[name=queryText2]');
		    			var triggerfield = g.down('textfield[name=triggerfield]');
		    			if(!queryCombo.isHidden()){
			    			var queryCombo=g.down('combobox[name=queryCombo]');
			    			params["f." + colId + ":eq"]=queryCombo.value;
			    		} else if(!queryDate.isHidden()||!queryText.isHidden()||!triggerfield.isHidden()){
			    			if('='==defaultCompare||Ext.isEmpty(defaultCompare)){
			    				params["f." + colId + ":eq"]=queryDate.isHidden()?queryText.value:queryDate.rawValue;
							}else if('=><='==defaultCompare){
								params["f." + colId + ":ge"]=queryDate.isHidden()?queryText.value:queryDate.rawValue;
								params["f." + colId + ":le"]=queryDate.isHidden()?queryText2.value:queryDate2.rawValue;
							}else if('><'==defaultCompare){
								params["f." + colId + ":gt"]=queryDate.isHidden()?queryText.value:queryDate.rawValue;
								params["f." + colId + ":lt"]=queryDate.isHidden()?queryText2.value:queryDate2.rawValue;
							}else if('like'==defaultCompare||'LIKE'==defaultCompare){
								params["f." + colId + ":like"]=queryDate.isHidden()?queryText.value:queryDate.rawValue;
							} 
			    		}
		    		}
		    		g.getStore().loadPage(g.getStore().currentPage);
				}
			},{
    			iconCls : 'search-icon',
				text : '多字段查询',
				handler:function(btn){ 
					var detailStore=btn.up('gridpanel').getStore();
					var queryText =btn.previousSibling('combobox[name=colId]');
					var queryStore = queryText.getStore();
					var filds=[];
					function getField(e,text,compare){
						var filed = { xtype : e.get('itemType')=='datefield'?'datefield':'textfield',
									  fieldLabel :text,
									  labelWidth : 80,
									  name: 'f.'+e.get('columnId')+':'+compare}
						if(e.get('itemType')=='datefield'){
							var type = Ext.isEmpty(e.get('itemTypeArguments'))?'Y-m-d':e.get('itemTypeArguments');
							filed.format=type;
						}
						return filed;
					}
					queryStore.each(function(e){
						var defaultCompare = e.get('defaultCompare');
						if(e.get('itemType')=='combo'){
							filds.push(
									{ xtype : 'combobox',
									  fieldLabel : e.get('columnName'),
									  labelWidth : 80,
									  name: 'f.'+e.get('columnId')+':eq',
									  queryMode: 'local',
									  displayField: 'value',
									  valueField: 'key',
									  store:Ext.create('Ext.data.Store', {
											autoLoad : true,
											fields: ['key', 'value'],
									        proxy: {
									            type: 'ajax',
									            url: 'getDisDict.ajax?f=BSYS.0106.getDisDict',
									            reader: {
									                type: 'json'
									            },
									            extraParams: {
									            	type : e.get('itemTypeArguments')
									            }
									        }
										})
									})
						}else if(e.get('itemType')=='triggerfield'){
							filds.push({
					  			  xtype:'triggerfield',
								  editable : false,
								  fieldLabel : e.get('columnName'),
								  labelWidth : 80,
								  name: 'f.'+e.get('columnId')+':eq',
								  onTriggerClick : function() {
									  var tigger=this;
									  var gridparam = Ext.decode(e.get('itemTypeArguments'));
									  var gridColumns=[],gridStoreFields=[],queryFieldStoreData=[];
									  var gridArr=gridparam.grid;
									  for(var g in gridArr){
										  gridColumns.push({ text: gridArr[g].name,  dataIndex:gridArr[g].id, flex: gridArr[g].flex });
										  gridStoreFields.push(gridArr[g].id)
										  queryFieldStoreData.push({"columnName":gridArr[g].name,"columnId":gridArr[g].id,"itemType":"textfield","itemTypeArguments":"","defaultCompare":"like"});
									  }
									  
									  Ext.create('Ext.ux.jes.FlyGridWindow', {
					            		    title: '待选项',
					            		    height: 300,
					            		    width: 650,
					            		    modal:true,
					            		    layout: 'fit',
					      		    	    gridColumns:gridColumns,
					                        gridStoreFields:gridStoreFields,
					                        queryFieldStoreData:queryFieldStoreData,
					                        gridVal:null,
					                        gridName:gridparam.grid[0].id,
					                        ssId:gridparam.ssId,
					                        sqlId:gridparam.sqlId,
					                        selModel:{mode :'SINGLE'},
					                        listeners:{
					                          	close:function(window){
					                          		 var gridpanel=window.down('datagridpanel');
					                          		 var selections = gridpanel.getSelectionModel().getSelection();
					                          		 if(selections.length==0){
					                          			tigger.setValue('');
					                              		tigger.hiddenValue='';
					                          		 }else{
					                          			tigger.setValue(selections[0].get(gridparam.grid[1].id));
					                          			tigger.hiddenValue=selections[0].get(gridparam.grid[0].id);
					                          		 }
					                          	}
					                      }
					            		}).show();
								  }
								  
					        })
						}else {
							if('='==defaultCompare||Ext.isEmpty(defaultCompare)){
								filds.push(getField(e,e.get('columnName'),"eq"));
							}else if('=><='==defaultCompare){
								filds.push(getField(e,e.get('columnName')+"=>","ge"));
								filds.push(getField(e,e.get('columnName')+"<=","le"));
							}else if('><'==defaultCompare){
								filds.push(getField(e,e.get('columnName')+">","gt"));
								filds.push(getField(e,e.get('columnName')+"<","lt"));
							}else if('like'==defaultCompare){
								filds.push(getField(e,e.get('columnName'),"like"));
							}
			    		}
					});
					Ext.create('Ext.window.Window', {
					    title: '多字段查询',
					    height: 200,
					    width: 500,
					    modal:true,
					    layout: 'fit',
					    items: {
					    	xtype : 'form',
					        frame : true,
		    			    layout : 'column',
		    			    autoScroll:true,
		    			    name:'detailPanel',
		    		        defaults: {
		    		        	padding: '5',
		    					labelAlign: 'right',
		    					labelWidth: 200,
		    					columnWidth:.45
		    		        },
		    			    items: filds,
		    			    buttons: [{
		    			        text: '查询',
		    			        handler: function(btn) {
		    			        	var f = Ext.ComponentQuery.query('field',btn.up('form'));
		    			        	for(var i in f){
		    			        		if(f[i].xtype=='datefield'){
		    			        			detailStore.getProxy().extraParams[f[i].name]=f[i].rawValue;
		    			        		}else if(f[i].xtype=='triggerfield'){
		    			        			detailStore.getProxy().extraParams[f[i].name]=f[i].hiddenValue;
		    			        		}else{
		    			        			detailStore.getProxy().extraParams[f[i].name]=f[i].value;
		    			        		}
					    			}
		    			        	detailStore.loadPage(detailStore.currentPage);
		    			        	btn.up('window').close();
		    			        }
		    			    }]
					    }
					}).show();
				}
			}]
    	 if(Ext.isDefined(me.items)&&Ext.isArray(me.items)){
    		 Ext.Array.insert(me.items,0,queryArray);
    	 }else{
    		 me.items=queryArray;
    	 }
         this.callParent();
    }
});
