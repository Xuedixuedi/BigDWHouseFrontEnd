<template>
    <div class="app-container">
        <el-card
            class="box-card"
            body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
            shadow="hover"
        >
            <div slot="header" class="clearfix">个数统计</div>
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
                <el-form-item label="属性域: ">
                    <el-select
                        v-model="field"
                        placeholder="请选择属性域"
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
                <el-form-item label="查询时间: ">
                    <el-tag>{{ queryTime }} ms</el-tag>
                </el-form-item>
                <br />
                <el-form-item>
                    <i class="el-icon-d-arrow-right" />
                </el-form-item>
                <el-form-item label="结果数目: ">
                    <el-tag>{{ resultCount }} 个</el-tag>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card
            class="box-card"
            body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
            shadow="hover"
        >
            <div slot="header" class="clearfix">统计报表</div>
            <el-form :inline="true" size="small">
                <el-form-item label="属性域: ">
                    <el-select
                        v-model="staField"
                        placeholder="请选择属性域"
                        clearable
                        filterable
                    >
                        <el-option
                            v-for="item in staFieldList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        icon="el-icon-search"
                        plain
                        @click="getStaticticData"
                    />
                </el-form-item>
                <br />
            </el-form>
        </el-card>
        <br />
        <el-card>
            <div id="movieChart" :style="{ width: '100%', height: '600px' }" />
        </el-card>
    </div>
</template>

<script>
import echarts from "echarts"
require("echarts/theme/macarons") // echarts theme
import { showLoading, hideLoading } from "../../utils/loading"
import {
    getByTime,
    getByScore,
    getByEmotion,
    statisticsByScore
} from "../../api/statistics"
import {
    ngetByTime,
    ngetByScore,
    ngetByEmotion
} from "../../api/neo4jStatistics"

export default {
    name: "Ststistics",
    data() {
        return {
            field: "year",
            staField: "score",
            database: "mysql",
            condition: "equal",
            title: "2002-01-01",
            resultCount: 0,
            queryTime: 0,
            statisticsResult: [],
            //图表信息
            option: {
                title: { text: "" },
                tooltip: {},
                xAxis: { data: [] },
                yAxis: {},
                series: [{ name: "", type: "bar", data: [] }]
            },
            // ==============================================
            //                  查询域值常量
            // ==============================================
            fieldList: [
                { label: "年份", value: "year" },
                { label: "月份", value: "month" },
                { label: "日期", value: "day" },
                { label: "季度", value: "season" },
                { label: "评分", value: "score" },
                { label: "情感评分", value: "emotion" }
            ],
            conditionList: [
                { label: "等于", value: "equal" },
                { label: "大于（晚于）", value: "greater" },
                { label: "小于（早于）", value: "less" }
            ],
            staFieldList: [
                { label: "演员", value: "actor" },
                { label: "导演", value: "director" },
                { label: "标签", value: "label" },
                { label: "评分", value: "score" },
                { label: "情感评分", value: "emotion" }
            ],
            databaseList: [
                { label: "关系型数据库MySQL", value: "mysql" },
                { label: "分布式文件型数据仓库Hive", value: "hive" },
                { label: "图数据库neo4j", value: "neo4j" }
            ]
        }
    },
    mounted() {
        this.drawLine()
    },
    methods: {
        drawLine() {
            const movieChart = echarts.init(
                document.getElementById("movieChart")
            )
            movieChart.setOption(this.$data.option, true)
        },
        //提交查询
        handleQuery: function() {
            showLoading()
            console.log(this.$data.database)
            if (this.$data.database == "mysql") {
                if (
                    this.$data.field == "year" ||
                    this.$data.field == "month" ||
                    this.$data.field == "day" ||
                    this.$data.field == "season"
                ) {
                    const para = {
                        time: this.$data.title,
                        type: this.$data.field,
                        comparison: this.$data.condition
                    }
                    console.log(para)
                    getByTime(para).then(
                        response => {
                            console.log(response.data)
                            this.$data.resultCount = response.data.Count
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
                        large: this.$data.condition
                    }
                    console.log(para)
                    getByScore(para).then(
                        response => {
                            console.log(response.data)
                            this.$data.resultCount = response.data.Count
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
                        large: this.$data.condition
                    }
                    console.log(para)
                    getByEmotion(para).then(
                        response => {
                            console.log(response.data)
                            this.$data.resultCount = response.data.Count
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
            } else if (this.$data.database == "neo4j") {
                if (
                    this.$data.field == "year" ||
                    this.$data.field == "month" ||
                    this.$data.field == "day" ||
                    this.$data.field == "season"
                ) {
                    const para = {
                        time: this.$data.title,
                        type: this.$data.field,
                        comparison: this.$data.condition
                    }
                    console.log(para)
                    ngetByTime(para).then(
                        response => {
                            console.log(response.data)
                            this.$data.resultCount = response.data.count
                            this.$data.queryTime = response.data.time
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
                    console.log(para)
                    ngetByScore(para).then(
                        response => {
                            console.log(response.data)
                            this.$data.resultCount = response.data.count
                            this.$data.queryTime = response.data.time
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
                    console.log(para)
                    ngetByEmotion(para).then(
                        response => {
                            console.log(response.data)
                            this.$data.resultCount = response.data.count
                            this.$data.queryTime = response.data.time
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
                console.log("neo4j")
            } else if (this.$data.database == "hive") {
                console.log("hive")
            }
            hideLoading()
        },
        //获取统计数据
        getStaticticData: function() {
            showLoading()
            this.$data.statisticsResult = []
            console.log(this.$data.staField)
            if (this.$data.staField == "score") {
                statisticsByScore().then(
                    response => {
                        console.log(response.data)
                        statisticsResult = response.data
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
        }
    }
}
</script>

<style scoped></style>
