module.exports = {
    
    up: async (queryInterface, Sequelize) =>{
        //Fetch ClubID's and UserID's
        const clubs = await queryInterface.sequelize.query(
            'SELECT ID FROM Clubs;',
            {type: queryInterface.sequelize.QueryTypes.SELECT}
        );
        const users = await queryInterface.sequelize.query(
            'SELECT ID FROM Users;',
            {type: queryInterface.sequelize.QueryTypes.SELECT}
        );
        return queryInterface.bulkInsert('clubMember', [
            {
                ClubId: clubs[0].ID,
                UserId: users[0].ID,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                ClubId: clubs[1].ID,
                UserId: users[1].ID,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                ClubId: clubs[2].ID,
                UserId: users[2].ID,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                ClubId: clubs[3].ID,
                UserId: users[3].ID,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },
    down: async (queryInterface, Sequelize) =>{
        return queryInterface.bulkDelete('clubMember', null, {});
    }
};