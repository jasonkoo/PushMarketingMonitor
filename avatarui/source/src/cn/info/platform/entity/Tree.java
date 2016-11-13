package cn.info.platform.entity;

import java.util.Date;

/**
 * @author Rocky
 */
public class Tree
{
	private int treeID;
	private int treeFID;
	
	private String treeName;
	private int treeSort;
	public int getTreeID() {
		return treeID;
	}
	public void setTreeID(int treeID) {
		this.treeID = treeID;
	}
	public int getTreeFID() {
		return treeFID;
	}
	public void setTreeFID(int treeFID) {
		this.treeFID = treeFID;
	}
	public String getTreeName() {
		return treeName;
	}
	public void setTreeName(String treeName) {
		this.treeName = treeName;
	}
	public int getTreeSort() {
		return treeSort;
	}
	public void setTreeSort(int treeSort) {
		this.treeSort = treeSort;
	}
}
