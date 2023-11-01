import request from "@/axios/request";
import {notification} from "ant-design-vue";
const openNotificationWithIcon = (type,status,body) => {
    notification[type]({
        message: status,
        description: body,
    });
};


export async function getBusinessInfo(){
    const res= await request.get('/business_total_data').catch((err)=>{
        console.log(err)
        if(err.response.status.toString() === "401") {

        }
        else openNotificationWithIcon('error', err.response.status.toString(), "请用开发者工具查看")
        return null
    })
    return res.data
}
