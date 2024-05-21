import { Usecase } from "../Usecase";
import { IUserGeteway } from "../../Domain/Geteways/user.geteway";
import { User } from "../../Domain/Entity/user.entity";
export type createUserInputDto = {
  nome: string;
  email: string;
};
export type CreateUserOutputDto = {
  id: number;
  nome: string;
  email: string;
};

export class CreateUserUsecase implements Usecase<createUserInputDto, CreateUserOutputDto> {
  private constructor(private readonly userGeteway : IUserGeteway) {}

  public static create(userGeteway: IUserGeteway) {
      return new CreateUserUsecase(userGeteway);
  }

  public async execute({ nome, email }: createUserInputDto): Promise<CreateUserOutputDto> {
    const user = await User.create(nome, email);
    const createdUser = await this.userGeteway.save(user);
    if (!createdUser.id || !createdUser.email || !createdUser.nome) {
      throw new Error("Não foi possível criar o usuário");
    }
    return {
        id: createdUser.id ,
        nome: createdUser.nome, 
        email: createdUser.email,
    };
  }

}
