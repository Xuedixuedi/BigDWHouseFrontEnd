import axios from "axios"
const base = "http://localhost:8004/query/"

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
