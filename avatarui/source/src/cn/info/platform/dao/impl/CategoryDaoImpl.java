package cn.info.platform.dao.impl;


import java.util.ArrayList;

import org.springframework.stereotype.Repository;

import cn.info.platform.dao.CategoryDao;
import cn.info.platform.entity.Category;
import cn.info.platform.mapper.CategoryMapper;

/**
 * @author Rocky
 */
@Repository
public class CategoryDaoImpl extends BaseDaoImpl<Category, CategoryMapper> implements CategoryDao {
	public CategoryDaoImpl(){
	    setMapperClass(CategoryMapper.class);
    }
	
	public ArrayList<Category> getCategoryByFid(int cateFID) {
		return this.getMapper().getCategoryByFid(cateFID);
	}

	public ArrayList<Category> getAllCategory() {
		return this.getMapper().getAllCategory();
	}
}
