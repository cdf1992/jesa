Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.window.Window',
    'Ext.ux.window.Notification'
]);
var roleStore = Ext.create('Ext.data.Store', {
	   fields: ['ROLE_ID','ROLE_NAME'],
	   autoLoad:false,
	   proxy:{
		   type: 'ajax',
		   url: 'roleIdList.ajax?f=BSYS.0422',
		   reader:{
			   type:'json'
		   }
}})
Ext.define('Sys.app.MsgConfigWin', {
	extend : 'Ext.window.Window',
	width : 600,
	minWidth: 400,
	layout: 'fit',
	constrainHeader: true,
	buttonAlign:'center',
	listeners:{
		   boxready:function(me){ 
			   var ssId = me.down('textfield[name=ssId]').getValue();
			   roleStore.proxy.extraParams ={ssId:ssId};
			   roleStore.load();
	    	   }
    },
	items:[{
		    xtype: 'form',
			frame : true,
			autoScorll: true,
			items: [{
				     xtype : 'fieldset',
					 labelAlign: 'right',
					 title : '策略基本信息',
					 layout: 'form',
					 defaultType : 'textfield',
					 items:[{
						     fieldLabel: '策略Id',
			    		     allowBlank: true,
			    		     name: 'msgDefineId',
			    		     width:20,
			    		     height: 22,
			    		     hideable:true
					       },{
					    	  fieldLabel: '系统英文名',
					    	  allowBlank: true,
					    	  name: 'ssId',
					    	  height: 22
						   },{
							  xtype:'combobox',
							  store:Ext.create('Ext.data.Store', {
								    fields: ['key', 'value', 'SS_ID'],
								    proxy:{
								    	type: 'ajax',
										url: 'eventCodeList.ajax?f=BSYS.0422',
										reader:{
											type:'json'
										}
									}}),
							  fieldLabel: '事件代码',
							  allowBlank: true,
							  name: 'eventCode',
							  valueField : 'value',  
					          displayField : 'text', 
						      height: 22,
						      listeners:{
						    	  expand:function(me){
						    		  me.store.filterBy(function(record) {  
						    			  var ssId=me.up('form').down('combobox[name=ssId]');
						    			  return record.get("SS_ID").endsWith(ssId.getValue());
									    });
									}
					 			}
						   },{
							  fieldLabel: '策略名称',
							  allowBlank: true,
							  name: 'templateName',
							  height: 22
						   },{
							  xtype:'combobox',
							  store: new Ext.data.ArrayStore({  
								  fields : ['value', 'text'],  
			                      data : [["shortMsg", '短信'], ["Email", '邮件']]
							  }),
							  fieldLabel: '信息类型',
							  allowBlank: true,
							  valueField : 'value',  
					          displayField : 'text', 
							  name: 'msgType',
							  height: 22
						   },{
							  fieldLabel: '信息模板',
						      xtype: 'textarea',
							  allowBlank: true,
							  name: 'msgTemplate',
							  height: 150,
					 		  width: 550
					 		  }
						   ]
			      },{
			    	  xtype : 'fieldset',
			    	  layout: 'form',
			    	  title : '目标配置信息',
			    	  defaultType : 'textfield',
			    	  items:[{
			    		       xtype:'combobox',
			    		       store: new Ext.data.ArrayStore({
			    		    	   fields : ['value', 'text'], 
			    		    	   data : [["ROLE", '角色'], ["USER", '用户']]
			    		       }),
			    		       fieldLabel: '目标配置',
			    		       allowBlank: true,
			    		       valueField : 'value',  
			    		       displayField : 'text',
			    		       name: 'targetType',
			    		       listeners:{
			    		    	   change:function(  me, newValue, oldValue, eOpts ){ 
			    		    		   Ext.suspendLayouts();
			    		    		   var form =  me.up('form');
			    		    		   var fs=Ext.ComponentQuery.query('field', me.up('form'));
			    		    		   var fieldset=Ext.ComponentQuery.query('fieldset', me.up('form'));
			    		    		   var cb =fs[3];
			    		    		   if(newValue=='ROLE'){
			    		    			   fieldset[0].setVisible(true);
			    		    			   fieldset[1].setVisible(true);
			    		    			   fieldset[2].setVisible(true);
			    		    			   fieldset[3].setVisible(false);
			    		    			   fs[9].setVisible(false);
			    		    		   }
			    		    		   if(newValue=='USER'){
			    		    			   fieldset[0].setVisible(true);
			    		    			   fieldset[1].setVisible(true);
			    		    			   fieldset[2].setVisible(false);
			    		    			   fieldset[3].setVisible(true);
			    		    			   fs[9].setVisible(true);
//			    		    			   fs[10].setVisible(false);
//			    		    			   fs[11].setVisible(true);
			    		    			   }
			    		    		   Ext.resumeLayouts(true);
			    		    		   }
			    	             }
			    	  }]
			      },{
			    	  xtype : 'fieldset',
			    	  layout: 'form',
			    	  title : '角色',
			    	  defaultType : 'textfield',
			    	  items:[{
			    		       xtype:'combobox',
			    		       store: new Ext.data.ArrayStore({  
			    		    	   fields : ['value', 'text'],
			    		    	   data : [["ALL", '全部机构'], ["CURRENT", '当前机构'], ["SUPERIOR", '上级机构']]
			    		       }),
			    		       fieldLabel: '机构',
			    		       allowBlank: true,
			    		       valueField : 'value',  
			    		       displayField : 'text',
			    		       name: 'instType',
			    		       listeners:{
			    		    	   change:function(  me, newValue, oldValue, eOpts ){ 
			    		    		   Ext.suspendLayouts();
			    		    		   var form =  me.up('form');
			    		    		   var fs=Ext.ComponentQuery.query('field', me.up('form'));
			    		    		   var fieldset=Ext.ComponentQuery.query('fieldset', me.up('form'));
			    		    		   var cb =fs[3];
			    		    		   if(newValue=='ALL'){
			    		    			   fieldset[0].setVisible(true);
			    		    			   fieldset[1].setVisible(true);
			    		    			   fieldset[2].setVisible(true);
			    		    			   fieldset[3].setVisible(false);
			    		    			   fs[8].setVisible(false);
			    		    		   }
			    		    		   if(newValue=='CURRENT'){
			    		    			   fieldset[0].setVisible(true);
			    		    			   fieldset[1].setVisible(true);
			    		    			   fieldset[2].setVisible(true);
			    		    			   fieldset[3].setVisible(false);
			    		    			   fs[8].setVisible(true);
			    		    			   fs[9].setVisible(false);
			    		    			   }
			    		    		   if(newValue=='SUPERIOR'){
			    		    			   fieldset[0].setVisible(true);
			    		    			   fieldset[1].setVisible(true);
			    		    			   fieldset[2].setVisible(true);
			    		    			   fieldset[3].setVisible(false);
			    		    			   fs[8].setVisible(true);
			    		    			   }
			    		    		   Ext.resumeLayouts(true);
			    		    		   }
			    	             }
			    		   },{ 
			    			   xtype:'combobox',
			    			   store: roleStore,
			    			   fieldLabel: '角色资源',
			    			   allowBlank: true,
			    			   valueField : 'ROLE_ID',  
			    			   displayField : 'ROLE_NAME',
			    			   name: 'roleId'
			    			   
			    	   }]
			      },{
			    	  xtype : 'fieldset',
			    	  layout: 'form',
			    	  title : '用户',
			    	  defaultType : 'textfield',
			    	  items:[/*{
			    		       xtype:'combobox',
			    		       store: new Ext.data.ArrayStore({  
			    		    	   fields : ['value', 'text'],
			    		    	   data : [["All", '全部机构'], ["Current", '当前机构'], ["Superior", '上级机构']]
			    		       }),
			    		       fieldLabel: '机构',
			    		       allowBlank: false,
			    		       valueField : 'value',  
			    		       displayField : 'text',
			    		       name: 'instType',
			    		       listeners:{
			    		    	   change:function(  me, newValue, oldValue, eOpts ){ 
			    		    		   Ext.suspendLayouts();
			    		    		   var form =  me.up('form');
			    		    		   var fs=Ext.ComponentQuery.query('field', me.up('form'));
			    		    		   var fieldset=Ext.ComponentQuery.query('fieldset', me.up('form'));
			    		    		   var cb =fs[3];
			    		    		   if(newValue=='All'){
			    		    			   fieldset[0].setVisible(true);
			    		    			   fieldset[1].setVisible(true);
			    		    			   fieldset[2].setVisible(false);
			    		    			   fieldset[3].setVisible(true);
			    		    			   fs[11].setVisible(true);
			    		    		   }
			    		    		   if(newValue=='Current'){
			    		    			   fieldset[0].setVisible(true);
			    		    			   fieldset[1].setVisible(true);
			    		    			   fieldset[2].setVisible(false);
			    		    			   fieldset[3].setVisible(true);
			    		    			   }
			    		    		   if(newValue=='Superior'){
			    		    			   fieldset[0].setVisible(true);
			    		    			   fieldset[1].setVisible(true);
			    		    			   fieldset[2].setVisible(false);
			    		    			   fieldset[3].setVisible(true);
			    		    			   }
			    		    		   Ext.resumeLayouts(true);
			    		    		   }
			    	             }
			    		   },{ 
			    			   xtype:'combobox',
			    			   store: Ext.create('Ext.data.Store', {
			    				   fields: ['ROLE_ID'],
			    				   proxy:{
			    					   type: 'ajax',
			    					   url: 'roleIdList.ajax?f=BSYS.0422',
			    					   reader:{
			    						   type:'json'
			    							   }
			    			   }}),
			    			   fieldLabel: '角色资源',
			    			   allowBlank: false,
			    			   valueField : 'ROLE_ID',  
			    			   displayField : 'ROLE_ID',
			    			   name: 'roleId'
			    				   }*/
			    		   ,{ 
			    		       xtype:'combobox',
			    		       store: Ext.create('Ext.data.Store', {
			    		    	   fields: ['ROLE_ID','ROLE_MEMBER'],
			    		    	   proxy:{
			    		    		   type: 'ajax',
			    		    		   url: 'roleMemberList.ajax?f=BSYS.0422',
			    		    		   reader:{
			    		    			   type:'json'
			    		    				   }
			    		       }}),
			    		       fieldLabel: '用户名称',
			    		       allowBlank: true,
			    		       valueField : 'ROLE_MEMBER',
			    		       displayField : 'ROLE_MEMBER',
			    		       name: 'roleMember'
			    		    	   }]
			      }
			      ]
	}],
	buttons:[{
		text : '保  存',
		name : 'submit',
		/*handler:function(me){
			var form = me.up('window').down('form');
			if(form.isValid()) {
				form.submit({
					url : 'editMsgConfig.ajax?f=BSYS.0422.edit',
					success:function(form,action){
						var text=action.result.success;
						if(text=='true'){
							me.up('window').close();
							jesAlert('修改成功！');
							subStore.load();
						}else{
							jesErrorAlert('修改失败！');
						}
					}
				});
			}else{
				jesErrorAlert('form未验证通过');
			}
	 }*/
			}]
});