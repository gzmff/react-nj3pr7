import React, { useRef, useEffect, useState } from 'react';
import './style.css';
import Cards from './drag';

var obj = {
  name: 'obj',
  foo1: () => {
    console.log(this.name, 'ddd');
  },
  foo2: function () {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  },
};
var name = 'window';
obj.foo1();
obj.foo2()();
function throttle_2(fn, wait) {
  var flag = true;
  return function () {
    var context = this;
    var args = arguments;
    if (flag) {
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, wait);
    }
  };
}
function throttle(fn, wait, imme = true) {
  let timer = 0;
  let last = 0;
  return function () {
    if (imme) {
      let now = new Date().getTime();
      if (now - last > wait) {
        fn.apply(this, arguments);
        last = now;
      }
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, wait);
    }
  };
}
export default function App() {
  const timeRef = useRef();
  const time = useRef();
  const [num, setNum] = useState(0);
  class Foo {
    static named = '_island';
    #age;
    constructor(name, age) {
      this.name = name;
      this.#age = age;
    }
    getage() {
      return this.#age;
    }
  }
  const dd = new Foo('sss', 19);
  console.log(Foo.age, dd.age, dd.getage(), Foo.named, dd.named);
  //undefined,undefined,19_island,undefined
  const Singleton = function (name) {
    this.name = name;
  };
  Singleton.instance = null;
  console.log(Singleton.instance);
  Singleton.prototype.getName = function () {
    alert(this.name);
  };
  Singleton.getInstance = function (name) {
    console.log(this.instance, 'ddd');
    if (!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  };
  const a = Singleton.getInstance('a');
  const b = Singleton.getInstance('b');
  // a.getName();
  // b.getName();
  useEffect(() => {
    console.log(num);
  }, [num]);
  useEffect(() => {
    console.log(num, 'num');
  });
  useEffect(() => {
    timeRef.current = setInterval(() => {
      if (time.current && time.current > 0) {
        time.current -= 1;
      } else {
        if (time.current === 0) {
          clearInterval(timeRef.current);
        } else {
          time.current = 10;
        }
      }
    }, 1000);
  }, []);
  const click = () => {
    for (let i = 0; i < 100; i++) {
      setNum((num) => num + 1);
    }
  };
  function composeTT(...funcs) {
    if (funcs.length === 0) {
      return (arg) => arg;
    }

    if (funcs.length === 1) {
      return funcs[0];
    }

    return funcs.reduce((a, b) => {
      return (...args) => {
        return a(b(...args));
      };
    });
  }

  function add(a) {
    debugger;
    return function (b) {
      debugger;
      return a + b;
    };
  }

  function compose(...fns) {
    // 拿出最后两个参数
    var [fn1, fn2, ...rest] = fns.reverse();

    var composedFn = function composed(...args) {
      return fn2(fn1(...args));
    };

    if (rest.length == 0) return composedFn;

    return compose(...rest.reverse(), composedFn);
  }

  var composeT =
    (...fns) =>
    (result) => {
      var list = fns.slice();

      while (list.length > 0) {
        // 将最后一个函数从列表尾部拿出
        // 并执行它
        result = list.pop()(result);
      }

      return result;
    };
  function compones(...fn) {
    return function (x) {
      return fn.reduce(function (arg, fn) {
        debugger;
        return fn(arg);
      }, x);
    };
  }
  // 得到合成后的方法
  let add6 = compose(add(1), add(2), add(3));
  let add8 = compones(add(1), add(2), add(3));
  let add7 = composeT(add(1), add(2), add(3));

  console.warn(add6(4), 'ss');
  console.warn(add7(4), 'ss');
  console.warn(add8(4), 'sss');
  console.warn(1 - 0.9);
  return (
    <div>
      <h1 onClick={throttle(click, 2000)}>{num}</h1>
      <p>Start editing to see some magic happen :)</p>
      <Cards />
    </div>
  );
}
