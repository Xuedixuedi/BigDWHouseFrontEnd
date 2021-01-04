<template>
    <div class="dashboard-container">
        <div class="dashboard-text">2020数据仓库大项目</div>
        <div>
            <h2>数据来源:</h2>
            <div class="margin-bottom-10" style="margin-left:20px">
                <ul>
                    <li>
                        Stanford:<a
                            target="_blank"
                            href="http://snap.stanford.edu/data/web-Movies.html"
                            >http://snap.stanford.edu/data/web-Movies.html</a
                        >
                    </li>
                </ul>
            </div>
            <br />
            <h2>项目要求:</h2>
            <div class="margin-bottom-10" style="margin-left:20px">
                <p>
                    针对电影及其周边信息，建立基于关系型数据仓库、分布式文件型数据仓库系统和图数据库的数据仓库系统，并进行系统性能比对
                </p>
                <ul>
                    <li>能够从数据来源处获取数据，进行数据预处理</li>
                    <li>建立关系型数据仓库存储模型，存储数据</li>
                    <li>建立分布式文件系统存储模型，存储数据</li>
                    <li>建立图数据库存储模型，存储数据</li>
                    <li>
                        在数据展现的界面上能够执行数据应用中的查询，并将在三种不同存储模型上的执行时间以数值的方式和图表的方式显示在界面上
                    </li>
                    <li>
                        对每种存储方式结合本项目说明各自适用于处理什么查询，针对本项目在存储优化中做了什么工作，优化前后的比较结果是怎样的，以文档的方式提交
                    </li>
                </ul>
            </div>
            <br />
            <h2>数据来源:</h2>
            <div class="margin-bottom-10" style="margin-left:20px">
                <p>
                    数据来源自Snap的文本文件和Amazon网站，数据包括但不限于以下信息：
                </p>
                <ul>
                    <li>电影ID</li>
                    <li>评论用户ID</li>
                    <li>评论用户ProfileName</li>
                    <li>评论用户评价Helpfulness</li>
                    <li>评论用户Score</li>
                    <li>评论时间Time</li>
                    <li>评论结论Summary</li>
                    <li>评论结论Text</li>
                    <li>电影演员</li>
                    <li>电影上映时间</li>
                    <li>电影风格</li>
                    <li>电影导演</li>
                    <li>电影主演</li>
                    <li>电影演员</li>
                    <li>电影版本</li>
                </ul>
            </div>
            <br />
            <h2>数据应用:</h2>
            <div class="margin-bottom-10" style="margin-left:20px">
                <p>常见查询及统计（占总查询数目）=80%</p>
                <ul>
                    <li>
                        按照时间进行查询及统计（例如XX年有多少电影，XX年XX月有多少电影，XX年XX季度有多少电影，周二新增多少电影等）
                    </li>
                    <li>
                        按照电影名称进行查询及统计（例如 XX电影共有多少版本等
                    </li>
                    <li>按照导演进行查询及统计（例如 XX导演共有多少电影等）</li>
                    <li>
                        按照演员进行查询及统计（例如
                        XX演员主演多少电影，XX演员参演多少电影等）
                    </li>
                    <li>
                        按照演员和导演的关系进行查询及统计（例如经常合作的演员有哪些，经常合作的导演和演员有哪些）
                    </li>
                    <li>
                        按照电影类别进行查询及统计（例如
                        Action电影共有多少，Adventure电影共有多少等）
                    </li>
                    <li>
                        按照用户评价进行查询及统计（例如用户评分3分以上的电影有哪些，用户评价中有正面评价的电影有哪些等）
                    </li>
                    <li>按照上述条件的组合查询和统计</li>
                </ul>
            </div>
            <br />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    name: "Dashboard",
    computed: {
        ...mapGetters(["name"])
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
