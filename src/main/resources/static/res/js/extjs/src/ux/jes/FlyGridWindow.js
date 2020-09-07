Ext.require('Ext.ux.grid.DataGridPanel');
Ext.define('Ext.ux.jes.FlyGridWindow', {
	extend:'Ext.window.Window',
    alias: 'widget.flygridwindow',
    initComponent:function(){
    	 var me=this;
         this.items={
        		 xtype: 'datagridpanel',
		         gridColumns:me.gridColumns,
                  gridStoreFields:me.gridStoreFields,
                  queryFieldStoreData:me.queryFieldStoreData,
                  comboxdata:  me.comboxdata,
                  gridVal:me.gridVal,
                  gridName:me.gridName,
                  selModel:me.selModel,
                  ssId:me.ssId,
                  sqlId:me.sqlId,
			      version:me.version
         }
         this.callParent();
    }
});
