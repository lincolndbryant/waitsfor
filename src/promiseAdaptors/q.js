import Q from 'q'
import {waitsFor} from '../waitsFor'

let Promise = Object.getPrototypeOf(Q.defer().promise);

Promise.waitsFor = (conditionFunc) => {
  return waitsFor(conditionFunc);
};