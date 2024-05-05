const http = require("http")
const BFF = http.createServer((req, res) => {
  handleBFF(req, res)
})

BFF.listen(8080, () => {
  console.log("BFF Server is running at 8080 port")
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
      "http://localhost:8081/order/add",
      data
    )
    const dataResult = await publicRequest(
      "http://localhost:8082/data/add",
      data
    )
    res.end(JSON.stringify({ orderResult, dataResult }))
  })
}

// 公共请求方法
async function publicRequest(url, data) {
  return new Promise((resolve) => {
    const request = http.request(url, (response) => {
      let resData = ""
      response.on("data", (chunk) => {
        resData += chunk
      })
      response.on("end", () => {
        resolve(resData.toString())
      })
    })

    request.write(data)
    request.end()
  })
}
