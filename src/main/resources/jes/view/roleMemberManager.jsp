<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
<%@ include file="jes/view/inc/top.httl"%>
<html>
<head>
<%@ include file="jes/view/inc/head.httl"%>
<%@ include file="jes/view/inc/extjs.httl"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script type="text/javascript">
var roleMemberManager_syjs='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.syjs"></spring:message>';//所有角色
var roleMemberManager_jsry='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.jsry"></spring:message>';//角色人员/部门关系
var roleMemberManager_pz='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.pz"></spring:message>';//配置
var roleMemberManager_qxzjs='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.qxzjs"></spring:message>';//请选中要配置的角色
var roleMemberManager_jx='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.jx"></spring:message>';//进行
var roleMemberManager_qxpz='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.qxpz"></spring:message>';//的权限配置
var roleMemberManager_dc='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.dc"></spring:message>';//导出
var roleMemberManager_sx='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.sx"></spring:message>';//刷新
var roleMemberManager_xh='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.xh"></spring:message>';//序号
var roleMemberManager_xtmc='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.xtmc"></spring:message>';//系统名称
var roleMemberManager_jsmc='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.jsmc"></spring:message>';//角色名称
var roleMemberManager_jslx='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.jslx"></spring:message>';//角色类型
var roleMemberManager_ry='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.ry"></spring:message>';//人员
var roleMemberManager_bm='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.bm"></spring:message>';//部门
var roleMemberManager_rymc='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.rymc"></spring:message>';//人员名称
var roleMemberManager_rybm='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.rybm"></spring:message>';//人员编号
var roleMemberManager_bmmc='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.bmmc"></spring:message>';//部门名称
var roleMemberManager_jgmc='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.jgmc"></spring:message>';//机构名称
var roleMemberManager_zt='<spring:message code="jes.WebContent.res.js.sys.roleMemberManager.zt"></spring:message>';//状态
var roleMemberWin_czsb='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.czsb"></spring:message>';/*'操作失败，请联系管理员！'*/
var roleMemberWin_ry='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.ry"></spring:message>';/*'人员'*/
var roleMemberWin_syjg='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.syjg"></spring:message>';/*'所有机构'*/
var roleMemberWin_ryxx='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.ryxx"></spring:message>';/*'人员信息'*/
var roleMemberWin_yhbh='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.yhbh"></spring:message>';/*'用户编号'*/
var roleMemberWin_srdzykg='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.srdzykg"></spring:message>';/*'输入的值有空格'*/
var roleMemberWin_cz='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.cz"></spring:message>';/*'查找'*/
var roleMemberWin_yhbh='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.yhbh"></spring:message>';/*'用户编号'*/
var roleMemberWin_yhywm='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.yhywm"></spring:message>';/*'用户英文名'*/
var roleMemberWin_yhzwm='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.yhzwm"></spring:message>';/*'用户中文名'*/
var roleMemberWin_jgbh='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.jgbh"></spring:message>';/*'机构编号'*/
var roleMemberWin_syry='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.syry"></spring:message>';/*'所选人员'*/
var roleMemberWin_bh='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.bh"></spring:message>';/*'编号'*/
var roleMemberWin_yhm='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.yhm"></spring:message>';/*'用户名'*/
var roleMemberWin_sc='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.sc"></spring:message>';/*'删除'*/
var roleMemberWin_bm='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.bm"></spring:message>';/*'部门'*/
var roleMemberWin_bmbh='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.bmbh"></spring:message>';/*'部门编号'*/
var roleMemberWin_bmmc='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.bmmc"></spring:message>';/*'部门名称'*/
var roleMemberWin_sfzhtybm='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.sfzhtybm"></spring:message>';/*'是否总行特有部门'*/
var roleMemberWin_sfglhtybm='<spring:message code="jes.WebContent.res.js.app.roleMemberWin.sfglhtybm"></spring:message>';/*'是否管理行特有部门'*/
var roleManagerWin_xtmc='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.xtmc"></spring:message>';/*'系统名称'*/
var roleManagerWin_jsbh='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.jsbh"></spring:message>';/*'角色编号'*/
var roleManagerWin_bnhyfhhzw='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.bnhyfhhzw"></spring:message>';/*'不能含有特殊符号和中文'*/
var roleManagerWin_jsmc='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.jsmc"></spring:message>';/*'角色名称'*/
var roleManagerWin_bnhytsfh='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.bnhytsfh"></spring:message>';/*'不能含有特殊符号'*/
var roleManagerWin_sfjzhsy='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.sfjzhsy"></spring:message>';/*'是否仅总行用'*/
var roleManagerWin_sfqy='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.sfqy"></spring:message>';/*'是否启用'*/
var roleManagerWin_bc='<spring:message code="jes.WebContent.res.js.app.roleManagerWin.bc"></spring:message>';/*'保存'*/

</script>
<script type="text/javascript" src="${app}/res/js/sys/roleMemberManager.js"></script>
</head>
<script  type="text/javascript">
 	var fourEyesSenior = '${fourEyesSenior}';
 	var roleoperateconfirm = '${roleoperateconfirm}';
</script>
<body>
<form id="exportForm"></form>
</body>
</html>