package cn.info.platform.dao.impl;


import java.util.ArrayList;

import org.springframework.stereotype.Repository;

import cn.info.platform.dao.TreeDao;
import cn.info.platform.entity.Tree;
import cn.info.platform.mapper.TreeMapper;


/**
 * @author Rocky
 */
@Repository
public class TreeDaoImpl extends BaseDaoImpl<Tree, TreeMapper> implements TreeDao {
	public TreeDaoImpl(){
	    setMapperClass(TreeMapper.class);
    }
	
	public ArrayList<Tree> getTreeByFid(int treeFID) {
		return this.getMapper().getTreeByFid(treeFID);
	}

	public ArrayList<Tree> getAllTree() {
		return this.getMapper().getAllTree();
	}
}
