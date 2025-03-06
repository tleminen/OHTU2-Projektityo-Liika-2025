const app = require("./app")
const config = require("./utils/config")
const path = require("path")
app.use(express.static(path.join(__dirname, "public")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(config.PORT, () => {
  console.log(`Serveri on käynnissä portissa ${config.PORT}`)
})
