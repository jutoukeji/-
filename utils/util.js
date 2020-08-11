const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 设置监听器
 */
const setWatcher = page => {
  let data = page.data;
  let watch = page.watch;
  Object.keys(watch).forEach(key => {
    // 兼容带handler和不带handler的两种写法
    let watchFun = watch[key].handler || watch[key]; 
    // 若未设置deep,则为undefine
    let deep = watch[key].deep; 
    // 监听data对象的key
    observe(data, key, watchFun, deep, page); 
  })
}

/**
 * 监听属性 并执行监听函数
 */
const observe = (obj, key, watchFun, deep, page) => {
  var val = obj[key];
  // 判断deep是true 且 val不能为空 且 typeof val==='object'（数组内数值变化也需要深度监听）
  if (deep && val != null && typeof val === 'object') {
    Object.keys(val).forEach(childKey => { // 遍历val对象下的每一个key
      observe(val, childKey, watchFun, deep, page); // 递归调用监听函数
    })
  }
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    set: function (value) {
      // 用page对象调用,改变函数内this指向,以便this.data访问data内的属性值
      watchFun.call(page, value, val); // value是新值，val是旧值
      val = value;
      if (deep) { // 若是深度监听,重新监听该对象，以便监听其属性。
        observe(obj, key, watchFun, deep, page);
      }
    },
    get: function () {
      return val;
    }
  })
}

const getUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = {
  formatTime: formatTime,
  setWatcher: setWatcher,
  getUUID
}
