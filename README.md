# waitsfor
Wait for truth of a condition using promises

[![build](https://travis-ci.org/lincolndbryant/waitsfor.svg?branch=master)](https://travis-ci.org/lincolndbryant/waitsfor)

## Usage (directly as a global)
```
var condition = false;
waitsFor(function() { return condition }).done(function() {
  doSomething();
})
```
`waitsfor` also integrates with promise libraries to extend their promise chains, just include the promiseAdaptor file that you want after `waitsfor.js` (only Q is supported currently).
```
var condition = false;
var promsie = Q.defer().promise;
promsie.waitFor(function() { return condition }).done(function() {
  doSomething()
})
```
### Node
```
var waitsfor = require('waitsfor')
waitsfor.waitsFor(function() { .. }).then( ... )
```

### Motivation
Jasmine v1 features a convention for async test cases using [`waitsFor` and `runs`](http://jasmine.github.io/1.3/introduction.html#section-24).  This was removed in v2, making it difficult to write code that waits for a condition.  In a 'black box' scenario where no event, callback or promise is available from the code in test, a solution to poll for a condition and provide familiar promises eases in upgrading tests to the new style.
