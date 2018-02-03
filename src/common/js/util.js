// 限制文本个数
export function getLimiteText(value) {
  let len = 23
  if (value.length > len) {
    return value.substr(0, len) + '···'
  } else {
    return value
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
export const currencyNew = (value) => {
  let count = 0
  for (let i = 0; i < value.length; i++) {
    // ...
    if (value[i] === '.') {
      count = count + 1
    }
  }
  console.log(count)
  if (count > 1) {
    return value.substr(0, value.indexOf('.') + 1)
  }
  if (value.split('.').length === 2 && value.split('.')[1].length > 2) {
    return value.substr(0, value.indexOf('.') + 3)
  }
  return value
}

export const currency = (v) => {
  var regStrs = [
    ['^0(\\d+)$', '$1'], // 禁止录入整数部分两位以上，但首位为0
    ['[^\\d\\.]+$', ''], // 禁止录入任何非数字和点
    ['\\.(\\d?)\\.+', '.$1'], // 禁止录入两个以上的点
    ['^(\\d+\\.\\d{2}).+', '$1'] // 禁止录入小数点后两位以上
  ]
  let i
  for (i = 0; i < regStrs.length; i++) {
    let reg = new RegExp(regStrs[i][0])
    v = v.replace(reg, regStrs[i][1])
  }
  console.log(v)
  return v
}
