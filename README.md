# build-actions

[![Build Status](https://travis-ci.org/daern91/build-actions.svg?branch=master)](https://travis-ci.org/daern91/build-actions)
[![Coverage Status](https://coveralls.io/repos/github/daern91/build-actions/badge.svg?branch=master)](https://coveralls.io/github/daern91/build-actions?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A small library to diff Customers and build update actions.

## Installation

### Required Tools and Dependencies

* Node (This project uses the current LTS node version, which is `v8.9.4`)

### Setup (git)

Execute these commands in the project's root directory:

* `git clone https://github.com/daern91/build-actions.git` - Clone the git repo
* `cd build-actions/` - Move into package folder
* `npm i` - Install all dependencies

## CLI Usage

* `npm run generate-data` - Generate a data.json file with test customers.
* Duplicate the data.json file and change some of the customer info in the new copy, e.g. `email`.
* `buildactions import --file testCustomers/<newFileName.json>`

## Setup (npm)

`npm install @daern91/build-actions`

## Usage

```javascript
const buildActions = require('@daern91/build-actions');

const actions = buildActions(oldCustomerObject, newCustomerObject);

// Output should be an array of update actions
```

**NOTE: You may also use CLI by installing package globally with `npm install @daern91/build-actions -g`**

## Tests

* `npm test` for full testing including lint.
* `npm run cover` for full testing including coverage.

### Requirements

* [x] Setup the project in a github repository
* [x] Export `buildActions` function
* [x] Create test data generator
* [x] Write a CLI (matching with ID instead of name)
* [ ] Provide JSDoc
* [x] Tests
* [x] Lint
* [x] README
* [x] Use ES6
* [x] TravisCI
* [ ] Cucumber features for CLI integration tests (provided that you did the advanced part)
