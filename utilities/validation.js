import { ObjectId } from "mongodb";
import validator from "validator";
import { valid as isValidGeoJson } from "geojson-validation";
import { isWebUri } from "valid-url";

export const validateBoolean = (bool) => {
  if (typeof bool !== "boolean") throw "must be a boolean!";
  return bool;
};

export const validateFloat = (num) => {
  if (typeof num !== "number") throw "must be a number!";
  if (isNaN(num)) throw "must have a value!";
  if (!isFinite(num)) throw "must be finite!";
  return num.toFixed(2);
};

export const validateInteger = (int) => {
  if (typeof int !== "number") throw "must be a number!";
  if (isNaN(int)) throw "must have a value!";
  if (!isFinite(int)) throw "must be finite!";
  if (!Number.isInteger(int)) throw "must be an integer!";
  return int;
};

export const validateString = (str) => {
  if (typeof str !== "string") throw "must be a string!";
  let res = str.trim();
  if (!res) throw "must not be empty!";
  return res;
};

export const validateStrOfLen = (str, minLen, maxLen) => {
  const res = validateString(str);
  if (res.length < minLen) throw `must be at least ${minLen} chars!`;
  if (res.length > maxLen) throw `must be at most ${maxLen} chars!`;
  return res;
};

export const validateArray = (arr) => {
  if (!Array.isArray(arr)) throw "must be an array!";
  return arr;
};

export const validateNonEmptyArray = (arr) => {
  const res = validateArray(arr);
  if (res.length === 0) throw "must be non-empty!";
  return res;
};

export const validateObject = (obj) => {
  if (typeof obj !== "object") throw "must be an object!";
  if (Array.isArray(obj)) throw "must not be an array!";
  return obj;
};

export const validateNonEmptyObject = (obj) => {
  const res = validateObject(obj);
  if (Object.keys(res).length === 0) throw "must be non-empty!";
  return res;
};

export const validateFunction = (func) => {
  if (typeof func !== "function") throw "must be a function!";
  return func;
};

export const validateObjectID = (id) => {
  const res = validateString(id);
  if (!ObjectId.isValid(res)) throw "must be an objectID!";
  return ObjectId.createFromHexString(res);
};

export const validateName = (name) => {
  // https://a-tokyo.medium.com/first-and-last-name-validation-for-forms-and-databases-d3edf29ad29d
  const NAME_REGEX = /^[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+){0,2}[.]{0,1}$/;

  const res = validateStrOfLen(name, 2, 32);
  //TODO: This error is going to float up to the user
  if (!NAME_REGEX.test(res)) throw "Please provide a valid name.";
  return res;
};

export const validateUsername = (username) => {
  // https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
  const USERNAME_REGEX = /^[a-z0-9_\.]+$/;

  const res = validateStrOfLen(username, 2, 32).toLowerCase();
  if (!USERNAME_REGEX.test(res))
    throw "must be username (a-z, 0-9, _, or . and >=8 chars)!";
  return res;
};

export const validateEmail = (email) => {
  const res = validateString(email).toLowerCase();
  if (!validator.isEmail(res)) throw "must be an email address!";
  return res;
};

export const validateGeoJson = (geoJson) => {
  const res = validateNonEmptyObject(geoJson);
  if (!isValidGeoJson(res)) throw "must be a GeoJson!";
  return res;
};

export const validateTitle = (title) => {
  return validateStrOfLen(title, 1, 64);
};

export const validateBody = (body) => {
  return validateStrOfLen(body, 16, 512);
};

export const validateRating = (rating) => {
  const res = validateInteger(rating);
  if (res < 0 || 5 < res) throw "must be between 0 and 5!";
  return res;
};

export const validateURL = (url) => {
  const res = validateString(url);
  if (!isWebUri(res)) throw "must be a valid url!";
  return res;
};

export const validateCondition = (condition) => {
  const CONDITIONS = ["new", "like-new", "used", "well-used"];

  const res = validateString(condition).toLowerCase();
  if (!CONDITIONS.find((cond) => cond === res))
    throw "must be a valid condition: new, like-new, used, or well-used";
  return res;
};
