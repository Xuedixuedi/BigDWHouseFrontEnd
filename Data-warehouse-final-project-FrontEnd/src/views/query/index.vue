<template>
    <div>
        <div class="app-container">
            <!-- 查询命令选择 -->
            <el-card
                class="box-card"
                body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                shadow="hover"
            >
                <div slot="header" class="clearfix">查询条件</div>
                <div>
                    <el-select
                        v-model="database"
                        placeholder="请选择数据库"
                        clearable
                        filterable
                    >
                        <el-option
                            v-for="item in databaseList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
                <br />
                <el-form :inline="true" size="small">
                    <el-form-item>
                        <el-select
                            v-model="field"
                            placeholder="请选择查询条件"
                            clearable
                            filterable
                        >
                            <el-option
                                v-for="item in fieldList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select
                            v-model="condition"
                            placeholder="请选择判别条件"
                            clearable
                            filterable
                        >
                            <el-option
                                v-for="item in conditionList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input
                            v-model="title"
                            placeholder="请输入匹配内容"
                            clearable
                            suffix-icon="el-icon-edit"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            icon="el-icon-search"
                            plain
                            @click="handleQuery"
                        />
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <i class="el-icon-d-arrow-right" />
                    </el-form-item>
                    <el-form-item label="查询时间:">
                        <el-tag>{{ queryTime }} ms</el-tag>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <i class="el-icon-d-arrow-right" />
                    </el-form-item>
                    <el-form-item label="结果数目: ">
                        <el-tag> {{ results.length }} 个</el-tag>
                    </el-form-item>
                </el-form>
                <br />
            </el-card>
            <br />
            <!-- movie查询结果展示 -->
            <el-card
                class="box-card"
                body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
                shadow="hover"
            >
                <div slot="header" class="clearfix">
                    <span>查询结果</span>
                </div>
                <el-table :data="results">
                    <el-table-column prop="id" label="电影id" align="center" />
                    <el-table-column prop="title" label="标题" align="center" />
                    <el-table-column
                        prop="version"
                        label="版本数目"
                        align="center"
                    />
                    <el-table-column prop="score" label="评分" align="center" />
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script>
import { showLoading, hideLoading } from "../../utils/loading"
import {
    getByTitle,
    getByActor,
    getByDirector,
    getByLabel,
    getByScore,
    getByEmotion
} from "../../api/query"
import { get } from "js-cookie"

export default {
    name: "Query",
    data() {
        return {
            commandList: [],
            database: "mysql",
            field: "",
            title: "",
            condition: "",
            queryTime: 0,
            results: [],
            resultCount: 0,
            // ==============================================
            //                  查询域值常量
            // ==============================================
            fieldList: [
                { label: "标题", value: "title" },
                { label: "演员", value: "actor" },
                { label: "导演", value: "director" },
                { label: "标签", value: "label" },
                { label: "评分", value: "score" },
                { label: "情感评分", value: "emotion" }
            ],
            conditionList: [
                { label: "等于", value: "equal" },
                { label: "大于", value: "greater" },
                { label: "小于", value: "less" }
            ],
            databaseList: [
                { label: "关系型数据库MySQL", value: "mysql" },
                { label: "分布式文件型数据仓库Hive", value: "hive" },
                { label: "图数据库neo4j", value: "neo4j" }
            ]
        }
    },
    methods: {
        //选择查询类型
        handleCommandAdd: function() {
            this.commandList.push({
                field: this.field,
                value: this.value,
                condition: this.condition
            })
        },
        //提交查询
        handleQuery: function() {
            showLoading()
            this.$data.results = []
            console.log(this.$data.field)
            if (this.$data.field == "actor") {
                const para = {
                    actorName: this.$data.title
                }
                getByActor(para).then(
                    response => {
                        console.log(response.data)
                        this.$data.queryTime = response.data.time
                        let movieInfo = response.data.movieList
                        console.log(movieInfo)
                        this.getMobieList(movieInfo)
                        console.log(this.$data.results)
                    },
                    error => {
                        this.$message({
                            message: "服务器连接失败",
                            type: "error"
                        })
                        hideLoading()
                        return
                    }
                )
            } else if (this.$data.field == "title") {
                const para = {
                    title: this.$data.title
                }
                getByTitle(para).then(
                    response => {
                        console.log(response.data)
                        this.$data.queryTime = response.data.time
                        let movieInfo = response.data.movieList
                        console.log(movieInfo)
                        this.getMobieList(movieInfo)
                        console.log(this.$data.results)
                    },
                    error => {
                        this.$message({
                            message: "服务器连接失败",
                            type: "error"
                        })
                        hideLoading()
                        return
                    }
                )
            } else if (this.$data.field == "director") {
                const para = {
                    directorName: this.$data.title
                }
                getByDirector(para).then(
                    response => {
                        console.log(response.data)
                        this.$data.queryTime = response.data.time
                        let movieInfo = response.data.movieList
                        console.log(movieInfo)
                        this.getMobieList(movieInfo)
                        console.log(this.$data.results)
                    },
                    error => {
                        this.$message({
                            message: "服务器连接失败",
                            type: "error"
                        })
                        hideLoading()
                        return
                    }
                )
            } else if (this.$data.field == "label") {
                const para = {
                    labelName: this.$data.title
                }
                getByLabel(para).then(
                    response => {
                        console.log(response.data)
                        this.$data.queryTime = response.data.time
                        let movieInfo = response.data.movieList
                        console.log(movieInfo)
                        this.getMobieList(movieInfo)
                        console.log(this.$data.results)
                    },
                    error => {
                        this.$message({
                            message: "服务器连接失败",
                            type: "error"
                        })
                        hideLoading()
                        return
                    }
                )
            } else if (this.$data.field == "score") {
                const para = {
                    score: this.$data.title,
                    comparison: this.$data.condition
                }
                getByScore(para).then(
                    response => {
                        console.log(response.data)
                        this.$data.queryTime = response.data.time
                        let movieInfo = response.data.movieList
                        console.log(movieInfo)
                        this.getMobieList(movieInfo)
                        console.log(this.$data.results)
                    },
                    error => {
                        this.$message({
                            message: "服务器连接失败",
                            type: "error"
                        })
                        hideLoading()
                        return
                    }
                )
            } else if (this.$data.field == "emotion") {
                const para = {
                    score: this.$data.title,
                    comparison: this.$data.condition
                }
                getByEmotion(para).then(
                    response => {
                        console.log(response.data)
                        this.$data.queryTime = response.data.time
                        let movieInfo = response.data.movieList
                        console.log(movieInfo)
                        this.getMobieList(movieInfo)
                        console.log(this.$data.results)
                    },
                    error => {
                        this.$message({
                            message: "服务器连接失败",
                            type: "error"
                        })
                        hideLoading()
                        return
                    }
                )
            }
            hideLoading()
        },
        //把得到的数据转成movieList
        getMobieList: function(movieInfo) {
            for (var key in movieInfo) {
                this.$data.results.push({
                    id: movieInfo[key].productId,
                    title: movieInfo[key].title,
                    version: movieInfo[key].version,
                    score: movieInfo[key].score.score / 100
                })
            }
        },
        clear: function() {
            this.$data.field = ""
            this.$data.condition = ""
            this.$data.value = ""
            this.$data.queryTime = 0
            this.$data.commandList = []
        }
    }
}
</script>

<style scoped></style>
