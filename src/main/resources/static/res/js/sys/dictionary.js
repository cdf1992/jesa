Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.ux.jes.PagingToolbar',
    'Ext.ux.window.Notification'
]);

Ext.onReady(function(){
	
	//字典列表
	var dictionaryStore=Ext.create('Ext.data.Store',{
		fields:['oldKey','dictKey','dictValue','dictType','valueEx','keyDesc','systemKey','ssId','v1','v2','v3'],
		proxy:{
			type:'ajax',
			url:'getDictionaries.ajax?f=BSYS.0106.query',
			reader:{
				type: 'json',
				root:'dictionaries',
				totalProperty : 'count'
			}
		}
	});
	
	//字典类型列表
	var dictionaryTypeStore = Ext.create('Ext.data.Store',{
		autoLoad: true,
		fields:['dictValue','dictKey','dictType','ssId','systemKey','oldKey'],
		proxy:{
			type:'ajax',
			url:'dictionaryType.ajax?f=BSYS.0106.dictionaryType',
			reader:{
				type:'json',
				root:'dicData',
				totalProperty : 'count'
			}
		}
	});
            
	//系统号
	var ssIdStore=Ext.create('Ext.data.Store',{
		fields:['SS_ID','SS_ID_NAME','SS_NAME'],
		autoLoad:true,
		proxy:{
			type:'ajax',
			url:'getSsId.ajax?f=BSYS.0106.getSsId'
		}
	});
	
/*	var sysStore = Ext.create('Ext.data.Store', {
		autoLoad : true,
		fields : ['ssId', 'ssName'],
		proxy : {
						type : 'ajax',
						url : 'getSysData.ajax?f=BSYS.0205.getSysData',
						reader : {
							type : 'json'
						}
					}
	});	*/
	
	//类型下拉框
	var typeStore=Ext.create('Ext.data.Store',{
		fields:['DICT_KEY_VALUE','DICT_KEY','DICT_VALUE','SS_ID'],
		data:keyType
	});
	typeStore.load({
		callback:function(){
			//var comssId = Q('combobox[name=f.dict_type:eq]');
			//comssId.setValue(typeStore.getAt(0).get('DICT_KEY'));
			var params={'f.dict_type:eq':typeStore.getAt(0).data.DICT_KEY};
			dictionaryStore.proxy.extraParams=params;
			dictionaryStore.load();
		}
	});
	
	
	ssIdStore.on('load',function(){
			var comssId = Q('combobox[name=f.ss_id:eq]');
			comssId.setValue(ssIdStore.getAt(0).get("SS_ID"));
	});
	
	Ext.create('Ext.container.Viewport',{
		layout:{
			type:'hbox',
			align:'stretch'
		},
		items: [{	
			flex: 4,
			collapseDirection : 'left',
			collapsible : true,					
			xtype: 'gridpanel',
			selType: 'cellmodel',
			title: dictionary_zdlx/*'字典类型'*/,
			split: true,
			tbar: [{
				xtype:'combobox',
				fieldLabel:'SSID',
				labelWidth: 30,
				width: 120,
				name:'f.ss_id:eq',
				queryMode :'local',
				store:ssIdStore,
				anyMatch : true,
				displayField:'SS_ID_NAME',
				valueField:'SS_ID',
				matchFieldWidth : false,
				listConfig: {
					width: 180
				},
				listeners:{
					select: function(combob, records, eOpts){
						var index = typeStore.find('DICT_KEY','');
						dictionaryTypeStore.proxy.extraParams = {
							'f.ss_id:eq':records[0].data.SS_ID
						}
						dictionaryTypeStore.loadPage(1);								
					}
				}
			},{
				xtype:'textfield',
				labelWidth: 50,
				width: 100,
				fieldLabel:dictionary_lxj/*'类型键'*/,
				labelAlign:'right',
				name:'f.DICT_KEY:like'
			},{
				xtype:'textfield',
				labelWidth: 50,
				width: 100,
				fieldLabel:dictionary_lxz/*'类型值'*/,
				labelAlign:'right',
				name:'f.DICT_VALUE:like'
			},{
				xtype:'button',
				text:dictionary_cx/*'查询'*/,
				iconCls:'search-icon',
				handler:function(){
					var me = this;
					var params = {};
    		        var fs=Ext.ComponentQuery.query('textfield', me.up('toolbar')); 
    		        for(var i= 0; i<fs.length;i++){
    		        	params[fs[i].name] = fs[i].getValue();
    		        }
    		        dictionaryTypeStore.proxy.extraParams = params
					dictionaryTypeStore.load();
				}
			},{
				text:dictionary_xz/*'新增'*/,
				iconCls: "add-icon",
				handler:function(){
						var rec = {
							ssId: '',
							dictKey: '',
							dictValue: '',
							dictType: 'DICTIONARY_KEY',
							keyDesc: '',
							valueEx: '',
							systemKey:'N',
							oldKey:'_new_'
						};
				dictionaryTypeStore.insert(0,rec);
				}
			},{
			text:dictionary_bc/*'保存'*/,
			iconCls:'save-icon',
			handler:function(){
				var comb = Q('combobox[name=f.dict_type:eq]');
				var params=new Array();
				var flag = true;
				var datas = [];
				datas.push('dictionaryList');
				datas.push('dictionaryMap');
	        	Ext.each(dictionaryTypeStore.getModifiedRecords(), function(item) { 
	        		if (item.data.dictKey != '' && item.data.dictValue != '') {
		        		params.push(item.data); 
	        		} else if(item.data.dictKey == '') {
	        			Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_qtxjnr/*"请填写键内容!"*/); 
	        			flag = false;
	        		} else if (item.data.dictValue == '') {
	        			Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_qtxznr/*"请填写值内容!"*/); 
	        			flag = false;
	        		}
                });
	        	if(params.length==0){
        			Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_myxggdnr/*"没有修改过的内容!"*/); 
        			return;
	        	}
                if (flag == true) {
		        	Ext.Ajax.request({
	                    url : 'saveDictionaryData.ajax?f=BSYS.0106.save', 
	                    jsonData:params,
	                    success: function(response){ 
	                    	var t=Ext.decode(response.responseText);
	                    	if(t=='success'){
	                    		Ext.Msg.alert(dictionary_ts/*"提示"*/,dictionary_czcg/*"操作成功"*/);
	                    		dictionaryTypeStore.load();
	                    		Ext.Ajax.request({
				                    url : 'refreshCache.ajax?f=*.C0101&ssId=BSYS', 
				                    jsonData:datas,	                    			
	                    			success: function(response){ 
	                    				
	                    			}
	                    		});
	                    	} else if (t=='error'){
	                    		Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_sjbcsb/*"数据保存失败!"*/); 
	                    	} else {
	                    		Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_j/*键*/+"[" + t + "]"+dictionary_ycz/*已存在!*/); 
	                    	}
	                    }
		        	}); 
                }
			}
		},{
                text:dictionary_zj/*'补充字典项'*/,
				iconCls:'accept-icon',
				handler:function () {
					Ext.Ajax.request({
                            url:'supplyDictType.ajax?f=BSYS.0108.supplyDictType',
                            success:function (response) {
                            	if (response.responseText){
                                    jesAlert(dictionary_czcg/*'操作成功！'*/);
                                }else {
                                    jesAlert(dictionary_cw/*"错误"*/);
								}
                            },
						failure:function () {
                            jesAlert(dictionary_cw/*"错误"*/);
                        }
					}
					)
                }
			}],
			
			store: dictionaryTypeStore,
			columns: [{header: dictionary_xh/*'序号'*/, xtype: 'rownumberer', width:40, align: 'center'},
				{text:dictionary_lxj/*'类型键'*/,align:'left',dataIndex:'dictKey',flex:1,
					editor: {
                    	allowBlank: false
               		}
				},{text:dictionary_lxz/*'类型值'*/,align:'left',dataIndex:'dictValue',flex:1,
					editor: {
                    	allowBlank: false
               		}					
				},{text:dictionary_xth/*'系统号'*/,align:'left',dataIndex:'ssId',width:100,
					editor: {
						xtype: 'combobox',
						store:ssIdStore,
						displayField:'SS_ID_NAME',
						valueField:'SS_ID',
                    	allowBlank: false
               		},
               		renderer: function(val){
               			var index = ssIdStore.find('SS_ID',val)
               			if(index!=-1){
               				return ssIdStore.getAt(index).get('SS_NAME');
               			}else{
               				return val;
               			}
               		}
				}/*,{text:'是否为系统键(Y/N)',align:'left',dataIndex:'systemKey',flex:1,
               		renderer : function(v){
               			if(v=='Y'){
               				return  '<span style="color: green">是</span>';
               			}else{
               				return '<span style="color: red">否</span>';
               			}
               		}
				}*/,{text:dictionary_xx/*'详细'*/,width:40,align:'left',xtype: 'actioncolumn',iconCls: 'look-icon',
					handler:function(grid, rowIndex,colIndex,item,e,record ){
						var dictType = record.data.dictKey;
						var ssId = record.data.ssId;
						var dispalyValue = Q('displayfield[name=f.dict_type:eq]');
						var dispalySsIdValue = Q('displayfield[name=f.ss_id_hidden:eq]');
						var dispalyDictTypeValue = Q('displayfield[name=f.dict_type_hidden:eq]');
						var value = record.data.dictValue==''?record.data.dictKey:record.data.dictValue;
						dispalyDictTypeValue.setValue(record.data.dictKey);
						dispalySsIdValue.setValue(record.data.ssId);
						dispalyValue.setValue("【"+value+"】");
						dictionaryStore.proxy.extraParams = {
							'f.ss_id:eq':ssId,
							'f.dict_type:eq':dictType
						}
						dictionaryStore.loadPage(1);
					}
				},{text:dictionary_sc/*'删除'*/,width:40,align:'left',xtype: 'actioncolumn',iconCls: 'delete-icon',
				    	handler:function(grid, rowIndex){
				    		var key = dictionaryTypeStore.getAt(rowIndex).data.dictKey;
				    		var type = dictionaryTypeStore.getAt(rowIndex).data.dictType;
				    		var systemKey = dictionaryTypeStore.getAt(rowIndex).data.systemKey;
				    		if(systemKey=='Y'){
				    			Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_dbq/*"对不起，您没有权限删除!"*/);
				    		}else{
				    			Ext.MessageBox.confirm(dictionary_ts/*'提示'*/,dictionary_qdysc/*'确定要删除吗?'*/,function(obj){
									if(obj=='yes'){
							    		Ext.Ajax.request({
						        			method:'post',
						                    url : 'deleteDictionary.ajax?f=BSYS.0106.delete', 
						                    params :{
						                    	key : key,
						                    	type: type
						                    },
						                    success: function(response){ 
						                    	var t=response.responseText;
						                    	if(t){
						                    		dictionaryTypeStore.removeAt(rowIndex); 
						                    	}else {
						                    		Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_scsb/*"删除失败!"*/); 
						                    	}
						                    }
							        	});
									}
					    		});
				    		}
				    	}		    			
				}
			],
			dockedItems: [{
				xtype: 'jespaging',
				store: dictionaryTypeStore,
				dock: 'bottom',
				displayInfo: true
			}],
			plugins: [
		           Ext.create('Ext.grid.plugin.CellEditing', {
		               clicksToEdit: 1,
		               listeners : {
	                         beforeedit: function( editor, e, eOpts ){
	                        	  if((e.field=='dictKey'&&e.record.data.oldKey=='')||(e.field=='systemKey'&&e.record.data.systemKey=='Y'&&userId!='admin')){
	                        		  return false;
	                        	  }
	                          }
		               }
		           })				
			],
			listeners: {
				cellclick: function(girdView,td,cellIndex, record){
					if(cellIndex==1&&record.data.oldKey!='_new_'){
						var dictType = record.data.dictKey;
						var ssId = record.data.ssId;
						var dispalyValue = Q('displayfield[name=f.dict_type:eq]');
						var dispalySsIdValue = Q('displayfield[name=f.ss_id_hidden:eq]');
						var dispalyDictTypeValue = Q('displayfield[name=f.dict_type_hidden:eq]');
						var value = record.data.dictValue==''?record.data.dictKey:record.data.dictValue;
						dispalyDictTypeValue.setValue(record.data.dictKey);
						dispalySsIdValue.setValue(record.data.ssId);
						dispalyValue.setValue("【"+value+"】");
						dictionaryStore.proxy.extraParams = {
							'f.ss_id:eq':ssId,
							'f.dict_type:eq':dictType
						}
						dictionaryStore.loadPage(1);						
					}
				}
			}			
		},{
			flex: 5,
//			layout: 'fit',
			collapseDirection : 'right',	
			collapsible : true,				
			xtype:'gridpanel',
			title:dictionary_zdgl/*'字典管理'*/,
			tbar:[{
				xtype:'tbspacer',
				width:10
			},{
				
				xtype:'displayfield',
				labelAlign: 'right',
				name:'f.dict_type:eq'
			},{
				
				xtype:'displayfield',
				labelAlign: 'right',
				hidden: true,
				name:'f.ss_id_hidden:eq'
			},{
				
				xtype:'displayfield',
				labelAlign: 'right',
				hidden: true,
				name:'f.dict_type_hidden:eq'
			},/*{
            	xtype: 'combobox',
            	labelWidth:30,
            	name: 'f.SYSTEM_KEY:eq',
            	store: sysStore,
            	displayField: 'ssName',
	       	    valueField: 'ssId',
            	fieldLabel: '系统',
            	allowBlank:false
										
			},*/'->',{
				xtype:'textfield',
				labelWidth: 30,
				fieldLabel:dictionary_j/*'键'*/,
				width: 120,
				name:'f.dict_key:like',
				labelAlign:'right'
			},{
				xtype:'textfield',
				labelWidth: 30,
				fieldLabel:dictionary_z/*'值'*/,
				width: 120,
				labelAlign:'right',
				name:'f.dict_value:like'
			},{
				xtype:'button',
				text:dictionary_cx/*'查询'*/,
				iconCls:'search-icon',
				handler:function(){
					var me = this;
					var params={};
    		        var fs=Ext.ComponentQuery.query('textfield', me.up('toolbar')); 
	    			for(var i in fs){
    					params[fs[i].name]=fs[i].getValue();
	    			}
    				dictionaryStore.proxy.extraParams =params;
    				dictionaryStore.load();
				}
			},{
				text:dictionary_xz/*'新增'*/,
				iconCls: "add-icon",
				handler:function(){
					var comb = Q('displayfield[name=f.dict_type_hidden:eq]');
					var comssId = Q('displayfield[name=f.ss_id_hidden:eq]');
					if(comb.getValue()){
						var rec = {
							ssId: comssId.getValue(),
							dictKey: '',
							dictValue: '',
							dictType: comb.getValue(),
							keyDesc: '',
							valueEx: '',
							systemKey:'N',
							oldKey:'_new_'
						};
//						alert(comssId.value);
						dictionaryStore.insert(0,rec);
					}else{
						Ext.MessageBox.alert(dictionary_ts/*"提示"*/,dictionary_qxzyxzdlx/*"请选择要新增的类型!"*/);
					}
				}
			},{
				text:dictionary_bc/*'保存'*/,
				iconCls:'save-icon',
				handler:function(){
					var params=new Array();
					var flag = true;
		        	Ext.each(dictionaryStore.getModifiedRecords(), function(item) { 
		        		if (item.data.dictKey != '' && item.data.dictValue != '') {
			        		params.push(item.data); 
		        		} else if(item.data.dictKey == '') {
		        			Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_qtxjnr/*"请填写键内容!"*/); 
		        			flag = false;
		        		} else if (item.data.dictValue == '') {
		        			Ext.Msg.alert(dictionary_cw/*"错误"*/,dictionary_qtxznr/* "请填写值内容!"*/); 
		        			flag = false;
		        		}
	                });
		        	if(params.length==0){
	        			Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_myxggdnr/*"没有修改过的内容!"*/); 
	        			return;
		        	}
	                if (flag == true) {
			        	Ext.Ajax.request({
		                    url : 'saveDictionaryData.ajax?f=BSYS.0106.save', 
		                    jsonData:params,
		                    success: function(response){ 
		                    	var t=Ext.decode(response.responseText);
		                    	if(t=='success'){
		                    		jesAlert(dictionary_czcg/*'操作成功！'*/);
		                    		dictionaryStore.load(); 
		                    	} else if (t=='error'){
		                    		Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_sjbcsb/*"数据保存失败!"*/); 
		                    	} else {
		                    		Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_j/*键*/+"[" + t + "]"+dictionary_ycz/*已存在!*/); 
		                    	}
		                    }
			        	}); 
	                }
				}
			}],
			store:dictionaryStore,
			columns:[{ header: dictionary_xh/*'序号'*/, xtype: 'rownumberer', width:40, align: 'center'},
			{
				text:dictionary_j/*'键'*/,
				flex: 1,
				dataIndex:'dictKey',
				editor: {
                    allowBlank: true
                }
			},{
				text:dictionary_z/*'值'*/,
				flex: 1,
				dataIndex:'dictValue',
				editor: {
                    allowBlank: false
                }
			},{
				text:dictionary_ms/*'描述'*/,
				width: 60,
				dataIndex:'keyDesc',
				editor: {
                    allowBlank: true
                }
			},{
				text:dictionary_kz/*'扩展'*/,
				width: 60,
				dataIndex:'valueEx',
				editor: {
                    allowBlank: true
                }
			},{
				text:dictionary_sfwxtj/*'是否为系统键(Y/N)'*/,
				align: 'center',
				dataIndex:'systemKey',
				width:60,
				renderer : function(val) {
                    if (val=="Y") {
                        return '<span style="color:green;">'+dictionary_shi/*是*/+'</span>';
                    } else {
                        return '<span style="color:red;">'+dictionary_fou/*否*/+'</span>';
                    }
				}
			},{
				text:'V1',
				width: 50,
				dataIndex:'v1'
				, editor: {
					allowBlank: true
				}
			},{
				text:'V2',
				width: 50,
				dataIndex:'v2'
				, editor: {
					allowBlank: true
				}
			},{
				text:'V3',
				width: 50,
				dataIndex:'v3'
				, editor: {
					allowBlank: true
				}
			},{
				text:dictionary_sc/*'删除'*/,
				width:60,
				align:'center',
				xtype: 'actioncolumn',
		    	//iconCls: 'delete-icon',
		    	getClass: function(v,metadata ,r){
		    		if(r.get('dictType')==''){
		    			return 'lock-icon';
		    		}else{
		    			return 'delete-icon';
		    		}
		    	},
		    	handler:function(grid, rowIndex){
		    		var key = dictionaryStore.getAt(rowIndex).data.dictKey;
		    		var type = dictionaryStore.getAt(rowIndex).data.dictType;
		    		var systemKey = dictionaryStore.getAt(rowIndex).data.systemKey;
		    		if(type==''){
		    			return ;
		    		}
		    		if(systemKey=='Y'&&userId!='admin'){
		    			Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_dbq/*"对不起，您没有权限删除!"*/);
		    		}else{
		    			Ext.MessageBox.confirm(dictionary_ts/*'提示'*/,dictionary_qdysc/*'确定要删除吗?'*/,function(obj){
							if(obj=='yes'){
					    		Ext.Ajax.request({
				        			method:'post',
				                    url : 'deleteDictionary.ajax?f=BSYS.0106.delete', 
				                    params :{
				                    	key : key,
				                    	type: type
				                    },
				                    success: function(response){ 
				                    	var t=response.responseText;
				                    	if(t){
				                    		dictionaryStore.removeAt(rowIndex); 
				                    	}else {
				                    		Ext.Msg.alert(dictionary_cw/*"错误"*/, dictionary_scsb/*"删除失败!"*/); 
				                    	}
				                    }
					        	});
							}
			    		});
		    		}
		    	}
			}],
			dockedItems: [{
			        xtype: 'jespaging',
			        store: dictionaryStore,   
			        dock: 'bottom',
			        displayInfo: true
			}],			
			plugins: [
	           Ext.create('Ext.grid.plugin.CellEditing', {
	               clicksToEdit: 1,
	               listeners : {
                          beforeedit: function( editor, e, eOpts ){
                        	  if((e.field=='dictKey'&&e.record.data.oldKey=='')||(e.field=='systemKey'&&e.record.data.systemKey=='Y'&&
                        	  		userId!='admin')||(e.record.data.dictType=='')){
                        		  return false;
                        	  }
                          }
	               }
	           })
			]
		}]
	})
});