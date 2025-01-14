// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://domain.dev:8000'
// export const BASE_URL = 'http://domain.prod:8000'

// 2.代码逻辑判断, 判断当前环境
// vite默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染

let BASE_URL = ''
// 判断是否为生产环境
if (import.meta.env.PROD) {
  BASE_URL = 'http://123.207.32.32:5000'
} else {
  BASE_URL = 'http://codercba.com:5000'
}
console.log(BASE_URL)

// 3.通过创建.env文件直接创建变量，能够通过vite直接获取到VITE_为前缀的变量
// console.log(import.meta.env.VITE_URL)

export const TIME_OUT = 10000
export { BASE_URL }
