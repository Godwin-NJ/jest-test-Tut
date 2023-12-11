const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
}, 30000);

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
}, 30000);

describe("GET /api/products", () => {
  it("should return all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  }, 30000);
});

describe("GET /api/products/:id", () => {
  it("should return a product", async () => {
    const res = await request(app).get(
      "/api/products/657332b0a747ae2eb7c55502"
    );
    // console.log(res);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Product 2");
  }, 30000);
});
// when this is active , it auto-creates the file in the database
describe("POST /api/products", () => {
  it("should create a product", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Product 2",
      price: 1009,
      description: "Description 2",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toEqual("Product 2");
    // console.log(res.body.name);
  }, 30000);
});

describe("PUT /api/products/:id", () => {
  it("should update a product", async () => {
    const res = await request(app)
      .patch("/api/products/6573332a059abd32221d446e")
      .send({
        name: "Product 4",
        price: 104,
        description: "Description 4",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(104);
  }, 30000);
});

describe("DELETE /api/products/:id", () => {
  it("should delete a product", async () => {
    const res = await request(app).delete(
      "/api/products/6331abc9e9ececcc2d449e44"
    );
    expect(res.statusCode).toBe(200);
  }, 30000);
});
