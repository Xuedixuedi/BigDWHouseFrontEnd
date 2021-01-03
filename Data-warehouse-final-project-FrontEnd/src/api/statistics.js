import axios from "axios"
const base = "http://localhost:8004/statistics/"

export const getByTime = params => {
    return axios.get(`${base}/time`, {
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
