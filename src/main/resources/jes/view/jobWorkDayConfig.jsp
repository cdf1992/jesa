<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//Dspan HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dspan">
<html>
<head>
<%@ include file="jes/view/inc/head.httl"%>
<%@ include file="jes/view/inc/extjs.httl"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

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
	text-align: left;
	padding: 30px;
}
.tDate{
	font-size: 14px;
    text-align: center;
    position:relative;
	display:block;
	top:-30px;
	left:0px;
	height: 16%;
}

.flowDiv{
	font-size: 12px;
	width:140px;
/* 	border: solid 1px #c3ccd5; */
	position:relative;
	display:block;
	left:-20px;
}
</style>
</head>
	<script>
		${jsContent}
	</script>
<body>

	<div id="monthView" style="width: 100%; height: 100%; position: relative; border: 0;" 
		ondblclick="setWorkDay(event)" >
		<span class="title_head">日</span> <span class="title">一</span> 
		<span class="title">二</span> <span class="title">三</span> <span
			class="title">四</span> <span class="title">五</span> <span
			class="title_head">六</span> ${monthView}
	</div>
	
	<script type="text/javascript">
	
	var workDays = new Array();
	var baseType = null;
	var drawSsId = 'BSYS';
	var drawCalendarId = '0001';
	document.body.onselectstart = document.body.ondrag = function(){
	    return false;
	}
	
	function drawCalendar(ssId,calendarId,date,ids){
		drawSsId = ssId;
		drawCalendarId = calendarId;
		var today1 = '';
		var today42 = '';
		var year = date.getFullYear();
		var month = date.getMonth();
		var newDate = new Date(year,month,1);
		//console.log(newDate);
		var weak = newDate.getDay();
		//console.log(weak);
		var lastMonth = (month==0)? 11:(month-1);
		//console.log(lastMonth);
		var lastMonthDays = getMonthDays(year,lastMonth);
		//console.log(lastMonthDays);
		var baseDay = weak==0? lastMonthDays-7:lastMonthDays-weak;
		//console.log(baseDay);
		var theBaseDay=new Date(month==0?year-1:year,lastMonth,baseDay);
		//console.log(theBaseDay);
		for(var i=1; i<=42; i++) {
			var today=new Date(theBaseDay-0+i*86400000);
			var id="day"+i;
			if(i==1){
				today1 = dateFormat(today);
			}
			if(i==42){
				 today42 = dateFormat(today);
			}
		}
		 //console.log("today1--"+today1+"today42--"+today42);
		 Ext.Ajax.request({
		 		url:"queryOwlJobList.ajax?f=OWL.0107.query",
		 		params: {
		 			beforeScope: today1,
		 			behindScope: today42,
		 			jobIdParam : ids //"11,111,AML1000,4"
		        },
		        success:function(response) {
		        	var text = Ext.decode(response.responseText);
		        	
		      	   	for(var j=0; j<text.loggers.length; j++){ // start
		      	   		var today=new Date(theBaseDay-0+(j+1)*86400000);
	        		 	var id="day"+(j+1);
		      	   		var objList = text.loggers[j];
		      	   		var innHtml = "";
		      	   		//console.log(objList.date.substring(objList.date.length-2,objList.date.length-1));
		      	   		if(objList.date.substring(objList.date.length-2,objList.date.length-1) == '0'){
		      	   		 	innHtml = "<span  class='tDate'> "+objList.date.substring(objList.date.length-1,objList.date.length)+" </span><div class='flowDiv'>";
		      	   		}else{
		      	   		 	innHtml = "<span  class='tDate'> "+objList.date.substring(objList.date.length-2,objList.date.length)+" </span><div class='flowDiv'>";
		      	   		}
	        			for(var i=0; i<text.loggers[j].list.length; i++){
	        				var objList_i = text.loggers[j].list;
	        				if(text.loggers[j].list[i].isRun.indexOf("red") != -1){
	        					innHtml+=text.loggers[j].list[i].jobId+",";
	        				}else if(text.loggers[j].list[i].isRun.indexOf("green") != -1){
	        					innHtml+=text.loggers[j].list[i].jobId+",";
	        				}else{
	        					innHtml+=text.loggers[j].list[i].jobId+",";
	        				}
	        				//console.log(text.loggers[j].list[i]);
	        			}
	        			 innHtml = innHtml.substring(0,innHtml.length-1)+"</div>";
		        		 writeCell(id,today,month==today.getMonth(),innHtml);
        				 setWorkFlag(today,id);  
		        	 }// end
		        }
			});   
		
	}

	function writeCell(id,today,isThisMonth,innHtml) {
		document.getElementById(id).innerHTML=innHtml;
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
	
	function getMonthDays(year,month) {
	  	if(month==0||month==2||month==4||month==6||month==7||month==9||month==11){
			return 31;
	  	}else if(month==1){
			return ((year%4==0)&&(year%100!=0)||year%400==0)?29:28;
	  	}else{
		  	return 30;
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
	drawCalendar(drawSsId,drawCalendarId,new Date(),"11,111,AML1000,4");
	
</script>
</body>
</html>