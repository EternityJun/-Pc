/* 引入axios */
import axios from 'axios'
import qs from 'qs'
/* 创建axios工程化实例 */
const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.233:8086' //公司主机测试
        // baseURL: 'http://127.0.0.1:666' //家里主机
})

export const dologin = data => {
        // return axiosInstance.post('/login', qs.stringify(data)).then(res => res.data) //家里
        return axiosInstance.post('/spring/employee/login', qs.stringify(data)).then(res => res.data)
    }
    // export default axiosInstance主机