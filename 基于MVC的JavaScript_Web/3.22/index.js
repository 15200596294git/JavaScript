/**
 * 断言一个值是否为真值 
 * @param {any} value
 * @param {string} msg
 */
function assert(value, msg) {
  if(!value) {
    throw(msg || (value + '不等于true'))
  }
}

/**
 * 断言两个值是否相等
 * @param {any} value1 
 * @param {any} value2 
 * @param {string} msg 
 */
function assertEqual(value1, value2, msg) {
  if(value1 !== value2) {
    throw(msg || `${value1} 不等于 ${value2}`)
  }
}
