/**
 * jpt公共查验票据方法类
 * @params jptObjState(1:客户端;0:服务器;2:关闭接口) type:(预勾选--1  or  勾选 -- 0)
 * @author wangting
 * 2017-12-01
 */
Ext.define("Ext.ux.jpt.jptCheckBillInfo", {
	alias: 'Ext.ux.jpt.jptCheckBillInfo'
})


var checkBillInfoFun = function(myView,store){
	var ii="";	
	var info="";
	var grid=myView.down('grid').getSelectionModel().getSelection();
	var params={};
	var list=new Array();
	var msg="";
	//客户端服务端判断
	if("1"==jptObjState){
		 if (grid.length > 0) {
			 if(grid.length>50){
				 Ext.MessageBox.alert('提示','选择的发票数目不能大于50条');
				 return;
			 }
			 Ext.MessageBox.confirm('提示','确认进行查验吗？',function(obj){
				 if(obj=='yes'){
				 var fpcx = document.getElementById("fpmxtq1");
				 if(fpcx == null){
					 alert("组件加载失败");
					 return;
				 }
				 var list=inputBillCheckGrid('grid',grid);
				 try{
					 ii=fpcx.init(jptTaxNo);
					 var xmlDoc=chenagToXmlDoc(ii);
					 var elements = xmlDoc.getElementsByTagName("info");
				 	 var code = elements[0].getElementsByTagName("code")[0].firstChild.nodeValue;
				 	 var ts = elements[0].getElementsByTagName("ts")[0].firstChild.nodeValue; 
				 	 if('001'!=code){
				 		 alert(ts);
				 	 }
				 }catch(e){
					 alert("接口错误"+e);
					 return;
				 }
				 for(var i = 0 ;i<list.length; i++){
					 fpcx.init(jptTaxNo);
					 //Kpje:如果为专票，则该参数为开票金额（未税），如果为普票，则为校验码
					 if("1"==list[i].jibiBillType){
						 try{
							 info = fpcx.getFpmx(jptTaxNo, list[i].jibiBillCode, list[i].jibiBillNo, list[i].jibiAmountIncome, list[i].jibiBillDate);
						 }catch(e){
							 //"发票代码号码"+list[i].jibiBillCode+"-"+list[i].jibiBillNo+
							 alert("接口错误"+e);
						 }
					 }else if("0"==list[i].jibiBillType||"5"==list[i].jibiBillType){
						 try{
							 var strlength=list[i].jibiCheckNo.length;
							//alert(list[i].jibiBillCode+"~~"+list[i].jibiBillNo+"~~"+list[i].jibiCheckNo+"~~"+list[i].jibiBillDate);
							 info = fpcx.getFpmx(jptTaxNo, list[i].jibiBillCode, list[i].jibiBillNo, list[i].jibiCheckNo.substr(strlength-6,strlength), list[i].jibiBillDate);
							 //alert(info);
						 }catch(e){
							 //"发票代码号码"+list[i].jibiBillCode+"-"+list[i].jibiBillNo+
							 alert("接口错误"+e);
					     }	
					 }else if("2"==list[i].jibiBillType){
						 try{
							 var strlength=list[i].jibiCheckNo.length;
							 //alert("jptTaxNo"+jptTaxNo+"list[i].jibiBillCode"+list[i].jibiBillCode+"list[i].jibiBillNo"+list[i].jibiBillNo+"list[i].jibiAmountIncome"+list[i].jibiAmountTotal+"list[i].jibiBillDate"+list[i].jibiBillDate)
							 info = fpcx.getFpmx(jptTaxNo, list[i].jibiBillCode, list[i].jibiBillNo, list[i].jibiCheckNo.substr(strlength-6,strlength), list[i].jibiBillDate);
						 }catch(e){
							 //"发票代码号码"+list[i].jibiBillCode+"-"+list[i].jibiBillNo+
							 alert("接口错误"+e);
					     }	
					 }
					 var xmlDocInfo=chenagToXmlDoc(info);
					 var elementsInfo = xmlDocInfo.getElementsByTagName("info");
				 	 var codeInfo = elementsInfo[0].getElementsByTagName("code")[0].firstChild.nodeValue;
				 	 var tsInfo = elementsInfo[0].getElementsByTagName("ts")[0].firstChild.nodeValue;  
				 	 msg+="发票代码:"+list[i].jibiBillCode+"发票号码:"+list[i].jibiBillNo+"查询结果:"+tsInfo+"！<br>";
				 	 Ext.Ajax.request({
						url:'checkfpmxInterface.ajax',
						dataType: "json",  
						params:{
							params :{"xml1":ii,"xml2":info,"list":json.stringify(list[i])}
						},
						success:function(response){
							if(result=="error"){
								//Ext.MessageBox.alert('提示','系统异常');
								//store.loadPage(1);
							}else{
								var result=Ext.decode(response.responseText);
								if(result.indexOf("黑名单")>0){
									 Ext.MessageBox.confirm('提示',result+"是否保存票据？",function(obj){
										 if(obj=='yes'){
											 store.load();
										 	}else{
										 		Ext.Ajax.request({
													url:'removeBlackList.ajax',
													params:{
														params:result
													},
													success:function(response){
														if(response){
															var message=Ext.decode(response.responseText);
															if(message!=''&&message.length > 0 ){
																jesErrorAlert(message,10000);
																store.load();
															}else{
																Ext.MessageBox.alert('提示','删除成功！');
																store.load();
															}
														}
													}
												});
										 	}
									 })
								}else{
									jesErrorAlert(msg,10000);
									store.load();
								}
							}
							jesErrorAlert(msg,10000);
							store.load();
						}
					});

				}
			 }
				store.loadPage(1);
			 });
			
		 }else{
			 Ext.MessageBox.alert("提示",'请选择一条发票信息！'); 
		 }
	}else if("3"==jptObjState){
		//httpdt后端
		 if (grid.length > 0) {
			 if(grid.length>50){
				 Ext.MessageBox.alert('提示','选择的发票数目不能大于50条');
				 return;
			 }
				Ext.MessageBox.confirm('提示','确认进行查验吗？',function(obj){
					if(obj=='yes'){
						 var myMask = new Ext.LoadMask(Ext.getBody(),{msg:"正在处理，请稍后......"});
						 myMask.show();
						var ids = [];
						var list=inputBillCheckGrid('grid',grid);
						Ext.Ajax.request({
							url:'inputCheckInterfaceTD.ajax',
							dataType: "json",  
							params:{
								params : json.stringify(list)   // 将list数组转换为json对象
							},
							success:function(response){
								var result=Ext.decode(response.responseText);
								if(result=="error"){
									Ext.MessageBox.alert('提示','查验失败');
									store.loadPage(1);
								}else{
									if(result.indexOf("黑名单")>0){
										 Ext.MessageBox.confirm('提示',result+"是否保存票据？",function(obj){
											 if(obj=='yes'){
												 store.load();
											 	}else{
											 		Ext.Ajax.request({
														url:'removeBlackList.ajax',
														params:{
															params:result
														},
														success:function(response){
															if(response){
																var message=Ext.decode(response.responseText);
																if(message!=''&&message.length > 0 ){
																	jesErrorAlert(message,10000);
																	store.load();
																}else{
																	Ext.MessageBox.alert('提示','删除成功！');
																	store.load();
																}
															}
														}
													});
											 	}
										 })
									}else{
										Ext.MessageBox.alert('提示',result);
										// 提交成功后重新加载当前页
										store.loadPage(1);
									}
								}
								myMask.hide();
							}
						});
					}
					
				});
			 
		 } else {
             Ext.MessageBox.alert("提示",'请选择一条发票信息！');
         }
	}else if("4"==jptObjState){
		//是否选择数据
		 if (grid.length > 0) {
				 if(grid.length>50){
					 Ext.MessageBox.alert('提示','选择的发票数目不能大于50条');
					 return;
				 }
				 Ext.MessageBox.confirm('提示','确认进行查验吗？',function(obj){
					 if(obj=='yes'){
						 var fpcx = document.getElementById("fpmxtq1");
						 if(fpcx == null){
							 alert("组件加载失败");
							 return;
						 }
						 var list=inputBillCheckGrid('grid',grid);
						 var strTax="83741D4535GE2134NC";
						 try{
							 ii=fpcx.checkLogin(strTax);
						 	 alert(ii);
						 	/* var xmlDoc=chenagToXmlDoc(ii);
							 var elements = xmlDoc.getElementsByTagName("info");
						 	 var code = elements[0].getElementsByTagName("code")[0].firstChild.nodeValue;
						 	 var ts = elements[0].getElementsByTagName("ts")[0].firstChild.nodeValue; */
						 	 if('1'!=ii){
						 		 alert("接口初始化错误！");
						 	 }
						 	 for(var i = 0 ;i<list.length; i++){
								 var values="";
								 //Kpje:如果为专票，则该参数为开票金额（未税），如果为普票，则为校验码
								 if("1"==list[i].jibiBillType){
									values = list[i].jibiAmountIncome;
								 }else if("0"==list[i].jibiBillType||"5"==list[i].jibiBillType){
									 var strlength=list[i].jibiCheckNo.length;
									values = list[i].jibiCheckNo.substr(strlength-6,strlength);
								 }else if("2"==list[i].jibiBillType){
									 var strlength=list[i].jibiCheckNo.length;
									 values = list[i].jibiCheckNo.substr(strlength-6,strlength);
								 }
								 //获取明细
								 info = fpcx.checkInvoice(list[i].jibiBillCode,list[i].jibiBillNo,list[i].jibiBillDate,values);
								 //GetQueryNumber(strTax,list[i].jibiBillCode,list[i].jibiBillNo,list[i].jibiBillDate,values,values);
								 //(jptTaxNo, list[i].jibiBillCode, list[i].jibiBillNo, values, list[i].jibiBillDate);
								 var xmlDocInfo=chenagToXmlDoc(info);
								 var elementsInfo1 = xmlDocInfo.getElementsByTagName("invdata");
								 var elementsInfo = elementsInfo1[0].getElementsByTagName("rs");
							 	 var codeInfo = elementsInfo[0].getElementsByTagName("st")[0].firstChild.nodeValue;
							 	 var tsInfo = elementsInfo[0].getElementsByTagName("ms")[0].firstChild.nodeValue;  
							 	msg+="发票代码:"+list[i].jibiBillCode+"发票号码:"+list[i].jibiBillNo+"查询结果:"+tsInfo+"！<br>";
							 	 Ext.Ajax.request({
									url:'checkfpmxInterfacetd.ajax',
									dataType: "json",  
									params:{
										params :{"xml2":info,"list":json.stringify(list[i])}
									},
									success:function(response){
										if(result=="error"){
											//Ext.MessageBox.alert('提示','系统异常');
											//store.loadPage(1);
										}else{
											var result=Ext.decode(response.responseText);
											if(result.indexOf("黑名单")>0){
												 Ext.MessageBox.confirm('提示',result+"是否保存票据？",function(obj){
													 if(obj=='yes'){
														 store.load();
													 	}else{
													 		Ext.Ajax.request({
																url:'removeBlackList.ajax',
																params:{
																	params:result
																},
																success:function(response){
																	if(response){
																		var message=Ext.decode(response.responseText);
																		if(message!=''&&message.length > 0 ){
																			jesErrorAlert(message,10000);
																			store.load();
																		}else{
																			Ext.MessageBox.alert('提示','删除成功！');
																			store.load();
																		}
																	}
																}
															});
													 	}
												 })
											}else{
												jesErrorAlert(msg,10000);
												store.load();
											}
										}
										jesErrorAlert(msg,10000);
										store.load();
									}
								});
						 	 }
						 }catch(e){
							 alert("接口错误"+e);
							 return;
						 }
						 
					 }
				 
				 });
				 
				 
		 }else{
			 Ext.MessageBox.alert("提示",'请选择一条发票信息！');  
		 }
	
	}else if("0"==jptObjState){
		//alert("in server");
		 if (grid.length > 0) {
			 if(grid.length>50){
				 Ext.MessageBox.alert('提示','选择的发票数目不能大于50条');
				 return;
			 }
				Ext.MessageBox.confirm('提示','确认进行查验吗？',function(obj){
					if(obj=='yes'){
						 var myMask = new Ext.LoadMask(Ext.getBody(),{msg:"正在处理，请稍后......"});
						 myMask.show();
						var ids = [];
						var list=inputBillCheckGrid('grid',grid);
						Ext.Ajax.request({
							url:'inputCheckIdentityNode.ajax',
							dataType: "json",  
							params:{
								params : json.stringify(list)   // 将list数组转换为json对象
							},
							success:function(response){
								var result=Ext.decode(response.responseText);
								if(result=="error"){
									Ext.MessageBox.alert('提示','查验失败');
									store.loadPage(1);
								}else{
									if(result.indexOf("黑名单")>0){
										 Ext.MessageBox.confirm('提示',result+"是否保存票据？",function(obj){
											 if(obj=='yes'){
												 store.load();
											 	}else{
											 		Ext.Ajax.request({
														url:'removeBlackList.ajax',
														params:{
															params:result
														},
														success:function(response){
															if(response){
																var message=Ext.decode(response.responseText);
																if(message!=''&&message.length > 0 ){
																	jesErrorAlert(message,10000);
																	store.load();
																}else{
																	Ext.MessageBox.alert('提示','删除成功！');
																	store.load();
																}
															}
														}
													});
											 	}
										 })
									}else{
										Ext.MessageBox.alert('提示',result);
										// 提交成功后重新加载当前页
										store.loadPage(1);
									}
								}
								myMask.hide();
							}
						});
					}
					 myMask.hide();
				});
             } else {
                Ext.MessageBox.alert("提示",'请选择一条发票信息！');
            }
	}else{
		alert("请配置接口参数（系统管理-工作台配置-参数配置-税控设备采集是否调用接口）");
	} 
}

function chenagToXmlDoc(Stringxml){
	var xmlDoc;
	var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
	for(var i=0;i<xmlDomVersions.length;i++){
		try{
			xmlDoc = new ActiveXObject(xmlDomVersions[i]);
			xmlDoc.async = false;
			xmlDoc.loadXML(Stringxml);// loadXML方法载入xml字符串
			break;
		}catch(e){
		}
	}
	return xmlDoc;
}
function valueReplace(v){ 
	v=v.toString().replace(new RegExp('(["\"])', 'g'),"\\\""); 
	return v; 
}



