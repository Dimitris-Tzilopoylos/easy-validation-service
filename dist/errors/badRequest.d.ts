export = BadRequest;
declare class BadRequest extends Error {
    status: number;
    stack: string;
}
