let util = require('util');
let AppError=function (errorCode) {
    Error.captureStackTrace(this);
    this.errorCode = errorCode
};
util.inherits(AppError, Error);
AppError.prototype.name = 'Server Error';

module.exports=AppError
