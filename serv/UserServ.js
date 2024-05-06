// 用户服务
const express = require("express")
const { USER_SERVER_PORT } = require("../constant")

const USER_MAP = [
  { userId: "11111", userName: "Harry Potter", age: 18 },
  { userId: "11112", userName: "Hermione Granger", age: 16 },
]

const app = express()
app.get("/user/:id", (req, res) => {
  const id = req.params.id
  const user = USER_MAP.find((v) => v.userId === id)
  if (user) {
    res.json({
      success: true,
      data: user,
      errorMessage: "",
    })
  } else {
    res.status(404).send("Info not found")
  }
})

app.listen(USER_SERVER_PORT, () => {
  console.log(`User Server is running at ${USER_SERVER_PORT} port`)
})
