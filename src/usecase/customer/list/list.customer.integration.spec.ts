import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value_object/address";
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Test list a customer use case instegration", () =>{
    let sequelize: Sequelize;
    beforeEach(async ()=> {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},            
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async ()=>{
        await sequelize.close();
    });

    it("should list a customer in database", async() =>{
        const customerRepository = new CustomerRepository();
        const useCase = new ListCustomerUseCase(customerRepository);
        const customer1 = new Customer("1","Customer 1");
        const address1 = new Address("Street 1", 1, "zipcode 1", "City 1");
        customer1.changeAdrress(address1);
        await customerRepository.create(customer1);

        const customer2 = new Customer("2","Customer 2");
        const address2 = new Address("Street 2", 2, "zipcode 2", "City 2");
        customer2.changeAdrress(address2);
        await customerRepository.create(customer2);

     
        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);   
    })
})