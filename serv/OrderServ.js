// 订单服务
const express = require("express")
const { ORDER_SERVER_PORT } = require("../constant")

const DATA_MAP = [
  { productId: "1", productName: "weed", price: 200 },
  { productId: "2", productName: "gun", price: 600 },
]

const app = express()
app.get("/order/:id", (req, res) => {
  const id = req.params.id
  const item = DATA_MAP.find((v) => v.productId === id)
  if (item) {
    res.json({
      success: true,
      data: item,
      errorMessage: "",
    })
  } else {
    res.status(404).send("Info not found")
  }
})

app.listen(ORDER_SERVER_PORT, () => {
  console.log(`Order Server is running at ${ORDER_SERVER_PORT} port`)
})
