
Ext.define("Ext.ux.vms.customerSerchWin", {
 	 alias: 'Ext.ux.vms.customerSerchWin'
})
/**
 *添加遮罩
 *@updateDate 2018-1-15 17:26:57
 *@author liangshijun
 */
/**
 * 客户查询插件 
 * @author zhangruijun
 * @updateDate 2018-1-8 14:46:38
 * @param myFind 组件容器  根据自己业务可扩展
 * @param customerField  机构编号
 * @returns
 */


function setCustomers(myFind,treeInstId){
	var params={};
	params['f.INST_CODE:eq'] =treeInstId;
	
	var customerStore = Ext.create("Ext.data.Store", {
	    fields : [  'customerId', 'customerCname', 'instCode', 'customerTaxno', 'customerNationality', 
        	'customerType','taxpayerType','fapiaoType','customerFapiaoFlag','dataSource','customerAddress','customerPhone','customerCbank','customerAccount'],
	    proxy : {
			type : 'ajax',
			extraParams :params,
			url : 'queryListCustomer.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
		autoLoad:true
	});
	var customerSet = new Ext.form.FieldSet({  
		columnWidth:.1,  
	    height:90,  
	    collapsible:true,
	    draggable:false,//拖动
	    layout:'column',  
	    border:true, 
	    xtype:'form',
	    anchor:'100%',  
	    labelWidth:40,  
	    items:[{  
	        layout:'column',  
	        border: false,
	        items:[{
					xtype:'textfield',
					id:"customerNumP",
					fieldLabel:'客户编号',
					name:'f.CUSTOMER_ID:eq',
					labelAlign:'right',
					regex: /^[A-Za-z0-9]+$/,
					regexText: '客户编号为字母和数字组成'

				},{
					xtype:'textfield',
					id:"customerNameP",
					fieldLabel:'客户名称',
					name:'f.CUSTOMER_CNAME:like',
					labelAlign:'right',
					regex: /^[\u4E00-\u9FA5]+$/,
					regexText: '中文'
				},{
					xtype:'textfield',
					fieldLabel:'客户纳税人识别号',
					id:"customerTaxNumP",
					name:'f.CUSTOMER_TAXNO:eq',
					labelAlign:'right',
					regex:  /^[a-zA-Z0-9]{15,20}$/,
					regexText: '请输入15-20位纳税人识别号'
				},{
					xtype: 'combobox',
				    fieldLabel: '纳税人类型',
				    id:"taxpayerTypeP",
				    name:'f.TAXPAYER_TYPE:eq',
				    labelAlign: 'right',
				    queryMode: 'local',
				    displayField: 'value',
				    valueField: 'key',
				    store: Ext.create('Ext.data.Store', {
		                fields: ['key', 'value'],
		                data: vmsTaxpayerTypeList
		            }),
		            displayField : 'value',  
		            emptyText : '请选择',  
		            editable : false,  
		            selectOnFocus : true
				}]  
	    	  
	    }]  
	});  
	
	var customerGrid = new Ext.grid.GridPanel({
		xtype: 'grid',
		height:450,
		forceFit:true,
		tbar : [{
			text : '查询',
			iconCls : 'search-icon',
			handler : function(me) {
				var params={};
				params['f.CUSTOMER_ID:eq'] = Ext.getCmp('customerNumP').getValue();
				params['f.CUSTOMER_CNAME:like'] = Ext.getCmp('customerNameP').getValue();
				params["f.CUSTOMER_TAXNO:eq"] =Ext.getCmp('customerTaxNumP').getValue();
				params['f.TAXPAYER_TYPE:eq'] =Ext.getCmp('taxpayerTypeP').getValue();
				customerStore.proxy.extraParams =params;
				customerStore.loadPage(1);
			}
		},{
			text : '确定',
			iconCls : 'user-icon',
			handler : function() {
				var grid = Ext.getCmp('customerParam_grid').getSelectionModel().getSelection();
				if (grid.length > 0) {
					var ids = [];
					for(var i=0;i<grid.length;i++){
					  ids.push(grid[i].get('customerId'));
					}
					 myFind.query('textfield[name=customerId]')[0].setValue(ids);  //客户id
					 customerParamWin.close();
				}else{
					Ext.MessageBox.alert("提示"/*提示*/,"请选择客户！！");
				}
				
				
				
			}
		}],
		layout : 'fit',
		id:'customerParam_grid',
		store:customerStore,
		selType : 'checkboxmodel',
		selModel:{mode :'SIMPLE'},
		columns: [
		    {header : '序号',xtype : 'rownumberer',width:50,align : 'center'},
		    {text : '客户编号',dataIndex: 'customerId',align : 'center',width:230},
		    {text : '客户纳税人识别号',dataIndex: 'customerTaxno',align : 'center',width:270},
		    {text : '客户名称',dataIndex: 'customerCname',align : 'center',width:250},
		    {text : '客户纳税人类型',dataIndex: 'taxpayerType',align : 'center',width:250,renderer:function(value){
				/**
				 * 客户纳税人类型翻译
				 * @author liangshijun
				 * @updateDate  2018-1-10 18:48:47
				 */
				if(Ext.isEmpty(value)){
					return value;
				}
				return vmsTaxpayerType[value]['value'];
			}},
		    {text : '机构',dataIndex: 'instCode',align : 'center',width:250}],
		    dockedItems:{
		     	xtype:'jespaging',
		     	autoShow:true,
		     	store:customerStore,
		     	dock:'bottom',
		     	displayInfo:true
		    }
			/*dockedItems: [{
	            xtype: 'pagingtoolbar',
	            dock: 'bottom',
	            displayInfo: true,
	            store: customerStore　　　　// GridPanel中使用的数据
			}],*/
	  });
	var  customerSetform = new Ext.form.FormPanel({  
		width:850,  
	    height:600,  
	    id:"customerParamSet",
	    labelWidth:80,  
	    labelAlign:'right',  
	    frame:true,  
	    items:[customerSet,customerGrid]
		
	});  
var customerParamWin = new Ext.Window({  
	title:'客户查询',  
    layout:'fit',  
    width:850,  
    id:"customerWinParam",
    height:600,  
    modal:true,//设置是否添加遮罩
    draggable:true,//拖动
	resizable:false,	//变大小	
	autoScroll:false,
    items:[customerSetform] ,
    buttons:[{
		text : '关闭',
		iconCls : "close-icon",
		handler : function() {
			customerParamWin.close();
			
		}

	}]
});  

customerParamWin.show();
}
/**
 * 客户查询插件 
 * @author liangshijund
 * @updateDate 2018-1-8 14:46:38
 * @param myFind 组件容器  根据自己业务可扩展
 * @param customerField  当前选择的文本框（旧参数，暂无用，可默认为空）
 * @param flag 标志 preOpen-》预开新增编辑扩展  否则为页面查询  可默认为空，可扩展
 * @returns
 */

function setCustomer(myFind,customerField,flag){
	
	
	var treeStore = Ext.create('Ext.data.TreeStore', {
		proxy : {
			type : 'ajax',
			url : 'getLowerInstsTree.ajax?f=BSYS.0201.getInstsTree',
			reader : {
				type : 'json'
			}
		},
		root: {
            expanded: true
        },
        autoLoad : true,
        listeners:{
        	load:function (me, node, records, successful, eOpts ){
	        	var root = me.getRootNode();
	        	if(root.hasChildNodes()){
		        	var ssNode = root.getChildAt(0);
		        	ssNode.expand();
	        	}
        	}
        }
	});
	
	var customerStore = Ext.create("Ext.data.Store", {
	    fields : [  'customerId', 'customerCname', 'instCode', 'customerTaxno', 'customerNationality', 
        	'customerType','taxpayerType','fapiaoType','customerFapiaoFlag','dataSource','customerAddress','customerPhone','customerCbank','customerAccount'],
	    proxy : {
			type : 'ajax',
			url : 'queryListCustomer.ajax',
			reader : {
				type : 'json',
				root : 'dataList',
				totalProperty : 'total'
			}
		},
		autoLoad:true
	});
		
		
	var customerSet = new Ext.form.FieldSet({  
		columnWidth:.1,  
	    height:75,  
	    collapsible:true,
	    draggable:false,//拖动
	    layout:'column',  
	    border:true, 
	    xtype:'form',
	    anchor:'100%',  
	    labelWidth:45,  
	    items:[{  
	        layout:'column',  
	        border: false,
	        items:[{  
		        	fieldLabel: '机构',
					xtype: 'treepicker',
	        		store: treeStore,
				    displayField: 'text',
				    valueField: 'id',
				    labelAlign:'right',
				    name:'f.INST_CODE:eq',
				    id:'instCodeP',
					value:''
	        	},{
					xtype:'textfield',
					id:"customerNumP",
					fieldLabel:'客户编号',
					name:'f.CUSTOMER_ID:eq',
					labelAlign:'right',
					regex: /^[A-Za-z0-9]+$/,
					regexText: '客户编号为字母和数字组成'

				},{
					xtype:'textfield',
					id:"customerNameP",
					fieldLabel:'客户名称',
					name:'f.CUSTOMER_CNAME:like',
					labelAlign:'right',
					regex: /^[\u4E00-\u9FA5]+$/,
					regexText: '中文'
				},{
					xtype:'textfield',
					fieldLabel:'客户纳税人识别号',
					id:"customerTaxNumP",
					name:'f.CUSTOMER_TAXNO:eq',
					labelAlign:'right',
					regex:  /^[a-zA-Z0-9]{15,20}$/,
					regexText: '请输入15-20位纳税人识别号'
				},{
					xtype: 'combobox',
				    fieldLabel: '纳税人类型',
				    id:"taxpayerTypeP",
				    name:'f.TAXPAYER_TYPE:eq',
				    labelAlign: 'right',
				    queryMode: 'local',
				    displayField: 'value',
				    valueField: 'key',
				    store: Ext.create('Ext.data.Store', {
		                fields: ['key', 'value'],
		                data: vmsTaxpayerTypeList
		            }),
		            displayField : 'value',  
		            emptyText : '请选择',  
		            editable : false,  
		            selectOnFocus : true
				}]  
	    	  
	    }]  
	});  
	var customerGrid = new Ext.grid.GridPanel({
		xtype: 'grid',
		height:450,
		forceFit:true,
		tbar : [{
			text : '查询',
			iconCls : 'search-icon',
			handler : function(me) {
				var params={};
				params['f.INST_CODE:eq'] =Ext.getCmp('instCodeP').getValue();
				params['f.CUSTOMER_ID:eq'] = Ext.getCmp('customerNumP').getValue();
				params['f.CUSTOMER_CNAME:like'] = Ext.getCmp('customerNameP').getValue();
				params["f.CUSTOMER_TAXNO:eq"] =Ext.getCmp('customerTaxNumP').getValue();
				params['f.TAXPAYER_TYPE:eq'] =Ext.getCmp('taxpayerTypeP').getValue();
				customerStore.proxy.extraParams =params;
				customerStore.loadPage(1);
			}
		},{
			text : '确定',
			iconCls : 'user-icon',
			handler : function() {
				var grid = Ext.getCmp('customerParam_grid');
				var records = grid.getSelectionModel().getSelection();
				
				if(records.length<=0){
					Ext.Msg.show({  
					    title:'',  
					    msg: '请选择客户！！',  
					    buttons: Ext.Msg.OK,  
					    icon: Ext.Msg.WARNING     //注意此处为INFO  
					});  
				}else{
					var customer = records[0].data.customerCname;
					//预开
					if("preOpen"==flag){
						myFind.query('textfield[name=billInfo.customerCname]')[0].setValue(customer);   //客户名称
						myFind.query('textfield[name=billInfo.customerName]')[0].setValue(customer);  //客户纳税人名称
						myFind.query('textfield[name=billInfo.customerTaxno]')[0].setValue(records[0].data.customerTaxno);  //客户纳税人识别号
						myFind.query('textfield[name=billInfo.customerId]')[0].setValue(records[0].data.customerId);  //客户id
						var address=records[0].data.customerAddress==undefined?"":records[0].data.customerAddress;
						var phone=records[0].data.customerPhone==undefined?"":records[0].data.customerPhone;
						//客户地址电话
						myFind.query('textfield[name=billInfo.customerAddressandphone]')[0].setValue(address+phone);
						
						var bank=records[0].data.customerCbank==undefined?"":records[0].data.customerCbank;
						var account=records[0].data.customerAccount==undefined?"":records[0].data.customerAccount;
						//客户银行账号
						myFind.query('textfield[name=billInfo.customerBankandaccount]')[0].setValue(bank+account);
						
						myFind.query('textfield[name=billInfo.fapiaoType]')[0].setValue(records[0].data.fapiaoType);  //发票类型
					}else{
						myFind.down('panel').down('form').getForm().findField('billInfo.customerCname').setValue(customer);
						//myFind.down('panel').down('form').getForm().findField('f.CUSTOMER_ID:eq').setValue(records[0].data.customerId);
						//myFind.down('panel').down('form').getForm().getComponent("textfield[name=customerId]").setValue(records[0].data.customerId);
						//Ext.getCmp('toolbar').getComponent('customerId').setValue(records[0].data.customerId);
						//客户id
						
						if(myFind.down('panel').down('form').query('toolbar')[0].query('textfield[name="CUSTOMER_ID"]')[0]!=null){
							myFind.down('panel').down('form').query('toolbar')[0].query('textfield[name="CUSTOMER_ID"]')[0].setValue(records[0].data.customerId);
						}
						if(myFind.down('panel').down('form').query('toolbar')[0].query('textfield[name="customerId"]')[0]!=null){
							myFind.down('panel').down('form').query('toolbar')[0].query('textfield[name="customerId"]')[0].setValue(records[0].data.customerId);
						}
						if(myFind.down('panel').down('form').query('toolbar')[0].query('textfield[name="f.CUSTOMER_ID:eq"]')[0]!=null){
							myFind.down('panel').down('form').query('toolbar')[0].query('textfield[name="f.CUSTOMER_ID:eq"]')[0].setValue(records[0].data.customerId);
						}
						//myFind.down('panel').down('form').query('toolbar[name=toolbar]')[0].getComponent('customerId').setValue(records[0].data.customerId);
					}
					//customerField.setValue(customer);
					//myFind.query('textfield[name=billInfo.customerId]')[0].setValue(records[0].data.customerId);  //客户id
					customerParamWin.close();
					
				}
				
			}
		},/*{
			xtype: 'button',
			text : '重置',
			iconCls : "rules-icon",
			instWin:null,
			handler:function(me){
				
				me.up('form').getForm().reset();
			}},*/
			{text : '清除',
			iconCls : 'user-icon',
			handler : function() {
				customerParamWin.close();
				if("preOpen"==flag){
					myFind.query('textfield[name=billInfo.customerCname]')[0].setValue("");   //客户名称
					myFind.query('textfield[name=billInfo.customerName]')[0].setValue("");  //客户纳税人名称
					myFind.query('textfield[name=billInfo.customerTaxno]')[0].setValue("");  //客户纳税人识别号
					myFind.query('textfield[name=billInfo.customerId]')[0].setValue("");  //客户id
					//客户地址电话
					myFind.query('textfield[name=billInfo.customerAddressandphone]')[0].setValue("");
					//客户银行账号
					myFind.query('textfield[name=billInfo.bankandaccount]')[0].setValue("");
					
					myFind.query('textfield[name=billInfo.fapiaoType]')[0].setValue("");  //发票类型
				}else{
					myFind.down('panel').down('form').getForm().findField('billInfo.customerCname').setValue("");
					myFind.down('panel').down('form').query('toolbar[name=toolbar]')[0].getComponent('customerId').setValue("");
				}
				//customerField.setValue("");
			}
		}],
		id:"customerParam_grid",
		store: customerStore,
		selModel:{
		    selection: "rowmodel",
		    mode: "MULTI"
		},
		columns: [
		    {header : '序号',xtype : 'rownumberer',width:50,align : 'center'},
		    {text : '客户编号',dataIndex: 'customerId',align : 'center',width:230},
		    {text : '客户纳税人识别号',dataIndex: 'customerTaxno',align : 'center',width:270},
		    {text : '客户名称',dataIndex: 'customerCname',align : 'center',width:250},
		    {text : '客户纳税人类型',dataIndex: 'taxpayerType',align : 'center',width:250,renderer:function(value){
				/**
				 * 客户纳税人类型翻译
				 * @author liangshijun
				 * @updateDate  2018-1-10 18:48:47
				 */
				if(Ext.isEmpty(value)){
					return value;
				}else{
					for ( var i in vmsTaxpayerTypeList) {
					    if (value == vmsTaxpayerTypeList[i].key) {
						return value = vmsTaxpayerTypeList[i].value;
					    }
					}
				}
			}},
		    {text : '机构',dataIndex: 'instCode',align : 'center',width:250}],
		    dockedItems:{
		     	xtype:'jespaging',
		     	autoShow:true,
		     	store:customerStore,
		     	dock:'bottom',
		     	displayInfo:true
		    }
			/*dockedItems: [{
	            xtype: 'pagingtoolbar',
	            dock: 'bottom',
	            displayInfo: true,
	            store: customerStore　　　　// GridPanel中使用的数据
			}],*/
	  });
	var  customerSetform = new Ext.form.FormPanel({  
			width:850,  
		    height:600,  
		    id:"customerParamSet",
		    labelWidth:80,  
		    labelAlign:'right',  
		    frame:true,  
		    items:[customerSet,customerGrid]
			
		});  
	var customerParamWin = new Ext.Window({  
		title:'客户查询',  
	    layout:'fit',  
	    width:850,  
	    id:"customerWinParam",
	    height:600,  
	    modal:true,//设置是否添加遮罩
	    draggable:true,//拖动
		resizable:false,	//变大小	
		autoScroll:false,
	    items:[customerSetform] ,
	    buttons:[{
			text : '关闭',
			iconCls : "close-icon",
			handler : function() {
				customerParamWin.close();
				
			}

		}]
	});  
	
	customerParamWin.show();
}