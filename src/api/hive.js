import axios from "axios"
const base = "http://localhost:2468/hive2"

export const getReviewList = params => {
    return axios.get(`${base}/reviews/` + params)
}
