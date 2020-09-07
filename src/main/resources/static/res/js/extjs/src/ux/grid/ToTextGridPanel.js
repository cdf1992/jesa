Ext.define('Ext.ux.grid.ToTextGridPanel', {
    extend: 'Ext.grid.Panel',
    alias:  'widget.totextgrid',
    showText:function(){
    	var me=this;
    	var s="";
    	this.store.each(
    			function (rec){
    	    	     var cv = me.initialConfig.columns;
    	    	     for(var j=0; j < cv.length-1;j++) {
    	    	        var val = rec.data[cv[j].dataIndex];
    	    	        s = s.concat(val,"\t");
    	    	     }
    	    	     var val = rec.data[cv[cv.length-1].dataIndex];
    	    	     s = s.concat(val,"\r\n");
    			}
    	);

    	Ext.create('Ext.window.Window', {
    	    title: '文本',
    	    height: 200,
    	    width: 400,
    	    layout: 'fit',
    	    items: {  
    	       xtype:'textarea' ,
    	       value:s,
    	       selectOnFocus:true
    	    }
    	}).show();
    }
});
