import { Usecase } from "../Usecase";
import { ProductGeteway } from "../../Domain/Geteways/products.geteway";
import { Product } from "../../Domain/Entity/product.entity";
export type createProductInputDto = {
  name: string;
  price: number;
};
export type CreateProductOutputDto = {
  id: string;
};

export class CreateProductUsecase
  implements Usecase<createProductInputDto, CreateProductOutputDto>
{
  private constructor(private readonly productGateway : ProductGeteway) {}
  public static create(productGeteway: ProductGeteway) {
    return new CreateProductUsecase(productGeteway);
  }
  public async execute({name, price}: createProductInputDto): Promise<CreateProductOutputDto> {
        const addProduct = Product.create(name, price);
        await this.productGateway.save(addProduct);
        const output : CreateProductOutputDto = {
            id: addProduct.id
        }
        return output;
  }
}
