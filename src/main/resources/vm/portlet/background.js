function getPortlet(){ 
	return {
		html: '<div style="background:url(res/img/login/welcomebg.png) no-repeat center; position:absolute; top:50%; left:50%; width:600px; height:400px; margin:-200px 0 0 -300px;"><p style="padding-top:190px; color:#666; font-size:24px; text-align:center; letter-spacing:3px;">'+productName+'</p></div>',
		flex:1,
		listeners: {
	        render: function(){
	        	this.up('panel').down('tabpanel').hide();
	        }
		}
	};
}