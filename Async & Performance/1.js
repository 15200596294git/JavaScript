/**
 * 异步 现在和将来
 */

/* var a = {
  index: 1,
};
// 然后
console.log(a); // ??
// 再然后
a.index++; */

// 需要处理一个很大的数据，比如有5千条
// 正常情况的话，处理这些数据需要花费时间，'进程'可能会卡住
// 后面的程序无法运行，这不是我们想要的
// 我们可以一次性只处理1k条，如果还有就放到下一个时间循环中处理
// var res = []
// function response(data) {
//     // 一次处理1000条数据
//     const count = 1000
//     // console.log(data.length);
//     // console.log( data.slice(0, count).length);
//     if(!data.length) {
//         return
//     }

//     data.slice(0, count).map((item)=> res.push({
//         a: item
//     }))
//     console.log('处理了一次返回数据');

//     if(data.length) {
//         setTimeout(() => {
//             response(data.slice(count))
//         }, 0);
//     }
// }
// response(new Array(5000).fill(true))
// console.log('1');

// 保证回调函数总是在当前tick结束后执行
// 接收一个函数，返回一个函数
// 函数在当前tick结束之前调用 不直接调用，
// 函数在当前tick结束之后调用 直接调用
/* function asyncify(fn) {
    // 返回的函数是否被调用
    // 如果在当前tick结束之前就已经被调用，那么setTimeout(fn, 0)中的fn需要调用真正的函数
    var isTrigger = false

    var iniV = setTimeout(()=> {
        iniV = null
        if(isTrigger) {
            fn()
        }
    }, 0)

    return function() {
        isTrigger = true 
        // 在当前tick结束之前调用
        if(iniV) {
            fn = fn.bind(this, [].slice.call(arguments))
        } else {
            fn.apply(this, [].slice.call(arguments))
        }
    }
}

function cbFn(url, cb) {
    cb()
}

cbFn('', asyncify(
    ()=> {
    console.log('cb1');
}))

cbFn('', asyncify(
    ()=> {
    console.log('cb2');
}))


console.log(1); */

/**
 * Promise
 */

// 第二个then没有传递fulfilled和rejected函数，fulfilled会默认返回上一个Promise的返回值，rejected会默认继续抛出错误值
// Promise.reject(1)
// .then()
// .then(v=> console.log('res',v))
// .catch((err)=> {
//     console.log('err', err);
// })

// var thenable = {
//     then(resolve, reject) {
//         resolve(8)
//         // reject(8)
//     }
// }

// // Promise.resolve(thenable).then(console.log).catch(console.log)
// Promise.reject(thenable).then(console.log).catch(err=> console.log('err', err))

// Promise.reject('')
// 1

// Promise.all

function waitMs(value, ms, isResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fn = isResolve ? resolve : reject;
      fn(value);
    }, ms);
  });
}
function myResolve(value, ms = 0) {
  return waitMs(value, ms, true);
}
function myReject(err, ms = 0) {
  return waitMs(err, ms, false);
}

// Promise.all()后面的then中的第一个参数是一个数组，数组的每一项是按照Promise.all([])传入的数组的Promise的结果的顺序来的
// 比如传入两个Promise，第一个需要1s后返回，返回值为1，第二个Promise只需要100ms返回，返回值为2，此时datas[0]还是为1，data[1]为2

// 如果其中一个Promise发生了reject，那么会直接走到catch, err的值为出错的内容(不会是一个数组，因为只要有一个reject，该promise就已经决议了，直接到catch)
// Promise.all([myResolve(1, 5000), myReject(2, 100), myReject(3, 2000) ])
// .then(datas=> {
//     console.log(datas);
// }).catch(err=> {
//     console.log('err',err);
// })

// Promise.all([1,2])也可以运行，会将数组中的每个值都用Promise.resolve()包裹一遍，thenable也可以
// Promise.all([1,2])
// .then((datas)=> {
//     console.log(datas);
//     console.log('promise')
// })
// console.log('main');

// Promise.race([])
// Promise.race中，第一个被决议的promise会作为Promise.race的结果，无论这个结果是完成还是拒绝

// Promise.race([myReject(1, 100), myResolve(2, 200)]).then((res)=> {console.log('res', res)}, (err)=> {console.log('err', err);})

// 如果Promise.race传入了一个或者多个立即值，那么在数组最前面的那个立即值回是返回的Promise的值
// Promise.race([0,myResolve(1), 2, 3 ])
// .then(res=> console.log(res))
// .catch((err)=> {
//     console.log('err', err);
// })

// Promise.finally
// 如果在finally中没有出现错误，那么finally返回的Promise的决议值(兑现或者拒绝)是上一个Promise返回的值
// 但是如果finally中出现错误，就会返回以finally的错误为原因的拒绝promise
// Promise.resolve(1).finally((value)=>{
//     console.log('finally', value) // value为undefined，finally不关心成功还是失败，所以函数没有传参
//     return 'finally'
// } ).then(res=> {
//     console.log('res', res); // 第一个Promise的1
// })

// finally中reject
// 如果只是在finally中reject，那么会返回一个错误的promise，拒绝原因为finally中的错误
// Promise.resolve(1).finally(()=> {
//     throw 'finally'
// }).then(res=> {
//     console.log('res', res);
// }).catch((err)=> {
//     console.log('err', err);
// })

// Promise.reject(3).finally(()=> {
//     // throw 'finally'
// }).then((res)=> {
//     console.log('res', res);
// })
// .catch(err=> {
//     console.log('err', err);
// })

// Promise.allSettled
// Promise.any
// Promise

// 实现Promise.none
// 和Promise.all相反，所有Promise都拒绝即完成
// 如果有一个Promise成功，那么就是拒绝
if (!Promise.none) {
  Promise.none = function (promises) {
    if (!Array.isArray(promises)) {
      throw Error("Promise.none(...)的参数必须为数组");
    }

    if (!promises.length) {
      return new Promise((resolve) => {
        resolve();
      });
    }

    return new Promise((resolve, reject) => {
      const errs = [];
      let count = 0;

      promises.forEach((p, i) => {
        Promise.resolve(p)
          .then((res) => {
            reject(res);
          })
          .catch((err) => {
            errs[i] = err;
            count++;
            if (count === promises.length) {
              resolve(errs);
            }
          });
      });
    });
  };
}

// Promise.none()
// Promise.none([]).then(console.log)
// Promise.none([myReject(1, 100) ]).then(res=> console.log('res', res)).catch((err)=> console.log('err', err))

// Promise.none([myReject(1, 1000), myReject(2, 1000),myReject(3, 1000),myReject(4, 100) ]).then(res=> console.log('res', res)).catch((err)=> console.log('err', err))

// console.time('a')
// Promise.all([myResolve(1, 1000), myResolve(2, 5000)]).then(res=> {
//     console.timeEnd('a')
// })

// 实现Promise.any
//
if (!Promise.any) {
  Promise.any = function (promises) {
    if (!Array.isArray(promises)) {
      throw Error("Promise.any(...)的参数必须为数组");
    }

    if (!promises.length) {
      return new Promise((resolve) => {
        resolve();
      });
    }

    return new Promise((resolve, reject) => {
      const errs = [];
      let count = 0;

      promises.map((p, i) => {
        Promise.resolve(p)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            errs[i] = err;
            count++;
            if (count === promises.length) {
              resolve(errs);
            }
          });
      });
    });
  };
}

// 实现Promise.first

// 实现Promise.last
if (!Promise.last) {
  Promise.last = function (promises) {
    if (!Array.isArray(promises)) {
      throw Error("Promise.last(...)的参数必须为数组");
    }

    if (!promises.length) {
      return new Promise((resolve) => {
        resolve();
      });
    }

    return new Promise((resolve, reject) => {
      const errs = [];

      let count = 0;
      let previousRsolved = null; // 上一个resolve的值

      promises.forEach((p, i) => {
        Promise.resolve(p)
          .then(
            (res) => {
              previousRsolved = res;
              count++;
              if (count === promises.length) {
                resolve(previousRsolved);
              }
            },
            (err) => {
              errs[i] = err;
              count++;
              if (count === promises.length) {
                if (previousRsolved) {
                  resolve(previousRsolved);
                } else {
                  reject(errs);
                }
              }
            }
          )
          .catch((err) => {
            console.error("err", err);
          });
      });
    });
  };
}

// 全部拒绝
// 第一个完成
// 最后一个完成
// 第三个完成
// Promise.last([myReject(1, 100), myReject(2, 200), myReject(3, 300)]).then((res)=> {console.log('res', res)}).catch((err)=> { console.log('err', err) })
// Promise.last([myResolve(1, 100), myReject(2, 200),myReject(3, 300) ]).then((res)=> {console.log('res', res)}).catch((err)=> { console.log('err', err) })
// Promise.last([ myReject(1, 100),myReject(2, 200),myReject(3, 300),myResolve(4, 400) ]).then((res)=> {console.log('res', res)}).catch((err)=> { console.log('err', err) })
// Promise.last([ myReject(1, 100),myReject(2, 200),myResolve(3, 300),myReject(4, 400) ]).then((res)=> {console.log('res', res)}).catch((err)=> { console.log('err', err) })

// Promise.map(arr, (p, resolve)=> {
//    p.then(res=> {
//     resolve(res.data.data)
//    })
// }).then(res=> {}) // Promise.resolve([])
// promises.map(p=> {})

// Promise.map实现
if (!Promise.map) {
  Promise.map = function (promises, cb) {
    return Promise.all(
      promises.map((p, i) => {
        return cb(Promise.resolve(p), i);
      })
    );
  };
}

// console.time('a')
// Promise.map([ myResolve(1, 1000), myResolve(2, 2000), myResolve(3, 3000)  ], (p, i)=> {
//     return p.then(val=> {
//         return val * 2
//     })
// })
// .then(res=> {
//     console.timeEnd('a')
//     console.log('res', res)
// } )
// .catch(err=> console.log('err', err))

// function spread(fn) {
//     return Function.prototype.apply.bind(fn, null)
// }

// function foo(arg1, arg2)  {
//     console.log(arg1, arg2);
// }

// spread(foo)([1,2])

// 将错误优先的回调函数风格，转为Promise风格
function promisory(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  };
}

// function read(name, encode, cb) {
//     // console.log(name, encode);
//     const err = '读取文件错误'
//     // const err = null
//     // const data = null
//     const data = '文件内容'
//     cb(err, data)
// }

// // read('1.txt', 'utf-8', (err,data)=> {
// //     if(!err) {
// //         console.log('data', data);
// //     } else {
// //         console.log('err', err);
// //     }
// // })

// const promisyRead = promisory(read)
// promisyRead('1.txt', 'utf-8')
// .then((res)=> console.log('res', res))
// .catch(err=> console.error('err', err))

/**
 * 生成器
 */
// var x = 1
// function *foo() {
//     x++
//     yield; // 暂停
//     console.log('x',x);
// }
// function bar() {
//     x++
// }

// var it = foo()
// it.next()
// bar()
// it.next()

// function* foo(x) {
//   var y = x * (yield);
//   return y;
// }

// var it = foo(6);
// var res1 = it.next();
// var res2 = it.next(7);
// console.log(res1.value, res2);

// 调用生生成器函数后会生产一个迭代器
// 迭代器调用第一个next时，生成器函数开始运行，所以第一个next不需要传入任何值，传了值也会被忽略
// 第一个next调用后，如果生成器函数内部有yield,此时会把yield后面的值返回给第一个next，
// 此时控制权又交给到迭代器，然后这个时候调用next的时候可以传入值，生成器函数可以接收它了

// 接收一个迭代器，返回一个函数，每次调用返回的函数迭代器向前走一步

// var a = 1;
// var b = 2;
// function* foo() {
//   a++;
//   yield;
//   b = b * a;
//   a = (yield b) + 3;
// }
// function* bar() {
//   b--;
//   yield;
//   a = (yield 8) + b;
//   b = a * (yield 2); // 仔细研究，a的值
// }

// function step(gen) {
//   var it = gen();
//   var last;
//   return function () {
//     // 不管yield出来的是什么，下一次都把它原样传回去！
//     last = it.next(last).value;
//   };
// }

// var s1 = step(foo);
// var s2 = step(bar);

// s2(); // b 1
// s2(); //
// s1(); // a 2
// s2(); // a 9
// s1(); // b 9
// s1(); // a 12
// s2(); // b 24

// var a = 1
// var b = 2
// function *g() {
//   return b * (yield)
// }
// var it = g()
// it.next()
// b = 4
// 上一步已经将b改为4了，按道理应该是 4 * 1 = 4,应该返回4
// 但是却返回了2，在暂停的时候b的值就已经固定了，改变b无效
// 相当于进行了一次赋值，由于是标量基本类型，直接是拿到值
// it.next(1) // {value: 2, done: true}

// 试试改为引用，然后改变引用的值看看

// var a = 1
// var obj = {
//   valueOf() {
//     return 2
//   },
// }
// function *g() {
//   return obj.a * (yield)
// }
// var it = g()
// it.next()
// obj.valueOf = function() {
//   return 4
// }
// it.next(1) // 是4，说明很有可能是做了赋值操作

// var a = []
// var it = a[Symbol.iterator]() // 获取数组的迭代器

// 生成器+Promise

// function* main() {
//   const text = yield myResolve(1, 500);
//   console.log("text", text);
// }

// const it = main();
// const p = it.next().value;
// p.then((res) => {
//   it.next(res);
// }).catch((err) => {
//   it.throw(err);
// });

// function run(gen) {
//   var args = [].slice.call(arguments, 1),
//     it;
//   // 在当前上下文中初始化生成器
//   it = gen.apply(this, args);
//   // 返回一个promise用于生成器完成
//   return Promise.resolve().then(function handleNext(value) {
//     // 对下一个yield出的值运行
//     var next = it.next(value);

//     return (function handleResult(next) {
//       // 生成器运行完毕了吗？
//       if (next.done) {
//         return next.value;
//       }
//       // 否则继续运行
//       else {
//         return Promise.resolve(next.value).then(
//           // 成功就恢复异步循环，把决议的值发回生成器
//           handleNext,
//           // 如果value是被拒绝的 promise，
//           // 就把错误传回生成器进行出错处理
//           function handleErr(err) {
//             return Promise.resolve(it.throw(err)).then(handleResult);
//           }
//         );
//       }
//     })(next);

//   });

// }

// function run(gen, ...args) {
//   // const it = g.apply(this, args);
//   var it = gen();

//   let previousValue;
//   return Promise.resolve().then(function handleNext(value) {
//     // console.log(
//     previousValue = it.next();
//     // );
//     // previousValue = it.next()

//     if (previousValue.done) {
//       console.log("done", previousValue);
//       return previousValue.value;
//     } else {
//       return Promise.resolve(previousValue).then(handleNext);
//     }
//   });
// }

function run(g, ...args) {
  var it = g.apply(this, args)

  return Promise.resolve().then(function handleNext(val) {
    var next = it.next(val)

    if(next.done) {
      return next.value
    }
    
    return Promise.resolve(next.value).then(
      handleNext,
      (err)=> {
        return Promise.resolve(it.throw(err)).then(handleNext)
      }
    )
  })
}








function* g() {
  // 同步
  yield myResolve(1, 1000);
  console.log("1");
  yield myResolve(2, 2000);
  console.log("2");
  yield myResolve(3, 3000);
  console.log("3");
  return myResolve(4, 5000);
}

// run(g);

// var res = []

function handleNext(it, val) {
  var next = it.next(val)
  if(next.done) {
    return next.value
  }

  return Promise.resolve(next.value).then((res)=> handleNext(it, res))
}

function runAll(gens) {
  var its = gens.map(g=> g())
  var res = []
  return its.reduce((p, it, i)=> {
    return p.then(()=> {
      return handleNext(it)
    }).then((data)=> {
      res.push(data)
    }) 
  }, Promise.resolve())
  .then(()=> {
    return res
  })
}

runAll(
  [function *() {
    var data = yield myResolve(1, 2000)
    return data
  },
  function *() {
    var data = yield myResolve(2, 500)
    return data
  },]
).then(res=> {
  console.log('res', res)
})

function all(ps) {
  const res = []

  return ps.reduce((p1, p2)=> {
    return Promise.resolve(p1).then((data)=> {
      res.push(data)
      return p2
    })
  }).then(()=> {
    return res
  })
  
}

console.time('a')
all([
  myResolve(1, 4000),
  myResolve(2, 2000),
]).then(data=> {
  console.log('data',data)
  console.timeEnd('a')
})
