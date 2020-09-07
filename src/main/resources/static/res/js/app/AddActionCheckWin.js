Ext.require([
    'Ext.ux.window.Notification'
]);
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

			Ext.define('Sys.app.AddActionCheckWin', {
					extend : 'Ext.window.Window',
					width : 300,
					height : 210,
					layout : 'fit',
					buttonAlign : 'center',
					bodyPadding : 2,
					constrainHeader : true,
					items : {
						xtype : 'form',
						items : [ /*{
							xtype : 'textfield',
							fieldLabel : ' 检查编号',
							allowBlank : false,
							name : 'checkId'
						},*/{
							xtype : 'combobox',
							fieldLabel : '检查类型',
							editable : false,// 不允许输入
							afterLabelTextTpl : required,
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
							name : 'checkType',
							displayField : 'value',
							valueField : 'value',
							allowBlank : false,
							value : 'JAVA'
							
						},{
							xtype : 'combobox',
							fieldLabel : '检查前/后',
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
									"value" : "之后检查"
								}, {
									"key" : "B",
									"value" : "之前检查"
								} ]
							}),
							name : 'beforeAfter',
							displayField : 'value',
							valueField : 'key',
							allowBlank : false,
							value : 'A'
							
						}  ,{
	                        xtype : 'combobox'
	                            , queryMode: 'remote'
	                            ,fieldLabel : '检查参数'
	                            ,afterLabelTextTpl : required
	                            , displayField: 'comboxName'
                            	,selectOnFocus:true
	                            , valueField: 'comboxId'
	                            , store : Ext.create('Ext.data.Store', {
	                                fields: ['comboxId', 'comboxName']
	                                , proxy: {
	                                    type: 'ajax'
	                                    , url: 'checkparamList.ajax?f=BSYS.0214.query',
	                                    reader:{
	                    					type:'json',
	                    					root:'data'
	                    						}
	                                }
	                                
	                            })
	                            , name : 'checkParam'
	                            
	                        } ]
					},
					buttons : [ {
						text : '保  存',
						name : 'submit'
					} ]
			});
