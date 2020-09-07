<script>
Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.form.*',
    'Ext.tip.QuickTip',
    'Ext.window.Window',
    'Ext.ux.window.Notification',
    'Ext.ux.jes.PagingToolbar',
    'Ext.ux.TreePicker'
]);
/**
 * 引入jpt共通js
 */
Ext.require([
	'Ext.ux.jpt.monthDateControlExtend',
	'Ext.ux.jpt.jptHandleWrap',
	'Ext.ux.jpt.jptSampleDetail'
]);
var jpttaxpayertype=$!{JPT_TAXPAYER_TYPE_LIST.encodeJson};
var jptScandynList=$!{JCL_COUNTED_YN_LIST.encodeJson};
var jptScanedyn=$!{JPT_SCANEDYN};
var jptScanedynInfo=$!{JPT_SCANEDYN_INFO};
var autoFlag='${autoFlag}';
var store;
Ext.onReady(function(){
	Ext.tip.QuickTipManager.init();
	 /* 验证提示样式
	 */
    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';  
    
	 store = Ext.create("Ext.data.Store", {    
	    fields: ['jviId','jviCname','jviEname','jviTax','jviAccount','jviCbank','jviEbank','jviPhone','jviEmail','jviAddress','jviLinkman',
	    	'jviAddressee','jviAddresseephone','jviAddresseeaddress','jviAddresseeaddressdetail','jviAddresseezipcode','jviTaxpayertype','jviInstid',
	    	'jviSatblacklistyn','jviSellerblacklistyn','instName','jviSupplierNumber']
    	,autoLoad:true
    	,proxy : {
 			type : 'ajax',
 			url : 'Distributor.ajax',
 			reader : {
 				type : 'json',
 				root : 'inputBillList',
 				totalProperty : 'count'
 			}
 		}
   });
	
	var treeStore = Ext.create('Ext.data.TreeStore', {
		proxy : {
			type : 'ajax',
			url : 'getLowerInstsTree.ajax?f=BSYS.0201.getInstsTree',
			reader : {
				type : 'json'
			}
		},
		root: {
            expanded: true
        },
        autoLoad : true,
        listeners:{
        	load:function (me, node, records, successful, eOpts ){
		        	var root = me.getRootNode();
		        	if(root.hasChildNodes()){
			        	var ssNode = root.getChildAt(0);
			        	ssNode.expand();
		        	}
        	}
        }
	});	
	var yns=Ext.create('Ext.data.Store', {
        fields: ['key', 'value'],
        data: jptScandynList
    })
	var myView=Ext.create('Ext.container.Viewport', {
		layout : 'fit',
		items : [{
			xtype : 'gridpanel',
			title : '供应商信息录入',
			layout : 'fit',
			tbar : {
				xtype : 'container',
				items : [{
					xtype:'form',
					items:[{
						xtype:'toolbar',
	        	 		layout:'column',
	        	 		border:0,
						items : [
							/*{
									 fieldLabel: '机构',
									 xtype: 'treepicker',
							         store: treeStore,
									 displayField: 'text',
									 valueField: 'id',
									 labelAlign:'right',
									 name:'f.JVI_INSTID:eq',
									 value:''
								
								
							},*/
							{
								 fieldLabel: '购方机构',
								 xtype: 'treepicker',
						         store: treeStore,
								 displayField: 'text',
								 valueField: 'id',
								 labelAlign:'right',
								 name:'f.JVI_INSTID:eq',
								 value:''
							
							},
							{
								fieldLabel:'供应商名称',
								xtype : 'textfield',
								labelAlign:'right',
								name:'f.JVI_CNAME:like'
							},{
								fieldLabel:'供应商编号',
								xtype : 'textfield',
								labelAlign:'right',
								name:'f.JVI_SUPPLIER_NUMBER:eq'
							}/*,{
								xtype:'textfield',
								fieldLabel:'账号',
								labelAlign:'right'	,
								name:'f.JVI_ACCOUNT:eq'
							}*/,{
								xtype:'textfield',
								fieldLabel:'纳税人识别号',
								labelAlign:'right',
								name:'f.JVI_TAXNO:eq'
							},{
								    xtype:'combobox'
									,fieldLabel:'是否黑名单'
									,name:'jviSellerblacklistyn'
									,name:'f.JVI_SELLER_BLACKLISTYN:eq'
									,labelAlign:'right'
									,valueField: 'key'
									,store:yns
									,displayField : 'value'
									,emptyText : '请选择'
						           	,editable : false 
						            ,selectOnFocus : true 
						            
								},/*,{
						         xtype: 'combobox',
								    fieldLabel: '供应商类别',
								    name:'f.JVI_TAXPAYER_TYPE:eq',
								    labelAlign: 'right',
								    queryMode: 'local',
								    displayField: 'value',
								    valueField: 'key',
								    store: Ext.create('Ext.data.Store', {
						                fields: ['key', 'value'],
						                data: jpttaxpayertype
						            }),
						            emptyText : '请选择',  
						            editable : false,  
						            selectOnFocus : true
							
							}*//*,{
								 fieldLabel: '机构',
								xtype: 'treepicker',
				        		store: treeStore,
							    displayField: 'text',
							    valueField: 'id',
							    name: 'f.JVI_INSTID:eq',
							    labelAlign:'right',
								value:''
							},*/{
								text : '查询',
								iconCls : "search-icon",
								handler:function(me){
										var params={};
					    		        var fs=Ext.ComponentQuery.query('textfield', me.up('toolbar'));  
						    			for(var i in fs){
						    				if (fs.hasOwnProperty(i)){
						    				params[fs[i].name]=fs[i].getSubmitData();
						    				}
						    			}
						    			store.proxy.extraParams = params;
										store.loadPage(1);
								}
							},{
							xtype: 'button',
							text : '重置',
							iconCls : "rules-icon",
							instWin:null,
							handler:function(me){
								me.up('form').getForm().reset();
							}
						}]
	         },{
	        	 	xtype:'toolbar',	
					layout:'column',
					bodyStyle: 'backgroundColor:#d8d8d8;backgroundImage: -webkit-linear-gradient(top,#e6e6e6,#efefef);',
					border:0,
					items: [{
						xtype: 'button',
						text : '新增',
						iconCls : "add-icon",
						handler : function() {
							var manualWin=Ext.create('Ext.window.Window', {
								width : 400,
								layout : 'fit',
								modal:true,//设置是否添加遮罩
								constrainHeader : true,
								style:{'padding-right':'10px;','padding-left':'10px;'},
								items : {
									layout : 'form',
									xtype : 'form',
									frame : true,
									defaultType : 'textfield',
									
									items : [
										{
											xtype:'textfield',
											fieldLabel:'供应商名称',
											labelWidth:158,	
											afterLabelTextTpl : required,
											enforceMaxLength:true,
											allowBlank:false,
											regex:/^[\u4E00-\u9FA5\(\)\（＼）]+$/,
											regexText: '请输入中文',
											width:200,
											name:'jviCname',
											labelAlign:'right'
										},
										{
											
											xtype:'textfield',
											fieldLabel:'供应商编号',
											name:'jviSupplierNumber',
											labelWidth:150,	
											width:200,
											labelAlign:'right'	
										},{
											
								            xtype:'textfield',
											fieldLabel:'纳税人识别号',
											afterLabelTextTpl : required,
											enforceMaxLength:true,
											allowBlank:false,
											regex:/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-z]{15,20}$/,
											regexText: '请输入15-20位数字和字母组成的纳税识别号',
											maxLength:20,
											minLength:15,
											labelWidth:158,	
											name:'jviTax',
											width:200,
											labelAlign:'right'
										},{
											xtype:'textfield',
											fieldLabel:'供应商地址',
											name:'jviAddress',
											labelWidth:150,	
											width:200,
											labelAlign:'right'						    
										},{
											xtype:'textfield',
											fieldLabel:'供应商电话',
											name:'jviPhone',
											labelWidth:150,	
											width:200,
											labelAlign:'right'						    
										},{
											xtype:'textfield',
											fieldLabel:'供应商开户行',
											name:'jviCbank',
											labelWidth:150,	
											width:200,
											labelAlign:'right'		 						    
										},{
											xtype:'textfield',
											fieldLabel:'供应商账号',
											name:'jviAccount',
											labelWidth:150,	
											width:200,
											labelAlign:'right'								    
										},/*{
											xtype:'textfield',
											fieldLabel:'供应商纳税人英文名称',
											labelWidth:150,	
											name:'jviEname',
											width:200,
											labelAlign:'right'							    
										},{
											xtype:'textfield',
											fieldLabel:'供应商开户银行英文名称',
											name:'jviEbank',
											labelWidth:150,	
											width:200,
											labelAlign:'right' 
										},{
											xtype:'textfield',
											fieldLabel:'供应商联系人',
											name:'jviLinkman',
											labelWidth:150,	
											width:200,
											labelAlign:'right'							    
										},*/{
											xtype:'textfield',
											fieldLabel:'供应商邮箱地址',
											name:'jviEmail',
											labelWidth:150,	
											width:200,
											labelAlign:'right'						    
										},/*{

											xtype: 'combobox',
										    fieldLabel: '供应商纳税人类别',
										    labelWidth:150,	
										    name:'jviTaxpayertype',
										    labelAlign: 'right',
										    width:200,
										    queryMode: 'local',
										    valueField: 'key',
										    store: Ext.create('Ext.data.Store', {
								                fields: ['key', 'value'],
								                data: jpttaxpayertype
								            }),
								            displayField : 'value',
								            emptyText : '请选择',  
								            editable : false,  
								            selectOnFocus : true
										}/*,{
											fieldLabel: '购方机构',
											xtype: 'treepicker',
							        		store: treeStore,
							        		afterLabelTextTpl : required,
										    displayField: 'text',
										    valueField: 'id',
										    labelWidth:158,	
										    name: 'jviInstid',
										    labelAlign:'right',
											value:''
										},{
											xtype:'textfield',
											fieldLabel:'供应商收件人',
											name:'jviAddressee',
											labelWidth:150,	
											width:200,
											labelAlign:'right'						    
										},{
											xtype:'textfield',
											fieldLabel:'供应商收件人电话',
											name:'jviAddresseephone',
											labelWidth:150,	
											width:200,
											labelAlign:'right'						    
										},{
											xtype:'textfield',
											fieldLabel:'供应商收件邮编',
											name:'jviAddresseezipcode',
											labelWidth:150,	
											width:200,
											maxLength: 6,
											labelAlign:'right'						    
										},{
											xtype:'textfield',
											fieldLabel:'供应商收件地址',
											name:'jviAddresseeaddress',
											labelWidth:150,	
											width:200,
											labelAlign:'right'						    
										},{
											xtype:'textfield',
											fieldLabel:'供应商详细收件地址',
											name:'jviAddresseeaddressdetail',
											labelWidth:150,	
											width:200,
											labelAlign:'right'						    
										},{
											xtype:'combobox'
												,fieldLabel:'是否列入黑名单'
												,name:'jviSellerblacklistyn'
												,labelAlign:'right'
												,valueField: 'key'
											   
												,store:
													Ext.create('Ext.data.Store', {
													     fields: ['key', 'value']
													     ,data: jptScandynList
													})
												,displayField : 'value'
												,emptyText : '请选择'
									           	,editable : false 
									            ,selectOnFocus : true ,
									            labelWidth:150,	
												width:200
											
											}*/]
								},buttons : [{
									text : '提交',
									iconCls : "save-icon",
									handler : function() {
										var myForm=manualWin.down('form').getForm();
										var params={};
										var fs = myForm.getValues();
										if(!myForm.isValid()){
											return;
										}
										for(var i in fs){
											params[i]=fs[i];
											//alert(fs[i]);
										} 
										Ext.MessageBox.confirm('提示','您确定要提交数据?',function(obj) {
									    	if(obj=='yes'){ //选择了是
												Ext.Ajax.request({
													url : 'newDistributor.ajax',
													dataType: "json",  
													params : {params:json.stringify(params)},
													success : function(response) {
														if(response){
															var result=Ext.decode(response.responseText);
															if(result=="success"){
																Ext.MessageBox.alert('提示','新增成功');
																manualWin.hide();
																// 提交成功后重新加载当前页
																store.loadPage(1);
															}
															else if(result=="saveError"){
																		Ext.MessageBox.alert('提示','新增失败');
															}else{
																Ext.MessageBox.alert('提示',result);
																manualUWin.hide();
																		// 提交成功后重新加载当前页
																		store.loadPage(1);
															}
															}
													}
												});
									    	}
										});
									}
								}, {
									text : '关闭',
									iconCls : "close-icon",
									handler : function() {
										manualWin.hide();
										store.loadPage(1);
									}

								}]
							}).show();
						}
					},{
						xtype: 'button',
						text : '修改',
						iconCls : "edit-icon",
						handler : function() {
				         	var grid = myView.down('grid').getSelectionModel().getSelection();
				         	if (grid.length == 0) {
				         		Ext.Msg.alert('提示','请选择一条供应商信息！');
				         		return false;
				         	} else if (grid.length > 1) {
				         		Ext.Msg.alert('提示','请选择一条供应商信息！');
				         		return false;
				         	} 
				         	/*Ext.MessageBox.confirm('提示','确认修改吗？',function(obj){
								if(obj=='yes'){}
				         	});*/
				         	 
									var manualUWin=Ext.create('Ext.window.Window', {
										width : 400,
										layout : 'fit',
										modal:true,//设置是否添加遮罩
										constrainHeader : true,
										items : {
											layout : 'form',
											xtype : 'form',
											frame : true,
											defaultType : 'textfield',
											items : [
												 {
														
														xtype:'textfield',
														width:80,
														align:'center',
														name:'jviId',
														width:200,
														value:grid[0].get('jviId'),
														hidden:true
											  },{
													xtype:'textfield',
													fieldLabel:'供应商名称',
													labelWidth:158,	
													afterLabelTextTpl : required,
													enforceMaxLength:true,
													allowBlank:false,
													width:300,
													name:'jviCname',
													regex: /^[\u4E00-\u9FA5\(\)\（＼）]+$/,
													regexText: '请输入中文',
													labelAlign:'right',
													value:grid[0].get('jviCname')
														
												},{
													
										            xtype:'textfield',
													fieldLabel:'供应商编号',
													//afterLabelTextTpl : required,
													//enforceMaxLength:true,
													//allowBlank:false,
													//regex:/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-z]{15,20}$/,
													//regexText: '请输入15-20位数字和字母组成的纳税识别号',
													labelWidth:158,	
													name:'jviSupplierNumber',
													width:200,
													value:grid[0].get('jviSupplierNumber'),
													//readOnly : true,
													labelAlign:'right'
													
												},{
													
										            xtype:'textfield',
													fieldLabel:'纳税人识别号',
													afterLabelTextTpl : required,
													enforceMaxLength:true,
													allowBlank:false,
													regex:/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-z]{15,20}$/,
													regexText: '请输入15-20位数字和字母组成的纳税识别号',
													labelWidth:158,	
													name:'jviTax',
													width:200,
													value:grid[0].get('jviTax'),
													readOnly : true,
													labelAlign:'right'
													
												},{
													xtype:'textfield',
													fieldLabel:'供应商地址',
													name:'jviAddress',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviAddress'),
													labelAlign:'right'						    
												},{
													xtype:'textfield',
													fieldLabel:'供应商电话',
													name:'jviPhone',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviPhone'),
													labelAlign:'right'						    
												},{
													xtype:'textfield',
													fieldLabel:'供应商开户行',
													name:'jviCbank',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviCbank'),
													labelAlign:'right'		 						    
												},{
													xtype:'textfield',
													fieldLabel:'供应商账号',
													name:'jviAccount',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviAccount'),
													labelAlign:'right'		 						    
												}/*,{
													xtype:'textfield',
													fieldLabel:'供应商账号',
													name:'jviAccount',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviAccount'),
													labelAlign:'right'								    
												},{
													xtype:'textfield',
													fieldLabel:'供应商纳税人英文名称',
													labelWidth:150,	
													name:'jviEname',
													width:200,
													value:grid[0].get('jviEname'),
													labelAlign:'right'							    
												},{
													xtype:'textfield',
													fieldLabel:'供应商开户银行英文名称',
													name:'jviEbank',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviEbank'),
													labelAlign:'right' 
												},{
													xtype:'textfield',
													fieldLabel:'供应商联系人',
													name:'jviLinkman',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviLinkman'),
													labelAlign:'right'							    
												}/*,{
													xtype:'textfield',
													fieldLabel:'供应商电话',
													name:'jviPhone',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviPhone'),
													labelAlign:'right'						    
												}*/,{
													xtype:'textfield',
													fieldLabel:'供应商邮箱地址',
													name:'jviEmail',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviEmail'),
													labelAlign:'right'						    
												},/*{

													xtype: 'combobox',
												    fieldLabel: '供应商纳税人类别',
												    labelWidth:150,	
												    name:'jviTaxpayertype',
												    labelAlign: 'right',
												    width:200,
												    queryMode: 'local',
												    valueField: 'key',
												    store: Ext.create('Ext.data.Store', {
										                fields: ['key', 'value'],
										                data: jpttaxpayertype
										            }),
										            value:grid[0].get('jviTaxpayertype'),
										            displayField : 'value',
										            emptyText : '请选择',  
										            editable : false,  
										            selectOnFocus : true
												}/*,{
													fieldLabel: '购方机构',
													xtype: 'treepicker',
									        		store: treeStore,
									        		afterLabelTextTpl : required,
												    displayField: 'text',
												    valueField: 'id',
												    name: 'jviInstid',
												    labelWidth:150,	
												    labelAlign:'right',
												    value:grid[0].get('jviInstid')
												},{
													xtype:'textfield',
													fieldLabel:'供应商收件人',
													name:'jviAddressee',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviAddressee'),
													labelAlign:'right'						    
												},{
													xtype:'textfield',
													fieldLabel:'供应商收件人电话',
													name:'jviAddresseephone',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviAddresseephone'),
													labelAlign:'right'						    
												},{
													xtype:'textfield',
													fieldLabel:'供应商收件邮编',
													name:'jviAddresseezipcode',
													labelWidth:150,	
													width:200,
													
													value:grid[0].get('jviAddresseezipcode'),
													labelAlign:'right'						    
												},{
													xtype:'textfield',
													fieldLabel:'供应商收件地址',
													name:'jviAddresseeaddress',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviAddresseeaddress'),
													labelAlign:'right'						    
												},{
													xtype:'textfield',
													fieldLabel:'供应商详细收件地址',
													name:'jviAddresseeaddressdetail',
													labelWidth:150,	
													width:200,
													value:grid[0].get('jviAddresseeaddressdetail'),
													labelAlign:'right'						    
												},
												/*,{

													xtype: 'combobox',
												    fieldLabel: '是否列入黑名单',
												    labelWidth:150,	
												    name:'jviSellerblacklistyn',
												    labelAlign: 'right',
												    width:200,
												    queryMode: 'local',
												    valueField: 'key',
												    store: Ext.create('Ext.data.Store', {
										                fields: ['key', 'value'],
										                data: jptScandynList
										            }),
										            value:grid[0].get('jviSellerblacklistyn'),
										            displayField : 'value',
										            emptyText : '请选择',  
										            editable : false,  
										            selectOnFocus : true
												}*/]
										},buttons : [{
											text : '更新',
											iconCls : "save-icon",
											handler : function() {
												var myForm=manualUWin.down('form').getForm();
												var params={};
												var fs = myForm.getValues();
												if(!myForm.isValid()){
													return;
												}
												for(var i in fs){
													params[i]=fs[i];
												} 
												Ext.MessageBox.confirm('提示','您确定要提交数据?',function(obj) {
													if(obj=='yes'){ //选择了是
														Ext.Ajax.request({
															url : 'updateDistributo.ajax',
															dataType: "json",
															params : {params:json.stringify(params)},
															success : function(response) {
																if(response){
																	var result=Ext.decode(response.responseText);
																	if(result=="success"){
																		Ext.MessageBox.alert('提示','更新成功');
																		manualUWin.hide();
																		// 提交成功后重新加载当前页
																		store.loadPage(1);
																	}
																	else if(result=="error"){
																		Ext.MessageBox.alert('提示','更新失败');
																	}else{
																		Ext.MessageBox.alert('提示',result);
																		manualUWin.hide();
																		// 提交成功后重新加载当前页
																		store.loadPage(1);
																	}
														
																}
															}
														});
													}
												});
											}
										}, {
											text : '关闭',
											iconCls : "close-icon",
											handler : function() {
												manualUWin.hide();
												store.loadPage(1);
											}
										
										}]
									}).show();
								
				         	
							
						}
					}, {
						xtype: 'button',
						text : '删除',
						iconCls : "delete-icon",
						handler:function(me){
							var grid = myView.down('grid').getSelectionModel().getSelection();
							if (grid.length > 0) {
								Ext.MessageBox.confirm('提示','确认删除供应商信息吗？',function(obj){
									if(obj=='yes'){
										var datas = new Array();
										for(var i=0;i<grid.length;i++){
											datas.push({
												jviId:grid[i].get('jviId')
											});
										} 
										
										Ext.Ajax.request({
											url:'removeDistributo.ajax',
											params:{
												params:json.stringify(datas)
											},
											success:function(response){
												var text=Ext.decode(response.responseText);
												if(text=='success'){
													Ext.create('widget.uxNotification', {html: '删除成功...'}).show();
													
													store.load();
												}else if(text=='removeError'){
													Ext.MessageBox.alert("提示","删除失败!");
												}else if(text=='exception'){
													Ext.MessageBox.alert("提示","程序运行错误,请重试...");
												} else {
													Ext.MessageBox.alert("提示",text);
												}
											}
										});
										treeInstId=null;
									}
								});
				             } else {
				                Ext.MessageBox.alert("提示",'请选择供应商信息！');
				            }
						}
					}
					/*,{
						xtype : 'fileuploadfield',
						name : 'filePath',
						fieldLabel : '文件',
						labelWidth : 30,
						width:250,
						msgTarget : 'side',
						allowBlank : false,
						labelAlign:'right'	,
						buttonText : '浏览',
				        buttonConfig:{
							iconCls : "open-file-icon"
						}
					},{
						xtype: 'button',
						text : '上传',
						//margin:Ext.ieVersion>8||Ext.ieVersion==0?'0 0 0 0':'2 0 0 50',
						iconCls : "import-icon",
						handler:function(me){
							var uploadForm = me.up('form').getForm();
							uploadForm.submit({
								url:'importDistributoExcel.do',
								enctype : 'multipart/form-data',
								method : 'POST',
								waitMsg:'正在上传文件，请耐心等候......',
								success:function(form, action){
									
									jesAlert(action.result.msg);
									store.load();
									
								},
								failure:function(form,action){
									var reger=new RegExp('=',"g"); 
									if(undefined==action.result){
										
										Ext.Msg.alert('提示','请选择上传的文件');
									}else{
										Ext.Msg.alert('提示',action.result.msg.replace(reger,"<br/>"));
									}
								}
							});
						}
					},{
						xtype: 'button',
						text : '供应商模板',
						//margin:Ext.ieVersion>8||Ext.ieVersion==0?'0 0 0 0':'2 0 0 0',
						iconCls : "download-orange-icon",
						instWin:null,
						handler:function(me){
							window.location.href='downLoadSuppilerMould.do';
						}
					},{
						xtype : 'fileuploadfield',
						name : 'taxBureauBlackPath',
						fieldLabel : '税务局黑名单文件',
						labelWidth : 110,
						width:250,
						msgTarget : 'side',
						allowBlank : false,
						labelAlign:'right'	,
						buttonText : '浏览',
				        buttonConfig:{
							iconCls : "open-file-icon"
						}
					},{
						
						xtype: 'button',
						text : '上传',
						iconCls : "import-icon",
						instWin:null,
						handler:function(me){
							var uploadForm = me.up('form').getForm();
							uploadForm.submit({
								url:'importTaxBureauBlackExcel.do',
								enctype : 'multipart/form-data',
								method : 'POST',
								waitMsg:'正在上传文件，请耐心等候......',
								success:function(form, action){
									jesAlert(action.result.msg);
									store.load();
								},
								failure:function(form,action){
									jesErrorAlert(action.result.msg);
								}
							});
						}
					},{
						xtype: 'button',
						text : '黑名单模板',
						iconCls : "download-orange-icon",
						instWin:null,
						handler:function(me){
							window.location.href='downLoadBlackListMould.do';
						}
					}*/
					]
				
		    }
	         ]}
				]
			},
			layout : 'fit',
			store : store,
			
			id : 'data_grid',
			selType : 'checkboxmodel',
			selModel:{mode :'SIMPLE'},
			columns: [{header:'序号',xtype:'rownumberer',width:50,align:'center'},
			{text: '购方机构', dataIndex: 'instName',width:180,align: 'left',style:{'text-align':'center'}},
				/*{
				text : '供应商所属机构',
				dataIndex: 'instName',
				width:100
			},*/
          /*{text : '税务局黑名单',width:80,align : 'center',dataIndex : 'jviSatblacklistyn',renderer : 
				function(value) {
		        	 if(Ext.isEmpty(value)){
	            		return value;
		        	 }
                	 return jptScanedynInfo[value]['value'];
	            }},*/
			{
				text : '供应商名称',
				width:250,
				align:'left',
				style:{'align':'center'},
				dataIndex : 'jviCname'
			},{
				text : '供应商编号',
				width:250,
				align:'left',
				style:{'align':'center'},
				dataIndex : 'jviSupplierNumber'
			},{
				text : '纳税人识别号',
				dataIndex: 'jviTax',
				align:'left',
				style:{'align':'center'},
				width:170
			},{
				text : '供应商地址电话',
				dataIndex: 'jviAddress',
				align:'left',
				style:{'align':'center'},
				width:200,
				renderer : function(value,p,record,rowIndex, columnIndex, store) {
					return record.data.jviAddress+record.data.jviPhone;
				}
			},{
				text : '供应商开户行及账号',
				dataIndex: 'jviCbank',
				width:150,
				renderer : function(value,p,record,rowIndex, columnIndex, store) {
					return record.data.jviCbank+record.data.jviAccount;
				}
			},{
				text : '供应商邮箱地址',
				dataIndex: 'jviEmail',
				align:'left',
				style:{'align':'center'},
				width:190
			}
			,{text : '是否黑名单',width:100,align : 'center',dataIndex : 'jviSellerblacklistyn'
				,renderer : 
					function(value) {
			        	 if(Ext.isEmpty(value)){
		            		return value;
			        	 }
	                	 return jptScanedynInfo[value]['value'];
		            }
			}/*,{
				text : '供应商纳税人英文名称',
				dataIndex: 'jviEname',
				align : 'center',
				width:100
				
			},{
				text : '供应商开户银行英文名称',
				dataIndex:'jviEbank',
				width:100
			},{
				text : '供应商联系人',
				dataIndex: 'jviLinkman',
				width:100
				
			},{
				text : '供应商收件人',
				dataIndex: 'jviAddressee',
				width:100
				
			},{
				text : '供应商收件人电话',
				dataIndex: 'jviAddresseephone',
				width:100
			}
			,{
				text : '供应商收件地址',
				dataIndex: 'jviAddresseeaddress',
				width:100
			},{
				text : '供应商详细收件地址',
				dataIndex: 'jviAddresseeaddressdetail',
				width:100
			},{
				text : '供应商收件邮编',
				dataIndex: 'jviAddresseezipcode',
				width:100
				
			},{
			   text : '供应商类别',dataIndex: 'jviTaxpayertype',align : 'center',width:80,renderer : function(value) {
                	if (Ext.isEmpty(value)) {
						return value;
					}
					return jpttaxpayertype[value]['value'];
	            }
			}*/
	],dockedItems:{
		     	xtype:'jespaging',
		     	autoShow:true,
		     	store:store,
		     	dock:'bottom',
		     	displayInfo:true
		     }
		}]
	});
});
</script>