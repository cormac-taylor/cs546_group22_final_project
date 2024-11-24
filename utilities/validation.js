import { ObjectId } from "mongodb";
import validator from 'validator';
import { valid as isValidGeoJson } from "geojson-validation";

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
  if (!res) throw "must have a char!";
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
  return res;
};

export const validateName = (name) => {
  // https://a-tokyo.medium.com/first-and-last-name-validation-for-forms-and-databases-d3edf29ad29d
  const NAME_REGEX = /^[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+){0,2}[.]{0,1}$/;

  const res = validateString(name);

  if (!NAME_REGEX.test(res)) throw "must be name!"
  return res;
};

export const validateEmail = (email) => {
  const res = validateString(email).toLowerCase();
  if (!validator.isEmail(res)) throw "must be an email address!"
  return res;
};

export const validateGeoJson = (geoJson) => {
  const res = validateNonEmptyObject(geoJson);
  if (!isValidGeoJson(res)) throw "must be a GeoJson!"
  return res;
};

export const validateRating = (rating) => {
  const res = validateInteger(rating);
  if (res < 0 || 5 < res) throw "must be between 0 and 5!"
  return res;
};
