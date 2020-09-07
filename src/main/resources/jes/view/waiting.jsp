<%@page import="java.net.URLDecoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>

<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
*                 { margin:0; padding:0; overflow-x:hidden; overflow-y:hidden;}
.welcome_bg               { background:url(res/img/hourglass.gif) no-repeat center; position:absolute; top:45%; left:50%; width:600px; height:400px; margin:-200px 0 0 -300px; }
.welcome_bg .welcome_word { padding-top:260px; color:#666; font-size:24px; text-align:center; letter-spacing:3px; }
.back {font-size:12px;}
a,a:hover{ text-decoration:none;background:url('res/img/hourglass.gif') no-repeat;}
</style>
</head>
<body style="background-color: white;">

 <div class="welcome_bg">
		    <p class="welcome_word">等待跑批，请稍后访问我...<span class="back">${back}</span></p>
		</div>
</body>
</html>