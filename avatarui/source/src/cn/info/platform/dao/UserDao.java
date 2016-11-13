package cn.info.platform.dao;

import cn.info.platform.entity.User;
import cn.info.platform.mapper.UserMapper;

/**
 * @author Rocky
 */
public interface UserDao extends BaseDao<User, UserMapper>
{

	User login(User user);
	void modify(User user);
}
