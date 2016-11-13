package cn.info.platform.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import cn.info.platform.dao.UserDao;
import cn.info.platform.entity.User;
import cn.info.platform.util.MD5;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/*")
public class UserController {
	private static Logger logger = Logger.getLogger(UserController.class);
	@Autowired
	private UserDao userDao;

	/**
	 * @param map ModelMap
	 * @param user 用户登陆对象
	 * @param request 请求的对象
	 * @return 要跳转的页面
	 */
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public String login(ModelMap map, User user, HttpServletRequest request) {
		String LOGIN_PAGE = "/index.jsp";
		String FIRST_PAGE = "/summary-summary-feedback.jsp";
		
		String name = request.getParameter("userName");
		String target = null;
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");
		if ((null == user.getUserName() || "".equals(user.getUserName()))
				|| (null == user.getPassWord() || "".equals(user.getPassWord()))) {
			map.put("failure", "用户名或密码不能为空!!!");
			target = LOGIN_PAGE;
		} else {
			MD5 cipher = new MD5();
			String pwd2 = cipher.generatePassword(user.getPassWord());
			user.setPassWord(pwd2);
			if (null != userDao.login(user)) {
				request.getSession().setAttribute("userLogin", user);

				String loginTime = dateformat.format(new Date());
				user.setLoginTime(new Date());
				user.setUserName(name);
				userDao.modify(user);
				
				logger.debug("登录的用户名");
				target = FIRST_PAGE;
				logger.debug(target);
				return "redirect:"+target;
			} else {
				map.put("failure", "用户名或密码有误!!");
				target = LOGIN_PAGE;
			}
		}
		logger.debug(target);
		return target;
	}
	
	
	/**
	 * @param map ModelMap
	 * @param user 用户登陆对象
	 * @param request 请求的对象
	 * @return 要跳转的页面
	 */
	@RequestMapping(value = "loginOut", method = RequestMethod.GET)
	public String loginOut(ModelMap map, User user, HttpServletRequest request) {
		String LOGIN_PAGE = "/index.jsp";
		String FIRST_PAGE = "/summary-realtime.jsp";
		
		String target = LOGIN_PAGE;
		request.getSession().setAttribute("userLogin", null);
		logger.debug(target);
		return target;
	}
}
