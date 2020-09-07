<%@ page language="java" import="jes.utils.HtmlEncoder"  contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
</head>
<body>
	<!-- 404 -->
	<h3>您访问的地址不存在：<b><%= HtmlEncoder.encode(request.getAttribute("originalURL")) %>.</b></h3>
	<%
		//crack for ie 404 page.
		//response.setStatus(220);
	 %>
</body>
</html>