<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
<head>
    <%@ include file="jes/view/inc/head.httl"%>
    <%@ include file="jes/view/inc/extjs.httl"%>
    <%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

    <script type="text/javascript">
        var systemConfig=${systemConfig};
        var driverClassName='${driverClassName}';
        var url='${url}';
        var user = '${user}';
        var maxIdle = '${maxIdle}';
        var maxActive = '${maxActive}';
        var jndi='${jndi}';
        var systemConfig_gb='<spring:message code="jes.WebContent.res.js.sys.instList.gb"></spring:message>';//保存
        var systemConfig_pzsjy='<spring:message code="jes.WebContent.res.js.app.SystemConfig.pzsjy"></spring:message>';//配置数据源
        var systemConfig_bc='<spring:message code="jes.WebContent.res.js.app.SystemConfig.bc"></spring:message>';//保存
        var systemConfig_bccg='<spring:message code="jes.WebContent.res.js.app.SystemConfig.bccg"></spring:message>';//保存成功...
    </script>

    <script type="text/javascript" src="res/js/app/InitDataSourceWin.js"></script>
</head>

<body>

</body>
<script type="text/javascript">

    Ext.require('Sys.app.SystemConfig');
    Ext.onReady(function() {
        var sysc = new Sys.app.SystemConfig();
        sysc.all();
        var buttons = Ext.ComponentQuery.query('button[name=descBtn]');
        for(var btn in buttons){
            buttons[btn].on('click',function(me){
                var field = me.previousSibling();
                var desc = "";
                if(!Ext.isEmpty(field.tooltip)){
                    desc = field.tooltip;
                }
                Ext.create('Ext.window.Window',{
                    title:field.getFieldLabel(),
                    width:400,
                    height:180,
                    layout: 'fit',
                    modal:true,
                    items:{
                        layout:'fit',
                        xtype:'form',
                        items:[{
                            xtype:'textareafield',
                            labelAlign:'right',
                            readOnly:true,
                            value:desc,
                            rows:15
                        }
                        ]},
                    buttons:[{
                        text : systemConfig_gb,
                        handler : function() {
                            var me = this;
                            me.up('window').close();
                        }
                    }]

                }).show();

            });
        }
    });
</script>
</html>


