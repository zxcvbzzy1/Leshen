<template>
  <div class="box">
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN"  :theme-overrides="themeOverrides">
        <n-card  :bordered="false">
          <n-tabs type="card" animated size="large" >
            <n-tab-pane display-directive="if" name="图例1" tap="图例1">
              <FluxTrend />
            </n-tab-pane>
            <n-tab-pane display-directive="if" name="图例2" tap="图例1">
              <VisitAmount />
            </n-tab-pane>
          </n-tabs>
        </n-card>
    </n-config-provider>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import FluxTrend from './FluxTrend.vue';
  import VisitAmount from './VisitAmount.vue';
  import { zhCN, dateZhCN } from 'naive-ui'
  import { NConfigProvider } from 'naive-ui'
  const themeOverrides = {
    common: {
      primaryColor: '#1677ff'
    },
    Button: {
      textColor: '#1677ff'
    },
    Select: {
      peers: {
        InternalSelection: {
          textColor: '#1677ff'
        }
      }
    }
  }
  export default defineComponent({
    components: { FluxTrend, VisitAmount,NConfigProvider },
    setup() {

      return {
        zhCN,
        dateZhCN,
        themeOverrides
      };
    },
  });
</script>
<style scoped>
.box{
  width: 100%;
  height: 100%;
}
</style>
