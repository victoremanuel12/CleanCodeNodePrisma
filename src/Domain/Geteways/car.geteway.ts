import { Car } from "../Entity/car.entity";


export interface ICarGeteway {
    save(product : Car): void;
    list() : Promise<Car[]>
}