'use strict';

const expect = require('chai').expect,
  buildActions = require('../src/buildActions');

describe('#buildActions', function() {
  //TODO: Add generator for test objects

  const customer = {
    email: 'hej@exempel.se',
    firstName: 'Mutton',
    lastName: 'Heart'
  };

  const newCustomer = {
    email: 'hello@exempel.se',
    firstName: 'NewName',
    middleName: 'Middlestar',
    address: 'newAddress'
  };

  const expectedResult = ['changeEmail', 'changeFirstName', 'deleteLastName', 'setMiddleName', 'setAddress'];

  it('should return change functions', function() {
    const result = buildActions(customer, newCustomer);

    expect(result).to.eql(expectedResult);
  });
});
