package jes.boot.config;

import java.util.Properties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import com.alibaba.druid.support.http.StatViewServlet;
import jes.pub.ext.spring.HttlViewResolver;
import jes.pub.ext.spring.JesContextLoaderListener;
import jes.subsystem.web.f.DisableCachingFilter;
import jes.subsystem.web.f.RequestInitFilter;
import jes.sys.listener.LoginSessionListener;
import jes.sys.listener.SysSessionListener;
import jes.sys.log4jwebtracker.servlet.TrackerServlet;

@Service
public class GlobalConfig {

	@Bean
	public ServletRegistrationBean<DispatcherServlet> dispatcherServletRegister(DispatcherServlet dispatcherServlet) {
		ServletRegistrationBean<DispatcherServlet> register = new ServletRegistrationBean<DispatcherServlet>(dispatcherServlet);
		register.getUrlMappings().clear();
		register.addUrlMappings("/jres/*", "*.html", "*.ajax", "*.do", "/");
		register.setLoadOnStartup(1);
		return register;
	}

	@Bean
    public ServletRegistrationBean<StatViewServlet> statViewServletRegister() {
        return new ServletRegistrationBean<StatViewServlet>(new StatViewServlet(), "/druid/*");
    }

	@Bean
    public ServletRegistrationBean<TrackerServlet> trackerServletRegister() {
        return new ServletRegistrationBean<TrackerServlet>(new TrackerServlet(), "/log4j/*");
    }

	@Bean
	public FilterRegistrationBean<DisableCachingFilter> disableCachingFilterRegister() {
		FilterRegistrationBean<DisableCachingFilter> register = new FilterRegistrationBean<DisableCachingFilter>(new DisableCachingFilter());
		register.addUrlPatterns("*.do", "*.html", "*.ajax");
		return register;
	}

	@Bean
	public FilterRegistrationBean<RequestInitFilter> requestInitFilterRegister() {
		FilterRegistrationBean<RequestInitFilter> register = new FilterRegistrationBean<RequestInitFilter>(new RequestInitFilter());
		register.addUrlPatterns("*.do", "*.html", "*.ajax");
		return register;
	}

	@Bean
	public ServletListenerRegistrationBean<JesContextLoaderListener> jesContextLoaderListenerRegister() {
		return new ServletListenerRegistrationBean<JesContextLoaderListener>(new JesContextLoaderListener());
	}

	@Bean
	public ServletListenerRegistrationBean<LoginSessionListener> loginSessionListenerRegister() {
		return new ServletListenerRegistrationBean<LoginSessionListener>(new LoginSessionListener());
	}

	@Bean
	public ServletListenerRegistrationBean<SysSessionListener> sysSessionListenerRegister() {
		return new ServletListenerRegistrationBean<SysSessionListener>(new SysSessionListener());
	}

	@Bean
	public ViewResolver viewResolver() {
		ViewResolver resolver = new HttlViewResolver();
		return resolver;
	}

	@Bean
	public MultipartResolver multipartResolver() {
		CommonsMultipartResolver resolver = new CommonsMultipartResolver();
		resolver.setMaxUploadSize(200000000);
		return resolver;
	}

	@Bean
	public ResourceBundleMessageSource messageSource() {
		ResourceBundleMessageSource source = new ResourceBundleMessageSource();
		source.setBasename("messages");
		source.setUseCodeAsDefaultMessage(true);
		return source;
	}

	@Bean
	public CookieLocaleResolver localeResolver() {
		CookieLocaleResolver resolver = new CookieLocaleResolver();
		resolver.setCookieName("lang");
		resolver.setCookieMaxAge(360000000);
		return resolver;
	}

	@Bean
	public SimpleMappingExceptionResolver mappingExceptionResolver() {
		SimpleMappingExceptionResolver exceptionResolver = new SimpleMappingExceptionResolver();
		Properties properties = new Properties();
		properties.setProperty("java.lang.Exception", "exception");
		exceptionResolver.setExceptionMappings(properties);
		return exceptionResolver;
	}

}
