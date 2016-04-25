# echoChangeByCc.js
modified from echo-js v1.7.3 | (c) 2016 @toddmotto | https://github.com/toddmotto/echo. modify the default container &lt;body> element to specified element.

Official echo.js is only listen the \<body\> element, but I always meet this scene: \<div\> element can scroll, I need listen the scroll event of the \<div\> element. So I modified echo.js, just add a config parameter "container".

While call init(config):if the "config.container" is not a valid value, it will be setted "document.body".You need set it a element like document.getElementById("aBox") or just let it go.

This is only added "container" config parameter, you can find other parameter from https://github.com/toddmotto/echo.

中文说明：http://www.cnblogs.com/robc/p/5431425.html
