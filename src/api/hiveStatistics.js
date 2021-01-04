import axios from "axios"
const base = "http://100.64.218.50:10699/statistics/hive"

export const hgetByTime = params => {
    return axios.get(`${base}/time`, {
        params
    })
}
