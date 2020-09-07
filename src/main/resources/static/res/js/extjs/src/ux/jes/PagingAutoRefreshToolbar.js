/**
*增加每页条数下拉框的Pagingtoolbar
*/
 
Ext.define('Ext.ux.jes.PagingAutoRefreshToolbar', {
	extend : 'Ext.toolbar.Paging',
	requires: ['Ext.toolbar.Paging'],
	alias: 'widget.jestoolbar',
	taskRunner  : new Ext.util.TaskRunner(),
	refreshTask :{
		store: null,
		run: function (c) {
			 this.store.load(this.store.currentPage);
		},
    	interval: 5000
    },
    startRefresh:function(){
    	this.taskRunner.stop(this.refreshTask);
		this.refreshTask.store=this.store;
		this.refreshTask.interval=this.store.secendsOfrefresh*1000;
		if(	this.refreshTask.interval>0){
			this.taskRunner.start(this.refreshTask);
		}
    },
    stopRefresh:function(){
    	this.taskRunner.stop(this.refreshTask);
    },
    doRefresh:function(){
    	var me = this,
        store = me.store,
        current = store.currentPage;

	    if (me.fireEvent('beforechange', me, current) !== false) {
	    	this.startRefresh();
	        return true;
	    }
	    return false;
    
    },
	items:[{
				xtype:'combo',
				width:40,
				store:[-1,5,10,20,30,60],
				value:new Ext.util.LocalStorage().getItem('secendsOfrefresh') || 5,
				listeners:{
			        select: function(combo,records){
			        	var s=this.up('jestoolbar').store;
			        	if(s){
			        		new Ext.util.LocalStorage().setItem('secendsOfrefresh',combo.value);
			        		s.secendsOfrefresh=combo.value;
			        		this.up('jestoolbar').startRefresh();
			        	}
			        }
				}
			},
			'秒',
			{
			xtype:'combo',
			width:45,
			store:[10,15,20,30,50,100,200,500,1000],
			value:new Ext.util.LocalStorage().getItem('pageSize') || 20,
			listeners:{
		        select: function(combo,records){
		        	var s=this.up('jestoolbar').store;
		        	if(s){
		        		s.pageSize=combo.value;
		        		new Ext.util.LocalStorage().setItem('pageSize',combo.value);
		        		s.loadPage(1);
		        	}
		        }
			}
		},
		'行 / 页'
		// TODO 找不到 jesPagingRowsForPageText，临时注释
	],
	initComponent: function () {
		try{
			this.store.pageSize=new Ext.util.LocalStorage().getItem('pageSize') || 20;
		}catch(e){
		}
		
		try{
			this.store.secendsOfrefresh=new Ext.util.LocalStorage().getItem('secendsOfrefresh') || 5;
		}catch(e){
		}
		this.callParent();
	}
});