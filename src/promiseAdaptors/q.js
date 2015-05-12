import Q from 'Q'
import waitsFor from '../waitsFor'

Promise = Object.getPrototypeOf(Q.defer().promise);

Promise.waitsFor = (conditionFunc) => {
  waitsFor(conditionFunc);
};