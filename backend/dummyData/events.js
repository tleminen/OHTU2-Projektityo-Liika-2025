module.exports = {
    up: async (queryInterface, Sequelize) => {
        //Fetch UserIDs
        const users = await queryInterface.sequelize.query(
            'SELECT ID FROM Users;',
            {type: queryInterface.sequelize.QueryTypes.SELECT}
        );
        //Fetch EventID's 
        const events = await queryInterface.sequelize.query(
              'SELECT ID FROM Events;',
              {type: queryInterface.sequelize.QueryTypes.SELECT}
        );
        //Fetch CategoryID's
        const categories = await queryInterface.sequelize.query(
            'SELECT ID FROM Categories;',
            {type: queryInterface.sequelize.QueryTypes.SELECT}
        );
        await queryInterface.bulkInsert('Events', [
            { 
                Location: Sequelize.fn('ST_GeomFromtext', 'POINT(62.6000 29.7639)'),
                Status:('Basic'),
                Title:('Jalkapallo'),
                UserID: users[0].ID,
                CategoryID: category[0].ID,
                createdAt: new Date(),
                updatedAt: new Date()   
            },
            {
                Location: Sequelize.fn('ST_GeomFromText','Point(60.1699 24.9384)'),
                Status:('Basic'),
                Title:('Sulkapallo'),
                UserID: users[1].ID,
                CategoryID: category[2].ID,
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                Location: ('ST_GeomFromText', 'POINT(62.6000 29.7599)'),
                Status: ('Basic'),
                Title:('Tennis'),
                UserID: users[2].ID,
                CategoryID: category[3].ID,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]); 
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Events', null,{});
    }
};