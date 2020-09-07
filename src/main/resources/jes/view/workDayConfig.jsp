<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//Dspan HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dspan">
<html>
<head>
<%@ include file="jes/view/inc/head.httl"%>
<%@ include file="jes/view/inc/extjs.httl"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<script  type="text/javascript">
var workDayConfig_biaozhun='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.biaozhun"></spring:message>';//标准
var workDayConfig_qgzr='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.qgzr"></spring:message>';//全工作日
var workDayConfig_shi='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.shi"></spring:message>';//是
var workDayConfig_fou='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.fou"></spring:message>';//否
var workDayConfig_baocun='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.baocun"></spring:message>';//保存
var workDayConfig_quxiao='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.quxiao"></spring:message>';//取消
var workDayConfig_tishi='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.tishi"></spring:message>';//提示
var workDayConfig_czsb='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.czsb"></spring:message>';//操作失败!
var workDayConfig_xgcg='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.xgcg"></spring:message>';//修改成功...
var workDayConfig_xzrq='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.xzrq"></spring:message>';//选择日期
var workDayConfig_xitong='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.xitong"></spring:message>';//系统
var workDayConfig_zhi='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.zhi"></spring:message>';//至
var workDayConfig_rili='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.rili"></spring:message>';//日历
var workDayConfig_qxzrl='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.qxzrl"></spring:message>';//请选择日历
var workDayConfig_scdqrl='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.scdqrl"></spring:message>';//删除当前日历
var workDayConfig_nqdyscrl='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.nqdyscrl"></spring:message>';//您确定要删除日历
var workDayConfig_sccg='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.sccg"></spring:message>';//删除成功！
var workDayConfig_rlbcz='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.rlbcz"></spring:message>';//日历不存在！
var workDayConfig_cshrl='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.cshrl"></spring:message>';//初始化日历
var workDayConfig_qxznycshdrl='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.qxznycshdrl"></spring:message>';//请选择您要初始化的日历！
var workDayConfig_nqdycshrl='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.nqdycshrl"></spring:message>';//您确定要初始化日历
var workDayConfig_qnqdnycshdqznf='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.qnqdnycshdqznf"></spring:message>';//请您确定您要初始化的起止年份
var workDayConfig_qsn='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.qsn"></spring:message>';//起始年
var workDayConfig_zzn='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.zzn"></spring:message>';//终止年
var workDayConfig_queding='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.queding"></spring:message>';//确定
var workDayConfig_cshcg='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.cshcg"></spring:message>';//初始化成功！
var workDayConfig_lbckdqrl='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.lbckdqrl"></spring:message>';//列表查看当前日历
var workDayConfig_rllbxs='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.rllbxs"></spring:message>';//日历列表显示
var workDayConfig_rlbh='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.rlbh"></spring:message>';//日历编号
var workDayConfig_tsdgzr='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.tsdgzr"></spring:message>';//特殊的工作日
var workDayConfig_qsnbndyzzn='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.qsnbndyzzn"></spring:message>';//起始年不能大于终至年，请重新选择年限！
var workDayConfig_tsdjjr='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.tsdjjr"></spring:message>';//特殊的节假日
var workDayConfig_chaxun='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.chaxun"></spring:message>';//查询
var workDayConfig_riqi='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.riqi"></spring:message>';//日期
var workDayConfig_sfwgzr='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.sfwgzr"></spring:message>';//是否为工作日
var workDayConfig_jjrxx='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.jjrxx"></spring:message>';//节假日信息
var workDayConfig_zhou='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.zhou"></spring:message>';//周
var workDayConfig_ri='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.ri"></spring:message>';//日
var workDayConfig_yi='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.yi"></spring:message>';//一
var workDayConfig_er='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.er"></spring:message>';//二
var workDayConfig_san='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.san"></spring:message>';//三
var workDayConfig_si='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.si"></spring:message>';//四
var workDayConfig_wu='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.wu"></spring:message>';//五
var workDayConfig_liu='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.liu"></spring:message>';//六
var workDayConfig_daoru='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.daoru"></spring:message>';//导入
var workDayConfig_drexcelwj='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.drexcelwj"></spring:message>';//导入Excel文件
var workDayConfig_wenjian='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.wenjian"></spring:message>';//文件
var workDayConfig_liulan='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.liulan"></spring:message>';//浏览...
var workDayConfig_zydrd='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.zydrd"></spring:message>';//注意： 导入的excel文件，从第二行开始录入数据：第一列为数据日期（格式：yyyy-MM-dd）,第二列为是否为工作日（取值：N/Y），第三列为节假日信息（例如：元旦）
var workDayConfig_zzsc='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.zzsc"></spring:message>';//正在上传，请稍后...
var workDayConfig_yxqx='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.yxqx"></spring:message>';//有效期限
var workDayConfig_xzrl='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.xzrl"></spring:message>';//新增日历
var workDayConfig_rlbhz='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.rlbhz"></spring:message>';//日历编号中不能包含下划线 _
var workDayConfig_nqdsyb='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.nqdsyb"></spring:message>';//您确定是要把
var workDayConfig_zjd='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.zjd"></spring:message>';//增加到
var workDayConfig_xzcshnf='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.xzcshnf"></spring:message>';//选择初始化年份
var workDayConfig_xzcg='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.xzcg"></spring:message>';//新增成功
var workDayConfig_xzsb='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.xzsb"></spring:message>';//新增失败，日历已存在！
var workDayConfig_rlmcbnwk='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.rlmcbnwk"></spring:message>';//日历名称不能为空！
var workDayConfig_qxtxbh='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.qxtxbh"></spring:message>';//请先填写编号！
var workDayConfig_rlmc='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.rlmc"></spring:message>';//日历名称
var workDayConfig_leixing='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.leixing"></spring:message>';//类型
var workDayConfig_xgrqbzcshfwn='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.xgrqbzcshfwn"></spring:message>';//您修改的日期不在初始化范围内，请先初始化该日历！
var workDayConfig_gzztyxg='<spring:message code="jes.WebContent.res.js.sys.workDayConfig.gzztyxg"></spring:message>';//工作状态有修改！
</script>
<script type="text/javascript" src="${app}/res/js/sys/workDayConfig.js"></script>
<style>
.title {
	width: 14%;
	height: 4%;
	border-bottom: solid 1px #c3ccd5;
	float: left;
	text-align: center;
	background-color: #EEEEEE;
}

.title_head {
	text-align: center;
	width: 14.8%;
	height: 4%;
	float: left;
	border-bottom: solid 1px #c3ccd5;
	background-color: #EBEBEB;
}

.work {
	background-image: url("${app}/res/img/icon16/call.png");
	background-color: white;
}

.offwork {
	background-image: url("${app}/res/img/icon16/iphone.png");
	background-color: #d1d4d7;
}

.work,.offwork {
	background-repeat: no-repeat;
	border-bottom: solid 1px #c3ccd5;
	border-right: solid 1px #c3ccd5;
	height: 16%;
	float: left;
	text-align: center;
	font-size: 18px;
	padding: 30px;
}
</style>
</head>

<body>

	<div id="monthView"
		style="width: 100%; height: 100%; position: relative; border: 0;"
		ondblclick="setWorkDay(event)">

		<span class="title_head">日</span> <span class="title">一</span> <span
			class="title">二</span> <span class="title">三</span> <span
			class="title">四</span> <span class="title">五</span> <span
			class="title_head">六</span> ${monthView}
	</div>
	<script type="text/javascript">
	
	var workDays = new Array();
	var subSysData = ${subSysData};
	var calendarData = ${calendarData};
	var baseType = null;
	var drawSsId = 'BSYS';
	var drawCalendarId = '0001';

	document.body.onselectstart = document.body.ondrag = function(){
	    return false;
	}

	function drawCalendar(ssId,calendarId,date){
		
		drawSsId = ssId;
		drawCalendarId = calendarId;
		
		var year = date.getFullYear();
		var month = date.getMonth();
		var newDate = new Date(year,month,1);
		var weak = newDate.getDay();
		var lastMonth = (month==0)? 11:(month-1);
		var lastMonthDays = getMonthDays(year,lastMonth);
		var baseDay = weak==0? lastMonthDays-7:lastMonthDays-weak;
		var theBaseDay=new Date(month==0?year-1:year,lastMonth,baseDay);
		
		Ext.Ajax.request({
	 		url:"getBaseType.do?f=BSYS.0103",
	 		params: {
	            ssId: drawSsId,
	            calendarId: drawCalendarId
	        },
			success: function(response){
				baseType = response.responseText;
				Ext.Ajax.request({
			 		url:"refreshWorkDays.ajax?f=BSYS.0103",
			 		params: {
			            ssId: drawSsId,
			            calendarId: drawCalendarId
			        },
					success: function(response){
						workDays = Ext.decode(response.responseText);
						for(var i=1; i<=42; i++) {
							var today=new Date(theBaseDay-0+i*86400000);
							var id="day"+i;
							writeCell(id,today,month==today.getMonth());
							setWorkFlag(today,id);
						}
					}
			 	});	
			}
	 	});
	}
	function getMonthDays(year,month) {
	  	if(month==0||month==2||month==4||month==6||month==7||month==9||month==11){
			return 31;
	  	}else if(month==1){
			return ((year%4==0)&&(year%100!=0)||year%400==0)?29:28;
	  	}else{
		  	return 30;
	  	}
	}
	function writeCell(id,today,isThisMonth) {
		document.getElementById(id).innerHTML=today.getDate();
	 	document.getElementById(id).style.color=isThisMonth?"black":"#C0C0C0";
	 	document.getElementById(id).dateValue=today;
	}
	function setWork(id) {
	 	document.getElementById(id).isWorkDay=true;
	 	document.getElementById(id).className="work";
	}
	function setOffWork(id) {
	 	document.getElementById(id).isWorkDay=false;
	 	document.getElementById(id).className="offwork";
	}
	function setWorkDay(evt) {
		var daySpan = Ext.EventManager.getTarget(evt);
		var isWorkDay='';
		if(!daySpan.id){
			return;
		}
		if(daySpan.isWorkDay){
			//修改工作状态为'N'
			isWorkDay = 'N';
		}else{
			//修改当前的工作状态为'Y''
			isWorkDay = 'Y';
		}
		changeWorkState(daySpan,isWorkDay);
		return false;
	}
	function changeWorkState(daySpan,isWorkDay) {
		Ext.Ajax.request({
	 		url:"changeWorkState.ajax?f=BSYS.0103.changeWorkState",
	 		params: {
	            ssId: drawSsId,
	            calendarId: drawCalendarId,
	            dateValue: dateFormat(daySpan.dateValue),
	            isWorkDay: isWorkDay
	        },
	        success:function(response) {
	        	var text = Ext.decode(response.responseText);
	        	if(text=="1"){
	        		if(isWorkDay=="Y") {
	        			daySpan.className="work";
	        			daySpan.isWorkDay=true;
	        			Ext.create('widget.uxNotification', {html: workDayConfig_gzztyxg}).show();
	        		}else{
	        			daySpan.className="offwork";
	        		 	daySpan.isWorkDay=false;
	        		 	Ext.create('widget.uxNotification', {html: workDayConfig_gzztyxg}).show();
	        		}
	        	}else{
	        		Ext.MessageBox.alert(workDayConfig_tishi,workDayConfig_xgrqbzcshfwn);
	        	}
	        }
	 	});
	}
	
	function setWorkFlag(today,id){
		var weekDay = today.getDay();
		var isWorkDay = getIsWorkDay(today);
		if(baseType=='normal') {
			if(isWorkDay) {
				isWorkDay=='Y'?setWork(id):setOffWork(id);
			}else {
				(weekDay==0||weekDay==6)?setOffWork(id):setWork(id);
			}
		}else {
			isWorkDay=='N'?setOffWork(id):setWork(id);
		}
	}
	function getIsWorkDay(date) {
		return workDays[date.getFullYear()+'-'+(date.getMonth()+1<10?('0'+(date.getMonth()+1)):(date.getMonth()+1))+'-'
				+(date.getDate()<10?('0'+date.getDate()):date.getDate())];
	}
	function dateFormat(date) {
		return date.getFullYear()+'-'+(date.getMonth()+1<10?('0'+(date.getMonth()+1)):(date.getMonth()+1))+'-'
		+(date.getDate()<10?('0'+date.getDate()):date.getDate());
	}
	drawCalendar(drawSsId,drawCalendarId,new Date());
	
</script>
</body>
</html>