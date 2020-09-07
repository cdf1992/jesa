/**
 *    Copyright 2009-2019 the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
package org.apache.ibatis.reflection;

import java.lang.reflect.Constructor;
import java.lang.reflect.Executable;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class ParamNameUtil {
  public static List<String> getParamNames(Method method) {
    // return getParameterNames(method);
    // TODO 迁移 springboot，兼容 mybatis 版本，使其支持 （将 #{argName} 转为）#{0} 形式的参数
	AtomicInteger index = new AtomicInteger(0);
	return Arrays.stream(method.getParameters()).map(param -> String.valueOf(index.getAndIncrement())).collect(Collectors.toList());
  }

  public static List<String> getParamNames(Constructor<?> constructor) {
    return getParameterNames(constructor);
  }

  private static List<String> getParameterNames(Executable executable) {
    // TODO 迁移 springboot，兼容 mybatis 版本，使其支持 （将 #{arg0} 转为）#{0} 形式的参数
    return Arrays.stream(executable.getParameters()).map(param -> param.getName().replace("arg", "")).collect(Collectors.toList());
  }

  private ParamNameUtil() {
    super();
  }
}
