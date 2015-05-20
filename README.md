# waitsfor
Wait for truth of a condition using promises

![build](https://travis-ci.org/lincolndbryant/waitsfor.svg?branch=master)

## Usage (directly as a global)
```
var condition = false;
waitsFor(function() { return condition }).done(function() {
  doSomething();
})
```
waitsfor integrates with promise libraries to extend their promise chains, just include the promiseAdaptor file that you want after `waitsfor.js` (only Q is supported currently).
```
var condition = false;
var promsie = Q.defer().promise;
promsie.waitFor(function() { return condition }).done(function() {
  doSomething()
})

```

