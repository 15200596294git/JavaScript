import _ from "underscore";

// 从数组里查找符合条件的项
const arr = [
  { name: 'jg', age: 18 },
  { name: 'dg', age: 20 },
  { name: 'hg', age: 28 },
]

const arr2 = [
  { name: 'Lily', sex: 0 },
  { name: 'Jack', sex: 1 },
  { name: 'Bruce', sex: 1 },
]

// 获取age为18的数据项
// _.find(arr, (item)=> item.age === 18)
// console.log("🚀 ~ _.find(arr, (item)=> item.age === 18):", _.find(arr, (item)=> item.age === 18))


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

// console.log("🚀 ~ _.find(arr, isAgeEqual18):", _.find(arr, wrapped2(28)))

_.find(arr2, isMale)
console.log("🚀 ~ _.find(arr2, isMale):", _.filter(arr2,  viaKey('sex', 0) ))




// 计算时给如果数字不合法将重置为0，目的是计算结果为NaN