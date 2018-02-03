'use strict';

const expect = require('chai').expect,
  buildActions = require('../src/buildActions'),
  createCustomer = require('./fictures');

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

  const failingCustomer = {
    address: []
  };

  const expectedResult = ['changeEmail', 'changeFirstName', 'deleteLastName', 'setMiddleName', 'setAddress'];

  it('should return change functions on success', function() {
    const result = buildActions(customer, newCustomer);

    expect(result).to.eql(expectedResult);
  });

  it('should return error when string arguments are passed', function() {
    expect(() => buildActions('customer', 'newCustomer')).to.throw(Error);
  });

  it('should return error when array arguments are passed', function() {
    expect(() => buildActions([], newCustomer)).to.throw(Error);
  });

  it('should return error when object contains non-string values', function() {
    expect(() => buildActions(customer, failingCustomer)).to.throw(Error);
  });
});
