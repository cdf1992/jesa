
Ext.require('Ext.form.field.Trigger');
Ext.require('Ext.ux.jes.PagingToolbar');
Ext.require('Ext.ux.jes.FlyGridWindow');
Ext.define('Ext.ux.jes.GridWindow', {
    extend:'Ext.form.field.Trigger',
    alias: 'widget.gridwindow',
    editable : false,
    onTriggerClick : function() {
      var field=this;
      var columnsArr=field.columns;
      var fieldArr = Ext.decode(field.fields);
      var backFields = Ext.decode(field.backFields);
      var comboxdata = field.comboxdata;
      var val=field.val+"_"+field.name;
      
      var gridWin=Ext.create('Ext.ux.jes.FlyGridWindow', {
		    title: '关联补录 (勾选数据,关闭窗口回写!!!!!)',
		    height:500,
		    width: 1000,
		    modal:true,
		    layout: 'fit',
		    buttonAlign: 'right',
	    	gridColumns:columnsArr,
            gridStoreFields:fieldArr,
            comboxdata: comboxdata,
		    version:field.version,
           gridVal:field.value,
           gridName:val,
           ssId:field.ssId,
           sqlId:field.sqlId
		}).show();
      
         gridWin.on('close',function(g,r){
         var selectArr = gridWin.down('datagridpanel').getSelectionModel().getSelection();
	      for(var i in selectArr){
            var r1 = selectArr[i];
              for(var j in backFields){
            	   var fieldname = backFields[j].substring(backFields[j].indexOf('_')+1);
        		   field.up('form').down('field[name='+fieldname+']').setValue(r1.get(backFields[j]));
       		    }	 
        	}
		});
    } 
});
