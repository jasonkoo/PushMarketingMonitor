package com.lenovo.lps.push.marketing.monitor.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lenovo.lps.push.marketing.monitor.dao.FeedbackDao;
import com.lenovo.lps.push.marketing.monitor.engine.FeedbackResult;
import com.lenovo.lps.push.marketing.monitor.engine.MdrillEngine;
import com.lenovo.lps.push.marketing.monitor.util.JsonUtil;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/engine/*")
public class EngineController {
	private static Logger logger = Logger.getLogger(EngineController.class);
	@Autowired
	private FeedbackDao feedbackDao;

	// private Feedback feedback;

	@RequestMapping(value = "getFb")
	public void getFb(HttpServletRequest request,
			HttpServletResponse response) {

		logger.info("-------getFb------------ip: " + request.getRemoteAddr());
		FeedbackResult result = new FeedbackResult();
		try {
			String thedate = request.getParameter("thedate");
			String adid = request.getParameter("adid");
			result = MdrillEngine.getFb(feedbackDao, thedate, adid);

		} catch (Exception e) {
			logger.error(e.getMessage());
			result.setMessage(e.getMessage());
		}
		// String jsonStr = result.getMessage();
		String jsonStr = "{\"message\":\"unknown error\":}";
		try {
			jsonStr = JsonUtil.entity2JsonString(result);
			response.getWriter().write(jsonStr);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}

	}
	
	@RequestMapping(value = "getDist")
	public void getDist(HttpServletRequest request,
			HttpServletResponse response) {

		logger.info("-------getDist------------ip: " + request.getRemoteAddr());
		FeedbackResult result = new FeedbackResult();
		try {
			String thedate = request.getParameter("thedate");
			String adid = request.getParameter("adid");
			String col = request.getParameter("col");
			result = MdrillEngine.getDist(feedbackDao, thedate, adid,col);

		} catch (Exception e) {
			logger.error(e.getMessage());
			result.setMessage(e.getMessage());
		}
		// String jsonStr = result.getMessage();
		String jsonStr = "{\"message\":\"unknown error\":}";
		try {
			jsonStr = JsonUtil.entity2JsonString(result);
			response.getWriter().write(jsonStr);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}

	}
}
