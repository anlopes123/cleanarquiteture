import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value_object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("Street", 123, "Zip", "City")
);

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
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("Should thrown an error when name is missing ", async()=> {
        
        const input = {
            id: customer.id, 
            name: "",
            address: {
                street: "Street Updated",
                number: 1234,
                zip: "Zip Updated",
                city: "City Updated",
            },
        }
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        
        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("customer: Name is required");
        
    });

    it("Should thrown an error when street is missing ", async()=> {
        customer.clearErrors();        

        const input = {
            id: customer.id, 
            name: "John Updated",
            address: {
                street: "",
                number: 1234,
                zip: "Zip Updated",
                city: "City Updated",
            },
        }
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
       
        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Street is required");
    });})