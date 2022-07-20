'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('limits', [
      {
        sensor_name : 'Turbidity',
        min_limit:  50,
        max_limit:  50,
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        sensor_name : 'Temperatur',
        min_limit:  50,
        max_limit:  50,
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        sensor_name : 'pH',
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
