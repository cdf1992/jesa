package jes.boot.config;

import java.io.IOException;
import java.nio.charset.Charset;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.lang.Nullable;
import org.springframework.util.StreamUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonStringHttpMessageConverter extends StringHttpMessageConverter {

	private static final Charset CHARSET_UTF8 = Charset.forName("utf-8");

	public JsonStringHttpMessageConverter() {
		super(CHARSET_UTF8);
	}

	@Override
	protected Long getContentLength(String str, @Nullable MediaType contentType) {
		return (long) str.getBytes(CHARSET_UTF8).length;
	}

	@Override
	protected void writeInternal(String str, HttpOutputMessage outputMessage) throws IOException {
		if (str == null) {
			str = "";
		}
		HttpHeaders headers = outputMessage.getHeaders();
		if (headers.getContentType().isCompatibleWith(MediaType.APPLICATION_JSON)) {
			String jsonString = new ObjectMapper().writeValueAsString(str);
			headers.set("Content-Length", String.valueOf(jsonString.getBytes(CHARSET_UTF8).length));
			StreamUtils.copy(jsonString, CHARSET_UTF8, outputMessage.getBody());
		} else {
			headers.set("Content-Length", String.valueOf(str.getBytes(CHARSET_UTF8).length));
			super.writeInternal(str, outputMessage);
		}
	}
}
