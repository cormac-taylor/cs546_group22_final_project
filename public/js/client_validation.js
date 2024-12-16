const MIN_NAME_LEN = 2;
const MAX_NAME_LEN = 32;
const MIN_USERNAME_LEN = 5;
const MAX_USERNAME_LEN = 10;
const MIN_PASSWORD_LEN = 8;
const MIN_LOCATION_LEN = 6;
const MAX_LOCATION_LEN = 64;
const US_STATE_CODES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "DC", // Included District of Columbia
];

const validateString = (str) => {
  if (typeof str !== "string") throw "must be a string!";
  let res = str.trim();
  if (!res) throw "must not be empty!";
  return res;
};

const validateStrOfLen = (str, minLen, maxLen) => {
  const res = validateString(str);
  if (res.length < minLen) throw `must be at least ${minLen} chars!`;
  if (res.length > maxLen) throw `must be at most ${maxLen} chars!`;
  return res;
};

export const validateName = (name) => {
  // https://a-tokyo.medium.com/first-and-last-name-validation-for-forms-and-databases-d3edf29ad29d
  const NAME_REGEX = /^[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+){0,2}[.]{0,1}$/;

  const res = validateStrOfLen(name, MIN_NAME_LEN, MAX_NAME_LEN);
  //TODO: This error is going to float up to the user
  if (!NAME_REGEX.test(res))
    throw `must be of length ${MIN_NAME_LEN} to ${MAX_NAME_LEN}.`;
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

export const validateEmail = (email) => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const res = validateString(email).toLowerCase();
  if (!EMAIL_REGEX.test(res)) throw "must be an email address!";
  return res;
};

export const validatePassword = (password) => {
  // https://www.geeksforgeeks.org/javascript-program-to-validate-password-using-regular-expressions/
  const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]+$/;

  const res = validateStrOfLen(
    regExEscape(password),
    MIN_PASSWORD_LEN,
    Infinity
  );
  if (!PASSWORD_REGEX.test(res))
    throw "too weak. Include at least one of each: [A-Z], [0-9], and [@.#$!%*?&].";
  return res;
};
const regExEscape = (regEx) => {
  return regEx.replace(/[-[\]{}()*+?.,\\^$|]/g, "\\$&");
};

export const validateLocation = (location) => {
  const loc = validateStrOfLen(location, MIN_LOCATION_LEN, MAX_LOCATION_LEN);
  let [city, state] = loc.split(",");
  if (!city || !state) throw "of invalid form.";

  city = city.trim();
  state = state.trim().toUpperCase();

  if (!isValidCity || !isValidStateCode(state))
    throw "of invalid form.";

  return `${city}, ${state}`;
};

const isValidCity = (city) => {
  const CITY_REGEX = /^[a-zA-Z]{3,45}([ \-']{0,1}[a-zA-Z]{3,20}){0,3}$/;
  return CITY_REGEX.test(city)
};

const isValidStateCode = (state) => {
  return US_STATE_CODES.includes(state.trim().toUpperCase());
};
