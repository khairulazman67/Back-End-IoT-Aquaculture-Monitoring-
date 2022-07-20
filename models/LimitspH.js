module.exports = (sequelize, DataTypes) => {
    const LimitspH = sequelize.define('LimitspH', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        tableName: 'pH_limits',
        timestamps: true
    });
    return LimitspH;
}