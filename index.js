const express = require("express")
const { BFF_PORT } = require("./constant")
const { queryOrderInfo, queryUserInfo } = require("./api")

const app = express()
app.get("/queryInfo", async (req, res) => {
  const userId = req.query.userId
  const orderId = req.query.orderId

  const [orderInfo, userInfo] = await Promise.all([
    queryOrderInfo({ orderId }),
    queryUserInfo({ userId }),
  ])

  const resInfo =
    orderInfo.data.success && userInfo.data.success
      ? { ...orderInfo.data.data, ...userInfo.data.data }
      : null

  if (resInfo) {
    res.json({
      success: true,
      data: resInfo,
    })
  } else {
    res.status(404).send("Info not found")
  }
})

app.listen(BFF_PORT, () => {
  console.log(`BFF Server is running at ${BFF_PORT} port`)
})
