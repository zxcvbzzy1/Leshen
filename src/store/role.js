import {defineStore} from "pinia";
import {h, reactive} from "vue";
import {HomeOutlined, IdcardOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons-vue";

export const roleStore = defineStore('roleStroeId',{
    state:()=>({
        admin:[{
            key: 'echarts',
            label: '数据可视化',
            title: '数据可视化',
            children: [{
                key: 'charts',
                label: '数据可视化',
                title: '数据可视化',
            },
            ]}
        ],
        student:[{
            key: 'Information',
            label: '个人信息',
            title: '个人信息',
            icon:  () => h(UserOutlined)
        }, {
            key: 'InquiryDrom',
            label: '住宿查询',
            title: '住宿查询',
            icon:  () => h(HomeOutlined)
        }],
        counselor:[{
            key: 'Information',
            label: '个人信息',
            title: '个人信息',
            icon:  () => h(UserOutlined)
        }, {
            key: 'StudentDromManage',
            label: '学生宿舍管理',
            title: '学生宿舍管理',
            icon:  () => h(IdcardOutlined),
        },
        ],



    })

})