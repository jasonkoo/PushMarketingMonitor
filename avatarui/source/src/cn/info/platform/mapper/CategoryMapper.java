/**
 * 
 */
package cn.info.platform.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Param;

import cn.info.platform.entity.Category;
import cn.info.platform.entity.User;

/**
 * @author Rocky
 */
public interface CategoryMapper extends BaseMapper<Category>{
	ArrayList<Category> getCategoryByFid(@Param("cateFID") int cateFID);
	ArrayList<Category> getAllCategory();
}
