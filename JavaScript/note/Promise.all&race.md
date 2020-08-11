## Promise.all
所有 Promise 都 resolve 时, 将所有 Promise 的状态数据集合成数组返回; 有一个 reject 时, 直接失败

```js
Object.defineProperty(Promise, 'myAll', {
  value: (promises) => new Promise((resolve, reject) => {
    // 记录所有 state 的数组
    const results = promises.map(promise => {
      // 记录状态数据和当前状态
      const state = {
        value: undefined,
        isResolved: false
      }

      promise.then(data => {
        state.value = data
        state.isResolved = true
        // 所有 isResolved 都为 true 后, resolve 所有的状态数据
        if (results.every(result => result.isResolved)) {
          resolve(results.map(result => result.value))
        }
      }).catch(err => {
        // 失败后, 直接拒绝
        reject(err)
      })

      return state
    })
  })
})
```

## Promise.race
有一个 resolve 时, 直接 resolve; 有一个 reject 时, 直接 reject

```js
Object.defineProperty(Promise, 'myRace', {
  value: (promises) => new Promise((resolve, reject) => {
    for (const promise of promises) {
      promise.then(data => resolve(data))
        .catch(err => reject(err))
    }
  })
})


// 测试代码
/**
 * @param {number} num 
 */
function test(num) {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.1) {
      setTimeout(() => {
        resolve(num)
      }, (Math.random() + 0.5) * 1000)
    } else {
      reject('失败了')
    }
  })
}

Promise.myRace([
  test(1),
  test(2),
  test(3),
  test(4),
  test(5)
]).then(data => {
  console.log('data: ', data);
}, err => {
  console.log('err: ', err);
})
```