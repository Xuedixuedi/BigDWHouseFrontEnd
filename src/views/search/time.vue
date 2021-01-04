<template>
  <div class="app-container">
    <el-card class="box-card" body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" shadow="hover">
      <div slot="header" class="clearfix">时间对比图表</div>
      <el-form :inline="true" size="small">
        <el-form-item label="类别: ">
          <el-input v-model="genre" placeholder="请输入类别" />
        </el-form-item>
        <el-form-item label="年份">
          <el-input v-model="year" placeholder="请输入年份" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" plain @click="getStatisticData" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-refresh" plain @click="clearStatisticData" />
        </el-form-item>
        <br>
        <el-form-item label="类别列表">
          {{ genresList }}
        </el-form-item>
      </el-form>
    </el-card>
    <br>
    <el-card>
      <div id="lineChart" :style="{width: '100%', height: '600px'}" />
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
import { getTimeStasticNeo4j } from '../../api/neo4j'
import { showLoading, hideLoading } from '../../utils/loading'

export default {
  name: 'Hello',
  data() {
    return {
      genre: 'ALL',
      year: 0,
      genresList: '| action | adventure | animation | anime | arthouse | arts | comedy | culture | documentary | entertainment | erotic | faith | family | fantasy | fitness | historical | horror | international | kids | lgbtq | military | mystery | romance | science fiction | special interest | special interests | spirituality | suspense | thrillers | unscripted | variety | war | western | young adult audience',
      option: {
        title: '',
        legend: {
          data: []
        },
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          name: '月份',
          nameTestStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        yAxis: {
          type: 'value',
          name: '电影数目',
          nameTestStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        series: []
      }
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      const movieChart = echarts.init(document.getElementById('lineChart'))
      movieChart.setOption(this.$data.option, true)
    },
    handleAddLegend: function() {
      this.$data.option.legend.data.push(this.$data.year)
    },
    clearStatisticData: function() {
      this.$data.option.legend.data = []
      this.$data.option.series = []
      this.$data.year = 0
      this.$data.field = 'ALL'
      this.drawLine()
    },
    // 获取统计数据
    getStatisticData: function() {
      showLoading()
      // this.testChart()
      if (this.$data.genre === '') {
        this.$data.genre = 'ALL'
      }
      const para = {
        genre: this.$data.genre,
        year: parseInt(this.$data.year)
      }
      console.log(para)
      getTimeStasticNeo4j(para).then((response) => {
        console.log(response.data)
        this.$data.option.legend.data.push(response.data.data.name)
        this.$data.option.series.push({
          name: response.data.data.name,
          data: response.data.data.y,
          type: 'line'
        })
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
    },
    testChart: function() {
      // ==================================================  测试 start
      this.$data.option.legend.data.push(this.$data.year)
      const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      for (var item in numList) {
        numList[item] += parseInt(this.$data.year)
      }
      this.$data.option.series.push({
        name: this.$data.year,
        data: numList,
        type: 'line'
      })
      this.drawLine()
      // ==================================================  测试 end
    }
  }
}
</script>
