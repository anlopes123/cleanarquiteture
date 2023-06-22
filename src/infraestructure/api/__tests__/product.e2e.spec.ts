import { app, sequelize } from "../express"
import request from 'supertest';

describe("E2E test for product ", () =>{
    beforeEach(async() =>{
        await sequelize.sync({force: true});
    });

    afterAll(async()=> {
        await sequelize.close();
    });
    
    it("Should create a product", async()=>{
        const response = await request(app)
        .post("/product")
        .send({
            name: "Product 1",
            price: 20,
        });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1")
        expect(response.body.price).toBe(20);

    }); 

    it("Should not crated a Product ",async () => {
        const response = await request(app)
        .post("/product")
        .send({
            name: "", 
            price: -1
        });
        expect(response.status).toBe(500);
    });

    it("Should list all a product", async() => {
        const response1 = await request(app)
        .post("/product")
        .send({
            name: "Product 1",
            price: 20,
        });

        const response2 = await request(app)
        .post("/product")
        .send({
            name: "Product 2",
            price: 50,
        });

        const listAllProduct = await request(app).get("/product").send();
        expect(listAllProduct.status).toBe(200);
        expect(listAllProduct.body.products.length).toBe(2);
        
        const product1 = listAllProduct.body.products[0];
        expect(product1.name).toBe("Product 1");
        expect(product1.price).toBe(20);
        const product2 = listAllProduct.body.products[1];
        expect(product2.name).toBe("Product 2");
        expect(product2.price).toBe(50);       
        
    });

    it("should update a product", async() => {
        const response1 = await request(app)
        .post("/product")
        .send({
            name: "Product 1",
            price: 20,
        });

        const response = await request(app)
        .put("/product")
        .send({
            id: response1.body.id,
            name: "Product updated",
            price: 50,
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product updated");
        expect(response.body.price).toBe(50);
    })
})