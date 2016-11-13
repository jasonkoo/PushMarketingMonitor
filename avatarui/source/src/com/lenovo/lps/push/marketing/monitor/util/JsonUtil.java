package com.lenovo.lps.push.marketing.monitor.util;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public class JsonUtil {

	private final static ObjectMapper MAPPER = new ObjectMapper();

	public static String entity2JsonString(Object o)
			throws JsonGenerationException, JsonMappingException, IOException {
		return MAPPER.writeValueAsString(o);
	}
}
