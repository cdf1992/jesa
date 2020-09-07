/*登陆页专用*/	
	function checkit(o){
		if(!o||!'Y' == rememberFlag) return
		var c=(o.className).replace(/[ ]/g,''),state='_on',newc=c.indexOf(state)<0?c+'_on':c.replace(state,'');
		o.className=newc;
		return false;
	}	
	
	function remem(inithex_Hash){
		if(Ext.isEmpty(Ext.get("password").dom.value)){
			jesAlert("请输入密码……");
			return false;
		}
		rememName();
		rememPwd();
		if(inithex_Hash=='Y'){
			Ext.get("password").dom.value=hex_sm3(Ext.get("password").dom.value);
		}
	}

	if(Ext.get("logoutError")){
		if(confirm('是否强制注销已登录用户？')){
			Ext.get("logout").dom.value="Y";
			document.getElementById("myForm").submit();
		}else{
			Ext.get("logout").dom.value="";
		}
	}
	
	function rememName(){
		if(Ext.get("rememId").dom.className=='log_check_user_on'){
			new Ext.util.LocalStorage().setItem("rememId",Ext.get("userId").dom.value,
					new Date(new Date().getTime()+(1000*60*60*24*30)));
		}else{
			new Ext.util.LocalStorage().removeItem("rememId");
		}
		return true;
	}
	function rememPwd(){
		if(Ext.get("rememPwd").dom.className=='log_check_pswd_on'){
			new Ext.util.LocalStorage().setItem("rememId",Ext.get("userId").dom.value,
					new Date(new Date().getTime()+(1000*60*60*24*30)));
			new Ext.util.LocalStorage().setItem("rememPwd",EnEight(Ext.get("password").dom.value),
					new Date(new Date().getTime()+(1000*60*60*24*30)));
		}else{
			new Ext.util.LocalStorage().removeItem("rememPwd");
		}
		return true;
	}
	
	
	/*加密*/
	function EnEight(s){
	    var r ='';
	    s = new Date().getTime()+'/t'+s;
	    for(var i=0;i<s.length;i++)
	        r+="\\"+s.charCodeAt(i).toString(20); 
	    return r;
	}
	/*解密*/
	function DeEight(s){
	    var r ='';
	    try{
		    var ss= s.split("\\");
		    for(var i=1;i<ss.length;i++)
		        r+=String.fromCharCode(parseInt(ss[i],20));
		    return r.split('/t')[1];
	    }catch(e){
	    	return '';
	    }
	}
	
	
	function getMyUrl(){
		var ifameX=document.getElementById("download").contentWindow;
			ifameX.open("getMyUrl.html",'_self');
	}

//保证其显示在top  window中
if (window != top) top.location.href = location.href;

Ext.require('Ext.ux.window.Notification');
Ext.onReady(function() {
 
	if(Ext.isIE6 || Ext.isIE7 || Ext.isIE8){ 
		Ext.get("loadDownChrome").dom.style.display="";
		jesAlert('您的浏览器版本是IE'+Ext.ieVersion+'，推荐下载谷歌浏览器，以获得更好的使用体验。<a style="color:blue;" href="res/chrome/ChromeStandaloneSetup.1409816011.exe">下载</a>',8000,'br');
		
		//var ifameX=document.getElementById("download").contentWindow;
   	  	//ifameX.open("res/chrome/ChromeStandaloneSetup.1409816011.exe",'_self');
	}
	
	Ext.get("userId").dom.focus();
	if(Ext.get("userIdError")){
    	 Ext.create('Ext.tip.ToolTip', {target: 'userId', html: Ext.get("userIdError").dom.innerHTML,bodyCls:'error'});
    	 Ext.create('widget.uxNotification', {
				html : Ext.get("userIdError").dom.innerHTML,
				iconCls: 'ux-notification-icon-error',
				autoCloseDelay: 5000,
				position: 'br'
			 	,ui:'default'
			}).show();
     }
     if(Ext.get("passwordError")){
    	 Ext.create('Ext.tip.ToolTip', {target: 'password', html: Ext.get("passwordError").dom.innerHTML,bodyCls:'error'});
    	 Ext.create('widget.uxNotification', {
				html : Ext.get("passwordError").dom.innerHTML,
				iconCls: 'ux-notification-icon-error',
				autoCloseDelay: 3000,
				position: 'br'
            	,ui:'default'
			}).show();
     }
     Ext.QuickTips.init();
     if('Y' == rememberFlag){
	     if(new Ext.util.LocalStorage().getItem("rememId")){
	     	Ext.get("userId").dom.value=new Ext.util.LocalStorage().getItem("rememId");
	     	Ext.get("rememId").dom.className='log_check_user_on';
	     }
	     if(new Ext.util.LocalStorage().getItem("rememPwd")){
	    	 Ext.get("password").dom.value=DeEight(new Ext.util.LocalStorage().getItem("rememPwd"));
	    	 Ext.get("rememPwd").dom.className='log_check_pswd_on';
	     }
     }else{
    	 Ext.get("log_area").dom.style.background='url(res/img/login/log_area_no_rem.png) no-repeat -818px -130px'
    	 var formDom = Ext.get("myForm").dom
    	 for(var i=0;i<formDom.childNodes.length;i++){
    		 if('log_check_pswd'==formDom.childNodes[i].className||'log_check_user'==formDom.childNodes[i].className){
    			 formDom.removeChild(formDom.childNodes[i]);
			 }
    	 }
     }
     Ext.create('Ext.tip.ToolTip',{
		target: 'findPassword',
	    title: '<span style="color: red;">找回密码</span>',
	    height: 110,
	    width: 185,
	    autoHide: false,
	    closable: true,
	    draggable: true,
	    id: 'applyTip',
	    style: {
	    	background: '#F6F6F6'
	    },
	    items:{
	    	xtype: 'form',
	    	height: 80,
	    	items:[{
		    	xtype: 'textfield',
		    	labelWidth: 60,
		    	width: 165,
		    	fieldLabel: '用 户 名',
		    	name: 'userId',
		    	allowBlank: false,
		    	value: Ext.get("userId").dom.value
		    },{
		    	xtype: 'textfield',
		    	labelWidth: 60,
		    	width: 165,
		    	name: 'mobile',
		    	fieldLabel: '手  机 号'
		    },{
		    	xtype: 'button',
		    	text: '<span style="color: blue;">提交申请</span>',
		    	style: 'margin-left: 100px',
		    	handler: function() {
		    		var form = this.up('form').getForm();
		    		var userId = form.findField('userId').value;
		    		var mobile = form.findField('mobile').value; 
		    		if(userId){
		    				Ext.Ajax.request({
								url:'applyRepeatPassword.html',
								params:{
									userId: userId,
									mobile: mobile
								},
								success: function(response) {
									var text = response.responseText;
									if(text=="success"){
										Ext.create('widget.uxNotification', {html: '提交成功！请等待管理员审核,审核通过后可用新密码登入!'}).show();
										Ext.getCmp('applyTip').close();
									}else if(text=="failed") {
										Ext.MessageBox.alert('提示','用户名和手机号不匹配!');
									}else if(text=="appling"){
										Ext.MessageBox.alert('提示','您已提交申请,请耐心等待!');
									}else if(text=="applied"){
										Ext.MessageBox.alert('提示','审核已经通过,您可以通过用户名获得新密码!');
									}else{
										Ext.MessageBox.alert('提示','用户名不存在!');
									}
								}
				    		});
		    		}else{
		    			Ext.MessageBox.alert('提示','请填写需要找回密码的用户名');
		    		}
		    	} 
		    }]
	    }
	});
});

