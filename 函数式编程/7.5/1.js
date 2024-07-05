import _ from 'underscore'

function fail(thing) {
  throw new Error(['🚀 ~ fail:', thing].join(' '));
}

function warn(thing) {
  console.warn(['🚀 ~ warn:', thing].join(' '));
}

function note(thing) {
  console.log(['🚀 ~ log:', thing].join(' '));
}

function parseAge(age) {
  if(!_.isString(age)) fail('Expecting a string');
  note(`尝试解析age:${age}`);

  let a = parseInt(age, 10)
  if(_.isNaN(a)) {
    warn(`不能解析age:${age}`);
    a = 0
  }

  return a
}

note(parseAge('a1'))

