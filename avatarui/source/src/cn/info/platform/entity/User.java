package cn.info.platform.entity;

import java.util.Date;

/**
 * @author Rocky
 */
public class User
{
	private int userID;
	
	private String userName;
	
	private String passWord;
	private Date loginTime;

	public Date getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	public User()
    {
    }
	
	public int getUserID()
    {
    	return userID;
    }

	public void setUserID(int userID)
    {
    	this.userID = userID;
    }



	public User(String userName, String passWord)
    {
	    this.userName = userName;
	    this.passWord = passWord;
    }

	public String getUserName()
    {
    	return userName;
    }

	public void setUserName(String userName)
    {
    	this.userName = userName;
    }

	public String getPassWord()
    {
    	return passWord;
    }

	public void setPassWord(String passWord)
    {
    	this.passWord = passWord;
    }
}
