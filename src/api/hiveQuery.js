import axios from "axios"
const base = "http://100.64.218.50:10699/query/hive"

export const hgetByTitle = params => {
    return axios.get(`${base}/title`, {
        params
    })
}

export const hgetByActor = params => {
    return axios.get(`${base}/actor`, {
        params
    })
}

export const hgetByDirector = params => {
    return axios.get(`${base}/director`, {
        params
    })
}

export const hgetByLabel = params => {
    return axios.get(`${base}/label`, {
        params
    })
}

export const hgetByScore = params => {
    return axios.get(`${base}/score`, {
        params
    })
}

export const getByEmotion = params => {
    return axios.get(`${base}/emotion`, {
        params
    })
}
