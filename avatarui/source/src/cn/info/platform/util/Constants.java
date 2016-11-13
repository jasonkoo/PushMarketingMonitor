package cn.info.platform.util;

/**
 * 常量类
 * 
 * @author Rocky
 * @version [版本号, 2011-06-08]
 */
public interface Constants {
	/**
	 * 空格
	 */
	String WHITE_SPACE = "";

	/**
	 * 每页显示的数据量
	 */
	int PAGE_DATA = 10;

	/**
	 * 当前页面属性名
	 */
	String CUR_PAGE_NAME = "curPage";

	/**
	 * 当前
	 */
	String PAGE_DATA_NAME = "pageData";

	/**
	 * 要排序的属性名
	 */
	String ORDER_NAME = "orderName";

	/**
	 * 要排序的方式
	 */
	String ORDER_FLAG = "orderFlag";

	/**
	 * 看是否为数字
	 */
	String NUMBER_REGEX = "^[1-9]\\d*$";

	/**
	 * 默认为第一页
	 */
	int FIRST_PAGE = 1;
}
