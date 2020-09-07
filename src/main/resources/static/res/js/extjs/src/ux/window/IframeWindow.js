Ext.define('Ext.ux.window.IframeWindow', {
	extend: 'Ext.window.Window',
	uses: ['Ext.ux.IFrame'],
	layout:'fit',
	
	url: 'about:blank',
	maximizable:true,
	
	initComponent:function(){
		 this.items={
 			xtype:'uxiframe',
 			style: {
		        backgroundColor:'white'
		    },
 			src:this.url
		 }	
		 this.callParent(arguments);
	}
	
});