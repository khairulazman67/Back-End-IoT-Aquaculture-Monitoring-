'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('temp_limits', [
      {
        min_limit:  50,
        max_limit:  50,
        created_at : new Date(),
        updated_at : new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('temp_limits', null, {});
  }
};
