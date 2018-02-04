'use strict'

const _ = require('lodash')
const jsondiffpatch = require('jsondiffpatch') // TODO: Find a better library since failing dependencies etc.

function getActionType (oldValue, newValue, isDeleted) {
  if (isDeleted === 0) {
    return 'delete'
  } else if (!_.isEmpty(oldValue) && _.isNil(newValue)) {
    return 'set'
  } else if (!_.isNil(oldValue) && !_.isNil(newValue)) {
    return 'change'
  } else {
    throw new Error(
      'Incorrect data type (Object value should be crowded string).'
    )
  }
}

function getActionFromDiff (diff, field) {
  const [oldValue, newValue, isDeleted] = diff

  let operation = getActionType(oldValue, newValue, isDeleted)

  if (field.indexOf('address') >= 0 && operation === 'set') {
    operation = 'add'
  }
  const allowedFields = [
    'firstName',
    'lastName',
    'middleName',
    'title',
    'salutation'
  ]

  for (const allowedField of allowedFields) {
    if (allowedField.indexOf(field) >= 0 && operation !== 'set') {
      return null
    }
  }

  return `${operation}${field[0].toUpperCase()}${field.substring(1)}`
}

function getActions (diff, parentField) {
  const actions = []
  for (const [field, changes] of Object.entries(diff || {})) {
    if (field === '_t') {
      continue
    }

    // if changes are made to nested data such as addresses
    if (!Array.isArray(changes)) {
      actions.push(...getActions(changes, parentField || field))
    } else {
      const action = getActionFromDiff(changes, parentField || field)
      if (action) {
        actions.push(action)
      }
    }
  }
  return actions
}

module.exports = (oldCustomer, newCustomer) => {
  if (typeof oldCustomer !== 'object' || typeof newCustomer !== 'object') {
    throw new Error(
      `Incorrect data type (inputs must be Objects). 
      First input is ${typeof oldCustomer} 
      Second input is ${typeof newCustomer}`
    )
  }

  const diff = jsondiffpatch.diff(oldCustomer, newCustomer)

  return getActions(diff)
}
