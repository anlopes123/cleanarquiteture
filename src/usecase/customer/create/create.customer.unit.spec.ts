import CustomerCreateUseCase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "Street",
        number: 123,
        zip: "zip",
        city: "city",
    },
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};


describe("Test unit create customer use case",  () => {

    it("Should create a customer", async() =>{
        const customerRepository = MockRepository();
        const cutomerCreateUseCase = new CustomerCreateUseCase(customerRepository);

        const output = await cutomerCreateUseCase.execute(input);
        expect(output).toEqual( {
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            },
        });

    });
});