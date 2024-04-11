// 正则学习
// var str = '123 1234 12345 123456'
// str.match(/\d{2,5}/g)
// console.log("🚀 ~ str.match(/\d{2,5}/g):", str.match(/\d{2,5}?/g))

var str = `blob gjwogjwgowgjgw a.png
blob gjwogjwgowgjgw b.png
blob gjwogjwgowgjgw c.png`
var reg = /[\w]+ ([\w]+) ([^\s]+)$/gm
// str.match(ret)
// console.log("🚀 ~ str.match(ret):", str.match(ret))
let ret
do {
  ret = reg.exec(str)  
  console.log(ret?.[2]);
} while (ret);


