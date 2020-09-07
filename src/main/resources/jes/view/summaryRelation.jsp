<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ include file="jes/view/inc/top.httl"%>
<html>
<head>
    <%@ include file="jes/view/inc/head.httl"%>
    <%@ include file="jes/view/inc/extjs.httl"%>

    <script type="text/javascript">
        var summaryRelation_xzgx='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.xzgx"></spring:message>';//行政关系
        var summaryRelation_cwgjd='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.cwgjd"></spring:message>';//成为根节点
        var summaryRelation_jdbcf='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.jdbcf"></spring:message>';//节点不能重复！
        var summaryRelation_qxzgjd='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qxzgjd"></spring:message>';//请选择根节点！
        var summaryRelation_cwzjd='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.cwzjd"></spring:message>';//成为子节点
        var summaryRelation_gzjdtj='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.gzjdtj"></spring:message>';//该子节点已经添加！
        var summaryRelation_sjjd='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.sjjd"></spring:message>';//上级节点不能是下级结点！
        var summaryRelation_qxzzjd='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qxzzjd"></spring:message>';//请选择子节点！
        var summaryRelation_qxzsjjd='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qxzsjjd"></spring:message>';//请选择上级节点！
        var summaryRelation_czhz='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.czhz"></spring:message>';//重置汇总
        var summaryRelation_bjl='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.bjl"></spring:message>';//不级联
        var summaryRelation_jlyj='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.jlyj"></spring:message>';//级联一级
        var summaryRelation_jlqb='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.jlqb"></spring:message>';//级联全部
        var summaryRelation_sfdxzgx='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.sfdxzgx"></spring:message>';//是否带行政关系
        var summaryRelation_s='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.s"></spring:message>';//是
        var summaryRelation_f='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.f"></spring:message>';//否
        var summaryRelation_hxgx='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.hxgx"></spring:message>';//汇总关系
        var summaryRelation_xt='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.xt"></spring:message>';//系统
        var summaryRelation_mc='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.mc"></spring:message>';//名称
        var summaryRelation_xtts='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.xtts"></spring:message>';//系统提示
        var summaryRelation_qdschz='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qdschz"></spring:message>';//确定要删除该类型的汇总关系？
        var summaryRelation_fwljsb='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.fwljsb"></spring:message>';//服务连接失败，状态码
        var summaryRelation_qxzschz='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qxzschz"></spring:message>';//请选择要删除的汇总
        var summaryRelation_bh='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.bh"></spring:message>';//编号
        var summaryRelation_xz='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.xz"></spring:message>';//新增
        var summaryRelation_qxtxxtmc='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qxtxxtmc"></spring:message>';//请先填写系统名称！
        var summaryRelation_qxtxzqhz='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qxtxzqhz"></spring:message>';//请先填写正确汇总类型名称！
        var summaryRelation_hzlxmcgc='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.hzlxmcgc"></spring:message>';//汇总类型名称过长
        var summaryRelation_qxtxzqhzbh='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qxtxzqhzbh"></spring:message>';//请先填写正确汇总类型编号！
        var summaryRelation_hzlbhgc='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.hzlbhgc"></spring:message>';//汇总类编号过长
        var summaryRelation_fzxzgx='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.fzxzgx"></spring:message>';//复制行政关系
        var summaryRelation_bc='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.bc"></spring:message>';//保存
        var summaryRelation_qxtxhzbh='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qxtxhzbh"></spring:message>';//请先填写汇总类型编号！
        var summaryRelation_qxtxhzmc='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qxtxhzmc"></spring:message>';//请先填写汇总类型名称!
        var summaryRelation_qc='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qc"></spring:message>';//清除无效数据
        var summaryRelation_wxsj='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.wxsj"></spring:message>';//无效数据
        var summaryRelation_tsjgh='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.tsjgh"></spring:message>';//提示：机构号只在汇总关系中存在，不在机构信息中存在，则视为无效数据。
        var summaryRelation_sc='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.sc"></spring:message>';//删除
        var summaryRelation_qxzsc='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.qxzsc"></spring:message>';//请选择要删除的记录
        var summaryRelation_xh='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.xh"></spring:message>';//序号
        var summaryRelation_hzlxbm='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.hzlxbm"></spring:message>';//汇总类型编码
        var summaryRelation_jgh='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.jgh"></spring:message>';//机构号
        var summaryRelation_sfcyhs='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.sfcyhs"></spring:message>';//是否参与计算
        var summaryRelation_ysjgx='<spring:message code="jes.WebContent.res.js.sys.summaryRelation.ysjgx"></spring:message>';//与上级关系
    </script>
    <script type="text/javascript" src="${app}/res/js/sys/summaryRelation.js"></script>
</head>
<body>
</body>
</html>