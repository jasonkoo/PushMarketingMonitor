package cn.info.platform.util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

public class Test {

	public static void main(String[] args){
		Object cl = new People();
		try {
			Class<?> targetClass = cl.getClass();
			
			Method method = targetClass.getDeclaredMethod("sayHello", new Class[]{String.class});
			 method.setAccessible(true);//压制Java的访问控制检查
			 
			String s = (String)method.invoke(cl, "Rocky");
			
			System.out.print(s);
		} catch (Throwable e) {
			System.err.println(e);
		}
	}
	
//	public static void main(String[] args) throws Exception{
//		Class<?> classType = People.class;
//		People p1 =(People) classType.newInstance();
//		// 获取指定的方法，调用People类的私有方法；
//		Method method = classType.getDeclaredMethod("sayHello", new Class[] { String.class });
//		method.setAccessible(true);//压制java的访问修饰符；
//		method.invoke(p1, new Object[]{"Mr zhou"});
//		
//		//获取People类的私有属性；
//		Field field = classType.getDeclaredField("age");
//		field.setAccessible(true);
//		field.set(p1, 12);
//		System.out.println(field.get(p1));
//	}
	

}


