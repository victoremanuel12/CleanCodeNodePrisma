import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../../routes";
import { createUserInputDto, CreateUserUsecase } from "../../../../../UsesCases/user/create-user.usecase";


export type CreateUserResponseDto = {
    id: number;
    nome: string;
    email: string;
};

export class CreateUserRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUsecase
    ) {}

    public static create(createUserService: CreateUserUsecase) {
        return new CreateUserRoute(
            "/user",
            HttpMethod.POST,
            createUserService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { nome, email } = request.body;

            const input: createUserInputDto = {
                nome,
                email
            };

            const output: CreateUserResponseDto =
                await this.createUserService.execute(input);

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

    private present(input: CreateUserResponseDto): CreateUserResponseDto {
        return { id: input.id, nome: input.nome, email: input.email};
        
    }
}
