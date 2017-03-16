/* eslint no-tabs: 0 */
/* eslint indent: 0 */
/* eslint no-undef: 0 */
/* eslint no-plusplus: 0 */
/* eslint prefer-template: 0 */
/* eslint prefer-const: 0 */
/* eslint one-var: 0 */
/* eslint no-extend-native: 0 */
/* eslint func-names: 0 */
/* eslint one-var-declaration-per-line: 0 */
/* eslint no-bitwise: 0 */
/* eslint space-in-parens: 0 */
/* eslint keyword-spacing: 0 */
/* eslint space-before-function-paren: 0 */

if (!Array.prototype.map) {
  Array.prototype.map = function (callback, thisArg) {
  let T,
A,
k;
  if (this == null) {
  throw new TypeError(' this is null or not defined');
}
  const O = Object(this);
  const len = O.length >>> 0;
  if (typeof callback !== 'function') {
  throw new TypeError(`${callback} is not a function`);
}
  if (arguments.length > 1) {
  T = thisArg;
}
  A = new Array(len);
  k = 0;
  while (k < len) {
  let kValue,
  mappedValue;
  if (k in O) {
  kValue = O[k];
  mappedValue = callback.call(T, kValue, k, O);
  A[k] = mappedValue;
}
  k++;
}

  return A;
};
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fn, scope) {
    for (let i = 0, len = this.length; i < len; ++i) {
      fn.call(scope, this[i], i, this);
    }
  };
}

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

if (!Element.prototype.append) {
  Element.prototype.append = Element.prototype.appendChild;
}
