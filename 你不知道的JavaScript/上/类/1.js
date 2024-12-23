// 农场有头大母牛，每年生头小母牛，小母牛五年后生小母牛，年龄大于15便死亡 ，问20年后农场一共有多少头牛？

// 
function recursion(cows, years) {
  if(years === 0) return cows

  const _cows = cows.reduce((ret, cure)=> {
    if(cure >=5) ret.push(1)
    const afterAge = cure + 1
    if(afterAge <= 15) ret.push(afterAge)

    return ret
  }, [])

  return recursion(_cows, years - 1)
}

// recursion([5], 1)
// console.log("🚀 ~ recursion([5], 1):", recursion([5], 20).length) // 20年后还有396头牛



// 面向对象
class Cow {
  constructor() {
    this.age = 1
  }
  getAge() {
    return this.age
  }
  setAge(age) {
    this.age = age
  }
  plusOneAge() {
    this.age++
  }
  isAlive() {
    return this.age <= 15
  }
  // 是否成年
  isAdult() {
    return this.age >= 5
  }
}

class Farm {
  constructor() {
    this.cows = []
  }
  getCows() {
    return this.cows
  }
  addCow(cow) {
    this.cows.push(cow)
  }
  // 获得活着的牛
  getCowsOfAlive() {
    return this.cows.filter(cow=> cow.isAlive())
  }
}

const farm = new Farm()
const firstCow = new Cow()
firstCow.setAge(5)
farm.addCow(firstCow)

for(let i = 0; i < 20; i++) {
  farm.getCows().forEach(cow=> {
    if(cow.isAdult() && cow.isAlive()) farm.addCow(new Cow())
    
    
    cow.plusOneAge()
  })
}

console.log(farm.getCowsOfAlive().length)