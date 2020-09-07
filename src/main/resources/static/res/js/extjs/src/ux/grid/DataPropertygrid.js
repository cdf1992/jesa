Ext.require('Ext.ux.jes.form.SearchField');
Ext.define('Ext.ux.grid.DataPropertygrid', {
		    extend: 'Ext.grid.property.Grid',
		    alias:  'widget.datapropertygrid',
		    
		    tableName:'',
		    groupVal:'',
		    hasQuery:true,
		    hasAdd:false,
		    hasUpdate:false,
		    hasDelete:false,
		    onlyName:true,
		    otherBtn:[],
		    propertyType:{"string":"字符","number":"数字","date":"日期"},

		    
		    reloadData:function(queryPropertyName){
		    	var me=this;
		    	Ext.Ajax.request({
						url :'queryPropertys.ajax?f=*.0606&groupVal='+me.groupVal,
						params:{
							tableName:me.tableName,
							propertyName:queryPropertyName
						},
						success : function(response) {
							var props = Ext.decode(response.responseText);
							var source={};
							var sourceConfig={};
							for(var p in props){
								source[props[p].ITEM_ID]=props[p].ITEM_VALUE;
								var displayName=me.onlyName?props[p].ITEM_NAME:('['+props[p].ITEM_ID+']'+props[p].ITEM_NAME+'['+me.propertyType[props[p].ITEM_TYPE]+']');
								if('date'==props[p].ITEM_TYPE){
									var format = props[p].ITEM_TYPE_ARGUMENTS||'Y-m-d';
									var date=new Ext.form.field.Date({
										'format': format
						            });
									sourceConfig[props[p].ITEM_ID]={'editor':date,'format': format,'displayName':displayName,'renderer':function(value,obj,record){
										var format = obj.column.getEditor(record,record).field.format;
										return Ext.isDate(value)?Ext.Date.format(value,format):value;
									}};
								}else if('combo'==props[p].ITEM_TYPE){
									var store = Ext.decode(props[p].ITEM_TYPE_ARGUMENTS);
									var combo=new Ext.form.field.ComboBox({
						                editable: false,
						                store:store
						            });
									sourceConfig[props[p].ITEM_ID]={'editor':combo,'displayName':displayName,'renderer':function(value,obj,record){
										var store = obj.column.getEditor(record,record).field.getStore();
										store.each(function(r){
											if(value==r.get('field1')){
												value=r.get('field2');
											}
										});
										return value;
									}};
								}else{
									sourceConfig[props[p].ITEM_ID]={'type':props[p].ITEM_TYPE,'displayName':displayName};
								}
							}
							me.setSource(source,sourceConfig);
						},
						failure: function(response, opts) {
							jesAlert('服务连接失败，状态码' + response.status);
						}
					})
		    },
		    
		    updateData:function(queryPropertyId,queryPropertyValue){
		    	var me=this;
		    	Ext.Ajax.request({
						url :'updateProperty.ajax?f=*.0606&ssId='+me.ssId,
						params:{
							tableName:me.tableName,
							propertyId:queryPropertyId,
							propertyGroup:me.groupVal,
							propertyValue:queryPropertyValue
						},
						success : function(response) {
							var result = Ext.decode(response.responseText);
							result.success?jesAlert("参数修改成功"):jesAlert(result.message);
						},
						failure: function(response, opts) {
							jesAlert('服务连接失败，状态码' + response.status);
						}
					})
		    },
		    
		    initComponent:function(){
			   	 var me=this;
			   	 me.reloadData();
			   	 var tbarPool=[{
			            xtype: 'searchfield',
			            name: 'queryPropertyName',
			            onTriggerClick:function(){
			            	me.reloadData(this.getValue());
			            }
				   	 },{
				            xtype: 'button',
				            text:'添加',
				            iconCls : "add-icon",
				            name: 'name',
				            handler:function(btn){
				            	Ext.create('Ext.window.Window', {
				            	    title: '添加属性',
				            	    modal:true,
				            	    width:400,
				            	    layout:'fit',
				            	    items:{
				            	    	xtype : 'form',
				            	    	layout: 'anchor',
				            	    	bodyPadding: 5,
		    	        				defaults: {
		    	        					  anchor: '100%',
		    	        					  labelWidth:60
		    	        				},
					            	    items: [{
					            	    	xtype:'hidden',
					            	    	name:'groupVal',
					            	    	value:me.groupVal
					            	    },{
					            	    		xtype:'combo',
					            	    	    fieldLabel: '参数类型',
					            	    	    name:'propertyType',
					            	    	    editable : false,
					  		    			    store:Ext.create('Ext.data.Store', {
					  		    				    fields: ['id', 'name'],
					  		    				    data : [
					  		    				        {"id":"string", "name":"字符"},
					  		    				        {"id":"number", "name":"数字"},
					  		    				        {"id":"date", "name":"日期"},
					  		    				    ]
					  		    				}),
					  		    			   displayField: 'name',
					  		    			   valueField: 'id',
					            	    	   allowBlank: false
					            	    	},{
					            	    		xtype:'textfield',
					            	    	    fieldLabel: '参数编码',
					            	    	    name:'propertyId',
					            	    	    allowBlank: false
					            	    	},{
					            	    		xtype:'textfield',
					            	    	    fieldLabel: '参数名称',
					            	    	    name:'propertyName',
					            	    	    allowBlank: false
					            	    	}],
					            	    buttons: [ {
		    	        					  text: '保存',
		    	        					  formBind: true,
		    	        					  disabled: true,
		    	        					  handler: function() {
		    	        						  var formPanel = this.up('form');
		    	        						  var groupValField = formPanel.down('hidden[name=groupVal]');
		    	        						  if(Ext.isDefined(me.getChangeGroupVal)){
		    	        							  groupValField.setValue(me.getChangeGroupVal());
		    	        							  me.groupVal=me.getChangeGroupVal();
		    	        						  }
		    	        						  if(Ext.isEmpty(groupValField.getValue())){
		    	        							  jesAlert("没有参数的分组值，不能保存");
		    	        							  return;
		    	        						  }
		    	        						  var form = formPanel.getForm();
		    	        						  if (form.isValid()) {
		    	        							  form.submit({
		    	        								    url:'addProperty.ajax?f=*.0606&ssId='+me.ssId+"&tableName="+me.tableName,
			    	        								success: function(form, action) {
			    	      		                            	jesAlert('添加参数成功');
			    	      		                            //	formPanel.up('window').close();
			    	        									me.reloadData();
			    	      		                            },
			    	      		                            failure: function(form, action) {
			    	      		                            	jesAlert(action.result.message);
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
				            text:'删除',
				            iconCls : "delete-icon",
				            handler:function(btn){
				            	var selections = me.getSelectionModel().getSelection();
				            	if(selections.length==0){
				            		return jesAlert('请选择参数!');
				            	}
				            	Ext.MessageBox.confirm('提示','您确定要删除该参数吗?',function(obj) {
									if(obj=='yes'){
										Ext.Ajax.request({
											url :'deleteProperty.ajax?f=*.0606&ssId='+me.ssId,
											params:{
												tableName:me.tableName,
												propertyId:selections[0].get('name'),
												propertyGroup:me.groupVal
											},
											success : function(response) {
												var result = Ext.decode(response.responseText);
												result.success?jesAlert("参数删除成功"):jesAlert(result.message);
												me.reloadData();
											},
											failure: function(response, opts) {
												jesAlert('服务连接失败，状态码' + response.status);
											}
										})
									}
				            	});
				            	
				            }
					   }];
			   	me.tbar = me.tbar || [];
			   	if(me.hasQuery){
			   		me.tbar.push(tbarPool[0]);
			   	}
			   	if(me.hasAdd){
			   		me.tbar.push(tbarPool[1]);
			   	}
			   	if(me.hasDelete){
			   		me.tbar.push(tbarPool[2]);
			   	}
			   	if(me.hasUpdate){
			   		me.addListener("propertychange",function(source, recordId, value, oldValue){
				   		if(Ext.isDate(value)){
				   			var format =me.sourceConfig[recordId].format;
				   			me.updateData(recordId,Ext.Date.format(value,format));
				   		}else{
				   			me.updateData(recordId,value);
				   		}
				   	});
			   	}else{
			   		me.addListener("cellclick",function(source, recordId, value, oldValue){
				   		return false;
				   	});
			   	}
			   	var otherBtns=me.otherBtn;
			   	for(var b in otherBtns){
			   		me.tbar.push(otherBtns[b])
			   	}
			   	if(me.tbar.length==0){
			   		me.tbar=null;
			   	}
			   	this.callParent();
			   	
		    }
});
