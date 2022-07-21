import categoryModel from '../models/category.model';

const categoryService = {
  async getAllCategories() {
    const categories = await categoryModel.findAll();
    return categories;
  },
};

export default categoryService;
