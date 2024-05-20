import { Product } from "../../Domain/Entity/product.entity";
import { IProductGeteway } from "../../Domain/Geteways/products.geteway";
import { Usecase } from "../Usecase";

export type CreateProductInputDto = {
    name: string;
    price: number;
};

export type CreateProductOutputDto = {
    id: string;
};

export class CreateProductUsecase
    implements Usecase<CreateProductInputDto, CreateProductOutputDto>
{
    private constructor(private readonly productGateway: IProductGeteway) {}

    public static create(productGateway: IProductGeteway) {
        return new CreateProductUsecase(productGateway);
    }

    public async execute({
        name,
        price,
    }: CreateProductInputDto): Promise<CreateProductOutputDto> {
        const aProduct = Product.create(name, price);

        await this.productGateway.save(aProduct);

        const output = this.presentOutput(aProduct);

        return output;
    }

    private presentOutput(product: Product): CreateProductOutputDto {
        const output: CreateProductOutputDto = {
            id: product.id
        }

        return output;
    }
}
