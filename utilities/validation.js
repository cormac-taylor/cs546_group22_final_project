import { ObjectId } from "mongodb";

const isValidBoolean = (bool) => {
  return typeof bool === "boolean";
};

const isValidInteger = (num) => {
  return typeof num === "number" && !isNaN(num) && isFinite(num) && Number.isInteger(num);
};

let isValidString = (str) => {
  return typeof str === "string" && str.trim();
};

let isValidArray = (arr) => {
  return Array.isArray(arr);
};

let isValidNonEmptyArray = (arr) => {
  return isValidArray(arr) && arr.length !== 0;
};

let isValidObject = (obj) => {
  return !Array.isArray(obj) && typeof obj === "object";
};

let isValidNonEmptyObject = (obj) => {
  return isValidObject(obj) && Object.keys(obj).length !== 0;
};

let isValidFunction = (func) => {
  return typeof func === "function";
};

const isValidObjectID = (id) => {
  return isValidString(id) && ObjectId.isValid(id.trim());
};


export {
  isValidBoolean,
  isValidInteger,
  isValidString,
  isValidArray,
  isValidNonEmptyArray,
  isValidObject,
  isValidNonEmptyObject,
  isValidFunction,
  isValidObjectID,
};
