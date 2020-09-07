package jes.boot.config.service;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jes.pub.entity.AuditLog;
import jes.pub.entity.Inst;
import jes.pub.entity.LoginReg;
import jes.pub.entity.User;
import jes.pub.runtime.Login;
import jes.subsystem.dao.AuditLogMapper;
import jes.subsystem.dao.InstMapper;
import jes.subsystem.dao.LoginRegMapper;
import jes.subsystem.s.MessagesSupport;
import jes.tools.AuthorizationData;
import jes.utils.DateUtil;
import jes.utils.StringUtil;

/**
 * feign
 * @author yujia
 */
@RestController
public class LoginService {

	@Autowired
	private LoginRegMapper loginRegMapper;
	@Autowired
	private AuditLogMapper auditLogMapper;
	@Autowired
	private InstMapper instMapper;

	@RequestMapping(value = "/verifyLoginId", method = RequestMethod.GET)
	public boolean verifyLoginId(@RequestParam("loginId") String loginId) {
		LoginReg reg = loginRegMapper.selectByPrimaryKey(loginId);
		return StringUtil.isEmpty(reg);
	}

	// 用户信息注册
	@RequestMapping(value = "/addLogin", method = RequestMethod.POST)
	public void addLogin(@RequestBody @Valid AuthorizationData ad, @RequestParam("loginId") String loginId, HttpServletRequest request) {
		jes.pub.runtime.Login login = new Login();
		User user = new User();
		user.setUserId(ad.getUserId());
		initUser(user);
		try {
			logOnAuditLog(user);
		} catch (Exception e) {
		}
		login.initLogin(request);
		login.setUser(user);
		login.setUserId(ad.getUserId());
		login.setLoginId(loginId);
		try {
			loginRegMapper.deleteByUserId(login.getUserId());
		} catch (Exception e) {
			// do nothing
		}
		try {
			loginRegMapper.insertSelective(new LoginReg(login));
		} catch (Exception e) {
			// 主键冲突属于正常现象,SSO时
		}
	}

	// 用户信息注销
	@RequestMapping(value = "/deleteLogin", method = RequestMethod.POST)
	public boolean deleteLogin(@RequestParam("loginId") String loginId) {
		int count = 0;
		try {
			count = loginRegMapper.deleteByUserId(loginId);
		} catch (Exception e) {
			// do nothing
		}
		return count > 0;
	}

	/**
	 * 登录时使用
	 * @param user
	 */
	public void initUser(User user) {
		Inst inst = instMapper.selectByPrimaryKey(user.getInstId());
		if (inst != null) {
			user.setHeadquarter("Y".equals(inst.getHeadquartersFlag()));
		}
		user.setTechAdminSs(loginRegMapper.getSsidByTechAdmin(user.getUserId()));
		user.setBusAdminSs(loginRegMapper.getSsidByBusAdmin(user.getUserId()));
	}

	private AuditLog getAuditLogSelf(User user) {
		AuditLog al = new AuditLog();
		al.setSsId("BSYS");
		al.setOperObject(MessagesSupport.getLoggerMessage("jes.subsystem.s.LoginService.OperObject", null));
		al.setOperObjectKey(user.getUserId());
		al.setOperDateTime(DateUtil.getNowTime());
		al.setOperUser(user.getUserId());
		return al;
	}

	public void logOnAuditLog(User user) {
		AuditLog al = getAuditLogSelf(user);
		Object[] args = {user.getUserCname(), user.getDepartId(), user.getMobile()};
		al.setOperType(MessagesSupport.getLoggerMessage("jes.subsystem.s.LoginService.OperTypeUserLogin", null)); // 用户登入
		al.setOperContent(MessagesSupport.getLoggerMessage("jes.subsystem.s.LoginService.OperContentUserLogin", args));// "用户名称:"
																														// +
																														// user.getUserCname()
																														// +
																														// "；部门编号："
																														// +
																														// user.getDepartId()
																														// +
																														// "；手机："
																														// +
																														// user.getMobile()
		auditLogMapper.insert(al);
	}
}
