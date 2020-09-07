/**
 * jpt公共勾选票据方法类
 * @params jptObjState(1:客户端;0:服务器;2:关闭接口) type:(预勾选--1  or  勾选 -- 0)
 * @author wangting
 * 2017-10-19
 */
Ext.define("Ext.ux.jpt.jptChoseBillInfo", {
	alias: 'Ext.ux.jpt.jptChoseBillInfo'
})


var choseBillInfoFun = function(myView,jptObjState,type,store){
	var myMask = new Ext.LoadMask(Ext.getBody(),{msg:"正在处理，请稍后......"});
	var taxIncome=0;  // 金额
 	var tax=0;   // 税额
 	var xml=""; //请求报文
 	var ii="";
 	var jptDiskNo = myView.down('combobox[name="taxCombox"]').getValue();
 	if(null==jptDiskNo){
 		alert("请选择税控盘号");
 		return;
 	}
 	//勾选初始化设备开始
 	var a=jptDiskNo.split("@");
	var xmlre = "<?xml version=\"1.0\" encoding=\"gbk\"?><business comment=\"认证接口\" id=\"RZJK\"><body><input><zsmm>"+a[1]+"</zsmm><rzdm>"+a[0]+"</rzdm><jkdm>RZZJJK</jkdm></input></body></business>";
	if(jptObjState=="1"){
		myMask.show();
		var fprz = document.getElementById("fpmxtq1");
		if(fprz == null){
			alert("组件加载失败");
			myMask.hide();
			return;
		}
		try{
			ii=fprz.initDevice(xmlre);
		}catch(e){
			myMask.hide();
			alert("接口错误"+e);
			return;
        }
		var xmlDoc=chenagToXmlDoc(ii);
		var elements = xmlDoc.getElementsByTagName("business");
		var body=elements[0].getElementsByTagName("body");
		var output=body[0].getElementsByTagName("output");
		for (var i = 0; i < elements.length; i++) {
			var returncode = output[i].getElementsByTagName("returncode")[0].firstChild.nodeValue;
             var returnmsg = output[i].getElementsByTagName("returnmsg")[0].firstChild.nodeValue;
	 	}
	 	if("01"!=returncode){
	 		alert(returnmsg);
	 		myMask.hide();
	 		return;
	 	}	  
	}
	
	
	if("3"==jptObjState){
		var fpcx = document.getElementById("fpmxtq1");

		a=jptDiskNo.split("@");
		//1yigouxuan  0weigouxuan
		var inite="<cd><sv>login</sv><dqbm>"+a[0]+"</dqbm><zsmm>"+a[1]+"</zsmm></cd>";
		
		try
		  {
		    var strReturn;
		    strReturn=fpcx.checkLogin("51441D4535GE21ZKYL");
		    if(strReturn=='1')
		    {
		      
		    }
		    else
		    {
		      	alert("初始化失败,错误代码:"+strReturn);
		      	myMask.hide();
				 return ;
		    }
		   
		    
		  }
			catch(e)
			{
				alert("初始化异常://"+e.message);
				myMask.hide();
				return ;
			}
		try{
			var StrJeson=fpcx.loginGxpt(inite);
			var obj = eval('(' + StrJeson + ')');
			var state=obj.zt;
			if("1"!=state){
				alert(obj.Msg);
				myMask.hide();
				return;
			}
		}catch(e){
			alert("查询发票初始化异常://"+e.message);
			myMask.hide();
			return;
		}
	}
	
	
	
	//勾选初始化设备结束
	var billInfoList = null;
	//如果是[勾选]则循环grid数据;是[预勾选]则循环查询出来的数据
	var grid = myView.down('grid').getSelectionModel().getSelection();
	var fpdm="";
	var fphm="";
	var xmltd=""
	var time = "";
	var state="";
	if(type == "0"){
		var e="";
	 	for(var i=0;i<grid.length;i++){
	 		if(grid[i].get('jibiChosenStatus')!='0'){
	 			Ext.MessageBox.alert("提示",'请选择勾选状态为未勾选数据！');
	 			return;
	 		}
			if(grid[i].get('jibiAmountTotal')!=''){
	 			taxIncome+=parseFloat(grid[i].get('jibiAmountTotal'));// 含税金额
	 		}
	 		if(grid[i].get('jibiAmountTax')!=''){
	 			tax+=parseFloat(grid[i].get('jibiAmountTax'));  // 税额
			}
	 		if("3"==jptObjState){
	 			var date=grid[i].get('jibiBillDate');
	 			if(""==fpdm){
	 				time =date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8);
	 				fpdm=grid[i].get('jibiBillCode');
	 				fphm=grid[i].get('jibiBillNo');
	 				kprq=time
	 				state="1"
	 			}else{
	 				time+="="+date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8);
	 				fpdm+="="+grid[i].get('jibiBillCode');
	 				fphm+="="+grid[i].get('jibiBillNo');
	 				kprq+="="+time
	 				state+="="+"1"
	 			}
	 			
	 		}else{
	 			
		 		xml+=addChildElement(grid[i].get('jibiBillCode'),grid[i].get('jibiBillNo'),"1",grid[i].get('jibiBillNo'));
	 		}
	 	}
	 	xmltd="<cd><sv>gxInvoice</sv><fpdm>"+fpdm+"</fpdm><fphm>"+fphm+"</fphm><kprq>"+time+"</kprq><zt>"+state+"</zt></cd>";
	 	//alert(xmltd);
	}else if(type == "1"){
		//得到选中的机构
		var instId = myView.down('toolbar[name="tbarChose"]').query('[name="f.JIBI_BUYER_INSTID:eq"]')[0].getValue();
		//发送请求,查询需要预勾选确认的数据
		Ext.Ajax.request({
			url:'findBIllInfoByInstIdAndChonseStatus.ajax',
			async:false,
			params:{
				params:instId
			},
			success:function(response){
				var result=Ext.decode(response.responseText);
				var flag = result.flag;
				if(flag == 'notExist'){
					Ext.MessageBox.alert("提示","目前不存在可被预勾选确认信息，请确认!");
					myMask.hide();
				}else{
					billInfoList = result.billInfoList;
					for (var i = 0; i < billInfoList.length; i++) {
						//含税金额
						if(billInfoList[i].jibiAmountTotal != ''){
							taxIncome+=parseFloat(billInfoList[i].jibiAmountTotal);
						}
						//税额
						if(billInfoList[i].jibiAmountTax != ''){
							tax+=parseFloat(billInfoList[i].jibiAmountTax);
						}
						xml+=addChildElement(billInfoList[i].jibiBillCode,billInfoList[i].jibiBillNo,"1",grid[i].get('jibiBillNo'));
					}
				}
			}
		});
	}
	
	
 	xml=createXml(xml);
 	
 	var length = type == 1 ? billInfoList.length : grid.length;
 	
 	var message="本批次勾选中发票共"+length+"张，金额为"+taxIncome.toFixed(2)+"元，税额为"+tax.toFixed(2)+"元。";	
	Ext.MessageBox.confirm('提示',message,function(obj){
		if(jptObjState=="1"){
			try{
				info=fprz.gxtjFpxx(xml);
				//alert("接口返回"+info);
			}catch(e){
				myMask.hide();
				alert("接口错误"+e);
				return;
	        }
			var xmlDoc=chenagToXmlDoc(info);
		 	var elements = xmlDoc.getElementsByTagName("business");
		 	var body=elements[0].getElementsByTagName("body");
		 	var output=body[0].getElementsByTagName("output")
		 	for (var i = 0; i < elements.length; i++) {
		 	     var returncode = output[i].getElementsByTagName("returncode")[0].firstChild.nodeValue;
		 	     var returnmsg = output[i].getElementsByTagName("returnmsg")[0].firstChild.nodeValue;
		 	}
		 	if("01"!=returncode){
		 		 alert(returnmsg);
		 		myMask.hide();
		 		 return;
		 	}
		  	}
		if(obj=='yes'){
			if("3"==jptObjState){
				//alert(xmltd);
				try{
					info=fpcx.gxInvoice(xmltd);
					var obj = eval('(' + StrJeson + ')');
					var state=obj.zt;
					if("1"!=state){
						alert(obj.Msg);
						myMask.hide();
						return;
					}
				}catch(e){
					myMask.hide();
					alert("接口错误"+e);
					
					return;
		        }
			}
			checkAndauth(grid,'check',store,xmlre,xml);				
		}	
	});
	myMask.hide();

}