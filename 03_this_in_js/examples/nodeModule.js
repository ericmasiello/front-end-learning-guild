function foo() {
  console.log('fooing');
}

function bar() {
  console.log('baring');
}

console.log('Is this global?', this === global);
console.log('Is this module.exports?', this === module.exports);

this.foo = foo;
this.bar = bar;

// module.exports = { foo, bar };