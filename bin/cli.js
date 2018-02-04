#!/usr/bin/env node

const program = require('commander')
const lib = require('../src')
const path = require('path')

program
  .version('1.0.0')
  .command('import ')
  .option('--file [name]')
  .action(args => {
    const filePath = path.join(process.cwd(), args.file)
    console.log(filePath)

    const data = require('../testCustomers/data.json'),
      newData = require(filePath),
      buildActions = require('../src/buildActions')

    function findCustomer (id) {
      for (const item of data) {
        if (item.id === id) {
          return item
        }
      }
    }

    function createCustomer (customer) {
      console.log('create customer', customer)
    }

    function updateCustomer (id, actions) {
      console.log(`update customer with id: ${id}`, actions)
    }

    for (let i = 0; i < newData.length; i++) {
      const element = newData[i]

      const existing = findCustomer(element.id)
      if (!existing) {
        createCustomer(element)
      } else {
        const result = buildActions(existing, element)
        if (result && result.length > 0) {
          updateCustomer(element.id, result)
        }
      }
    }
  })

program.parse(process.argv)
