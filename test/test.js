'use strict';

const expect = require('chai').expect,
  buildActions = require('../src/index');

describe('#buildActions', function() {
  it("should return 'Hello world' string", function() {
    const result = buildActions();

    expect(result).to.equal('Hello world');
  });
});
