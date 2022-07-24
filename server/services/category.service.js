import categoryModel from '../models/category.model';

const categoryService = {
  async findByTitle(title) {
    const category = await categoryModel.findOneBy({
      where: {
        title,
      },
    });
    return category;
  },
  async findById(categoryId) {
    const category = await categoryModel.findOneBy({
      where: {
        id: categoryId,
      },
    });
    return category;
  },
  async getAllCategories() {
    const categories = await categoryModel.findAll({
      attributes: ['id', 'title', 'color'],
    });
    return categories;
  },
};

export default categoryService;
