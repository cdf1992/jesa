package jes.boot.config.exception;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.Method;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;
import jes.utils.ArrayUtils;
import jes.utils.StringUtils;

/**
 * 接口层异常拦截器 返回统一格式报文
 */
@ControllerAdvice
public class ApiExceptionHandler implements AsyncUncaughtExceptionHandler {

	private static final Logger log = LoggerFactory.getLogger(ApiExceptionHandler.class);

	/**
	 * 400 - Bad Request
	 */
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MissingServletRequestParameterException.class)
	@ResponseBody
	public ErrorResponse handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
		log.error("缺少请求参数:{}", e.getParameterName());
		return new ErrorResponse(ErrorCodeEnum.invalidParameter);
	}

	/**
	 * 400 - Bad Request
	 */
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(HttpMessageNotReadableException.class)
	@ResponseBody
	public ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
		log.error("参数解析失败:{}", e.getMessage());
		e.printStackTrace();
		return new ErrorResponse(ErrorCodeEnum.invalidParameter);
	}

	/**
	 * 400 - Bad Request
	 */
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseBody
	public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		log.error("参数验证失败:{}", e.getMessage());
		BindingResult result = e.getBindingResult();
		FieldError error = result.getFieldError();
		String field = error.getField();
		String code = error.getDefaultMessage();
		String message = String.format("%s:%s", field, code);
		return new ErrorResponse(ErrorCodeEnum.invalidParameter, message);
	}

	/**
	 * 400 - Bad Request
	 */
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(BindException.class)
	@ResponseBody
	public ErrorResponse handleBindException(BindException e) {
		log.error("参数绑定失败:{}", e.getMessage());
		BindingResult result = e.getBindingResult();
		FieldError error = result.getFieldError();
		String field = error.getField();
		String code = error.getDefaultMessage();
		String message = String.format("%s:%s", field, code);
		return new ErrorResponse(ErrorCodeEnum.invalidParameter, message);
	}

	/**
	 * 400 - Bad Request
	 */
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(ConstraintViolationException.class)
	@ResponseBody
	public ErrorResponse handleServiceException(ConstraintViolationException e) {
		log.error("参数验证失败:", e.getMessage());
		Set<ConstraintViolation<?>> violations = e.getConstraintViolations();
		ConstraintViolation<?> violation = violations.iterator().next();
		String message = violation.getMessage();
		return new ErrorResponse(ErrorCodeEnum.invalidParameter, "parameter:" + message);
	}

	/**
	 * 400 - Bad Request
	 */
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(ValidationException.class)
	@ResponseBody
	public ErrorResponse handleValidationException(ValidationException e) {
		log.error("参数验证失败:{}", e.getMessage());
		return new ErrorResponse(ErrorCodeEnum.invalidParameter, "validation_exception");
	}

	/**
	 * 405 - Method Not Allowed
	 */
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	@ResponseBody
	public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
		log.error("不支持当前请求方法:{}", e.getMethod());
		return new ErrorResponse(ErrorCodeEnum.METHOD_NOT_ALLOWED);
	}

	/**
	 * 415 - Unsupported Media Type
	 */
	@ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
	@ExceptionHandler(HttpMediaTypeNotSupportedException.class)
	@ResponseBody
	public ErrorResponse handleHttpMediaTypeNotSupportedException(Exception e) {
		log.error("不支持当前媒体类型", e.getMessage());
		return new ErrorResponse(ErrorCodeEnum.UNSUPPORTED_MEDIA_TYPE);
	}

	/**
	 * 500 - Internal Server Error
	 */
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Exception.class)
	public ModelAndView handleException(Exception e) {
		log.error("通用异常:{}", e.getMessage(), e);
		ModelAndView view = new ModelAndView("error500");
		StringWriter sw = new StringWriter();
		e.printStackTrace(new PrintWriter(sw));
		view.getModel().put("status", "500");
		view.getModel().put("error", StringUtils.isBlank(e.getMessage()) ? "NULL Exception" : e.getMessage());
		view.getModel().put("message", sw.toString());
		return view;
	}

	@Override
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public void handleUncaughtException(Throwable ex, Method method, Object... params) {
		log.error("未处理的异常:Class:{} method:{},params:{},{}", method.getDeclaringClass().getName(), method.getName(), ArrayUtils.toString(params), ex.getMessage(), ex);
	}
}
