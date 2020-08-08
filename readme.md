# Ajax 状态值(readyState) & 状态码

![](http://cdn.wwrrq.com/noteImg-2020-08-09.png)

# 克隆
区别深克隆和浅克隆的是: 原本/副本某一方**修改引用属性值**是否会导致另一方的更改

深克隆的效率会比浅克隆低很多, 需要看情况而定是否使用深克隆

## 浅克隆

### 展开运算符

```js
const target = { ...origin }
```

### 手写 Object.assign

```js
Object.defineProperty(Object, 'myAssign', {
  /**
   * @param {object} target 第一个属性以及后面的所有属性都必须为对象,否则报错
   * @returns {object}
   */
  value: function (target) {
    /**
     * 判断是否为 平面对象
     * @param {object} obj 
     * @returns {boolean}
     */
    function isPlanarObj(obj) {
      return Object.getPrototypeOf(target) === Object.prototype
    }

    if (!isPlanarObj(target)) {
      throw new Error('All parameters must be planar objects')
    }

    for (let i = 1; i < arguments.length; i++) {
      const curObj = arguments[i]
      if (isPlanarObj(curObj)) {
        for (const key in curObj) {
          if (curObj.hasOwnProperty(key)) {
            target[key] = curObj[key];
          }
        }
      }
    }
    return target
  }
})
```

## 深克隆

没有考虑 正则 Date 对象数组等其他复杂的情况了

```js
function deepClone(origin, target = {}) {
  const template = ['number', 'string', 'boolean', 'undefined', 'function']
  for (const key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (template.includes(typeof origin[key])) {
        target[key] = origin[key]
      } else {
        const temp = origin[key]
        if (temp === null) {
          target[key] = null
        } else if (Object.prototype.toString(temp) === '[object Array]') {
          target[key] = [...temp]
        } else if (Object.prototype.toString(temp) === '[object Object]') {
          target[key] = deepClone(temp, {})
        }
      }
    }
  }
  return target
}
```

### JSON 方法

```js
const obj3 = JSON.parse(JSON.stringify(obj1))
```
