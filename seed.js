require("dotenv").config();
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
const mongoose = require("mongoose");
const productModel = require("./models/product");
const userModel = require("./models/user");
const orderModel = require("./models/order");

let faker = require("@faker-js/faker");
faker = faker.fakerEN_US;
mongoose
  // .connect(`mongodb+srv://jiraphat:${password}@cluster0.6vhs3zh.mongodb.net/`)
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .then(console.log("success connect"))
  .catch((err) => console.log("mongoose" + err));
async function seedDB() {
  try {
    // Clear existing data (optional)
    await orderModel.deleteMany({});
    await productModel.deleteMany({});
    await userModel.deleteMany({});

    // Generate 10 fake products
    const fakeProducts = Array.from({ length: 10 }, () => ({
      product_name: faker.commerce.product(),
      detail: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      amount: faker.finance.amount({ dec: 0 }),
    }));
    const fakeUsers = Array.from({ length: 4 }, () => ({
      username: faker.internet.userName(),
      password: faker.internet.password({ length: 8 }),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 70 }),
      sex: faker.person.sex(),
    }));
    // Insert the fake products
    // await productModel.insertMany(fakeProducts);
    // await productModel.insertMany(fakeUsers);

    for (const product of fakeProducts) {
      const newProduct = new productModel(product);
      await newProduct.save();
    }
    for (const user of fakeUsers) {
      const newUser = new userModel(user);
      await newUser.save();
    }
    console.log("Database seeded with default data!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedDB();
