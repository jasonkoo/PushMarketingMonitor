package cn.info.platform.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import cn.info.platform.entity.User;

public class LoginFilter implements Filter {
	static Logger logger = Logger.getLogger(LoginFilter.class.getName());
	String LOGIN_PAGE = "/index.jsp";
	protected FilterConfig filterConfig;

	public void destroy() {
		this.filterConfig = null;
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest hrequest = (HttpServletRequest) request;
		HttpServletResponse hresponse = (HttpServletResponse) response;
		HttpSession session = hrequest.getSession();
		try {
			User user = (User) session.getAttribute("userLogin");
			String url = hrequest.getRequestURI();
			if (null == user && !LOGIN_PAGE.equals(url)) {
				hrequest.getRequestDispatcher(LOGIN_PAGE).forward(hrequest, hresponse);
			} else {
				chain.doFilter(request, response);
			}
		} catch (Exception e) {
		}
	}

	public void init(FilterConfig config) throws ServletException {
		logger.info("Login filter init!");
		this.filterConfig = config;
	}

}
