## new 做了什么

1. 在函数内部创建一个对象

2. 设置这个对象的原型链,**对象的 ```__proto__``` 指向这个函数的 ```prototype```**

3. 将函数内的 this 指向这个对象

4. 如果构造函数有返回值, 要判断返回值的类型: 如果返回原始值,忽略该返回值,将 this 隐式返回; **如果返回引用值,那么构造函数最后也是返回这个引用值**


## 实现

```js
/**
 * @param {function} func 
 * @param  {Array} args 收集参数
 * @return {object}
 */
function myNew(func, ...args) {
  if(typeof func !== 'function') throw new Error('the argument must be a function')
  
  const obj = new Object()
  // 设置原型
  Object.setPrototypeOf(obj, func.prototype)
  // 调用后判断返回结果
  const funcReturn = func.apply(obj, args)
  // 原始值就返回 obj, 引用值返回函数调用的结果
  return funcReturn instanceof Object ? funcReturn : obj
}
```