package cn.info.platform.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Insert;


import cn.info.platform.entity.Student;
import cn.info.platform.mapper.StudentMapper;

public interface StudentDao extends BaseDao<Student, StudentMapper> {
	Integer studentAll();

	ArrayList<Student> studentList(String sortOrderBy, String sortRule,
			int limit, int offset);
	
	Integer insert(Student student);
}
