import request from "@/axios/request";
import {notification} from "ant-design-vue";
import {userStore} from "@/store/UserStore";

const openNotificationWithIcon = (type,status,body) => {
    notification[type]({
        message: status,
        description: body,
    });
};


export async function inquiryRole(){
     const res= await request.get('/user_info',{
        params:{
            ID:sessionStorage.getItem('ID'),
            Class:sessionStorage.getItem('class')
        }
    }).catch((err)=>{
        if(err.response.status.toString() === "401") {

        }
        else openNotificationWithIcon('error', err.response.status.toString(), "请用开发者工具查看")
        return null
    })

    return res.data
}

export function updateUserStore(name){
    userStore().$patch({
        token: sessionStorage.getItem('token'),
        userId: sessionStorage.getItem('ID'),
        userClass: sessionStorage.getItem('class'),
        userName:name,
    })
}