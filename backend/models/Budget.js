const User = require('./User');
module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define('Budget', {
      email: {
        type: DataTypes.STRING,
        references: {
          model: {
            tableName: 'Users'
        },
          key: 'email'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    Budget.associate = (models) => {
      Budget.belongsTo(User, { foreignKey: 'email', as: 'email' });
  }
  return Budget;
  };