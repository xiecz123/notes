function Foo() { 
  getName = function () { console.log(1) }
  console.log(this)
  return this;
}
Foo.getName = function () {
  console.log(2)
}
Foo.prototype.getName = function () {
  console.log(3)
}
function getName() {
  console.log(5)
}
var getName = function () {
  console.log(4)
}


Foo.getName() // 2
getName() // 4
Foo().getName() // 1
getName() // 1
new Foo.getName() // 2 
new Foo().getName() // 3
new new Foo().getName() // 3
new (new Foo().getName()) // error: (intermediate value).getName(...) is not a constructor
(new new Foo()).getName() // error: (intermediate value) is not a constructor
new new (Foo().getName()) // error: Foo(...).getName(...) is not a constructor