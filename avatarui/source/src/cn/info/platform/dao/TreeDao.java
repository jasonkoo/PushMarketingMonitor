package cn.info.platform.dao;

import java.util.ArrayList;

import cn.info.platform.entity.Tree;
import cn.info.platform.mapper.TreeMapper;

public interface TreeDao extends BaseDao<Tree, TreeMapper> {

	ArrayList<Tree> getTreeByFid(int treeFID);

	ArrayList<Tree> getAllTree();

}
