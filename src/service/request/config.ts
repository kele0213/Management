// 1.弱智方法：手动修改
// const BASE_URL = 'http://www.baidu.com/prod'
// const BASE_NAME = 'CZX'

// 2. 根据process.env.NODE_ENV进行判断，默认有几个值，development,production,test

let BASE_URL = ''
const TIMEOUT = 10000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = ''
} else {
  BASE_URL = ''
}

export { BASE_URL, TIMEOUT }
