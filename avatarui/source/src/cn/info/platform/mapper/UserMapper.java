/**
 * 
 */
package cn.info.platform.mapper;

import cn.info.platform.entity.User;

/**
 * @author Rocky
 */
public interface UserMapper extends BaseMapper<User>{

	User login(User user);
	void modify(User user);
}
