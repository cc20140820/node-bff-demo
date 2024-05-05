// 订单服务
const http = require("http")
const { ORDER_SERVER_PORT } = require("../constant")

function handleOrderInput(req, res) {
  switch (req.url) {
    case "/order/add":
      res.end('{ code: 200, msg: "success", data: "" }')
      break
    default:
      res.end('{ code: 500, msg: "route not found", data: "" }')
      break
  }
}

const orderApp = http.createServer((req, res) => {
  handleOrderInput(req, res)
})

orderApp.listen(ORDER_SERVER_PORT, () => {
  console.log(`Order Server is running at ${ORDER_SERVER_PORT} port`)
})
