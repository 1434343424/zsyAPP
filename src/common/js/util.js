// 判断是否存在emoji表情
export function isEmojiCharacter(substring) {
  for (let i = 0; i < substring.length; i++) {
    let hs = substring.charCodeAt(i)
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (substring.length > 1) {
        let ls = substring.charCodeAt(i + 1);
        let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (substring.length > 1) {
      let ls = substring.charCodeAt(i + 1);
      if (ls == 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
        || hs == 0x2b50) {
        return true;
      }
    }
  }
  return false
}
// 过滤emoji表情
export function filteremoji(emojireg) {
  var ranges = [
    '\ud83c[\udf00-\udfff]',
    '\ud83d[\udc00-\ude4f]',
    '\ud83d[\ude80-\udeff]'
  ];
  return emojireg.replace(new RegExp(ranges.join('|'), 'g'), '')
}
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
  let regStrs = [
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
