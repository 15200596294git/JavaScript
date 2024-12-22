// 农场有头大母牛，每年生头小母牛，小母牛五年后生小母牛，年龄大于15便死亡 ，问20年后农场一共有多少头牛？

// 面向过程，描述解决问题的每一步
function cow() {
  const list = [5]

  for(i = 0; i < 20; i ++) {
    list.forEach((age, index)=> {
      if(age >= 5 && age <= 15) list.push(1)

      list[index]++
    })
    console.log(`第${i + 1}年, 牛的数量${list.filter(age=> age < 15).length}`)
    // console.log(list)
  }
}

cow()


// 面向对象
// 牛 年龄 存活状态 ，农场,牛的总数

class Cow {
  constructor() {
    this.age = 1
  }
  // 自然增长
  plusOneAge() {
    this.age++
  }
  // 直接设置年龄
  setAge(age) {
    this.age = age
  }
  isAlive() {
    return this.age <= 15
  }
}

class Farm {
  constructor() {
    /** @type {Cow[]} */
    this.cows = []
  }
  addCow(cow) {
    this.cows.push(cow)
  }
  // 获取活着的牛的数量
  getNumberOfAlive() {
    return this.cows.filter(cow=> cow.isAlive()).length
  }
}

const farm = new Farm()
const firstCow = new Cow()
firstCow.setAge(5)
farm.addCow(firstCow)

for(let i = 0; i < 20; i ++) {
  farm.cows.forEach(cow=> {
    if(cow.age >= 5 && cow.isAlive()) farm.addCow(new Cow())
    cow.plusOneAge()
  })
}

console.log(farm.getNumberOfAlive())