import Q from 'q'

const WAIT_INTERVAL = 50;
const TIMEOUT = 5000;

export function waitsFor(func, {timeout}={}) {
  var calls, deferred, started;
  if (!timeout) {
    timeout = TIMEOUT;
  }

  started = +(new Date);
  calls = 0;
  deferred = Q.defer();

  (function doWaitsFor() {
    if (calls > 0 && func.call(func)) {
      return deferred.resolve(true);
    } else if ((+(new Date)) > started + timeout) {
      let timeoutError = new Error("[waitsFor] Timeout waiting for " + (func.toString()));
      return deferred.reject(timeoutError);
    } else {
      calls++;
      return setTimeout(doWaitsFor, WAIT_INTERVAL, func);
    }
  })();
  return deferred.promise;
};
