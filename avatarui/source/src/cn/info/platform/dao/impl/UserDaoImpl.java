package cn.info.platform.dao.impl;


import org.springframework.stereotype.Repository;

import cn.info.platform.dao.UserDao;
import cn.info.platform.entity.User;
import cn.info.platform.mapper.UserMapper;

/**
 * @author Rocky
 */
@Repository
public class UserDaoImpl extends BaseDaoImpl<User, UserMapper> implements UserDao
{
	public UserDaoImpl(){
	    setMapperClass(UserMapper.class);
    }
	

	public User login(User user) {
		return this.getMapper().login(user);
	}

	public void modify(User user) {
		this.getMapper().modify(user);
	}
}
