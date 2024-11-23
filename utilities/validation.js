import { ObjectId } from "mongodb";
import { isEmail } from 'validator';
import { valid as isValidGeoJson } from "geojson-validation";
import { validateDate as isValidDate } from "validate-date";

export const validateBoolean = (bool) => {
  if (typeof bool !== "boolean") throw "must be a boolean!";
  return bool;
};

export const validateNumber = (num) => {
  if (typeof num !== "number") throw "must be a number!";
  if (isNaN(num)) throw "must have a value!";
  if (!isFinite(num)) throw "must be finite!";
  return num;
};

export const validateInteger = (int) => {
  const num = validateNumber(int);
  if (!Number.isInteger(num)) throw "must be an integer!";
  return num;
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
  if (!ObjectId.validate(res)) throw "must be an objectID!";
  return res;
};

export const validateEmail = (email) => {
  const res = validateString(email).toLowerCase();
  if (!isEmail(res)) throw "must be an email address!"
  return res;
};

export const validateGeoJson = (geoJson) => {
  if (!isValidGeoJson(geoJson)) throw "must be a GeoJson!"
  return geoJson;
};

export const validateDate = (date) => {
  const res = validateString(date);
  if (!isValidDate(res, responseType="boolean", dateFormat="mm/dd/yyyy")) throw "must be a real date!"
  if (date[2] !== '/' || date[5] !== '/') throw "be of form mm/dd/yyyy!"
  return res;
};
