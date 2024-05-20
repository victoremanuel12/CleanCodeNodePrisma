import { CreateProductOutputDto } from '../create-product.usecase';
import { Product } from "../../../Domain/Entity/product.entity";

export class CreateProductPresenter {
    public static  presentOutput(product : Product) : CreateProductOutputDto {
        return { 
            id : product.id, 
        };
    }
}