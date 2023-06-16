import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/customer.repository";
import CustomerCreateUseCase from "./create.customer.usecase";




describe("Test create a customer use case integration", () => {
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

    
    it("should create a customer in a database", async() =>{
        const customerRepository = new CustomerRepository();
        const useCase = new CustomerCreateUseCase(customerRepository);

        const input  = { 
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 123,
                zip: "Zip 1",
                city: "City 1",            
            },
        }
        
        const output = {
            id: expect.any(String),
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 123,
                zip: "Zip 1",
                city: "City 1",            
            },
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    })
})