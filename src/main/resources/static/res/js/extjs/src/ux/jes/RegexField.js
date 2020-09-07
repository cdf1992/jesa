Ext.require('Ext.form.field.Trigger');

Ext.define('Ext.ux.jes.RegexField', {
    extend:'Ext.form.field.Trigger',
    alias: 'widget.jesregexfield',
    
    validator:function(value){
	    	try {
	    		var re = new RegExp(value);
	    		re.test('RegExp is valid.');
	    		return  true;
	    	}catch(e){
	    		return  '正则表达式语法不正确.';
	    	}
     },
    
    onTriggerClick: function() {
    	var theFiled=this;
        Ext.create("Ext.window.Window",{
        	title:'正则表达式测试',
        	width : 480,
        	height : 160,
        	buttonAlign:'center',
        	bodyPadding : 2,
        	layout:'form',
        	items:[	
	        	       	{
	        	       		xtype:'textfield',
	        	       		itemId:'regexValue',
	        	       		fieldLabel:'正则表达式',
	        	       		value:	this.value
	        			},
	        			{	
	        				xtype:'textfield',
	        				itemId:'textValue',
	        				fieldLabel:'测试值'
	        			},
	        			{
	        				xtype:'displayfield',
	        				itemId: 'result',
	        				fieldLabel:'是否匹配'
	        			}
        	       ],
	        buttons:[{
	    		text : '测试',
	    		handler: function(){
	    			try{
	    				var re = new RegExp($w(this).down('textfield[itemId=regexValue]').getValue());
	    				$w(this).down('displayfield[itemId=result]').setValue(re.test($w(this).down('textfield[itemId=textValue]').getValue())?'是':'否');
	    			}catch(e){
	    				$w(this).down('displayfield[itemId=result]').setValue(e);
	    			}
	    		}
	    	},{
	    		text : '设置值',
	    		handler: function(){
	    			theFiled.setValue($w(this).down('textfield[itemId=regexValue]').getValue());
	    			$w(this).close();
	    		}
	    	}]
        }).show();
        
    } 
});
