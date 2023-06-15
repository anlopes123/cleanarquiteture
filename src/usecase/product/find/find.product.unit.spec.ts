import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

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

        const output = {
            id: "123",
            name: "Product 1",
            price: 20,
        }

        const result = await findProductUseCase.execute(input);
        expect(result).toEqual(output);
    });

    it("Should not find product", async() => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() =>{
            throw new Error("Customer not found");
        });
        const useCase = new FindProductUseCase(productRepository);
      
        const input = {
            id: "1"
        }
        expect(()=>{ 
            return useCase.execute(input);
        }).rejects.toThrow("Customer not found");

    });
});