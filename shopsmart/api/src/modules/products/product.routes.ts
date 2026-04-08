import { FastifyInstance } from 'fastify';
import { ProductService } from './product.service';
import { ProductQueryParams, CreateProductInput, UpdateProductInput } from './product.types';
import { createProductSchema, updateProductSchema, getProductsSchema, getProductByIdSchema } from './product.schema';

export async function productRoutes(fastify: FastifyInstance) {
  const productService = new ProductService(fastify.db);

  fastify.get('/', { schema: getProductsSchema }, async (request, reply) => {
    const params = request.query as ProductQueryParams;
    const result = await productService.getProducts(params);
    return result;
  });

  fastify.get('/:id', { schema: getProductByIdSchema }, async (request, reply) => {
    const { id } = request.params as { id: number };
    const product = await productService.getProductById(id);
    return product;
  });

  fastify.post('/', { schema: createProductSchema }, async (request, reply) => {
    const input = request.body as CreateProductInput;
    const product = await productService.createProduct(input);
    reply.code(201);
    return product;
  });

  fastify.put('/:id', { schema: updateProductSchema }, async (request, reply) => {
    const { id } = request.params as { id: number };
    const input = request.body as UpdateProductInput;
    const product = await productService.updateProduct(id, input);
    return product;
  });

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    await productService.deleteProduct(id);
    reply.code(204);
  });
}
