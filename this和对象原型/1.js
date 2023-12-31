/* function foo() {
    console.log(globalThis.a);
}

var a = 2
foo()*/

/* function foo() {
    console.log(this.a)
}

var obj2 = {
    a: 42, 
    foo: foo
}

var obj1 = {
    a: 2,
    obj2: obj2
}

obj1.obj2.foo() */

// 默认绑定
// 隐式绑定
// 显示绑定
// new绑定

// new > 显示 > 隐式 > 默认

/*function foo(a) {
    this.a = a
}

var obj1 = {}
var bar = new (foo.bind(obj1, 2))
console.log(obj1);
console.log(bar); */


/**---------------------------------- 对象 */
/* var arr = [1,2,3]
arr['7'] = 1 // 改变了数组的length属性
console.log(arr.length, arr); */

/* var obj1 = {}
Object.defineProperty(obj1, 'a', {
    value: 2,
    writable: true,
    enumerable: true,
    configurable: true
})
 */


// console.log(obj1, obj);
// console.log(Object.getOwnPropertyDescriptor(obj1, 'a'));
/* Object.preventExtensions(obj1)
// delete obj1.a
obj1.b = 3
console.log(obj1);
 */

var obj = {
    get a() {
        return 'a'
    }
}
Object.defineProperty(obj, 'b', {
    get() {
        return 'b'
    },
    enumerable: false
})

obj.a = 'aaa'
// console.log(obj.a, obj.b);
// console.log(obj.hasOwnProperty('a'));
// console.log(obj.propertyIsEnumerable('b'))


/* var it = (val)=> {
    let init = 1
    return {
        next() {
            const isEnd = init > val
            return {
                value: isEnd ? undefined : init++,
                done: isEnd
            }
        }
    }
}
var it2 = it(4) */

// console.log(it2.next());
// console.log(it2.next());
// console.log(it2.next());
// console.log(it2.next());
// console.log(it2.next());
// console.log(it2.next());

// 为对象定义一个迭代器对象
/* var obj = {
    a:1,
    b:2
}

Object.defineProperty(obj, Symbol.iterator, {
    get() {
        const self = this
        let i = 0
        const ks = Object.keys(self)
        let isDone = false
        return function() {
            return {
                next() {
                    if(i >= ks.length) {
                        isDone = true
                    }
                    return {
                        value: isDone ? undefined : self[ks[i++]], 
                        done: isDone,
                    }
                }
            }
        }
    },
    
    enumerable: true,
    configurable: true,
})

var it = obj[Symbol.iterator]()
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next()); */


var obj = {
    [Symbol.iterator](){
        return {
            next() {
                return {
                    value: Math.random()
                }
            }
        }
    }
}
var arr = []
for(var n of obj) {
    arr.push(n)
    if(arr.length === 100) {
        break
    }
}

console.log(arr.length);





/**---------------------------------- 对象 */
/**---------------------------------- 对象 */
/**---------------------------------- 对象 */
/**---------------------------------- 对象 */



