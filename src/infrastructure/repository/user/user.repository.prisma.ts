import { PrismaClient } from '@prisma/client';
import { IUserGeteway } from '../../../Domain/Geteways/user.geteway';
import { User } from '../../../Domain/Entity/user.entity';
export class UserRepositoryPrisma implements IUserGeteway {
    private constructor(private readonly prismaClient : PrismaClient) {}
  
    public static create(prismaClient : PrismaClient){
        return new UserRepositoryPrisma(prismaClient);
    }
  
    public async save(user: User): Promise<User> {
        const createdUser = await this.prismaClient.usuarios.create({
            data: {
                nome: user.nome,
                email: user.email,
            },
        });
        return User.with({
            id: createdUser.id,
            nome: createdUser.nome,
            email: createdUser.email,
        });
    }
    
    public async list(): Promise<User[]> {
        const users = await this.prismaClient.usuarios.findMany();
        const usersList = users.map(user => {
            return User.with({
                id: user.id,
                nome: user.nome,
                email: user.email,
            });
        });
        return usersList;
    }
}