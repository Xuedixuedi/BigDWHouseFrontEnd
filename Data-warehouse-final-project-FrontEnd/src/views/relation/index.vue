<template>
    <div class="app-container">
        <el-card
            class="box-card"
            body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
            shadow="hover"
        >
            <div slot="header">
                <span>合作关系</span>
            </div>
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
                    <el-switch
                        v-model="role1"
                        active-text="导演"
                        active-value="director"
                        inactive-text="演员"
                        inactive-value="actor"
                        :width="20"
                    />
                </el-form-item>
                <el-form-item>
                    <el-input
                        v-model="name"
                        placeholder="请输入名称"
                        clearable
                        suffix-icon="el-icon-edit"
                    />
                </el-form-item>
                <el-form-item label="与">
                    <el-switch
                        v-model="role2"
                        active-text="导演"
                        active-value="director"
                        inactive-text="演员"
                        inactive-value="actor"
                        :width="20"
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
                    <el-tag> {{ resultCount }} 个</el-tag>
                </el-form-item>
            </el-form>
        </el-card>
        <br />
        <el-card
            class="box-card"
            body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
            shadow="hover"
        >
            <div slot="header">
                <span>查询结果</span>
                <el-table :data="results" stripe>
                    <el-table-column
                        v-for="col in columns"
                        :key="col.key"
                        :prop="col.key"
                        :label="col.label"
                        align="center"
                /></el-table>
            </div>
        </el-card>
        <br />
    </div>
</template>

<script>
import { showLoading, hideLoading } from "../../utils/loading"
import {
    getActorByDirector,
    getActorByActor,
    getDirectorByDirector,
    getDirectorByActor
} from "../../api/relation"
import {
    ngetActorByDirector,
    ngetActorByActor,
    ngetDirectorByDirector,
    ngetDirectorByActor
} from "../../api/neo4jRelation"
import {
    hgetActorByDirector,
    hgetActorByActor,
    hgetDirectorByDirector,
    hgetDirectorByActor
} from "../../api/hiveRelation"

export default {
    name: "Relation",
    data() {
        return {
            role1: "actor",
            role2: "actor",
            name: "Jose Sefami",
            database: "neo4j",
            queryTime: 0,
            totalTime: 0,
            resultCount: 0,
            results: [],
            columns: [
                { label: "人物", key: "name" },
                { label: "合作次数", key: "count" }
            ],
            databaseList: [
                { label: "关系型数据库MySQL", value: "mysql" },
                { label: "分布式文件型数据仓库Hive", value: "hive" },
                { label: "图数据库neo4j", value: "neo4j" }
            ]
        }
    },
    methods: {
        handleQuery: function() {
            showLoading()
            const dirPara = {
                directorName: this.$data.name
            }
            const actPara = {
                actorName: this.$data.name
            }
            const hdirPara = {
                directorName: this.$data.name,
                limit: 20
            }
            const hactPara = {
                actorName: this.$data.name,
                limit: 20
            }
            console.log(dirPara)
            this.$data.results = []
            if (this.$data.database == "mysql") {
                if (
                    this.$data.role1 == "actor" &&
                    this.$data.role2 == "actor"
                ) {
                    console.log("actor-actor")
                    getActorByActor(actPara).then(
                        response => {
                            let relationInfo = response.data.relationInfo
                            this.$data.queryTime = response.data.time
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].actorName,
                                    count: relationInfo[key].cooperation
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
                } else if (
                    this.$data.role1 == "actor" &&
                    this.$data.role2 == "director"
                ) {
                    console.log("actor-director")
                    getDirectorByActor(actPara).then(
                        response => {
                            let relationInfo = response.data.relationInfo
                            this.$data.queryTime = response.data.time
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].directorName,
                                    count: relationInfo[key].cooperation
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
                } else if (
                    this.$data.role1 == "director" &&
                    this.$data.role2 == "director"
                ) {
                    console.log("director-director")
                    getDirectorByDirector(dirPara).then(
                        response => {
                            let relationInfo = response.data.relationInfo
                            this.$data.queryTime = response.data.time
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].directorName,
                                    count: relationInfo[key].cooperation
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
                } else if (
                    this.$data.role1 == "director" &&
                    this.$data.role2 == "actor"
                ) {
                    console.log("director-actor")
                    getActorByDirector(dirPara).then(
                        response => {
                            let relationInfo = response.data.relationInfo
                            this.$data.queryTime = response.data.time
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].actorName,
                                    count: relationInfo[key].cooperation
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
                    this.$data.role1 == "actor" &&
                    this.$data.role2 == "actor"
                ) {
                    console.log("actor-actor")
                    ngetActorByActor(actPara).then(
                        response => {
                            let relationInfo = response.data.relationInfo
                            this.$data.queryTime = response.data.time
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].name,
                                    count: relationInfo[key].count
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
                } else if (
                    this.$data.role1 == "actor" &&
                    this.$data.role2 == "director"
                ) {
                    console.log("actor-director")
                    ngetDirectorByActor(actPara).then(
                        response => {
                            let relationInfo = response.data.relationInfo
                            this.$data.queryTime = response.data.time
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].name,
                                    count: relationInfo[key].count
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
                } else if (
                    this.$data.role1 == "director" &&
                    this.$data.role2 == "director"
                ) {
                    console.log("director-director")
                    ngetDirectorByDirector(dirPara).then(
                        response => {
                            let relationInfo = response.data.relationInfo
                            this.$data.queryTime = response.data.time
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].name,
                                    count: relationInfo[key].count
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
                } else if (
                    this.$data.role1 == "director" &&
                    this.$data.role2 == "actor"
                ) {
                    console.log("director-actor")
                    ngetActorByDirector(dirPara).then(
                        response => {
                            let relationInfo = response.data.relationInfo
                            this.$data.queryTime = response.data.time
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].name,
                                    count: relationInfo[key].count
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
            } else if (this.$data.database == "hive") {
                if (
                    this.$data.role1 == "actor" &&
                    this.$data.role2 == "actor"
                ) {
                    console.log("actor-actor")
                    hgetActorByActor(hactPara).then(
                        response => {
                            let relationInfo = response.data.data
                            this.$data.queryTime = response.data.elapsedTime
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].name,
                                    count: relationInfo[key].count
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
                } else if (
                    this.$data.role1 == "actor" &&
                    this.$data.role2 == "director"
                ) {
                    console.log("actor-director")
                    hgetDirectorByActor(hactPara).then(
                        response => {
                            let relationInfo = response.data.data
                            this.$data.queryTime = response.data.elapsedTime
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].name,
                                    count: relationInfo[key].count
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
                } else if (
                    this.$data.role1 == "director" &&
                    this.$data.role2 == "director"
                ) {
                    console.log("director-director")
                    hgetDirectorByDirector(hdirPara).then(
                        response => {
                            let relationInfo = response.data.data
                            this.$data.queryTime = response.data.elapsedTime
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].name,
                                    count: relationInfo[key].count
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
                } else if (
                    this.$data.role1 == "director" &&
                    this.$data.role2 == "actor"
                ) {
                    console.log("director-actor")
                    hgetActorByDirector(hdirPara).then(
                        response => {
                            let relationInfo = response.data.data
                            this.$data.queryTime = response.data.elapsedTime
                            for (var key in relationInfo) {
                                this.results.push({
                                    name: relationInfo[key].name,
                                    count: relationInfo[key].count
                                })
                            }
                            this.$data.resultCount = relationInfo.length
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
            }
            hideLoading()
        }
    }
}
</script>

<style scoped></style>
