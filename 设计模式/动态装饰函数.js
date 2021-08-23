Function.prototype.after = function( afterFn ) {
    let __self = this;
    console.log(this)
    return function() {
        
        let ret = __self.apply(this, arguments);
        afterFn.apply(this, arguments);
        console.log(afterFn)
        return ret;
    }
}

function dayin(){
    console.log("dayin")
}
global.dayin = dayin;

global.dayin = (global.dayin).after(function() {
    console.log("dayin2222")
})

global.dayin()