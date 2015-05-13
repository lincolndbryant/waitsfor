// these run in node

if (typeof require != 'undefined') {
  var waitsFor = require('../');
}

describe('waitsFor', () => {

  it('resolves when condition is true', function (done) {
    var returnValue = false;
    var promise = waitsFor.waitsFor(() => {
      return returnValue;
    }).then(() => {
      return done();
    });
    expect(promise.isFulfilled()).toBe(false);
    returnValue = true;
  });

  it('times out', (done) => {
    var returnValue = false;
    waitsFor.waitsFor(() => {
      return returnValue;
    }, 100).fail(() => {
      expect(true).toBe(true);
      return done();
    });
  });
});