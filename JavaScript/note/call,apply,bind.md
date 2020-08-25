```js
Function.prototype.myCall = function (thisContext, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError(`typeof ${this} is not a function`)
  }
  // Object 可以根据参数的数据类型包装成对应类型的对象
  const context = Object(thisContext)
  context.func = this
  const returns = context.func(...args)
  delete context.func
  return returns
}

Function.prototype.myApply = function (thisContext, args) {
  if (typeof this !== 'function') {
    throw new TypeError(`typeof ${this} is not a function`)
  }
  // Object 可以根据参数的数据类型包装成对应类型的对象
  const context = Object(thisContext)
  context.func = this
  const returns = context.func(...args)
  delete context.func
  return returns
}

/**
 * 实现了绑定或调用时都可以传参
 * @param {object} thisContext 
 */
Function.prototype.myBind = function (thisContext) {
  if (typeof this !== 'function') {
    throw new TypeError(`typeof ${this} is not a function`)
  }
  // 记录调用 bind 时传递的后续参数
  const argsBind = []
  for (let i = 1; i < arguments.length; i++) {
    argsBind.push(arguments[i])
  }

  const context = Object(thisContext)
  context.func = this
  return function () {
    // 记录调用 新的函数 时传递的后续参数
    const argsSub = []
    for (let i = 0; i < arguments.length; i++) {
      argsSub.push(arguments[i])
    }

    const returns = context.func(...argsBind.concat(argsSub))
    delete context.func
    return returns
  }
}
```