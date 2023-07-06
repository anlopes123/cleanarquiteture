import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import CustomerYupValidador from "../validator/customer.yup.validator";

export default class CustomerValidadorFactory {
    static create(): ValidatorInterface<Customer> {
        return new CustomerYupValidador();
    }
}