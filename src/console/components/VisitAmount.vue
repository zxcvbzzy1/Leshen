<template>
  <div class="row">
    <div class="col-lg-3 col-sm-12">
      <n-space vertical>
        <n-transfer
          ref="transfer"
          v-model:value="value"
          :options="options"
          :render-source-list="renderSourceList"
          source-filterable
        />
        <n-radio-group style="margin: 2vh 0" v-model:value="value2" name="radiogroup">
          <n-space>
            <n-radio v-for="song in songs" :key="song.value" :value="song.value">
              {{ song.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-space>
    </div>
    <div class="col-auto"></div>
    <div class="col-lg-8 col-sm-12" style="overflow-x: scroll;padding: 2vh;">
      <a-typography-text v-if="widthBool" strong>此处右滑显现更多</a-typography-text>
      <div ref="chartRef" :style="{ height, width,minWidth:'550px',minHeight:'450px' }" ></div>
    </div>
  </div>
  <div class="row" style="margin-top: 1vh;">
    <export-file :file-data="fileData" :file-data-name="{
      0:'词段',
      1:'词根转化率',
      2:'词根成交量',
      3:'词根访客数',
      4:'综合距离',
    }"></export-file>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, h, watch, toRefs } from 'vue';
import { useECharts } from '@/hooks/web/useECharts';
import { basicProps } from './props';
import { NTree} from 'naive-ui';
import echarts from "../../../utils/lib/echarts";
import ExportFile from "@/components/file/exportFile.vue";

const widthBool = ref(false)
function checkWidth(){
  console.log(window.outerWidth)
  if(window.outerWidth>600){
    widthBool.value = false
  }
  else widthBool.value = true
}

function flattenTree (list) {
  const result= []
  function flatten (_list = []) {
    _list.forEach((item) => {
      result.push(item)
      flatten(item.children)
    })
  }
  flatten(list)
  return result
}
function search(list, message,radio) {
  for (let item of list) {
    if (item.label === message) {
      return item.value[radio];
    }
    if (item.hasOwnProperty("children")) {
      const result = search(item.children, message,radio);
      if (result !== undefined) {
        return result;
      }
    }
  }

}


let chartData = ref();
export default defineComponent({
  components: {ExportFile},
  props: basicProps,
  setup(props) {
    const {choose,chooseValues2} = toRefs(props)
    const chartRef = ref(null);
    const { setOptions } = useECharts(chartRef);
    const treeData = choose.value
    const valueRef = ref([])
    const radioValue = ref("0")
    const dataAxis = ref([
      '功能',
      '性别',
      '大词',
      '风格',
      '人群',
      '款式',
      '颜色',
      '框型',
      '材质',
      '其他',
    ]);
    const data = ref([
      1901860,1111291,872123,300244,88199,50514,44687,22128,397
    ]);
    const fileData = ref()
    const itemStyle = {
      opacity: 0.8,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.3)'
    };

    const name=ref()
    const renderSourceList = function ({onCheck, pattern}) {
      return h(NTree, {
        style: 'margin: 0 4px;',
        keyField: 'value',
        checkable: true,
        selectable: false,
        blockLine: true,
        checkOnClick: true,
        data: treeData,
        cascade:true,
        pattern,
        checkedKeys: valueRef.value,
        onUpdateCheckedKeys: (checkedKeys) => {
          onCheck(checkedKeys)
        }
      })
    }
    onMounted(() => {
      checkWidth()
      const myChart = echarts.init(chartRef.value);

    });

    watch(ref({n1:valueRef,n2:radioValue}),()=>{

      chartData.value = valueRef.value.map((item)=>{
        return {
          value: search(chooseValues2.value,item,radioValue.value), name: item
        }
      })

    },{deep:true})
    watch(ref({n1:chartData,n2:radioValue}),()=>{

      dataAxis.value = chartData.value.map((item)=>{
        return item.name
      })

      data.value = chartData.value.map((item)=>{

        return item.value
      })
      fileData.value=data.value
      setOptions( {
        color: ['#dd4444'],
        legend: {
          top: 10,
          textStyle: {
            fontSize: 16
          }
        },
        grid: {
          left: '10%',
          right: 150,
          top: '18%',
          bottom: '10%'
        },
        tooltip: {
          backgroundColor: 'rgba(255,255,255,0.7)',
          formatter: function (param) {
            let schema = [
              { name: 'label', index: 0, text: '词段' },
              { name: 'v1', index: 1, text: '词根转化率' },
              { name: 'v2', index: 2, text: '词根成交量' },
              { name: 'v3', index: 3, text: '词根访客数' },
              { name: 'v4', index: 4, text: '综合距离' },
            ];
            let value = param.data;
            // prettier-ignore
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
               +schema[0].text+': '+ value[0]
              + '</div>'
               +schema[1].text+': '+ value[1] + '<br>'
               +schema[2].text+': '+ value[2] + '<br>'
               +schema[3].text+': '+ value[3] + '<br>'
               +schema[4].text+': '+ value[4] + '<br>'

          }
        },
        xAxis: {
          type: 'value',
          name: '词根访客数',
          nameLocation:'middle',
          nameGap: 24,
          dimension: 3,
          nameTextStyle: {
            fontSize: 16
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: '词根成交量',
          nameLocation: 'end',
          nameGap: 20,
          dimension: 2,
          nameTextStyle: {
            fontSize: 16
          },
          splitLine: {
            show: false
          }
        },
        visualMap: [
          {
            left: 'right',
            top: '10%',
            dimension: 'v4',
            calculable: true,
            precision: 3,
            max:0.5,
            text: ['圆形大小：综合距离'],

            inRange: {
              symbolSize: [10, 50]
            },
            outOfRange: {
              symbolSize: [10, 70],
              color: ['rgba(255,255,255,0.4)']
            },
            controller: {
              inRange: {
                color: ['#318fc2']
              },
              outOfRange: {
                color: ['#999']
              }
            }
          },
          {
            left: 'right',
            bottom: '5%',
            calculable: true,
            dimension: 'v1',
            text: ['明暗：词根转化率'],
            max:1,
            precision: 2,
            inRange: {
              colorLightness: [0.9, 0.5]
            },
            outOfRange: {
              color: ['rgba(255,255,255,0.4)']
            },
            controller: {
              inRange: {
                color: ['#dd4444']
              },
              outOfRange: {
                color: ['#999']
              }
            }
          }
        ],
        series: [
          {
            type: 'scatter',
            itemStyle: itemStyle,
            encode: {
              x: 'v3',
              y: 'v2'
            }
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 1,
            end: 100
          },
          {
            type: 'inside',
            yAxisIndex: [0],
            start: 1,
            end: 100
          }
        ],
        dataset: {
          source:data,
          dimensions: ['label', 'v1', 'v2', 'v3','v4'],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
            dataZoom: [
              {
                type: 'select',
                maxZoom: 5,
              }
            ],
          },
        },
      });
    },{deep:true})

    return {
      options: flattenTree(treeData),
      value: valueRef,
      chartRef,
      widthBool,
      fileData,
      renderSourceList,
      value2: radioValue,
      songs: [
        {
          value: "0",
          label: "平均值"
        },
        {
          value: "1",
          label: "最大值"
        },
        {
          value: "2",
          label: "最小值"
        },
        {
          value: "3",
          label: "总值"
        },
      ],
    };
  },
});
</script>
