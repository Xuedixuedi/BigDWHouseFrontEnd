import axios from "axios"
const base = "http://localhost:8004/query/"

export const getByTitle = params => {
    return axios.get(`${base}`, {
        params
    })
}
