# echoChangeByCc.js
modified from echo-js v1.7.3 | (c) 2016 @toddmotto | https://github.com/toddmotto/echo. modify the default container &lt;body> element to specified element.

Official echo.js is only listen the \<body\> element, but I always meet this scene: \<div\> element can scroll, I need listen the scroll event of the \<div\> element. So I modified echo.js, just add a config parameter "container".

While call initNew(config):if the "config.container" is not a valid value, it will be setted "document.body".You need set it a element like document.getElementById("aBox") or just let it go.

This is only added "container" config parameter, you can find other parameters from https://github.com/toddmotto/echo.

#Updated 2016-06-17
Now you can init many instance in one page. See demo "test/test-container.html" for more.

修改：现在可以初始化多个echo实例，在一个页面中共存。详见测试文件test/test-container.html

中文说明：http://www.cnblogs.com/robc/p/5431425.html

#Updated 2017-07-12
Update the demo file test-body.html---fix some problems.
