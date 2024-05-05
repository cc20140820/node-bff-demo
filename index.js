const http = require("http")
const { publicRequest } = require("./utils")
const {
  BASE_URL,
  BFF_PORT,
  ORDER_SERVER_PORT,
  USER_SERVER_PORT,
} = require("./constant")

const BFF = http.createServer((req, res) => {
  handleBFF(req, res)
})

BFF.listen(BFF_PORT, () => {
  console.log(`BFF Server is running at ${BFF_PORT} port`)
})

function handleBFF(req, res) {
  switch (req.url) {
    case "/order/add":
      addOrder(req, res)
      break
    default:
      res.end('{ code: 500, msg: "route not found", data: "" }')
      break
  }
}

// 处理添加订单方法
function addOrder(req, res) {
  if (req.method !== "POST") {
    res.end('{ code: 500, msg: "route not found", data: "" }')
    return
  }

  let data = ""
  req.on("data", (chunk) => {
    data += chunk
  })

  req.on("end", async () => {
    const orderResult = await publicRequest(
      `${BASE_URL}:${ORDER_SERVER_PORT}/order/add`,
      data
    )
    const dataResult = await publicRequest(
      `${BASE_URL}:${USER_SERVER_PORT}/data/add`,
      data
    )
    res.end(JSON.stringify({ orderResult, dataResult }))
  })
}
