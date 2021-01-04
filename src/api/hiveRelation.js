import axios from "axios"
const base = "http://100.64.218.50:10699/relationships/hive"

export const hgetActorByDirector = params => {
    return axios.get(`${base}/director-actor`, {
        params
    })
}

export const hgetActorByActor = params => {
    return axios.get(`${base}/actor-actor`, {
        params
    })
}

export const hgetDirectorByDirector = params => {
    return axios.get(`${base}/director-director`, {
        params
    })
}

export const hgetDirectorByActor = params => {
    return axios.get(`${base}/actor-director`, {
        params
    })
}
