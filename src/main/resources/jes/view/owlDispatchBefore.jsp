<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ include file="inc/top.jsp"%>
<%@ include file="inc/extjs.jsp"%>
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
        var path='123';
        var isSysAdmin ='admin';

        </script>
  	<script>
		${jsContent}
	</script>

</head>
	
<body>
<iframe width="0" height="0" id="download"></iframe>
</body>
</html>