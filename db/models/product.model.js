const { DataTypes, Sequelize, Model } = require('sequelize');
const {CATEGORY_TABLE} = require("./category.model");

const PRODUCT_TABLE = 'Products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NUll'
  }
}

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = {
  PRODUCT_TABLE,
  ProductSchema,
  Product
}
