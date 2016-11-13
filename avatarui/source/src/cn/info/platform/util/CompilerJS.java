package cn.info.platform.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

import com.google.javascript.jscomp.CompilationLevel;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.JSSourceFile;
import com.google.javascript.jscomp.Region;
import com.google.javascript.jscomp.WarningLevel;
import com.google.javascript.jscomp.CssRenamingMap.Style;

public class CompilerJS {

	public String miniJS(String sourceJSCode, String level) throws UnsupportedEncodingException {
		String warnings = "";
		String errors = "";
		
		Compiler.setLoggingLevel(Level.WARNING);
		Compiler compiler = new Compiler();

		// 设置压缩级别
		CompilerOptions options = new CompilerOptions();
		if (level.equals("0")) {
			CompilationLevel.WHITESPACE_ONLY.setOptionsForCompilationLevel(options);
		} else if (level.equals("1")) {
			CompilationLevel.SIMPLE_OPTIMIZATIONS.setOptionsForCompilationLevel(options);
		} else {
			CompilationLevel.ADVANCED_OPTIMIZATIONS.setOptionsForCompilationLevel(options);
		}
		// 警告级别
		// WarningLevel.DEFAULT.setOptionsForWarningLevel(options);
		WarningLevel.QUIET.setOptionsForWarningLevel(options);
		List<JSSourceFile> externalJavascriptFiles = new ArrayList<JSSourceFile>();
		List<JSSourceFile> primaryJavascriptFiles = new ArrayList<JSSourceFile>();
		ByteArrayInputStream bais = new ByteArrayInputStream(sourceJSCode.getBytes("UTF-8"));
		try {
			primaryJavascriptFiles.add(JSSourceFile.fromInputStream("jsForm", bais));
		} catch (IOException e) {
		}
		compiler.compile(externalJavascriptFiles, primaryJavascriptFiles, options);
		
		for (JSError message : compiler.getWarnings()){
	      System.err.println("Warning message: " + message.toString());
	      warnings = formatInfo(compiler, message);
	      System.out.println(warnings);
	    }
		
		for (JSError message : compiler.getErrors()) {
			System.err.println("Error message: " + message.toString());
			errors = formatInfo(compiler, message);
		    System.out.println(errors);
		}
	
		if(warnings != "" || errors != ""){
			String message = "---";
			if(warnings != ""){
				message += "警告："+warnings+"\r\n";
			}
			if(errors != ""){
				message += "错误："+errors;
			}
			return message;
		}else{
			return compiler.toSource();
		}
	}

	// 格式化提示信息
	public String formatInfo(Compiler compiler, JSError message) throws UnsupportedEncodingException {
		String description = message.description;
		int lineNumber = message.lineNumber;
		int charno = message.getCharno();
		Region sourceRegion = compiler.getSourceRegion(message.sourceName, message.lineNumber);
		String lineSource = null;
		if (sourceRegion != null) {
			lineSource = sourceRegion.getSourceExcerpt();
		}
		return description + "（" + "位置: " + lineNumber + ":" + charno + "）"	+ "\n" + lineSource;
	}
	
}
