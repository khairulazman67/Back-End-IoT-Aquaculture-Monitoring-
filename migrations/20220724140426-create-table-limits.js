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
      sensor_id:{
        type : Sequelize.INTEGER,
        allowNull:false
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
    await queryInterface.addConstraint('limits',{
      type : 'foreign key',
      name : 'LIMITS_SENSOR_ID',
      fields : ['sensor_id'],
      references : {
        table:'sensors',
        field:'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('limits');
  }
};
