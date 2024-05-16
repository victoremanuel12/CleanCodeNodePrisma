import { Product } from "../Entity/product.entity";

export interface ProductGeteway {
    save(product : Product): void;
    list() : Promise<Product>
}