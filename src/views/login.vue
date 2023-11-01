<script setup>
import request from "@/axios/request";
import {reactive, ref} from "vue";
import LoginIcon from "@/svgICon/loginIcon.vue";
import {CloudFilled,UserOutlined,KeyOutlined} from '@ant-design/icons-vue';
import {notification} from "ant-design-vue";
import {userStore} from "@/store/UserStore";

const emit = defineEmits(['loginSuccess'])

const Loading = ref(false)
const formState = reactive({
  UseName:'',
  UserPassWord:'',
})
const store = userStore()

const openNotificationWithIcon = (type,status,body) => {
  notification[type]({
    message: status,
    description: body,
  });
};

async function login() {
  Loading.value=true
  await request.post("/login", formState).then(res => {
      let { status, data } = res;
      // 保存token
    console.log(data.userID)
      sessionStorage.setItem('ID',data.userID)
      sessionStorage.setItem('class',data.userClass)
      sessionStorage.setItem('token',data.token)
      //用户信息保存
      store.$patch({
          token: data.token,
          userId:data.userID,
          userClass:data.userClass,
          userName:formState.UseName,
        })
        Loading.value=false
        emit('loginSuccess')
  }).catch(function (error) {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      if (error.response.status === 400)
        openNotificationWithIcon('warn',error.response.status,"用户不存在")
      else
        openNotificationWithIcon('warn',error.response.status,error.response.data)
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      openNotificationWithIcon('error','服务器无响应','请运行本项目所配置的服务器')
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      openNotificationWithIcon('error','未知','请用开发者工具查看相关错误')
      console.log('Error', error.message);
    }
  });

  Loading.value=false
}



</script>

<template>
  <div class="row loginBox" style="margin: 0;">
  <div class="col-lg-6 col-sm-12 halfBox" style="background-color: rgb(45, 140, 240);margin: 0;">
    <login-icon style="height: 100%;width: 80%;"></login-icon>
  </div>
   <div class="col-lg-6 col-sm-12 halfBox">
     <div>
      <div class="flexColu" style="justify-content: space-around;" >
        <cloud-filled :style="{color:'rgb(45, 140, 240)', fontSize:'100px'}" />
        <a-typography-title type="secondary" :level="3">乐申可视化demo</a-typography-title>
      </div>
       <a-tabs  centered>
         <a-tab-pane key="1" tab="登录" force-render style="padding: 5px;">
          <div class="flexColu" >
            <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 24}"
                labelAlign="right"
                autocomplete="off"
                @finish="login"
            >
            <a-space direction="vertical">
              <a-form-item
                  label="用户名"
                  name="UseName"
                  :rules="[{ required: true, message: '请输入用户名！',trigger: 'change',whitespace:true }]"
              >
              <a-input v-model:value="formState.UseName" placeholder="username" >
                <template #prefix>
                  <user-outlined  :style="{color:'#bfbfbf'}"/>
                </template>
            </a-input>
              </a-form-item>
              <a-form-item
                  label="密码"
                  name="UserPassWord"
                  :rules="[{ required: true, message: '请输入你的密码！', trigger: 'change',whitespace:true }]"
              >
                <a-input-password v-model:value="formState.UserPassWord" placeholder="password" >
              <template #prefix>
                <key-outlined  :style="{color:'#bfbfbf'}"/>
              </template>
            </a-input-password>
              </a-form-item>
            </a-space>

              <a-form-item :wrapper-col="{ offset: 12, span: 12 }">
                <a-button type="primary" :loading="Loading"  html-type="submit" >
                  <a-typography-text style="color: rgb(255,255,255);" >登录</a-typography-text>
                </a-button>
              </a-form-item>
            </a-form>
          </div>
         </a-tab-pane>
       </a-tabs>
     </div>
   </div>
  </div>
</template>

<style scoped>
@media (width <= 1000px){
  .halfBox{
    margin-top: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

.halfBox{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.flexColu{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.loginBox{
  display: flex;
  justify-content: normal;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
}




</style>