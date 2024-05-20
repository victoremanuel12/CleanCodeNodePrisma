import { PrismaClient } from '@prisma/client';
import { Product } from '../../../Domain/Entity/product.entity';
import { IProductGeteway } from '../../../Domain/Geteways/products.geteway';
export class ProductRepositoryPrisma implements  IProductGeteway{
    private constructor( private readonly prismaClient : PrismaClient) {}
    public static create(prismaClient : PrismaClient){
        return new ProductRepositoryPrisma(prismaClient);
    }
   public save(product: Product): void {
        const data  = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        }
        this.prismaClient.product.create({data});
    }
    public async list(): Promise<Product[]> {
        const products = await this.prismaClient.product.findMany();
        const productList = products.map(product =>{
            return Product.with({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity
            });
        })
        return productList;
    }

}