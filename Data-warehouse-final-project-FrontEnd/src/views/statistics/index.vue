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
import { showLoading, hideLoading } from "../../utils/loading"
import { getByTime, getByScore, getByEmotion } from "../../api/statistics"
export default {
    name: "Ststistics",
    data() {
        return {
            field: "",
            database: "mysql",
            condition: "",
            title: "",
            resultCount: 0,
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
            databaseList: [
                { label: "关系型数据库MySQL", value: "mysql" },
                { label: "分布式文件型数据仓库Hive", value: "hive" },
                { label: "图数据库neo4j", value: "neo4j" }
            ]
        }
    },
    methods: {
        //提交查询
        handleQuery: function() {
            showLoading()
            this.$data.results = []
            console.log(this.$data.field)
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
            hideLoading()
        },
        getStaticticData: function() {}
    }
}
</script>

<style scoped></style>
