export = ValidationService;
declare class ValidationService {
  static validateNumber({
    value,
    min,
    max,
  }: {
    value: any;
    min?: number;
    max?: number;
  }): boolean;
  static validateString({
    value,
    min,
    max,
    noWhiteSpace,
  }: {
    value: any;
    min?: number;
    max?: number;
    noWhiteSpace?: boolean;
  }): boolean;
  static isIntOrStringInt(value: any): boolean;
  static isOneOf({ value, options }: { value: any; options?: any[] }): boolean;
  static isEveryOf({
    value,
    options,
  }: {
    value: any;
    options?: any[];
  }): boolean;
  static isNumber(value: any): boolean;
  static isString(value: any): boolean;
  static isUndefined(value: any): boolean;
  static isFalsy(value: any): boolean;
  static isNull(value: any): boolean;
  static isNullOrUndefined(value: any): boolean;
  static isNullOrUndefinedOrEmpty(value: any): boolean;
  static isObject(value: any): boolean;
  static isBoolean(value: any): boolean;
  static validateEmail(email: any): RegExpMatchArray;
  static validateBody(data: any, validators: any, parentData?: any): any;
  static validateBodyWithErrors(
    data: any,
    validators: any,
    parentData: any
  ):
    | false
    | {
        isValid: any;
        errors: {};
      };
  static isNotEmptyArray(fieldSet: any): boolean;
  static validateUniqueFieldSet(
    fieldSet: any,
    getValue?: (x: any) => any
  ): boolean;
  static isArrayOfType(fieldSet: any, type: any): boolean;
  static isFunction(value: any): boolean;
  static isDomain(value: any): boolean;
  static isValidPhoneNumber(value: any): boolean;
  static isValidDate(value: any): boolean;
  static isValidIPv4(value: any): boolean;
  static isValidIPv6(value: any): boolean;
  static isValidIP(value: any): boolean;
  static throwAsyncResult(error: any, result: any): void;
  static validateMW(
    validatorsConfig: any
  ): (req: any, res: any, next: any) => Promise<void>;
  static formatBody(config: any, body: any): any;
  static formatBodyMW(config: any): (req: any, res: any, next: any) => void;
}
