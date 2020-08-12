[原文链接](https://blog.csdn.net/qf2019/article/details/99829115?utm_medium=distribute.pc_relevant.none-task-blog-OPENSEARCH-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-OPENSEARCH-1.channel_param)

## 减少HTTP请求数

- 避免重定向：重定向说明需要客户端采取进一步操作才能完成请求，请求时间会延长。所以输入URL时应使用最完整的、最直接的地址，比如输入“www.baidu.com”而不是“baidu.com”。

- 使用**缓存**的机制：主要有数据库缓存、服务端缓存(反向代理和CDN缓存)、浏览器缓存。

## 图片懒加载

在页面图片非常多的情况下，可以使用**懒加载**。只加载第一屏的图片，当用户通过滚动访问后面的内容时再加载相应图片。方法是先用一张极小的占位图代替图片，占位图只需下载一次，将原本图片的src存储在另一个属性中，判断当图片快进入可视区域就将路径赋值给 src 并下载图片进行展示。

## 代码的优化

1. 页面的结构：**CSS放在HTML内容上部，JavaScript放在HTML内容下部**。可以使用preload提前解析资源的DNS。由于浏览器是自上而下读取内容的，因此放置资源的位置会影响网站的访问速度。比如，如果将script标签放在HTML内容的前边，浏览器就会先调用JavaScript解释器对JS进行解析，完成之后才会渲染其余的HTML内容。对用户而言，能看到的是HTML的内容，所以这么做会导致页面可用性的延迟。

2. JavaScript优化：比如**减少对DOM的操作，减少重排和重绘，减少作用域链查找**，慎用eval函数等。JS代码和CSS的优化要求前端开发人员对页面渲染原理清晰了解以及对基础知识掌握扎实。

3. CSS优化：**减少使用通配符**，提取公用样式增强可复用性，选择器准确可减少匹配时间，适度使用内联样式。
