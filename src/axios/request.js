import axios from "axios"
import {notification} from "ant-design-vue";


const openNotificationWithIcon = (type,status,body) => {
    notification[type]({
        message: status,
        description: body,
    });
};

const request = axios.create({
    baseURL: "http://39.105.3.171:5173/api/",    //赋值公共域名
    timeout: 10000,
    withCredentials:false,
})


//拦截request的发送请求和响应请求，并做一定的配置
request.interceptors.request.use(
    //拦截发送请求，并给请求头信息headers加上token令牌
    config => {
        const token = sessionStorage.getItem("token");
        if(token)
            config.headers.Authorization = `Bearer ${token}`;
        return config
    },
    err => {
        Promise.reject(err)
    }
)
request.interceptors.response.use(
    //拦截响应请求 ， 这里直接返回数据
    response => {
        console.log(response)
        // console.log(response.headers)
        switch (response.status){
            case 200:
                return response;
            case 402:
                alert("请重新登录！跳转路由逻辑")
                break
            case 404:
                console.log("hhhhhh")
                break
            default: return response;
        }

    },
    err => {
        switch (err.response.status){
            case 401:
                sessionStorage.clear();
                openNotificationWithIcon('error', err.response.status.toString(), "登录状态过期，请重新登录")
                break;
            default:
                sessionStorage.clear();
                break;
        }
        return Promise.reject(err);
    }
)
//导出request
export default request;
