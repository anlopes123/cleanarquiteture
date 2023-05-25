import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value_object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("Street", 123, "Zip", "City")
);

const input = {
    id: customer.id, 
    name: "John Updated",
    address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated",
    },
}

const MockRepository = () =>{
    return {
        create: jest.fn(), 
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    }
}

describe("Unit test for customer update use case", () =>{
    it("should update a customer", async()=>{
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("Should thrown an error when name is missing ", async()=> {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        input.name = "";
        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("Should thrown an error when street is missing ", async()=> {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        input.name = "Johna update";
        input.address.street = "";

        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Street is required");
    });
})