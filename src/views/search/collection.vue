<template>
  <div class="app-container">
    <!-- 查询命令选择 -->
    <el-card class="box-card" body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" shadow="hover">
      <div slot="header" class="clearfix">系列电影</div>
      <el-form :inline="true" size="small">
        <el-form-item label="电影名称: ">
          <el-input v-model="title" placeholder="请输入电影名称" clearable suffix-icon="el-icon-edit" />
        </el-form-item>
        <!-- (´・ω・`) button控件： 查询 -->
        <el-form-item>
          <el-button icon="el-icon-search" plain @click="handleQuery" />
        </el-form-item>
        <br>
        <el-form-item>
          <i class="el-icon-d-arrow-right" />
        </el-form-item>
        <el-form-item label="查询时间:">
          <el-tag>{{ queryTime }} ms</el-tag>
        </el-form-item>
        <el-form-item>
          <i class="el-icon-d-arrow-right" />
        </el-form-item>
        <el-form-item label="总时间:">
          <el-tag>{{ totalTime }} ms</el-tag>
        </el-form-item>
      </el-form>
      <!-- ( ～'ω')～ 结束啦～ -->
      <br>
    </el-card>
    <!-- ( ～'ω')～ 结束啦～ -->
    <br>
    <!-- movie查询结果展示 -->
    <el-card class="box-card" body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" shadow="hover">
      <div slot="header" class="clearfix">
        <span>查询结果</span>
      </div>
      <el-table :data="movies">
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="seryTitle" label="系列名称" align="center" />
        <el-table-column prop="version" label="版本数目" align="center" />
      </el-table>
    </el-card>
    <!-- ( ～'ω')～ 结束啦～ -->
  </div>
</template>

<script>
import { getSeriesMovieNeo4j } from '../../api/neo4j'
import { getReviewList } from '../../api/hive'
import moment from 'moment'
import { showLoading, hideLoading } from '../../utils/loading'
export default {
  filters: {
    formatDate: function(value) {
      console.log(value)
      var v = parseFloat(value) * 1000
      console.log()
      return moment(v).format('YYYY-MM-DD')
    }
  },
  data() {
    return {
      title: '',
      reviewDetailInfo: '',
      // ==============================================
      //               ui控件的可见性控制
      // ==============================================
      reviewVisible: false,
      reviewInnerVisible: false,
      // ==============================================
      //                 统计类查询结果
      // ==============================================
      queryTime: 0,
      totalTime: 0,
      movieNum: 0,
      productNum: 0,
      // ==============================================
      //                 信息类查询结果
      // ==============================================
      products: [],
      movies: [],
      reviews: []
    }
  },
  methods: {
    // 进行电影的查询
    handleQuery: function() {
      showLoading()
      const para = {
        title: this.$data.title
      }
      console.log(para)
      this.$data.movies = []
      this.$data.products = []
      getSeriesMovieNeo4j(para).then((response) => {
        this.$data.movies = response.data.data
        this.$data.products = response.data.data.product
        this.$data.queryTime = response.data.queryTime
        this.$data.totalTime = response.data.totalTime
        this.$data.movieNum = response.data.movieNum
        this.$data.productNum = response.data.productNum
        if (this.$data.movies.length === 0) {
          this.$message({
            message: '不存在指定标题的系列电影',
            type: 'info'
          })
        }
        console.log(response.data)
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
    getProdutctInfo: function() {
      this.$data.productVisible = true
    },
    getReviewInfo: function(param) {
      console.log(param)
      getReviewList(param).then((response) => {
        this.$data.reviews = response.data.hiveReviews
        this.$data.queryTime = response.data.queryTime
        this.$data.reviewVisible = true
      })
    },
    getReviewDetailInfo: function(param) {
      this.$data.reviewDetailInfo = param
      this.$data.reviewInnerVisible = true
    }
  }
}
</script>
