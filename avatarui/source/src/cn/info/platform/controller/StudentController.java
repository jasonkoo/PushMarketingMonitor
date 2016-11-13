package cn.info.platform.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import cn.info.platform.dao.StudentDao;
import cn.info.platform.entity.Student;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/student/*")
public class StudentController {
	private static Logger logger = Logger.getLogger(StudentController.class);
	@Autowired
	private StudentDao studentDao;

	private Student student;
	@RequestMapping(value = "studentList", method = RequestMethod.POST)
	public void studentList(HttpServletRequest request, HttpServletResponse response) {
		SimpleDateFormat dateformatT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		
		//查询出记录后的时间
		Long startTime = System.currentTimeMillis();

		student = new Student();
		int rowsNum = Integer.parseInt(request.getParameter("rowsNum"));
		int pageNow = Integer.parseInt(request.getParameter("pageNow"));
		
		String sortRule = request.getParameter("sortRule");
		String sortOrderBy = request.getParameter("sortOrderBy");
		
		Integer limit = (pageNow-1)*rowsNum;
		Integer offset = rowsNum;
		
		//获得数据总量
		Integer studentTotal = studentDao.studentAll();
		
		//获得数据列表
		ArrayList<Student> studentList = null;
		if(sortOrderBy != null) {
			System.out.println("sortOrderBy---"+sortOrderBy);
			studentList = studentDao.studentList(sortOrderBy, sortRule, limit, offset);
		}else{
			studentList = studentDao.studentList("", "", limit, offset);
		}
		
		//查询出记录后的时间
		Long midTime = System.currentTimeMillis();

		StringBuffer jsonString = new StringBuffer();
		String jsonString2 = "";
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");
		jsonString.append("{\"pageNow\":"+pageNow+",\"total\":"+studentTotal+",\"rows\":[");
		
		
		for(int i = 0; i < studentList.size(); i++){
			jsonString.append("{\"id\":\""+studentList.get(i).getId()+"\",");
			jsonString.append("\"name\":\""+studentList.get(i).getName()+"\",");
			jsonString.append("\"email\":\""+studentList.get(i).getEmail()+"\",");
			jsonString.append("\"score\":\""+studentList.get(i).getScore()+"\",");
			String dateString = dateformat.format(studentList.get(i).getDate());
			jsonString.append("\"date\":\""+dateString+"\"},");
		}
		jsonString2 = jsonString.deleteCharAt(jsonString.length() - 1).toString();
		jsonString2 += "]}";
		
		Long endTime = System.currentTimeMillis();
		String startE = dateformatT.format(new Date());
		
		System.out.println(jsonString2);
		
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		try {
			response.getWriter().write(jsonString2);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "studentListFirstColSeparation", method = RequestMethod.POST)
	public void studentListFirstColSeparation(HttpServletRequest request, HttpServletResponse response) {
		SimpleDateFormat dateformatT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		
		//查询出记录后的时间
		Long startTime = System.currentTimeMillis();
		String startS = dateformatT.format(new Date());

		student = new Student();
		int rowsNum = Integer.parseInt(request.getParameter("rowsNum"));
		int pageNow = Integer.parseInt(request.getParameter("pageNow"));
		
		String a = request.getParameter("a");
		System.out.println(a);
		
		String sortRule = request.getParameter("sortRule");
		String sortOrderBy = request.getParameter("sortOrderBy");
		
		Integer limit = (pageNow-1)*rowsNum;
		Integer offset = rowsNum;
		
		//获得数据总量
		Integer studentTotal = studentDao.studentAll();
		
		//获得数据列表
		ArrayList<Student> studentList = null;
		if(sortOrderBy != null) {
			System.out.println("sortOrderBy---"+sortOrderBy);
			studentList = studentDao.studentList(sortOrderBy, sortRule, limit, offset);
		}else{
			studentList = studentDao.studentList("", "", limit, offset);
		}
		
		//查询出记录后的时间
		Long midTime = System.currentTimeMillis();
		String startM = dateformatT.format(new Date());

		StringBuffer jsonString = new StringBuffer();
		String jsonString2 = "";
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");
		jsonString.append("{\"pageNow\":"+pageNow+",\"total\":"+studentTotal+",\"rows\":[");
		
		
		for(int i = 0; i < studentList.size(); i++){
			int n = i / 3;
			jsonString.append("{\"firstRowspanName\":\"week"+n+"\",");
			jsonString.append("\"firstCol\":\"week"+i+"\",");
			jsonString.append("\"id\":\""+studentList.get(i).getId()+"\",");
			jsonString.append("\"name\":\""+studentList.get(i).getName()+"\",");
			jsonString.append("\"email\":\""+studentList.get(i).getEmail()+"\",");
			jsonString.append("\"score\":\""+studentList.get(i).getScore()+"\",");
			String dateString = dateformat.format(studentList.get(i).getDate());
			jsonString.append("\"date\":\""+dateString+"\"},");
		}
		jsonString2 = jsonString.deleteCharAt(jsonString.length() - 1).toString();
		jsonString2 += "]}";
		
		Long endTime = System.currentTimeMillis();
		String startE = dateformatT.format(new Date());
		
		System.out.println(jsonString2);
		
		System.out.println("查询出数据的时间：" + (midTime - startTime));
		System.out.println("拼合json数据的时间：" + (endTime - midTime));
		
		try {
			response.getWriter().write(jsonString2);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	@RequestMapping(value = "form", method = RequestMethod.GET)
	public void form(HttpServletRequest request, HttpServletResponse response) {
		
		try {
			request.setAttribute("str", "123.jsp, 456.jsp");
			request.getRequestDispatcher("../demo.jsp").forward(request,response);
		} catch (ServletException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	

}
