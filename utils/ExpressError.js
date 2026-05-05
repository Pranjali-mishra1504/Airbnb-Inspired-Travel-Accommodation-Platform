// Custom error class with status and message

class ExpressError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

module.exports = ExpressError;