import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value_object/address";
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("1","Customer 1");
const address = new Address("Street 1", 1, "zipcode 1", "City 1");
customer.changeAdrress(address);


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Test find customer use case", () =>{
   
    it("should find a customer", async() =>{
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);
        const customer = new Customer("1","Customer 1");
        const address = new Address("Street 1", 1, "zipcode 1", "City 1");
        customer.changeAdrress(address);
        await customerRepository.create(customer);

        const input = {
            id: "1"
        }

        const output = {
            id: "1", 
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zip: "zipcode 1", 
                city: "City 1",
            }
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    })
})