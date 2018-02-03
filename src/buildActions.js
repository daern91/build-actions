'use strict';

const _ = require('lodash'),
  jsondiffpatch = require('jsondiffpatch'); //TODO: Find a better library since failing dependencies etc.

module.exports = (oldCustomer, newCustomer) => {
  const diff = jsondiffpatch.diff(oldCustomer, newCustomer);

  console.log('The difference between old and new customer: \n', diff);

  const actions = [];

  for (const [field, changes] of Object.entries(diff)) {
    const [oldValue, newValue, isDeleted] = changes;

    let operation = null;
    if (isDeleted === 0) {
      operation = 'delete';
    } else if (_.isNil(newValue)) {
      operation = 'set';
    } else if (!_.isNil(oldValue) && !_.isNil(newValue)) {
      operation = 'change';
    } else {
      throw new Error('Incorrect data type');
    }
    // Use snake case to preserve the Object field name
    actions.push(`${operation}${field[0].toUpperCase()}${field.substring(1)}`);
  }

  return actions;
};
