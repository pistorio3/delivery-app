module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
   name: DataTypes.STRING(100),
   price: DataTypes.DOUBLE(4,2),
   url_image: DataTypes.STRING(200),
  },
  { timestamps: false,

  });


  return Product;
};