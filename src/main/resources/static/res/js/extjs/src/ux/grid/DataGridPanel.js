Ext.require('Ext.ux.jes.PagingToolbar');
Ext.require('Ext.ux.jes.QueryToolbar');
Ext.define('Ext.ux.grid.DataGridPanel', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.datagridpanel',
	initComponent : function() {
		var me = this;
		var columnsArr = me.gridColumns;
		var fieldArr = me.gridStoreFields;
		var comboxdata = me.comboxdata;
		var url = 'getGridwindowStore'+(me.version || '')+'.ajax?ssId=' + me.ssId;
		var store = Ext.create('Ext.data.Store', {
			fields : fieldArr,
			autoLoad : true,
			proxy : {
				type : 'ajax',
				url : url,
				extraParams : {
					'sqlId' : me.sqlId,
					'fieldValue' : me.gridVal,
					'name' : me.gridName,
					'selectname' : '',
					'selectvalue' : ''
				},
				reader : {
					type : 'json',
					root : 'datas',
					total : 'total'
				}
			}
		});
		if (Ext.isDefined(me.queryFieldStoreData)) {
			this.tbar = {
				xtype : 'querytoolbar',
				queryFieldStoreData : me.queryFieldStoreData
			}
		} else {
			var comboxStore = Ext.create('Ext.data.Store', {
				fields : [ 'ZSZD', 'ZSZD_ID' ],
				data : comboxdata
			});
			this.tbar = {
				xtype : 'form',
				items : [ new Ext.Toolbar({
					items : [
							{
								xtype : 'combobox',
								name : 'CXTJ',
								fieldLabel : '查询条件',
								labelAlign : 'right',
								store : comboxStore,
								editable : false,
								displayField : 'ZSZD',
								valueField : 'ZSZD_ID',
								size : 50
							},
							{
								xtype : 'textfield',
								name : 'CXZ',
								labelAlign : 'right',
								labelWidth : 50,
								fieldLabel : '查询值',
								maxLength : 20,
								enforceMaxLength : true
							},
							' ',
							{
								text : '查询',
								iconCls : "search-icon",
								handler : function() {
									var combox = this.up('form').down(
											'combobox[name=CXTJ]');
									var selectname = '';
									if (Ext.isEmpty(combox.getStore().first()
											.get('ZSZD_ID'))) {
										for ( var j in fieldArr) {
											if (fieldArr[j].indexOf(combox
													.getDisplayValue()) != -1) {
												selectname = fieldArr[j];
											}
										}
									} else {
										selectname = combox.getValue()
									}
									var selectvalue = this.up('form').down(
											'field[name=CXZ]').getValue();
									var params = {
										'sqlId' : me.sqlId,
										'fieldValue' : "",
										'name' : me.gridName,
										'selectname' : selectname,
										'selectvalue' : selectvalue
									};
									store.proxy.extraParams = params;
									store.loadPage(store.currentPage);
								}
							}, {
								text : '重置',
								iconCls : "undo-icon",
								handler : function() {
									this.up('form').form.reset();
								}
							},
							'->'
							,{
								xtype:'label',
								name : 'detailData',
								style : 'color:blue;font-weight:bold;'
							} ]
				}) ]
			}
		}
		this.store = store;
		this.selType = 'checkboxmodel';
		this.selModel = Ext.isEmpty(me.selModel) ? {
			mode : 'SIMPLE'
		} : me.selModel;
		this.columns = columnsArr;
		this.dockedItems = {
			xtype : 'jespaging',
			autoShow : true,
			store : store,
			dock : 'bottom',
			displayInfo : true
		}
		
		this.listeners= {
	        cellclick: function(theGrid, td, cellIndex, record, tr, rowIndex, e, eOpts){
	        	theGrid.up('window').down('datagridpanel').down('label[name=detailData]').setText(td.innerText);
	        }
		}

		this.callParent();
	}
});
