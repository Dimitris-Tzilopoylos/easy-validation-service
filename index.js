class ValidationService {
  static validateNumber({ value, min = -Infinity, max = Infinity }) {
    return this.isNumber(value) && value >= min && value <= max;
  }
  static validateString({
    value,
    min = 0,
    max = Infinity,
    noWhiteSpace = false,
  }) {
    if (!this.isString(value)) return false;
    if (noWhiteSpace) {
      if (value.includes(" ")) return false;
    }
    if (value?.length < min) return false;
    if (value?.length > max) return false;

    return true;
  }

  static isIntOrStringInt(value) {
    return !isNaN(parseInt(value));
  }

  static isOneOf({ value, options = [] }) {
    const availableOptions = Array.isArray(options) ? options : [options];
    return availableOptions.some((option) => option === value);
  }
  static isEveryOf({ value, options = [] }) {
    const availableOptions = Array.isArray(options) ? options : [options];
    return availableOptions.every((option) => option === value);
  }

  static isNumber(value) {
    return typeof value === "number";
  }

  static isString(value) {
    return typeof value === "string";
  }

  static isUndefined(value) {
    return typeof value === "undefined";
  }

  static isFalsy(value) {
    return (
      !value ||
      value === "0" ||
      value === 0 ||
      value === "false" ||
      value === "undefined" ||
      value === "null"
    );
  }

  static isNull(value) {
    return (
      value === null ||
      (this.isString(value) && value?.toLowerCase()?.trim() === "null")
    );
  }

  static isNullOrUndefined(value) {
    return this.isNull(value) || this.isUndefined(value);
  }

  static isNullOrUndefinedOrEmpty(value) {
    return this.isNull(value) || this.isUndefined(value) || value === "";
  }

  static isObject(value) {
    return (
      !!value &&
      typeof value === "object" &&
      !this.isNullOrUndefined(value) &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    );
  }

  static isBoolean(value) {
    return typeof value === "boolean";
  }

  static validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  static validateBody(data, validators, parentData) {
    if (!this.isObject(data) || !this.isObject(validators)) {
      return false;
    }
    return Object.entries(validators).every(([key, validators]) => {
      const formattedValidators = Array.isArray(validators)
        ? validators
        : [validators];
      return formattedValidators.every((validator) =>
        this.isObject(validator)
          ? this.validateBody(data[key], validator, data)
          : validator(data[key], data, parentData)
      );
    });
  }

  static validateBodyWithErrors(data, validators, parentData) {
    if (!this.isObject(data) || !this.isObject(validators)) {
      return false;
    }
    const preserveErrors = {};
    const isValid = Object.entries(validators).every(([key, validators]) => {
      const formattedValidators = Array.isArray(validators)
        ? validators
        : [validators];
      return formattedValidators.every((validator) => {
        if (ValidationService.isObject(validator)) {
          const { errors, isValid } = ValidationService.validateBodyWithErrors(
            data[key],
            validator,
            data
          );
          if (!isValid) {
            preserveErrors[key] = errors;
          }
          return isValid;
        }
        const { errors, isValid } = validator(data[key], data, parentData);
        if (!isValid) {
          preserveErrors[key] = errors;
        }

        return isValid;
      });
    });

    return { isValid, errors: preserveErrors };
  }

  static isNotEmptyArray(fieldSet) {
    return Array.isArray(fieldSet) && fieldSet.length > 0;
  }

  static validateUniqueFieldSet(fieldSet, getValue = (x) => x) {
    return (
      Array.isArray(fieldSet) &&
      fieldSet.every(
        (x, idx) =>
          !fieldSet.some(
            (p, index) => index !== idx && getValue(p) === getValue(x)
          )
      )
    );
  }

  static isArrayOfType(fieldSet, type) {
    return Array.isArray(fieldSet) && fieldSet.every((x) => typeof x === type);
  }

  static isFunction(value) {
    return typeof value === "function";
  }

  static isDomain(value) {
    if (!ValidationService.isString(value)) {
      return false;
    }
    if (
      value.startsWith("http://localhost") ||
      value.startsWith("https://localhost")
    ) {
      return true;
    }
    const pattern =
      /^(https?:\/\/)?([\da-z.-0-9]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/;

    return pattern.test(value);
  }
  static isValidPhoneNumber(phone) {
    const regex = /^\+?[0-9]{7,15}$/;
    return ValidationService.isString(phone) && regex.test(phone);
  }
  static isValidDate(dateStr) {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }
  static throwAsyncResult(error, result) {
    if (error) throw error;
    if (!result) throw { message: "NOT_FOUND", status: 404 };
  }

  static validateMW(validatorsConfig) {
    return async (req, res, next) => {
      const { body } = req;
      try {
        const { isValid, errors } = ValidationService.validateBodyWithErrors(
          body,
          validatorsConfig
        );
        if (!isValid) {
          throw new Error(errors);
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static formatBody(config, body) {
    try {
      return Object.entries(config).reduce((acc, [key, value]) => {
        let val;
        if (ValidationService.isObject(value)) {
          val = ValidationService.formatBody(value, body?.[key] || {});
        } else {
          val = body[key];
        }
        if (!ValidationService.isNullOrUndefined(val)) {
          acc[key] = val;
        }
        return acc;
      }, {});
    } catch (error) {
      return {};
    }
  }

  static formatBodyMW(config) {
    return (req, res, next) => {
      req.body = ValidationService.formatBody(config, req.body);
      if (
        ValidationService.isObject(req.body) &&
        Object.keys(req.body).length === 0
      ) {
        next(new Error());
      } else {
        next();
      }
    };
  }
}

module.exports = ValidationService;
