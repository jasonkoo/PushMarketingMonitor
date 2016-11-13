package cn.info.platform.test;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit38.AbstractJUnit38SpringContextTests;

import cn.info.platform.dao.StudentDao;
import cn.info.platform.entity.Student;

/**
 * @author Rocky
 */
@ContextConfiguration("classpath:spring-*.xml")
public class StudentMapperTest extends AbstractJUnit38SpringContextTests {
	@Autowired
	private StudentDao studentDao;

	public void testGetByID() {
//		String str = "*adCVs*34_a _09_b5*[/435^*&城池()^$$&*).{}+.|.)%%*(*.中国}34{45[]12.fd'*&999下面是中文的字符￥……{}【】。，；’“‘”？";
//		System.out.println(str);
//		System.out.println(StringFilter(str));

		ArrayList<Student> stu = studentDao.studentList("", "", 0, 10);
		for (int i = 0; i < stu.size(); i++) {
			String name = stu.get(i).getName();
			System.out.println(name);
			System.out.println(StringFilter(name));
		
			
		}
	}

	public static String StringFilter(String str) throws PatternSyntaxException {
//		String regEx = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
		String regEx = "[^a-zA-Z0-9 -.:_/''未知]";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(str);
		boolean a = m.find();
		return m.replaceAll("?");
	}
}
