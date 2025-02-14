const User = require("../models").User
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        UserID: 1,
        Role: 1,
        Password:
          "$2a$10$mleAjfFk8UBYg0xHy78kF.0gyRvCuVC7/zetWcNVxTgIj2Scc/H/O",
        Location: Sequelize.fn("ST_GeomFromText", "POINT(62.6000 29.7639)"),
        Email: "minervalliko@sapo.fi",
        Username: "kayttaja",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserID: 4,
        Role: 1,
        Password:
          "$2a$10$VBD3qEwY9bHlvvm6PZZC3Oa2/ui/CmA..Y.Ir9JrEiD8jUVVi9n9W",
        Location: Sequelize.fn("ST_GeomFromText", "POINT(60.1699 24.9384)"),
        Email: "jorijokine@sapo.fi",
        Username: "kayttaja8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {})
  }, // $2a$10$ICHltJfk0a9u0QWWqz2WNOFYzf28tQKQ/zjKj30pnKq93GbGdMRl.
}
