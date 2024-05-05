const http = require("http")

// 公共请求方法
function publicRequest(url, data) {
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

module.exports = {
  publicRequest,
}
