package jes.boot.config;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import com.alibaba.druid.pool.DruidDataSource;

@Service
@PropertySource(value = {"classpath:jdbc.properties"})
public class DataSourceFactory {

	@Value("${jdbc.url}")
	private String url;
	@Value("${jdbc.driverClassName}")
	private String driverclassname;
	@Value("${jdbc.username}")
	private String username;
	@Value("${jdbc.password}")
	private String password;
	@Value("${ds.maxActive}")
	private String maxActive;

	/** [参考 {@link #url}] */
	public String getUrl() {
		return this.url;
	}

	/** [参考 {@link #url}] */
	public void setUrl(String url) {
		this.url = url;
	}

	/** [参考 {@link #driverclassname}] */
	public String getDriverclassname() {
		return this.driverclassname;
	}

	/** [参考 {@link #driverclassname}] */
	public void setDriverclassname(String driverclassname) {
		this.driverclassname = driverclassname;
	}

	/** [参考 {@link #username}] */
	public String getUsername() {
		return this.username;
	}

	/** [参考 {@link #username}] */
	public void setUsername(String username) {
		this.username = username;
	}

	/** [参考 {@link #password}] */
	public String getPassword() {
		return this.password;
	}

	/** [参考 {@link #password}] */
	public void setPassword(String password) {
		this.password = password;
	}

	/** [参考 {@link #maxActive}] */
	public String getMaxActive() {
		return this.maxActive;
	}

	/** [参考 {@link #maxActive}] */
	public void setMaxActive(String maxActive) {
		this.maxActive = maxActive;
	}

	@Bean
	public DataSource dataSource() {
		DruidDataSource dataSource = new DruidDataSource();
		dataSource.setUrl(getUrl());
		dataSource.setDriverClassName(getDriverclassname());
		dataSource.setUsername(getUsername());
		dataSource.setPassword(getPassword());
		dataSource.setValidationQuery("select * from jes_dual");
		dataSource.setInitialSize(2);
		dataSource.setMaxActive(Integer.valueOf(getMaxActive()));
		return dataSource;
	}

}
