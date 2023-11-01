import request from "@/axios/request";
import {notification} from "ant-design-vue";
const openNotificationWithIcon = (type,status,body) => {
    notification[type]({
        message: status,
        description: body,
    });
};
export async function changeUser(id,object){
    try{
        await request.put(`/user/changeUser/${id}`, object)
        return true
    }
    catch(err) {
        if(err.response.status.toString() === "401") {
        }
        else openNotificationWithIcon('error', err.response.status.toString(), err.response.data)
        return false
    }

}
