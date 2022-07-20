'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('turbidity_limits', [
      {
        min_limit:  50,
        created_at : new Date(),
        updated_at : new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('turbidity_limits', null, {});
  }
};
