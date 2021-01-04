import axios from "axios"
const base = "http://100.64.218.50:10684/query/mysql"

export const getByTitle = params => {
    return axios.get(`${base}/title`, {
        params
    })
}

export const getByActor = params => {
    return axios.get(`${base}/actor`, {
        params
    })
}

export const getByDirector = params => {
    return axios.get(`${base}/director`, {
        params
    })
}

export const getByLabel = params => {
    return axios.get(`${base}/label`, {
        params
    })
}

export const getByScore = params => {
    return axios.get(`${base}/score`, {
        params
    })
}

export const getByEmotion = params => {
    return axios.get(`${base}/emotion`, {
        params
    })
}
