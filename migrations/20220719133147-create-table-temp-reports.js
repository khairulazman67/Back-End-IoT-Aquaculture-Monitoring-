'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('temp_reports', {
      id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false,
      },
      temperature:{
        type : Sequelize.DOUBLE,
        allowNull : false
      },
      created_at:{
        type : Sequelize.DATE,
        allowNull : false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('temp_reports');
  }
};
