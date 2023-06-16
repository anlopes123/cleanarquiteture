import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value_object/address";
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "../find/find.customer.usecase";
import UpdateCustomerUseCase from "./update.customer.usecase";




describe("Test update a customer use case integration", () => {
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

    
    it("should update a customer in a database", async() =>{
        const customerRepository = new CustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const customer1 = new Customer("1","Customer 1");
        const address1 = new Address("Street 1", 1, "zipcode 1", "City 1");
        customer1.changeAdrress(address1);
        await customerRepository.create(customer1);

        const input  = { 
            id: "1",
            name: "Customer update",
            address: {
                street: "Street update",
                number: 124,
                zip: "Zip update",
                city: "City update",            
            },
        }

        const result = await useCase.execute(input);

        const inputfind = {
           id: "1"
        }
        const findUseCase = new FindCustomerUseCase(customerRepository);
        const output = await findUseCase.execute(inputfind);

        expect(result).toEqual(output);
    })
})