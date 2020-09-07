package jes.boot.config.exception;

import java.io.Serializable;

import jes.utils.DateUtil;

/**
 * @ClassName ErrorResponse
 * @Description
 * @Author lt
 * @Version 1.0
 */
public class ErrorResponse implements Serializable {

	private static final long serialVersionUID = -6281643562110332635L;

	private String message;
	private Integer status;
	private String error;
	private String timestamp;

	/** [参考 {@link #message}] */
	public String getMessage() {
		return this.message;
	}

	/** [参考 {@link #message}] */
	public void setMessage(String message) {
		this.message = message;
	}

	/** [参考 {@link #status}] */
	public Integer getStatus() {
		return this.status;
	}

	/** [参考 {@link #status}] */
	public void setStatus(Integer status) {
		this.status = status;
	}

	/** [参考 {@link #error}] */
	public String getError() {
		return this.error;
	}

	/** [参考 {@link #error}] */
	public void setError(String error) {
		this.error = error;
	}

	/** [参考 {@link #timestamp}] */
	public String getTimestamp() {
		return this.timestamp;
	}

	/** [参考 {@link #timestamp}] */
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public ErrorResponse() {
		this.timestamp = DateUtil.getNow(DateUtil.FORMAT20);
	}

	public ErrorResponse(Integer status, String message) {
		this.status = status;
		this.message = message;
		this.error = message;
		this.timestamp = DateUtil.getNow(DateUtil.FORMAT20);
	}

	public ErrorResponse(ErrorCodeEnum errorCodeEnum) {
		this.timestamp = DateUtil.getNow(DateUtil.FORMAT20);
		this.status = errorCodeEnum.getStatuCode();
		this.message = errorCodeEnum.getMessage();
		this.error = errorCodeEnum.name();
	}

	public ErrorResponse(ErrorCodeEnum errorCodeEnum, String message) {
		this.timestamp = DateUtil.getNow(DateUtil.FORMAT20);
		this.status = errorCodeEnum.getStatuCode();
		this.message = message;
		this.error = errorCodeEnum.name();
	}
}
