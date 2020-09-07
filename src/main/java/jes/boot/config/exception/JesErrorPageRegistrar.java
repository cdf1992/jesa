package jes.boot.config.exception;

import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.ErrorPageRegistrar;
import org.springframework.boot.web.server.ErrorPageRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class JesErrorPageRegistrar implements ErrorPageRegistrar {

	@Override
	public void registerErrorPages(ErrorPageRegistry registry) {
		ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/error404.do");
		registry.addErrorPages(error404Page);
	}
}
