import axios from "axios"
const base = "http://localhost:8004/relationships"

export const getActorByDirector = params => {
    return axios.get(`${base}/director-actor`, {
        params
    })
}
