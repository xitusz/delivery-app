module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SalesProducts', {
    quantity: DataTypes.INTEGER,
  }, { 
    timestamps: false,
    underscored: true,
    tableName: 'salesProducts', 
  });
  
  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return SaleProduct;
}; 
