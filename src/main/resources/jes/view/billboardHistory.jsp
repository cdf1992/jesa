<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<!-- Style Includes -->
<%@ include file="jes/view/inc/head.httl"%>
<%@ include file="jes/view/inc/extjs.httl"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script type="text/javascript">
var billboardHistory_dtddt='<spring:message code="jes.WebContent.res.js.app.billboardHistory.dtddt"></spring:message>';//第{0}条到第{1}条-共{2}条
var billboardHistory_mycxdxgdxx='<spring:message code="jes.WebContent.res.js.app.billboardHistory.mycxdxgdxx"></spring:message>';//没有查询到相关的信息
var billboardHistory_lsxx='<spring:message code="jes.WebContent.res.js.app.billboardHistory.lsxx"></spring:message>';//历史信息
var billboardHistory_ggbt='<spring:message code="jes.WebContent.res.js.app.billboardHistory.ggbt"></spring:message>';//公告标题
var billboardHistory_fbr='<spring:message code="jes.WebContent.res.js.app.billboardHistory.fbr"></spring:message>';//发布人
var billboardHistory_qzssrlgzf='<spring:message code="jes.WebContent.res.js.app.billboardHistory.qzssrlgzf"></spring:message>';//请至少输入两个字符
var billboardHistory_chaxun='<spring:message code="jes.WebContent.res.js.app.billboardHistory.chaxun"></spring:message>';//查询
var billboardHistory_shanchu='<spring:message code="jes.WebContent.res.js.app.billboardHistory.shanchu"></spring:message>';//删除
var billboardHistory_shibai='<spring:message code="jes.WebContent.res.js.app.billboardHistory.shibai"></spring:message>';//失败
var billboardHistory_xuhao='<spring:message code="jes.WebContent.res.js.app.billboardHistory.xuhao"></spring:message>';//序号
var billboardHistory_ggnr='<spring:message code="jes.WebContent.res.js.app.billboardHistory.ggnr"></spring:message>';//公告内容
var billboardHistory_fbsj='<spring:message code="jes.WebContent.res.js.app.billboardHistory.fbsj"></spring:message>';//发布时间
var billboardHistory_szwyd='<spring:message code="jes.WebContent.res.js.app.billboardHistory.szwyd"></spring:message>';//设置为已读
var billboardHistory_szcg='<spring:message code="jes.WebContent.res.js.app.billboardHistory.szcg"></spring:message>';//设置成功
</script>

<script type="text/javascript" src="${app}/res/js/app/billboardHistory.vm"></script>
</head>
	<body>
	<iframe width="0" height="0" id="download"></iframe> 
	<script type="text/javascript">
		var deletebillOrMessage = '${DELETE_BILL_MESSAGE}';
		var currenUserId = '${userId}';
	</script>
</body>

</html>