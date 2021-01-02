import axios from 'axios'

const base = 'http://localhost:2468/mysqlMovie'

// 获取电影详细信息(全join)
export const allMatchMysql = params => {
  return axios({
    url: `${base}/allMatch`,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}
// 获取查询数量及前十条电影
export const getMoviesMysql = params => {
  return axios({
    url: `${base}/getMovies`,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

// 获取电影简单信息
export const simpleMatchMysql = params => {
  return axios.get(`${base}/getSimpleProduct`)
}

// 获取电影类别
export const getGenresMysql = params => {
  return axios.get(`${base}/genres`)
}

// 获取电影语言
export const getLanguageMysql = params => {
  return axios.get(`${base}/languages`)
}

// 获取电影介质
export const getBindingMysql = params => {
  return axios.get(`${base}/bindings`)
}
