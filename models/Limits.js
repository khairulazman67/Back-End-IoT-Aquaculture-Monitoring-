module.exports = (sequelize, DataTypes) => {
    const Limits = sequelize.define('Limits', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        sensor_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        min_limit: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        max_limit: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'limits',
        timestamps: true
    });
    return Limits;
}