## 构造函数绑定

使用 ```apply```/```call``` 方法, 使用父级构造函数创建自己的属性或方法

```js
function Father(name, age) {
  this.name = name
  this.age = age
}

function Son(name, age) {
  Father.apply(this, arguments)
}

const son = new Son('Jack', 20) // {name: "Jack", age: 20}
```

## 实例继承

将子对象的 ```prototype``` 属性指向父级构造函数构造出的实例对象(注意修正 ```constructor```)

```js
function Father() {
  this.name = 'Jack'
  this.age = 20
}

Son.prototype = new Father()
Son.prototype.constructor = Son

function Son() { }

const son = new Son()
/* 
{
  __proto__:{
    constructor: Son(),
    name: 'Jack',
    age: 20
  }
}
*/
```

## 拷贝继承

将父级构造函数原型中的所有属性和方法,拷贝进子对象

```js
Father.prototype = {
  name: 'Jack',
  age: 20,
  say:function(){
    console.log(this.name, this.age)
  }
}
function Father() { }

function Son() { }

// 此处仅处理浅拷贝
function extend(Child,Parent){
  const c = Child.prototype
  const p = Parent.prototype
  for (const prop in p) {
    if (p.hasOwnProperty(prop)) {
      c[prop] = p[prop]
    }
  }
}

extend(Son,Father)

const son = new Son()
/* 
{
  __proto__:{
    name: 'Jack',
    age: 20,
    say:f ()
    constructor:f Son(),
    __proto__: ...
  }
}
*/
```

## 原型继承

将子级构造函数的 ```prototype``` 指向父级构造函数的 ```prototype```

注意: 因为有时候可能需要在子级构造函数原型上添加一些方法和属性, **不能直接指向父级构造函数的 ```prototype```**

```js
// 此处仅处理浅拷贝
function extend(Child,Parent){
  const F = function (){}
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child 
}
```