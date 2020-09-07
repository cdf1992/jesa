/**
 * 级联树
 */
Ext.define("Ext.ux.jes.CascadeTree", {
    extend: "Ext.tree.Panel",
    alias: 'widget.cascadetree',
    
    cascadeType: 0, //0:不级联     1:级联一级     2:级联全部 
    
    
    initComponent:function(){
    	this.callParent();
    	
    	var f=function(node, checked){
	    	var treepanel=node.getOwnerTree();
	    	if(treepanel.cascadeType==0){
	    		return false;
	    	}else{
	    		
				treepanel.suspendLayouts(); 
				var f=function (e) {
						e.set('checked', checked);
			    };
				if(treepanel.cascadeType==1){
					node.eachChild(f);
				}else{  //==2
					node.cascadeBy(f);
				}
				treepanel.resumeLayouts(); 
	    	}
		};
    	
    	this.getView().onCheckChange=function(record) {
            var checked = record.get('checked');
            if (Ext.isBoolean(checked)) {
                checked = !checked;
                record.set('checked', checked);
                f(record, checked);
                this.fireEvent('checkchange', record, checked);
            }
        }; 
    }
});