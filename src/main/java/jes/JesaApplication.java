package jes;

import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import jes.pub.ext.spring.JesBeanNameGenerator;

@SpringBootApplication
@Configuration
@EnableAutoConfiguration(exclude = {MultipartAutoConfiguration.class}) 
@MapperScan(
		nameGenerator = JesBeanNameGenerator.class,
		basePackages = {
				"jes.ioc.dao",
				"jes.subsystem.dao",
				"com.*.*.dao"
		}
)
@ComponentScan(
		nameGenerator = JesBeanNameGenerator.class,
		basePackages = {
				"jes.boot",
				"jes.ioc.s",
				"jes.ioc.web.c",
				"jes.subsystem.s",
				"jes.pub.runtime.dao",
				"com.taxExt",
				"com.vms",
				"com.*.*.dao",
				"com.*.*.service"
		}
)
@ServletComponentScan
public class JesaApplication {

	private static final Logger log = LoggerFactory.getLogger(JesaApplication.class);

	public static void main(String[] args) {
		log.info("系统启动.开始 ...");
		SpringApplication.run(JesaApplication.class, args);
		log.info("系统启动.完成 ...");
	}

}
