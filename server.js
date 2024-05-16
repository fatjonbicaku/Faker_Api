const express = require('express')
const { faker, fakerEN_US } = require("@faker-js/faker")
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



//Faker Data

const createUser = () => {
  const _id = faker.string.uuid();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const phone = faker.phone.number();
  const password = faker.internet.password();

  const newRandomPerson = {
    _id: _id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    password: password
  }
  return newRandomPerson;
}

const createCompany = () => {
  const _id = faker.string.uuid();
  const name = faker.company.name();
  const street = fakerEN_US.location.street()
  const city = fakerEN_US.location.city();
  const state = fakerEN_US.location.state();
  const country = fakerEN_US.location.county();
  const zipCode = faker.location.zipCode();

  const newRandomCompany = {
    _id: _id,
    name: name,
    address: {
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
      country: country
    },
  }
  return newRandomCompany;

}



app.get("/", (req, res) => {
  res.json({message: "Welcome to the API"})
})


app.get("/api/users/new", (req, res) => {
res.json(createUser());
})


app.get("/api/company/new", (req, res) => {
res.json(createCompany());
})


app.get("/api/company/", (req, res) => {
res.json({user: createUser(), company: createCompany()});
})



app.listen(8000, () => console.log("Server is running"))