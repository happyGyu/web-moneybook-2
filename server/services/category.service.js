import categoryModel from '../models/category.model';

export async function getAllCategories() {
  const categories = await categoryModel.findAll();
  return categories;
}
