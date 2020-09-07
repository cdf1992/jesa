<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<!-- Style Includes -->
<%@ include file="jes/view/inc/head.httl"%>
<%@ include file="jes/view/inc/extjs.httl"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script  type="text/javascript">
var fileManager_wjgl='<spring:message code="jes.WebContent.res.js.sys.fileManager.wjgl"></spring:message>';//文件管理
var fileManager_xinz='<spring:message code="jes.WebContent.res.js.sys.fileManager.xinz"></spring:message>';//新增
var fileManager_xzscwj='<spring:message code="jes.WebContent.res.js.sys.fileManager.xzscwj"></spring:message>';//新增上传文件
var fileManager_xtmc='<spring:message code="jes.WebContent.res.js.sys.fileManager.xtmc"></spring:message>';//系统名称
var fileManager_wjsbm='<spring:message code="jes.WebContent.res.js.sys.fileManager.wjsbm"></spring:message>';//文件识别码
var fileManager_wj='<spring:message code="jes.WebContent.res.js.sys.fileManager.wj"></spring:message>';//文件
var fileManager_ll='<spring:message code="jes.WebContent.res.js.sys.fileManager.ll"></spring:message>';//浏览...
var fileManager_kzxx='<spring:message code="jes.WebContent.res.js.sys.fileManager.kzxx"></spring:message>';//扩展信息
var fileManager_wjms='<spring:message code="jes.WebContent.res.js.sys.fileManager.wjms"></spring:message>';//文件描述
var fileManager_scwj='<spring:message code="jes.WebContent.res.js.sys.fileManager.scwj"></spring:message>';//上传文件
var fileManager_zzsc='<spring:message code="jes.WebContent.res.js.sys.fileManager.zzsc"></spring:message>';//正在上传，请稍后...
var fileManager_scwjcg='<spring:message code="jes.WebContent.res.js.sys.fileManager.scwjcg"></spring:message>';//上传文件成功...
var fileManager_gjlyjcz='<spring:message code="jes.WebContent.res.js.sys.fileManager.gjlyjcz"></spring:message>';//该记录已经存在或程序异常,上传文件失败...
var fileManager_qjcxxsfwz='<spring:message code="jes.WebContent.res.js.sys.fileManager.qjcxxsfwz"></spring:message>';//请检查信息是否完整...
var fileManager_qx='<spring:message code="jes.WebContent.res.js.sys.fileManager.qx"></spring:message>';//取消
var fileManager_sx='<spring:message code="jes.WebContent.res.js.sys.fileManager.sx"></spring:message>';//刷新
var fileManager_plxz='<spring:message code="jes.WebContent.res.js.sys.fileManager.plxz"></spring:message>';//批量下载
var fileManager_qxzxyxdwj='<spring:message code="jes.WebContent.res.js.sys.fileManager.qxzxyxdwj"></spring:message>';//请选择需要下载的文件.......
var fileManager_sclswj='<spring:message code="jes.WebContent.res.js.sys.fileManager.sclswj"></spring:message>';//删除临时文件
var fileManager_ts='<spring:message code="jes.WebContent.res.js.sys.fileManager.ts"></spring:message>';//提示
var fileManager_sccxx='<spring:message code="jes.WebContent.res.js.sys.fileManager.sccxx"></spring:message>';//删除此信息，页面可能需要两次刷新，否则不能正确渲染页面
var fileManager_schttlwj='<spring:message code="jes.WebContent.res.js.sys.fileManager.schttlwj"></spring:message>';//删除httl文件
var fileManager_xh='<spring:message code="jes.WebContent.res.js.sys.fileManager.xh"></spring:message>';//序号
var fileManager_xtbh='<spring:message code="jes.WebContent.res.js.sys.fileManager.xtbh"></spring:message>';//系统编号
var fileManager_wjmc='<spring:message code="jes.WebContent.res.js.sys.fileManager.wjmc"></spring:message>';//文件名称
var fileManager_wjms='<spring:message code="jes.WebContent.res.js.sys.fileManager.wjms"></spring:message>';//文件描述
var fileManager_xgsj='<spring:message code="jes.WebContent.res.js.sys.fileManager.xgsj"></spring:message>';//修改时间
var fileManager_wjdx='<spring:message code="jes.WebContent.res.js.sys.fileManager.wjdx"></spring:message>';//文件大小/B
var fileManager_shangchuan='<spring:message code="jes.WebContent.res.js.sys.fileManager.shangchuan"></spring:message>';//上传
var fileManager_gxhsc='<spring:message code="jes.WebContent.res.js.sys.fileManager.gxhsc"></spring:message>';//更新或上传
var fileManager_zzgxwj='<spring:message code="jes.WebContent.res.js.sys.fileManager.zzgxwj"></spring:message>';//正在更新文件，请耐心等候......
var fileManager_gxwjcg='<spring:message code="jes.WebContent.res.js.sys.fileManager.gxwjcg"></spring:message>';//更新文件成功...
var fileManager_gxwjsb='<spring:message code="jes.WebContent.res.js.sys.fileManager.gxwjsb"></spring:message>';//更新文件失败...
var fileManager_qshzs='<spring:message code="jes.WebContent.res.js.sys.fileManager.qshzs"></spring:message>';//请稍后再试.......
var fileManager_xz='<spring:message code="jes.WebContent.res.js.sys.fileManager.xz"></spring:message>';//下载
var fileManager_bj='<spring:message code="jes.WebContent.res.js.sys.fileManager.bj"></spring:message>';//编辑
var fileManager_bjxx='<spring:message code="jes.WebContent.res.js.sys.fileManager.bjxx"></spring:message>';//编辑信息
var fileManager_bc='<spring:message code="jes.WebContent.res.js.sys.fileManager.bc"></spring:message>';//保存
var fileManager_gxcg='<spring:message code="jes.WebContent.res.js.sys.fileManager.gxcg"></spring:message>';//更新成功...
var fileManager_cxycqshzs='<spring:message code="jes.WebContent.res.js.sys.fileManager.cxycqshzs"></spring:message>';//程序异常,请稍后再试......
var fileManager_shanchu='<spring:message code="jes.WebContent.res.js.sys.fileManager.shanchu"></spring:message>';//删除
var fileManager_nqdyscm='<spring:message code="jes.WebContent.res.js.sys.fileManager.nqdyscm"></spring:message>';//你确定要删除吗？
var fileManager_sccg='<spring:message code="jes.WebContent.res.js.sys.fileManager.sccg"></spring:message>';//删除成功...
var fileManager_scsb='<spring:message code="jes.WebContent.res.js.sys.fileManager.scsb"></spring:message>';//删除失败...
var fileManager_cxfsyc='<spring:message code="jes.WebContent.res.js.sys.fileManager.cxfsyc"></spring:message>';//程序发生异常，请一会再试...
var fileManager_schcwj='<spring:message code="jes.WebContent.res.js.sys.fileManager.schcwj"></spring:message>';//删除缓存文件
var fileManager_fzlj='<spring:message code="jes.WebContent.res.js.sys.fileManager.fzlj"></spring:message>';//复制链接
var fileManager_fzcg='<spring:message code="jes.WebContent.res.js.sys.fileManager.fzcg"></spring:message>';//复制成功
var fileManager_fzsb='<spring:message code="jes.WebContent.res.js.sys.fileManager.fzsb"></spring:message>';//复制失败,该条记录无法生成连接,请检查该文件的文件名是否合法!
</script>
<script type="text/javascript" src="${app}/res/js/sys/fileManager.js"></script>
</head>
	<body>
	<iframe width="0" height="0" id="download"></iframe> 
	<script type="text/javascript">
		var subsystemNum = ${subsystemNum};
	</script>
</body>

</html>