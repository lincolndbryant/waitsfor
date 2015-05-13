import Q from 'Q'

const WAIT_INTERVAL = 50;
const TIMEOUT = 5000;

export function waitsFor(func, timeout) {
  var calls, deferred, dowaitsFor, started;
  if (!timeout) {
    timeout = TIMEOUT;
  }
  started = +(new Date);
  calls = 0;
  deferred = Q.defer();

  (function doWaitsFor() {
    console.log('now ' + (+(new Date)))
    console.log('timeout ' + (started + timeout))
    if (calls > 0 && func.call(func)) {
      return deferred.resolve(true);
    } else if ((+(new Date)) > started + timeout) {
      timeout = new Error("Timeout waiting for " + (func.toString()));
      return deferred.reject(timeout);
    } else {
      calls++;
      console.log('calls ' + calls);
      return setTimeout(doWaitsFor, WAIT_INTERVAL, func);
    }
  })();
  return deferred.promise;
};
