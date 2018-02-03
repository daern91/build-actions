const createCustomer = require('../test/fixtures');
const makeDir = require('make-dir');
const fs = require('fs');

makeDir('testCustomers').then(path => {
  const customers = [];
  for (let i = 0; i < 10; i++) {
    customers.push(createCustomer());
  }

  fs.writeFileSync('testCustomers/data.json', JSON.stringify(customers, null, 2));
});
