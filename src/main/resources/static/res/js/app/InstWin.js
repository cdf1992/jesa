Ext.require(['Ext.data.*',
			'Ext.ux.jes.NotOnlySpaceText'
]);
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
var enAbledStore = Ext.create('Ext.data.Store',{
	fields:['identifier','name'],
	data:[{"identifier":"Y","name":"是"},
		 {"identifier":"N","name":"否"}]
});
Ext.define('Sys.app.InstWin', {
	extend : 'Ext.window.Window',
	width : 500,
	height : 460,
	constrainHeader: true,
	constrain: true,
	modal : true,
	bodyPadding : 1,
	buttonAlign:'center',
	layout:'fit',
	setProperty:function(f){
		if(f=='query'){
			this.setTitle(instWin_jgxxxx/*'机构详细信息'*/);		
			this.down('#instId').readOnly=true;
			this.down('#instName').readOnly=true;
			this.down('#instSmpName').readOnly=true;
			this.down('#parentInstId').readOnly=true;
			this.down('#instLayer').readOnly=true;
			this.down('#legalPersonFlag').readOnly=true;
			this.down('#headquartersFlag').readOnly=true;
			this.down('#managerFlag').readOnly=true;
			this.down('#legalPersonType').readOnly=true;
			this.down('#zip').readOnly=true;
			this.down('#enabled').readOnly=true;
			this.down('#instRegion').readOnly=true;
			this.down('#address').readOnly=true;
			this.down('#tel').readOnly=true;
			this.down('#fax').readOnly=true;
			this.down('#orderNum').readOnly=true;
			this.down('#description').readOnly=true;
			this.down('#startDate').readOnly=true;
			this.down('#endDate').readOnly=true;
			this.down('#submit').disabled=true;
			this.down('#parentInstId').readOnly=true;
			this.down('#pbocInstCode14').readOnly=true;
			this.down('#instLicenceCode').readOnly=true;
			this.down('#legalPersonCode').readOnly=true;
			this.down('#stdInstCode').readOnly=true;
			this.down('#taxpayerIdentificationId').readOnly=true;
		}else if(f=='edit'){
			this.setTitle(instWin_xxjg/*'修改机构'*/);		
			this.down('#instId').readOnly=true;
		}else if(f=='add'){
			this.setTitle(instWin_tjjg/*'添加机构'*/);		
			this.down('#instId').readOnly=false;
			this.down('#parentInstId').readOnly=true;
		}
	},
	items:{
					xtype:'form',
					autoScroll:true,
					frame:true,
					bodyPadding : 10,
					layout:'column',
					items : [{
								xtype : 'fieldset',
								title : instWin_jbxx/*'基本信息'*/,
								defaultType : 'textfield',
								width:400,
								layout:'form',
								items : [{
											xtype : 'nostextfield',
											width:300,
								        	//labelAlign:'right',
											name : 'instId',
											itemId : 'instId',
											allowBlank : false,
											afterLabelTextTpl : required,
											fieldLabel :instWin_jgbh /*'机构编号'*/,
											maxLength:20,
											validator:function(){
												var value = this.getValue();
												var reg = /^\w+$/;
												if(reg.test(value)){
													return true;
												}else{
													return instWin_bnhyhz/*"不能含有汉字！"*/;
												}
											}
										}, {
											xtype : 'nostextfield',
											width:300,
								        	//labelAlign:'right',
											inputType : 'text',
											name : 'instName',
											itemId : 'instName',
											allowBlank : false,
											afterLabelTextTpl : required,
											fieldLabel : instWin_jgmv/*'机构名称'*/,
											maxLength:120
										}, {
											xtype : 'nostextfield',
											width:300,
								        	//labelAlign:'right',
											inputType : 'text',
											name : 'instSmpName',
											itemId:'instSmpName',
											afterLabelTextTpl : required,
											allowBlank : false,
											fieldLabel : instWin_jgjc/*'机构简称'*/,
											maxLength:120
										}, {
											xtype : 'textfield',
											width:300,
								        	//labelAlign:'right',
											inputType : 'text',
											itemId:'parentInstId',
											name:'parentInstId',
											fieldLabel : instWin_sjjg/*'上级机构    '*/
										}, {
											xtype : 'combobox',
											width:300,
								        	//labelAlign:'right',
											name : 'instLayer',
											itemId:'instLayer',
											fieldLabel : instWin_jgjb/*'机构级别    '*/,
											store: [1,2,3,4,5,6,7,8,9],
								    		value: 1
										}]
							}, {
								xtype : 'fieldset',
								title : instWin_tzxx/*'拓展信息'*/,
								defaultType : 'textfield',
								width:400,
								layout:'column',
								items : [
								         {
								        	 xtype:'checkboxgroup',
								        	 itemId:'checkboxgroupID',
								        	 fieldLabel:instWin_ssxz/*'所属性质'*/,
									         labelAlign:'right',
								        	 vertical: true,
								        	 width:390,
								        	 columns:3,
								        	 items:[
								        	        {
								        	        	boxLabel:instWin_sffrjg/*'是否法人机构'*/,
								        	        	//labelAlign:'right',
								        	        	inputValue:'Y',
								        	        	uncheckedValue:'N',
								        	        	name:'legalPersonFlag',
								        	        	itemId:'legalPersonFlag'
								        	        },{
								        	        	boxLabel:instWin_sfzh/*'是否总行'*/,
								        	        	//labelAlign:'right',
								        	        	inputValue:'Y',
								        	        	uncheckedValue:'N',
								        	        	name:'headquartersFlag',
								        	        	itemId:'headquartersFlag'
								        	        },{
								        	        	boxLabel:instWin_sfglh/*'是否管理行'*/,
								        	        	//labelAlign:'right',
								        	        	inputValue:'Y',
								        	        	uncheckedValue:'N',
								        	        	name:'managerFlag',
								        	        	itemId:'managerFlag'
								        	        }
							        	        ]
							            },{
											xtype : 'combobox',
											fieldLabel : instWin_zdlx/*'制度类型'*/,
											//labelAlign:'right',
											width:200,
											name : 'legalPersonType',
											itemId:'legalPersonType',
											editable : false,
											displayField : 'value',
											valueField : 'code',
											value: '',
											store : Ext.create('Ext.data.Store', {
												fields : ['code', 'value'],
												data : [{
															code: '',
															value: instWin_qxz/*'请选择'*/
														},{
															code : '4045',
															value : instWin_fr/*'法人'*/
														},{
															code : '4650',
															value : instWin_csh/*'城商行'*/
														}, {
															code : '5155',
															value : instWin_gfz/*'股份制'*/
														}, {
															code : '5660',
															value : instWin_fgyhfh/*'外国银行分行'*/
														}, {
															code : '6170',
															value : instWin_ncls/*'农信联社'*/
														}, {
															code : '7180',
															value : instWin_czyh/*'村镇银行'*/
														}, {
															code : '8190',
															value : instWin_zzxyh/*'政策性银行'*/
														}, {
															code : '9199',
															value : instWin_fyjg/*'非银机构'*/
														}]
											})
										}, {
											xtype : 'textfield',
											width:300,
											//labelAlign:'right',
											inputType : 'text',
											name : 'zip',
											itemId:'zip',
											fieldLabel : instWin_xzbh/*'邮政编码'*/,
											validator:function(){
												var value = this.getValue();
												var reg = /^[1-9]\d{5}(?!\d)/;
												if(value){
													if(reg.test(value)){
														return true;
													}else{
														return instWin_ybyw/*"邮编有误，请输入正确的邮编！"*/;
													}
												}else{
													return true;
												}
											}
										}, {
											xtype : 'radiogroup',
											width:300,
											//labelAlign:'right',
											itemId:'enabled',
											fieldLabel : instWin_qybs/*'启用标识'*/,
											editable:false,
										    columns: 2,
										    vertical: true,											
											items: [
												 { boxLabel: instWin_s/*'是'*/, name: 'enabled', inputValue: 'Y', checked : true },
												 { boxLabel: instWin_f/*'否'*/, name: 'enabled', inputValue: 'N' }
											]
										}, {
											xtype : 'textfield',
											width:300,
											//labelAlign:'right',
											inputType : 'text',
											name : 'instRegion',
											itemId:'instRegion',
											fieldLabel : instWin_dqdm/*'地区代码'*/,
											maxLength:6,
											minLength:6,
											validator:function(){
												var value = this.getValue();
												var reg = /^\w+$/;
												if(value){
													if(reg.test(value)){
														return true;
													}else{
														return instWin_dqdmyw/*"地区代码有误，请输入正确的地区代码！"*/;
													}
												}else{
													return true;
												}
											}
										}, {
											hidden:(cfgFinance =='N'),
											xtype : 'textfield',
											width:300,
											//labelAlign:'right',
											inputType : 'text',
											name : 'pbocInstCode',
											itemId:'pbocInstCode',
											fieldLabel : instWin_jrjgbsm/*'金融机构标识码'*/,
											maxLength:12,
											minLength:12,
											validator:function(){
												var value = this.getValue();
												var reg = /^\w+$/;
												if(value){
													if(reg.test(value)){
														return true;
													}else{
														return instWin_jrjgbsmyw/*"金融机构标识码有误，请输入正确的金融机构标识码！"*/;
													}
												}else{
													return true;
												}
											}
										}, {
										hidden:(cfgFinance =='N'),
											xtype : 'textfield',
											width:300,
											//labelAlign:'right',
											inputType : 'text',
											name : 'stdInstCode',
											itemId:'stdInstCode',
											fieldLabel : instWin_jgbzhdm/*'机构标准化代码'*/,
											maxLength:14,
											allowBlank: (cfgFinance =='N'),
											minLength:14,
											afterLabelTextTpl : required,
											validator:function(){
												var value = this.getValue();
												var reg = /^\w+$/;
												if(value){
													if(reg.test(value)){
														return true;
													}else{
														return instWin_jrjgbzhdmyw/*"金融机构标准化代码有误，请输入正确的金融机构标准化代码！"*/;
													}
												}else{
													return true;
												}
											}
										},{
										hidden:(cfgFinance =='N'),
											xtype : 'textfield',
											width:300,
											//labelAlign:'right',
											inputType : 'text',
											name : 'legalPersonCode',
											itemId:'legalPersonCode',
											fieldLabel : instWin_frdm/*'法人代码'*/,
											maxLength:9,
											minLength:9,
											validator:function(){
												var value = this.getValue();
												var reg = /^\w+$/;
												if(value){
													if(reg.test(value)){
														return true;
													}else{
														return instWin_frdmyw/*"法人代码有误，请输入正确的法人代码！"*/;
													}
												}else{
													return true;
												}
											}
										},{
										hidden:(cfgFinance =='N'),
											xtype : 'textfield',
											width:300,
											//labelAlign:'right',
											inputType : 'text',
											name : 'instLicenceCode',
											itemId:'instLicenceCode',
											fieldLabel : instWin_jrxkzh/*'金融许可证号'*/
/*											validator:function(){
												var value = this.getValue();
												var reg = /^\w+$/;
												if(value){
													if(reg.test(value)){
														return true;
													}else{
														return "法人代码有误，请输入正确的法人代码！";
													}
												}else{
													return true;
												}
											}*/
										},{
										hidden:(cfgFinance =='N'),
											xtype : 'textfield',
											width:300,
											//labelAlign:'right',
											inputType : 'text',
											name : 'pbocInstCode14',
											itemId:'pbocInstCode14',
											fieldLabel : instWin_14jrjgdm/*'14位金融机构代码'*/,
											maxLength:14,
											minLength:14
										},{
											hidden:(cfgIdentification == 'N'),
											xtype : 'textfield',
											width:300,
											//labelAlign:'right',
											inputType : 'text',
											name : 'taxpayerIdentificationId',
											itemId:'taxpayerIdentificationId',
											fieldLabel : instWin_nsrsbh/*'纳税人识别号'*/
									}]
							}, {
								xtype : 'fieldset',
								title : instWin_qtxx/*'其他信息'*/,
								layout:'form',
								width:400,
								items : [{
										xtype : 'textfield',
										//labelAlign:'right',
										inputType : 'text',
										name : 'orderNum',
										itemId:'orderNum',
										fieldLabel : instWin_ympx/*'页面排序'*/,
										validator:function(){
											if(isNaN(this.getValue())){
												return instWin_qsrsz/*'请输入数值'*/;
											}else{
												return true;
											}
										}
									}, {
											xtype : 'textfield',
											width:300,
											//labelAlign:'right',
											inputType : 'text',
											name : 'tel',
											itemId:'tel',
											fieldLabel : instWin_jgdh/*'机构电话'*/,
											maxLength:20,
											validator:function(){
												var value = this.getValue();
												var reg = /^\w+$/;
												if(value){
													if(reg.test(value)){
														return true;
													}else{
														return instWin_jgdhyw/*"机构电话有误，请输入正确的机构电话！"*/;
													}
												}else{
													return true;
												}
											}
										}, {
											xtype : 'textfield',
											width:300,
											//labelAlign:'right',
											inputType : 'text',
											name : 'fax',
											itemId:'fax',
											fieldLabel : instWin_jgcz/*'机构传真'*/,
											maxLength:25,
											validator:function(){
												var value = this.getValue();
												var reg = /^\w+$/;
												if(value){
													if(reg.test(value)){
														return true;
													}else{
														return instWin_jgczyw/*"机构传真有误，请输入正确的传真号！"*/;
													}
												}else{
													return true;
												}
											}
										},{
											xtype : 'textfield',
											width:300,
											//labelAlign:'right',
											inputType : 'text',
											name : 'address',
											itemId:'address',
											fieldLabel : instWin_jgdz/*'机构地址'*/,
											maxLength:120
										}, {
											xtype : 'datefield',
											width:220,
											//labelAlign:'right',
											format : 'Y-m-d',
											name : 'startDate',
											itemId:'startDate',
											fieldLabel : instWin_qyrq/*'启用日期'*/
										}, {
											xtype : 'datefield',
											width:220,
											//labelAlign:'right',
											format : 'Y-m-d',
											name : 'endDate',
											itemId:'endDate',
											fieldLabel : instWin_zzrq/*'终止日期'*/,
											validator:function(){
												 if(this.getValue()<this.ownerCt.getComponent('startDate').getValue()){
													 return instWin_zzrqbnzyqsrq/*'终止日期不得早于启用日期'*/;
												 }
												 return true;
											}
										},{
											xtype : 'textareafield',
											width:350,
											//labelAlign:'right',
											inputType : 'text',
											name : 'description',
											itemId:'description',
											fieldLabel : instWin_jgms/*'机构描述'*/,
											maxLength:25
										}]
							}],
							buttons : [{
								text : instWin_bc/*'保  存'*/,
								name : 'submit',
								itemId:'submit',
								formBind : true,
								disabled : true	
							}]
	}
	
});