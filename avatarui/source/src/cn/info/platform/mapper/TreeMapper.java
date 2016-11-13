package cn.info.platform.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Param;

import cn.info.platform.entity.Tree;

/**
 * @author Rocky
 */
public interface TreeMapper extends BaseMapper<Tree>{

	ArrayList<Tree> getTreeByFid(@Param("treeFID") int treeFID);
	ArrayList<Tree> getAllTree();
	
}
