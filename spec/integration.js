// these run in phantom

describe('waitsFor', () => {

  it('supports chaining with Q.defer', (done) => {
    let returnValue = false;
    expect(Q().waitsFor).toBeDefined();
    Q().waitsFor(() => returnValue).done(() => {
      done()
    });
    returnValue = true;
  })
});