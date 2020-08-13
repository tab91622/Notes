[原文链接](https://segmentfault.com/a/1190000010032501)


## 浏览器的工作流程
要研究图片资源的加载和渲染，我们先要了解浏览器的工作原理。以Webkit引擎的工作流程为例：


![](https://user-images.githubusercontent.com/9698086/26868233-de8d0f06-4b9a-11e7-8b35-0c6bfbe9871b.png)



从上图可看出，浏览器加载一个HTML页面后进行如下操作：

1. 解析HTML —> 构建DOM树

2. 加载样式 —> 解析样式 —> 构建样式规则树

3. 加载javascript —> 执行javascript代码

4. 把DOM树和样式规则树匹配构建渲染树

5. 计算元素位置进行布局

6. 绘制

从上图我们不能很直观的看出图片资源从什么时候开始加载，下图标出图片加载和渲染的时机：

1. 解析HTML【遇到<img>标签加载图片】 —> 构建DOM树

2. 加载样式 —> 解析样式【遇到背景图片链接不加载】 —> 构建样式规则树

3. 加载javascript —> 执行javascript代码

4. 把DOM树和样式规则树匹配构建渲染树【遍历DOM树时加载对应样式规则上的背景图片】

5. 计算元素位置进行布局

6. 绘制【开始渲染图片】


**页面中不是所有的<img>标签图片和样式表背景图片都会加载。**(设置为 display: none 的会加载,但不会渲染)


## display:none

```html
<style>
.img-purple {
    background-image: url(../image/purple.png);
}
</style>
<img src="../image/pink.png" style="display:none">
<div class="img-purple" style="display:none"></div>
```


**设置了display:none属性的元素，图片不会渲染出来，但会加载。**

## 原理

把DOM树和样式规则树匹配构建渲染树时，只会把可见元素和它对应的样式规则结合一起产出到**渲染树**，这就意味有不可见元素，当匹配DOM树和样式规则树时，若发现一个元素的对应的样式规则上有display:none，浏览器会认为该元素是不可见的，**因此不会把该元素产出到渲染树上。**注意: 是不会渲染到 渲染树(render tree)

上面代码中，当解析HTML时会加载<img>标签元素上的图片。

当把DOM树和样式规则树匹配构建渲染树时，遍历DOM树上的元素，发现元素对应的样式规则上有background-image属性时会加载背景图片，但是因为这个元素是不可见元素（对应的样式规则上有diaplay:none），不会把该元素和它对应的样式规则产出到渲染树。

当绘制时因为渲染树上没有该元素，因此不会绘制该元素的背景图片。

```html
<style>
.img-yellow {
    background-image: url(../image/yellow.png);
}
</style>

<div style="display:none">
    <img src="../image/red.png">
    <div class="img-yellow"></div>
</div>
```


设置了display:none属性元素的子元素，样式表中的背景图片不会渲染出来，也不会加载；而<img>标签的图片不会渲染出来，但会加载。


正如上面所说的，当匹配DOM树和样式规则树时，若发现元素的对应的样式规则上有display:none，浏览器会认为该元素的子元素是不可见的，因此不会把该元素的子元素产出到渲染树上。

当构建渲染树遇到了设置了display:none属性的不可见元素时，不会继续遍历不可见元素的子元素，因此不会加载该元素中子元素的背景图片。

当绘制时也因为渲染树上没有设置了display:none属性元素，也没有改元素的子元素，因此该元素中子元素的背景图片不会渲染出来。


- [ ] display: none ; visibility: hidden ; opacity: 0 的区别


## 小结

- display:none 是样式规则树中的内容, 仅仅是改变了元素的显示规则
- 元素会挂载到 DOM 树上, 但是 render tree 上没有了, 会导致回流
- 元素不会存在于 render tree , 根据 render tree 绘制后也就没有该元素的占位空间; visibility: hidden 是将元素设置为**不可见**, 元素本该占据的空间依然存在

### 另外: 

- Vue 中的 v-if 是直接把元素从 DOM 树上去掉了
- 浏览器开发者工具显示的是 DOM 树