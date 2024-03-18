function foo() {
  console.log('foo');
}
foo()

(function foo() {
  console.log('foo')
})()

(function IIFE(def) {
  def(window)
})(function def(global) {
  // do something
})