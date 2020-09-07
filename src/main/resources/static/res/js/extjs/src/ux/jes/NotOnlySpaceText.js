Ext.define('Ext.ux.jes.NotOnlySpaceText', {
    extend:'Ext.form.field.Text',
    alias: 'widget.nostextfield',
    
    validator : function(value){
    	if(!this.allowBlank && Ext.util.Format.trim(value).length==0){
    		return '不能仅仅输入空格';
    	}else{
    		return true;
    	}
    }
});