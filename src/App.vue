<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'animate.css';
import router from "@/router";
import {userStore} from "@/store/UserStore";

function changeRoute (){
  const store = userStore()
    router.replace({name:'charts',params:{username:store.userName}})
}

</script>

<template>

  <router-view v-slot="{ Component }" @login-success="changeRoute" >
      <transition name="v" mode="out-in" enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutDown">
        <component :is="Component" />
      </transition>
  </router-view>

</template>

<style scoped>

</style>
