import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 10,
};

const MockRepository = () => {
    return  {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Test unit create product use case", () => {

    it("Should create a product", async() => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const output = await createProductUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });

    });

    it("Should throw erros with product name is null", async() =>{
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        input.name = ""
        await expect(createProductUseCase.execute(input)).rejects.toThrow("Name is required");
    });


    it("Should throw erros with product price must be grater than zero", async() =>{
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);
        input.name = "Product 1";
        input.price = -1;
        
        await expect(createProductUseCase.execute(input)).rejects.toThrow("Price must be grater than zero");
    });


});