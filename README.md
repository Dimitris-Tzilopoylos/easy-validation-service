# Easy Validation Service

Easy Validation Service is a utility library for performing data validation tasks in Node.js applications. It provides a set of methods for validating various types of data, such as numbers, strings, emails, and objects.

## Installation

You can install Easy Validation Service via npm:

```bash
npm install easy-validation-service
```

### Example Usage

```javascript
const ValidationService = require("easy-validation-service");

const registerUserValidators = {
  email: (value) => ValidationService.validateEmail(value),
  name: (value) => ValidationService.validateString({ value, min: 2, max: 25 }),
  password: (value) =>
    ValidationService.validateString({
      value,
      min: 8,
      max: 16,
      noWhiteSpace: true,
    }),
  verifyPassword: (value, data) => value === data.password,
  role: {
    name: (value) =>
      ValidationService.isOneOf({ value, options: ["role1", "role2"] }),
  },
  isBusiness: (value) => ValidationService.isBoolean(value),
  address: (value) =>
    ValidationService.isNullOrUndefinedOrEmpty(value) ||
    ValidationService.validateString({ value, min: 1 }),
};

const registerUserValidatorsWithErrors = {
  email: (value) => ({
    isValid: ValidationService.validateEmail(value),
    errors: ["Please provide a valid email"],
  }),
  //   name: (value) => ValidationService.validateString({ value, min: 2, max: 25 }),
  //   password: (value) =>
  //     ValidationService.validateString({
  //       value,
  //       min: 8,
  //       max: 16,
  //       noWhiteSpace: true,
  //     }),
  //   verifyPassword: (value, data) => value === data.password,
  role: {
    name: (value) => ({
      isValid: ValidationService.isOneOf({
        value,
        options: ["role1", "role2"],
      }),
      errors: ["Please provide role1 or role2"],
    }),
  },
  //   isBusiness: (value) => ValidationService.isBoolean(value),
  //   address: (value) =>
  //     ValidationService.isNullOrUndefinedOrEmpty(value) ||
  //     ValidationService.validateString({ value, min: 1 }),
};

const firstUser = {
  name: "DimTzilop",
  email: "example@example.com",
  password: "12345678",
  verifyPassword: "1234567",
  role: {
    name: "role2",
  },
  address: null,
};

const secondUser = {
  name: "DimTzilop",
  email: "example@ex2ample.com",
  password: "12345678",
  verifyPassword: "12345678",
  role: {
    name: "role1",
  },
  address: null,
  isBusiness: false,
};

const thirdUser = {
  name: "DimTzilop",
  email: "example@example.com",
  password: "12345678",
  verifyPassword: "12345678",
  role: {
    name: "admin",
  },
  address: null,
  isBusiness: false,
};

console.log(ValidationService.validateBody(firstUser, registerUserValidators));
// false

console.log(ValidationService.validateBody(secondUser, registerUserValidators));
// true

console.log(ValidationService.validateBody(thirdUser, registerUserValidators));
// false

console.log(
  ValidationService.validateBodyWithErrors(
    thirdUser,
    registerUserValidatorsWithErrors
  )
);
// { isValid: false, errors: { role: { name: ["Please provide role1 or role2"] } } }
```

### Methods

#### `validateNumber({ value, min = -Infinity, max = Infinity })`

- Validates if a given value is a number within a specified range.

#### `validateString({ value, min = 0, max = Infinity, noWhiteSpace = false })`

- Validates if a given value is a string within a specified length range, optionally with no white spaces.

#### `isIntOrStringInt(value)`

- Checks if a given value is an integer or a string representing an integer.

#### `isOneOf({ value, options = [] })`

- Checks if a given value is one of the specified options.

#### `isEveryOf({ value, options = [] })`

- Checks if a given value is every one of the specified options.

#### `isNumber(value)`

- Checks if a given value is a number.

#### `isString(value)`

- Checks if a given value is a string.

#### `isUndefined(value)`

- Checks if a given value is undefined.

#### `isFalsy(value)`

- Checks if a given value is falsy.

#### `isNull(value)`

- Checks if a given value is null.

#### `isNullOrUndefined(value)`

- Checks if a given value is null or undefined.

#### `isNullOrUndefinedOrEmpty(value)`

- Checks if a given value is null, undefined, or an empty string.

#### `isObject(value)`

- Checks if a given value is an object.

#### `isBoolean(value)`

- Checks if a given value is a boolean.

#### `validateEmail(email)`

- Validates if a given value is a valid email address.

#### `validateBody(data, validators, parentData)`

- Validates a nested object against a set of validation rules.

#### `validateBodyWithErrors(data, validators, parentData)`

- Validates a nested object against a set of validation rules and preserves errors.

#### `isNotEmptyArray(fieldSet)`

- Checks if a given value is a non-empty array.

#### `validateUniqueFieldSet(fieldSet, getValue = (x) => x)`

- Validates if a given array contains unique elements based on a custom extraction function.

#### `isArrayOfType(fieldSet, type)`

- Checks if all elements in a given array are of a specified type.

#### `isFunction(value)`

- Checks if a given value is a function.
