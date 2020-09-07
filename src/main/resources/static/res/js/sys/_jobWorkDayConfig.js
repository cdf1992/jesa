Ext.require([ 
              'Ext.ux.jes.PagingToolbar',
			  'Ext.layout.container.Border', 
			  'Ext.ux.window.Notification',
			  'Ext.picker.Date' ]);


var workDaysStore = Ext.create('Ext.data.Store', {
	autoLoad : true,
	fields : [ 'ssId', 'calendarId', 'dateValue', 'isWorkDay','dayInfo', 'dayOfWeek' ],
	proxy : {
		type : 'ajax',
		url : 'getWorkDaysList.ajax?f=BSYS.0103',
		reader : {
			type : 'json',
			root : 'workDaysList',
			totalProperty : 'total'
		}
	}
});

Ext.onReady(function() {
			Ext.QuickTips.init();
			var drawSsId = 'BSYS';
			var drawCalendarId = '0001';
 
			Ext.create('Ext.Viewport',{
				layout : 'border',
				items : [
						{
						xtype : 'panel',
						title : '选择日期',
						region : 'west',
						padding : 0,
						items : [ {
									xtype : 'datepicker',
									id : 'date-picker',
									listeners : {
										select : function(picker,date, eOpts) {
														console.log("--"+date);
														drawCalendar(drawSsId,drawCalendarId,date);
														//Ext.getCmp('view-icon').setText(Ext.util.Format.date(date,'Y-m'));
														}
												}
									},
									{
										xtype : 'gridpanel',
										store : workDaysStore,
										columnLines : true,
										width:170,
										columns : [
										   		{
										   			text : '流程编号',
										   			name : 'DATE_VALUE',
										   			dataIndex:'dateValue'
										   		},{
										   			text : '是否运行',
										   			name : 'DATE_VALUE',
										   			dataIndex:'dateValue'
										   		} ]
									}
								]
						},
						{
							xtype : 'panel',
							itemId : 'monthPanel',
							layout : 'fit',
							region : 'center',
							name : 'monthPanel',
							tbar : [ {
								xtype : 'toolbar',
								width : '100%',
								items : [
								         	'查询类型',{
												xtype:'combobox',
												width : '10%',
												store:Ext.create('Ext.data.Store', {
												    fields: ['value', 'name'],
												    data : [
												        {"value":"f.JOB_ID:eq", "name":'流程编号'/*"流程编号"*/},
												        {"value":"f.BEGIN_TIME:like", "name":'预计运行日期'/*"预计运行日期"*/},
												        {"value":"f.DATA_DATE:eq", "name":'数据日期'/*"数据日期"*/}
												    ]
												}),
												displayField: 'name',
											    valueField: 'value',
												name : 'taskType',
												editable:false
											},
											{
												xtype : 'button',
												text : Ext.util.Format.date(new Date(),'Y-m'),
												id : 'view-icon'
								         	} 
										]
							} ],
							contentEl : 'monthView'
						}
					]
			});
});