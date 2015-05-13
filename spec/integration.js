// these run in phantom

describe('waitsFor', () => {

  it('resolves when condition is true', (done) => {
    let returnValue = false;
    let promise = waitsFor.waitsFor(() => returnValue).then(() => done());
    expect(promise.isFulfilled()).toBe(false);
    returnValue = true;
  });

  it('times out', (done) => {
    var returnValue = false;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000
    //jasmine.clock().install()

    waitsFor.waitsFor(() => returnValue, 100).fail(() => done()).done(() => { console.log('DONE') });

    for (var i=0; i<10; i++)
    {
      jasmine.clock().tick(51);
    }
  })

});