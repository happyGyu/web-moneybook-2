import categoryService from '../services/category.service';

const categoryController = {
  async getAllCategories(req, res) {
    const categories = await categoryService.getAllCategories();

    res.status(200).json({
      statusCode: 200,
      data: categories,
    });
  },
};

export default categoryController;
