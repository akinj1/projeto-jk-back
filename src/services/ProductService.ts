import { prisma } from "../database";
import { Product } from "../models";

class ProductService {
  async create(products: Product) {
    try {
      let res = await prisma.products.create({
        data: {
          name: products.name,
          stock: products.stock,
          forecast: products.forecast,
          published: products.published,
          active: products.active,
          price: products.price,
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async findProductById(id: string) {
    let product = await prisma.products.findUnique({
      where: { id: id },
      include: { clients: true },
    });
    if (!product?.id) {
      throw { error: "user not found" };
    }
    return product;
  }

  async findAll() {
    let productDB = await prisma.products.findMany({
      include: { clients: true },
    });
    return productDB;
  }

  async updateProduct(product: Product) {
    let productDB = await prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        name: product.name,
        active: product.active,
        forecast: product.forecast,
        price: product.price,
        stock: product.stock,
      },
    });
    return productDB;
  }
}

export const productService = new ProductService();
