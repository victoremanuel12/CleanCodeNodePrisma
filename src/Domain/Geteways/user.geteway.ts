import { User } from "../Entity/user.entity";


export interface IUserGeteway {
    save(user : User): Promise<User>;
    list() : Promise<User[]>
}