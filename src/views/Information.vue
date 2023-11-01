<script setup>
import {userStore} from "@/store/UserStore";
import {message, notification} from "ant-design-vue";
import {onMounted, reactive, ref, toRaw} from "vue";
import {inquiryRole, updateUserStore} from "@/axios/inquiryRole";
import {useRoute} from "vue-router";
import {Counselor, Student, User} from "@/viewModels";



const route = useRoute()
const information =ref()
const edit = ref(true)
const edit2 = ref(true)
const userInfor = userStore()
const oldPassword = ref()
const newPassword = ref()

onMounted(async ()=>{
  const data = await inquiryRole()
  switch (userInfor.userClass){
    case "admin":
      information.value = new User(data.userId,data.userName);
      break;
    case "student":
      information.value = new Student(data.stuId,data.stuName,data.stuAge,data.stuGrade,data.stusex,data.stuMajor,data.stuHomeAddress,data.stuPhoneNumber,data.stuDromInfor,data.classId,data.dromId);
      break;
    case "counselor":
      information.value = new Counselor(data.uniCounselorId,data.uniCounselorName,data.uniCounselorAge,data.uniCounselorAddress,data.uniCounselorPhoneNum,data.classId)
      break;
  }
  console.log(information.value)
  console.log(data)
})


async function submitUserEdit(){
  message.error({ content: '没有权限',key:"1", duration: 1 });
}

</script>

<template>
<div>

  <a-skeleton v-if="information == null" active />
  <a-row v-else wrap :gutter="[80,50]" >

    <a-col >
      <a-descriptions title="用户设置" bordered size="small" :column="1" >
        <template #extra>
          <transition mode="out-in" enter-active-class="animate__animated animate__fadeInDown animate__faster" leave-active-class="animate__animated animate__fadeOutDown animate__faster">
            <a-button type="primary" v-if="edit2" @click="edit2 = false">编辑</a-button>
            <a-button type="primary" v-else @click="submitUserEdit" >提交</a-button>
          </transition>
        </template>
        <a-descriptions-item label="用户名" >
          <a-input v-model:value="userInfor.userName" :bordered="false" :disabled=edit2 />
        </a-descriptions-item>
        <a-descriptions-item label="原始密码" >
          <a-input-password v-model:value="oldPassword" :bordered="false" :disabled=edit2 />
        </a-descriptions-item>
        <a-descriptions-item label="新密码" >
          <a-input-password v-model:value="newPassword" :bordered="false" :disabled=edit2 />
        </a-descriptions-item>
      </a-descriptions>
    </a-col>

  </a-row>

</div>
</template>

<style scoped>

</style>