'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
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
      value:{
        type : Sequelize.DOUBLE,
        allowNull : false
      },
      pool:{
        type :Sequelize.INTEGER,
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
    await queryInterface.addConstraint('reports',{
      type : 'foreign key',
      name : 'REPORTS_SENSOR_ID',
      fields : ['sensor_id'],
      references : {
        table:'sensors',
        field:'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reports');
  }
};
