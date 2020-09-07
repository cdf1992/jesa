package jes.boot.config.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCodeEnum {

	ok(HttpStatus.OK.value(), "成功"),
	invalidParameter(HttpStatus.BAD_REQUEST.value(), "请求参数非法"),
	repeatRequest(HttpStatus.BAD_REQUEST.value(), "请求参数非法，重复请求"),
	METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED.value(), "request_method_not_supported"),
	UNSUPPORTED_MEDIA_TYPE(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), HttpStatus.UNSUPPORTED_MEDIA_TYPE.getReasonPhrase()),
	serverError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "服务器内部错误"),
	InvocationOfServiceException(HttpStatus.SERVICE_UNAVAILABLE.value(), "调用服务异常"),
	unAuthorized(HttpStatus.BAD_REQUEST.value(), "未登录或登录失效"),
	custodyOfServiceException(HttpStatus.SERVICE_UNAVAILABLE.value(), "新网接口调用异常"),
	feignCallFail(HttpStatus.SERVICE_UNAVAILABLE.value(), "内部接口调用异常"),
	dataNotFuond(HttpStatus.BAD_REQUEST.value(), "数据异常，未找到数据");

	private int statuCode;
	private String message;

	ErrorCodeEnum(int statuCode, String message) {
		this.statuCode = statuCode;
		this.message = message;
	}

	public int getStatuCode() {
		return statuCode;
	}

	public String getMessage() {
		return message;
	}
}
