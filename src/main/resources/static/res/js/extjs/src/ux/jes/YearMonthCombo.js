Ext.define('Ext.ux.jes.YearMonthCombo', {
	extend : 'Ext.form.field.ComboBox',
	requires: ['Ext.data.ArrayStore','Ext.toolbar.Paging'],
	alias: 'widget.jesYMcombo',
	date:new Date(),
	years:3,
	
    initComponent:function(){
    	var yma=new Array();
    	var fy=this.date.getFullYear();
    	var fm=this.date.getMonth()+1;
		for(var m=fm;m>0;m--){
			yma.push(new Array(fy+'-'+(m<10?'0'+m:m)));
		}
    	for(var y=fy-1;y>fy-this.years;y--)
    		for(var m=12;m>0;m--){
    			yma.push(new Array(y+'-'+(m<10?'0'+m:m)));
    		}
        this.store=Ext.create('Ext.data.ArrayStore', {
	        fields:['ym'],
	        data:yma
	    });
    	this.callParent(arguments);
    },
	displayField: 'ym',
	submitField: 'ym'
});
