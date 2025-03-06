require("dotenv").config()

let PORT = 3003
let POSTGRESQL_URI =
  process.env.NODE_ENV === "dev"
    ? process.env.TEST_POSTGRESQL_URI
    : process.env.POSTGRESQL_URI

module.exports = {
  POSTGRESQL_URI,
  PORT,
}
