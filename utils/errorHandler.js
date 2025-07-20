class ErrorResponse extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}

export function asyncWrap(fn) {
    return function(req, res, next) {
        return fn(req, res, next).catch((error) => {
            next(error);
        })
    }
}

export default ErrorResponse;