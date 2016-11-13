package cn.info.platform.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import cn.info.platform.util.CompilerJS;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/compiler/*")
public class CompilerController {
	private static Logger logger = Logger.getLogger(CompilerController.class);
	
	@RequestMapping(value = "compiler", method = RequestMethod.POST)
	public void compiler(Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
		String jsCode = request.getParameter("jsCode");
		String compilerLevel = request.getParameter("compilerLevel");
		
		// 原始文件大小
		float oldLen = jsCode.getBytes().length;
		
		CompilerJS compilerJSCode = new CompilerJS();
		String resultJSCode = compilerJSCode.miniJS(jsCode, compilerLevel);
		
		float newLen = resultJSCode.getBytes().length;
		
		double f1 = new BigDecimal((newLen/oldLen)*100).setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
		DecimalFormat df = new DecimalFormat("#.##");
		String rate = df.format(f1);

		
		Date date = new Date();
		String romdom = String.valueOf(date.getTime());
		HttpSession session = request.getSession();
		String jsUrl = session.getServletContext().getRealPath("/")+"js_compiler/js-"+romdom+"-min.js";
		
		File f = new File(jsUrl);
		if (!f.exists()) {
			f.createNewFile();
		}

		FileWriter fw = null;
		BufferedWriter bw = null;
		try {
			fw = new FileWriter(f);
			bw = new BufferedWriter(fw);
			bw.write(resultJSCode);
			bw.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			bw.close();
		}
		
		String result = resultJSCode+"&&&&&"+oldLen+"&&&&&"+newLen+"&&&&&"+rate+"&&&&&"+romdom;
		
		try {
			response.getWriter().write(result);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	@RequestMapping(value = "compilerUrl", method = RequestMethod.POST)
	public void compilerUrl(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String jsUrl = request.getParameter("jsUrl");
		String jsCode = request.getParameter("jsCode");
		
		response.setContentType("application/x-msdownload");
		String dispposition = null;
		dispposition = "=?UTF-8?q?attachment; filename=js-"+jsUrl+"-min.js";
		response.setHeader("content-disposition", dispposition);

		OutputStream os = null;
		try {
			os = response.getOutputStream();
			byte[] b = jsCode.getBytes();
			os.write(b, 0, b.length);
			os.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				os.close();
			} catch (IOException e) {
			}
		}
	}
}
