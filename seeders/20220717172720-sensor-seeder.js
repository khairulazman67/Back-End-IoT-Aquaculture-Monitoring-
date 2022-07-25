'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sensors', [
      {
        name : 'Turbidity',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        name : 'Temperatur',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        name : 'pH',
        created_at : new Date(),
        updated_at : new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sensors', null, {});
  }
};
