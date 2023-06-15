import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create a product use case", () => {
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

    
    it("should find a customer", async() =>{
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const input  = { 
            id: "1",
            name: "Product 1",
            price: 20,
        }
        
        const output = {
            id: expect.any(String),
            name: "Product 1",
            price: 20,
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    })
})