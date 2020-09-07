Ext.require([
    'Ext.ux.window.Notification'
]);
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
			Ext.define('Sys.app.AddActionTriggerWin', {
					extend : 'Ext.window.Window',
					width : 300,
					height : 210,
					layout : 'fit',
					buttonAlign : 'center',
					bodyPadding : 2,
					constrainHeader : true,
					items : {
						xtype : 'form',
						items : [ {
							xtype : 'combobox',
							fieldLabel : '触发器类型',
							afterLabelTextTpl : required,
							editable : false,// 不允许输入
							emptyText:'请选择...',//默认值
							store : Ext.create('Ext.data.Store', {
								fields : [ 'key', 'value' ],
								data : [ {
									"key" : "",
									"value" : "请选择"
								}, {
									"key" : "Y",
									"value" : "JAVA"
								}, {
									"key" : "N",
									"value" : "SQL"
								} ]
							}),
							name : 'tiggerType',
							displayField : 'value',
							valueField : 'value',
							allowBlank : false,
							value : 'JAVA'
							
						},{
							xtype : 'combobox',
							fieldLabel : '触发前/后',
							afterLabelTextTpl : required,
							editable : false,// 不允许输入
							emptyText:'请选择...',//默认值
							store : Ext.create('Ext.data.Store', {
								fields : [ 'key', 'value' ],
								data : [ {
									"key" : "",
									"value" : "请选择"
								}, {
									"key" : "A",
									"value" : "之后触发"
								}, {
									"key" : "B",
									"value" : "之前触发"
								} ]
							}),
							name : 'beforeAfter',
							displayField : 'value',
							valueField : 'key',
							allowBlank : false,
							value : 'A'
							
						},{
	                        xtype : 'combobox'
	                            , queryMode: 'remote'
	                            ,fieldLabel : '触发参数'
                            	,afterLabelTextTpl : required	
	                            , displayField: 'comboxName'
	                            , valueField: 'comboxId'
                            	,selectOnFocus:true
	                            , store : Ext.create('Ext.data.Store', {
	                                fields: ['comboxId', 'comboxName']
	                                , proxy: {
	                                    type: 'ajax'
	                                    , url: 'tiggerParamList.ajax?f=BSYS.0214.query',
	                                    reader:{
	                    					type:'json',
	                    					root:'data'
	                    						}
	                                }
	                                
	                            })
	                            , name : 'tiggerParams'
	                            
	                        } ]
					},
					buttons : [ {
						text : '保  存',
						name : 'submit'
					} ]
			});
