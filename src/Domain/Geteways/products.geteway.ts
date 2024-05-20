import { Product } from "../Entity/product.entity";

export interface IProductGeteway {
    save(product : Product): void;
    list() : Promise<Product[]>
}