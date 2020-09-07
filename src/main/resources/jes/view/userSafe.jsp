<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
<%@ include file="inc/top.jsp"%>
<html>
<head>
<%@ include file="jes/view/inc/head.httl"%>
<%@ include file="jes/view/inc/extjs.httl"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script  type="text/javascript">
var userSafe_syyh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.syyh"></spring:message>';//所有用户
var userSafe_ts='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.ts"></spring:message>';/*"提示"*/
var userSafe_czsb='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.czsb"></spring:message>';/*"操作失败，请重试！"*/
var userSafe_shcg='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.shcg"></spring:message>';/*'审核成功！'*/
var userSafe_czcg='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.czcg"></spring:message>';/*'操作成功！'*/
var userSafe_sqytj='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.sqytj"></spring:message>';/*'申请已提交！'*/
var userSafe_czmm='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.czmm"></spring:message>';/*'重置密码'*/
var userSafe_shxx='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.shxx"></spring:message>';/*'审核信息'*/
var userSafe_xgrhshbbnstyr='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.xgrhshbbnstyr"></spring:message>';/*"修改人和审核人不能是同一个！"*/
var userSafe_wshsq='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.wshsq"></spring:message>';/*"无审核申请！"*/
var userSafe_yysqrwqdd='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.yysqrwqdd"></spring:message>';/*"已有申请任务，请等待审核！"*/
var userSafe_yh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.yh"></spring:message>';/*"用户"*/
var userSafe_wqyhbsd='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.wqyhbsd"></spring:message>';/*"未启用或者被锁定！"*/
var userSafe_wqyhsc='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.wqyhsc"></spring:message>';/*"未启用或者被删除！"*/
var userSafe_sc='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.sc"></spring:message>';/*'删  除'*/
var userSafe_sftgsh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.sftgsh"></spring:message>';/*'是否通过审核'*/
var userSafe_sd='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.sd"></spring:message>';/*'锁 定'*/
var userSafe_ybsdhsc='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.ybsdhsc"></spring:message>';/*"已被锁定或者被删除！"*/
var userSafe_shr='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.shr"></spring:message>';/*'审核人'*/
var userSafe_xgr='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.xgr"></spring:message>';/*'修改人'*/
var userSafe_qy='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.qy"></spring:message>';/*'启  用'*/
var userSafe_bmmc='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.bmmc"></spring:message>';/*'部门名称'*/
var userSafe_sj='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.sj"></spring:message>';/*'手机'*/
var userSafe_jgjc='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.jgjc"></spring:message>';/*'机构简称'*/
var userSafe_jgbh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.jgbh"></spring:message>';/*'机构编号'*/
var userSafe_yhm='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.yhm"></spring:message>';/*'用户名'*/
var userSafe_yhbh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.yhbh"></spring:message>';/*'用户编号'*/
var userSafe_cx='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.cx"></spring:message>';/*'查询'*/
var userSafe_ddsh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.ddsh"></spring:message>';/*'等待审核'*/
var userSafe_ckyh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.ckyh"></spring:message>';/*'查看用户'*/
var userSafe_yhaqgl='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.yhaqgl"></spring:message>';/*'用户安全管理'*/
var userSafe_xzyhsh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.xzyhsh"></spring:message>';/*'新增用户审核'*/
var userSafe_qyyhsh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.qyyhsh"></spring:message>';/*'启用用户审核'*/
var userSafe_cshmmsh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.cshmmsh"></spring:message>';/*'初始化密码审核'*/
var userSafe_sqhfzc='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.sqhfzc"></spring:message>';/*'申请恢复正常'*/
var userSafe_sqjs='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.sqjs"></spring:message>';/*'申请解锁'*/
var userSafe_js='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.js"></spring:message>';/*'解锁'*/
var userSafe_hfzc='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.hfzc"></spring:message>';/*'恢复正常'*/
var userSafe_ysdyh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.ysdyh"></spring:message>';/*'已锁定用户'*/
var userSafe_yscyh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.yscyh"></spring:message>';/*'已删除用户'*/
var userSafe_wqyyh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.wqyyh"></spring:message>';/*'未启用用户'*/
var userSafe_qxz='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.qxz"></spring:message>';/*'-请选择-'*/
var userSafe_xzyh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.xzyh"></spring:message>';/*'新增用户'*/
var userSafe_qyyh='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.qyyh"></spring:message>';/*'启用用户'*/
var userSafe_cshma='<spring:message code="jes.WebContent.web-inf.jsp.main.userSafe.cshma"></spring:message>';/*'初始化密码'*/
</script>
<script type="text/javascript" src="${app}/res/js/sys/userSafe.js"></script>
<script type="text/javascript" src="${app}/res/js/jes-extjs.js"></script>
</head>
<body>
<script type="text/javascript">
	var currentUserId = '${currentUserId}';
	var isFourEyes = '${isFourEyes}';
</script>
</body>
</html>
