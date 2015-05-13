// these run in node

let waitsFor = require('../');
console.log(waitsFor);

describe('waitsFor', () => {

  beforeEach(() => {
    jasmine.clock().install();
  });

  xit('resolves when condition is true', function (done) {
    var returnValue = false;
    var promise = waitsFor.waitsFor(() => {
      return returnValue;
    }).then(() => {
      return done();
    });
    expect(promise.isFulfilled()).toBe(false);
    returnValue = true;
  });

  it('times out', function (done) {
    var returnValue = false;
    waitsFor.waitsFor(() => {
      return returnValue;
    }, 1000).fail(() => {
      return done();
    });

    for (let i of Array(500)) {
      jasmine.clock().tick(51);
    }
  });
});