'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('limits', [
      {
        sensor_id : 1,
        min_limit:  50,
        max_limit:  50,
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        sensor_id : 2,
        min_limit:  50,
        max_limit:  50,
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        sensor_id : 3,
        min_limit:  6,
        max_limit:  8.5,
        created_at : new Date(),
        updated_at : new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('limits', null, {});
  }
};
