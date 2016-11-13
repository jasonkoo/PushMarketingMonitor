package cn.info.platform.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import cn.info.platform.dao.CategoryDao;
import cn.info.platform.entity.Category;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/category/*")
public class CategoryController {
	private static Logger logger = Logger.getLogger(CategoryController.class);
	@Autowired
	private CategoryDao categoryDao;
	private Category category;
	
	
	@RequestMapping(value = "getCategory", method = RequestMethod.POST)
	public void getCategoryByFid(HttpServletRequest request, HttpServletResponse response) {

		int fid = Integer.parseInt(request.getParameter("fid"));
		String getData = (String) request.getParameter("getData");
		
		ArrayList<Category> categoryList = null;
		
		if("once".equals(getData)){
			categoryList = categoryDao.getAllCategory();
		}else{
			categoryList = categoryDao.getCategoryByFid(fid);
		}
		
		for(int i=0; i<categoryList.size(); i++){
			
			
		}


		StringBuffer jsonString = new StringBuffer();
		String jsonString2 = "";
		jsonString.append("{\"category\":[");
		for(int i = 0; i < categoryList.size(); i++){
			jsonString.append("{\"id\":\""+categoryList.get(i).getCateID()+"\",");
			jsonString.append("\"fid\":\""+categoryList.get(i).getCateFID()+"\",");
			jsonString.append("\"name\":\""+categoryList.get(i).getCateName()+"\"},");
		}
		jsonString2 = jsonString.toString().substring(0,jsonString.toString().length()-1);
		jsonString2 += "]}";
		
		System.out.println(jsonString2);
		
		try {
			response.getWriter().write(jsonString2);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
