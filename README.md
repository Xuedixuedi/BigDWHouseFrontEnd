# 大数据仓库前端

### 如何启动

```
yarn install

yarn run dev
```

### 我们干了什么

实现了21*3个api：

对关系型数据库Mysql、分布式文件型数据仓库Hive、图数据库neo4j分别实现了下列功能：

+ Query
  + 按导演查询
  + 按演员查询
  + 按电影类型查询
  + 按分数查询
  + 按情感分数查询
  + 按电影标题查询
+ Relation
  + 给定演员名，查询合作过的演员、导演名及合作次数
  + 给定导演名，查询合作过的演员、导演名及合作次数
+ Statistics
  + 按照给定年月日季度和比较符统计电影个数
  + 按照给定分数和比较符统计电影个数
  + 按照给定情感分数和比较符统计电影个数
  + 按照导演、演员、类型统计电影
  + 按照分数、情感分数统计电影

### 项目后端及ETL代码

https://github.com/Major-333/BigDataWareHouse

⬆️ETL+Mysql+neo4j

Hive代码在一个私有仓库，因为这个朋友把数据库密码OpenBilibili后就私有了。

ETL和neo4j由大🐙贡献。mysql是本人贡献的，Hive由小🐙朋友贡献。

### 其他

留给前端的时间只有一天，但是由于之前把后端写完了，所以一天也写完了，就是真的写的没什么规划（能用就行的水平）。

如果有学弟学妹看到这个库，希望能够给大家的项目带来一点帮助🙏。

