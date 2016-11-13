package cn.info.platform.dao;

import java.util.ArrayList;

import cn.info.platform.entity.Category;
import cn.info.platform.mapper.CategoryMapper;

public interface CategoryDao extends BaseDao<Category, CategoryMapper> {

	ArrayList<Category> getCategoryByFid(int cateFID);

	ArrayList<Category> getAllCategory();

}
