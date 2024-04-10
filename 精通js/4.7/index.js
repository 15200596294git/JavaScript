// 王位继承
var Person = function (kingName) {
  this.name = kingName
  this.isDeath = false
  this.children = []
}
Person.prototype.setChildren = function (person) {
  this.children.push(person)
}
Person.prototype.setDeath = function (isDeath = true) {
  this.isDeath = isDeath
}

/**
 * @param {string} kingName/**
 * @param {string} kingName
 */
var ThroneInheritance = function (kingName) {
  this.root = new Person(kingName)
  this.map = new Map()
  this.map.set(kingName, this.root)
};

/** 
 * @param {string} parentName 
 * @param {string} childName
 * @return {void}
 */
ThroneInheritance.prototype.birth = function (parentName, childName) {
  // console.log(this.map);
  const person = this.map.get(parentName)
  const child = new Person(childName)
  person.setChildren(child)
  this.map.set(childName, child)
};

/** 
 * @param {string} name
 * @return {void}
 */
ThroneInheritance.prototype.death = function (name) {
  const person = this.map.get(name)
  person.setDeath()
};

/**
 * @return {string[]}
 */
ThroneInheritance.prototype.getInheritanceOrder = function () {
  const recursion = (root) => {
    const stack = [root]
    const rets = []
    while (stack.length) {
      const first = stack.shift()
      if (!first.isDeath) {
        rets.push(first.name)
      }
      if (first.children.length) {
        stack.unshift(...first.children)
      }
    }

    return rets
  }

  return recursion(this.root)
};

var t = new ThroneInheritance('king')
t.birth("king", "andy"); // 继承顺序：king > andy
t.birth("king", "bob"); // 继承顺序：king > andy > bob
t.birth("king", "catherine"); // 继承顺序：king > andy > bob > catherine
t.birth("andy", "matthew"); // 继承顺序：king > andy > matthew > bob > catherine
t.birth("bob", "alex"); // 继承顺序：king > andy > matthew > bob > alex > catherine
t.birth("bob", "asha"); // 继承顺序：king > andy > matthew > bob > alex > asha > catherine
t.getInheritanceOrder(); // 返回 ["king", "andy", "matthew", "bob", "alex", "asha", "catherine"]
t.death("bob"); // 继承顺序：king > andy > matthew > bob（已经去世）> alex > asha > catherine
// t.getInheritanceOrder(); // 返回 ["king", "andy", "matthew", "alex", "asha", itanceOrder():", obj.getInheritanceOrder())
// obj.death('jg')
// console.log(obj);

// 用父几点和所有子节点比较
// 
var maxAncestorDiff = function (root) {
  const stack = [root]
  let ret = 0
  while (stack.length) {
    const first = stack.shift()

    const stack2 = []
    if (first.left) stack2.push(first.left)
    if (first.right) stack2.push(first.right)

    while (stack2.length) {
      const first2 = stack2.shift()
      const subs = Math.abs(first.val - first2.val)
      ret = subs > ret ? subs : ret
      if (first2.left) stack2.push(first2.left)
      if (first2.right) stack2.push(first2.right)
    }

    if (first.left) stack.push(first.left)
    if (first.right) stack.push(first.right)

  }

  return ret
};

// 1379
var getTargetCopy = function (original, cloned, target) {
  const queue = [cloned]
  while (queue.length) {
    const first = queue.shift()
    if (first.val === target.val) return first
    if (first.left) queue.push(first.left)
    if (first.right) queue.push(first.right)
  }
};

// 2810
var finalString = function (s) {
  let str = []
  const arr = s.split('')

  while (arr.length) {
    first = arr.shift()
    if (first === 'i') {
      str.reverse()
    } else {
      str.push(first)
    }
  }

  return str.join('')
};

// 085
var generateParenthesis = function (n) {

  // 接受一个括号数组
  // 
  const myFilter = (arr) => {
    const stack = []
    const data = arr.slice()
    while (data.length) {
      const s = data.shift()
      if (s === '(') {
        stack.unshift(')')
      }
      if (s === ')') {
        if (!stack.length) return false
        stack.shift()
      }
    }

    return true
  }

  // 递归
  const brackets = new Array(n).fill(['(', ')']).reduce((prev, cure) => prev.concat(cure))
  const ret = []
  const recursion = (bracs) => {
    const stack = [
      [
        [],
        bracs
      ]
    ]


    while (stack.length) {
      const [first, second] = stack.shift()
      myFilter(first)
      // console.log("🚀 ~ myFilter(first):", myFilter(first))
      // console.log("🚀 ~ myFilter(first):", first)
      if (!myFilter(first)) {
        continue
      }
      if (!second.length) {
        if (!ret.includes(first.join(''))) {
          ret.push(first.join(''))
        }
      } else {
        second.forEach((item, i) => {
          const se = second.slice()
          se.splice(i, 1)
          // debugger
          stack.unshift(
            [
              first.concat(item),
              se,
            ]
          )
        })
      }
    }



  }
  recursion(brackets)
  // ret
  // // console.log("🚀 ~ ret:", ret)


  // 验证组合是否可用
  return ret
  // return ret.filter((str) => {
  //   const stack = []
  //   const strs = str.split('')

  //   while (strs.length) {
  //     const head = strs.shift()
  //     if (head === '(') {
  //       stack.unshift(')')
  //     }
  //     if (head === ')') {
  //       // console.log('stack', stack);
  //       if (!stack.length) return false
  //       stack.shift()
  //     }
  //   }
  //   return stack.length === 0
  // })
};


// generateParenthesis(3)
// console.log("🚀 ~ generateParenthesis(3):", generateParenthesis(5))

// 二分查找
// 找出第一个小于0但不是0的数
// 找出第一个大于0但不是0的数
var maximumCount = function (nums) {
  const binarySearch = (arr)=> {
    let f = 0, l = nums.length - 1, m = Math.floor(l / f) + f
    while(f !== l) {
      const cure = arr[num]
      if(cure > 0) l = m - 1
      if(cure < 0) f = m + 1
    }

    return m
  }
};
const binarySearch = (arr, value)=> {
  let f = 0, l = arr.length - 1, m
  while(f !== l) {
    m = Math.floor((l - f) / 2) + f
    // debugger
    const cure = arr[m]
    if(cure >  value) l = m - 1
    if(cure < value) f = m + 1
  }
  return arr[l]
}

// searchVal(0, [-3,-2,-1,0,0,1,2] )
console.log("🚀 ~ searchVal(0, [-3,-2,-1,0,0,1,2] ):", binarySearch([-1563,-236,-114,-55,427,447,687,752,1021,1636], 0 ))

