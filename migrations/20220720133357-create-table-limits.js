'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('limits', {
      id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false,
      },
      sensor_name:{
        type : Sequelize.STRING,
        allowNull : false
      },
      min_limit:{
        type : Sequelize.DOUBLE,
        allowNull : false
      },
      max_limit:{
        type : Sequelize.DOUBLE,
        allowNull : false
      },
      created_at:{
        type : Sequelize.DATE,
        allowNull : false
      },
      updated_at:{
        type : Sequelize.DATE,
        allowNull : false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('limits');
  }
};
