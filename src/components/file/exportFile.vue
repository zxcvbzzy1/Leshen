<script setup >
import {ref} from "vue";
import { CaretRightOutlined ,DownloadOutlined,UploadOutlined,CaretUpOutlined} from '@ant-design/icons-vue';
import {message} from "ant-design-vue";
import * as XLSX from 'xlsx';
import request from "@/axios/request";

const formData = new FormData();
const activeKey = ref([]);
const fileList = ref([]);
const props = defineProps({
  fileData:{
    type:Array
  },
  fileDataName:{
    type:Object
  }
})

function exportExcel(){
  console.log(props.fileData)
  if(props.fileData === undefined){
    message.error({ content: '请选择数据！',key:"1", duration: 1 });
  }
  else {
    let workbook = XLSX.utils.book_new();
    let newData = props.fileData.map((item)=>{
      let newItem = {};
      for (let key in item) {
        if (props.fileDataName.hasOwnProperty(key)) {
          newItem[props.fileDataName[key]] = item[key];
        } else {
          newItem[key] = item[key];
        }
      }
      return newItem;
    })
    let worksheet = XLSX.utils.json_to_sheet(newData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, 'data.xlsx');
  }
}
const uploadApi = async ({ file, onUploadProgress }) => {
  formData.set('file', file);
  formData.set('id', sessionStorage.getItem('ID'));
  return request({
    url: '/upload_file',
    method: 'POST',
    data: formData,
    headers: {
      'Content-type': 'multipart/form-data',
    },
    onUploadProgress, // 上传进度回调函数 onUploadProgress(ev)
  })
};

const upData =(e) => {
  uploadApi({
    file: e.file,
    onUploadProgress: (ev) => {
      console.log(ev);
      const percent = (ev.loaded / ev.total) * 100;
      e.onProgress({ percent });
    },
  })
      .then((res) => {


        console.log('上传成功', res.data);
        e.onSuccess(res.data, e);
      })
      .catch((err) => {
        e.onError(err);
      });
};

</script>
<template>
  <a-collapse v-model:activeKey="activeKey" accordion :bordered="false"
              style="background: rgb(255, 255, 255)">
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="1" header="excel文件导出" style="background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden;">
      <a-typography>将选中的数据导出为excel文件</a-typography>
      <div class="row">
        <div class="col-12">
        </div>
        <div class="col-12" style="margin-top: 1vh;">
          <a-button type="primary" @click="exportExcel">
          <template #icon>
            <DownloadOutlined />
          </template>
          开导
        </a-button>
        </div>
      </div>

    </a-collapse-panel>
<!--    <a-collapse-panel key="2" header="excel文件导入" style="background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden">-->
<!--      <a-typography>将excel文件的数据，导入表格中（待开发）</a-typography>-->
<!--      <div class="col-12" style="margin-top: 1vh;">-->
<!--      <a-upload v-model:file-list="fileList" :custom-request="upData" name="file">-->
<!--        <a-button type="primary">-->
<!--          <template #icon>-->
<!--            <upload-outlined></upload-outlined>-->
<!--          </template>-->
<!--          开传-->
<!--        </a-button>-->
<!--      </a-upload>-->
<!--      </div>-->
<!--    </a-collapse-panel>-->
  </a-collapse>
</template>
<style scoped>

</style>