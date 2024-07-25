import { Response, Request } from "express";
import * as z from "zod";
import { productService } from "../services";

class ProductController {
  async create(request: Request, response: Response) {
    const productSchema = z.object({
      name: z.string(),
      stock: z.number(),
      forecast: z.date(),
      published: z.boolean(),
      active: z.boolean(),
      price: z.number(),
    });

    const product = productSchema.parse(request.body);

    try {
      const res = await productService.create(product);
      return response.status(201).send(res);
    } catch (error) {
      return response.status(500).send({
        error: "Registrer error",
        message: error,
      });
    }
  }

  async listProducts(request: Request, response: Response) {
    try {
      let product = await productService.findAll();
      return response.status(200).send({ product });
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }

  async updateProduct(request: Request, response: Response) {
    try {
    const productSchema = z.object({
      name: z.string(),
      stock: z.number(),
      forecast: z.date(),
      published: z.boolean(),
      active: z.boolean(),
      price: z.number(),
    });

      const product = productSchema.parse(request.body);

      let productUpdated = await productService.updateProduct(product);

      return response.status(200).send({ productUpdated });
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }

  async findProductById(request: Request, response: Response) {
    try {
      const paramsSchema = z.string()
      const id = paramsSchema.parse(request.params.id)
      const product = await productService.findProductById(id);
      return response.status(200).send({ product });
    } catch (e) {
      return response.status(401).send({ error: e });
    }
  }
}

export const productController = new ProductController()
