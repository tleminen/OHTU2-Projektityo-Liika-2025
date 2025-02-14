module.exports = {
    up: (queryInterface, Sequelize) =>{
        return queryInterface.bulkInsert('Language', [
            {
                Language: 'FI',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                Language: 'EN',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                Language: 'SE',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },
    
    down: (queryInterface, Sequelize) =>{
        return queryInterface.bulkDelete('Language', null, {});
    }
};
