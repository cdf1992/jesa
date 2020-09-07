Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.window.Window',
    'Ext.form.*',
    'Ext.ux.window.Notification'
]);

Ext.define('Sys.app.DJobIntanceWin', {
	extend : 'Ext.window.Window',
	width : 750,
	maximizable:true,
	layout:'fit',
	modal:true,
	items:{
			xtype:'form',
			bodyBorder:false,
			layout:'column',
			autoScroll:true,
				items:[{
					border : false,
					columnWidth :0.5,
					bodyPadding: 10,
					defaultType : 'textfield',
					defaults:{	readOnly:true,
								fieldStyle:'background: #C4C4C4'
					},
					layout: 'form',
					items:[{
								fieldLabel: '任务ID',
					    		name: 'djobId'
							},{
								fieldLabel: '运行开始时间',
								name: 'runningStart'
							},{
								fieldLabel: '运行状态',
								name: 'runStatus'
							},{
								fieldLabel: '平地运行次数',
								name: 'runningRetryTimes'
							},{
								fieldLabel: '检查次数',
								name: 'checkTimes'
							},{
								fieldLabel: '第一次检查',
								name: 'firstCheckTime'
							},{
								fieldLabel: '反馈日志',
								name: 'feebackFlag'
							},{
								fieldLabel: '计划服务',
								fieldStyle:'',
								readOnly:false,
								name: 'planServer'
							},{
								fieldLabel: '任务发布人',
								name: 'issuedUser'
							},{
								fieldLabel: '任务优先级',
								fieldStyle:'',
								readOnly:false,
								name: 'djobPriority'
							},{
								fieldLabel: '计划开始时间',
								xtype:'datefield',
								readOnly:false,
								format: 'Y-m-d',
								fieldStyle:'',
								name: 'planStart'
					}]
				},{
					border : false,
					columnWidth :0.5,
					defaultType : 'textfield',
					defaults:{	readOnly:true,
								fieldStyle:'background: #C4C4C4'
					},
				    bodyPadding: 10,
					layout: 'form',
					items:[{
								fieldLabel: '服务器',
					    		name: 'runningServer'
							},{
								fieldLabel: '运行结束时间',
								name: 'runningEnd'
							},{
								fieldLabel: '运行日志',
								name: 'runningLog'
							},{
								fieldLabel: '运行参数',
								name: 'runningParams'
							},{
								fieldLabel: 'LOCKGROUP状态',
								name: 'lockGroupStatus'
							},{
								fieldLabel: '最后一次检查',
								name: 'lastCheckTime'
							},{
								fieldLabel: '尝试次数',
								name: 'planRetryTimes'
							},{
								fieldLabel: '子系统ID',
								name: 'ssId'
							},{
								fieldLabel: '任务发布时间',
								name: 'issuedDate'
							},{
								fieldLabel: '数据日期',
								name: 'dataDate'
					}]
			 }],
			buttons:[{
				text:'修改',
			    handler: function() {
			    	var me = this.up('window');
			        var form = this.up('form').getForm();
			        if (form.isValid()) {
			           form.submit({
			            	url:'updateDJobIntance.ajax?f=BSYS.0411.updateDJobIntance',
			                success: function(form, action) {
							 	jesAlert("修改成功!");
							 	
							 	me.close();
			                },
			                failure: function(form, action) {
			                	jesErrorAlert('修改失败');
			                }
			            });
			        }
			    }
			}]
		},

});