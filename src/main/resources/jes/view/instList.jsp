<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ include file="jes/view/inc/top.httl"%>
<%@ include file="jes/view/inc/extjs.httl"%>
<!DOCTYPE html >
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <link type="text/css" href="${app}/res/css/main.css" rel="stylesheet" />
    <link type="text/css" href="${app}/res/css/sys.css"	 rel="stylesheet" />
    <style type="text/css">
        .font{
            vertical-align:middle
        }

        .red{
            color: red;
        }
    </style>
    <script type="text/javascript">
        var path=${path};
        var isSysAdmin = ${isSysAdmin};
        var hasChance='${hasChance}';
        var isAdmin='${userId}';
        var cfgFinance = '${cfgFinance}';
        var cfgIdentification = '${cfgIdentification}';

        var instList_jgxx='<spring:message code="jes.WebContent.res.js.sys.instList.jgxx"></spring:message>';//机构信息
        var instList_ts='<spring:message code="jes.WebContent.res.js.sys.instList.ts"></spring:message>';//提示
        var instList_zjbnyd='<spring:message code="jes.WebContent.res.js.sys.instList.zjbnyd"></spring:message>';//自己不能移动在本身节点下
        var instList_qdyjjd='<spring:message code="jes.WebContent.res.js.sys.instList.qdyjjd"></spring:message>';//确定要将节点
        var instList_ydd='<spring:message code="jes.WebContent.res.js.sys.instList.ydd"></spring:message>';//移动到
        var instList_jdxm='<spring:message code="jes.WebContent.res.js.sys.instList.jdxm"></spring:message>';//节点下吗?
        var instList_fjdbnyd='<spring:message code="jes.WebContent.res.js.sys.instList.fjdbnyd"></spring:message>';//父节点不能移动到子节点下面
        var instList_yd='<spring:message code="jes.WebContent.res.js.sys.instList.yd"></spring:message>';//移动
        var instList_yxz='<spring:message code="jes.WebContent.res.js.sys.instList.yxz"></spring:message>';//已选择
        var instList_qjxxz='<spring:message code="jes.WebContent.res.js.sys.instList.qjxxz"></spring:message>';//,请继续选择它的新上级机构.点击【刷新】取消选择和移动。
        var instList_qxzydjd='<spring:message code="jes.WebContent.res.js.sys.instList.qxzydjd"></spring:message>';//请选择要移动的节点
        var instList_sx='<spring:message code="jes.WebContent.res.js.sys.instList.sx"></spring:message>';//刷新
        var instList_dqwz='<spring:message code="jes.WebContent.res.js.sys.instList.dqwz"></spring:message>';//当前位置
        var instList_qsrjgmc='<spring:message code="jes.WebContent.res.js.sys.instList.qsrjgmc"></spring:message>';//请输入机构名称
        var instList_jgjc='<spring:message code="jes.WebContent.res.js.sys.instList.jgjc"></spring:message>';//机构简称
        var instList_cx='<spring:message code="jes.WebContent.res.js.sys.instList.cx"></spring:message>';//查询
        var instList_xztj='<spring:message code="jes.WebContent.res.js.sys.instList.xztj"></spring:message>';//新增同级
        var instList_sffrjg='<spring:message code="jes.WebContent.res.js.sys.instList.sffrjg"></spring:message>';//是否法人机构
        var instList_qtxfrdm='<spring:message code="jes.WebContent.res.js.sys.instList.qtxfrdm"></spring:message>';//请填写法人代码
        var instList_bccg='<spring:message code="jes.WebContent.res.js.sys.instList.bccg"></spring:message>';//保存成功
        var instList_bcsb='<spring:message code="jes.WebContent.res.js.sys.instList.bcsb"></spring:message>';//保存失败!
        var instList_ssrsjbpp='<spring:message code="jes.WebContent.res.js.sys.instList.ssrsjbpp"></spring:message>';//所输入的类型与数据库类型不匹配!
        var instList_ssrsjjgbcz='<spring:message code="jes.WebContent.res.js.sys.instList.ssrsjjgbcz"></spring:message>';//所输入的上级机构不存在!
        var instList_ssrbhycz='<spring:message code="jes.WebContent.res.js.sys.instList.ssrbhycz"></spring:message>';//所输入的编号已存在!
        var instList_ssrfrycz='<spring:message code="jes.WebContent.res.js.sys.instList.ssrfrycz"></spring:message>';//所输入的法人代码已存在!
        var instList_sjjgbnhdyy='<spring:message code="jes.WebContent.res.js.sys.instList.sjjgbnhdyy"></spring:message>';//上级机构不能和·一样!
        var instList_cxyxcw='<spring:message code="jes.WebContent.res.js.sys.instList.cxyxcw"></spring:message>';//程序运行错误,请重试
        var instList_cxcw='<spring:message code="jes.WebContent.res.js.sys.instList.cxcw"></spring:message>';//程序错误,请重试
        var instList_qxztjjg='<spring:message code="jes.WebContent.res.js.sys.instList.qxztjjg"></spring:message>';//请选择同级机构
        var instList_xzxj='<spring:message code="jes.WebContent.res.js.sys.instList.xzxj"></spring:message>';//新增下级
        var instList_sjjgyy='<spring:message code="jes.WebContent.res.js.sys.instList.sjjgyy"></spring:message>';//上级机构不能和机构编号一样!
        var instList_qxzsjjg='<spring:message code="jes.WebContent.res.js.sys.instList.qxzsjjg"></spring:message>';//请选择上级机构
        var instList_sc1='<spring:message code="jes.WebContent.res.js.sys.instList.sc1"></spring:message>';//删除
        var instList_rhjxccz='<spring:message code="jes.WebContent.res.js.sys.instList.rhjxccz"></spring:message>';//如果进行此操作，将会连带删除用户、角色资源配置等关联数据，确认删除吗？
        var instList_czsb='<spring:message code="jes.WebContent.res.js.sys.instList.czsb"></spring:message>';//操作失败!
        var instList_sccg='<spring:message code="jes.WebContent.res.js.sys.instList.sccg"></spring:message>';//删除成功
        var instList_qxzbhzjg='<spring:message code="jes.WebContent.res.js.sys.instList.qxzbhzjg"></spring:message>';//您所选中的还包含子机构，请先删除子机构
        var instList_sxzhzczjl='<spring:message code="jes.WebContent.res.js.sys.instList.sxzhzczjl"></spring:message>';//您所选中的机构在汇总关系中存在记录，请先解除关系
        var instList_qxychzsc='<spring:message code="jes.WebContent.res.js.sys.instList.qxychzsc"></spring:message>';//您所选中机构，存在人员，请先移除后再删除
        var instList_csxzyh='<spring:message code="jes.WebContent.res.js.sys.instList.csxzyh"></spring:message>';//至少选择一行！
        var instList_dr='<spring:message code="jes.WebContent.res.js.sys.instList.dr"></spring:message>';//导入
        var instList_drwj='<spring:message code="jes.WebContent.res.js.sys.instList.drwj"></spring:message>';//导入Excel文件
        var instList_wj='<spring:message code="jes.WebContent.res.js.sys.instList.wj"></spring:message>';//文件
        var instList_ll='<spring:message code="jes.WebContent.res.js.sys.instList.ll"></spring:message>';//浏览
        var instList_zzsc='<spring:message code="jes.WebContent.res.js.sys.instList.zzsc"></spring:message>';//正在上传，请稍后
        var instList_gb='<spring:message code="jes.WebContent.res.js.sys.instList.gb"></spring:message>';//关闭
        var instList_dc='<spring:message code="jes.WebContent.res.js.sys.instList.dc"></spring:message>';//导出
        var instList_xh='<spring:message code="jes.WebContent.res.js.sys.instList.xh"></spring:message>';//序号
        var instList_jgbh='<spring:message code="jes.WebContent.res.js.sys.instList.jgbh"></spring:message>';//机构编号
        var instList_jgmc='<spring:message code="jes.WebContent.res.js.sys.instList.jgmc"></spring:message>';//机构名称
        var instList_jgdz='<spring:message code="jes.WebContent.res.js.sys.instList.jgdz"></spring:message>';//机构地址
        var instList_sjjg='<spring:message code="jes.WebContent.res.js.sys.instList.sjjg"></spring:message>';//上级机构
        var instList_jgdh='<spring:message code="jes.WebContent.res.js.sys.instList.jgdh"></spring:message>';//机构电话
        var instList_jrxk='<spring:message code="jes.WebContent.res.js.sys.instList.jrxk"></spring:message>';//金融许可证号
        var instList_ms='<spring:message code="jes.WebContent.res.js.sys.instList.ms"></spring:message>';//描述
        var instList_qyjy='<spring:message code="jes.WebContent.res.js.sys.instList.qyjy"></spring:message>';//启用/禁用
        var instList_czcg='<spring:message code="jes.WebContent.res.js.sys.instList.czcg"></spring:message>';//操作成功！
        var instList_ck='<spring:message code="jes.WebContent.res.js.sys.instList.ck"></spring:message>';//查  看
        var instList_xg='<spring:message code="jes.WebContent.res.js.sys.instList.xg"></spring:message>';//修  改
        var instList_xgcg='<spring:message code="jes.WebContent.res.js.sys.instList.xgcg"></spring:message>';//修改成功
        var instList_xgsb ='<spring:message code="jes.WebContent.res.js.sys.instList.xgsb"></spring:message>';//修改失败!
        var instList_sjjgbcz ='<spring:message code="jes.WebContent.res.js.sys.instList.sjjgbcz"></spring:message>';//上级机构不存在!
        var instList_sc2 ='<spring:message code="jes.WebContent.res.js.sys.instList.sc2"></spring:message>';//删  除
        instWin_s='<spring:message code="jes.WebContent.res.js.app.instWin_s"></spring:message>';/*"是"*/
        var instWin_f='<spring:message code="jes.WebContent.res.js.app.instWin_f"></spring:message>';/*"否"*/
        var instWin_jgxxxx='<spring:message code="jes.WebContent.res.js.app.instWin_jgxxxx"></spring:message>';/*'机构详细信息'*/	
        var instWin_xxjg='<spring:message code="jes.WebContent.res.js.app.instWin_xxjg"></spring:message>';/*'修改机构'*/	
        var instWin_tjjg='<spring:message code="jes.WebContent.res.js.app.instWin_tjjg"></spring:message>';/*'添加机构'*/	
        var instWin_jbxx='<spring:message code="jes.WebContent.res.js.app.instWin_jbxx"></spring:message>';/*'基本信息'*/
        var instWin_jgbh='<spring:message code="jes.WebContent.res.js.app.instWin_jgbh"></spring:message>';/*'机构编号'*/
        var instWin_bnhyhz='<spring:message code="jes.WebContent.res.js.app.instWin_bnhyhz"></spring:message>';/*"不能含有汉字！"*/
        var instWin_jgmv='<spring:message code="jes.WebContent.res.js.app.instWin_jgmv"></spring:message>';/*'机构名称'*/
        var instWin_jgjc='<spring:message code="jes.WebContent.res.js.app.instWin_jgjc"></spring:message>';/*'机构简称'*/
        var instWin_sjjg='<spring:message code="jes.WebContent.res.js.app.instWin_sjjg"></spring:message>';/*'上级机构'*/
        var instWin_jgjb='<spring:message code="jes.WebContent.res.js.app.instWin_jgjb"></spring:message>';/*'机构级别'*/
        var instWin_tzxx='<spring:message code="jes.WebContent.res.js.app.instWin_tzxx"></spring:message>';/*'拓展信息'*/
        var instWin_ssxz='<spring:message code="jes.WebContent.res.js.app.instWin_ssxz"></spring:message>';/*'所属性质'*/
        var instWin_sffrjg='<spring:message code="jes.WebContent.res.js.app.instWin_sffrjg"></spring:message>';/*'是否法人机构'*/
        var instWin_sfzh='<spring:message code="jes.WebContent.res.js.app.instWin_sfzh"></spring:message>';/*'是否总行'*/
        var instWin_sfglh='<spring:message code="jes.WebContent.res.js.app.instWin_sfglh"></spring:message>';/*'是否管理行'*/
        var instWin_zdlx='<spring:message code="jes.WebContent.res.js.app.instWin_zdlx"></spring:message>';/*'制度类型'*/
        var instWin_qxz='<spring:message code="jes.WebContent.res.js.app.instWin_qxz"></spring:message>';/*'请选择'*/
        var instWin_fr='<spring:message code="jes.WebContent.res.js.app.instWin_fr"></spring:message>';/*'法人'*/
        var instWin_csh='<spring:message code="jes.WebContent.res.js.app.instWin_csh"></spring:message>';/*'城商行'*/
        var instWin_gfz='<spring:message code="jes.WebContent.res.js.app.instWin.gfz"></spring:message>';/*'股份制'*/
        var instWin_fgyhfh='<spring:message code="jes.WebContent.res.js.app.instWin.fgyhfh"></spring:message>';/*'外国银行分行'*/
        var instWin_ncls='<spring:message code="jes.WebContent.res.js.app.instWin.ncls"></spring:message>';/*'农信联社'*/
        var instWin_czyh='<spring:message code="jes.WebContent.res.js.app.instWin.czyh"></spring:message>';/*'村镇银行'*/
        var instWin_zzxyh='<spring:message code="jes.WebContent.res.js.app.instWin.zzxyh"></spring:message>';/*'政策性银行'*/
        var instWin_fyjg='<spring:message code="jes.WebContent.res.js.app.instWin.fyjg"></spring:message>';/*'非银机构'*/
        var instWin_xzbh='<spring:message code="jes.WebContent.res.js.app.instWin.xzbh"></spring:message>';/*'邮政编码'*/
        var instWin_ybyw='<spring:message code="jes.WebContent.res.js.app.instWin.ybyw"></spring:message>';/*"邮编有误，请输入正确的邮编！"*/
        var instWin_qybs='<spring:message code="jes.WebContent.res.js.app.instWin.qybs"></spring:message>';/*'启用标识'*/
        var instWin_dqdm='<spring:message code="jes.WebContent.res.js.app.instWin.dqdm"></spring:message>';/*'地区代码'*/
        var instWin_dqdmyw='<spring:message code="jes.WebContent.res.js.app.instWin.dqdmyw"></spring:message>';/*"地区代码有误，请输入正确的地区代码！"*/
        var instWin_jrjgbsm='<spring:message code="jes.WebContent.res.js.app.instWin.jrjgbsm"></spring:message>';/*'金融机构标识码'*/
        var instWin_jrjgbsmyw='<spring:message code="jes.WebContent.res.js.app.instWin.jrjgbsmyw"></spring:message>';/*"金融机构标识码有误，请输入正确的金融机构标识码！"*/
        var instWin_jgbzhdm='<spring:message code="jes.WebContent.res.js.app.instWin.jgbzhdm"></spring:message>';/*'机构标准化代码'*/
        var instWin_jrjgbzhdmyw='<spring:message code="jes.WebContent.res.js.app.instWin.jrjgbzhdmyw"></spring:message>';/*"金融机构标准化代码有误，请输入正确的金融机构标准化代码！"*/
        var instWin_frdm='<spring:message code="jes.WebContent.res.js.app.instWin.frdm"></spring:message>';/*'法人代码'*/
        var instWin_frdmyw='<spring:message code="jes.WebContent.res.js.app.instWin.frdmyw"></spring:message>';/*"法人代码有误，请输入正确的法人代码！"*/
        var instWin_jrxkzh='<spring:message code="jes.WebContent.res.js.app.instWin.jrxkzh"></spring:message>';/*'金融许可证号'*/
        var instWin_14jrjgdm='<spring:message code="jes.WebContent.res.js.app.instWin.14jrjgdm"></spring:message>';/*'14位金融机构代码'*/
        var instWin_nsrsbh='<spring:message code="jes.WebContent.res.js.app.instWin.nsrsbh"></spring:message>';/*'纳税人识别号'*/
        var instWin_qtxx='<spring:message code="jes.WebContent.res.js.app.instWin.qtxx"></spring:message>';/*'其他信息'*/
        var instWin_ympx='<spring:message code="jes.WebContent.res.js.app.instWin.ympx"></spring:message>';/*'页面排序'*/
        var instWin_qsrsz='<spring:message code="jes.WebContent.res.js.app.instWin.qsrsz"></spring:message>';/*'请输入数值'*/
        var instWin_jgdh='<spring:message code="jes.WebContent.res.js.app.instWin.jgdh"></spring:message>';/*'机构电话'*/										
        var instWin_jgdhyw='<spring:message code="jes.WebContent.res.js.app.instWin.jgdhyw"></spring:message>';/*"机构电话有误，请输入正确的机构电话！"*/										
        var instWin_jgcz='<spring:message code="jes.WebContent.res.js.app.instWin.jgcz"></spring:message>';/*'机构传真'*/
        var instWin_jgczyw='<spring:message code="jes.WebContent.res.js.app.instWin.jgczyw"></spring:message>';/*"机构传真有误，请输入正确的传真号！"*/
        var instWin_jgdz='<spring:message code="jes.WebContent.res.js.app.instWin.jgdz"></spring:message>';/*'机构地址'*/										
        var instWin_qyrq='<spring:message code="jes.WebContent.res.js.app.instWin.qyrq"></spring:message>';/*'启用日期'*/										
        var instWin_zzrq='<spring:message code="jes.WebContent.res.js.app.instWin.zzrq"></spring:message>';/*'终止日期'*/										
        var instWin_zzrqbnzyqsrq='<spring:message code="jes.WebContent.res.js.app.instWin.zzrqbnzyqsrq"></spring:message>';/*'终止日期不得早于启用日期'*/
        var instWin_jgms='<spring:message code="jes.WebContent.res.js.app.instWin.jgms"></spring:message>';/*'机构描述'*/
        var instWin_bc='<spring:message code="jes.WebContent.res.js.app.instWin.bc"></spring:message>';/*'保存'*/

        </script>
    <script type="text/javascript" src="${app}/res/js/sys/instList.js"></script>

</head>

<body>
<iframe width="0" height="0" id="download"></iframe>
</body>
</html>