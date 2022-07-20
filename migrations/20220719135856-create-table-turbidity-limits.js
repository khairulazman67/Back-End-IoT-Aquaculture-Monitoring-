'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('turbidity_limits', {
      id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false,
      },
      min_limit:{
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
    await queryInterface.dropTable('turbidity_limits');
  }
};
