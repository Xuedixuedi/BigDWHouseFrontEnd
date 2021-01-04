import axios from "axios"
const base = "http://100.64.218.50:10684/statistics/mysql"

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

export const statisticsByScore = () => {
    return axios.get(`${base}/score-all`)
}

export const statisticsByEmotion = () => {
    return axios.get(`${base}/emotion-all`)
}

export const statisticsByDirector = params => {
    return axios.get(`${base}/director-all`, {
        params
    })
}

export const statisticsByActor = params => {
    return axios.get(`${base}/actor-all`, {
        params
    })
}

export const statisticsByLabel = params => {
    return axios.get(`${base}/label-all`, {
        params
    })
}
