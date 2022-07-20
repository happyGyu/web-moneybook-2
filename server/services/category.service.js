const categoryModel = require('../models/category.model');

async function getAllCategories() {
  const categories = await categoryModel.findAll();
  return categories;
}

module.exports = {
  getAllCategories,
};
