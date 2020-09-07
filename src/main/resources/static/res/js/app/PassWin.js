Ext.define('Sys.app.PassWin', {
    extend: 'Ext.window.Window',
    width: 300,
    height:150,
    modal : true,
    resizable : false,
    title:'修改密码',
    constructor:function(vp){
    	this.vp=vp;
    	Sys.app.PassWin.superclass.constructor.call(this);
    },
    listeners:{
    	close:function(){
    		if(this.vp){
    			this.vp.unmask();
    		}
    	},
    	show:function(){
    		var me=this;
    		me.getComponent('password').focus();
    	}
    },
	buttons: [
	      {
			text: '提交',
			inputType:'submit',
			handler:function(){
				var myWin=this.up('window');
				if(!myWin.down('field[name=password]').getValue()){
					Ext.Msg.alert('提示',"请输入原密码!");
					return;
				}
				if(!myWin.down('field[name=newPwd1]').getValue()){
					Ext.Msg.alert('提示',"请输入新密码!");
					return;
				}
				if(!myWin.down('field[name=newPwd2]').getValue()){
					Ext.Msg.alert('提示',"请重复输入密码!");
					return;
				}
				if(myWin.down('field[name=newPwd1]').getValue()!=myWin.down('field[name=newPwd2]').getValue()){
					Ext.Msg.alert('提示',"新设置的密码输入不一致!");
					return;
				}
				
				Ext.Ajax.request({
				    url: 'changePwd.do',
				    params: {
				    	oldPwd:myWin.down('field[name=password]').getValue(),
				        newPwd:myWin.down('field[name=newPwd1]').getValue()
				    },
				    success: function(response){
				    	var text = Ext.decode(response.responseText);
				    	if(text=="0"){
				        	jesAlert('修改密码成功...');
				    		myWin.close();
				    		if(myWin.vp){
				    			myWin.vp.unmask();
				    		}
				    	}else if(text=="1"){
				    		Ext.Msg.alert('提示',"原密码输入错误!");
				    	}else if(text=="2"){
				    		Ext.Msg.alert('提示',"服务器繁忙，密码修改失败...");
				    	}else if(text=="3"){
				    		Ext.Msg.alert('提示',"密码过短!");
				    	}else if(text=="4"){
				    		Ext.Msg.alert('提示',"密码过长!");
				    	}else if(text=="5"){
				    		Ext.Msg.alert('提示',"密码格式不正确!必须包含字母数字！");
				    	}else if(text=="6"){
				    		Ext.Msg.alert('提示',"此密码在历史记录里，不允许被使用！");
				    	}else if(text=="7"){
				    		Ext.Msg.alert('提示',"密码不允许与用户名相同！");
				    	}else if(text=="8"){
				    		Ext.Msg.alert('提示',"密码不允许与最近几次使用的相同！");
				    	}
				    }
				});
			}
		  }
    ],
    defaults: {
        padding: '5 5 0 5',
        labelAlign: 'right',
        labelWidth: 80
    },
	items: [
	  {
		  xtype    : 'textfield',
		  inputType: 'password',
          name     : 'password',
          itemId:'password',
          fieldLabel:'原密码'
	  } ,
	  {
		  xtype    : 'textfield',
		  inputType: 'password',
          name     : 'newPwd1',
          fieldLabel:'新密码'
	  },
	  {
		  xtype    : 'textfield',
		  inputType: 'password',
          name     : 'newPwd2',
          fieldLabel:'确认密码'
	  }
    ]
});

