<template>
  <div>
    <el-card>
      <div slot="header">
        <i class="el-icon-menu"></i>
        <span>电影查询条件</span>
      </div>
      <el-row>
        <el-table :data="chosen">
          <el-table-column prop="operator" label="与/或"></el-table-column>
          <el-table-column prop="field" label="字段"></el-table-column>
          <el-table-column prop="value" label="值"></el-table-column>
          <el-table-column prop="condition" label="判断"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="remove(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <br />

    <el-card>
      <div slot="header">
        <el-icon type="home"></el-icon>
        <span>查询条件列表</span>
      </div>
      <el-row>
        <el-table :data="commandType">
          <!-- and or -->
          <el-table-column label="与/或">
            <template slot-scope="scope">
              <el-select v-model="scope.row.type" placeholder="请选择">
                <el-option
                  v-for="item in ['and', 'or']"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- 字段 -->
          <el-table-column prop="key" label="字段">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.key"
                value-key="name"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in scope.row.keys"
                  :key="item.name"
                  :label="item.name"
                  :value="item"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- value -->
          <el-table-column prop="value" label="值">
            <template slot-scope="scope">
              <!-- 输入框 -->
              <el-input
                v-if="scope.row.key.type == 0"
                v-model="scope.row.value"
                placeholder="请输入内容"
              ></el-input>
              <!-- 时间 -->
              <el-date-picker
                v-else-if="scope.row.key.type == 1"
                v-model="scope.row.value"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
              <!-- 选择器 -->
              <el-select
                v-else-if="scope.row.key.type == 2"
                v-model="scope.row.value"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in scope.row.values[scope.row.key.name]"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
              <!-- range -->
              <div v-else>
                <el-input
                  v-model="scope.row.value"
                  placeholder="请输入起始"
                ></el-input>
                <el-input
                  v-model="scope.row.valueEnd"
                  placeholder="请输入结束"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <!-- 判断 -->
          <el-table-column prop="op" label="判断">
            <template slot-scope="scope">
              <el-select v-model="scope.row.op" placeholder="请选择">
                <el-option
                  v-for="item in ['eq', 'neq', 'contains']"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- 添加 -->
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="addCommand(scope.row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <br />
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="search()">查询</el-button>
      </el-row>
    </el-card>
    <br />

    <el-card>
      <div slot="header">
        <el-icon type="home"></el-icon>
        <span>查询结果</span>
      </div>
      <el-row>
        <el-col :span="6">查询时间: {{ result.queryTime }}</el-col>
        <el-col :span="6">总用时: {{ result.totalTime }}</el-col>
      </el-row>
      <br/>
      <el-row>
        <el-collapse v-model="activeMovies" @change="showProduct">
          <el-collapse-item
            v-for="movie in result.data"
            :key="movie.title"
            :title="movie.showTitle"
          >
            <el-table :data="movie.products">
              <el-table-column prop="productId" label="Id"></el-table-column>
              <el-table-column prop="rate" label="评分"></el-table-column>
              <el-table-column prop="runtime" label="时长"></el-table-column>
              <el-table-column
                prop="release_time"
                label="发布时间"
              ></el-table-column>
              <el-table-column prop="language" label="语言"></el-table-column>
              <el-table-column prop="binding" label="介质"></el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-row>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */

import axios from "axios";

var baseUrl = "http://localhost:2468/";

export default {
  data() {
    return {
      chosen: [],
      result: [],
      commandType: [
        {
          type: "and",
          key: {
            name: "title",
            type: 0
          },
          keys: [
            {
              name: "title",
              type: 0
            },
            {
              name: "actor",
              type: 0
            },
            {
              name: "director",
              type: 0
            },
            {
              name: "date",
              type: 1
            },
            {
              name: "genre",
              type: 2
            },
            {
              name: "language",
              type: 2
            },
            {
              name: "binding",
              type: 2
            },
            {
              name: "rate",
              type: 3
            },
            {
              name: "runtime",
              type: 3
            }
          ],
          value: "",
          values: {
            genre: [],
            language: [],
            binding: []
          },
          op: ""
        }
      ],
      activeMovies: []
    };
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      var getGenre = axios.get(baseUrl + "mysqlMovie/genres");
      var getLanguage = axios.get(baseUrl + "mysqlMovie/languages");
      var getBinding = axios.get(baseUrl + "mysqlMovie/bindings");
      var that = this;
      axios
        .all([getGenre, getLanguage, getBinding])
        .then(
          axios.spread(function(genreRes, languageRes, bindingRes) {
            that.commandType[0].values.genre = genreRes.data;
            that.commandType[0].values.language = languageRes.data;
            that.commandType[0].values.binding = bindingRes.data;
          })
        )
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },

    search() {
      axios
        .post(baseUrl + "mysqlMovie/allMatch", { commands: this.chosen })
        .then(res => {
          console.log(res);
          this.result = res.data;
          if (this.result.data.length == 0) {
            this.$message({
              message: "无数据",
              type: "info"
            });
          }
          for (var movie of this.result.data) {
            movie.showTitle = movie.title + "\n Actors: ";
            for (var a of movie.actor) {
              movie.showTitle += a + "/";
            }
            movie.showTitle += "\n Directors: ";
            for (var d of movie.director) {
              movie.showTitle += d + "/";
            }
            movie.showTitle += "\n Genres: ";
            for (var g of movie.genre) {
              movie.showTitle += g + "/";
            }
            movie.products = [];
            for (var key in movie.product) {
              var p = movie.product[key];
              p.release_time =
                p.release_year + "-" + p.release_month + "-" + p.release_day;
              movie.products.push(p);
            }
          }
          console.log(this.result);
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },

    addCommand(c) {
      if (c.key.type == 3) {
        c.value = c.value + "/" + c.valueEnd;
      }
      this.chosen.push({
        operator: c.type,
        field: c.key.name,
        condition: c.op,
        value: c.value
      });
      console.log("add command", c);
    },

    remove(index) {
      this.chosen.splice(index, 1);
    },

    showProduct(val) {}
  }
};
</script>

<style>
.el-collapse-item__header {
  white-space: pre-line;
  height: 100px;
  line-height: 25px;
  padding-left: 25px;
}
</style>
