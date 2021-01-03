import axios from "axios"
const base = "http://100.64.218.50:10684/statistics/neo4j"

export const ngetByTime = params => {
    return axios.get(`${base}/time`, {
        params
    })
}

export const ngetByScore = params => {
    return axios.get(`${base}/score`, {
        params
    })
}

export const ngetByEmotion = params => {
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
