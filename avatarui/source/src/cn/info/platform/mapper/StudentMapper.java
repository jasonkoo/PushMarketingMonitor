package cn.info.platform.mapper;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import cn.info.platform.entity.Student;

/**
 * @author Rocky
 */
public interface StudentMapper extends BaseMapper<Student> {
	Integer studentAll();

	ArrayList<Student> studentList(
			@Param("sortOrderBy") String sortOrderBy, 
			@Param("sortRule") String sortRule, 
			@Param("limit") int limit,
			@Param("offset") int offset
	);
	
	Integer insert(Student student);
}
