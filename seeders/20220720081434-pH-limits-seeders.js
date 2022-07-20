'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pH_limits', [
      {
        min_limit:  6,
        max_limit:  8.5,
        created_at : new Date(),
        updated_at : new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pH_limits', null, {});
  }
};
