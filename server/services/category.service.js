import categoryModel from '../models/category.model';

const categoryService = {
  async getAllCategories() {
    const categories = await categoryModel.findAll({
      attributes: ['id', 'title', 'color'],
    });
    return categories;
  },
};

export default categoryService;
