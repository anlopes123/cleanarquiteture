import Product from "./product";

describe("Product Unit Test", ()=> {
   
    it("Should throw error When id is empty", ()=>{
        expect( () => {
            const product = new Product("", "Product 1", 200);
        }).toThrowError("product: Id is required");
        
    });

    it("Should throw error When name is empty", ()=>{
        expect(()=>{
            const product = new Product("1", "", 200);
        }).toThrowError("product: Name is required");
        
    });
    
    it("Should throw error When price less than zero", ()=>{
        expect(()=>{
           const product = new Product("1", "name", -200);
        }).toThrowError("product: Price must be grater than zero");
        
    });

    it("Should thow erros when more the one erros", ()=>{
        expect(()=>{
            const product = new Product("", "", 200);
        }).toThrowError("product: Id is required,product: Name is required");

        // try{
        //     const product = new Product("", "", 200);
        // } catch(err) {
        //     expect(err.message).toBe("product: Id is required,product: Name is required");
        // }
    })

       
    it("change name", ()=>{
        const product = new Product("1", "name", 200);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("change price", ()=>{
        const product = new Product("1", "name", 200);
        product.changePrice(300);
        expect(product.price).toBe(300);
    });
})