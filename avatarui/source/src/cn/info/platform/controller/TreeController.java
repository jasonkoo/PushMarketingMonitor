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

import cn.info.platform.dao.TreeDao;
import cn.info.platform.entity.Tree;

/**
 * @author Rocky
 */
@Controller
@RequestMapping("/tree/*")
public class TreeController {
	private static Logger logger = Logger.getLogger(TreeController.class);
	@Autowired
	private TreeDao treeDao;
	private Tree tree;
	
	
	
	@RequestMapping(value = "getTree", method = RequestMethod.POST)
	public void getTreeByFid(HttpServletRequest request, HttpServletResponse response) {

		int fid = Integer.parseInt(request.getParameter("fid"));
		String getData = (String) request.getParameter("getData");
		
		ArrayList<Tree> treeList = null;
		
//		if("once".equals(getData)){
			treeList = treeDao.getAllTree();
//		}else{
//			treeList = treeDao.getTreeByFid(fid);
//		}


		StringBuffer jsonString = new StringBuffer();
		String jsonString2 = "";
		jsonString.append("{\"tree\":[");
		for(int i = 0; i < treeList.size(); i++){
			jsonString.append("{\"id\":\""+treeList.get(i).getTreeID()+"\",");
			jsonString.append("\"fid\":\""+treeList.get(i).getTreeFID()+"\",");
			jsonString.append("\"name\":\""+treeList.get(i).getTreeName()+"\",");
			jsonString.append("\"sort\":\""+treeList.get(i).getTreeSort()+"\"},");
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
