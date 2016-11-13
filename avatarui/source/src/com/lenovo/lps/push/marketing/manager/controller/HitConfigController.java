package com.lenovo.lps.push.marketing.manager.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lenovo.lps.push.marketing.manager.HitConfig;
import com.lenovo.lps.push.marketing.manager.services.HitConfigPackage;
import com.lenovo.lps.push.marketing.manager.services.HitConfigService;

/**
 * @author Gu Lei
 */
@Controller
@RequestMapping("/zkconfig/*")
public class HitConfigController {
	private static Logger logger = Logger.getLogger(HitConfigController.class);
	
	//@Autowired
	private HitConfigService hcs;

	@RequestMapping(value = "hitConfig")
	public void hitConfig(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		logger.debug("-------hitConfig----------------");		
		String action = request.getParameter("action");
		
		if ("a".equals(action)) {
			// add a hit configuration at zkPath
			
		} else if ("v".equals(action)) {
			// view a configuration at zkPath
			
		} else if ("u".equals(action)) {
			
			int res = 0;
			
			// update a configuration at zkPath
			// Receive Parameters
			String minHitIntervalString = request.getParameter("minHitInterval");
			
			if (minHitIntervalString == null || minHitIntervalString.equals("")) {
				res = 1;
				response.sendRedirect("../setting-global.jsp?res=" + res);
				return;
			}
			
			String[] pushHours = request.getParameterValues("pushHours");
			
			String userMaxAdsPerDay = request.getParameter("userMaxAdsPerDay");
			if (userMaxAdsPerDay == null || userMaxAdsPerDay.equals("")) {
				res = 2;
				response.sendRedirect("../setting-global.jsp?res=" + res);
				return;
			}
						
			String testDevicesString = request.getParameter("testDevices");	
			String[] testDevices = 	null;
			if (testDevicesString != null && ! testDevicesString.equals("")) {
				testDevices = testDevicesString.split("\\s*,\\s*");	
			}
				
								
			// Convert String parameters to Object
			HitConfigPackage hcp = new HitConfigPackage();
			HitConfig hitConfig = hcp.pack(minHitIntervalString, pushHours, testDevices, userMaxAdsPerDay);			
		
			
			res = hcs.update(hitConfig);
			
			response.sendRedirect("../setting-global.jsp?res=" + res);
//			request.getRequestDispatcher("../setting-global.jsp").forward(request, response);	
			
		} else if ("d".equals(action)) {
			// delete a configuration at zkPath
			
		} else { // action == null && zkPath == null			
			// zkconfig/hitConfig.do
			// show a configuration for update at zkPath			
			HitConfig hc = hcs.getValue();
			
			//System.out.println(hc.toStringForTest());
			request.setAttribute("hitConfig", hc);			
			request.getRequestDispatcher("update.jsp").forward(request, response);
		}		
	}
	
	
	
	
}
