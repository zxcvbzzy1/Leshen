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
        <n-radio-group v-model:value="value3" name="radiogroup2">
          <n-space>
            <n-radio v-for="song in songs2" :key="song.value" :value="song.value">
              {{ song.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-space>
  </div>
  <div class="col-auto" style="margin: 2vh;"></div>
  <div class="col-lg-8 col-sm-12">
    <div ref="chartRef" :style="{ height, width ,minHeight:'400px'}"></div>
  </div>
</div>
  <div class="row">
    <export-file :file-data="fileData" :file-data-name="{
      value:name,
      name:'词段'
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

function search(list, message,radio,radio2) {
  for (let item of list) {
    if (item.label === message) {
      console.log(item.value[radio2])
      return item.value[radio2][radio];
    }
    if (item.hasOwnProperty("children")) {
      const result = search(item.children, message,radio,radio2);
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
      const {choose,chooseValues} = toRefs(props)
      const chartRef = ref(null);
      const { setOptions } = useECharts(chartRef);
      const treeData = choose.value
      const valueRef = ref([])
      const radioValue = ref("1")
      const radioValue2 = ref("0")
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
      const name=ref("词根转化率")
      const fileData = ref()
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
            console.log(valueRef.value)
          }
        })
      }
      onMounted(() => {
        const myChart = echarts.init(chartRef.value);

        const zoomSize = 6;
        myChart.on('click', function (params) {
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis.value[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
              dataAxis.value[Math.min(params.dataIndex + zoomSize / 2, data.value.length - 1)]
          });
        });
      });
      watch(radioValue2,()=>{
        switch (radioValue2.value){
          case "0":
            name.value = "词根转化率";break;
          case "1":
            name.value = "词根成交量";break;
          case "2":
            name.value = "词根访客数";break;
          case "3":
            name.value = "综合距离";break;
        }
      })
      watch(ref({n1:valueRef,n2:radioValue,n3:radioValue2}),()=>{

        //新增接口
        chartData.value = valueRef.value.map((item)=>{
          return {
            value: search(chooseValues.value,item,radioValue.value,radioValue2.value), name: item
          }

        })
        fileData.value = chartData.value
      },{deep:true})
      watch(ref({n1:chartData,n2:radioValue,n3:radioValue2}),()=>{

        //新增接口
        dataAxis.value = chartData.value.map((item)=>{
           return item.name
        })
        data.value = chartData.value.map((item)=>{
          return item.value
        })

        setOptions({
          title: {
            text: name.value,
            subtext: name.value
          },
          tooltip:{


            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          xAxis: {
            type: 'category',
            data: dataAxis,
            axisLabel: {
              color:"rgb(153, 153, 153)"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#999'
            }
          },
          dataZoom: [
            {
              type: 'inside',
              maxZoom: 5,
            }
          ],
          series: [
            {
              type: 'bar',
              showBackground: true,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ])
              },
              emphasis: {
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                  ])
                }
              },
              data: data
            }
          ]
        });
      },{deep:true})

      return {
        options: flattenTree(treeData),
        value: valueRef,
        chartRef,
        fileData,
        name,
        renderSourceList,
        value2: radioValue,
        songs: [
          {
            value: "1",
            label: "平均值"
          },
          {
            value: "2",
            label: "最大值"
          },
          {
            value: "3",
            label: "最小值"
          },
          {
            value: "4",
            label: "总值"
          },
        ],
        value3: radioValue2,
        songs2: [
          {
            value: "0",
            label: "词根转化率"
          },
          {
            value: "1",
            label: "词根成交量"
          },
          {
            value: "2",
            label: "词根访客数"
          },
          {
            value: "3",
            label: "综合距离"
          },
        ],
      };
    },
  });
</script>
