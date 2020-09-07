Ext.require([
             'Ext.form.*',
             'Ext.tree.*',
             'Ext.grid.*',
             'Ext.window.Window',
             'Ext.ux.window.Notification',
             'Ext.ux.jes.PagingToolbar',
             'Sys.app.store.UserStore',
             'Sys.app.store.InstTreeStore',
             'Ext.tip.QuickTipManager',
             'Ext.ux.jes.NotOnlySpaceText'
            ]);

Ext.onReady(function() {
	Ext.tip.QuickTipManager.init();
	var treeInstId = null;
   var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';  
   var pageingStore=new Sys.app.store.UserStore();
   var instTreeStore = new Sys.app.store.InstTreeStore();
   var subStore = Ext.create('Ext.data.TreeStore',{
		fields:['id','text','ssId','ssName', 'ssOuterUrl', 'ssInnerUrl', 'ssRunningState', 'ssMenuVisible', 'ssIcon','ssDeafultPage'],
		proxy:{
			type: 'ajax',
			url: 'listSubSystem.ajax?f=BSYS.0102',
			reader:{
				type:'json'
			}
		}
	});
	subStore.load();
	
	var userRoleTreeStore = new Ext.create('Ext.data.TreeStore', {
		autoload:false,
		proxy : {
			type : 'ajax',
			url : 'getUserRoleTree.ajax?f=BSYS.0203',
			extraParams : {
				userId : ''
			},
			reader : {
				type : 'json'
			}
		}
	});
	
	var instStore = Ext.create('Ext.data.Store',{
		fields:['instId','instName']
//		data:instIdStore
	});
	
	var departStore = Ext.create('Ext.data.Store',{
		fields:['departId','departName'],
		data:departIdStore
	});
	var invoiceTaxStroe = Ext.create('Ext.data.Store',{
		fields:['key','value'],
		data:invoiceTaxControlStroe
	});
Ext.define('Sys.com.Window', {
                                    extend : 'Ext.window.Window',
									height : 700,
									width : 450,
									layout : 'fit',
									modal:true,
									constrainHeader : true,
									items : {
										xtype : 'form',
										layout:'column',
										name:'form',										
										autoScroll : true,
										frame : true,
										items : [{
											xtype : 'fieldset',
											title : listUser_jbxx,/*基本信息*/
											width:400,
											layout:'form',
											items : [
											{
										        xtype:'nostextfield',
												fieldLabel : listUser_yhbh,/*用户编号*/
												name : 'userId',
												itemId : 'USER_ID',
												allowBlank : false,
												editable:false,
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right',
												maxLength:20,
												afterLabelTextTpl : required,
												validator:function(){
													var value = this.getValue();
													var reg = /^\w+$/;
													if(reg.test(value)){
														return true;
													}else{
														return listUser_bnhyhzhfh;/*不能含有汉字和特殊符号！*/
													}
												}
											}
											,{
												xtype:'nostextfield',
												fieldLabel : listUser_yhywm,/*用户英文名*/
												name : 'userEname',
												itemId : 'USER_ENAME',
												allowBlank : false,
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right',
												maxLength:20,
												afterLabelTextTpl : required,
												validator:function(){
													var value = this.getValue();
													var reg =  /^[-_a-z A-Z]+$/;
													if(reg.test(value)){
														return true;
													}else{
														return listUser_bnhyhz;/*不能含有汉字！*/
													}
												}
											}
											, {
												xtype:'nostextfield',
												fieldLabel : listUser_yhzwm,/*用户中文名*/
												name : 'userCname',
												itemId : 'USER_CNAME',
												allowBlank : false,
												height:25,
												padding:'1,1,1,1',
												maxLength:40,
												afterLabelTextTpl : required,
												labelAlign:'right',
												validator:function(){
													var value = this.getValue();
//													var reg = /^[\u4E00-\u9FA5]+$/;
													var reg = /^[-_\u4E00-\u9FA5a-zA-Z0-9]+$/;
													if(value){
														if(reg.test(value)){
															return true;
														}else{
															return listUser_qsrzw;/*请输入中文！*/
														}
													}else{
														return true;
													}
												}
											}
											,{
												xtype:'combobox',
												fieldLabel:listUser_nmmcbh,/*部门名称或编号*/
												name:'departId',
												itemId : 'DEPART_ID',
												store:departStore,
												displayField:'departName',
												valueField:'departId',
												editable:false,
												height:25,
												maxLength:40,
												padding:'1,1,1,1',
												labelAlign:'right'
//												afterLabelTextTpl : required,
//												allowBlank : false
											}
											,{
												xtype:'textfield',
												fieldLabel : listUser_yhssjg,/*用户所属机构*/
												name : 'instId',
												itemId : 'INST_ID',
												allowBlank : false,
												displayField:'instName',
												valueField:'instId',
												height:25,
												readOnly:true,
												editable:false,
												padding:'1,1,1,1',
												labelAlign:'right'
											}
											,{
												xtype:'combobox',
												fieldLabel:listUser_yhkjsksb,/*用户开具税控设备*/
												name:'invoiceTaxControl',
												itemId : 'INVOICE_TAX_CONTROL',
												store:invoiceTaxStroe,
												displayField:'value',
												valueField:'key',
												editable:false,
												height:25,
												maxLength:40,
												padding:'1,1,1,1',
												labelAlign:'right',
												hidden:vmskpRelyon
//												afterLabelTextTpl : required,
//												allowBlank : false
											}]
										},{
											xtype : 'fieldset',
											width:400,
											layout:'form',
											title : listUser_lxfs,/*联系方式及住址*/
												items : [
													{
														xtype:'textfield',
														fieldLabel : listUser_zjdh,	/*座机电话*/									
														name : 'tel',
														itemId : 'TEL',
														height:25,
														padding:'1,1,1,1',
														labelAlign:'right',
														regexText : listUser_gsw,/*格式为 XXXX-XXXXXXX*/
														editable : true,
														regex :/^([0][1-9]\d{1,2}-)[1-9]\d{6,7}$/
													},{
														xtype:'textfield',
														fieldLabel : listUser_sjh,/*手机号*/										
														name : 'mobile',
														itemId : 'MOBILE',
														height:25,
														padding:'1,1,1,1',
														labelAlign:'right',
														regexText : listUser_dhhm,/*请输入正确的电话号码*/
														regex : /^1[3|4|5|7|8][0-9]\d{4,8}$/
													},{
														xtype:'textfield',
														fieldLabel : listUser_dz,/*地址*/									
														name : 'address',
														itemId : 'ADDRESS',
														height:25,
														maxLength:120,
														padding:'1,1,1,1',
														labelAlign:'right'
													},{
														xtype:'textfield',
														fieldLabel : listUser_yx,	/*邮箱*/									
														name : 'email',
														itemId : 'EMAIL',
														height:25,
														padding:'1,1,1,1',
														labelAlign:'right',
														regex : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
														regexText : listUser_qsryx/*请输入正确的邮箱地址*/
													},{
														xtype:'textfield',
														fieldLabel : listUser_ms,		/*描述*/								
														name : 'description',
														itemId : 'DESCRIPTION',
														height:25,
														maxLength:120,
														padding:'1,1,1,1',
														labelAlign:'right'
													}
												]
										},{
											xtype : 'fieldset',
											title : listUser_dlxx,/*登录信息*/
											width:400,
											layout:'form',
											name : 'entry',
											items : [{
												xtype:'textfield',
												fieldLabel : listUser_zhxgmmrq,/*最后修改密码日期*/										
												name : 'lastModifyDate',
												itemId : 'LAST_MODIFY_DATE',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_sfscdl,/*是否为首次登录*/										
												name : 'isFirstLogin',
												itemId : 'IS_FIRST_LOGIN',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_srmmcw,	/*输入密码错误次数*/									
												name : 'wrongPwdCount',
												itemId : 'WRONG_PWD_COUNT',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_zhdlsj,/*最后登录时间*/
												format : 'Y-m-d',
												name : 'lastLoginDate',
												itemId : 'LAST_LOGIN_DATE',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_scmmzhsj,	/*输错密码最后时间*/									
												name : 'wrongPwdDate',
												itemId : 'WRONG_PWD_DATE',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											}]
										},{
											xtype : 'fieldset',
											title : listUser_yhcjxx,/*用户创建信息*/
											width:400,
											layout:'form',
											name:'createInfo',
											items : [{
												xtype:'textfield',
												fieldLabel : listUser_cjsj,/*创建时间*/
												format : 'Y-m-d',
												name : 'createTime',
												itemId : 'CREATE_TIME',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_kssj,	/*开始时间*/
												format : 'Y-m-d',
												name : 'startDate',
												itemId : 'START_DATE',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_jssj,/*结束时间*/
												format : 'Y-m-d',
												name : 'endDate',
												itemId : 'END_DATE',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_sfqybs,/*是否启用标识*/
												name : 'enaBled',
												itemId : 'ENABLED',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_sfczmm,/*是否重置密码*/
												name : 'passwordInited',
												itemId : 'PASSWORD_INITED',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											}]
										},{
											xtype : 'fieldset',
											title : listUser_yhztxx,/*用户状态信息*/
											name : 'buff',
											width:400,
											layout:'form',
											items : [{
												xtype:'textfield',
												fieldLabel : listUser_sfsdyh,/*是否锁定用户*/
												name : 'isuserLocked',
												itemId : 'IS_USER_LOCKED',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_sdyy,/*锁定原因*/
												name : 'userlockedReson',
												itemId : 'USER_LOCKED_RESON',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_sfgzr,/*是否工作日*/
												name : 'workState',
												itemId : 'WORK_STATE',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_xgzt,/*修改状态*/
												name : 'changeStatus',
												itemId : 'CHANGE_STATUS',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											},{
												xtype:'textfield',
												fieldLabel : listUser_sfsc,/*是否删除*/
												name : 'isDelete',
												itemId : 'IS_DELETE',
												height:25,
												padding:'1,1,1,1',
												labelAlign:'right'
											}]
										},{
											xtype : 'fieldset',
											title : listUser_qt,/*其他*/
											name  : 'Otherthing',
											width:400,
											layout:'form',
												items : [{
													xtype:'textfield',
													fieldLabel : listUser_xgr,/*修改人*/
													name : 'changeUser',
													itemId : 'CHANGE_USER',
													height:25,
													padding:'1,1,1,1',
													labelAlign:'right'
												},{
													xtype:'textfield',
													fieldLabel : listUser_shr,/*审核人*/
													name : 'checkUser',
													itemId : 'CHECK_USER',
													height:25,
													padding:'1,1,1,1',
													labelAlign:'right'
												},{
													xtype:'textfield',
													fieldLabel : listUser_scdlip,/*上次登入的IP*/
													name : 'lastLoginIp',
													itemId : 'LAST_LOGIN_IP',
													height:25,
													padding:'1,1,1,1',
													labelAlign:'right'
												}]
										}],
										buttons : [{
											text : listUser_bc,/*保存*/
											name:'submit',
											formBind : true,
											disabled : true											
										}]
									}										
});
	
	pageingStore.proxy.extraParams = {
		instId : instId
	};
	pageingStore.loadPage(1);
								
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		defaults :{
			split :true
		},
		items : [{
					region : 'west',
					collapsible : true,
					xtype : 'treepanel',
					title : listUser_jgxx,/*机构信息*/
					flex:1,
					store : instTreeStore,
					opState:'list',//move
					treeInstId : null,
					rootVisible : false,
					listeners : {
						itemclick : function(tree, record, item, index, e,eOpts) {
							var opState=record.store.ownerTree.opState || '';
							if(opState=='list'){
								treeInstId = record.raw.id;
								pageingStore.proxy.extraParams = {
									instId : record.raw.id
								};
								pageingStore.loadPage(1);
							}else{
//								newPid=record.raw.id;
//								if(treeStore.getNodeById(newPid).hasChildNodes()){
//									treeStore.getNodeById(newPid).collapse();
//								}
//								if(treeInstId==newPid){
//									Ext.Msg.alert('提示','自己不能移动在本身节点下');
//									record.store.ownerTree.opState='list';
//									return;
//								}
								var recordCount = Ext.getCmp('centerFrame').getSelectionModel().getSelection().length;
								var selectRecords = Ext.getCmp('centerFrame').getSelectionModel().getSelection();
								var uIds =[];
								for (var i = 0; i < recordCount; i++) {
									var uId = selectRecords[i].get('USER_ID');
									uIds.push(uId);
								}
								Ext.MessageBox.confirm(listUser_ts/*提示*/,listUser_qdyhyd+'【'+record.raw.text+'】'+listUser_jggx/*确定要将所选用户移动到【'+record.raw.text+'】节机构下吗?*/,function(obj){
									if(obj=='yes'){
										Ext.Ajax.request({
											url:'modUserInstByPrimaryKey.ajax?f=BSYS.0203.edit',
											params:{
												uIds : uIds,
												instId : record.raw.id
											},
											success:function(response){
												var text=Ext.decode(response.responseText);
												jesAlert(text);
												record.store.ownerTree.opState='list';
												pageingStore.proxy.extraParams = {
														instId : record.raw.id
													};
												pageingStore.loadPage(1);
											}
										});
									}else{
										record.store.ownerTree.opState='list';
									}
								});
							}
						}
					}

				}, {
					region : 'center',
					xtype : 'gridpanel',
					flex:4,
					id : 'centerFrame',					
					title : listUser_dqwz+'：'+path,/*当前位置*/
					selType : 'checkboxmodel',
					selModel:{mode :'SIMPLE'},
					tbar : {
						xtype : 'container',
						items : [new Ext.Toolbar({
									items : [{
												xtype : 'tbspacer',
												width: 10
											},listUser_yhbh+':'/*用户编号*/,{
												xtype : 'textfield',
												name : 'f.t.user_id:like',
												id : 'user_Id',
												flex:1,
												regexText : listUser_srzykg,/*输入的值有空格*/
												regex : /^(?:(?!\s).){1,}$/
											}, {
												xtype : 'tbspacer',
												width: 10
											},/* {
												xtype : 'textfield',
												name : 'f.user_ename:like',
												fieldLabel:'用户英文名',
												labelWidth:70,
												id : 'userEname',
												flex : 6,
												regexText : '输入的值有空格',
												regex : /^(?:(?!\s).){1,}$/
											}, {
												xtype : 'tbspacer',
												flex : 1
											}, */listUser_yhzwm+':'/*用户中文名*/,{
												xtype : 'textfield',
												name : 'f.t.user_cname:like',
												id : 'userCname',
												flex : 1,
												regexText : listUser_srzykg,/*输入的值有空格*/
												regex : /^(?:(?!\s).){1,}$/
											}, {
												xtype : 'tbspacer',
												width: 10
											},{
												width: 60,
												text : listUser_cx,/*查询*/
												iconCls : "search-icon",
												handler : function() {
															var me=this;	
															var params={};
										    		        var fs=Ext.ComponentQuery.query('field', me.up('toolbar'));  
											    			for(var i in fs){
											    				params[fs[i].name]=fs[i].getValue();
											    			}
											    			pageingStore.proxy.url='queryUser.ajax?f=BSYS.0203.query';
													    	pageingStore.proxy.extraParams =params;
													    	pageingStore.loadPage(1);
												}
											}, {
												xtype : 'tbspacer',
												flex :2
											}]
								}), new Ext.Toolbar({
							items : [{
								text : listUser_zj,/*增加*/
								iconCls : "add-icon",
								handler : function() {
									if (treeInstId) {
										var temp = pageingStore.proxy.extraParams.instId;
										if(temp){
											instId = temp;
										}																				
										var addWindow = new Sys.com.Window();		
									    addWindow.setTitle(listUser_zjyh);/*增加用户*/
									    addWindow.setHeight(360);
									    addWindow.down('textfield[name=instId]').setValue(instId);
									    addWindow.down('textfield[name=instId]').setReadOnly(true); 
									    addWindow.down('fieldset[name=entry]').hidden = true;
									    addWindow.down('fieldset[name=buff]').hidden = true;
									    addWindow.down('fieldset[name=Otherthing]').hidden = true;
									    addWindow.down('fieldset[name=createInfo]').hidden = true;
									    var isVisible=['lastModifyDate','isFirstLogin','wrongPwdDate','lastLoginDate','wrongPwdCount','startDate','endDate'];
									    for(var i in isVisible){
									    	addWindow.down('textfield'+'[name='+isVisible[i]+']').setVisible(false);
									    }
									    addWindow.down('button[name=submit]').setHandler(function(){
									    	var form = this.up('form').getForm();
											if (form.isValid()) {
												form.submit({
													url : 'addUser.ajax?f=BSYS.0203.add',
													success : function(form,action) {
														jesAlert(listUser_tjcg+"...");/*添加成功*/
														pageingStore.loadPage(1);
														addWindow.close();
													},
													failure : function(form,action) {
														Ext.MessageBox.alert(listUser_cw,action.result.msg);/*错误*/
													}
												});
											}
									   }); 
									   addWindow.show();
									} else {
										Ext.MessageBox.alert(listUser_ts/*提示*/,listUser_qxzxyxzjg);/*请选择需要新增的机构*/
									}
								}								
							}, '', {
								text : listUser_sc,/*删除*/
								iconCls : "delete-icon",
								handler : function() {
									var recordCount = Ext.getCmp('centerFrame')
											.getSelectionModel().getSelection().length;
									if (recordCount == 0) {
										Ext.MessageBox.alert(listUser_ts/*提示*/,listUser_qxzscyh);/*请选择要删除的用户！*/
									} else {
										Ext.MessageBox.confirm(listUser_ts/*提示*/,listUser_nqdsc,function(obj) {/*您确定要删除吗?*/
											if(obj=='yes'){
												var selectRecords = Ext
														.getCmp('centerFrame')
														.getSelectionModel()
														.getSelection();
												var uIds =[];
												for (var i = 0; i < recordCount; i++) {
													var uId = selectRecords[i].get('USER_ID');
													if(uId=='admin'){
														Ext.MessageBox.alert(listUser_ts/*提示*/,listUser_yhbnbsc);/*用户【admin】不能被删除*/
														return;
													}
													uIds.push(uId);
												}	
												Ext.Ajax.request({
													url : 'removeUser.ajax?f=BSYS.0203.remove',
													params : {
														uIds : uIds
													},
													success : function(response) {
														pageingStore.loadPage(1);
													}
												});
											}
										});
									}
								}
							}, '',{
								text:listUser_dr,/*导入*/
								iconCls : "import-icon",
								hidden:isSysAdmin,
								handler:function(){
									Ext.create('Ext.window.Window',{
										title:listUser_drwj,/*导入Excel文件*/
										width:400,
										constrain: true,
										modal: true,
										height:100,
										frame:true,
										items:{
											xtype:'form',
											layout:'form',
											name:'importExcel',
											items:[{
												xtype:'fileuploadfield',
												name:'importPath',
												fieldLabel:listUser_wj,/*文件*/
												labelWidth:60,
												labelAlign:'right',
												msgTarget:'fileName',
												allowBlank:false,
												anchor:'98%',
												msgTarget: 'side',
												validator: function(val){
													var temp = val.split(".");
													var name = temp[temp.length-1];
													if(name =='xls'|| name == 'xlsx'){
														return true;
													}
													return listUser_qxzwj;/*请选择xls或xlsx文件*/
												},												
												buttonText:listUser_ll+'....'/*浏览*/
											}],
											buttons:[{
												
												text:listUser_dr,/*导入*/
												align:'center',
												//formBind: true,
												handler:function(){
													var me = this;
													var form = Q('form[name=importExcel]').getForm();
													if(form.isValid()){
														form.submit({
															url:'importExcel.do?f=BSYS.0203.importExcel',
															method:'post',
															enctype:'multipart/form-data',
															waitMsg:listUser_zxdrwj+'.......',/*正在导入文件，请耐心等待*/
															success:function(form,action){
																jesAlert(action.result.msg);
																me.up('window').close();
																pageingStore.loadPage(1);
															},
															failure:function(form,action){
																jesErrorAlert(action.result.msg);
																me.up('window').close();
															}
															
														});
													}
												}
											},{
												text:listUser_qx,/*取消*/
												align:'center',
												handler:function(){
													this.up('window').close();
												}
											}]
											
										}
									}).show();
								}
							},'', {
								text : listUser_dc,/*导出*/
								iconCls : "export-icon",
								handler : function() {
									var temp = pageingStore.proxy.extraParams.instId;
									if(temp){
										instId = temp;
									}
									var ifameX = document.getElementById('download').contentWindow;
									ifameX.open('exportUserExcel.do?f=BSYS.0203&instId='+instId, '_self');
									
								}
							},'', {
								text : '导出(角色)',
								iconCls : "export-icon",
								handler : function() {
									var temp = pageingStore.proxy.extraParams.instId;
									if(temp){
										instId = temp;
									}
									var ifameX = document.getElementById('download').contentWindow;
									ifameX.open('exportUserExtract.do?f=BSYS.0203&instId='+instId, '_self');
									
								}
							},'',{
								text : listUser_yd,/*移动*/
								iconCls:'hide-right-icon',
								handler:function(){
									var me=this;
									var recordCount = Ext.getCmp('centerFrame').getSelectionModel().getSelection().length;
									if (recordCount == 0) {
										Ext.MessageBox.alert(listUser_ts/*提示*/,listUser_qxzdyyh);/*请选择要移动的用户！*/
									} else {	
										var node=me.up('gridpanel').ownerCt.down('treepanel');
										node.opState='move';
										jesAlert(listUser_qxzmbjg,null,'t');/*请左侧机构树中选择目标机构！*/
									}
								}
							},'',{
								text : '\u63d0\u4ea4\u5ba1\u6838',/*提交审核*/
								iconCls:'flag-green-icon',
								hidden:fourEyesSenior!='Y',
								handler:function(){
									var me=this;
									var datas = Ext.getCmp('centerFrame').getSelectionModel().getSelection();
									var users=[];
									for(var d in datas){
										users.push({'userId':datas[d].get('USER_ID'),'userCname':datas[d].get('USER_CNAME')});
									}
									Ext.Ajax.request({
										url : 'submitEyesUser.ajax?f=BSYS.0203.submitEyesUser',
										jsonData:users,
										success : function(response) {
											var result = Ext.decode(response.responseText);
											result.success?jesAlert("listUser_yjtjsh"):jesAlert(result.message);/*已经提交审核*/
											pageingStore.loadPage(pageingStore.currentPage);
										},
										failure: function(response, opts) {
											jesAlert('listUser_fwljsb' /*服务连接失败，状态码*/+ response.status);
										}
									});
								}
							}]
						})]
					},
					layout : 'fit',
					store : pageingStore,
					columns : [{ header: listUser_xh/*序号*/, xtype: 'rownumberer', width:40, align: 'center'},
					           {
								text : listUser_yhbh/*用户编号*/,
								align:'center',
								dataIndex : 'USER_ID'
							},{
								text : listUser_yhzwm/*用户中文名*/,
								dataIndex : 'USER_CNAME',
								flex:3
							},{
								text : listUser_bm/*部门ID*/,
								dataIndex : 'DEPART_ID',
								flex:3,
								align:'center'
							},{
								text : listUser_jg/*机构ID*/,
								dataIndex : 'INST_ID',
								flex:3,
								align:'center'
							},{
								text:listUser_sj/*手机*/,
								dataIndex:'MOBILE',
								flex:3,
								align:'center'
							},{
								text:listUser_yx/*邮箱*/,
								dataIndex:'EMAIL',
								flex:3,
								align:'center'
							},{
								text:listUser_zt,/*状态*/
								dataIndex:'EYES_STAT',
								hidden:fourEyesSenior!='Y',
								flex:3,
								align:'center'
							},{
								text : listUser_cz,/*操作*/
								xtype:'actioncolumn',
								width: 140,
								align:'center',
								items:[{
									tooltip: listUser_ck,/*查看*/
									iconCls: 'look-icon',
					                handler: function(grid, rowIndex, colIndex) {
					                	var checkdWindow = new Sys.com.Window();
					                	checkdWindow.setTitle(listUser_ckyh);/*查看用户*/
					                	checkdWindow.setHeight(460);
					                	var fields=Ext.ComponentQuery.query('field',checkdWindow);  
									    for(var f in fields){
									    	var name = fields[f].itemId;
									    	fields[f].setValue(grid.getRecord(rowIndex).get(name));
									    };
									    checkdWindow.down('button[name=submit]').setVisible(false);
									    checkdWindow.show();
					                }
								},{
									iconCls: ''
								},{
									tooltip: listUser_xg,/*修改*/
					                iconCls: 'edit-icon',
					                handler: function(grid, rowIndex, colIndex) {
									    var updateWindow = new Sys.com.Window();
									    updateWindow.setTitle(listUser_xgyh);/*修改用户*/
									    updateWindow.setHeight(420);
									    updateWindow.down('fieldset[name=entry]').hidden = true;
									    updateWindow.down('fieldset[name=buff]').hidden = true;
									    updateWindow.down('fieldset[name=Otherthing]').hidden = true;
									    updateWindow.down('fieldset[name=createInfo]').hidden = true;
									    var isVisible=['lastModifyDate','isFirstLogin','wrongPwdDate','lastLoginDate','wrongPwdCount','startDate','endDate'];
									    for(var i in isVisible){
									    	updateWindow.down('textfield'+'[name='+isVisible[i]+']').setVisible(false);
									    }
									    var fields=Ext.ComponentQuery.query('field',updateWindow);  
									    for(var f in fields){
									    	var name = fields[f].itemId;
									    	fields[f].setValue(grid.getRecord(rowIndex).get(name));
									    };
									    updateWindow.down('textfield[name=instId]').setFieldStyle('background:#f1f1f1');
									    updateWindow.down('textfield[name=userId]').setReadOnly(true);
									    updateWindow.down('textfield[name=userId]').setFieldStyle('background:#f1f1f1');
									    updateWindow.down('button[name=submit]').setHandler(function(){
									   	var form = this.up('form').getForm();
													if (form.isValid()) {
														form.submit({
															url : 'editByPrimaryKey.ajax?f=BSYS.0203.edit',
															success : function(form,action) {																
																jesAlert(listUser_xgcg+"...");/*修改成功*/
																pageingStore.loadPage(1);
																updateWindow.close();
															},
															failure : function(form,action) {
																jesAlert(listUser_xgsb+"...");/*修改失败*/
																updateWindow.close();
															}
														});
													}
									   }
									   ); 
									    updateWindow.show();									    									 
					                }					            
					            },{
									iconCls: ''
								},{
									tooltip: listUser_shgly,/*设置管理员*/
									iconCls: 'setting-icon',  
					                handler: function(grid, rowIndex, colIndex) {
					                	var userId = grid.getRecord(rowIndex).get('USER_ID');
					                	
					                	 var ssAdminsStore = Ext.create('Ext.data.Store',{
					                			fields:['ssId'],
					                			proxy:{
					                				type: 'ajax',
					                				url: 'getSsAdminsByUserId.ajax?f=BSYS.0203',
					                				reader:{
					                					type:'json',
					                					root:'ssAdmins'
					                				},
					                				extraParams:{
					                					userId:userId
					                				}
					                			}
					                		});
					                	 ssAdminsStore.load(function(){
					                		 Ext.create('Ext.window.Window', {
									    			extend : 'Ext.window.Window',   
									    			title: listUser_g+'['+userId+']'+listUser_pzywgly,/*给['+userId+']配置业务管理员*/
									    			width : 750,
									    			constrainHeader: true,
									    			modal: true,
									    			height : 400,
									    			layout: {
											        	type: 'hbox',
											            align: 'stretch'
											        },
									    			items:[{
									    				xtype:'treepanel',
									    				rootVisible: false,
									    				title:listUser_zxtlb,/*子系统列表(双击可添加)*/
									    				flex:1,
									    				store:subStore,
									    				columns:[
									    				         {text:listUser_xtywm/*系统英文名*/ , flex: 1, xtype: 'treecolumn',dataIndex:'ssId'},
									    				         {text:listUser_xtzwm/*系统中文名*/ ,flex: 1, dataIndex:'ssName'}],
							    				        listeners:{
										    				itemdblclick:function(me, record, item, index, e, eOpts){
										    					var ssId=record.data.ssId;
										    					if(record.data.leaf){
											    					Ext.Ajax.request({
																		url : 'addBusAdmin.ajax?f=BSYS.0203',
																		params:{
																			ssId:ssId,
																			userId:userId
																		},
																		success : function(response) {
																			var text = Ext.decode(response.responseText);
																			if (text == 'true') {
																				ssAdminsStore.load();
																			}
																		}
											    					});
										    					}else{
										    						jesAlert(listUser_qxzzxt);/*请选择子系统*/
										    					}
										    				}
										    			}
									    			},{
									    				xtype:'gridpanel',
									    				title:listUser_yhgl,/*用户管理的子系统*/
									    				store:ssAdminsStore,
									    				flex:1,
									    				columns:[{ header: listUser_xh/*序号*/, xtype: 'rownumberer', width:40, align: 'center'},
									    				         {text:listUser_xtm/*系统名*/, dataIndex:'ssId', align:'center'},
									    				         {text:listUser_sc/*删除*/,xtype:'actioncolumn', align:'center',iconCls : "delete-icon",
										    				         handler:function(grid, rowIndex, colIndex){
										    				        	 var ssId = grid.getRecord(rowIndex).get('ssId');
										    				        	 Ext.Ajax.request({
																				url : 'deleteBusAdmin.ajax?f=BSYS.0203',
																				params:{
																					ssId:ssId,
																					userId:userId
																				},
																				success : function(response) {
																					var text = Ext.decode(response.responseText);
																					if (text == 'true') {
																						ssAdminsStore.load();
																					}
																				}
													    					});
										    				         }
									    				         }]
									    			}]
							                	}).show();
					                	 });
					                	
					                }
								},{
									iconCls: ''
								},{
									tooltip: listUser_qxck,/*权限查看*/
									iconCls: 'look-icon',  
					                handler: function(grid, rowIndex, colIndex) {
				                		if(userRoleTreeStore.getRootNode()){
				                 			userRoleTreeStore.getRootNode().removeAll();
				                		}
					                	userRoleTreeStore.proxy.extraParams = {userId : grid.getRecord(rowIndex).get('USER_ID')};
					                	userRoleTreeStore.load({
						                	params : {
												node : 'root'
											}
					                	});
					                	if (this.up('viewport').getComponent('userRoleTree').collapsed != false) {
					                		this.up('viewport').getComponent('userRoleTree').expand();
					                	}
					                }
								}]
							}],
					dockedItems : [{
								xtype : 'jespaging',
								store : pageingStore,
								dock : 'bottom',
								displayInfo : true
							}]
				},{
					region : 'east',
					collapsible : true,
					collapsed : true,
					itemId : 'userRoleTree',
					xtype : 'treepanel',
					title : listUser_qxxx,/*权限信息*/
					flex:1,
					store : userRoleTreeStore,
					rootVisible : false
				}]
	});
});