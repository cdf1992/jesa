package jes.boot.config.exception;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JesErrorPageController {

	@RequestMapping(value = "/error404.do")
	public String error404Page() {
		return "error404";
	}
}
