import { ApiExpress } from "./infrastructure/api/express/api.express";
import { CreateProductRoute } from "./infrastructure/api/express/routes/product/create-product-express-routes";
import { ListProductRoute } from "./infrastructure/api/express/routes/product/list-product-express-routes";
import { CreateUserRoute } from "./infrastructure/api/express/routes/user/create-user-express-routes";
import { ProductRepositoryPrisma } from "./infrastructure/repository/product/product.repository.prisma";
import { UserRepositoryPrisma } from "./infrastructure/repository/user/user.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUsecase } from "./UsesCases/product/create-product.usecase";
import { ListProductUsecase } from "./UsesCases/product/list-product.usecase";
import { CreateUserUsecase } from "./UsesCases/user/create-user.usecase";

function main() {

    const productRepository = ProductRepositoryPrisma.create(prisma);

    const createProductUsecase = CreateProductUsecase.create(productRepository);
    const listProductUsecase = ListProductUsecase.create(productRepository);

    const createProductRoute = CreateProductRoute.create(createProductUsecase);
    const listProductRoute = ListProductRoute.create(listProductUsecase);

    const UserRepository = UserRepositoryPrisma.create(prisma);

    const createUserUserCase = CreateUserUsecase.create(UserRepository);

    const createUserRoute = CreateUserRoute.create(createUserUserCase);

    const api = ApiExpress.create([createProductRoute, listProductRoute,createUserRoute]);
    const port = 8000;
    api.start(port);
}

main();