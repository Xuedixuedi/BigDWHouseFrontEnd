import axios from "axios"
const base = "http://localhost:8004/relationships"

export const getActorByDirector = params => {
    return axios.get(`${base}/director-actor`, {
        params
    })
}

export const getActorByActor = params => {
    return axios.get(`${base}/actor-actor`, {
        params
    })
}

export const getDirectorByDirector = params => {
    return axios.get(`${base}/director-director`, {
        params
    })
}

export const getDirectorByActor = params => {
    return axios.get(`${base}/actor-director`, {
        params
    })
}
