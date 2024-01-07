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
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            const fn = isResolve ? resolve : reject
            fn(value)
        }, ms);
    })
}
function myResolve(value, ms = 0) {
    return waitMs(value, ms, true)
}
function myReject(err, ms = 0) {
    return waitMs(err, ms, false)
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

// Promise.race()
// Promise.race中，如果在reject之前已经有resolve，那么这个Promise就已经决议了，那么reject会被忽略
// 如果是在之前，那么就会立即抛出错误

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
if(!Promise.none) {
    Promise.none = function(promises) {
        if(!Array.isArray(promises)) {
            throw Error('Promise.none(...)的参数必须为数组')
        }

        if(!promises.length) {
            return new Promise((resolve)=> {
                resolve()
            })
        }

        return new Promise((resolve, reject)=> {
            const errs = []
            let count = 0

            promises.forEach((p, i)=> {
                Promise.resolve(p).then((res)=> {
                    reject(res)
                }).catch((err)=> {
                    errs[i] = err
                    count++
                    if(count === promises.length) {
                        resolve(errs)
                    }
                })
            })
        })
    }
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
if(!Promise.any) {
    Promise.any = function(promises) {
        if(!Array.isArray(promises)) {
            throw Error('Promise.any(...)的参数必须为数组')
        }

        if(!promises.length) {
            return new Promise((resolve)=> {
                resolve()
            })
        }

        return new Promise((resolve, reject)=> {
            const errs = []
            let count = 0
    
            promises.map((p, i)=> {
                Promise.resolve(p)
                .then(res=> {
                    resolve(res)
                })
                .catch(err=> {
                    errs[i] = err
                    count++
                    if(count === promises.length) {
                        resolve(errs)
                    }
                })
            })
        })
    }
}


// 实现Promise.first



// 实现Promise.last
if(!Promise.last) {
    Promise.last = function(promises) {
        if(!Array.isArray(promises)) {
            throw Error('Promise.last(...)的参数必须为数组')
        }

        if(!promises.length) {
            return new Promise((resolve)=> {
                resolve()
            })
        }

        return new Promise((resolve, reject)=> {
            const errs = []

            let count = 0 
            let previousRsolved = null // 上一个resolve的值

            promises.forEach((p,i)=> {
                Promise.resolve(p)
                .then(
                    (res)=> {
                    previousRsolved = res
                    count ++
                    if(count === promises.length) {
                        resolve(previousRsolved)
                    }
                },
                    (err)=> {
                        errs[i] = err
                        count ++
                        if(count === promises.length) {
                            if(previousRsolved) {
                                resolve(previousRsolved)
                            } else {
                                reject(errs)
                            }
                        }
                    }
                )
                .catch((err)=> {
                    console.error('err', err)
                })
            })

        })
    }
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
if(!Promise.map) {
    Promise.map = function(promises, cb) {
        return Promise.all(
            promises.map((p, i)=> {
                return cb(Promise.resolve(p), i)
            })
        )
    }
}

console.time('a')
Promise.map([ myResolve(1, 1000), myResolve(2, 2000), myResolve(3, 3000)  ], (p, i)=> {
    return p.then(val=> {
        return val * 2
    })
})
.then(res=> {
    console.timeEnd('a')
    console.log('res', res)
} )
.catch(err=> console.log('err', err))