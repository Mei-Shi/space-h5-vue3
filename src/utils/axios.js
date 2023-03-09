import axios from 'axios'
import router from '@/router/index'
import { showFailToast, showToast } from "vant";
import { def } from '@vue/shared';

// baseURL 基础路径配置，backend-api-01.newbee.ltd/api/v1 为线上请求地址，这里只有一个地址，所以就不做区分
//axios.defaults.baseURL:配置你调用服务端的基础路径  import.meta.env:vite的环境变量
axios.defaults.baseURL = import.meta.env.MODE == 'development' ? '//backend-api-01.newbee.ltd/api/v1' : '//backend-api-01.newbee.ltd/api/v1'
// 跨域请求是要不要携带cookie，这里没有跨域请求的情况
// 登录之后的请求会带登录用户信息，需要把登录时的cookie设置到之后的请求头里面。
// 而跨域请求要想带上cookie，必须要请求属性withCredentials = true，
// 这是浏览器的同源策略导致的问题：不允许JS访问跨域的Cookie。
// withCredentials 属性是一个Boolean类型，它指示了是否该使用类似cookies, authorization，
// headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross - site Access - Control）请求。
axios.defaults.withCredentials = true
//X-Requested-With: XMLHttpRequest 只是用于"标识"是异步的
//只是为了通知 服务器，这个请求是异步的，是给服务器用的
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// 这里是判断用户登录状态是通过 token 来实现
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// post 请求时，发送 json 形式的数据包
axios.defaults.headers.post['Content-Type'] = 'application/json'
// interceptors 是拦截器，每个请求都会经过这个拦截器，返回的数据可以通过拦截处理后返回
axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        showFailToast('服务端异常')
        return Promise.reject(res)
    }
    if (res.data.resultCode != 200) {
        if (res.data.message) showFailToast(res.data.message)
        if (res.data.resultCode == 416) {
            // 返回 416 代表没有登录状态，路由跳转到/login 页面
            router.push({ path: '/login' })
        }
        if (res.data.data && window.location.hash == '#/login') {
            //window.location.hash 是当前路径
            setLocal('token', res.data.data)
            axios.defaults.headers['token'] = res.data.data
        }
        return Promise.reject(res.data)
    }
    return res.data
})

export default axios




