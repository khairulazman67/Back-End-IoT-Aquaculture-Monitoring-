'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('feeding_times', {
        id: {
          type : Sequelize.INTEGER,
          autoIncrement : true,
          primaryKey : true,
          allowNull : false,
        },
        name:{
          type : Sequelize.STRING,
          allowNull : false
        },
        time:{
          type : Sequelize.TIME,
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
    await queryInterface.dropTable('feeding_times');
  }
};
