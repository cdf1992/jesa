/**
 *  
 */
Ext.define('Ext.ux.jes.IconBox', {
	alias: "widget.iconbox",
	extend: 'Ext.Component',
	title: '',
	icon:'',
	iconSize:'40px',
	titleSize:'20px',
	titleColor:'',
	iconColor:'',
	boxCololr:'',
	sytleIndex:'',
	iconLayout:'',
	renderTpl: [
		       '<div  style="margin:0;width:100%;height:100%">',
			            '<p style="color:{titleColor};font-size:{titleSize};float:left;margin:0;padding:0px;padding-left:10px;">{title}</p>',
			            '<p class="{icon}" style="color:{iconColor};font-size:{iconSize};float:right;margin:0px;padding:0px;"></p>',
		         '</div>'
	            ],
	initComponent: function(){
	        var me = this;
	        var sytleIndexArry = [["#00C0EF","#FFF","#00A3CB"], // sytleIndex=1
	                              ["#00A65A","#FFF","#008D4D"], // sytleIndex=2
	                              ["#F39C12","#FFF","#CF850F"], // sytleIndex=3
	                              ["#DD4B39","#FFF","#BC4031"]];// sytleIndex=4
	      
	         if(!Ext.isEmpty(me.sytleIndex) && parseInt(me.sytleIndex)<=4){
	        	  //console.log(parseInt(me.sytleIndex)-1); 
	        	  me.boxCololr  = sytleIndexArry[parseInt(me.sytleIndex)-1][0]
	        	  me.titleColor = sytleIndexArry[parseInt(me.sytleIndex)-1][1];
	        	  me.iconColor  = sytleIndexArry[parseInt(me.sytleIndex)-1][2];
	         }
	        
	        Ext.applyIf(this.renderData, {
	        	title :     me.title,
	        	titleColor: me.titleColor,
	        	titleSize:  me.titleSize,
	            icon      : me.icon,
	            iconColor:  me.iconColor,
	            iconSize :  me.iconSize,
	            sytleIndex: me.sytleIndex,
	            iconLayout: me.iconLayout
	        });
    },
    onRender: function(){
    	var me = this;
    	 console.log(me.el.getHeight());
    	//自定义背景色 圆边
        this.el.setStyle({
			backgroundColor: this.boxCololr,
			borderRadius: '5px'
		});
        //暴露自定义click事件
        this.el.on('click', this.onclick, this);
        this.callParent(arguments);
    },
    afterRender : function(){
        this.callParent(arguments);
    },
    //重绘制，根据父级窗口大小改变时触发
    onResize:function(){
    		var me = this;
    	 	me.el.down('p').setStyle('line-height',me.el.getHeight()+'px');
	     	if(me.iconLayout=='top'){
	     		me.el.down('p[class='+me.icon+']').setStyle('vertical-align','top');
	     	}else if(me.iconLayout=='middle'){
	     		me.el.down('p[class='+me.icon+']').setStyle('line-height',me.el.getHeight()+'px');
	     	}
    },
    //修改title事件
    setTitle: function(title) {
        var me = this;
        if (!Ext.isEmpty(title) && typeof(title)=='string') {
        	 me.title = title;
        	 me.el.down('p').dom.innerHTML=title;
        }
        return me;
    },
    //自定义点击事件
    onclick: function () {
        this.fireEvent('click', this);
    }
});
