## 源码阅读

### src/core/instance

#### initState

1、绑定顺序 initProps; initMethods; initData; initComputed;initWatch;

#### initProps

1、对 props 进行了响应式处理使用 defineReactive 方法（defineReactive 方法来自 src/core/observer）
2、initProps 将 props 放在了 vm.\_props 中管理，再通过 proxy 方法代理对 this.propKey 的设置与访问
3、toggleObserving 方法是干嘛用的？
4、其他地方用了 vm.$options.props 但是在这里没看到对应的赋值？

#### initMethods

1、methods 中的方法名不能与 props 重名，方法名不能以\_或者$开头。
2、将 methods 中的方法绑定到 vm 上

#### initData

1、判重：不能和 methods 和 props 重复
2、通过 proxy 方法代理对 this.dataKey 的设置与访问
3、使用 observe 方法设置响应式（observe 方法来自 src/core/observer）

#### initComputed

1、为计算属性创建内部观察者（不是 SSR 才创建）。
2、定义实例化时定义的计算属性（defineComputed）。

    // 直接在vm上定义computedKey，支持通过this.computedKey去访问computed属性，
    拦截操作符的get属性，返回计算后的值

3、开发环境判重（为什么不先判重？）

#### initWatch
