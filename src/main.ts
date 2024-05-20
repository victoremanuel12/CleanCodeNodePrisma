import { ApiExpress } from "./infrastructure/api/express/api.express";
import { CreateProductRoute } from "./infrastructure/api/express/routes/product/create-product-express-routes";
import { ListProductRoute } from "./infrastructure/api/express/routes/product/list-product-express-routes";
import { ProductRepositoryPrisma } from "./infrastructure/repository/product/product.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUsecase } from "./UsesCases/product/create-product.usecase";
import { ListProductUsecase } from "./UsesCases/product/list-product.usecase";

function main() {

    const aRepository = ProductRepositoryPrisma.create(prisma);

    const createProductUsecase = CreateProductUsecase.create(aRepository);
    const listProductUsecase = ListProductUsecase.create(aRepository);

    const createRoute = CreateProductRoute.create(createProductUsecase);
    const listRoute = ListProductRoute.create(listProductUsecase);

    const api = ApiExpress.create([createRoute, listRoute]);
    const port = 8000;
    api.start(port);
}

main();