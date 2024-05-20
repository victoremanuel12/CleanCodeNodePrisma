import { Usecase } from "../Usecase";
import { IProductGeteway } from "../../Domain/Geteways/products.geteway";
import { Product } from "../../Domain/Entity/product.entity";
import {CreateProductPresenter } from "./presentrs/create-product-presenter"
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
  private constructor(private readonly productGateway : IProductGeteway) {}
  public static create(productGeteway: IProductGeteway) {
    return new CreateProductUsecase(productGeteway);
  }
  // essa classe nao sabe como criar um produto e sim a tentidade produto na camada de dominio, essa classe tbm não sabe como salvar dados, somente chama o metodo save
  public async execute({name, price}: createProductInputDto): Promise<CreateProductOutputDto> {
        const addProduct = Product.create(name, price);
        addProduct.increaseQuantity(19.99);
        await this.productGateway.save(addProduct);
        const output : CreateProductOutputDto = CreateProductPresenter.presentOutput(addProduct);
        return output;
  }
}
