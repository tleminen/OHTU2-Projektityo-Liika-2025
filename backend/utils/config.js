require("dotenv").config()

let PORT = process.env.PORT || 3000
let POSTGRESQL_URI =
  process.env.NODE_ENV === "dev"
    ? process.env.TEST_POSTGRESQL_URI
    : process.env.POSTGRESQL_URI

module.exports = {
  POSTGRESQL_URI,
  PORT,
}
