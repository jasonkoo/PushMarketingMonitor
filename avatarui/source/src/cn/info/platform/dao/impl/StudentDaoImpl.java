package cn.info.platform.dao.impl;

import java.util.ArrayList;

import org.springframework.stereotype.Repository;
import cn.info.platform.dao.StudentDao;
import cn.info.platform.entity.Student;
import cn.info.platform.mapper.StudentMapper;

/**
 * @author Rocky
 */
@Repository
public class StudentDaoImpl extends BaseDaoImpl<Student, StudentMapper>	implements StudentDao {
	public StudentDaoImpl() {
		setMapperClass(StudentMapper.class);
	}

	public Integer studentAll() {
		return this.getMapper().studentAll();
	}

	public ArrayList<Student> studentList(String sortOrderBy, String sortRule, int limit, int offset) {
		return this.getMapper().studentList(sortOrderBy, sortRule, limit, offset);
	}

	public Integer insert(Student student) {
		return this.getMapper().insert(student);

	}

}
