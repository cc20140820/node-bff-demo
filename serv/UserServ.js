// 数据服务

const http = require("http")
const { USER_SERVER_PORT } = require("../constant")

function handleDataInput(req, res) {
  switch (req.url) {
    case "/data/add":
      res.end('{ code: 200, msg: "success", data: "" }')
      break
    default:
      res.end('{ code: 500, msg: "route not found", data: "" }')
      break
  }
}

const dataApp = http.createServer((req, res) => {
  handleDataInput(req, res)
})

dataApp.listen(USER_SERVER_PORT, () => {
  console.log(`Data Server is running at ${USER_SERVER_PORT} port`)
})
