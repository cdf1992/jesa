{
	title : '${ssName}',
	xtype : 'gridpanel',
	collapsible : true,
	store : Ext.create('Ext.data.Store',{
				autoLoad : ${isLoad},
				fields:['TASK_TEMPLATE_ID', 'TASK_TEMPLATE_NAME', 'DATA_DATE', 'TASK_STATUS_NAME','URL'],
				proxy:{
					type: 'ajax',
					url: 'valueStackTask.ajax',
					extraParams:{
						ssId: 'BSYS',
						vsId: 'HOMEPAGE.TASK.${ssId}' 
					},
					reader:{
						type:'json',
						root:'valueStackTask'
					}
				}
			}),
 	columns : [
		{
			header : '${message("jes.vm.sys.myTaskList.xh")}',/*序号*/
			xtype : 'rownumberer',
			width : 50,
			align : 'center'
		}, {
			text : '${message("jes.vm.sys.myTaskList.rwid")}',/*任务ID*/
			align : 'center',
			dataIndex : 'TASK_TEMPLATE_ID',
			flex : 3
		}, {
			text : '${message("jes.vm.sys.myTaskList.rwmc")}',/*任务名称*/
			align : 'center',
			dataIndex : 'TASK_TEMPLATE_NAME',
			flex : 3
		}, {
			text : '${message("jes.vm.sys.myTaskList.rwxfsj")}',/*任务下发时间*/
			align : 'center',
			dataIndex : 'DATA_DATE',
			flex : 1
		}, {
			text : '${message("jes.vm.sys.myTaskList.rwzt")}',/*任务状态*/
			align : 'center',
			dataIndex : 'TASK_STATUS_NAME',
			flex : 2
		}
	],
	listeners : {
		activate : function(grid){
			var store = grid.getStore();
			if(0 == store.getCount()){
				store.load();
			}
		}
	}	

}