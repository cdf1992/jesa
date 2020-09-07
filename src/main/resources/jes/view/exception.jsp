<%@page  isErrorPage="true" %>
<%@page import="org.apache.log4j.Logger"%>
<%@page import="jes.utils.StringUtil"%>
<%! private static final Logger logger = Logger.getLogger("exception.jsp");%>
<html>

<body>
<h5>
====================================================================<br>
error:<%=jes.utils.HtmlEncoder.encode(request.getAttribute("originalURL")) +"//--//"+request.getRequestURL().toString() %><br>
<hr/>
====================================================================<br>
</h5>
<br>
<%
	Throwable t=exception==null?(Throwable)request.getAttribute("exception"):exception;
	logger.error("ex",t);
 	t.printStackTrace();
%>
<hr/>
<%=StringUtil.getErrorDetailMessage(t)%>
</body>
</html>