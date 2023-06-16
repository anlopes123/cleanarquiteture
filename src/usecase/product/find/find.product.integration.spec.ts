import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product use case integration", () =>{
    let sequelize: Sequelize;
    beforeEach(async ()=> {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},            
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async ()=>{
        await sequelize.close();
    });

    it("should find a product in a database", async() =>{
        const productRepository = new ProductRepository();
        const useCase = new FindProductUseCase(productRepository);
        const product = new Product("1","Product 1", 20);
        await productRepository.create(product);

        const input = {
            id: "1"
        }

        const output = {
            id: "1", 
            name: "Product 1",
            price: 20,
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    })
})