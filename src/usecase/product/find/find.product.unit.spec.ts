import Product from "../../../domain/product/entity/product";

const product = new Product('123', 'Product 1', 20);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Test unit find product Use Case ", ()=>{
    it("should a find product", async() => {
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "123"
        }
    });
});