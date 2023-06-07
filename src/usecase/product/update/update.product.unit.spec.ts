import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.createProduct('Product 1', 20);


const input = {
    id: product.id,
    name: "Product updated",
    price: 30,
};

const MockRepository = () => {
    return {
        create: jest.fn(), 
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    }
};

describe("Unit test for a product update use case", () => {
    it("Should update product", async() =>{
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    });

    it("Should thrown an error when name is missing ", async()=> {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        input.name = "";
        await expect(productUpdateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("Should throw erros with product price must be grater than zero", async() =>{
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);
        input.name = "Product 1";
        input.price = -1;
        
        await expect(updateProductUseCase.execute(input)).rejects.toThrow("Price must be grater than zero");
    });


});