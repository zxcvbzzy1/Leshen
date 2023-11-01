<script setup>
import {onMounted, reactive, ref, watch} from 'vue';
import {message, notification, theme} from 'ant-design-vue';
import {MenuUnfoldOutlined, MenuFoldOutlined, CloudFilled,LogoutOutlined} from '@ant-design/icons-vue';
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {userStore} from "@/store/UserStore";
import {roleStore} from "@/store/role";
import router from "@/router";
import {inquiryRole, updateUserStore} from "@/axios/inquiryRole";

const selectedKeys = ref(['1']);
const collapsed = ref(true);
const { useToken } = theme;
const { token } = useToken();
const route = useRoute()
const userInfor = userStore()
const roleInfor = roleStore()
const windowsWidth = ref()
const openNotificationWithIcon = (type,status,body) => {
  notification[type]({
    message: status,
    description: body,
  });
};
const items = ref()
function roleCheck(){
  switch (userInfor.userClass){
    case 'admin': items.value = roleInfor.admin;break;
    case 'student': items.value = roleInfor.student;break;
    case 'counselor': items.value = roleInfor.counselor;break;
  }
}
function onhander(){
  router.replace({name:selectedKeys.value.toString()})
}
watch(selectedKeys,()=>{
  onhander()
})
onBeforeRouteUpdate(  (to, from) => {
  console.log("123zxczxc2")
})
function checkWidth(){
  console.log(window.outerWidth)
  if(window.outerWidth>1000){
    windowsWidth.value = 80
  }
  else {
    windowsWidth.value = 0
    message.info("为了最佳体验，请横屏浏览此网页",3)
  }
}

onMounted(async ()=>{
  updateUserStore(route.params.username)
  roleCheck()
  checkWidth()
})
 function loginOut(){
  sessionStorage.clear()
  userInfor.$reset()
  router.replace({name:'login'})
}

function touchClose() {
  if (!collapsed.value){
    collapsed.value = true;
  }
}
</script>
<template>
  <div style="width: 100%;min-height: 100%;">
  <a-layout style="min-height: 100%;">

      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible theme="light"
        style="position: sticky;top: 0;z-index: 4;height: 100vh;line-height: normal;"
                      :collapsedWidth="windowsWidth"
      >
        <div class="logo" >
        </div>
        <a-menu
          mode="inline"
          theme="light"
          :inline-collapsed= false
          :items="items"
          v-model:selected-keys="selectedKeys"
        ></a-menu>
      </a-layout-sider>
    <a-layout>
      <a-layout-header  :class="[windowsWidth?'header':'phoneHeader']">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <a-button type="text" danger class="loginOut" size="middle" @click="loginOut">
          登出
          <logout-outlined></logout-outlined>
        </a-button>
      </a-layout-header>
      <a-layout-content
          :class="[windowsWidth?'PcContent':'PhoneContent']" @click="touchClose"
      >
        <router-view v-slot="{ Component }" >
          <transition name="v" mode="out-in" enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__fadeOut animate__faster">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
  </div>
</template>
<style scoped>
  .phoneHeader{
    position: static;
    z-index: 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }



.PhoneContent{
  padding: 2vh 1em;
  min-width: 100vw;
}
.PcContent{
  margin: 15px 24px;
  padding: 35px 45px;
  min-height: 280px;
}

.trigger {
  color: white;
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: 0.3s;
}
.trigger:hover {
  color: #1890ff;
}
.loginOut{
  color: #ff4d4f;
  font-size: 16px;
  line-height: 16px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border: 1px #ff4d4f solid;
}
.loginOut:hover{
  border: 0;
  transition: 0.3s;
  transform: scale(1.1,1.1);
}

.header{
  position: sticky;
  top: 0;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.logo{
  width: 100%;
  height: 80px;
}
</style>
