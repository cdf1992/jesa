package jes.boot.config;

import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addRedirectViewController("/", "/login.html");
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
	}

    @Override
	public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
		configurer.favorPathExtension(true)
				.favorParameter(false)
				.defaultContentType(MediaType.APPLICATION_JSON)
				.mediaType("ajax", MediaType.APPLICATION_JSON)
				.mediaType("do", MediaType.valueOf("text/html;charset=UTF-8"));
	}

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		converters.add(0, new JsonStringHttpMessageConverter());
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter(objectMapper);
		converters.add(1, mappingJackson2HttpMessageConverter);
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // 允许跨域访问的路径
				.allowedOrigins("*") // 允许跨域访问的源
				.allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE") // 允许请求方法
				.maxAge(168000) // 预检间隔时间
				.allowedHeaders("*") // 允许头部设置
				.allowCredentials(true); // 是否发送cookie
	}
}
