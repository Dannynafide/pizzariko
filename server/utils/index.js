function differenceFromFirstParameter(A, B) {
  const arrA = Array.isArray(A) ? A.map((x) => x.toString()) : [A.toString()];
  const arrB = Array.isArray(B) ? B.map((x) => x.toString()) : [B.toString()];

  const result = [];
  for (const p of arrA) {
    if (arrB.indexOf(p) === -1) {
      result.push(p);
    }
  }

  return result;
  /*
    const arrA = ['a', 'b', 'c', 'd'];
    const arrB = ['c', 'd', 'e', 'f'];

    differenceFromFirstParameter(arrA, arrB);
    // Returns: ['a', 'b'] present in arrA but not in arrB

    differenceFromFirstParameter(arrB, arrA);
    // Returns: ['e', 'f'] present in arrB but not in arrA
  */
}

module.exports = {
  difference: differenceFromFirstParameter,
};
