```await``` 作用于 ```promise``` 任务, 返回它的状态数据

这里没办法法将数据返回到外部, 仅是可等待

```js
/**
 * @param {function} task 异步任务
 */
function* generator(task) {
  const data = yield task()
  return data
}

/**
 * @param {function} task 
 */

function myAwait(task) {
  const g = generator(task)
  let result = null

  return next()

  function next(newValue) {
    result = g.next(newValue)
    if (result.done) {
      return result.value;
    }
    const value = result.value
    if (typeof value.then === 'function') {
      value.then(data => {
        next(data)
      })
    } else {
      next(value)
    }
  }
}
```