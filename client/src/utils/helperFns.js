export const isArrayValid = (arr) => {
  if (!arr || !arr.length) return false;
  for (const val of arr) {
    if (val) return true;
  }
  return false;
};
