'use strict';
var foo = () => console.log('fooing');
let bar = () => console.log('baring');
const baz = () => console.log('bazing');

console.log(this);
console.log(this.foo);
console.log(foo);