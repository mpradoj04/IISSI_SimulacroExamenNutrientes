import { Model } from 'sequelize'
const loadModel = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      const OrderProducts = sequelize.define('OrderProducts', {
        quantity: DataTypes.INTEGER,
        unityPrice: DataTypes.DOUBLE
      })

      Product.belongsTo(models.Restaurant, { foreignKey: 'restaurantId', as: 'restaurant', onDelete: 'cascade' })
      Product.belongsTo(models.ProductCategory, { foreignKey: 'productCategoryId', as: 'productCategory' })
      Product.belongsToMany(models.Order, { as: 'orders', through: OrderProducts })
    }

    getCalories () {
      return this.fats * 9 + this.proteins * 4 + this.carbohydrates * 4
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    image: DataTypes.STRING,
    order: DataTypes.INTEGER,
    availability: DataTypes.BOOLEAN,
    restaurantId: DataTypes.INTEGER,
    productCategoryId: DataTypes.INTEGER,
    fats: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    proteins: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    carbohydrates: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    calories: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getCalories()
      }
    }
  }, {
    sequelize,
    modelName: 'Product'
  })
  return Product
}
export default loadModel
