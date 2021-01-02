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
                <el-table :data="results" stripe> </el-table>
            </div>
        </el-card>
        <br />
    </div>
</template>

<script>
import { showLoading, hideLoading } from "../../utils/loading"
import { getActorByDirector } from "../../api/relation"

export default {
    name: "Relation",
    data() {
        return {
            role1: "actor",
            role2: "actor",
            name: "",
            database: "neo4j",
            queryTime: 0,
            totalTime: 0,
            resultCount: 0,
            results: []
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
            console.log(dirPara)
            this.$data.results = []
            if (this.$data.role1 == "actor" && this.$data.role2 == "actor") {
                console.log("actor-actor")
            } else if (
                this.$data.role1 == "actor" &&
                this.$data.role2 == "director"
            ) {
                console.log("actor-director")
            } else if (
                this.$data.role1 == "director" &&
                this.$data.role2 == "director"
            ) {
                console.log("director-director")
            } else if (
                this.$data.role1 == "director" &&
                this.$data.role2 == "actor"
            ) {
                console.log("director-actor")
                getActorByDirector(dirPara).then(
                    response => {
                        this.$data.results = response.data.relationInfo
                        this.$data.queryTime = response.data.time
                        console.log(this.$data.results)
                        // eslint-disable-next-line handle-callback-err
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
