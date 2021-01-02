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
                <el-form :inline="true" size="small">
                    <el-form-item label="电影名称: ">
                        <el-input
                            v-model="title"
                            placeholder="请输入电影名称"
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
                <el-table :data="movies">
                    <el-table-column prop="title" label="标题" align="center" />
                    <el-table-column
                        prop="seryTitle"
                        label="系列名称"
                        align="center"
                    />
                    <el-table-column
                        prop="version"
                        label="版本数目"
                        align="center"
                    />
                </el-table>
            </el-card>
            <!-- ( ～'ω')～ 结束啦～ -->
        </div>
        按照条件查询
    </div>
</template>

<script>
export default {
    name: "Query"
}
</script>

<style scoped></style>
