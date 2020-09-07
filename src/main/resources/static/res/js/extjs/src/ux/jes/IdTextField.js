/**
 * 文本框内容只能由数字、字母或下划线组成
 */
Ext.define("Ext.ux.jes.IdTextField", {
    extend: "Ext.form.field.Text",
    alias: 'widget.idtextfield',
   
    allowBlank:false,  
    
    validator:function(){
		var pattern = /[^0-9A-Za-z_]/;
		var isValid = pattern.test(this.getValue());   
		if(isValid){
			return '只由数字、字母或下划线组成';
		}
		return true;
	}
});
