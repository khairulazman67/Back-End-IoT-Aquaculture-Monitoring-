'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Khairul Azman',
        email: 'azman@gmail.com',
        password : await bcrypt.hash('azman123',10),
        created_at : new Date(),
        updated_at : new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
