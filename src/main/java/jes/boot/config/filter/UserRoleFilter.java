package jes.boot.config.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.context.support.WebApplicationContextUtils;
import jes.exception.PermissionDeniedException;
import jes.pub.entity.User;
import jes.pub.runtime.Login;
import jes.pub.runtime.LoginManager;
import jes.subsystem.dao.UserMapper;
import jes.utils.DateUtil;
import jes.utils.SSOHelper;
import jes.utils.StringUtil;
import jes.utils.TimeoutCacheUtil;

@WebFilter(filterName = "userRoleFilter", urlPatterns = {"*.do", "*.ajax"})
public class UserRoleFilter implements Filter {

	// @Autowired
	// FeignSysOrg feignSysOrg;
	public static final String SESSION_LOGIN_LOGIN = "SESSION_LOGIN_LOGIN";
	private UserMapper userMapper = null;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		userMapper = WebApplicationContextUtils.getWebApplicationContext(filterConfig.getServletContext()).getBean(UserMapper.class);
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		Login login = null;
		// JSONObject json=feignSysOrg.getUserInfoByToken();
		// String loginId = (String)
		// json.getJSONObject("result").get("userCode");
		String loginId = "admin";
		login = (Login) TimeoutCacheUtil.get(loginId);
		// if (loginId == null) {
		// throw deniedRequest(request);
		// }
		if (null == login || null == login.getLoginId() || (null != loginId && !loginId.equals(login.getLoginId()))) {
			login = makeLogin(loginId, request);
			if (login == null) {
				throw deniedRequest(request);
			}
		}
		LoginManager.setLogin(login);
		chain.doFilter(req, response);
	}

	public PermissionDeniedException deniedRequest(HttpServletRequest request) {
		return new PermissionDeniedException("未授权的访问!" + getRequestInfo(request));
	}

	private String getRequestInfo(HttpServletRequest request) {
		// 客户端的IP,时间,请求地址等等信息
		StringBuffer info = new StringBuffer();
		info.append("客户端IP:" + SSOHelper.getRemoteAddr(request));
		info.append("请求时间:" + DateUtil.getNowTime());
		info.append("请求地址:" + request.getRequestURI());
		return info.toString();
	}

	private Login makeLogin(String loginId, HttpServletRequest request) {
		// String userId = Login.parseUserIdByLoginId(loginId);
		User user = userMapper.selectByPrimaryKey(loginId);
		if (!StringUtil.isEmpty(user)) {
			Login login = new Login();
			login.initLogin(request);
			login.setLoginId(loginId);
			login.setLogined(true);
			login.setUser(user);
			TimeoutCacheUtil.put(loginId, login);
			return login;
		}
		return null;
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}
}
