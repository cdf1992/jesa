<!DOCTYPE html >
<html>
<head>
<%@ include file="jes/view/inc/head.httl"%>
<%@ include file="jes/view/inc/extjs.httl"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script type="text/javascript">
var roleManager_jsgl='<spring:message code="jes.WebContent.res.js.sys.roleManager.jsgl"></spring:message>';//角色管理
var roleManager_xz='<spring:message code="jes.WebContent.res.js.sys.roleManager.xz"></spring:message>';//新增
var roleManager_xzjs='<spring:message code="jes.WebContent.res.js.sys.roleManager.xzjs"></spring:message>';//新增角色
var roleManager_ts='<spring:message code="jes.WebContent.res.js.sys.roleManager.ts"></spring:message>';//提示
var roleManager_xzsb='<spring:message code="jes.WebContent.res.js.sys.roleManager.xzsb"></spring:message>';//新增失败！角色编号或者角色名称已存在！
var roleManager_qxzzxt='<spring:message code="jes.WebContent.res.js.sys.roleManager.qxzzxt"></spring:message>';//请选择要操作的子系统！
var roleManager_qxzxzjszxt='<spring:message code="jes.WebContent.res.js.sys.roleManager.qxzxzjszxt"></spring:message>';//请选择需要新增角色的子系统
var roleManager_sc='<spring:message code="jes.WebContent.res.js.sys.roleManager.sc"></spring:message>';//删除
var roleManager_qdsc='<spring:message code="jes.WebContent.res.js.sys.roleManager.qdsc"></spring:message>';//您确定要删除吗?
var roleManager_qxzscjs='<spring:message code="jes.WebContent.res.js.sys.roleManager.qxzscjs"></spring:message>';//请选择要删除的角色！
var roleManager_xg='<spring:message code="jes.WebContent.res.js.sys.roleManager.xg"></spring:message>';//修改
var roleManager_xgjs='<spring:message code="jes.WebContent.res.js.sys.roleManager.xgjs"></spring:message>';//修改角色
var roleManager_xgcg='<spring:message code="jes.WebContent.res.js.sys.roleManager.xgcg"></spring:message>';//修改成功!
var roleManager_xgsb='<spring:message code="jes.WebContent.res.js.sys.roleManager.xgsb"></spring:message>';//修改失败!
var roleManager_qxzxgjs='<spring:message code="jes.WebContent.res.js.sys.roleManager.qxzxgjs"></spring:message>';//请选择要修改的角色！
var roleManager_jszy='<spring:message code="jes.WebContent.res.js.sys.roleManager.jszy"></spring:message>';//角色资源关系
var roleManager_zylx='<spring:message code="jes.WebContent.res.js.sys.roleManager.zylx"></spring:message>';//资源类型
var roleManager_pz='<spring:message code="jes.WebContent.res.js.sys.roleManager.pz"></spring:message>';//配置
var roleManager_qxzpzjs='<spring:message code="jes.WebContent.res.js.sys.roleManager.qxzpzjs"></spring:message>';//请选择要配置的角色
var roleManager_qxzjs='<spring:message code="jes.WebContent.res.js.sys.roleManager.qxzjs"></spring:message>';//请选中要配置的角色
var roleManager_dc='<spring:message code="jes.WebContent.res.js.sys.roleManager.dc"></spring:message>';//导出
var roleManager_sx='<spring:message code="jes.WebContent.res.js.sys.roleManager.sx"></spring:message>';//刷新
var roleManager_xh='<spring:message code="jes.WebContent.res.js.sys.roleManager.xh"></spring:message>';//序号
var roleManager_cgyhsd='<spring:message code="jes.WebContent.res.js.sys.roleManager.xtmc"></spring:message>';//系统名称
var roleManager_xtmc='<spring:message code="jes.WebContent.res.js.sys.roleManager.jsmc"></spring:message>';//角色名称
var roleManager_zymc='<spring:message code="jes.WebContent.res.js.sys.roleManager.zymc"></spring:message>';//资源名称
var roleManager_zysl='<spring:message code="jes.WebContent.res.js.sys.roleManager.zysl"></spring:message>';//资源实例
var roleManager_zt='<spring:message code="jes.WebContent.res.js.sys.roleManager.zt"></spring:message>';//状态
var roleManager_jx='<spring:message code="jes.WebContent.res.js.sys.roleManager.jx"></spring:message>';//进行
var roleManager_qxpz='<spring:message code="jes.WebContent.res.js.sys.roleManager.qxpz"></spring:message>';//的权限配置
var roleManager_bcxg='<spring:message code="jes.WebContent.res.js.sys.roleManager.bcxg"></spring:message>';//保存修改
var roleManager_bccg='<spring:message code="jes.WebContent.res.js.sys.roleManager.bccg"></spring:message>';//保存成功
var roleManager_bcsb='<spring:message code="jes.WebContent.res.js.sys.roleManager.bcsb"></spring:message>';//保存失败：
var roleManager_fwljsb='<spring:message code="jes.WebContent.res.js.sys.roleManager.fwljsb"></spring:message>';//服务连接失败，状态码
var roleManagerWin_xtmc='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.xtmc"></spring:message>';/*'系统名称'*/
var roleManagerWin_jsbh='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.jsbh"></spring:message>';/*'角色编号'*/
var roleManagerWin_bnhyfhhzw='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.bnhyfhhzw"></spring:message>';/*'不能含有特殊符号和中文'*/
var roleManagerWin_jsmc='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.jsmc"></spring:message>';/*'角色名称'*/
var roleManagerWin_bnhytsfh='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.bnhytsfh"></spring:message>';/*'不能含有特殊符号'*/
var roleManagerWin_sfjzhsy='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.sfjzhsy"></spring:message>';/*'是否仅总行用'*/
var roleManagerWin_sfqy='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.sfqy"></spring:message>';/*'是否启用'*/
var roleManagerWin_bc='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.bc"></spring:message>';/*'保存'*/
</script>
<script type="text/javascript" src="${app}/res/js/sys/roleManager.js"></script>

</head>

<script  type="text/javascript">
 	var rData=${rData};
 	var fourEyesSenior = '${fourEyesSenior}';
</script>
<form id="exportForm"></form>
<body>

</body>
</html>