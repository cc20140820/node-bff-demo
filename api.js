const axios = require("axios")
const { BASE_URL, ORDER_SERVER_PORT, USER_SERVER_PORT } = require("./constant")

const queryOrderInfo = (params) =>
  axios.get(`${BASE_URL}:${ORDER_SERVER_PORT}/order/${params.orderId}`)

const queryUserInfo = (params) =>
  axios.get(`${BASE_URL}:${USER_SERVER_PORT}/user/${params.userId}`)

module.exports = {
  queryOrderInfo,
  queryUserInfo,
}
