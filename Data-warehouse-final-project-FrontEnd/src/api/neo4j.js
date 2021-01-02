import axios from 'axios'
const base = 'http://localhost:2468/movie'

// 获取电影详细信息
export const allMatchNeo4j = params => {
  return axios({
    url: `${base}/allMatch`,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}
// 获取查询数量及部分电影电影
export const getMoviesNeo4j = params => {
  return axios({
    url: `${base}/allMatch`,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}
export const getProductNeo4j = params => {
  return axios({
    url: `${base}/getProduct`,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}
// 获取合作信息
export const getCooperationNeo4j = params => {
  return axios({
    url: `${base}/getCooperation`,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}
// 获取Top合作信息
export const getTopCooperationNeo4j = params => {
  return axios({
    url: `${base}/getTopCooperation`,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

// 获取统计数据
export const getStatisticDataNeo4j = params => {
  return axios({
    url: `${base}/getStastic`,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}
// 查询系列电影
export const getSeriesMovieNeo4j = params => {
  return axios({
    url: `${base}/getSery`,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

// 获取时间统计信息
export const getTimeStasticNeo4j = params => {
  return axios({
    url: `${base}/getTimeStastic`,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}
