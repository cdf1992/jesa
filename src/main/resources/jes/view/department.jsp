<!DOCTYPE html >
<html>
<head>
<%@ include file="jes/view/inc/head.httl"%>
<%@ include file="jes/view/inc/extjs.httl"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script type="text/javascript">
var department_bmgl='<spring:message code="jes.WebContent.res.js.sys.department.bmgl"></spring:message>';//部门管理             
var department_xz  ='<spring:message code="jes.WebContent.res.js.sys.department.xz"></spring:message>';//新增                   
var department_xzbm='<spring:message code="jes.WebContent.res.js.sys.department.xzbm"></spring:message>';//新增部门             
var department_xzcg='<spring:message code="jes.WebContent.res.js.sys.department.xzcg"></spring:message>';//新增成功！           
var department_ts  ='<spring:message code="jes.WebContent.res.js.sys.department.ts"></spring:message>';//提示                   
var department_xzsb='<spring:message code="jes.WebContent.res.js.sys.department.xzsb"></spring:message>';//新增失败！部门已存在 
var department_sc  ='<spring:message code="jes.WebContent.res.js.sys.department.sc"></spring:message>';//删除                   
var department_qdsc='<spring:message code="jes.WebContent.res.js.sys.department.qdsc"></spring:message>';//您确定要删除吗?      
var department_czcg='<spring:message code="jes.WebContent.res.js.sys.department.czcg"></spring:message>';//操作成功!            
var department_czsb='<spring:message code="jes.WebContent.res.js.sys.department.czsb"></spring:message>';//操作失败,程序发生异常
var department_qxyh='<spring:message code="jes.WebContent.res.js.sys.department.qxyh"></spring:message>';//至少选择一行！       
var department_xh  ='<spring:message code="jes.WebContent.res.js.sys.department.xh"></spring:message>';//序号                   
var department_bmbh='<spring:message code="jes.WebContent.res.js.sys.department.bmbh"></spring:message>';//部门编号             
var department_bmmc='<spring:message code="jes.WebContent.res.js.sys.department.bmmc"></spring:message>';//部门名称             
var department_sfzh='<spring:message code="jes.WebContent.res.js.sys.department.sfzh"></spring:message>';//是否总行特有部门     
var department_s   ='<spring:message code="jes.WebContent.res.js.sys.department.s"></spring:message>';//是                      
var department_f   ='<spring:message code="jes.WebContent.res.js.sys.department.f"></spring:message>';//否                      
var department_sfgl='<spring:message code="jes.WebContent.res.js.sys.department.sfgl"></spring:message>';//是否管理行特有部门   
var department_bj  ='<spring:message code="jes.WebContent.res.js.sys.department.bj"></spring:message>';//编辑                   
var department_bmbj='<spring:message code="jes.WebContent.res.js.sys.department.bmbj"></spring:message>';//部门编辑             
var department_xgcg='<spring:message code="jes.WebContent.res.js.sys.department.xgcg"></spring:message>';//修改成功！           
var department_mjxrhxg='<spring:message code="jes.WebContent.res.js.sys.department.mjxrhxg"></spring:message>';//没进行任何修改！  
var department_czsb='<spring:message code="jes.WebContent.res.js.sys.department.czsb"></spring:message>';//操作失败!            
var department_sccg='<spring:message code="jes.WebContent.res.js.sys.department.sccg"></spring:message>';//删除成功！
var departmentWin_bc='<spring:message code="jes.WebContent.res.js.app.instWin.bc"></spring:message>';/*'保存'*/
var departmentWin_bmbh  ='<spring:message code="jes.WebContent.res.js.app.departmentWin.bmbh"></spring:message>';  /*'部门编号'*/
var departmentWin_bmbhgc='<spring:message code="jes.WebContent.res.js.app.departmentWin.bmbhgc"></spring:message>'; /*'部门编号过长！'*/
var departmentWin_bmmc  ='<spring:message code="jes.WebContent.res.js.app.departmentWin.bmmc"></spring:message>'; /*'部门名称'*/
var departmentWin_bnbhkg='<spring:message code="jes.WebContent.res.js.app.departmentWin.bnbhkg"></spring:message>'; /*'输入的内容不能为空或者包含空格！'*/
var departmentWin_bmmcgc='<spring:message code="jes.WebContent.res.js.app.departmentWin.bmmcgc"></spring:message>'; /*'部门名称过长！'*/
var departmentWin_sfzhty='<spring:message code="jes.WebContent.res.js.app.departmentWin.sfzhty"></spring:message>'; /*'是否总行特有'*/
var departmentWin_sfglhty='<spring:message code="jes.WebContent.res.js.app.departmentWin.sfglhty"></spring:message>'; /*'是否管理行特有'*/
</script>
<script type="text/javascript" src="${app}/res/js/sys/department.js"></script>

</head>

<body>

</body>
</html>