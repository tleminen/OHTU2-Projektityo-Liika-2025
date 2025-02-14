const Category = require("../models/category");
module.exports = {
    up: async (queryInterface, Sequelize) =>{
        return queryInterface.bulkInsert('Category', [
            {
                Category: ('Jalkapallo'),
            },
            {
                Category: ('Jääkiekko')
            },
            {
                Category: ('Sulkapallo'),
            },
            {
                Category: ('Tennis'),
            },
            {
                Category: ('Koripallo'),
            },
            {
                Category: ('Hiihto'),
            },
            {
                Category: ('Luistelu'),
            },
            {
                Category: ('Uinti'),
            },
            {
                Category: ('Kuntosali'),
            },
            {
                Category: ('Yleisurheilu'),
            },
            {
                Category: ('Ratsastus'),
            },
            {
                Category: ('Golf'),
            },
            {
                Category: ('Baletti')
            },
            ]);
        },
    
    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Category', null,{});
    }
};
