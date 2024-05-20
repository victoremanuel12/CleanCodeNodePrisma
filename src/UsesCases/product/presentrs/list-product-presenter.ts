import { Product } from "../../../Domain/Entity/product.entity";
import { ListProductOutputDto} from "../list-product.usecase";

export class ListProductPresenter {
    public static  presentOutput(products : Product[]) : ListProductOutputDto {
        return { 
            products : products.map((p) => {
                return {
                    id: p.id,
                    name:p.name,
                    price:p.price,
                    quantity:p.quantity
                };
            }),
        };
    }
}