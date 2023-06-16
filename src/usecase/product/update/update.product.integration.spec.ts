import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";


describe("Test update a product use case integration", () => {
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

    
    it("should update a product in a database", async() =>{
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);
        const product = new Product("1", "Product 1", 30);
        
        await productRepository.create(product);


        const input  = { 
            id: "1",
            name: "Product update",
            price: 20,
        }      
     

        const output = await useCase.execute(input);

        expect(output.name).toEqual(input.name);
        expect(output.price).toEqual(input.price);
    })
})