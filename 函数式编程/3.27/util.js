import _ from "underscore";

// 从数组里查找符合条件的项
const arr = [
  { name: 'jg', age: 18, sex: 0 },
  { name: 'dg', age: 18, sex: 1 },
  { name: 'hg', age: 28, sex: 0 },
]

const arr2 = [
  { name: 'Lily', sex: 0 },
  { name: 'Jack', sex: 1 },
  { name: 'Bruce', sex: 1 },
]

// 获取age为18的数据项
// _.find(arr, (item)=> item.age === 18)
// // console.log("🚀 ~ _.find(arr, (item)=> item.age === 18):", _.find(arr, (item)=> item.age === 18))


function isEqualOfPartial(arg1) {
  return _.partial(_.isEqual, arg1)
}

// 传入一个函数，返回一个函数
// 该函数接收对象并返回指定的key
// 可以先传入一个key
// 也可以先传入一个被比较的值
function is18(key) {
  return _.compose(isEqualOfPartial(18), _.partial(_.get, _, key))
}

function isAge(arg2) {
  return _.compose(isEqualOfPartial(arg2), _.partial(_.get, _, 'age'))
}

const isAgeEqual18 = _.compose(isEqualOfPartial(18), _.partial(_.get, _, 'age'))

function isMale() {
  return _.compose(isEqualOfPartial(1), _.partial(_.get, _, 'sex'))
}

function viaKey(key, arg2) {
  return _.compose(isEqualOfPartial(arg2), _.partial(_.get, _, key))
}

// // console.log("🚀 ~ _.find(arr, isAgeEqual18):", _.find(arr, wrapped2(28)))

_.find(arr2, isMale)
// console.log("🚀 ~ _.find(arr2, isMale):", _.filter(arr2,  viaKey('sex', 0) ))




// 计算时给如果数字不合法将重置为0，目的是计算结果为NaN

// 柯里化 部分函数 纯函数 pipe函数 compose函数 递归

_.where(arr, { name: 'jg' })
// // console.log("🚀 ~ _.where(arr, {name: 'jg'}):", _.pluck(arr, 'age'))
_.map(arr, (item) => item.age)
// // console.log("🚀 ~ _.map(arr, (item)=> item.age):", _.map(arr, (item)=> item.age))


_.groupBy(arr, 'age')
// console.log("🚀 ~ _.groupBy(arr, 'age'):", _.chain(arr).groupBy('age').value() )
_.chain(arr).countBy('age').value()
// console.log("🚀 ~ _.chain(arr).countBy('age').value():", _.chain(arr).countBy('age').value())

// 设置一个对象的key为另外一个值
// 另外一个值待定
function setByKey(k) {
  return function (obj, nVal) {
    obj[k] = nVal
  }
}

const setLoadingCompleteState = setByKey('loadingComplete')
const obj3 = {
  loadingComplete: 3,
  a: { b: () => 2 }
}
setLoadingCompleteState(obj3, 8)
// console.log("🚀 ~ obj3:", obj3)
function setStorageSync(key) {
  return function (token) {
    localStorage.setItem(key, token)
    // obj3[key] = token
  }
}

const setToken = setStorageSync('token')
// setToken('bbbb')
// console.log("🚀 ~ obj3:", obj3)

// _.get(obj3,['a', 'b'])
// console.log("🚀 ~ _.get(obj3,['a', 'b']):", _.get(obj3,['a', 'b', 'c']))
// 获取对象的key(可以嵌套)
// 尝试执行一个值
function tryCall(fn) {
  return _.isFunction(fn) ? fn() : undefined
}
const getPath = _.partial(_.get, obj3)
const getAndCall = _.compose(tryCall, getPath)
// getAndCall(obj3)
console.log("🚀 ~ getAndCall(obj3):", getAndCall(['privacydia', 'open']))










