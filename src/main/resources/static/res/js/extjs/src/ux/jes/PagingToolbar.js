/**
*增加每页条数下拉框的Pagingtoolbar
*/
 
Ext.define('Ext.ux.jes.PagingToolbar', {
	extend : 'Ext.toolbar.Paging',
	requires: ['Ext.toolbar.Paging'],
	alias: 'widget.jespaging',
	addModel: false,
	loadMoreButtonVisible: true,
	items:[{
			morePage: 2,
			xtype:'combo',
			width:45,
			store:[10,15,20,30,50,100,200,500,1000],
			value:new Ext.util.LocalStorage().getItem('pageSize') || 20,
			listeners:{
		        select: function(combo,records){
		        	var s=this.up('jespaging').store;
		        	if(s){
		        		s.pageSize=combo.value;
		        		new Ext.util.LocalStorage().setItem('pageSize',combo.value);
		        		s.loadPage(1);
		        	}
		        }
			}
		},
		// TODO 找不到 jesPagingRowsForPageText，临时注释
		'行 / 页',
		{
			xtype: 'button',
			iconCls: 'load-more-icon',
			hidden:true,
			handler: function(btn){
				var s = btn.up('jespaging').store;
				//var temp = btn.up('jespaging').store;
				var combPageSize = btn.previousSibling('combo').getValue(); 
				var count = s.count();
				var currentPage = s.currentPage;
				if(count >= s.getTotalCount()){
					return ;
				}
				var tempPage = btn.up('jespaging').morePage;
				if(combPageSize <= count){
					tempPage = 1;
				}
				if(s.currentPage>tempPage){
					tempPage= s.currentPage;
				}
				btn.up('jespaging').addModel = true;
				tempPage +=1;
				s.loadPage(tempPage, {addRecords: true,    
					callback: function(records, operation, success) {
						// TODO 找不到 jesPagingPageZgMsg，临时注释
						btn.up('jespaging').displayMsg = '共 {2} 条，追加模式';
						btn.up('jespaging').updateInfo();
   					 }});
				s.currentPage = currentPage;
				btn.up('jespaging').morePage = tempPage;
			
			}
		}
	],
	listeners : {
		change: function( paging, page){
			var combo = paging.down('combo');
			if(combo.getValue()<= paging.store.count()){
				// TODO 找不到 jesPagingPageMsg，临时注释
				paging.displayMsg = '显示 {0} - {1} 条，共 {2} 条';
				paging.updateInfo();
			}
		}
	},
	initComponent: function () {
		try{
			this.store.pageSize=new Ext.util.LocalStorage().getItem('pageSize') || 20;
		}catch(e){
		}
		try{
			this.bindStoreBackup=this.bindStore;
			this.bindStore=function(store){
				if(!Ext.isEmpty(store)){
					store.pageSize=new Ext.util.LocalStorage().getItem('pageSize') || 20;
					this.bindStoreBackup(store);
				}
			};
		}catch(e){
		}
		this.callParent();
		if(this.loadMoreButtonVisible){
			this.down('button[iconCls=load-more-icon]').show();
		}
	}
});