'use strict'

/* global describe, it */

const expect = require('chai').expect
const buildActions = require('../src/buildActions')
const createCustomer = require('./fixtures')

describe('#buildActions', function () {
  const customer = {
    email: 'hej@exempel.se',
    firstName: 'Mutton',
    lastName: 'Heart'
  }

  const newCustomer = {
    email: 'hello@exempel.se',
    firstName: 'NewName',
    middleName: 'Middlestar',
    address: 'newAddress'
  }

  const failingCustomer = {
    address: []
  }

  const expectedResult = ['changeEmail', 'setMiddleName', 'addAddress']

  const fakeCustomer = createCustomer()

  it('should return change functions on success', function () {
    const result = buildActions(customer, newCustomer)

    expect(result).to.eql(expectedResult)
  })

  it('should return error when string arguments are passed', function () {
    expect(() => buildActions('customer', 'newCustomer')).to.throw(Error)
  })

  it('should return error when array arguments are passed', function () {
    expect(() => buildActions([], newCustomer)).to.throw(Error)
  })

  it('should return error when object contains non-string values', function () {
    expect(() => buildActions(customer, failingCustomer)).to.throw(Error)
  })

  it('should return empty array when sending in duplicate customers', function () {
    const result = buildActions(newCustomer, newCustomer)

    expect(result).to.eql([])
  })

  it('should return set and change address functions ', function () {
    let newFakeCustomer = JSON.parse(JSON.stringify(fakeCustomer))

    newFakeCustomer.address[0].address = 'Sonnennallee'
    newFakeCustomer.address.push({ address: 'Sonnennallee', addressId: '1' })

    console.log(fakeCustomer)
    console.log(newFakeCustomer)

    const result = buildActions(fakeCustomer, newFakeCustomer)

    expect(result).to.eql(['changeAddress', 'addAddress'])
  })

  it('should return delete address functions ', function () {
    let newFakeCustomer = JSON.parse(JSON.stringify(fakeCustomer))

    newFakeCustomer.address.pop()

    const result = buildActions(fakeCustomer, newFakeCustomer)

    expect(result).to.eql(['deleteAddress'])
  })
})
