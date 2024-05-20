import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../../routes";
import { CreateProductInputDto, CreateProductUsecase } from "../../../../../UsesCases/product/create-product.usecase";


export type CreateProductResponseDto = {
    id: string;
};

export class CreateProductRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createProductService: CreateProductUsecase
    ) {}

    public static create(createProductService: CreateProductUsecase) {
        return new CreateProductRoute(
            "/products",
            HttpMethod.POST,
            createProductService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { name, price } = request.body;

            const input: CreateProductInputDto = {
                name,
                price,
            };

            const output: CreateProductResponseDto =
                await this.createProductService.execute(input);

            const responseBody = this.present(output);

            response.status(201).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateProductResponseDto): CreateProductResponseDto {
        const response = { id: input.id };
        return response;
    }
}
