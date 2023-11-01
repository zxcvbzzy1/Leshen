import {defineStore} from "pinia";
import {reactive} from "vue";

export const userStore = defineStore('userStroeId',{
    state:()=>({
        token:'',
        userId:'',
        userClass:'',
        userName:'',
    })


})