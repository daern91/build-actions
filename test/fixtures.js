'use strict'

const faker = require('faker')

module.exports = function createCustomer () {
  const addresses = []
  const amount = Math.ceil(Math.random() * 3)

  for (let i = 0; i < amount; i++) {
    addresses.push({
      address: faker.address.streetAddress(),
      addressId: faker.random.uuid()
    })
  }

  return {
    id: faker.random.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    middleName: faker.name.firstName(),
    customerGroup: faker.commerce.department(),
    companyName: faker.company.companyName(),
    address: addresses
  }
}
