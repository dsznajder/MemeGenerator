import { camelCase, forEach, isArray, isPlainObject } from 'lodash';

const objectKeysToCamelCase = (object: any) => {
  var camelCaseObject = {};
  forEach(object, (value, key) => {
    if (isPlainObject(value) || isArray(value)) {
      // checks that a value is a plain object or an array - for recursive key conversion
      value = objectKeysToCamelCase(value); // recursively update keys of any values that are also objects
    }
    camelCaseObject[camelCase(key)] = value;
  });

  return camelCaseObject;
};

export default objectKeysToCamelCase;
