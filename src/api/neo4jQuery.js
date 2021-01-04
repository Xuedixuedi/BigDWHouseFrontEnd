import axios from "axios"
const base = "http://100.64.218.50:10684/query/neo4j"

export const ngetByTitle = params => {
    return axios.get(`${base}/title`, {
        params
    })
}

export const ngetByActor = params => {
    return axios.get(`${base}/actor`, {
        params
    })
}

export const ngetByDirector = params => {
    return axios.get(`${base}/director`, {
        params
    })
}

export const ngetByLabel = params => {
    return axios.get(`${base}/label`, {
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
