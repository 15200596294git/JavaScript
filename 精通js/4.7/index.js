// 设置国王
// 为国王设置孩子
// 可以将任务标记为死亡
// 获得除去死亡人数的继承顺序

// {
//   name: 'king',
//   isDeath: false,
//   children: [],
// }

// 根据name找出对应的Person
function findByName(value, key) {
  return function(data) {
    // 1.终止条件 找出对应的值或者没有children
    // 2.从数组的每一项中找出符合的值
    // 3.将children传入进入下一次调用
    const recursion = (initData)=> {
      // return initData.reduce((ret, cure)=> {
      //   if(value === cure[key] ) return cure
      //   return ret ? ret : recursion(cure.children)
      // }, null)

      const stack = [...data]
      let ret
      while(stack.length) {
        const first = stack.shift()
        if(first[key] === value) {
          ret = first
          break
        }

        if(first.children.length) {
          stack.unshift(...first.children)
        }
      }

      return ret
    }

    return recursion(data)
  }
}

var Person = function(kingName) {
  this.name = kingName
  this.isDeath = false
  this.children = []
}
Person.prototype.setChild = function(name) {
  this.children.push(new Person(name))
}
Person.prototype.setDeath = function(isDeath = true) {
  this.isDeath = isDeath
}

/**
 * @param {string} kingName/**
 * @param {string} kingName
 */
var ThroneInheritance = function(kingName) {
  this.kings = []
  this.kings.push(new Person(kingName))
};

/** 
 * @param {string} parentName 
 * @param {string} childName
 * @return {void}
 */
ThroneInheritance.prototype.birth = function(parentName, childName) {
  const find = findByName(parentName, 'name')
  const findPerson =  find(this.kings)
  findPerson.setChild(childName)
};

/** 
 * @param {string} name
 * @return {void}
 */
ThroneInheritance.prototype.death = function(name) {
  const find = findByName(name, 'name')
  const findPerson =  find(this.kings)
  findPerson.setDeath()
};

/**
 * @return {string[]}
 */
ThroneInheritance.prototype.getInheritanceOrder = function() {
  // 返回一个列表
  // 深度优先递归
  // 1.没有children时停止
  // 2.将当前循环的kingName加入到数组
  // 3.将children传入进行下一次的递归调用
  const recursion = (data)=> {
    // return data.reduce((rets, item)=> {
    //   if(!item.isDeath)  {
    //     rets.push(item.name)
    //   }
    //   if(!item.children || !item.children.length) return 
    //   rets.concat(recursion(item.children))

    //   return rets
    // }, [])

    const stack = [...data]
    const rets = []
    while(stack.length) {
      const first = stack.shift()
      console.log('first', first);
      if(!first.isDeath) {
        rets.push(first.name)
      }
      if(first.children.length) {
        stack.unshift(...first.children)
      }
    }

    return rets
  }

  return recursion(this.kings)
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
t.getInheritanceOrder(); // 返回 ["king", "andy", "matthew", "alex", "asha", itanceOrder():", obj.getInheritanceOrder())
// obj.death('jg')
// console.log(obj);
