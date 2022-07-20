'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('feeding_times', [
      {
        name: 'Pagi',
        time:  '08:00',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        name: 'Siang',
        time:  '12:00',
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        name: 'Malam',
        time:  '20:00',
        created_at : new Date(),
        updated_at : new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('feeding_times', null, {});
  }
};
