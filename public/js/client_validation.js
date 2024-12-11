const MIN_USERNAME_LEN = 5;
const MAX_USERNAME_LEN = 10;
const MIN_PASSWORD_LEN = 8;

const validateStrOfLen = (str, minLen, maxLen) => {
  if (typeof str !== "string") throw "must be a string!";
  let res = str.trim();
  if (!res) throw "must not be empty!";
  if (res.length < minLen) throw `must be at least ${minLen} chars!`;
  if (res.length > maxLen) throw `must be at most ${maxLen} chars!`;
  return res;
};

export const validateUsername = (username) => {
  // https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
  const USERNAME_REGEX = /^[a-z0-9_\.]+$/;

  const res = validateStrOfLen(
    username,
    MIN_USERNAME_LEN,
    MAX_USERNAME_LEN
  ).toLowerCase();
  if (!USERNAME_REGEX.test(res))
    throw `must be username (a-z, 0-9, _, or . and between ${MIN_USERNAME_LEN} and ${MAX_USERNAME_LEN} in length)!`;
  return res;
};

export const validatePassword = (password) => {
  // https://www.geeksforgeeks.org/javascript-program-to-validate-password-using-regular-expressions/
  //   const PASSWORD_REGEX =
  //     /^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]+$/;

  //   const res = validateStrOfLen(password, MIN_PASSWORD_LEN, Infinity);
  //   if (!PASSWORD_REGEX.test(res))
  //     throw "not strong enough. Include a uppercase, digit, and special character.";
  //   return res;

  // temp till testing done
  const res = password.trim();
  if (!res) throw "no empty"
  
  return res;
};
