// these run in node and phantom

if (typeof require !== 'undefined') {
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
    }, {timeout: 100}).fail((err) => {
      expect(err.name).toBe('Error');
      return done();
    });
  });
});