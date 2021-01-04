<template>
  <div class="app-container">
    <el-card class="box-card" body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" shadow="hover">
      <div slot="header" class="clearfix">统计报表</div>
      <el-form :inline="true" size="small">
        <el-form-item label="属性域: ">
          <el-select v-model="field" placeholder="请选择属性域" clearable filterable>
            <el-option v-for="item in fieldList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" plain @click="getStaticticData" />
        </el-form-item>
        <br>
        <el-form-item>
          <i class="el-icon-d-arrow-right" />
        </el-form-item>
        <el-form-item label="查询时间: ">
          <el-tag>{{ queryTime }} ms</el-tag>
        </el-form-item>
        <el-form-item>
          <i class="el-icon-d-arrow-right" />
        </el-form-item>
        <el-form-item label="总时间: ">
          <el-tag>{{ totalTime }} ms</el-tag>
        </el-form-item>
      </el-form>
    </el-card>
    <br>
    <el-card>
      <div id="movieChart" :style="{width: '100%', height: '600px'}" />
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
import { getStatisticDataNeo4j } from '../../api/neo4j'
import { showLoading, hideLoading } from '../../utils/loading'

export default {
  name: 'Hello',
  data() {
    return {
      field: '',
      queryTime: 0,
      totalTime: 0,
      fieldList: [
        { label: '时长', value: 'running_time' },
        { label: '语言', value: 'language' },
        { label: '载体', value: 'binding' },
        { label: '类别', value: 'genre' },
        { label: '上映年份', value: 'release_year' },
        { label: '评分', value: 'rate' }
      ],
      option: {
        title: { text: '' },
        tooltip: {},
        xAxis: { data: [] },
        yAxis: {},
        series: [{ name: '', type: 'bar', data: [] }]
      }
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      const movieChart = echarts.init(document.getElementById('movieChart'))
      movieChart.setOption(this.$data.option, true)
    },
    // 获取统计数据
    getStaticticData: function() {
      showLoading()
      const para = {
        field: this.$data.field
      }
      console.log(para)
      getStatisticDataNeo4j(para).then((response) => {
        console.log(response)
        this.$data.option.title.text = this.$data.field
        this.$data.option.xAxis.data = response.data.data.x
        this.$data.option.series[0].data = response.data.data.y
        this.$data.queryTime = response.data.queryTime
        this.$data.totalTime = response.data.totalTime
        this.drawLine()
      // eslint-disable-next-line handle-callback-err
      }, (error) => {
        this.$message({
          message: '服务器连接失败',
          type: 'error'
        })
        hideLoading()
        return
      })
      hideLoading()
    }
  }
}
</script>
