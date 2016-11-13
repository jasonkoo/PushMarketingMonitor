package com.lenovo.lps.push.marketing.monitor.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import cn.info.platform.mapper.BaseMapper;
import cn.info.platform.util.Page;

import com.lenovo.lps.push.marketing.monitor.dao.BaseDao;

/**
 * 数据库公共类Dao类接口实现类
 * @author Rocky
 * @version [版本号:1.0, 2011-06-08]
 */
public class BaseDaoImpl<T, E> extends SqlSessionDaoSupport implements BaseDao<T, E>
{
	private Class<E> mapperClass;
	

	@Autowired
	public void setSqlSessionTemplate(@Qualifier("sqlSessionTemplateMdrill") SqlSessionTemplate sqlSessionTemplate) {
	    super.setSqlSessionTemplate(sqlSessionTemplate);
	  }
	
	/**
	 * 设置对应的MapperClass
	 */
	public void setMapperClass(Class<E> mapperClass)
	{
		this.mapperClass = mapperClass;
	}
	
	/**
	 * 得到对应的Mapper对象
	 */
	public E getMapper()
	{
		return getSqlSession().getConfiguration().getMapper(mapperClass, getSqlSession());
	}
	
	@SuppressWarnings("unchecked")
    public BaseMapper<T> getBaseMapper()
	{
		return (BaseMapper<T>)this.getMapper();
	}
	
	/**
	 * 根据主键查询对应的对象
	 * @param primaryKey 对象的主键
	 * @return 查询后的对象
	 */
	public T findByID(Serializable primaryKey)
	{
		return this.getBaseMapper().findByID(primaryKey);
	}
		
	/**
	 * 根据对象主键删除对应的对象
	 * @param primaryKey 对象的
	 */
	public void deleteByID(Serializable primaryKey)
	{
		this.getBaseMapper().deleteByID(primaryKey);
	}
	
	/**
	 * 查询所有对象的长度
	 * @return 数据的长度
	 */
	public int findAllObjLength()
	{
		return this.getBaseMapper().findAllObjLength();
	}
	
	/**
	 * 分页查询对象
	 * @param page Page对象
	 * @return 返回查询出的数据
	 */
	public List<T> findByPage(Page<T> page)
	{
		return this.getBaseMapper().findByPage(page);
	}
	
	/**
	 * 保存对象到数据库表中
	 * @param t 要保存的对象
	 */
	public void addObj(T t)
	{
		this.getBaseMapper().addObj(t);
	}
	
	/**
	 * 根据对象的字段进行查询
	 * @param paramName 要查询的字段
	 * @param paramValue 该字段对应的值
	 * @return 查询到的数据
	 */
	public List<T> findByParam(String paramName, Serializable paramValue)
	{
		return this.getBaseMapper().findByParam(paramName, paramValue);
	}
}
