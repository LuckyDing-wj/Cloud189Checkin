const mask = (s, start, end) => s.split("").fill("*", start, end).join("");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  mask,
  delay,
};
