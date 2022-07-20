module.exports = (sequelize, DataTypes) => {
    const FeedingTimes = sequelize.define('feeding_times', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        max_limit: {
            type: DataTypes.TIME,
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
        tableName: 'feeding_times',
        timestamps: true
    });
    return FeedingTimes;
}