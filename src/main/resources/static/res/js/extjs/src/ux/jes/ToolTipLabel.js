Ext.define('Ext.ux.jes.ToolTipLabel', {
    extend:'Ext.form.Label',
    alias: 'widget.tipLabel',
    requires: [
        'Ext.tip.ToolTip'
    ],
   
    config:{
    	textLength:8
    },
    
    constructor:function(config){
    	this.callParent(arguments);
    	this.initConfig(config);
    },
    
    initComponent:function(){
    	var initText = this.text;
    	this.on('afterrender',function(){
    		Ext.create('Ext.tip.ToolTip', {
			    target: this.getEl(),
			    html: initText
			});
    	});
    	this.setText(initText.length>this.textLength?initText.substring(0,this.textLength)+'...':initText);
    }
    
});