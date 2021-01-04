<template>
  <div class="app-container">
    <!-- 查询命令选择 -->
    <el-card class="box-card" body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" shadow="hover">
      <div slot="header" class="clearfix">查询条件</div>
      <el-form :inline="true" size="small">
        <el-form-item>
          <el-switch v-model="database" active-text="Neo4j" active-value="neo4j" inactive-text="Mysql" inactive-value="mysql" :width="20" />
        </el-form-item>
        <el-form-item>
          <i class="el-icon-d-arrow-right" />
        </el-form-item>
        <el-form-item>
          <el-switch v-model="operator" active-text="或" active-value="or" inactive-text="且" inactive-value="and" :width="20" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="field" placeholder="请选择属性域" clearable filterable>
            <el-option v-for="item in fieldList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="condition" placeholder="请选择判别条件" clearable filterable>
            <el-option v-for="item in conditionList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="value" placeholder="请输入属性值" clearable suffix-icon="el-icon-edit" />
        </el-form-item>
        <!-- (´・ω・`) button控件： 增加 command-->
        <el-form-item>
          <el-button icon="el-icon-plus" plain @click="handleCommandAdd" />
        </el-form-item>
        <!-- (´・ω・`) button控件： 查询 -->
        <el-form-item>
          <el-button icon="el-icon-search" plain @click="handleQuery" />
        </el-form-item>
        <el-form-item label="类别列表">
          {{ genresList }}
        </el-form-item>
        <el-form-item label="语言列表">
          {{ languageList }}
        </el-form-item>
        <el-form-item label="载体列表">
          {{ bindingList }}
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
        <br>
        <el-form-item>
          <i class="el-icon-d-arrow-right" />
        </el-form-item>
        <el-form-item label="电影总数: ">
          <el-tag>{{ movieNum }} 个</el-tag>
        </el-form-item>
        <el-form-item>
          <i class="el-icon-d-arrow-right" />
        </el-form-item>
        <el-form-item label="产品总数: ">
          <el-tag>{{ productNum }} 个</el-tag>
        </el-form-item>
      </el-form>
      <!-- ( ～'ω')～ 结束啦～ -->
      <br>
      <!-- command查询命令展示 -->
      <el-table :data="commandList" stripe>
        <el-table-column prop="operator" label="且 ｜ 或" align="center">
          <template slot-scope="scope">
            {{ scope.row.operator == "and" ? "且" : "或" }}
          </template>
        </el-table-column>
        <el-table-column prop="field" label="属性域" align="center" />
        <el-table-column prop="condition" label="条件" align="center" />
        <el-table-column prop="value" label="值" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleCommandDelete(scope.$index)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- ( ～'ω')～ 结束啦～ -->
    <br>
    <!-- movie查询结果展示 -->
    <el-card class="box-card" body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" shadow="hover">
      <div slot="header" class="clearfix">
        <span>查询结果</span>
      </div>
      <el-table :data="movies">
        <el-table-column prop="title" label="标题" align="center">
          <template slot-scope="inline">
            <el-tooltip effect="dark" content="点击查看所有关联的产品" placement="top">
              <el-button type="text" @click="getProdutctInfo(inline.row.title)">{{ inline.row.title }}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="genre" label="类别" align="center" />
        <el-table-column prop="director" label="导演" align="center" />
        <el-table-column prop="actor" label="演员" align="center" />
      </el-table>
    </el-card>
    <!-- ( ～'ω')～ 结束啦～ -->
    <!-- product的review信息-->
    <el-dialog title="产品评论信息" :visible.sync="reviewVisible" width="70%" center>
      <el-row>
        <el-col :span="6">
          查询时间 : <el-tag>{{ queryTime }} ms</el-tag>
        </el-col>
      </el-row>
      <el-table :data="reviews" stripe>
        <el-table-column prop="userID" label="用户ID" align="center" />
        <el-table-column prop="profileName" label="用户名称" align="center" />
        <el-table-column prop="score" label="用户评分" align="center" sortable />
        <el-table-column prop="helpfulness" label="评论价值" align="center" sortable />
        <el-table-column prop="sentiment" label="正负面评价" align="center">
          <template slot-scope="scope">
            {{ scope.row.sentiment}}
          </template>
        </el-table-column>
        <el-table-column prop="time" label="评论时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.time | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="summary" label="评论综述" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="getReviewDetailInfo(scope.row.text)">{{ scope.row.summary }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button size="mini" @click="reviewVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- ( ～'ω')～ 结束啦～ -->
    <!-- movie的product信息 -->
    <el-dialog title="电影产品信息" :visible.sync="productVisible" width="90%" center>
      <el-row>
        <el-col :span="6">
          查询时间 : <el-tag>{{ queryTime }} ms</el-tag>
        </el-col>
        <el-col :span="6">
          总时间 : <el-tag>{{ totalTime }} ms</el-tag>
        </el-col>
        <el-col :span="6">
          产品总数目 : <el-tag>{{ productNum }} 个</el-tag>
        </el-col>
      </el-row>
      <el-table :data="products">
        <el-table-column prop="productId" label="产品ID" align="center" />
        <el-table-column label="产品评分" align="center" sortable>
          <template slot-scope="inline">
            <el-tooltip effect="dark" content="点击查看所有相关评论" placement="top">
              <el-button type="text" @click="getReviewInfo(inline.row.productId)">{{ inline.row.rate }}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="binding" label="载体" align="center" />
        <el-table-column prop="runtime" label="时长" align="center" sortable />
        <el-table-column prop="language" label="语言" align="center" />
        <el-table-column prop="good_comment_rate" label="好评率" align="center" />
        <el-table-column prop="total_comment" label="总评数" align="center" />
        <el-table-column prop="good_comment" label="好评数" align="center" />
        <el-table-column label="发布日期" align="center">
          <el-table-column prop="release_year" label="年" align="center" />
          <el-table-column prop="release_month" label="月" align="center" />
          <el-table-column prop="release_day" label="日" align="center" />
          <el-table-column prop="release_weekday" label="星期" align="center" />
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button size="mini" @click="productVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- ( ～'ω')～ 结束啦～ -->
    <el-dialog width="50%" title="详细评论" :visible.sync="reviewInnerVisible" append-to-body>
      {{ reviewDetailInfo }}
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { getMoviesMysql, getGenresMysql, getLanguageMysql, getBindingMysql } from '../../api/mysql'
import { getMoviesNeo4j,getProductNeo4j } from '../../api/neo4j'
import { getReviewList } from '../../api/hive'
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
      // ==============================================
      //                 查询命令参数
      // ==============================================
      commandList: [],
      database: 'mysql',
      operator: 'and',
      field: '',
      condition: '',
      value: '',
      // ==============================================
      //                  查询域值常量
      // ==============================================
      fieldList: [
        { label: '标题', value: 'title' },
        { label: '时长', value: 'running_time' },
        { label: '演员', value: 'actor' },
        { label: '导演', value: 'director' },
        { label: '语言', value: 'language' },
        { label: '载体', value: 'binding' },
        { label: '类别', value: 'genre' },
        { label: '上映年份', value: 'release_year' },
        { label: '上映月份', value: 'release_month' },
        { label: '上映日期', value: 'release_day' },
        { label: '上映星期', value: 'release_weekday' },
        { label: '评分', value: 'rate' },
        { label: '季度', value: 'quarter' },
        { label: '好评率', value: 'good_comment_rate' },
        { label: '总评', value: 'total_comment' }
      ],
      conditionList: [
        { label: '是', value: 'eq' },
        { label: '不是', value: 'neq' },
        { label: '包含', value: 'contains' },
        { label: '大于等于', value: 'greater' },
        { label: '小于等于', value: 'less' }
      ],
      genresList: '',
      languageList: '',
      bindingList: '',
      reviewDetailInfo: '',
      // ==============================================
      //               ui控件的可见性控制
      // ==============================================
      reviewVisible: false,
      reviewInnerVisible: false,
      productVisible: false,
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
  mounted: function() {
    showLoading()
    const para = {}
    getGenresMysql(para).then((response) => {
      var result = ''
      for (var item in response.data) {
        result = result + ' | ' + response.data[item]
      }
      this.$data.genresList = result
    // eslint-disable-next-line handle-callback-err
    }, (error) => {
      this.$message({
        message: '拉取参数列表失败',
        type: 'error'
      })
      hideLoading()
      return
    })
    getLanguageMysql(para).then((response) => {
      var result = ''
      for (var item in response.data) {
        result = result + ' | ' + response.data[item]
      }
      this.$data.languageList = result
    // eslint-disable-next-line handle-callback-err
    }, (error) => {
      this.$message({
        message: '拉取参数列表失败',
        type: 'error'
      })
      hideLoading()
      return
    })
    getBindingMysql(para).then((response) => {
      var result = ''
      for (var item in response.data) {
        result = result + ' | ' + response.data[item]
      }
      this.$data.bindingList = result
    // eslint-disable-next-line handle-callback-err
    }, (error) => {
      this.$message({
        message: '拉取参数列表失败',
        type: 'error'
      })
      hideLoading()
      return
    })
    hideLoading()
  },
  methods: {
    // 删除 command
    handleCommandDelete: function(index, row) {
      this.commandList.splice(index, 1)
      console.log(index, row)
    },
    // 增加 command
    handleCommandAdd: function() {
      if (this.$data.field === 'quarter') {
        if (this.$data.value === '1') {
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '1' })
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '2' })
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '3' })
        } else if (this.$data.value === '2') {
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '4' })
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '5' })
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '6' })
        } else if (this.$data.value === '3') {
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '7' })
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '8' })
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '9' })
        } else if (this.$data.value === '4') {
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '10' })
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '11' })
          this.commandList.push({ operator: 'or', field: 'month', condition: 'eq', value: '12' })
        } else {
          this.$message.error('季度值不符合规范请重新填写')
        }
      } else {
        this.commandList.push({
          operator: this.operator,
          field: this.field,
          condition: this.condition,
          value: this.value
        })
      }
      console.log(this.$data.commandList)
    },
    // 进行电影的查询
    handleQuery: function() {
      showLoading()
      const para = {
        commands: this.$data.commandList
      }
      this.clear()
      console.log(para)
      if (this.$data.database === 'mysql') {
        getMoviesMysql(para).then((response) => {
          console.log(response)
          this.$data.movies = response.data.data
          this.$data.queryTime = response.data.queryTime
          this.$data.totalTime = response.data.totalTime
          this.$data.movieNum = response.data.movieNum
          this.$data.productNum = response.data.productNum
          var result = ''
          for (var item in response.data.data.actor) {
            result = result + ' | ' + response.data.data.actor[item]
          }
          this.$data.movies.actor = result
          result = ''
          for (var i in response.data.data.director) {
            result = result + ' | ' + response.data.data.director[i]
          }
          this.$data.movies.director = result
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
      } else {
        getMoviesNeo4j(para).then((response) => {
          this.$data.movies = response.data.data
          this.$data.queryTime = response.data.queryTime
          this.$data.totalTime = response.data.totalTime
          this.$data.movieNum = response.data.movieNum
          this.$data.productNum = response.data.productNum
          var result = ''
          for (var item in response.data.data.actor) {
            result = result + ' | ' + response.data.data.actor[item]
          }
          this.$data.movies.actor = result
          result = ''
          for (var i in response.data.data.director) {
            result = result + ' | ' + response.data.data.director[i]
          }
          this.$data.movies.director = result
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
      }
      hideLoading()
    },
    getProdutctInfo: function(title) {
      showLoading()
      const para = {
        commands: this.$data.commandList,
        title: title
      }
      getProductNeo4j(para).then((response) => {
        console.log(response.data)
        this.$data.products = response.data.data
        this.$data.queryTime = response.data.queryTime
        this.$data.totalTime = response.data.totalTime
        this.$data.productNum = response.data.productNum
        this.$data.productVisible = true
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
    getReviewInfo: function(param) {
      showLoading()
      getReviewList(param).then((response) => {
        console.log(response.data)
        this.$data.reviews = response.data.hiveReviews
        this.$data.queryTime = response.data.queryTime
        this.$data.reviewVisible = true
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
    getReviewDetailInfo: function(param) {
      this.$data.reviewDetailInfo = param
      this.$data.reviewInnerVisible = true
    },
    clear: function() {
      this.$data.field = ''
      this.$data.condition = ''
      this.$data.value = ''
      this.$data.queryTime = 0
      this.$data.totalTime = 0
      this.$data.movieNum = 0
      this.$data.productNum = 0
      this.$data.products = []
      this.$data.movies = []
      this.$data.reviews = []
    }
  }
}
</script>
