<!DOCTYPE html >
<html>
<head>
<%@ include file="jes/view/inc/head.httl"%>
<%@ include file="jes/view/inc/extjs.httl"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<link type="text/css"	href="/jes/res/css/sys.css"	rel="stylesheet" />
<script type="text/javascript">
var ssConfig_zxtxxpz='<spring:message code="jes.WebContent.res.js.sys.ssConfig.zxtxxpz"></spring:message>';//子系统信息配置
var ssConfig_xtywm='<spring:message code="jes.WebContent.res.js.sys.ssConfig.xtywm"></spring:message>';//系统英文名
var ssConfig_xtzwm='<spring:message code="jes.WebContent.res.js.sys.ssConfig.xtzwm"></spring:message>';//系统中文名
var ssConfig_chaxun='<spring:message code="jes.WebContent.res.js.sys.ssConfig.chaxun"></spring:message>';//查询
var ssConfig_tishi='<spring:message code="jes.WebContent.res.js.sys.ssConfig.tishi"></spring:message>';//提示
var ssConfig_wxgxx='<spring:message code="jes.WebContent.res.js.sys.ssConfig.wxgxx"></spring:message>';//无相关信息！
var ssConfig_xtwwdz='<spring:message code="jes.WebContent.res.js.sys.ssConfig.xtwwdz"></spring:message>';//系统外网地址
var ssConfig_xtnwdz='<spring:message code="jes.WebContent.res.js.sys.ssConfig.xtnwdz"></spring:message>';//系统内网地址
var ssConfig_mrym='<spring:message code="jes.WebContent.res.js.sys.ssConfig.mrym"></spring:message>';//默认页面
var ssConfig_weihu='<spring:message code="jes.WebContent.res.js.sys.ssConfig.weihu"></spring:message>';//维护
var ssConfig_shi='<spring:message code="jes.WebContent.res.js.sys.ssConfig.shi"></spring:message>';//是
var ssConfig_fou='<spring:message code="jes.WebContent.res.js.sys.ssConfig.fou"></spring:message>';//否
var ssConfig_xianshi='<spring:message code="jes.WebContent.res.js.sys.ssConfig.xianshi"></spring:message>';//显示
var ssConfig_chakan='<spring:message code="jes.WebContent.res.js.sys.ssConfig.chakan"></spring:message>';//查看
var ssConfig_zxtxxxx='<spring:message code="jes.WebContent.res.js.sys.ssConfig.zxtxxxx"></spring:message>';//子系统详细信息
var ssConfig_xiugai='<spring:message code="jes.WebContent.res.js.sys.ssConfig.xiugai"></spring:message>';//修改
var ssConfig_xgzxtxx='<spring:message code="jes.WebContent.res.js.sys.ssConfig.xgzxtxx"></spring:message>';//修改子系统信息
var ssConfig_xgcg='<spring:message code="jes.WebContent.res.js.sys.ssConfig.xgcg"></spring:message>';//修改成功！
var ssConfig_xgsb='<spring:message code="jes.WebContent.res.js.sys.ssConfig.xgsb"></spring:message>';//修改失败！
var ssConfig_szgly='<spring:message code="jes.WebContent.res.js.sys.ssConfig.szgly"></spring:message>';//设置管理员
var ssConfig_pzgly='<spring:message code="jes.WebContent.res.js.sys.ssConfig.pzgly"></spring:message>';//配置管理员
var ssConfig_zxtmc='<spring:message code="jes.WebContent.res.js.sys.ssConfig.zxtmc"></spring:message>';//子系统名称
var ssConfig_glyyxj='<spring:message code="jes.WebContent.res.js.sys.ssConfig.glyyxj"></spring:message>';//管理员优先级
var ssConfig_sfkjgly='<spring:message code="jes.WebContent.res.js.sys.ssConfig.sfkjgly"></spring:message>';//是否科技管理员
var ssConfig_sfywgly='<spring:message code="jes.WebContent.res.js.sys.ssConfig.sfywgly"></spring:message>';//是否业务管理员
var ssConfig_zhyh='<spring:message code="jes.WebContent.res.js.sys.ssConfig.zhyh"></spring:message>';//总行用户（双击可新增管理员）
var ssConfig_cgtjgly='<spring:message code="jes.WebContent.res.js.sys.ssConfig.cgtjgly"></spring:message>';//成功添加管理员！
var ssConfig_tishi1='<spring:message code="jes.WebContent.res.js.sys.ssConfig.tishi1"></spring:message>';//提示1
var ssConfig_tjsb='<spring:message code="jes.WebContent.res.js.sys.ssConfig.tjsb"></spring:message>';//添加失败！管理员已存在！
var ssConfig_gly='<spring:message code="jes.WebContent.res.js.sys.ssConfig.gly"></spring:message>';//管理员
var ssConfig_xtbh='<spring:message code="jes.WebContent.res.js.sys.ssConfig.xtbh"></spring:message>';//系统编号
var ssConfig_yhmc='<spring:message code="jes.WebContent.res.js.sys.ssConfig.yhmc"></spring:message>';//用户名称
var ssConfig_glyyxj='<spring:message code="jes.WebContent.res.js.sys.ssConfig.glyyxj"></spring:message>';//管理员优先级
var ssConfig_kjgl='<spring:message code="jes.WebContent.res.js.sys.ssConfig.kjgl"></spring:message>';//科技管理
var ssConfig_ywgl='<spring:message code="jes.WebContent.res.js.sys.ssConfig.ywgl"></spring:message>';//业务管理
var ssConfig_shanchu='<spring:message code="jes.WebContent.res.js.sys.ssConfig.shanchu"></spring:message>';//删除
var ssConfig_nqdyscm='<spring:message code="jes.WebContent.res.js.sys.ssConfig.nqdyscm"></spring:message>';//您确定要删除吗?
var ssConfig_cgscgly='<spring:message code="jes.WebContent.res.js.sys.ssConfig.cgscgly"></spring:message>';//成功删除管理员！
var SsConfigWin_xtjbxx='<spring:message code="jes.WebContent.res.js.app.SsConfigWin.xtjbxx"></spring:message>';//系统基本信息
var SsConfigWin_xtywm='<spring:message code="jes.WebContent.res.js.app.SsConfigWin.xtywm"></spring:message>';//系统英文名
var SsConfigWin_xtzwm='<spring:message code="jes.WebContent.res.js.app.SsConfigWin.xtzwm"></spring:message>';//系统中文名
var SsConfigWin_xtsfzwh='<spring:message code="jes.WebContent.res.js.app.SsConfigWin.xtsfzwh"></spring:message>';//系统是否在维护
var SsConfigWin_sfzcdzxs='<spring:message code="jes.WebContent.res.js.app.SsConfigWin.sfzcdzxs"></spring:message>';//是否在菜单中显示
var SsConfigWin_zxtpzxx='<spring:message code="jes.WebContent.res.js.app.SsConfigWin.zxtpzxx"></spring:message>';//子系统配置信息
var SsConfigWin_xtwwdz='<spring:message code="jes.WebContent.res.js.app.SsConfigWin.xtwwdz"></spring:message>';//系统外网地址
var SsConfigWin_xtnwdz='<spring:message code="jes.WebContent.res.js.app.SsConfigWin.xtnwdz"></spring:message>';//系统内网地址
var SsConfigWin_xtsydz='<spring:message code="jes.WebContent.res.js.app.SsConfigWin.xtsydz"></spring:message>';//系统首页地址
var SsConfigWin_baocun='<spring:message code="jes.WebContent.res.js.app.SsConfigWin.baocun"></spring:message>';//保  存
</script>
<script type="text/javascript" src="${app}/res/js/sys/ssConfig.js"></script>
</head>
<body>

</body>
</html>