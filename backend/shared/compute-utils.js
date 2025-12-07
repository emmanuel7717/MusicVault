function randomNumberOfNDigits(n) {
  if (!n || n <= 0) return "";
  const min = Math.pow(10, n - 1);
  const max = Math.pow(10, n) - 1;
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(num);
}

module.exports = { randomNumberOfNDigits };
