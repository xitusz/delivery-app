module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,  
  }, { 
    timestamps: false,
    underscored: true,
    tableName: 'users', 
  });

  User.associate = (models) => {
    User.hasMany(models.Sale,
      { foreignKey: 'userId', as: 'orders' });
    User.hasMany(models.Sale,
      { foreignKey: 'sellerId', as: 'sales' });
  };

  return User;
};